import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  DTCard,
  DTLabel,
  DTStaggerContainer,
  useDTTheme,
  useScaleIn,
  usePulse,
} from '@dangerousthings/react-native';
import type { DTVariant } from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';
import { Animated } from 'react-native';

export function AnimationsScreen() {
  const theme = useDTTheme();
  const scaleAnim = useScaleIn({ duration: 600 });
  const pulseAnim = usePulse(true);

  const modes: DTVariant[] = ['normal', 'emphasis', 'warning', 'success', 'other'];

  return (
    <ScreenContainer>
      {/* Stagger Container */}
      <DemoSection
        title="DTStaggerContainer"
        variant="normal"
        description="Staggered scale-in entrance animation for child elements."
      >
        <DTStaggerContainer duration={330} interval={75}>
          {modes.map((mode) => (
            <DTCard key={mode} mode={mode} title={mode.toUpperCase()} style={{ marginBottom: 12 }}>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
                Staggered entrance with scale animation
              </Text>
            </DTCard>
          ))}
        </DTStaggerContainer>
        <CodeLabel text="<DTStaggerContainer duration={330} interval={75}>" />
      </DemoSection>

      {/* Stagger with Labels */}
      <DemoSection
        title="Staggered Labels"
        variant="emphasis"
        description="Labels with staggered entrance animation."
      >
        <DTStaggerContainer duration={400} interval={100}>
          {modes.map((mode) => (
            <View key={mode} style={{ marginBottom: 8 }}>
              <DTLabel primaryText={mode.toUpperCase()} mode={mode} />
            </View>
          ))}
        </DTStaggerContainer>
        <CodeLabel text="DTStaggerContainer > DTLabel — customizable timing" />
      </DemoSection>

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
