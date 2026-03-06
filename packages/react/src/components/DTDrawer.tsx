/**
 * DTDrawer — Sliding side panel with beveled edges.
 *
 * Matches the dt-shopify-storefront Aside pattern:
 * - Outer colored shell (mode color) with beveled clip-path
 * - Inner dark surface with inset bevel clip-path (creates colored border)
 * - Colored header bar with bold heading + close button
 * - Scrollable content area
 * - Slides in and out from the correct edge
 *
 * CSS reference: bevels.css .dt-bevel-drawer-right, .dt-bevel-drawer-left
 */

import { useEffect, useState, useCallback, useRef, type ReactNode, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

const DURATION = 200;

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
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Open: mount immediately
  useEffect(() => {
    if (visible) {
      setClosing(false);
      setMounted(true);
    }
  }, [visible]);

  // Close: play exit animation, then unmount
  useEffect(() => {
    if (!visible && mounted && !closing) {
      setClosing(true);
      timerRef.current = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, DURATION);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, mounted, closing]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    if (mounted && !closing) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [mounted, closing, handleKeyDown]);

  if (!mounted) return null;

  const bevelClass = position === 'right' ? 'dt-bevel-drawer-right' : 'dt-bevel-drawer-left';
  const innerBevelClass = position === 'right' ? 'dt-bevel-drawer-right-inner' : 'dt-bevel-drawer-left-inner';
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const varCSSVar = getVariantCSSVar(headingVariant);

  // Slide direction for exit: reverse of entry
  const slideOut = position === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        pointerEvents: closing ? 'none' : undefined,
      }}>
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(4px)',
          animation: closing ? undefined : `dt-fade-in 0.4s ease-in-out both`,
          opacity: closing ? 0 : undefined,
          transition: closing ? `opacity ${DURATION}ms ease-in-out` : undefined,
        }}
        onClick={closing ? undefined : onDismiss}
      />
      {/* Outer shell */}
      <div
        className={cx(
          bevelClass,
          getVariantClass(headingVariant),
          className,
        )}
        style={{
          position: 'absolute',
          top: 0,
          [position]: 0,
          height: '99vh',
          width: widthValue,
          maxWidth: '100vw',
          background: `var(${varCSSVar}, var(--color-primary))`,
          padding: '3px',
          paddingRight: position === 'right' ? 0 : '3px',
          paddingLeft: position === 'left' ? 0 : '3px',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.3)',
          animation: closing ? undefined : `dt-slide-${position} ${DURATION}ms ease-in-out both`,
          transform: closing ? slideOut : undefined,
          transition: closing ? `transform ${DURATION}ms ease-in-out` : undefined,
          ...style,
        }}>
        {/* Inner surface */}
        <div
          className={innerBevelClass}
          style={{
            height: '100%',
            background: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
          }}>
          {/* Header */}
          <div
            style={{
              height: 64,
              padding: '0 1em',
              background: `var(${varCSSVar}, var(--color-primary))`,
              color: 'var(--color-bg)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: 900,
              fontSize: '2em',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--color-bg)',
            }}>
            <span>{heading}</span>
            <button
              onClick={onDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                fontSize: '0.6em',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0 8px',
                opacity: 0.8,
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
