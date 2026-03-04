/**
 * DT Card Component
 *
 * A themed card following the Dangerous Things design language
 * with SVG-based beveled corners matching the web storefront style.
 *
 * Web CSS reference:
 * - Bottom-right bevel: 2em (~32px)
 * - Bottom-left bevel: 1em (~16px)
 * - Border width: 0.2em (~3px)
 */

import {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {DTColors} from '../theme/colors';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildCardBevelPath} from '../utils/bevelPaths';
import {useComponentLayout} from '../utils/useComponentLayout';

interface DTCardProps {
  children: ReactNode;
  /**
   * Color mode for the card accent
   * @default 'normal'
   */
  mode?: DTVariant;
  /**
   * Custom border color (overrides mode)
   */
  borderColor?: string;
  /**
   * Card title (displayed in header)
   */
  title?: string;
  /**
   * Whether to show the accent header bar
   * @default true when title is provided
   */
  showHeader?: boolean;
  /**
   * Additional styles for the card container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the content area
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Inner content padding
   * @default 16
   */
  padding?: number;
  /**
   * Border width in pixels
   * @default 3
   */
  borderWidth?: number;
  /**
   * Bottom-right bevel size in pixels
   * @default 32
   */
  bevelSize?: number;
  /**
   * Bottom-left bevel size in pixels (smaller accent bevel)
   * @default 16
   */
  bevelSizeSmall?: number;
  /**
   * Background color
   * @default '#000000'
   */
  backgroundColor?: string;
  /**
   * Press handler
   */
  onPress?: () => void;
}

/**
 * DT-styled Card component with SVG beveled corners
 *
 * @example
 * <DTCard title="Detected Chip" mode="normal">
 *   <Text>NTAG215</Text>
 * </DTCard>
 *
 * @example
 * <DTCard mode="emphasis" onPress={handlePress}>
 *   <Text>Tap to scan</Text>
 * </DTCard>
 */
export function DTCard({
  children,
  mode = 'normal',
  borderColor,
  title,
  showHeader,
  style,
  contentStyle,
  padding = 16,
  borderWidth = 3,
  bevelSize = 32,
  bevelSizeSmall = 16,
  backgroundColor = '#000000',
  onPress,
}: DTCardProps) {
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const accentColor = getVariantColor(mode, borderColor);
  const shouldShowHeader = showHeader ?? !!title;

  const {width, height} = dimensions;

  // Outer bevel path (full card shape)
  const outerPath = hasDimensions
    ? buildCardBevelPath(width, height, bevelSize, bevelSizeSmall, 0)
    : '';
  // Inner bevel path at border inset (for background + frame cutout)
  const innerPath = hasDimensions
    ? buildCardBevelPath(width, height, bevelSize - borderWidth, bevelSizeSmall - borderWidth, borderWidth)
    : '';

  const content = (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {/* Background fill (behind content) */}
      {hasDimensions && (
        <Svg
          style={StyleSheet.absoluteFill}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}>
          <Path d={innerPath} fill={backgroundColor} />
        </Svg>
      )}
      <View style={styles.innerContainer}>
        {shouldShowHeader && (
          <View style={[styles.header, {backgroundColor: accentColor}]}>
            {title && (
              <Text
                variant="titleMedium"
                style={[styles.headerText, {color: DTColors.dark}]}>
                {title}
              </Text>
            )}
          </View>
        )}
        <View style={[styles.content, {padding}, contentStyle]}>{children}</View>
      </View>
      {/* Frame overlay (above content) — clips content at beveled border */}
      {hasDimensions && (
        <Svg
          style={[StyleSheet.absoluteFill, styles.frameOverlay]}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          pointerEvents="none">
          <Path
            d={outerPath + ' ' + innerPath}
            fillRule="evenodd"
            fill={accentColor}
          />
        </Svg>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => ({opacity: pressed ? 0.8 : 1})}>
        {content}
      </Pressable>
    );
  }

  return content;
}

/**
 * DT design system constants matching web CSS variables
 */
export const DTCardClipPath = {
  // CSS-style clip path (for web reference)
  css: `polygon(
    0% 0%,
    100% 0%,
    100% calc(100% - 2em),
    calc(100% - 2em) 100%,
    1em 100%,
    0% calc(100% - 1em)
  )`,
  // Default bevel sizes in pixels (matching 2em and 1em at 16px base)
  bevelSize: 32,
  bevelSizeSmall: 16,
  borderWidth: 3,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  innerContainer: {
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {},
  frameOverlay: {
    zIndex: 2,
  },
});
