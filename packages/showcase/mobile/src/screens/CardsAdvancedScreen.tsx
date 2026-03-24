import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  DTCard,
  DTChip,
  DTBadgeOverlay,
  useDTTheme,
} from '@dangerousthings/react-native';
import type { DTVariant } from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';

export function CardsAdvancedScreen() {
  const theme = useDTTheme();
  const modes: DTVariant[] = ['normal', 'emphasis', 'warning', 'success', 'other'];

  return (
    <ScreenContainer>
      {/* Progress Bar */}
      <DemoSection
        title="Progress Bar"
        variant="normal"
        description="Vertical left-edge progress indicator (0–1)."
      >
        {[0, 0.25, 0.5, 0.75, 1].map((val, i) => (
          <DTCard
            key={val}
            mode={modes[i]}
            title={`${Math.round(val * 100)}% PROGRESS`}
            progress={val}
            style={{ marginBottom: 12 }}
          >
            <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
              progress=&#123;{val}&#125;
            </Text>
          </DTCard>
        ))}
        <CodeLabel text="<DTCard progress={0.5}> — width matches bevelSizeSmall" />
      </DemoSection>

      {/* Card Badges */}
      <DemoSection
        title="Card Badges"
        variant="other"
        description="Bottom-right chip badges. Color matches badge category, not card mode."
      >
        <DTCard mode="normal" title="PRODUCT CARD" style={{ marginBottom: 16 }}>
          <View style={{ minHeight: 40 }}>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
              Badge color independent of card mode
            </Text>
          </View>
          <DTBadgeOverlay position="bottom-right">
            <DTChip variant="warning">LAB</DTChip>
          </DTBadgeOverlay>
        </DTCard>

        <DTCard mode="emphasis" title="PRODUCT CARD" style={{ marginBottom: 16 }}>
          <View style={{ minHeight: 40 }}>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
              Badge color independent of card mode
            </Text>
          </View>
          <DTBadgeOverlay position="bottom-right">
            <DTChip variant="other">BUNDLE</DTChip>
          </DTBadgeOverlay>
        </DTCard>

        <DTCard mode="success" title="PRODUCT CARD" style={{ marginBottom: 16 }}>
          <View style={{ minHeight: 40 }}>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
              Badge color independent of card mode
            </Text>
          </View>
          <DTBadgeOverlay position="bottom-right">
            <DTChip variant="emphasis">NEW</DTChip>
          </DTBadgeOverlay>
        </DTCard>

        <CodeLabel text="<DTBadgeOverlay position='bottom-right'><DTChip variant='warning'>LAB</DTChip>" />
      </DemoSection>

    </ScreenContainer>
  );
}
