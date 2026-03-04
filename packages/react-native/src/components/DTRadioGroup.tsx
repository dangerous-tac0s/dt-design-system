/**
 * DT RadioGroup + RadioOption Components
 *
 * Custom-built angular radio selection following the Dangerous Things design language.
 * RNP RadioButton uses circular geometry with animated SVG circles,
 * so we build hexagonal indicators from scratch.
 *
 * Web CSS reference (AddOnSelector single-select):
 * - Selected: border highlight + semi-transparent fill (var(--selected) at 70% opacity)
 * - Hexagon indicator instead of circular radio button
 */

import {createContext, useContext} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Polygon} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

// --- Context ---

interface RadioContextValue {
  value: string | null;
  onValueChange: (value: string) => void;
  variant: DTVariant;
}

const RadioContext = createContext<RadioContextValue | null>(null);

// --- DTRadioGroup ---

interface DTRadioGroupProps {
  /**
   * Currently selected value
   */
  value: string | null;
  /**
   * Called when selection changes
   */
  onValueChange: (value: string) => void;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Radio option children
   */
  children: React.ReactNode;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled RadioGroup container
 *
 * @example
 * <DTRadioGroup value={selected} onValueChange={setSelected} variant="normal">
 *   <DTRadioOption value="a" label="Option A" />
 *   <DTRadioOption value="b" label="Option B" description="With description" />
 * </DTRadioGroup>
 */
export function DTRadioGroup({
  value,
  onValueChange,
  variant = 'normal',
  children,
  style,
}: DTRadioGroupProps) {
  return (
    <RadioContext.Provider value={{value, onValueChange, variant}}>
      <View style={[styles.group, style]}>{children}</View>
    </RadioContext.Provider>
  );
}

// --- DTRadioOption ---

interface DTRadioOptionProps {
  /**
   * Value identifier for this option
   */
  value: string;
  /**
   * Label text
   */
  label: string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Whether this option is disabled
   */
  disabled?: boolean;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

const INDICATOR_SIZE = 22;
const INDICATOR_INNER = 12;
const INDICATOR_BORDER = 2;

/** Generate flat-top hexagon points string for SVG Polygon */
function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6; // flat-top: start at -30°
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return pts.join(' ');
}

/** Convert hex color to rgba with given alpha */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * DT-styled RadioOption with hexagonal indicator
 *
 * Must be used inside a DTRadioGroup.
 *
 * @example
 * <DTRadioOption value="option1" label="First option" />
 */
export function DTRadioOption({
  value,
  label,
  description,
  disabled = false,
  style,
}: DTRadioOptionProps) {
  const theme = useDTTheme();
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('DTRadioOption must be used inside DTRadioGroup');
  }

  const {value: selectedValue, onValueChange, variant} = context;
  const isSelected = selectedValue === value;
  const accentColor = getVariantColor(theme, variant);
  const selectedBgColor = hexToRgba(accentColor, 0.7);
  const unselectedBorderColor = hexToRgba(theme.custom.modeNormal, 0.3);
  const opacity = disabled ? 0.5 : 1;

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(value)}
      style={({pressed}) => [
        styles.option,
        {
          borderColor: isSelected ? accentColor : unselectedBorderColor,
          backgroundColor: isSelected ? selectedBgColor : 'transparent',
          opacity: pressed ? 0.7 : opacity,
        },
        style,
      ]}>
      {/* Hexagon indicator */}
      <Svg
        width={INDICATOR_SIZE}
        height={INDICATOR_SIZE}
        viewBox={`0 0 ${INDICATOR_SIZE} ${INDICATOR_SIZE}`}>
        <Polygon
          points={hexPoints(INDICATOR_SIZE / 2, INDICATOR_SIZE / 2, INDICATOR_SIZE / 2 - INDICATOR_BORDER / 2)}
          fill="transparent"
          stroke={accentColor}
          strokeWidth={INDICATOR_BORDER}
          strokeLinejoin="miter"
        />
        {isSelected && (
          <Polygon
            points={hexPoints(INDICATOR_SIZE / 2, INDICATOR_SIZE / 2, INDICATOR_INNER / 2)}
            fill={accentColor}
          />
        )}
      </Svg>
      {/* Text content */}
      <View style={styles.optionText}>
        <Text
          style={[
            styles.optionLabel,
            {color: isSelected ? theme.colors.onPrimary : theme.colors.onSurface},
          ]}>
          {label}
        </Text>
        {description && (
          <Text
            variant="bodySmall"
            style={[
              styles.optionDescription,
              {color: isSelected ? theme.colors.onPrimary : theme.colors.onSurfaceDisabled},
            ]}>
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 2,
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  optionDescription: {
    fontSize: 12,
    letterSpacing: 0.2,
  },
});
