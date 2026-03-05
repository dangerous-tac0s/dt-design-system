/**
 * DTCard — Beveled card with header, progress bar, and mode colors.
 *
 * CSS reference: bevels.css .card / .dt-bevel-card, .card-title,
 * ::after progress bar, .mode-*
 *
 * The progress bar is a structural element on the left edge (0 to bevel-sm).
 * It is always present. At 0 progress it shows surface color (empty bar).
 * As progress increases, accent color fills from the bottom up.
 */

import type { ReactNode, CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTCardProps {
  children: ReactNode;
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  /** Card title (displayed in header bar) */
  title?: string;
  /** Whether to show the accent header bar @default true when title is provided */
  showHeader?: boolean;
  /** Progress value (0–100) for left-edge vertical progress bar @default 0 */
  progress?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function DTCard({
  children,
  variant = 'normal',
  title,
  showHeader,
  progress = 0,
  className,
  style,
  onClick,
}: DTCardProps) {
  const shouldShowHeader = showHeader ?? !!title;
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={cx(
        'card',
        getVariantClass(variant),
        className,
      )}
      style={{
        ...style,
        '--dt-card-progress': progress,
      } as CSSProperties}
      onClick={onClick}
      type={onClick ? 'button' : undefined}>
      {shouldShowHeader && (
        <div className="card-title">
          {title}
        </div>
      )}
      {children}
    </Tag>
  );
}
