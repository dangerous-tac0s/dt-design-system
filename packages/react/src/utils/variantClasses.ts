/**
 * DTVariant → CSS class name mapping
 */
import { variantToClassName } from '@dangerousthings/tokens';
import type { DTVariant } from '@dangerousthings/tokens';

export function getVariantClass(variant: DTVariant): string {
  return variantToClassName[variant];
}

/** Map feature state to variant */
export function featureStateToVariant(state: 'supported' | 'disabled' | 'unsupported'): DTVariant {
  const map: Record<typeof state, DTVariant> = {
    supported: 'normal',
    disabled: 'emphasis',
    unsupported: 'warning',
  };
  return map[state];
}

/** Map variant to badge CSS class (for status badge colors) */
export function variantToBadgeClass(variant: DTVariant): string {
  const map: Record<DTVariant, string> = {
    normal: 'badge-info',
    emphasis: 'badge-warning',
    warning: 'badge-error',
    success: 'badge-success',
    other: 'badge-info',
  };
  return map[variant];
}
