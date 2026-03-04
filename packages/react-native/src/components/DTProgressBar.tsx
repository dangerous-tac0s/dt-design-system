/**
 * DT ProgressBar Component
 *
 * A themed progress bar wrapping React Native Paper's ProgressBar
 * with the Dangerous Things angular aesthetic.
 *
 * Web CSS reference (.progress / .progress-indicator):
 * - Vertical or horizontal bar showing progress 0-100%
 * - Mode-colored fill
 */

import {StyleSheet, View, ViewStyle, StyleProp} from 'react-native';
import {ProgressBar, Text} from 'react-native-paper';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {useComponentLayout} from '../utils/useComponentLayout';

interface DTProgressBarProps {
  /**
   * Progress value between 0 and 1
   */
  value: number;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Orientation of the bar
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Bar thickness in pixels
   * @default 4
   */
  height?: number;
  /**
   * Whether to animate progress changes
   * @default true
   */
  animated?: boolean;
  /**
   * Show percentage label
   * @default false
   */
  showLabel?: boolean;
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled ProgressBar wrapping React Native Paper ProgressBar
 *
 * @example
 * <DTProgressBar value={0.75} variant="normal" />
 *
 * @example
 * <DTProgressBar value={0.5} variant="emphasis" showLabel />
 *
 * @example
 * <DTProgressBar value={0.3} orientation="vertical" height={100} variant="success" />
 */
export function DTProgressBar({
  value,
  variant = 'normal',
  orientation = 'horizontal',
  height = 4,
  animated: _animated = true,
  showLabel = false,
  color,
  style,
}: DTProgressBarProps) {
  const theme = useDTTheme();
  const accentColor = getVariantColor(theme, variant, color);
  const clampedValue = Math.max(0, Math.min(1, value));

  if (orientation === 'vertical') {
    return (
      <VerticalProgressBar
        value={clampedValue}
        color={accentColor}
        trackColor={theme.colors.surfaceDisabled}
        width={height}
        showLabel={showLabel}
        style={style}
      />
    );
  }

  return (
    <View style={[styles.horizontalContainer, style]}>
      <ProgressBar
        progress={clampedValue}
        color={accentColor}
        style={[styles.bar, {height}]}
        theme={{
          colors: {
            surfaceVariant: theme.colors.surfaceDisabled,
          },
        }}
      />
      {showLabel && (
        <Text style={[styles.label, {color: accentColor}]}>
          {Math.round(clampedValue * 100)}%
        </Text>
      )}
    </View>
  );
}

/**
 * Vertical progress bar using measured pixel height instead of
 * percentage strings (which don't animate smoothly in RN).
 */
function VerticalProgressBar({
  value,
  color,
  trackColor,
  width,
  showLabel,
  style,
}: {
  value: number;
  color: string;
  trackColor: string;
  width: number;
  showLabel: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const fillHeight = hasDimensions ? dimensions.height * value : 0;

  return (
    <View style={[styles.verticalContainer, {width}, style]}>
      <View style={[styles.verticalTrack, {backgroundColor: trackColor}]} onLayout={onLayout}>
        <View
          style={[
            styles.verticalFill,
            {
              backgroundColor: color,
              height: fillHeight,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={[styles.label, {color}]}>
          {Math.round(value * 100)}%
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    gap: 8,
  },
  bar: {
    borderRadius: 0,
  },
  verticalContainer: {
    alignItems: 'center',
    gap: 8,
  },
  verticalTrack: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  verticalFill: {
    width: '100%',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
