/**
 * DTStaggerContainer — Staggered scale-in animation for children.
 *
 * CSS reference: animations.css .dt-stagger-container
 * Each child is wrapped in a div that carries the animationDelay.
 * Wrapper divs inherit display:contents would break animation, so
 * the CSS rule targets .dt-stagger-container > * directly.
 */

import { Children, type ReactNode, type CSSProperties } from 'react';
import { cx } from '../utils/cx';

interface DTStaggerContainerProps {
  children: ReactNode;
  /** Duration per child animation @default '0.33s' */
  duration?: string;
  /** Delay between each child in ms @default 150 */
  interval?: number;
  /** Base delay before the first child animates in ms @default 0 */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function DTStaggerContainer({
  children,
  duration,
  interval = 150,
  delay = 0,
  className,
  style,
}: DTStaggerContainerProps) {
  const cssVars: Record<string, string> = {};
  if (duration) cssVars['--dt-stagger-duration'] = duration;

  return (
    <div
      className={cx('dt-stagger-container', className)}
      style={{ ...cssVars, ...style } as CSSProperties}>
      {Children.map(children, (child, i) => (
        <div style={{ animationDelay: `${delay + i * interval}ms` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
