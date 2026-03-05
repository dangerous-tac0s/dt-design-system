/**
 * DTProgressBar — Angular progress bar (horizontal or vertical).
 *
 * CSS reference: forms-dt.css .dt-progress, .dt-progress-fill, .dt-progress-label
 */

import type { CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTProgressBarProps {
  /** Progress value (0–1) */
  value: number;
  /** Text label below/beside the bar */
  label?: string;
  /** Layout direction @default 'horizontal' */
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: CSSProperties;
}

export function DTProgressBar({
  value,
  label,
  direction = 'horizontal',
  className,
  style,
}: DTProgressBarProps) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);

  return (
    <div className={className} style={style}>
      <div className={cx('dt-progress', direction === 'vertical' && 'vertical')}>
        <div
          className="dt-progress-fill"
          style={
            direction === 'vertical'
              ? { height: `${pct}%` }
              : { width: `${pct}%` }
          }
        />
      </div>
      {label && <span className="dt-progress-label">{label}</span>}
    </div>
  );
}
