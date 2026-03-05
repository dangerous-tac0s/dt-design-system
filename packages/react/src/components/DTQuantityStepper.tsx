/**
 * DTQuantityStepper — Beveled +/- stepper.
 *
 * CSS reference: forms-dt.css .dt-stepper, .dt-stepper-btn, .dt-stepper-value
 */

import type { CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTQuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function DTQuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  disabled = false,
  className,
  style,
}: DTQuantityStepperProps) {
  return (
    <div className={cx('dt-stepper', className)} style={style}>
      <button
        className="dt-stepper-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        type="button"
        aria-label="Decrease">
        −
      </button>
      <span className="dt-stepper-value">{value}</span>
      <button
        className="dt-stepper-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        type="button"
        aria-label="Increase">
        +
      </button>
    </div>
  );
}
