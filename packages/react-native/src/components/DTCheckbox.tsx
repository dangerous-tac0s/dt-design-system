/**
 * DT Checkbox Component
 *
 * Custom-built angular checkbox following the Dangerous Things design language.
 * Uses SVG for beveled shape and checkmark — RNP Checkbox enforces
 * rounded corners (borderRadius: 18) so we build from scratch.
 *
 * Uses diagonal-symmetry bevels (top-left + bottom-right) on the indicator.
 */

import {StyleSheet, ViewStyle, TextStyle, StyleProp, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {DTColors} from '../theme/colors';
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
  const accentColor = getVariantColor(variant, color);
  const opacity = disabled ? 0.5 : 1;
  const borderWidth = 2;
  const bevelSize = Math.round(size * 0.3);

  // Outer beveled path (border)
  const outerPath = buildBeveledRectPath(size, size, {
    corners: {topLeft: bevelSize, bottomRight: bevelSize},
    strokeWidth: borderWidth,
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.container,
        {opacity: pressed ? 0.7 : opacity},
        style,
      ]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Beveled border */}
        <Path
          d={outerPath}
          fill={checked ? accentColor : 'transparent'}
          stroke={accentColor}
          strokeWidth={borderWidth}
        />
        {/* Checkmark path (only when checked) */}
        {checked && (
          <Path
            d={`M ${size * 0.2} ${size * 0.5} L ${size * 0.4} ${size * 0.7} L ${size * 0.8} ${size * 0.25}`}
            fill="none"
            stroke={DTColors.dark}
            strokeWidth={borderWidth + 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>
      {label && (
        <Text style={[styles.label, {color: DTColors.light}, labelStyle]}>
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
