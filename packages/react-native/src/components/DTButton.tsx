/**
 * DT Button Component
 *
 * A themed button following the Dangerous Things design language
 * with SVG-based beveled corners.
 */

import {StyleSheet, View, ViewStyle, StyleProp, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildButtonBevelPath} from '../utils/bevelPaths';
import {useComponentLayout} from '../utils/useComponentLayout';
import {useState} from 'react';

interface DTButtonProps {
  /**
   * Button content/label
   */
  children: React.ReactNode;
  /**
   * Visual variant of the button
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Button display mode
   * - 'outlined': Border with transparent background (default)
   * - 'contained': Filled background
   * @default 'outlined'
   */
  mode?: 'outlined' | 'contained';
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Press handler
   */
  onPress?: () => void;
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  /**
   * Additional styles for container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Border width
   * @default 2
   */
  borderWidth?: number;
  /**
   * Bevel size in pixels
   * @default 8
   */
  bevelSize?: number;
}

/**
 * DT-styled Button component with SVG beveled corners
 *
 * @example
 * <DTButton variant="normal" onPress={handleScan}>
 *   Scan NFC Tag
 * </DTButton>
 *
 * @example
 * <DTButton variant="emphasis" mode="contained" onPress={handleAction}>
 *   View Results
 * </DTButton>
 */
export function DTButton({
  children,
  variant = 'normal',
  mode = 'outlined',
  color,
  onPress,
  disabled = false,
  style,
  borderWidth = 2,
  bevelSize = 8,
}: DTButtonProps) {
  const theme = useDTTheme();
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const [pressed, setPressed] = useState(false);

  const accentColor = getVariantColor(theme, variant, color);
  const isContained = mode === 'contained';
  const bgColor = isContained ? accentColor : 'transparent';
  const textColor = isContained ? theme.colors.onPrimary : accentColor;

  const {width, height} = dimensions;
  const opacity = disabled ? 0.5 : pressed ? 0.7 : 1;
  const useBevels = theme.custom.bevelMd > 0;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[{opacity}, style]}>
      <View
        style={[
          styles.container,
          !useBevels && {
            borderWidth,
            borderColor: accentColor,
            borderRadius: theme.custom.radiusSm,
            backgroundColor: bgColor,
          },
        ]}
        onLayout={onLayout}>
        {useBevels && hasDimensions && (
          <Svg
            style={StyleSheet.absoluteFill}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}>
            <Path
              d={buildButtonBevelPath(width, height, bevelSize, borderWidth)}
              fill={bgColor}
              stroke={accentColor}
              strokeWidth={borderWidth}
            />
          </Svg>
        )}
        <View style={styles.content}>
          {typeof children === 'string' ? (
            <Text variant="labelLarge" style={[styles.label, {color: textColor}]}>
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: 44,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
