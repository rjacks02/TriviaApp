import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function QandA(){

    const [trivia, setTrivia] = useState({});

    function getQandA(){

        fetch('https://the-trivia-api.com/v2/questions')
        .then((response) => response.json())
        .then((json) => {
            final = null
            for (let i = 0; i < 10; i++){
                check = json[i];
                if (check.correctAnswer.includes(' ') || check.question.text.includes('these')){
                    continue;
                }
                else{
                    final = check;
                }
            }
            if (final == null || !isNaN(final.correctAnswer)){
                getQandA();
            }
            else{
                setTrivia({'question': final.question.text, 'answer': final.correctAnswer, 
                'category': final.category, 'incorrect': final.incorrectAnswers, 'tags': final.tags});
            }
        })

        .catch((error) => {
          console.error(error);
       });
      }


    return(
        <View>
            <Button title="get it" onPress = {getQandA} />
            <Text>{trivia.question}</Text>
            <Text>{trivia.answer}</Text>
        </View>
    );
}