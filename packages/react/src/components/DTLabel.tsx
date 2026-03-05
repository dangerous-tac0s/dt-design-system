/**
 * DTLabel — Filled badge/label with top-right bevel and mode color.
 *
 * CSS reference: bevels.css .badge, .badge-mode, .mode-*
 */

import type { ReactNode, CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTLabelProps {
  children: ReactNode;
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  className?: string;
  style?: CSSProperties;
}

export function DTLabel({
  children,
  variant = 'normal',
  className,
  style,
}: DTLabelProps) {
  return (
    <span
      className={cx('badge', 'badge-mode', getVariantClass(variant), className)}
      style={style}>
      {children}
    </span>
  );
}
