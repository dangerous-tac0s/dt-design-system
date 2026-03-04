/**
 * Dangerous Things Color Palette
 *
 * Based on the dt-shopify-storefront design system.
 * Cyberpunk aesthetic with high-contrast neon colors on dark backgrounds.
 */

export const DTColors = {
  // Base colors
  dark: '#000000',
  light: '#FFFFFF',

  // Mode colors (primary semantic palette)
  modeNormal: '#00FFFF', // Cyan - primary actions, links, borders
  modeNormalSelected: 'rgba(0, 255, 255, 0.7)',
  modeEmphasis: '#FFFF00', // Yellow - highlights, emphasis, headers
  modeEmphasisSelected: 'rgba(255, 255, 0, 0.7)',
  modeWarning: '#FF0000', // Red - errors, warnings, destructive actions
  modeSuccess: '#00FF00', // Green - success states, confirmations
  modeOther: '#FF00FF', // Magenta - miscellaneous, secondary info

  // Semantic aliases
  primary: '#00FFFF',
  primaryVariant: 'rgba(0, 255, 255, 0.7)',
  secondary: '#FFFF00',
  secondaryVariant: 'rgba(255, 255, 0, 0.7)',
  error: '#FF0000',
  success: '#00FF00',

  // Surface colors
  background: '#000000',
  surface: '#000000',
  surfaceVariant: '#070707',

  // Text colors
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  onPrimary: '#000000',
  onSecondary: '#000000',
  onError: '#000000',

  // Border colors
  border: '#00FFFF',
  borderEmphasis: '#FFFF00',

  // Transparency variants (for overlays, disabled states)
  overlay: 'rgba(0, 0, 0, 0.7)',
  disabled: 'rgba(255, 255, 255, 0.3)',
  disabledBackground: 'rgba(255, 255, 255, 0.1)',
} as const;

export type DTColorKey = keyof typeof DTColors;

/**
 * Get a color with optional opacity override
 */
export function getColor(color: DTColorKey, opacity?: number): string {
  const baseColor = DTColors[color];
  if (opacity === undefined || baseColor.startsWith('rgba')) {
    return baseColor;
  }

  // Convert hex to rgba
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
