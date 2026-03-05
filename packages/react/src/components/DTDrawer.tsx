/**
 * DTDrawer — Sliding side panel with beveled edges.
 *
 * CSS reference: bevels.css .dt-bevel-drawer-right, .dt-bevel-drawer-left
 */

import { useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

interface DTDrawerProps {
  visible: boolean;
  onDismiss: () => void;
  heading: string;
  /** Color variant for heading bar @default 'emphasis' */
  headingVariant?: DTVariant;
  /** Slide direction @default 'right' */
  position?: 'right' | 'left';
  /** Panel width @default '400px' */
  width?: string | number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function DTDrawer({
  visible,
  onDismiss,
  heading,
  headingVariant = 'emphasis',
  position = 'right',
  width = 400,
  children,
  className,
  style,
}: DTDrawerProps) {
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

  const bevelClass = position === 'right' ? 'dt-bevel-drawer-right' : 'dt-bevel-drawer-left';
  const widthValue = typeof width === 'number' ? `${width}px` : width;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
      }}>
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          animation: 'dt-fade-in 0.2s ease-in-out both',
        }}
        onClick={onDismiss}
      />
      {/* Panel */}
      <div
        className={cx(
          bevelClass,
          getVariantClass(headingVariant),
          className,
        )}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          [position]: 0,
          width: widthValue,
          maxWidth: '100vw',
          background: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          animation: `dt-slide-${position === 'right' ? 'up' : 'up'} 0.2s ease-in-out both`,
          ...style,
        }}>
        {/* Header */}
        <div
          style={{
            padding: '16px',
            background: `var(${getVariantCSSVar(headingVariant)}, var(--color-primary))`,
            color: 'var(--color-bg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: '18px',
            letterSpacing: '0.5px',
          }}>
          <span>{heading}</span>
          <button
            onClick={onDismiss}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              fontSize: '20px',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '0 8px',
            }}
            type="button">
            ✕
          </button>
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function getVariantCSSVar(variant: DTVariant): string {
  const map: Record<DTVariant, string> = {
    normal: '--mode-normal',
    emphasis: '--mode-emphasis',
    warning: '--mode-warning',
    success: '--mode-success',
    other: '--mode-other',
  };
  return map[variant];
}
