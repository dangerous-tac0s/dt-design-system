import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useDTTheme } from '@dangerousthings/react-native';
import { ScreenContainer } from '../components/ScreenContainer';
import { DemoSection } from '../components/DemoSection';
import { BrandSwitcher } from '../components/BrandSwitcher';
import { useBrand } from '../brand/BrandContext';

const typographyScale = [
  { variant: 'displaySmall' as const, label: 'Display Small (36px)' },
  { variant: 'headlineMedium' as const, label: 'Headline Medium (28px)' },
  { variant: 'headlineSmall' as const, label: 'Headline Small (24px)' },
  { variant: 'titleLarge' as const, label: 'Title Large (22px)' },
  { variant: 'titleMedium' as const, label: 'Title Medium (16px)' },
  { variant: 'bodyLarge' as const, label: 'Body Large (16px)' },
  { variant: 'bodyMedium' as const, label: 'Body Medium (14px)' },
  { variant: 'bodySmall' as const, label: 'Body Small (12px)' },
  { variant: 'labelLarge' as const, label: 'Label Large (14px)' },
  { variant: 'labelSmall' as const, label: 'Label Small (11px)' },
];

export function ThemeScreen() {
  const theme = useDTTheme();
  const { brand } = useBrand();
  const colors = brand.dark;

  const colorSwatches = [
    { name: 'primary', hex: colors.primary, label: 'Primary interactive' },
    { name: 'secondary', hex: colors.secondary, label: 'Highlights, attention' },
    { name: 'error', hex: colors.error, label: 'Errors, destructive' },
    { name: 'success', hex: colors.success, label: 'Confirmations' },
    { name: 'other', hex: colors.other, label: 'Secondary, misc' },
  ];

  const baseColors = [
    { name: 'bg', hex: colors.bg, label: 'Background', textColor: colors.textPrimary },
    { name: 'textPrimary', hex: colors.textPrimary, label: 'Text', textColor: colors.bg },
    { name: 'surface', hex: colors.surface, label: 'Surface', textColor: colors.textPrimary },
    { name: 'border', hex: colors.border, label: 'Border', textColor: colors.bg },
  ];

  return (
    <ScreenContainer>
      {/* Brand Switcher */}
      <DemoSection
        title="Brand Selector"
        variant="emphasis"
        description="Switch between all three brand themes."
      >
        <BrandSwitcher />
        <Text variant="bodySmall" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          Current: {brand.name} — {brand.description}
        </Text>
      </DemoSection>

      {/* Color Palette */}
      <DemoSection
        title="Color Palette"
        variant="normal"
        description={`The ${brand.name} color system. Semantic variants on dark background.`}
      >
        <Text variant="labelSmall" style={styles.subLabel}>MODE COLORS:</Text>
        {colorSwatches.map((swatch) => (
          <View key={swatch.name} style={styles.swatchRow}>
            <View style={[styles.swatch, { backgroundColor: swatch.hex }]} />
            <View style={styles.swatchInfo}>
              <Text style={[styles.swatchName, { color: swatch.hex }]}>{swatch.name}</Text>
              <Text style={styles.swatchHex}>{swatch.hex}</Text>
              <Text style={styles.swatchDesc}>{swatch.label}</Text>
            </View>
          </View>
        ))}

        <Text variant="labelSmall" style={[styles.subLabel, { marginTop: 20 }]}>BASE COLORS:</Text>
        {baseColors.map((color) => (
          <View key={color.name} style={styles.swatchRow}>
            <View style={[styles.swatch, { backgroundColor: color.hex, borderWidth: 1, borderColor: '#333' }]} />
            <View style={styles.swatchInfo}>
              <Text style={[styles.swatchName, { color: theme.colors.onSurface }]}>{color.name}</Text>
              <Text style={styles.swatchHex}>{color.hex}</Text>
              <Text style={styles.swatchDesc}>{color.label}</Text>
            </View>
          </View>
        ))}
      </DemoSection>

      {/* Typography */}
      <DemoSection
        title="Typography Scale"
        variant="emphasis"
        description={`MD3 type scale. Font: ${brand.typography.heading}`}
      >
        <View style={{ gap: 8 }}>
          {typographyScale.map((item) => (
            <View key={item.variant} style={styles.typeRow}>
              <Text variant={item.variant} style={{ color: theme.colors.onSurface }}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </DemoSection>

      {/* Shape Tokens */}
      <DemoSection
        title="Shape Tokens"
        variant="success"
        description="Bevel and radius values for the current brand."
      >
        <View style={styles.codeBlock}>
          <Text style={[styles.codeText, { color: theme.custom.modeSuccess }]}>
            {`bevelSm:  ${brand.shape.bevelSm}\nbevelMd:  ${brand.shape.bevelMd}\nbevelLg:  ${brand.shape.bevelLg}\nradiusSm: ${brand.shape.radiusSm}\nradius:   ${brand.shape.radius}\nradiusLg: ${brand.shape.radiusLg}`}
          </Text>
        </View>
      </DemoSection>

      {/* Spacing */}
      <DemoSection
        title="Spacing Reference"
        variant="other"
        description="Common spacing values used throughout the design system."
      >
        {[4, 8, 12, 16, 24, 32, 48].map((size) => (
          <View key={size} style={styles.spacingRow}>
            <View
              style={[
                styles.spacingBar,
                { width: size * 3, backgroundColor: theme.custom.modeOther },
              ]}
            />
            <Text style={styles.spacingLabel}>{size}px</Text>
          </View>
        ))}
      </DemoSection>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subLabel: {
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  swatch: {
    width: 40,
    height: 40,
  },
  swatchInfo: {
    flex: 1,
  },
  swatchName: {
    fontWeight: '600',
    fontSize: 14,
  },
  swatchHex: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontFamily: 'monospace',
  },
  swatchDesc: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
  },
  typeRow: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  codeBlock: {
    backgroundColor: '#0a0a0a',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 20,
  },
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  spacingBar: {
    height: 12,
  },
  spacingLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontFamily: 'monospace',
  },
});
