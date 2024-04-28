import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { styles } from './styles.js'

export const Score = ({ score }) => {
  const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']; // declared a fun array to cycle through rainbow
  const colorIndex = score % rainbowColors.length;

  return (
      <Text style={[styles.score, { color: rainbowColors[colorIndex] }]}>
        Score: {score}
      </Text>
  );
};
