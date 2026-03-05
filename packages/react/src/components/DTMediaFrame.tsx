/**
 * DTMediaFrame — Diagonal beveled frame (top-left + bottom-right).
 *
 * CSS reference: bevels.css .dt-bevel-media
 */

import type { ReactNode, CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTMediaFrameProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function DTMediaFrame({
  children,
  className,
  style,
}: DTMediaFrameProps) {
  return (
    <div className={cx('dt-bevel-media', className)} style={style}>
      {children}
    </div>
  );
}
