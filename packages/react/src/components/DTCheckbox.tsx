/**
 * DTCheckbox — Beveled diamond checkbox.
 *
 * CSS reference: forms-dt.css input[type="checkbox"]
 */

import type { CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function DTCheckbox({
  checked,
  onChange,
  disabled = false,
  label,
  className,
  style,
}: DTCheckboxProps) {
  return (
    <label
      className={cx('dt-checkbox-wrapper', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
