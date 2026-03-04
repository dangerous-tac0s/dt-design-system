/**
 * DT MediaFrame Component
 *
 * A beveled frame for images and video content following the
 * Dangerous Things design language. No RNP equivalent.
 *
 * Web CSS reference (CyberMediaFrame / .media-frame-clipped):
 * - Top-left + bottom-right diagonal symmetry bevels
 * - Colored border with dark inner background
 * - Optional mount scale animation
 */

import {ReactNode, useRef, useEffect} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, Animated} from 'react-native';
import Svg, {Path, Defs, ClipPath} from 'react-native-svg';
import {DTColors} from '../theme/colors';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildMediaFrameBevelPath} from '../utils/bevelPaths';
import {useComponentLayout} from '../utils/useComponentLayout';

interface DTMediaFrameProps {
  /**
   * Content to frame (Image, Video, etc.)
   */
  children: ReactNode;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Aspect ratio (e.g., 16/9, 1, 4/3)
   */
  aspectRatio?: number;
  /**
   * Border width in pixels
   * @default 3
   */
  borderWidth?: number;
  /**
   * Bevel size in pixels (top-left and bottom-right)
   * @default 32
   */
  bevelSize?: number;
  /**
   * Whether to animate on mount
   * @default true
   */
  animated?: boolean;
  /**
   * Animation delay in milliseconds
   * @default 0
   */
  animationDelay?: number;
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Additional styles for outer container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the content area
   */
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * DT-styled MediaFrame with diagonal-symmetry beveled corners
 *
 * @example
 * <DTMediaFrame variant="normal" aspectRatio={16/9}>
 *   <Image source={{uri: imageUrl}} style={{flex: 1}} />
 * </DTMediaFrame>
 *
 * @example
 * <DTMediaFrame variant="emphasis" bevelSize={24}>
 *   <Video source={videoSource} />
 * </DTMediaFrame>
 */
export function DTMediaFrame({
  children,
  variant = 'normal',
  aspectRatio,
  borderWidth = 3,
  bevelSize = 32,
  animated = true,
  animationDelay = 0,
  color,
  style,
  contentStyle,
}: DTMediaFrameProps) {
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const scaleAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const accentColor = getVariantColor(variant, color);

  useEffect(() => {
    if (animated) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        delay: animationDelay,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, animationDelay, scaleAnim]);

  const {width, height} = dimensions;

  // Outer bevel path (full frame shape)
  const outerPath = hasDimensions
    ? buildMediaFrameBevelPath(width, height, bevelSize)
    : '';
  // Inner bevel path at border inset
  const innerPath = hasDimensions
    ? buildMediaFrameBevelPath(width, height, bevelSize - borderWidth, borderWidth)
    : '';

  return (
    <Animated.View
      style={[
        styles.container,
        aspectRatio ? {aspectRatio} : undefined,
        {transform: [{scale: scaleAnim}]},
        style,
      ]}
      onLayout={onLayout}>
      {/* Background fill (behind content) */}
      {hasDimensions && (
        <Svg
          style={StyleSheet.absoluteFill}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}>
          <Path d={innerPath} fill={DTColors.dark} />
        </Svg>
      )}
      {/* Content clipped to the inner bevel shape */}
      {hasDimensions ? (
        <View style={[styles.content, contentStyle]}>
          <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={StyleSheet.absoluteFill}>
            <Defs>
              <ClipPath id="mediaClip">
                <Path d={innerPath} />
              </ClipPath>
            </Defs>
          </Svg>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                margin: borderWidth,
                // Use borderRadius 0 to keep angular, overflow hidden clips rectangular part
                overflow: 'hidden',
              },
            ]}>
            {children}
          </View>
        </View>
      ) : (
        <View style={[styles.content, {padding: borderWidth}, contentStyle]}>
          {children}
        </View>
      )}
      {/* Frame overlay (above content) — masks content at beveled corners */}
      {hasDimensions && (
        <Svg
          style={[StyleSheet.absoluteFill, styles.frameOverlay]}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          pointerEvents="none">
          {/* Outer frame border */}
          <Path
            d={outerPath + ' ' + innerPath}
            fillRule="evenodd"
            fill={accentColor}
          />
          {/* Corner masks: fill the rectangular area outside the bevel shape with black
              to hide content that overflows past the beveled corners */}
          <Path
            d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z ` + outerPath}
            fillRule="evenodd"
            fill={DTColors.dark}
          />
        </Svg>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    flex: 1,
  },
  frameOverlay: {
    zIndex: 2,
  },
});
