import React from 'react';
import { View, Text } from 'react-native';

const Clue = ({ clueText }) => {
  return (
    <View>
      <Text>{clueText}</Text>
    </View>
  );
};

export default Clue;