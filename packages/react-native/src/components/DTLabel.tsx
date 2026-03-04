/**
 * DT Label Component
 *
 * A themed label following the Dangerous Things design language
 * with an SVG-based beveled top-right corner.
 *
 * Web CSS reference (CyberLabel):
 * - Top-right bevel: 1em (~16px)
 * - Solid filled background using mode color
 * - Black text on colored background
 */

import {ReactNode, useEffect, useRef} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, Animated} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildLabelBevelPath} from '../utils/bevelPaths';
import {useComponentLayout} from '../utils/useComponentLayout';

type DTLabelSize = 'small' | 'medium' | 'large';

interface SizeConfig {
  fontSize: number;
  fontSizeSecondary: number;
  paddingHorizontal: number;
  paddingVertical: number;
  bevel: number;
  indicatorWidth: number;
  gap: number;
}

const sizeConfigs: Record<DTLabelSize, SizeConfig> = {
  small: {
    fontSize: 11,
    fontSizeSecondary: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    bevel: 10,
    indicatorWidth: 12,
    gap: 3,
  },
  medium: {
    fontSize: 14,
    fontSizeSecondary: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    bevel: 16,
    indicatorWidth: 16,
    gap: 4,
  },
  large: {
    fontSize: 18,
    fontSizeSecondary: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    bevel: 22,
    indicatorWidth: 20,
    gap: 6,
  },
};

interface DTLabelProps {
  /**
   * Primary text content
   */
  primaryText: ReactNode;
  /**
   * Secondary text (displayed bold, after primary)
   */
  secondaryText?: ReactNode;
  /**
   * Color mode for the label
   * @default 'normal'
   */
  mode?: DTVariant;
  /**
   * Size of the label - affects text size and scales all dimensions
   * @default 'medium'
   */
  size?: DTLabelSize;
  /**
   * Whether the label should fill its container width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether to animate the label on mount
   * @default true
   */
  animated?: boolean;
  /**
   * Animation delay in milliseconds
   * @default 100
   */
  animationDelay?: number;
  /**
   * Animation duration in milliseconds
   * @default 330
   */
  animationDuration?: number;
  /**
   * Whether to show the pinging indicator
   * @default true
   */
  showIndicator?: boolean;
  /**
   * Top-right bevel size in pixels (overrides size-based default)
   */
  bevelSize?: number;
  /**
   * Additional styles for the label container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled Label component with SVG beveled top-right corner
 *
 * Based on CyberLabel from the Dangerous Things web storefront.
 * Features a solid colored background with black text and an optional
 * animated ping indicator.
 *
 * @example
 * <DTLabel primaryText="Detected" secondaryText="NTAG215" mode="normal" />
 *
 * @example
 * <DTLabel primaryText="Status" secondaryText="Ready to scan" mode="success" fullWidth />
 *
 * @example
 * <DTLabel primaryText="Warning" mode="warning" showIndicator={false} />
 *
 * @example
 * <DTLabel primaryText="Small label" size="small" />
 *
 * @example
 * <DTLabel primaryText="Large label" size="large" mode="emphasis" />
 */
export function DTLabel({
  primaryText,
  secondaryText,
  mode = 'normal',
  size = 'medium',
  fullWidth = false,
  animated = true,
  animationDelay = 100,
  animationDuration = 330,
  showIndicator = true,
  bevelSize,
  style,
}: DTLabelProps) {
  const theme = useDTTheme();
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const scaleAnim = useRef(new Animated.Value(animated ? 0 : 1)).current;
  const pingAnim = useRef(new Animated.Value(1)).current;
  const backgroundColor = getVariantColor(theme, mode);
  const sizeConfig = sizeConfigs[size];
  const effectiveBevelSize = bevelSize ?? sizeConfig.bevel;
  const onPrimaryColor = theme.colors.onPrimary;

  // Mount animation
  useEffect(() => {
    if (animated) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: animationDuration,
        delay: animationDelay,
        useNativeDriver: true,
      }).start();
    }
  }, [animated, animationDelay, animationDuration, scaleAnim]);

  // Ping animation loop
  useEffect(() => {
    if (showIndicator) {
      const pingAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pingAnim, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pingAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      pingAnimation.start();
      return () => {
        pingAnimation.stop();
        pingAnim.setValue(1);
      };
    }
    pingAnim.setValue(1);
  }, [showIndicator, pingAnim]);

  const {width, height} = dimensions;
  const useBevels = theme.custom.bevelMd > 0;

  return (
    <Animated.View
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        {transform: [{scale: scaleAnim}]},
        !useBevels && {
          backgroundColor,
          borderRadius: theme.custom.radiusSm,
        },
        style,
      ]}
      onLayout={onLayout}>
      {useBevels && hasDimensions && (
        <Svg
          style={StyleSheet.absoluteFill}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}>
          <Path d={buildLabelBevelPath(width, height, effectiveBevelSize)} fill={backgroundColor} />
        </Svg>
      )}
      <View style={styles.innerContainer}>
        <View
          style={[
            styles.textContainer,
            {
              paddingHorizontal: sizeConfig.paddingHorizontal,
              paddingVertical: sizeConfig.paddingVertical,
              gap: sizeConfig.gap,
            },
          ]}>
          <Text
            style={[
              styles.primaryText,
              {fontSize: sizeConfig.fontSize, color: onPrimaryColor},
            ]}>
            {primaryText}
          </Text>
          {secondaryText && (
            <Text
              style={[
                styles.secondaryText,
                {fontSize: sizeConfig.fontSizeSecondary, color: onPrimaryColor},
              ]}>
              {secondaryText}
            </Text>
          )}
        </View>
        {showIndicator && (
          <Animated.View
            style={[
              styles.indicator,
              {opacity: pingAnim, paddingLeft: sizeConfig.paddingHorizontal / 1.5},
            ]}>
            <View
              style={[
                styles.indicatorLine,
                {borderColor: onPrimaryColor, width: sizeConfig.indicatorWidth},
              ]}
            />
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
}

/**
 * DT Label design constants matching web CSS
 */
export const DTLabelClipPath = {
  // CSS-style clip path (for web reference)
  css: `polygon(
    0% 0%,
    calc(100% - 1em) 0%,
    100% 1em,
    100% 100%,
    0% 100%
  )`,
  // Default bevel size in pixels (matching 1em at 16px base)
  bevelSize: 16,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
    margin: 8,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  primaryText: {
    fontWeight: '500',
  },
  secondaryText: {
    fontWeight: '800',
  },
  indicator: {},
  indicatorLine: {
    borderBottomWidth: 2,
  },
});
