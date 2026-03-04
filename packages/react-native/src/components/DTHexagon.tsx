/**
 * DT Hexagon Component
 *
 * Decorative hexagon shape following the Dangerous Things design language.
 * No RNP equivalent — purely SVG-based.
 *
 * Web CSS reference (AnimatedHexagon / HexagonHamburgerMenu):
 * - Flat-top hexagon shape
 * - Optional rotation and pulse animations
 * - Used for loading indicators, backgrounds, menu icons
 */

import {useRef, useEffect} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, Animated} from 'react-native';
import Svg, {Polygon} from 'react-native-svg';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

interface DTHexagonProps {
  /**
   * Hexagon diameter in pixels
   */
  size: number;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Whether the hexagon has a solid fill
   * @default true
   */
  filled?: boolean;
  /**
   * Whether to animate
   * @default false
   */
  animated?: boolean;
  /**
   * Animation type
   * @default 'none'
   */
  animationType?: 'rotate' | 'pulse' | 'none';
  /**
   * Animation duration in milliseconds
   * @default 2000
   */
  animationDuration?: number;
  /**
   * Stroke/border width when not filled
   * @default 2
   */
  borderWidth?: number;
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Opacity
   * @default 1
   */
  opacity?: number;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Content rendered centered inside the hexagon
   */
  children?: React.ReactNode;
}

/**
 * Build flat-top hexagon SVG polygon points
 */
function buildHexagonPoints(size: number): string {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  return [0, 1, 2, 3, 4, 5]
    .map(i => {
      const angle = (Math.PI / 3) * i - Math.PI / 6; // flat-top orientation
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(' ');
}

/**
 * DT-styled decorative Hexagon
 *
 * @example
 * <DTHexagon size={60} variant="normal" />
 *
 * @example
 * <DTHexagon size={40} variant="emphasis" animated animationType="rotate" />
 *
 * @example
 * <DTHexagon size={80} variant="success" filled={false} animated animationType="pulse" />
 */
export function DTHexagon({
  size,
  variant = 'normal',
  filled = true,
  animated = false,
  animationType = 'none',
  animationDuration = 2000,
  borderWidth = 2,
  color,
  opacity: opacityProp = 1,
  style,
  children,
}: DTHexagonProps) {
  const accentColor = getVariantColor(variant, color);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animated) {
      rotateAnim.setValue(0);
      pulseAnim.setValue(1);
      return;
    }

    if (animationType === 'rotate') {
      const animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      );
      animation.start();
      return () => {
        animation.stop();
        rotateAnim.setValue(0);
      };
    }

    if (animationType === 'pulse') {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: animationDuration / 2,
            useNativeDriver: true,
          }),
        ]),
      );
      animation.start();
      return () => {
        animation.stop();
        pulseAnim.setValue(1);
      };
    }
  }, [animated, animationType, animationDuration, rotateAnim, pulseAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedOpacity =
    animated && animationType === 'pulse' ? pulseAnim : opacityProp;

  const transform =
    animated && animationType === 'rotate'
      ? [{rotate: rotation}]
      : [];

  const points = buildHexagonPoints(size);

  return (
    <Animated.View
      style={[
        styles.container,
        {width: size, height: size, opacity: animatedOpacity},
        transform.length > 0 ? {transform} : undefined,
        style,
      ]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Polygon
          points={points}
          fill={filled ? accentColor : 'transparent'}
          stroke={accentColor}
          strokeWidth={filled ? 0 : borderWidth}
        />
      </Svg>
      {children && (
        <View style={[StyleSheet.absoluteFill, styles.childrenContainer]}>
          {children}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  childrenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
