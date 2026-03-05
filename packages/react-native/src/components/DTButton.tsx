/**
 * DT Button Component
 *
 * Interactive bevel button matching the storefront .menu-item-clipped pattern:
 * - Default: outlined rectangle, no bevel, colored border with thick top
 * - Pressed/hover: bottom-right bevel appears, fills with mode color, text goes dark
 * - Selected: bevel persists, fills with 70% opacity mode color
 */

import {useRef, useEffect} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, Pressable, Animated} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path, Rect} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildBeveledRectPath} from '../utils/bevelPaths';
import {useComponentLayout} from '../utils/useComponentLayout';

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
   * - 'outlined': Border with transparent background, bevel on press (default)
   * - 'contained': Filled background with static bevel
   * @default 'outlined'
   */
  mode?: 'outlined' | 'contained';
  /**
   * Whether the button is in a persistent selected state
   * (bevel visible, filled with 70% opacity mode color)
   */
  selected?: boolean;
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
   * Bevel size in pixels (bottom-right corner)
   * @default 16
   */
  bevelSize?: number;
}

export function DTButton({
  children,
  variant = 'normal',
  mode = 'outlined',
  selected = false,
  color,
  onPress,
  disabled = false,
  style,
  borderWidth = 2,
  bevelSize = 16,
}: DTButtonProps) {
  const theme = useDTTheme();
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pressed = useRef(false);

  const accentColor = getVariantColor(theme, variant, color);
  const selectedColor = accentColor + 'B3'; // ~70% opacity
  const isContained = mode === 'contained';
  const useBevels = theme.custom.bevelMd > 0;

  const {width, height} = dimensions;

  // Build SVG paths: rectangle (default) and beveled (active)
  const rectPath = hasDimensions
    ? buildBeveledRectPath(width, height, {corners: {}, strokeWidth: borderWidth})
    : '';
  const bevelPath = useBevels && hasDimensions
    ? buildBeveledRectPath(width, height, {
        corners: {bottomRight: bevelSize},
        strokeWidth: borderWidth,
      })
    : '';

  // Pulse animation for pressed/selected hover
  useEffect(() => {
    if (selected) {
      // No pulse when just selected (matches storefront: animation: none on .selected)
      pulseAnim.setValue(1);
    }
    return () => {
      pulseAnim.stopAnimation();
    };
  }, [selected, pulseAnim]);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopPulse = () => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
  };

  const handlePressIn = () => {
    pressed.current = true;
    startPulse();
  };

  const handlePressOut = () => {
    pressed.current = false;
    if (!selected) {
      stopPulse();
    }
  };

  // Determine visual state
  const showBevel = isContained || selected;

  const getBgColor = (isPressed: boolean) => {
    if (isContained) return accentColor;
    if (selected) return selectedColor;
    if (isPressed) return accentColor;
    return 'transparent';
  };

  const getTextColor = (isPressed: boolean) => {
    if (isContained || selected || isPressed) return theme.colors.onPrimary;
    return accentColor;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{opacity: disabled ? 0.5 : 1}, style]}>
      {({pressed: isPressedState}) => (
        <Animated.View
          style={[styles.container, {opacity: pulseAnim}]}
          onLayout={onLayout}>
          {/* Non-beveled mode (classic brand) */}
          {!useBevels && (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  borderWidth,
                  borderColor: accentColor,
                  borderTopWidth: 5,
                  borderRadius: theme.custom.radiusSm,
                  backgroundColor: getBgColor(isPressedState),
                },
              ]}
            />
          )}
          {/* Beveled mode (DT brand) */}
          {useBevels && hasDimensions && (
            <Svg
              style={StyleSheet.absoluteFill}
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}>
              <Path
                d={(isPressedState || showBevel) ? bevelPath : rectPath}
                fill={getBgColor(isPressedState)}
                stroke={accentColor}
                strokeWidth={borderWidth}
              />
              {/* Thick top accent — rendered inside SVG for exact alignment */}
              <Rect
                x={borderWidth / 2}
                y={0}
                width={width - borderWidth}
                height={5}
                fill={accentColor}
              />
            </Svg>
          )}
          <View style={styles.content}>
            {typeof children === 'string' ? (
              <Text
                variant="labelLarge"
                style={[styles.label, {color: getTextColor(isPressedState)}]}>
                {children}
              </Text>
            ) : (
              children
            )}
          </View>
        </Animated.View>
      )}
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
