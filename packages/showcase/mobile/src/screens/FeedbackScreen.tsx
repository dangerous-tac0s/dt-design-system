import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { DTProgressBar, DTSearchInput, useDTTheme } from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { CodeLabel } from '../components/CodeLabel';

export function FeedbackScreen() {
  const theme = useDTTheme();
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingQuery, setLoadingQuery] = useState('NFC implants');

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 1 ? 0 : prev + 0.01));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScreenContainer>
      {/* DTProgressBar - Horizontal */}
      <DemoSection
        title="DTProgressBar - Horizontal"
        variant="normal"
        description="Wraps RNP ProgressBar with angular styling."
      >
        <View style={{ gap: 20 }}>
          <View>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
              25%
            </Text>
            <DTProgressBar value={0.25} variant="normal" />
          </View>

          <View>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
              50% WITH LABEL
            </Text>
            <DTProgressBar value={0.5} variant="emphasis" showLabel height={8} />
            <CodeLabel text='showLabel height={8}' />
          </View>

          <View>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
              75%
            </Text>
            <DTProgressBar value={0.75} variant="success" height={6} />
          </View>

          <View>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
              100% (WARNING)
            </Text>
            <DTProgressBar value={1.0} variant="warning" showLabel />
          </View>

          <View>
            <Text variant="labelSmall" style={{ color: theme.colors.onSurface, opacity: 0.6, marginBottom: 8 }}>
              ANIMATED ({Math.round(progress * 100)}%)
            </Text>
            <DTProgressBar value={progress} variant="normal" showLabel height={8} />
            <CodeLabel text="Live cycling 0% → 100% → repeat" />
          </View>
        </View>
      </DemoSection>

      {/* DTProgressBar - Vertical */}
      <DemoSection
        title="DTProgressBar - Vertical"
        variant="emphasis"
        description="Vertical orientation with height-based fill."
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 150, marginBottom: 8 }}>
          <DTProgressBar value={0.3} variant="normal" orientation="vertical" height={8} showLabel />
          <DTProgressBar value={0.5} variant="emphasis" orientation="vertical" height={8} showLabel />
          <DTProgressBar value={0.75} variant="success" orientation="vertical" height={8} showLabel />
          <DTProgressBar value={1.0} variant="warning" orientation="vertical" height={8} showLabel />
          <DTProgressBar value={0.15} variant="other" orientation="vertical" height={12} showLabel />
        </View>
        <CodeLabel text='orientation="vertical"' />
      </DemoSection>

      {/* DTSearchInput */}
      <DemoSection
        title="DTSearchInput"
        variant="normal"
        description="Wraps RNP Searchbar with angular styling."
      >
        <View style={{ gap: 16 }}>
          <View>
            <DTSearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search components..."
              variant="normal"
            />
            <CodeLabel text='variant="normal"' />
          </View>

          <View>
            <DTSearchInput
              value={loadingQuery}
              onChangeText={setLoadingQuery}
              loading
              variant="emphasis"
              placeholder="Searching..."
            />
            <CodeLabel text='loading={true} variant="emphasis"' />
          </View>

          <View>
            <DTSearchInput
              value=""
              onChangeText={() => {}}
              variant="warning"
              placeholder="Disabled search"
              disabled
            />
            <CodeLabel text='disabled={true} variant="warning"' />
          </View>

          <View>
            <DTSearchInput
              value=""
              onChangeText={() => {}}
              variant="other"
              placeholder="Other variant..."
            />
            <CodeLabel text='variant="other"' />
          </View>
        </View>
      </DemoSection>
    </ScreenContainer>
  );
}
