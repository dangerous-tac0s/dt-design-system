/**
 * DTMediaFrame — Diagonal beveled frame (top-left + bottom-right).
 *
 * CSS reference: bevels.css .dt-bevel-media
 *
 * The outer div provides the colored bevel border via clip-path.
 * A ::before pseudo-element fills the inner surface.
 * Direct img/video children are auto-clipped to match.
 * A ::after pseudo-element shows "MISSING MEDIA" when empty.
 */

import type { ReactNode, CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTMediaFrameProps {
  children: ReactNode;
  /** Color variant for the bevel border @default 'normal' */
  variant?: DTVariant;
  /** Custom placeholder shown when children is nullish (overrides CSS ::after) */
  placeholder?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function DTMediaFrame({
  children,
  variant = 'normal',
  placeholder,
  className,
  style,
}: DTMediaFrameProps) {
  const isEmpty = children == null || children === false;

  return (
    <div
      className={cx('dt-bevel-media', getVariantClass(variant), className)}
      style={style}
    >
      {isEmpty && placeholder ? placeholder : children}
    </div>
  );
}
