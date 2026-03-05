/**
 * DTHexagon — Decorative SVG hexagon with optional animations.
 *
 * Uses inline SVG (not CSS classes) — same approach as the RN version.
 * Animation classes from animations.css applied to wrapper div.
 */

import type { ReactNode, CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTHexagonProps {
  /** Diameter in pixels */
  size: number;
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  /** Filled or outline @default true */
  filled?: boolean;
  /** Enable animation @default false */
  animated?: boolean;
  /** Animation type @default 'rotate' */
  animationType?: 'rotate' | 'pulse' | 'none';
  /** Animation duration in ms @default 2000 */
  animationDuration?: number;
  /** Outline stroke width @default 2 */
  borderWidth?: number;
  /** Custom color override */
  color?: string;
  /** Opacity @default 1 */
  opacity?: number;
  /** Centered content inside hexagon */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Flat-top hexagon points for given size */
function hexPoints(size: number): string {
  const r = size / 2;
  const cx = r;
  const cy = r;
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }
  return points.map(([x, y]) => `${x},${y}`).join(' ');
}

export function DTHexagon({
  size,
  variant = 'normal',
  filled = true,
  animated = false,
  animationType = 'rotate',
  animationDuration = 2000,
  borderWidth = 2,
  color,
  opacity = 1,
  children,
  className,
  style,
}: DTHexagonProps) {
  const animClass = animated
    ? animationType === 'rotate'
      ? 'dt-animate-spin'
      : animationType === 'pulse'
        ? 'dt-animate-pulse'
        : undefined
    : undefined;

  return (
    <div
      className={cx(getVariantClass(variant), animClass, className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        position: 'relative',
        opacity,
        ...(animated && animationDuration !== 2000
          ? { animationDuration: `${animationDuration}ms` }
          : {}),
        ...style,
      }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', top: 0, left: 0 }}>
        <polygon
          points={hexPoints(size - borderWidth)}
          transform={`translate(${borderWidth / 2}, ${borderWidth / 2})`}
          fill={filled ? (color || 'var(--dt-card-color, var(--color-primary))') : 'none'}
          stroke={color || 'var(--dt-card-color, var(--color-primary))'}
          strokeWidth={borderWidth}
        />
      </svg>
      {children && (
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      )}
    </div>
  );
}
