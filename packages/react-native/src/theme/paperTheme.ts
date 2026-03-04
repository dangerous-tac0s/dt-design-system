/**
 * React Native Paper MD3 Theme Configuration
 *
 * This creates a Material Design 3 compliant theme that follows
 * the Dangerous Things cyberpunk aesthetic while respecting
 * React Native Paper's design principles.
 */

import { MD3DarkTheme, MD3Theme, configureFonts } from 'react-native-paper';
import { DTColors } from './colors';
import { DTTypography, DTFonts } from './typography';

/**
 * MD3 Font configuration for React Native Paper
 * Maps our typography to RNP's expected font config
 */
const fontConfig = {
  fontFamily: DTFonts.regular,
  displayLarge: DTTypography.displayLarge,
  displayMedium: DTTypography.displayMedium,
  displaySmall: DTTypography.displaySmall,
  headlineLarge: DTTypography.headlineLarge,
  headlineMedium: DTTypography.headlineMedium,
  headlineSmall: DTTypography.headlineSmall,
  titleLarge: DTTypography.titleLarge,
  titleMedium: DTTypography.titleMedium,
  titleSmall: DTTypography.titleSmall,
  bodyLarge: DTTypography.bodyLarge,
  bodyMedium: DTTypography.bodyMedium,
  bodySmall: DTTypography.bodySmall,
  labelLarge: DTTypography.labelLarge,
  labelMedium: DTTypography.labelMedium,
  labelSmall: DTTypography.labelSmall,
};

/**
 * Dangerous Things Dark Theme
 *
 * Based on MD3DarkTheme with cyberpunk color overrides.
 * Primary = Cyan, Secondary = Yellow (following DT brand)
 */
export const DTDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 4, // Slightly rounded, but we use custom clip-path for bevels

  fonts: configureFonts({ config: fontConfig }),

  colors: {
    ...MD3DarkTheme.colors,

    // Primary (Cyan)
    primary: DTColors.modeNormal,
    onPrimary: DTColors.dark,
    primaryContainer: DTColors.modeNormalSelected,
    onPrimaryContainer: DTColors.dark,

    // Secondary (Yellow)
    secondary: DTColors.modeEmphasis,
    onSecondary: DTColors.dark,
    secondaryContainer: DTColors.modeEmphasisSelected,
    onSecondaryContainer: DTColors.dark,

    // Tertiary (Magenta)
    tertiary: DTColors.modeOther,
    onTertiary: DTColors.dark,
    tertiaryContainer: 'rgba(255, 0, 255, 0.3)',
    onTertiaryContainer: DTColors.light,

    // Error (Red)
    error: DTColors.modeWarning,
    onError: DTColors.dark,
    errorContainer: 'rgba(255, 0, 0, 0.3)',
    onErrorContainer: DTColors.light,

    // Background & Surface
    background: DTColors.background,
    onBackground: DTColors.onBackground,
    surface: DTColors.surface,
    onSurface: DTColors.onSurface,
    surfaceVariant: DTColors.surfaceVariant,
    onSurfaceVariant: DTColors.light,

    // Surface elevation (MD3 uses tonal elevation)
    elevation: {
      level0: 'transparent',
      level1: DTColors.surfaceVariant,
      level2: '#0a0a0a',
      level3: '#0f0f0f',
      level4: '#121212',
      level5: '#151515',
    },

    // Outline (borders)
    outline: DTColors.modeNormal,
    outlineVariant: 'rgba(0, 255, 255, 0.5)',

    // Inverse (for snackbars, etc.)
    inverseSurface: DTColors.light,
    inverseOnSurface: DTColors.dark,
    inversePrimary: '#008B8B', // Darker cyan for light backgrounds

    // Misc
    shadow: DTColors.dark,
    scrim: DTColors.overlay,
    surfaceDisabled: DTColors.disabledBackground,
    onSurfaceDisabled: DTColors.disabled,
    backdrop: DTColors.overlay,
  },
};

/**
 * Extended theme with DT-specific custom properties
 * Use this when you need access to non-MD3 colors
 */
export interface DTExtendedTheme extends MD3Theme {
  custom: {
    success: string;
    warning: string;
    modeNormal: string;
    modeEmphasis: string;
    modeWarning: string;
    modeSuccess: string;
    modeOther: string;
    border: string;
    borderEmphasis: string;
    /** Bevel sizes in pixels (0 = no bevels, use borderRadius instead) */
    bevelSm: number;
    bevelMd: number;
    bevelLg: number;
    /** Border radius in pixels (0 = angular/beveled) */
    radiusSm: number;
    radius: number;
    radiusLg: number;
  };
}

export const DTExtendedDarkTheme: DTExtendedTheme = {
  ...DTDarkTheme,
  custom: {
    success: DTColors.modeSuccess,
    warning: DTColors.modeWarning,
    modeNormal: DTColors.modeNormal,
    modeEmphasis: DTColors.modeEmphasis,
    modeWarning: DTColors.modeWarning,
    modeSuccess: DTColors.modeSuccess,
    modeOther: DTColors.modeOther,
    border: DTColors.border,
    borderEmphasis: DTColors.borderEmphasis,
    bevelSm: 16,
    bevelMd: 32,
    bevelLg: 40,
    radiusSm: 0,
    radius: 0,
    radiusLg: 0,
  },
};

/**
 * Hook to access extended theme properties
 * Usage: const { custom } = useDTTheme();
 */
export { useTheme as usePaperTheme } from 'react-native-paper';
