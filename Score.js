import React from 'react';
import { View, Text } from 'react-native';

const Score = ({ score }) => {
  return (
    <View>
      <Text>Score: {score}</Text>
    </View>
  );
};

export default Score;