import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { DTButton, DTChip, DTHexagon, useDTTheme } from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { DemoRow } from '../components/DemoRow';
import { CodeLabel } from '../components/CodeLabel';

export function ButtonsScreen() {
  const theme = useDTTheme();

  return (
    <ScreenContainer>
      {/* DTButton - Outlined */}
      <DemoSection
        title="DTButton - Outlined"
        variant="normal"
        description="Border with transparent background. Default mode."
      >
        <View style={{ gap: 12 }}>
          <DTButton variant="normal" onPress={() => {}}>NORMAL</DTButton>
          <CodeLabel text='variant="normal"' />

          <DTButton variant="emphasis" onPress={() => {}}>EMPHASIS</DTButton>
          <CodeLabel text='variant="emphasis"' />

          <DTButton variant="warning" onPress={() => {}}>WARNING</DTButton>
          <CodeLabel text='variant="warning"' />

          <DTButton variant="success" onPress={() => {}}>SUCCESS</DTButton>
          <CodeLabel text='variant="success"' />

          <DTButton variant="other" onPress={() => {}}>OTHER</DTButton>
          <CodeLabel text='variant="other"' />
        </View>
      </DemoSection>

      {/* DTButton - Contained */}
      <DemoSection
        title="DTButton - Contained"
        variant="emphasis"
        description="Filled background with dark text."
      >
        <View style={{ gap: 12 }}>
          <DTButton variant="normal" mode="contained" onPress={() => {}}>
            CONTAINED NORMAL
          </DTButton>
          <DTButton variant="emphasis" mode="contained" onPress={() => {}}>
            CONTAINED EMPHASIS
          </DTButton>
          <DTButton variant="warning" mode="contained" onPress={() => {}}>
            CONTAINED WARNING
          </DTButton>
          <DTButton variant="success" mode="contained" onPress={() => {}}>
            CONTAINED SUCCESS
          </DTButton>
          <DTButton variant="other" mode="contained" onPress={() => {}}>
            CONTAINED OTHER
          </DTButton>
        </View>
      </DemoSection>

      {/* DTButton - States */}
      <DemoSection
        title="DTButton - States"
        variant="warning"
        description="Disabled and custom bevel sizes."
      >
        <View style={{ gap: 12 }}>
          <DTButton variant="normal" disabled onPress={() => {}}>
            DISABLED
          </DTButton>
          <CodeLabel text="disabled={true}" />

          <DTButton variant="emphasis" bevelSize={16} onPress={() => {}}>
            LARGE BEVEL (16px)
          </DTButton>
          <CodeLabel text="bevelSize={16}" />

          <DTButton variant="success" bevelSize={0} onPress={() => {}}>
            NO BEVEL (0px)
          </DTButton>
          <CodeLabel text="bevelSize={0}" />

          <DTButton variant="other" borderWidth={4} onPress={() => {}}>
            THICK BORDER (4px)
          </DTButton>
          <CodeLabel text="borderWidth={4}" />
        </View>
      </DemoSection>

      {/* DTChip */}
      <DemoSection
        title="DTChip"
        variant="normal"
        description="Chips for tags and statuses. Wraps RNP Chip."
      >
        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          ALL VARIANTS:
        </Text>
        <DemoRow>
          <DTChip variant="normal">NTAG215</DTChip>
          <DTChip variant="emphasis">FEATURED</DTChip>
          <DTChip variant="warning">DEPRECATED</DTChip>
          <DTChip variant="success">ACTIVE</DTChip>
          <DTChip variant="other">BETA</DTChip>
        </DemoRow>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 16, marginBottom: 8 }}>
          SELECTED:
        </Text>
        <DemoRow>
          <DTChip variant="normal" selected>SELECTED</DTChip>
          <DTChip variant="emphasis" selected>SELECTED</DTChip>
          <DTChip variant="success" selected>SELECTED</DTChip>
        </DemoRow>
      </DemoSection>

      {/* DTHexagon */}
      <DemoSection
        title="DTHexagon"
        variant="other"
        description="Decorative hexagon shapes with optional animations."
      >
        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
          FILLED:
        </Text>
        <DemoRow>
          <DTHexagon size={60} variant="normal" />
          <DTHexagon size={60} variant="emphasis" />
          <DTHexagon size={60} variant="warning" />
          <DTHexagon size={60} variant="success" />
          <DTHexagon size={60} variant="other" />
        </DemoRow>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 20, marginBottom: 8 }}>
          OUTLINE:
        </Text>
        <DemoRow>
          <DTHexagon size={60} variant="normal" filled={false} />
          <DTHexagon size={60} variant="emphasis" filled={false} borderWidth={3} />
          <DTHexagon size={60} variant="warning" filled={false} />
        </DemoRow>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 20, marginBottom: 8 }}>
          ANIMATED:
        </Text>
        <DemoRow>
          <View style={{ alignItems: 'center' }}>
            <DTHexagon size={50} variant="normal" animated animationType="rotate" animationDuration={3000} />
            <CodeLabel text="rotate" />
          </View>
          <View style={{ alignItems: 'center' }}>
            <DTHexagon size={50} variant="emphasis" animated animationType="pulse" animationDuration={2000} />
            <CodeLabel text="pulse" />
          </View>
          <View style={{ alignItems: 'center' }}>
            <DTHexagon size={50} variant="other" filled={false} animated animationType="rotate" animationDuration={4000} />
            <CodeLabel text="rotate outline" />
          </View>
        </DemoRow>

        <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginTop: 20, marginBottom: 8 }}>
          WITH CONTENT:
        </Text>
        <DemoRow>
          <DTHexagon size={80} variant="normal">
            <Text style={{ color: theme.colors.background, fontWeight: '700', fontSize: 16 }}>DT</Text>
          </DTHexagon>
          <DTHexagon size={80} variant="emphasis" animated animationType="pulse">
            <Text style={{ color: theme.colors.background, fontWeight: '700', fontSize: 12 }}>SCAN</Text>
          </DTHexagon>
        </DemoRow>
      </DemoSection>
    </ScreenContainer>
  );
}
