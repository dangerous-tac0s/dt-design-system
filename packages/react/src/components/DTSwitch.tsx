/**
 * DTSwitch — Angular toggle switch.
 *
 * CSS reference: forms-dt.css .dt-switch, .dt-switch-track, .dt-switch-thumb
 */

import type { CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function DTSwitch({
  checked,
  onChange,
  disabled = false,
  label,
  className,
  style,
}: DTSwitchProps) {
  return (
    <div
      className={cx('dt-switch-wrapper', className)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', ...style }}>
      <label className="dt-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span className="dt-switch-track" />
        <span className="dt-switch-thumb" />
      </label>
      {label && <span>{label}</span>}
    </div>
  );
}
