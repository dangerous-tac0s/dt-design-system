/** Brand identifiers */
export type ThemeBrand = "dt" | "classic" | "supra";

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
