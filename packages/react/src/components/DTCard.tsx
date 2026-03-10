/**
 * DTCard — Beveled card with header, progress bar, and mode colors.
 *
 * CSS reference: bevels.css .card / .dt-bevel-card, .card-title,
 * ::after progress bar, .mode-*
 *
 * The progress bar is a structural element on the left edge (0 to bevel-sm).
 * It is always present. At 0 progress it shows surface color (empty bar).
 * As progress increases, accent color fills from top to bottom.
 * When progress is omitted, the bar stays empty (full card, no fill).
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
  /** Dismiss callback — renders a close button in the header bar */
  onDismiss?: () => void;
  /** Progress value (0–100) for left-edge vertical progress bar. Omit for empty bar. */
  progress?: number;
  /** Grow to fill available space in flex/grid containers @default false */
  grow?: boolean;
  /** Which area expands when grow is true @default 'body' */
  growArea?: 'body' | 'title';
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export function DTCard({
  children,
  variant = 'normal',
  title,
  showHeader,
  onDismiss,
  progress,
  grow = false,
  growArea = 'body',
  className,
  style,
  onClick,
}: DTCardProps) {
  const shouldShowHeader = showHeader ?? !!(title || onDismiss);
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={cx(
        'card',
        getVariantClass(variant),
        grow && 'dt-card-grow',
        grow && growArea === 'title' && 'dt-card-grow-title',
        className,
      )}
      style={{
        ...style,
        ...(progress != null && { '--dt-card-progress': progress }),
      } as CSSProperties}
      onClick={onClick}
      type={onClick ? 'button' : undefined}>
      {shouldShowHeader && (
        <div className="card-title" style={onDismiss ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } : undefined}>
          <span>{title}</span>
          {onDismiss && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDismiss(); }}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: 0,
                fontSize: '1.25rem',
                lineHeight: 1,
              }}>
              &#x2715;
            </button>
          )}
        </div>
      )}
      {children}
    </Tag>
  );
}
