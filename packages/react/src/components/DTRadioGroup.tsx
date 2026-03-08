/**
 * DTRadioGroup — Hexagonal radio buttons.
 *
 * Uses a custom span for the hexagon indicator since ::before pseudo-elements
 * on <input> are unreliable in Chromium/Electron.
 *
 * CSS reference: forms-dt.css .dt-radio-hex, .dt-radio-option
 */

import { useId, type CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTRadioOption {
  value: string;
  label: string;
}

interface DTRadioGroupProps {
  options: DTRadioOption[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
  style?: CSSProperties;
}

export { type DTRadioOption };

export function DTRadioGroup({
  options,
  value,
  onChange,
  name,
  className,
  style,
}: DTRadioGroupProps) {
  const groupId = useId();
  const groupName = name || `dt-radio-${groupId}`;

  return (
    <div
      className={cx('dt-radio-group', className)}
      style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }}
      role="radiogroup">
      {options.map(option => {
        const checked = value === option.value;
        return (
          <label
            key={option.value}
            className={cx('dt-radio-option', checked && 'selected')}>
            <input
              type="radio"
              name={groupName}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <span className={cx('dt-radio-hex', checked && 'checked')}>
              <span className="dt-radio-hex-inner" />
            </span>
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
