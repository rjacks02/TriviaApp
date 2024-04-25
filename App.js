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

  const [fadeIn] = useState(new Animated.Value(0)); // Using react's own animated api!!

  function getQandA(){

    fetch('https://the-trivia-api.com/v2/questions')
    .then((response) => response.json())
    .then((json) => {
        final = null;
        for (let i = 0; i < 10; i++){
            check = json[i];
            if (check.correctAnswer.includes(' ') || check.question.text.includes('these') || !isNaN(check.correctAnswer)){
                continue;
            }
            else{
                final = check;
            }
        }
        if (final == null){
            getQandA();
        }
        else{
            setTrivia({'question': final.question.text, 'answer': final.correctAnswer, 
            'category': final.category, 'incorrect': final.incorrectAnswers, 'tags': final.tags});
        }
    })
  }

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    getQandA();
  }, []);

  const handleAnswer = () => {
    if (userAnswer.toLowerCase() === trivia.answer.toLowerCase()) {
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
        <Button title="Submit" onPress={handleAnswer} />
      </View>
      {incorrectGuesses >= 3 && <Text style={styles.clueText}>{trivia.answer}</Text>}
      <Score score={score} styles={styles} />
    </View>
  );
}
