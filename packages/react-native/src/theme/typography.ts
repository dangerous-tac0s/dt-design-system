/**
 * Dangerous Things Typography
 *
 * Primary font: Tektur (variable font)
 * Fallback: System default sans-serif
 *
 * Note: To use Tektur, you must:
 * 1. Download Tektur from Google Fonts
 * 2. Add to your project's assets/fonts/
 * 3. Link fonts in react-native.config.js or use expo-font
 */

import { Platform, TextStyle } from 'react-native';

/**
 * Font family configuration
 * Tektur is a variable font with weights 100-900
 */
export const DTFonts = {
  regular: Platform.select({
    ios: 'Tektur',
    android: 'Tektur-Regular',
    default: 'Tektur',
  }),
  medium: Platform.select({
    ios: 'Tektur',
    android: 'Tektur-Medium',
    default: 'Tektur',
  }),
  bold: Platform.select({
    ios: 'Tektur',
    android: 'Tektur-Bold',
    default: 'Tektur',
  }),
  // Fallback when Tektur is not available
  fallback: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'sans-serif',
  }),
} as const;

/**
 * Font weights for variable font
 */
export const DTFontWeights = {
  thin: '100' as const,
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
};

/**
 * Base text styles
 */
const baseTextStyle: TextStyle = {
  fontFamily: DTFonts.regular,
  color: '#FFFFFF',
  letterSpacing: 0.5,
};

/**
 * Typography scale following Material Design 3 naming
 */
export const DTTypography = {
  // Display styles (large headlines)
  displayLarge: {
    ...baseTextStyle,
    fontSize: 57,
    fontWeight: DTFontWeights.bold,
    lineHeight: 64,
    letterSpacing: -0.25,
  } as TextStyle,

  displayMedium: {
    ...baseTextStyle,
    fontSize: 45,
    fontWeight: DTFontWeights.bold,
    lineHeight: 52,
  } as TextStyle,

  displaySmall: {
    ...baseTextStyle,
    fontSize: 36,
    fontWeight: DTFontWeights.bold,
    lineHeight: 44,
  } as TextStyle,

  // Headline styles
  headlineLarge: {
    ...baseTextStyle,
    fontSize: 32,
    fontWeight: DTFontWeights.semibold,
    lineHeight: 40,
  } as TextStyle,

  headlineMedium: {
    ...baseTextStyle,
    fontSize: 28,
    fontWeight: DTFontWeights.semibold,
    lineHeight: 36,
  } as TextStyle,

  headlineSmall: {
    ...baseTextStyle,
    fontSize: 24,
    fontWeight: DTFontWeights.semibold,
    lineHeight: 32,
  } as TextStyle,

  // Title styles
  titleLarge: {
    ...baseTextStyle,
    fontSize: 22,
    fontWeight: DTFontWeights.medium,
    lineHeight: 28,
  } as TextStyle,

  titleMedium: {
    ...baseTextStyle,
    fontSize: 16,
    fontWeight: DTFontWeights.medium,
    lineHeight: 24,
    letterSpacing: 0.15,
  } as TextStyle,

  titleSmall: {
    ...baseTextStyle,
    fontSize: 14,
    fontWeight: DTFontWeights.medium,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  // Body styles
  bodyLarge: {
    ...baseTextStyle,
    fontSize: 16,
    fontWeight: DTFontWeights.regular,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,

  bodyMedium: {
    ...baseTextStyle,
    fontSize: 14,
    fontWeight: DTFontWeights.regular,
    lineHeight: 20,
    letterSpacing: 0.25,
  } as TextStyle,

  bodySmall: {
    ...baseTextStyle,
    fontSize: 12,
    fontWeight: DTFontWeights.regular,
    lineHeight: 16,
    letterSpacing: 0.4,
  } as TextStyle,

  // Label styles
  labelLarge: {
    ...baseTextStyle,
    fontSize: 14,
    fontWeight: DTFontWeights.medium,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  labelMedium: {
    ...baseTextStyle,
    fontSize: 12,
    fontWeight: DTFontWeights.medium,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,

  labelSmall: {
    ...baseTextStyle,
    fontSize: 11,
    fontWeight: DTFontWeights.medium,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,
} as const;

export type DTTypographyKey = keyof typeof DTTypography;
