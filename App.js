import { StatusBar } from 'expo-status-bar';
import {Text, View, TextInput, Button, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import { styles } from './styles.js';
import { Score } from './Score.js';

export default function App() {
    const [userAnswer, setUserAnswer] = useState('');
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [score, setScore] = useState(0);
    const [trivia, setTrivia] = useState({});
    const [clue, setClue] = useState("")

    const [fadeIn] = useState(new Animated.Value(0)); // Using react's own animated api!!

    function getQandA(){
        return fetch('https://the-trivia-api.com/v2/questions')
            .then((response) => response.json())
            .then((json) => {
                let final = null;
                for (let i = 0; i < 10; i++) {
                    let check = json[i];
                    if (check.correctAnswer.includes(' ') ||
                        check.question.text.includes('these') ||
                        check.correctAnswer.match(/[A-z]/) == null){
                        continue;
                    }
                    else {
                        final = check;
                    }
                }
                if (final == null) {
                    getQandA();
                }
                else {
                    setTrivia({'question': final.question.text,
                        'answer': final.correctAnswer,
                        'category': final.category,
                        'incorrect': final.incorrectAnswers,
                        'tags': final.tags});

                    setClue(getHint(final, 0))
                }
            })
    }

    function cleanText(text, force_upper_case = false) {
        text = text.replaceAll("_", " ");
        if (force_upper_case)
            text = text.charAt(0).toUpperCase() + text.slice(1);
        return text;
    }

    function getHint(triviaObject, hintData) {
        let output = ""
        switch (hintData) {
            case 0:
                output = "The answer is in the category: " + cleanText(triviaObject.category);
                break

            case 1:
                let fallback = true
                let tagCount = triviaObject.tags.length
                if (tagCount >= 1) {
                    if (triviaObject.category === triviaObject.tags[0]) {
                        if (tagCount >= 2) {
                            output = "The answer is related to: " + cleanText(triviaObject.tags[1]);
                            fallback = false
                        }
                    } else {
                        output = "The answer is related to: " + cleanText(triviaObject.tags[0]);
                        fallback = false
                    }
                }

                if (fallback) {
                    output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[2]);
                }
                break

            case 2:
                output = "The question is: " + cleanText(triviaObject.question);
                break

            case 3:
                output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[0]);
                break

            case 4:
                output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[1]);
                break
        }

        return output
    }

    useEffect(() => {
        getQandA()
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleAnswer = () => {
        if (userAnswer.toLowerCase() === trivia.answer.toLowerCase()) {
            alert('Correct answer!');
            setScore((prevScore) => prevScore + 1);
        }
        else {
            setIncorrectGuesses((prevCount) => prevCount + 1);
            setClue(getHint(trivia, incorrectGuesses))
        }
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.title, { opacity: fadeIn }]}>
                Welcome to <Animated.Text style={{ color: '#FF4500' }}>Trivia App</Animated.Text>!
            </Animated.Text>
            <View style={styles.answerInput}>
                <TextInput
                    placeholder="Enter your answer"
                    value={userAnswer}
                    onChangeText={(text) => setUserAnswer(text)}
                />
            </View>
            <Button title="Submit" onPress={handleAnswer} />
            <Text>{clue}</Text>
            <Score score={score} styles={styles} />
        </View>
    );
}
