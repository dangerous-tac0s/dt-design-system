/**
 * DTFeatureLegend — Grid of product feature icons with rotated labels.
 *
 * CSS reference: feature-legend.css .dt-feature-legend, .dt-feature-legend-header,
 * .dt-feature-legend-grid, .dt-feature-legend-item, .dt-feature-supported, etc.
 */

import type { ReactNode, CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass, featureStateToVariant } from '../utils/variantClasses';

export interface DTFeatureItem {
  key: string;
  name: string;
  icon: ReactNode;
  state: 'supported' | 'disabled' | 'unsupported';
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
  className?: string;
  style?: CSSProperties;
}

export function DTFeatureLegend({
  features,
  title,
  variant = 'normal',
  columns = 5,
  iconSize = 42,
  className,
  style,
}: DTFeatureLegendProps) {
  // Suppress unused import warning — featureStateToVariant is available for consumers
  void featureStateToVariant;

  return (
    <div
      className={cx('dt-feature-legend', getVariantClass(variant), className)}
      style={style}>
      {title && (
        <div className="dt-feature-legend-header">{title}</div>
      )}
      <div
        className="dt-feature-legend-grid"
        style={{ '--dt-feature-columns': columns } as CSSProperties}>
        {features.map(feature => (
          <div
            key={feature.key}
            className={cx('dt-feature-legend-item', stateClassMap[feature.state])}
            style={{ width: `${100 / columns}%` }}>
            <div
              className="dt-feature-legend-icon"
              style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
              {feature.icon}
            </div>
            <div className="dt-feature-legend-label">{feature.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
