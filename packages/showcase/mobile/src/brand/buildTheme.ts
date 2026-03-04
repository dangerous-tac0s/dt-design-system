import { Platform } from 'react-native';
import { MD3DarkTheme, configureFonts } from 'react-native-paper';
import type { BrandTokens } from '@dangerousthings/tokens';
import type { DTExtendedTheme } from '@dangerousthings/react-native';

/** Parse CSS size token ("1rem", "0.25rem", "0px", "0") to pixels (1rem = 16px) */
function parseSize(value: string): number {
  if (value === '0' || value === '0px') return 0;
  const num = parseFloat(value);
  if (value.endsWith('rem')) return num * 16;
  if (value.endsWith('px')) return num;
  return num;
}

/** Build RNP font config from brand typography tokens */
function buildFonts(brand: BrandTokens) {
  const usesTektur = brand.typography.heading.includes('Tektur');
  if (!usesTektur) {
    // System sans-serif — use RNP defaults
    return MD3DarkTheme.fonts;
  }
  // Tektur custom font
  const fontFamily = Platform.select({
    ios: 'Tektur',
    android: 'Tektur-Regular',
    default: 'Tektur',
  })!;
  return configureFonts({
    config: { fontFamily },
  });
}

export function buildThemeFromBrand(brand: BrandTokens): DTExtendedTheme {
  const colors = brand.dark;

  return {
    ...MD3DarkTheme,
    dark: true,
    roundness: brand.shape.radiusSm === '0' || brand.shape.radiusSm === '0px' ? 0 : 4,
    fonts: buildFonts(brand),
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
      bevelSm: parseSize(brand.shape.bevelSm),
      bevelMd: parseSize(brand.shape.bevelMd),
      bevelLg: parseSize(brand.shape.bevelLg),
      radiusSm: parseSize(brand.shape.radiusSm),
      radius: parseSize(brand.shape.radius),
      radiusLg: parseSize(brand.shape.radiusLg),
    },
  };
}
