/**
 * DTGallery — Media gallery with beveled frame and thumbnails.
 * Supports images, 3D models (via <model-viewer>), videos, and external videos.
 *
 * CSS reference: bevels.css .dt-bevel-media
 */

import { useState, useEffect, type CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

/* ── TypeScript declaration for <model-viewer> web component ── */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        poster?: string;
        'camera-controls'?: boolean | string;
        'auto-rotate'?: boolean | string;
        'interaction-prompt'?: string;
        ar?: boolean | string;
        loading?: 'auto' | 'lazy' | 'eager';
      };
    }
  }
}

/* ── Gallery item types ── */

export type DTGalleryItem =
  | { type?: 'image'; key: string; src: string; alt?: string; thumbnail?: string }
  | { type: 'model3d'; key: string; src: string; alt?: string; thumbnail?: string; poster?: string }
  | { type: 'video'; key: string; src: string; alt?: string; thumbnail?: string; poster?: string }
  | { type: 'external-video'; key: string; src: string; alt?: string; thumbnail?: string };

interface DTGalleryProps {
  items: DTGalleryItem[];
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  /** Aspect ratio (width / height) for the display area @default 1 */
  aspectRatio?: number;
  className?: string;
  style?: CSSProperties;
}

/* ── Model-viewer script loader ── */

const MODEL_VIEWER_SRC =
  'https://unpkg.com/@google/model-viewer@v1.12.1/dist/model-viewer.min.js';

let modelViewerLoaded = false;

function useModelViewerScript(needed: boolean) {
  useEffect(() => {
    if (!needed || modelViewerLoaded || typeof document === 'undefined') return;
    if (customElements.get('model-viewer')) {
      modelViewerLoaded = true;
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = MODEL_VIEWER_SRC;
    document.head.appendChild(script);
    modelViewerLoaded = true;
  }, [needed]);
}

/* ── Shared styles ── */

const fillStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',
};

/* ── Component ── */

export function DTGallery({
  items,
  variant = 'normal',
  aspectRatio = 1,
  className,
  style,
}: DTGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasModel = items.some((i) => i.type === 'model3d');
  useModelViewerScript(hasModel);

  if (items.length === 0) return null;

  const current = items[activeIndex];
  const currentType = current.type || 'image';

  return (
    <div className={cx(getVariantClass(variant), className)} style={style}>
      {/* Main display */}
      <div
        className="dt-bevel-media"
        style={{ overflow: 'hidden', aspectRatio, position: 'relative' }}
      >
        {currentType === 'image' && (
          <img
            src={current.src}
            alt={current.alt || ''}
            style={{
              ...fillStyle,
              objectFit: 'contain',
              transition: 'opacity 300ms ease-in-out',
            }}
          />
        )}

        {currentType === 'model3d' && (
          <model-viewer
            src={current.src}
            alt={current.alt || ''}
            poster={'poster' in current ? current.poster : undefined}
            camera-controls=""
            auto-rotate=""
            interaction-prompt="auto"
            loading="lazy"
            style={{
              ...fillStyle,
              backgroundColor: 'var(--color-bg, #000)',
            }}
          />
        )}

        {currentType === 'video' && (
          <video
            src={current.src}
            poster={'poster' in current ? current.poster : undefined}
            controls
            playsInline
            preload="metadata"
            style={{
              ...fillStyle,
              objectFit: 'contain',
            }}
          />
        )}

        {currentType === 'external-video' && (
          <iframe
            src={current.src}
            title={current.alt || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              ...fillStyle,
              border: 'none',
            }}
          />
        )}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '8px',
            overflowX: 'auto',
          }}
        >
          {items.map((item, i) => {
            const itemType = item.type || 'image';
            const thumbSrc = item.thumbnail || ('poster' in item ? item.poster : undefined) || item.src;
            const isMedia = itemType === 'video' || itemType === 'external-video';

            return (
              <button
                key={item.key}
                onClick={() => setActiveIndex(i)}
                type="button"
                style={{
                  flexShrink: 0,
                  width: '64px',
                  height: '64px',
                  padding: 0,
                  border:
                    i === activeIndex
                      ? '2px solid var(--dt-card-color, var(--color-primary))'
                      : '2px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  src={thumbSrc}
                  alt={item.alt || ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Play icon overlay for video thumbnails */}
                {isMedia && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      margin: 'auto',
                      width: '24px',
                      height: '24px',
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
                      pointerEvents: 'none',
                    }}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
