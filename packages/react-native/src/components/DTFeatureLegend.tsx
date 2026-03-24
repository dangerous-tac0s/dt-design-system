/**
 * DT Feature Legend
 *
 * Displays product features in a grid with icons and rotated labels.
 * Source: dt-shopify-storefront UseCaseLegend component.
 */

import {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp} from 'react-native';
import {Text} from 'react-native-paper';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

export interface DTFeatureItem {
  key: string;
  name: string;
  icon: ReactNode;
  state: 'supported' | 'disabled' | 'unsupported';
}

const stateToVariant: Record<DTFeatureItem['state'], DTVariant> = {
  supported: 'normal',
  disabled: 'emphasis',
  unsupported: 'warning',
};

interface DTFeatureLegendProps {
  features: DTFeatureItem[];
  /**
   * Header title text
   */
  title?: string;
  /**
   * Color variant for the header bar
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Number of columns in the grid
   * @default 5
   */
  columns?: number;
  /**
   * Icon size in pixels
   * @default 42
   */
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
}

export function DTFeatureLegend({
  features,
  title,
  variant = 'normal',
  columns = 5,
  iconSize = 42,
  style,
}: DTFeatureLegendProps) {
  const theme = useDTTheme();
  const headerColor = getVariantColor(theme, variant);
  const itemWidth = `${100 / columns}%` as const;

  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={[styles.header, {backgroundColor: headerColor}]}>
          <Text
            variant="labelLarge"
            style={[styles.headerText, {color: theme.colors.onPrimary}]}>
            {title}
          </Text>
        </View>
      )}
      <View style={styles.grid}>
        {features.map(feature => {
          const featureColor = getVariantColor(
            theme,
            stateToVariant[feature.state],
          );
          return (
            <View
              key={feature.key}
              style={[styles.item, {width: itemWidth as unknown as number}]}>
              <View style={[styles.iconContainer, {width: iconSize, height: iconSize}]}>
                {feature.icon}
              </View>
              <View style={styles.labelContainer}>
                <Text
                  style={[styles.label, {color: featureColor}]}>
                  {feature.name}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    paddingTop: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});
