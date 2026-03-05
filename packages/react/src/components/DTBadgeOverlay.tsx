/**
 * DTBadgeOverlay — Absolute-positioned badge container.
 *
 * CSS reference: bevels.css .dt-badge-bottom-right, .dt-badge-top-right, etc.
 */

import type { ReactNode, CSSProperties } from 'react';
import { cx } from '../utils/cx';

type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface DTBadgeOverlayProps {
  children: ReactNode;
  /** Badge position @default 'bottom-right' */
  position?: BadgePosition;
  /** Offset from corner in px */
  offset?: number;
  className?: string;
  style?: CSSProperties;
}

const positionClassMap: Record<BadgePosition, string> = {
  'top-left': 'dt-badge-top-left',
  'top-right': 'dt-badge-top-right',
  'bottom-left': 'dt-badge-overlay',
  'bottom-right': 'dt-badge-bottom-right',
};

export function DTBadgeOverlay({
  children,
  position = 'bottom-right',
  offset,
  className,
  style,
}: DTBadgeOverlayProps) {
  const offsetStyle: CSSProperties = offset
    ? {
        ...(position.includes('top') ? { top: `${offset}px` } : { bottom: `${offset}px` }),
        ...(position.includes('left') ? { left: `${offset}px` } : { right: `${offset}px` }),
      }
    : {};

  return (
    <div
      className={cx(positionClassMap[position], className)}
      style={{ ...offsetStyle, ...style }}>
      {children}
    </div>
  );
}
