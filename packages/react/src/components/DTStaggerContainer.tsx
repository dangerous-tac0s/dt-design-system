/**
 * DTStaggerContainer — Staggered scale-in animation for children.
 *
 * CSS reference: animations.css .dt-stagger-container
 * CSS handles all stagger timing via nth-child — no JS animation needed.
 */

import type { ReactNode, CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTStaggerContainerProps {
  children: ReactNode;
  /** Duration per child animation @default '0.33s' */
  duration?: string;
  /** Delay between each child @default '75ms' */
  interval?: string;
  className?: string;
  style?: CSSProperties;
}

export function DTStaggerContainer({
  children,
  duration,
  interval,
  className,
  style,
}: DTStaggerContainerProps) {
  const cssVars: Record<string, string> = {};
  if (duration) cssVars['--dt-stagger-duration'] = duration;
  if (interval) cssVars['--dt-stagger-interval'] = interval;

  return (
    <div
      className={cx('dt-stagger-container', className)}
      style={{ ...cssVars, ...style } as CSSProperties}>
      {children}
    </div>
  );
}
