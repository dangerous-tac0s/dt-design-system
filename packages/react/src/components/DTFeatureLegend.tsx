/**
 * DTFeatureLegend — Interactive grid of product feature icons with rotated labels.
 *
 * Matches dt-shopify-storefront UseCaseLegend: header bar with hover details,
 * rotated vertical labels (above for row 0, below for row 1), ? toggle,
 * bordered grid with dark cell backgrounds, and pulse-on-hover icons.
 *
 * CSS reference: feature-legend.css
 */

import { useState, type ReactNode, type CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

export interface DTFeatureItem {
  key: string;
  name: string;
  icon: ReactNode;
  state: 'supported' | 'disabled' | 'unsupported';
  /** Optional detail text shown in the header on hover */
  detail?: string;
}

const stateClassMap: Record<DTFeatureItem['state'], string> = {
  supported: 'dt-feature-supported',
  disabled: 'dt-feature-disabled',
  unsupported: 'dt-feature-unsupported',
};

interface DTFeatureLegendProps {
  features: DTFeatureItem[];
  title?: string;
  /** Header variant @default 'normal' */
  variant?: DTVariant;
  /** Grid columns @default 5 */
  columns?: number;
  /** Icon size in px @default 42 */
  iconSize?: number;
  /** Show rotated labels initially @default true */
  showLabels?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function DTFeatureLegend({
  features,
  title,
  variant = 'normal',
  columns = 5,
  iconSize = 42,
  showLabels: initialShowLabels = true,
  className,
  style,
}: DTFeatureLegendProps) {
  const [showLabels, setShowLabels] = useState(initialShowLabels);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const hoveredItem = hoveredFeature
    ? features.find(f => f.key === hoveredFeature)
    : null;

  const rowCount = Math.ceil(features.length / columns);
  const hasBottomRow = rowCount >= 2;

  return (
    <div
      className={cx('dt-feature-legend', getVariantClass(variant), className)}
      style={style}>

      {/* Header bar — title + hovered feature detail + ? toggle */}
      {title && (
        <div className="dt-feature-legend-header">
          <div className="dt-feature-legend-header-content">
            <div className="dt-feature-legend-title">{title}</div>
            <div className="dt-feature-legend-detail">
              {hoveredItem ? (
                <span className={stateClassMap[hoveredItem.state]}>
                  {hoveredItem.name}{hoveredItem.detail ? ': ' : ''}
                  {hoveredItem.detail && <strong>{hoveredItem.detail}</strong>}
                </span>
              ) : (
                <span className="dt-feature-legend-hint">
                  Hover a feature for details
                </span>
              )}
            </div>
          </div>
          <button
            className="dt-feature-legend-toggle"
            onClick={() => setShowLabels(v => !v)}
            aria-label={showLabels ? 'Hide feature labels' : 'Show feature labels'}
            title={showLabels ? 'Hide labels' : 'Show labels'}
            type="button">
            ?
          </button>
        </div>
      )}

      {/* Icon grid with border */}
      <div className="dt-feature-legend-body">
        <div
          className={cx(
            'dt-feature-legend-grid',
            showLabels && 'with-labels',
            showLabels && hasBottomRow && 'with-labels-bottom',
          )}
          style={{ '--dt-feature-columns': columns } as CSSProperties}>
          {features.map((feature, index) => {
            const row = Math.floor(index / columns);
            const labelPosition = rowCount >= 2 ? (row === 0 ? 'above' : 'below') : 'above';

            return (
              <div
                key={feature.key}
                className={cx('dt-feature-legend-item', stateClassMap[feature.state])}
                style={{ width: `${100 / columns}%` }}
                onMouseEnter={() => setHoveredFeature(feature.key)}
                onMouseLeave={() => setHoveredFeature(null)}>

                {/* Rotated vertical label — always in DOM, visibility via CSS */}
                <div className={cx(
                  'dt-feature-legend-rotated-label',
                  labelPosition === 'below' ? 'label-below' : 'label-above',
                  showLabels && 'label-visible',
                )}>
                  <span>{feature.name}</span>
                </div>

                <div
                  className="dt-feature-legend-icon"
                  style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
                  {feature.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
