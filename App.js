import { StatusBar } from 'expo-status-bar';
import {Text, View, TextInput, Button, Animated} from 'react-native';
import React, {useState, useEffect} from 'react';
import { styles } from './styles.js';
import { Score } from './Score.js';

export default function App() {
  const [userAnswer, setUserAnswer] = useState('');
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const trivia = {
    question: 'Sample Question',
    incorrect: ['Incorrect Answer'],
  };

  const [fadeIn] = useState(new Animated.Value(0)); // Using react's own animated api!!

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAnswer = () => {
    if (userAnswer.toLowerCase() === trivia.incorrect[0].toLowerCase()) {
      alert('Correct answer!');
      setScore((prevScore) => prevScore + 1);
    } else {
      setIncorrectGuesses((prevCount) => prevCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeIn }]}>
        Welcome to <Animated.Text style={{ color: '#FF4500' }}>Trivia App</Animated.Text>! Here's your question:
      </Animated.Text>
      <Text style={styles.questionText}>{trivia.question}</Text>
      <View style={styles.answerInput}>
        <TextInput
          placeholder="Enter your answer"
          value={userAnswer}
          onChangeText={(text) => setUserAnswer(text)}
        />
      </View>
      <Button title="Submit" onPress={handleAnswer} />
      {incorrectGuesses >= 5 && <Text style={styles.clueText}>{trivia.incorrect[0]}</Text>}
      <Score score={score} styles={styles} />
    </View>
  );
}
