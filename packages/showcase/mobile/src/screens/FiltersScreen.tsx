import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import {
  DTFeatureLegend,
  DTMobileFilterOverlay,
  DTButton,
  DTAccordion,
  useDTTheme,
} from '@dangerousthings/react-native';
import type { DTFeatureItem } from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';

const sampleFeatures: DTFeatureItem[] = [
  { key: 'payment', name: 'Payment', icon: null, state: 'supported' },
  { key: 'access', name: 'Access', icon: null, state: 'supported' },
  { key: 'clone', name: 'Clone', icon: null, state: 'disabled' },
  { key: 'crypto', name: 'Crypto', icon: null, state: 'unsupported' },
  { key: 'sensing', name: 'Sensing', icon: null, state: 'supported' },
  { key: 'temp', name: 'Temp', icon: null, state: 'supported' },
  { key: 'fitness', name: 'Fitness', icon: null, state: 'disabled' },
  { key: 'explore', name: 'Explore', icon: null, state: 'supported' },
  { key: 'vibration', name: 'Vibration', icon: null, state: 'unsupported' },
  { key: 'sharing', name: 'Sharing', icon: null, state: 'supported' },
];

export function FiltersScreen() {
  const theme = useDTTheme();
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <ScreenContainer>
      {/* Feature Legend */}
      <DemoSection
        title="DTFeatureLegend"
        variant="normal"
        description="Product feature grid with icons and rotated labels. Color indicates feature state."
      >
        <DTFeatureLegend
          features={sampleFeatures}
          variant="normal"
          title="NFC FEATURES"
          columns={5}
        />
        <CodeLabel text='<DTFeatureLegend features={...} variant="normal" columns={5}>' />
      </DemoSection>

      {/* Feature Legend — other variant */}
      <DemoSection
        title="Emphasis Variant"
        variant="emphasis"
        description="Feature legend with emphasis header color."
      >
        <DTFeatureLegend
          features={sampleFeatures.slice(0, 5)}
          variant="emphasis"
          title="KEY FEATURES"
          columns={5}
        />
        <CodeLabel text='variant="emphasis" — header uses emphasis color' />
      </DemoSection>

      {/* Mobile Filter Overlay */}
      <DemoSection
        title="DTMobileFilterOverlay"
        variant="warning"
        description="Full-screen slide-up overlay for mobile filter menus."
      >
        <DTButton
          variant="normal"
          onPress={() => setOverlayVisible(true)}
        >
          OPEN FILTER OVERLAY
        </DTButton>
        <CodeLabel text="<DTMobileFilterOverlay visible onDismiss={...}>" />

        <DTMobileFilterOverlay
          visible={overlayVisible}
          onDismiss={() => setOverlayVisible(false)}
          heading="FILTERS"
          activeFilterCount={3}
          onClearAll={() => setOverlayVisible(false)}
          variant="normal"
        >
          <DTAccordion
            sections={[
              {
                key: 'chip-type',
                title: 'CHIP TYPE',
                children: (
                  <View style={{ gap: 8 }}>
                    <Text style={{ color: theme.colors.onSurface }}>NTAG215</Text>
                    <Text style={{ color: theme.colors.onSurface }}>NTAG216</Text>
                    <Text style={{ color: theme.colors.onSurface }}>DESFire EV2</Text>
                  </View>
                ),
              },
              {
                key: 'frequency',
                title: 'FREQUENCY',
                children: (
                  <View style={{ gap: 8 }}>
                    <Text style={{ color: theme.colors.onSurface }}>13.56 MHz (HF)</Text>
                    <Text style={{ color: theme.colors.onSurface }}>125 kHz (LF)</Text>
                  </View>
                ),
              },
            ]}
          />
        </DTMobileFilterOverlay>
      </DemoSection>
    </ScreenContainer>
  );
}
