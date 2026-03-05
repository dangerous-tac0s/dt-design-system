/** Brand identifiers */
export type ThemeBrand = "dt" | "classic";

/** Color mode */
export type ThemeMode = "dark" | "light" | "auto";

/** Theme metadata for UI selectors */
export interface ThemeDefinition {
  id: ThemeBrand;
  name: string;
  description: string;
  supportsModes: ThemeMode[];
  defaultMode: ThemeMode;
}

/** Color tokens for a single mode */
export interface ColorTokens {
  bg: string;
  surface: string;
  surfaceHover: string;
  border: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  primary: string;
  primaryDim: string;
  secondary: string;
  accent: string;
  other: string;

  success: string;
  warning: string;
  error: string;
  info: string;
}

/** Typography tokens */
export interface TypographyTokens {
  heading: string;
  body: string;
  mono: string;
}

/** Shape tokens */
export interface ShapeTokens {
  bevelSm: string;
  bevelMd: string;
  bevelLg: string;
  radiusSm: string;
  radius: string;
  radiusLg: string;
}

/** Color variant for component accent colors (shared across web + React Native) */
export type DTVariant = 'normal' | 'emphasis' | 'warning' | 'success' | 'other';

/** Maps DTVariant to CSS custom property names */
export const variantToCSSProperty: Record<DTVariant, string> = {
  normal: '--mode-normal',
  emphasis: '--mode-emphasis',
  warning: '--mode-warning',
  success: '--mode-success',
  other: '--mode-other',
};

/** Maps DTVariant to CSS class names */
export const variantToClassName: Record<DTVariant, string> = {
  normal: 'mode-normal',
  emphasis: 'mode-emphasis',
  warning: 'mode-warning',
  success: 'mode-success',
  other: 'mode-other',
};

/** Complete brand definition */
export interface BrandTokens {
  id: ThemeBrand;
  name: string;
  description: string;
  dark: ColorTokens;
  light: ColorTokens;
  typography: TypographyTokens;
  shape: ShapeTokens;
}
