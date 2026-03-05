/**
 * DTMobileFilterOverlay — Full-screen slide-up filter panel.
 *
 * CSS reference: forms-dt.css .dt-filter-overlay, .dt-filter-overlay-backdrop,
 * .dt-filter-overlay-content
 */

import { useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTMobileFilterOverlayProps {
  visible: boolean;
  onDismiss: () => void;
  /** Heading text @default 'Filters' */
  heading?: string;
  /** Number of active filters (shown as badge) */
  activeFilterCount?: number;
  /** Called when "Clear All" is pressed */
  onClearAll?: () => void;
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function DTMobileFilterOverlay({
  visible,
  onDismiss,
  heading = 'Filters',
  activeFilterCount,
  onClearAll,
  variant = 'normal',
  children,
  className,
  style,
}: DTMobileFilterOverlayProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  return createPortal(
    <div className={cx('dt-filter-overlay', getVariantClass(variant), className)} style={style}>
      <div className="dt-filter-overlay-backdrop" onClick={onDismiss} />
      <div className="dt-filter-overlay-content">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderBottom: '1px solid rgba(var(--color-primary-rgb), 0.2)',
          }}>
          <span style={{ fontWeight: 700, fontSize: '1.125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {heading}
            {activeFilterCount !== undefined && activeFilterCount > 0 && (
              <span
                className="badge badge-mode"
                style={{ marginLeft: '8px', fontSize: '0.75rem' }}>
                {activeFilterCount}
              </span>
            )}
          </span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {onClearAll && activeFilterCount !== undefined && activeFilterCount > 0 && (
              <button
                onClick={onClearAll}
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}>
                Clear All
              </button>
            )}
            <button
              onClick={onDismiss}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-primary)',
                fontSize: '20px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0 4px',
              }}>
              ✕
            </button>
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: '16px', overflow: 'auto', maxHeight: 'calc(85vh - 60px)' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
