/**
 * DTButton — Interactive bevel button with mode colors.
 *
 * CSS reference: bevels.css .dt-btn, .btn-primary, .mode-*, .selected
 */

import type { ReactNode, CSSProperties, MouseEvent } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTButtonProps {
  children: ReactNode;
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  /** Display mode @default 'outlined' */
  mode?: 'outlined' | 'contained';
  /** Persistent selected state (bevel + 70% fill) */
  selected?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: CSSProperties;
}

export function DTButton({
  children,
  variant = 'normal',
  mode = 'outlined',
  selected = false,
  onClick,
  disabled = false,
  type = 'button',
  className,
  style,
}: DTButtonProps) {
  if (mode === 'contained') {
    return (
      <button
        className={cx('btn-primary', getVariantClass(variant), className)}
        onClick={onClick}
        disabled={disabled}
        type={type}
        style={style}>
        {children}
      </button>
    );
  }

  return (
    <button
      className={cx(
        'dt-btn',
        getVariantClass(variant),
        selected && 'selected',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}>
      {children}
    </button>
  );
}
