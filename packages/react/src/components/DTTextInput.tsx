/**
 * DTTextInput — Styled text input with focus glow.
 *
 * CSS reference: forms-dt.css input[type="text"], .input, .error
 */

import type { CSSProperties, InputHTMLAttributes } from 'react';
import { cx } from '../utils/cx';

interface DTTextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> {
  /** Show error state */
  error?: boolean;
  /** Label text above input */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function DTTextInput({
  error = false,
  label,
  className,
  style,
  id,
  ...inputProps
}: DTTextInputProps) {
  const inputId = id || (label ? `dt-input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className={cx('dt-text-input-wrapper', className)} style={style}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            marginBottom: '4px',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        id={inputId}
        className={cx('input', error && 'error')}
        style={{ width: '100%', padding: '8px 12px' }}
      />
    </div>
  );
}
