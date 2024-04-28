import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const AnswerInput = ({ onSubmit }) => {
    const [userAnswer, setUserAnswer] = useState('');

    const handleSubmit = () => {
        onSubmit(userAnswer);
        setUserAnswer('');
    };

    return (
        <View>
            <TextInput
                placeholder="Enter your answer"
                value={userAnswer}
                onChangeText={setUserAnswer}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default AnswerInput;