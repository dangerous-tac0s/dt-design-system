/**
 * Centralized variant type and color mapping
 *
 * Used by all DT components for consistent mode/variant color resolution.
 * Reads colors from the active DTExtendedTheme rather than static defaults.
 */

import type {DTExtendedTheme} from '../theme/paperTheme';
import type {DTVariant} from '@dangerousthings/tokens';

// Re-export DTVariant from the canonical source (tokens package)
export type {DTVariant} from '@dangerousthings/tokens';

/** String-typed keys in DTExtendedTheme['custom'] that map to mode colors */
type ModeColorKey = 'modeNormal' | 'modeEmphasis' | 'modeWarning' | 'modeSuccess' | 'modeOther';

const variantToThemeKey: Record<DTVariant, ModeColorKey> = {
  normal: 'modeNormal',
  emphasis: 'modeEmphasis',
  warning: 'modeWarning',
  success: 'modeSuccess',
  other: 'modeOther',
};

/**
 * Resolve variant to color from the active theme, with optional custom color override.
 */
export function getVariantColor(
  theme: DTExtendedTheme,
  variant: DTVariant,
  customColor?: string,
): string {
  return customColor ?? theme.custom[variantToThemeKey[variant]];
}
