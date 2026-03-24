/**
 * DTModal — Portal-based modal with beveled card content.
 *
 * CSS reference: bevels.css .dt-bevel-modal, .card, .mode-*
 */

import { useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTModalProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  children: ReactNode;
  /** Whether clicking backdrop dismisses @default true */
  dismissable?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function DTModal({
  visible,
  onDismiss,
  title,
  variant = 'normal',
  children,
  dismissable = true,
  className,
  style,
}: DTModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissable) onDismiss();
    },
    [onDismiss, dismissable],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  if (!visible) return null;

  return createPortal(
    <div
      className="dt-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}>
      <div
        className="dt-modal-backdrop"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={dismissable ? onDismiss : undefined}
      />
      <div
        className={cx(
          'card',
          'dt-bevel-modal',
          getVariantClass(variant),
          'dt-animate-scale-in',
          className,
        )}
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
        role="dialog"
        aria-modal="true">
        {title && (
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span>{title}</span>
            {dismissable && (
              <button
                type="button"
                onClick={onDismiss}
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
        <div style={{ padding: 'var(--space-6, 24px)', overflow: 'auto', flex: '1 1 auto' }}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
