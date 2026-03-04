import { MD3DarkTheme } from 'react-native-paper';
import type { BrandTokens } from '@dangerousthings/tokens';
import type { DTExtendedTheme } from '@dangerousthings/react-native';

export function buildThemeFromBrand(brand: BrandTokens): DTExtendedTheme {
  const colors = brand.dark;

  return {
    ...MD3DarkTheme,
    dark: true,
    roundness: brand.shape.radiusSm === '0' || brand.shape.radiusSm === '0px' ? 0 : 4,
    fonts: MD3DarkTheme.fonts,
    colors: {
      ...MD3DarkTheme.colors,
      primary: colors.primary,
      onPrimary: colors.bg,
      primaryContainer: colors.primaryDim,
      onPrimaryContainer: colors.bg,
      secondary: colors.secondary,
      onSecondary: colors.bg,
      secondaryContainer: colors.secondary,
      onSecondaryContainer: colors.bg,
      tertiary: colors.other,
      onTertiary: colors.bg,
      tertiaryContainer: colors.other,
      onTertiaryContainer: colors.textPrimary,
      error: colors.error,
      onError: colors.bg,
      errorContainer: colors.error,
      onErrorContainer: colors.textPrimary,
      background: colors.bg,
      onBackground: colors.textPrimary,
      surface: colors.surface,
      onSurface: colors.textPrimary,
      surfaceVariant: colors.surface,
      onSurfaceVariant: colors.textPrimary,
      outline: colors.primary,
      outlineVariant: colors.border,
      inverseSurface: colors.textPrimary,
      inverseOnSurface: colors.bg,
      inversePrimary: colors.primaryDim,
      shadow: colors.bg,
      scrim: 'rgba(0,0,0,0.7)',
      elevation: {
        level0: 'transparent',
        level1: colors.surface,
        level2: colors.surfaceHover,
        level3: colors.surfaceHover,
        level4: colors.surfaceHover,
        level5: colors.surfaceHover,
      },
      surfaceDisabled: 'rgba(255,255,255,0.1)',
      onSurfaceDisabled: 'rgba(255,255,255,0.3)',
      backdrop: 'rgba(0,0,0,0.7)',
    },
    custom: {
      success: colors.success,
      warning: colors.warning,
      modeNormal: colors.primary,
      modeEmphasis: colors.secondary,
      modeWarning: colors.error,
      modeSuccess: colors.success,
      modeOther: colors.other,
      border: colors.border,
      borderEmphasis: colors.secondary,
    },
  };
}
