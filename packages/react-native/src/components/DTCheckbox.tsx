/**
 * DT Checkbox Component
 *
 * Custom-built angular checkbox following the Dangerous Things design language.
 * Uses SVG for beveled shape and checkmark — RNP Checkbox enforces
 * rounded corners (borderRadius: 18) so we build from scratch.
 *
 * Uses diagonal-symmetry bevels (top-left + bottom-right) on the indicator.
 */

import {StyleSheet, View, ViewStyle, TextStyle, StyleProp, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildBeveledRectPath} from '../utils/bevelPaths';

interface DTCheckboxProps {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;
  /**
   * Press handler to toggle state
   */
  onPress: () => void;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Label text displayed beside the checkbox
   */
  label?: string;
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean;
  /**
   * Size of the checkbox in pixels
   * @default 24
   */
  size?: number;
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the label text
   */
  labelStyle?: StyleProp<TextStyle>;
}

/**
 * DT-styled Checkbox with beveled opposing corners (top-left + bottom-right)
 *
 * @example
 * <DTCheckbox checked={isChecked} onPress={() => setChecked(!isChecked)} label="Remember me" />
 *
 * @example
 * <DTCheckbox checked={true} onPress={toggle} variant="success" label="Accepted" />
 */
export function DTCheckbox({
  checked,
  onPress,
  variant = 'normal',
  label,
  disabled = false,
  size = 24,
  color,
  style,
  labelStyle,
}: DTCheckboxProps) {
  const theme = useDTTheme();
  const accentColor = getVariantColor(theme, variant, color);
  const opacity = disabled ? 0.5 : 1;
  const borderWidth = 2;
  const useBevels = theme.custom.bevelMd > 0;
  const bevelSize = Math.round(size * 0.3);

  // Outer beveled path (border)
  const outerPath = useBevels
    ? buildBeveledRectPath(size, size, {
        corners: {topLeft: bevelSize, bottomRight: bevelSize},
        strokeWidth: borderWidth,
      })
    : '';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.container,
        {opacity: pressed ? 0.7 : opacity},
        style,
      ]}>
      {useBevels ? (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Path
            d={outerPath}
            fill={checked ? accentColor : 'transparent'}
            stroke={accentColor}
            strokeWidth={borderWidth}
          />
          {checked && (
            <Path
              d={`M ${size * 0.2} ${size * 0.5} L ${size * 0.4} ${size * 0.7} L ${size * 0.8} ${size * 0.25}`}
              fill="none"
              stroke={theme.colors.onPrimary}
              strokeWidth={borderWidth + 0.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderWidth,
            borderColor: accentColor,
            borderRadius: theme.custom.radiusSm,
            backgroundColor: checked ? accentColor : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {checked && (
            <Text style={{color: theme.colors.onPrimary, fontSize: size * 0.6, lineHeight: size * 0.7}}>✓</Text>
          )}
        </View>
      )}
      {label && (
        <Text style={[styles.label, {color: theme.colors.onSurface}, labelStyle]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
