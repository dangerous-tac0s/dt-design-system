/**
 * Centralized variant type and color mapping
 *
 * Used by all DT components for consistent mode/variant color resolution.
 */

import {DTColors} from '../theme/colors';

export type DTVariant = 'normal' | 'emphasis' | 'warning' | 'success' | 'other';

export const variantColorMap: Record<DTVariant, string> = {
  normal: DTColors.modeNormal,
  emphasis: DTColors.modeEmphasis,
  warning: DTColors.modeWarning,
  success: DTColors.modeSuccess,
  other: DTColors.modeOther,
};

/**
 * Resolve variant to color, with optional custom color override.
 */
export function getVariantColor(
  variant: DTVariant,
  customColor?: string,
): string {
  return customColor ?? variantColorMap[variant];
}
