import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function QandA(){

    const [question, setQuestion] = useState('this is a question');
    const [answer, setAnswer] = useState('this is an answer');

    function getQandA(){
        fetch('https://the-trivia-api.com/v2/questions')
        .then((response) => response.json())
        .then((json) => {
            final = null
            for (let i = 0; i < 10; i++){
                check = json[i];
                if (check.correctAnswer.includes(' ')){
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
                setQuestion(final.question.text);
                setAnswer(final.correctAnswer);
                console.log({question});
                console.log({answer});
            }
        })

        .catch((error) => {
          console.error(error);
       });
      }

      
    return(
        <View>
            <Button title="get it" onPress = {getQandA} />
            <Text>{question}</Text>
            <Text>{answer}</Text>
        </View>
    );
}