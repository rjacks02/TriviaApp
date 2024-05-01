import {Text, View, Animated, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import { styles } from './styles.js';
import FontStyle from "./styles/FontStyle";
import TriviaInput from "./components/TriviaInput";
import GuessDisplay from "./components/GuessDisplay";

export default function TriviaScreen({navigation}) {
    const maxGuesses = 6;

    const [startTime, setStartTime] = useState(0);

    const [trivia, setTrivia] = useState({});
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [clue, setClue] = useState("");

    const [currentInput, setCurrentInput] = useState('');
    const [guessCount, setGuessCount] = useState(0);
    const [guessHistory, setGuessHistory] = useState([])

    const [fadeIn] = useState(new Animated.Value(0)); // Using react's own animated api!!

    function getQandA() {
        setGuessCount(0);
        return fetch('https://the-trivia-api.com/v2/questions')
            .then((response) => response.json())
            .then((json) => {
                let final = null;
                for (let i = 0; i < 10; i++) {
                    let check = json[i];
                    if (check.correctAnswer.includes(' ') ||
                        check.correctAnswer.length > 8 ||
                        check.correctAnswer.length < 4 ||
                        check.question.text.includes('these') ||
                        check.correctAnswer.match(/[A-z]/) == null) {
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
                    setCorrectAnswer(final.correctAnswer.trim());
                    setTrivia({
                        'question': final.question.text,
                        'answer': final.correctAnswer.trim(),
                        'category': final.category,
                        'incorrect': final.incorrectAnswers,
                        'tags': final.tags
                    });

                    setGuessHistory(Array(maxGuesses));
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

    function getHint(triviaObject, guessCount) {
        let output = ""
        switch (guessCount) {
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

                else if (fallback) {
                    output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[3]);
                }

                break

            case 2:
                output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[0]);
                break

            case 3:
                output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[1]);
                break

            case 4:
                output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[2]);
                break
        }

        return output
    }

    useEffect(() => {
        setStartTime(Date.now());
        setCurrentInput("");
        setQuestion("");
        getQandA()
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, []);

    const showCongratulationsAlert = () => {
        let elapsedSeconds = (Date.now() - startTime) / 1000;
        let elapsedMinutes = Math.floor(elapsedSeconds / 60);
        elapsedSeconds = Math.floor(elapsedSeconds % 60);

        let congratsMessage = 'It took you ' + elapsedMinutes + " minutes and " + elapsedSeconds + " seconds!";
        if (elapsedMinutes === 0)
        {
            congratsMessage = 'It took you ' + elapsedSeconds + " seconds!";
        }

        Alert.alert(
            'Congratulations!',
            congratsMessage,
            [
                {
                    text: 'Play again!',
                    onPress: () => {
                        navigation.navigate('Welcome');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const showOopsAlert = () => {
        Alert.alert(
            'Aww!',
            'The answer was ' + correctAnswer + '...',
            [
                {
                    text: 'Play again?',
                    onPress: () => {
                        navigation.navigate('Welcome');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={[FontStyle.robotoMonoBold, styles.title, { opacity: fadeIn }]}>
                {clue}
            </Animated.Text>
            <Text style={[FontStyle.robotoMonoBold, styles.questionText]}>{question}</Text>
            <GuessDisplay boxCount={correctAnswer.length}
                          allGuesses={guessHistory}
                          evaluateIndex={guessCount}
                          correctAnswer={correctAnswer}/>
            <TriviaInput onKeyPress={character =>
            {
                if (character === "ENTER") {
                    if (currentInput.length !== correctAnswer.length) {
                        return;
                    }

                    let nextGuessCount = guessCount + 1;
                    setGuessCount(nextGuessCount);

                    if (currentInput === correctAnswer.toUpperCase()) {
                        showCongratulationsAlert();
                    }
                    else {
                        if (nextGuessCount >= maxGuesses) {
                            showOopsAlert();
                        }
                    }

                    setCurrentInput("");

                    let nextHint = getHint(trivia, nextGuessCount);
                    if (nextHint !== "") {
                        setClue(nextHint);
                    }

                    if (nextGuessCount === 2) {
                        setQuestion(trivia.question);
                    }
                }
                else
                {
                    let newCurrentInput = currentInput;

                    if (character === "DELETE") {
                        if (currentInput.length <= 0) {
                            return;
                        }
                        newCurrentInput = newCurrentInput.slice(0, -1);
                        setCurrentInput(newCurrentInput);
                    }
                    else if (currentInput.length < correctAnswer.length) {
                        newCurrentInput += character;
                        setCurrentInput(newCurrentInput);
                    }

                    let newGuessHistory = [...guessHistory];
                    newGuessHistory[guessCount] = newCurrentInput;
                    setGuessHistory(newGuessHistory);
                }
            }}
                         maxInputLength={correctAnswer.length}/>
        </View>
    );
};