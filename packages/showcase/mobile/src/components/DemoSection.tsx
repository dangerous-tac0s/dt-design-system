import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { DTLabel } from '@dangerousthings/react-native';
import type { DTVariant } from '@dangerousthings/react-native';

interface DemoSectionProps {
  title: string;
  description?: string;
  variant?: DTVariant;
  children: React.ReactNode;
}

export function DemoSection({ title, description, variant = 'normal', children }: DemoSectionProps) {
  return (
    <View style={styles.container}>
      <DTLabel
        primaryText={title}
        mode={variant}
        size="medium"
        animated={false}
        showIndicator={false}
      />
      {description ? (
        <Text variant="bodySmall" style={styles.description}>
          {description}
        </Text>
      ) : null}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  description: {
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
  },
  content: {
    marginTop: 16,
  },
});
