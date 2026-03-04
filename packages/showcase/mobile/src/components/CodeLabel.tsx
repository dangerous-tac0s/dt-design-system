import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface CodeLabelProps {
  text: string;
}

export function CodeLabel({ text }: CodeLabelProps) {
  return <Text style={styles.code}>{text}</Text>;
}

const styles = StyleSheet.create({
  code: {
    color: 'rgba(255, 255, 255, 0.35)',
    fontSize: 10,
    fontFamily: 'monospace',
    marginTop: 4,
    marginBottom: 4,
  },
});
