import React from 'react';
import { Text } from 'react-native-paper';
import {
  DTCard,
  DTLabel,
  useDTTheme,
  useScaleIn,
  usePulse,
} from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';
import { Animated } from 'react-native';

export function AnimationsScreen() {
  const theme = useDTTheme();
  const scaleAnim = useScaleIn({ duration: 600 });
  const pulseAnim = usePulse(true);

  return (
    <ScreenContainer>
      {/* Scale-In Hook */}
      <DemoSection
        title="useScaleIn"
        variant="success"
        description="Scale 0→1 entrance animation hook for individual elements."
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <DTCard mode="success" title="SCALE IN">
            <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
              This card used useScaleIn(&#123; duration: 600 &#125;)
            </Text>
          </DTCard>
        </Animated.View>
        <CodeLabel text="const scale = useScaleIn({ duration: 600 })" />
      </DemoSection>

      {/* Pulse Hook */}
      <DemoSection
        title="usePulse"
        variant="warning"
        description="Looping opacity pulse animation for active/loading states."
      >
        <Animated.View style={{ opacity: pulseAnim }}>
          <DTLabel primaryText="PULSING LABEL" mode="warning" />
        </Animated.View>
        <CodeLabel text="const opacity = usePulse(true)" />
      </DemoSection>
    </ScreenContainer>
  );
}
