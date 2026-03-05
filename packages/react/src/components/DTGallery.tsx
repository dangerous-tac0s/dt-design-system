/**
 * DTGallery — Image gallery with beveled media frame and thumbnails.
 *
 * CSS reference: bevels.css .dt-bevel-media
 */

import { useState, type CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

export interface DTGalleryItem {
  key: string;
  src: string;
  alt?: string;
  thumbnail?: string;
}

interface DTGalleryProps {
  items: DTGalleryItem[];
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  className?: string;
  style?: CSSProperties;
}

export function DTGallery({
  items,
  variant = 'normal',
  className,
  style,
}: DTGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const current = items[activeIndex];

  return (
    <div className={cx(getVariantClass(variant), className)} style={style}>
      {/* Main image */}
      <div className="dt-bevel-media" style={{ overflow: 'hidden' }}>
        <img
          src={current.src}
          alt={current.alt || ''}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 300ms ease-in-out',
          }}
        />
      </div>
      {/* Thumbnails */}
      {items.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '8px',
            overflowX: 'auto',
          }}>
          {items.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setActiveIndex(i)}
              type="button"
              style={{
                flexShrink: 0,
                width: '64px',
                height: '64px',
                padding: 0,
                border: i === activeIndex
                  ? '2px solid var(--dt-card-color, var(--color-primary))'
                  : '2px solid transparent',
                background: 'none',
                cursor: 'pointer',
                overflow: 'hidden',
              }}>
              <img
                src={item.thumbnail || item.src}
                alt={item.alt || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
