/**
 * DTChip — Small badge/chip with variant-based status colors.
 *
 * CSS reference: bevels.css .badge, .badge-success, .badge-error, etc.
 */

import type { ReactNode, CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass, variantToBadgeClass } from '../utils/variantClasses';

interface DTChipProps {
  children: ReactNode;
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  /** Use mode-colored fill instead of status border color */
  filled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function DTChip({
  children,
  variant = 'normal',
  filled = false,
  onClick,
  className,
  style,
}: DTChipProps) {
  const Tag = onClick ? 'button' : 'span';

  return (
    <Tag
      className={cx(
        'badge',
        filled ? 'badge-mode' : variantToBadgeClass(variant),
        getVariantClass(variant),
        className,
      )}
      onClick={onClick}
      style={style}
      type={onClick ? 'button' : undefined}>
      {children}
    </Tag>
  );
}
