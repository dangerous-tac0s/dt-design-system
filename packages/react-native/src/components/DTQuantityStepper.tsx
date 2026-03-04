/**
 * DT QuantityStepper Component
 *
 * Custom-built quantity increment/decrement control following the
 * Dangerous Things design language. No RNP equivalent exists.
 *
 * Web CSS reference (AddOnOptionItem quantity controls):
 * - Plus/minus buttons with beveled corners
 * - Quantity display between buttons
 */

import {StyleSheet, View, ViewStyle, StyleProp, Pressable, Text as RNText} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildButtonBevelPath} from '../utils/bevelPaths';

type DTStepperSize = 'small' | 'medium' | 'large';

interface SizeConfig {
  buttonSize: number;
  fontSize: number;
  bevelSize: number;
  iconStrokeWidth: number;
  minWidth: number;
}

const sizeConfigs: Record<DTStepperSize, SizeConfig> = {
  small: {
    buttonSize: 28,
    fontSize: 12,
    bevelSize: 4,
    iconStrokeWidth: 1.5,
    minWidth: 28,
  },
  medium: {
    buttonSize: 36,
    fontSize: 16,
    bevelSize: 6,
    iconStrokeWidth: 2,
    minWidth: 36,
  },
  large: {
    buttonSize: 44,
    fontSize: 20,
    bevelSize: 8,
    iconStrokeWidth: 2.5,
    minWidth: 44,
  },
};

interface DTQuantityStepperProps {
  /**
   * Current quantity value
   */
  value: number;
  /**
   * Called when value changes
   */
  onValueChange: (value: number) => void;
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 99
   */
  max?: number;
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Whether the stepper is disabled
   */
  disabled?: boolean;
  /**
   * Label text displayed above the stepper
   */
  label?: string;
  /**
   * Size preset
   * @default 'medium'
   */
  size?: DTStepperSize;
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
 * DT-styled QuantityStepper with beveled +/- buttons
 *
 * @example
 * <DTQuantityStepper value={qty} onValueChange={setQty} label="Quantity" />
 *
 * @example
 * <DTQuantityStepper value={qty} onValueChange={setQty} min={1} max={10} variant="emphasis" />
 */
export function DTQuantityStepper({
  value,
  onValueChange,
  min = 0,
  max = 99,
  step = 1,
  variant = 'normal',
  disabled = false,
  label,
  size = 'medium',
  color,
  style,
}: DTQuantityStepperProps) {
  const theme = useDTTheme();
  const useBevels = theme.custom.bevelMd > 0;
  const accentColor = getVariantColor(theme, variant, color);
  const config = sizeConfigs[size];
  const atMin = value <= min;
  const atMax = value >= max;
  const borderWidth = 2;

  const handleDecrement = () => {
    const next = Math.max(min, value - step);
    onValueChange(next);
  };

  const handleIncrement = () => {
    const next = Math.min(max, value + step);
    onValueChange(next);
  };

  const renderStepButton = (
    type: 'minus' | 'plus',
    onPress: () => void,
    isDisabled: boolean,
  ) => {
    const s = config.buttonSize;
    const center = s / 2;
    const iconSize = s * 0.35;
    const sw = config.iconStrokeWidth;

    // Minus: horizontal line; Plus: cross
    const iconPath =
      type === 'minus'
        ? `M ${center - iconSize} ${center} L ${center + iconSize} ${center}`
        : `M ${center - iconSize} ${center} L ${center + iconSize} ${center} M ${center} ${center - iconSize} L ${center} ${center + iconSize}`;

    // Expand touch target to at least 44px
    const hitSlopSize = Math.max(0, (44 - s) / 2);
    const hitSlop = hitSlopSize > 0 ? hitSlopSize : undefined;

    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || isDisabled}
        hitSlop={hitSlop}
        style={({pressed}) => ({
          opacity: disabled || isDisabled ? 0.3 : pressed ? 0.7 : 1,
        })}>
        {useBevels ? (
          <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
            <Path
              d={buildButtonBevelPath(s, s, config.bevelSize, borderWidth)}
              fill="transparent"
              stroke={accentColor}
              strokeWidth={borderWidth}
            />
            <Path
              d={iconPath}
              fill="none"
              stroke={accentColor}
              strokeWidth={sw}
              strokeLinecap="round"
            />
          </Svg>
        ) : (
          <View style={{
            width: s,
            height: s,
            borderWidth,
            borderColor: accentColor,
            borderRadius: theme.custom.radiusSm,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <RNText style={{color: accentColor, fontSize: s * 0.5, lineHeight: s * 0.6}}>
              {type === 'minus' ? '−' : '+'}
            </RNText>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text style={[styles.label, {color: theme.colors.onSurface}]}>{label}</Text>
      )}
      <View style={styles.container}>
        {renderStepButton('minus', handleDecrement, atMin)}
        <View style={[styles.valueContainer, {minWidth: config.minWidth}]}>
          <Text
            style={[
              styles.valueText,
              {fontSize: config.fontSize, color: accentColor},
            ]}>
            {value}
          </Text>
        </View>
        {renderStepButton('plus', handleIncrement, atMax)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  valueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  valueText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
