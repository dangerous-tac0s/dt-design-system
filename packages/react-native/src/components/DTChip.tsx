/**
 * DT Chip Component
 *
 * A themed chip/tag following the Dangerous Things design language.
 * Useful for displaying chip types, statuses, and labels.
 */

// React import not needed with new JSX transform
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Chip, ChipProps } from 'react-native-paper';
import { DTColors } from '../theme/colors';

type DTChipVariant = 'normal' | 'emphasis' | 'warning' | 'success' | 'other';

interface DTChipProps extends Omit<ChipProps, 'mode'> {
  /**
   * Visual variant of the chip
   * @default 'normal'
   */
  variant?: DTChipVariant;
  /**
   * Whether the chip is in selected state
   * @default false
   */
  selected?: boolean;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

const variantColors: Record<DTChipVariant, string> = {
  normal: DTColors.modeNormal,
  emphasis: DTColors.modeEmphasis,
  warning: DTColors.modeWarning,
  success: DTColors.modeSuccess,
  other: DTColors.modeOther,
};

/**
 * DT-styled Chip component
 *
 * @example
 * <DTChip variant="normal">NTAG215</DTChip>
 *
 * @example
 * <DTChip variant="success" selected>Cloneable</DTChip>
 *
 * @example
 * <DTChip variant="warning">Non-Cloneable</DTChip>
 */
export function DTChip({
  variant = 'normal',
  selected = false,
  style,
  children,
  ...props
}: DTChipProps) {
  const color = variantColors[variant];

  const chipStyle: ViewStyle = {
    backgroundColor: selected ? color : 'transparent',
    borderColor: color,
    borderWidth: 1,
    borderRadius: 0, // Angular DT style
  };

  return (
    <Chip
      {...props}
      mode="outlined"
      textStyle={[
        styles.text,
        { color: selected ? DTColors.dark : color },
      ]}
      style={[styles.chip, chipStyle, style]}
      selectedColor={color}
      selected={selected}
    >
      {children}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.5,
    fontSize: 12,
  },
});
