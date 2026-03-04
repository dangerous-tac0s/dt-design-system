import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DemoRowProps {
  children: React.ReactNode;
}

export function DemoRow({ children }: DemoRowProps) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
});
