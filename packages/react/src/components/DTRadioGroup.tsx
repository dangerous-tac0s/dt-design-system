/**
 * DTRadioGroup — Hexagonal radio buttons.
 *
 * CSS reference: forms-dt.css input[type="radio"], .dt-radio-option
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
      {options.map(option => (
        <label
          key={option.value}
          className={cx('dt-radio-option', value === option.value && 'selected')}>
          <input
            type="radio"
            name={groupName}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
