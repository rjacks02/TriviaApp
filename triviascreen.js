import {Text, View, TextInput, Button, Animated, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import { styles } from './styles.js';
import { Score } from './Score.js';

export default function TriviaScreen({navigation}) {
    const [userAnswer, setUserAnswer] = useState('');
    const [guess, setGuess] = useState('');
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [score, setScore] = useState(0);
    const [trivia, setTrivia] = useState({});
    const [clue, setClue] = useState("");
    const [answerBoxes, setAnswerBoxes] = useState([]);
    const [fadeIn] = useState(new Animated.Value(0)); // Using react's own animated api!!
    const maxIncorrectGuesses = 5;
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  
    function getQandA() {
      return fetch('https://the-trivia-api.com/v2/questions')
        .then((response) => response.json())
        .then((json) => {
          let final = null;
          for (let i = 0; i < 10; i++) {
            let check = json[i];
            if (check.correctAnswer.includes(' ') ||
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
            setTrivia({
              'question': final.question.text,
              'answer': final.correctAnswer.trim(),
              'category': final.category,
              'incorrect': final.incorrectAnswers,
              'tags': final.tags
            });
  
            const boxes = Array(final.correctAnswer.length).fill('');
            setAnswerBoxes(boxes);
  
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
  
          else if (fallback) {
            output = "The answer is related to, but not: " + cleanText(triviaObject.incorrect[0]);
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
      getQandA()
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, []);
  
    useEffect(() => {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          clearInterval(timer);
          showCongratulationsAlert(score);
        }
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft, navigation, score]);
  
    const handleAnswer = () => {
      if (userAnswer.length !== trivia.answer.length) {
        alert('Please enter a word with enough letters to fill the boxes.');
        return;
      }
  
      const input = userAnswer.toLowerCase();
      const answer = trivia.answer.toLowerCase();
      setGuess('Last Guess: ' + userAnswer);
  
      if (input === answer) {
        const filledBoxes = answer.split('').map((letter, index) => (
          <Text style={{ color: 'green' }}>{letter}</Text>
        ));
        setAnswerBoxes(filledBoxes);
        alert('Correct answer!');
        setScore((prevScore) => prevScore + 1);
        setIncorrectGuesses(0);
        setGuess('');
        getQandA();
      } else {
        let fullyCorrectIndexes = [];
        let partiallyCorrectIndexes = [];
  
        let letters = [];
        for (let i = 0; i < answer.length; i++) {
          letters[i] = answer.charAt(i);
        }
  
        for (let i = 0; i < answer.length; i++) {
          if (input[i] && input[i] === answer[i]) {
            fullyCorrectIndexes.push(i);
            letters[i] = null;
          }
        }
        for (let i = 0; i < answer.length; i++) {
          if (input[i] && answer.includes(input[i]) && !fullyCorrectIndexes.includes(i) && letters.includes(input[i])) {
            partiallyCorrectIndexes.push(i);
            letters[letters.indexOf(input[i])] = null;
          }
        }
  
        setIncorrectGuesses((prevCount) => prevCount + 1);
        setClue(getHint(trivia, incorrectGuesses));
  
        if (incorrectGuesses + 1 >= maxIncorrectGuesses) {
          alert(`Sorry, you've reached the maximum number of incorrect guesses. The correct answer was: ${trivia.answer}`);
          setIncorrectGuesses(0);
          setGuess('');
          const boxes = Array(trivia.answer.length).fill('');
          setAnswerBoxes(boxes);
          getQandA();
        } else {
          const newBoxes = Array(trivia.answer.length).fill('');
          const letterMap = new Map();
  
          fullyCorrectIndexes.forEach(index => {
            if (!letterMap.has(answer[index])) {
              letterMap.set(answer[index], 1);
            } else {
              letterMap.set(answer[index], letterMap.get(answer[index]) + 1);
            }
          });
  
          partiallyCorrectIndexes.forEach(index => {
            if (!letterMap.has(input[index])) {
              letterMap.set(input[index], 1);
            } else {
              letterMap.set(input[index], letterMap.get(input[index]) + 1);
            }
          });
  
          letterMap.forEach((occurrences, letter) => {
            const positions = fullyCorrectIndexes.filter(index => answer[index] === letter);
            positions.slice(0, occurrences).forEach(position => {
              newBoxes[position] = <Text style={{ color: 'green' }}>{letter}</Text>;
            });
          });
  
          partiallyCorrectIndexes.forEach(index => {
            newBoxes[index] = <Text style={{ color: 'orange' }}>{input[index]}</Text>;
          });
  
          setAnswerBoxes(newBoxes);
        }
      }
    };
    
    const showCongratulationsAlert = (finalScore) => {
        Alert.alert(
            'Congratulations!',
            `Your final score is: ${finalScore} points.`,
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
  
    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.title, { opacity: fadeIn }]}>
          Test your <Animated.Text style={{ color: '#FF4500' }}>knowledge</Animated.Text>!
        </Animated.Text>
        <Text style={styles.questionText}>{trivia.question}</Text>
        {trivia.answer && (
          <>
            <Text style={styles.answerBoxText}>{guess}</Text>
            <View style={styles.answerBoxesContainer}>
              {answerBoxes.map((box, index) => (
                <View key={index} style={styles.answerBox}>
                  <Text style={styles.answerBoxText}>{box}</Text>
                </View>
              ))}
            </View>
            <View style={styles.answerInput}>
              <TextInput
                placeholder="Enter your answer"
                value={userAnswer}
                onChangeText={(text) => setUserAnswer(text)}
                maxLength={trivia.answer.length}
              />
            </View>
            <Button title="Submit" onPress={handleAnswer} styles={styles.submitButton} />
          </>
        )}
        <Text>{clue}</Text>
        <Text style ={styles.timer}> Timer: {timeLeft} seconds remain! </Text>
        <Score score={score} styles={styles} />
      </View>
    );
  };
  
