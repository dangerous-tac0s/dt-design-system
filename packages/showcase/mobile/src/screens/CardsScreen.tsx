import React from 'react';
import { View, Image, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { DTCard, DTLabel, DTMediaFrame, useDTTheme } from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';

export function CardsScreen() {
  const theme = useDTTheme();

  return (
    <ScreenContainer>
      {/* DTCard - All Modes */}
      <DemoSection
        title="DTCard - Modes"
        variant="normal"
        description="Beveled card with dual bottom bevels. Uses DTVariant for mode coloring."
      >
        <DTCard mode="normal" title="NORMAL MODE" style={{ marginBottom: 16 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Primary border with beveled bottom-right and bottom-left corners.
          </Text>
        </DTCard>

        <DTCard mode="emphasis" title="EMPHASIS MODE" style={{ marginBottom: 16 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Secondary border. Used for highlighted or important content.
          </Text>
        </DTCard>

        <DTCard mode="warning" title="WARNING MODE" style={{ marginBottom: 16 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Error border. Used for errors and destructive actions.
          </Text>
        </DTCard>

        <DTCard mode="success" title="SUCCESS MODE" style={{ marginBottom: 16 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Success border. Used for confirmations and success states.
          </Text>
        </DTCard>

        <DTCard mode="other" title="OTHER MODE">
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Tertiary border. Used for secondary or miscellaneous info.
          </Text>
        </DTCard>
      </DemoSection>

      {/* DTCard - Variations */}
      <DemoSection
        title="DTCard - Variations"
        variant="emphasis"
        description="Cards without titles, pressable cards, custom bevels."
      >
        <DTCard mode="normal" style={{ marginBottom: 16 }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Card without title (no header bar).
          </Text>
        </DTCard>

        <DTCard
          mode="emphasis"
          title="PRESSABLE CARD"
          onPress={() => Alert.alert('Card Pressed', 'You tapped the card!')}
          style={{ marginBottom: 16 }}
        >
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Tap me! Cards with onPress get press feedback.
          </Text>
        </DTCard>

        <DTCard
          mode="other"
          title="CUSTOM BEVELS"
          bevelSize={48}
          bevelSizeSmall={24}
          borderWidth={4}
        >
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            bevelSize=48, bevelSizeSmall=24, borderWidth=4
          </Text>
        </DTCard>
      </DemoSection>

      {/* DTLabel - Sizes and Modes */}
      <DemoSection
        title="DTLabel"
        variant="normal"
        description="Beveled top-right corner labels with animated ping indicator."
      >
        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          SIZES:
        </Text>
        <View style={{ gap: 8, marginBottom: 16 }}>
          <DTLabel primaryText="Small Label" size="small" mode="normal" />
          <DTLabel primaryText="Medium Label" size="medium" mode="normal" />
          <DTLabel primaryText="Large Label" size="large" mode="normal" />
        </View>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          WITH SECONDARY TEXT:
        </Text>
        <View style={{ gap: 8, marginBottom: 16 }}>
          <DTLabel primaryText="Detected" secondaryText="NTAG215" mode="success" />
          <DTLabel primaryText="Status" secondaryText="READY TO SCAN" mode="emphasis" />
          <DTLabel primaryText="Error" secondaryText="CONNECTION LOST" mode="warning" />
        </View>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          ALL VARIANTS:
        </Text>
        <View style={{ gap: 8, marginBottom: 16 }}>
          <DTLabel primaryText="Normal" mode="normal" />
          <DTLabel primaryText="Emphasis" mode="emphasis" />
          <DTLabel primaryText="Warning" mode="warning" />
          <DTLabel primaryText="Success" mode="success" />
          <DTLabel primaryText="Other" mode="other" />
        </View>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          FULL WIDTH:
        </Text>
        <View style={{ gap: 8, marginBottom: 16 }}>
          <DTLabel primaryText="Full Width Label" secondaryText="STRETCHES" mode="emphasis" fullWidth />
        </View>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          OPTIONS:
        </Text>
        <View style={{ gap: 8 }}>
          <DTLabel primaryText="No Ping Indicator" mode="normal" showIndicator={false} />
          <DTLabel primaryText="Not Animated" mode="other" animated={false} />
        </View>
      </DemoSection>

      {/* DTMediaFrame */}
      <DemoSection
        title="DTMediaFrame"
        variant="other"
        description="Beveled media wrapper with diagonal symmetry (top-left + bottom-right)."
      >
        <DTMediaFrame variant="normal" aspectRatio={16 / 9} style={{ marginBottom: 8 }}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/dt-media1/800/450' }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />
        </DTMediaFrame>
        <CodeLabel text='variant="normal" aspectRatio={16/9}' />

        <DTMediaFrame variant="emphasis" aspectRatio={1} bevelSize={24} style={{ marginTop: 16, marginBottom: 8 }}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/dt-media2/400/400' }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />
        </DTMediaFrame>
        <CodeLabel text='variant="emphasis" aspectRatio={1} bevelSize={24}' />

        <DTMediaFrame variant="warning" aspectRatio={4 / 3} borderWidth={4} style={{ marginTop: 16, marginBottom: 8 }}>
          <Image
            source={{ uri: 'https://picsum.photos/seed/dt-media3/600/450' }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />
        </DTMediaFrame>
        <CodeLabel text='variant="warning" aspectRatio={4/3} borderWidth={4}' />

        <DTMediaFrame variant="success" aspectRatio={16 / 9} animated={false} style={{ marginTop: 16, marginBottom: 8 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a' }}>
            <Text style={{ color: theme.custom.modeSuccess }}>PLACEHOLDER CONTENT</Text>
          </View>
        </DTMediaFrame>
        <CodeLabel text='animated={false} — custom View children' />
      </DemoSection>
    </ScreenContainer>
  );
}
