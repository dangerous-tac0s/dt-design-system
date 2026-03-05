/**
 * DTMenu — Hierarchical menu with beveled items.
 *
 * CSS reference: forms-dt.css .dt-menu-item, .active, .selected
 */

import { useState, useCallback, type ReactNode, type CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';
import { getVariantClass } from '../utils/variantClasses';

export interface DTMenuItem {
  id: string;
  title: string;
  icon?: ReactNode;
  items?: DTMenuItem[];
  isActive?: boolean;
  isSelected?: boolean;
}

interface DTMenuProps {
  items: DTMenuItem[];
  /** Color variant @default 'normal' */
  variant?: DTVariant;
  onItemClick?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function DTMenu({
  items,
  variant = 'normal',
  onItemClick,
  className,
  style,
}: DTMenuProps) {
  return (
    <div
      className={cx(getVariantClass(variant), className)}
      style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...style }}>
      {items.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          level={0}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}

function MenuItem({
  item,
  level,
  onItemClick,
}: {
  item: DTMenuItem;
  level: number;
  onItemClick?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  const handleClick = useCallback(() => {
    if (hasChildren) {
      setExpanded(prev => !prev);
    }
    onItemClick?.(item.id);
  }, [hasChildren, item.id, onItemClick]);

  return (
    <>
      <button
        className={cx(
          'dt-menu-item',
          item.isActive && 'active',
          item.isSelected && 'selected',
        )}
        style={{ '--dt-menu-level': level } as CSSProperties}
        onClick={handleClick}
        aria-expanded={hasChildren ? expanded : undefined}
        type="button">
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {item.icon}
          {item.title}
        </span>
        {hasChildren && (
          <span
            className="dt-accordion-chevron"
            style={{
              transition: 'transform 250ms ease-in-out',
              transform: expanded ? 'rotate(180deg)' : undefined,
            }}
          />
        )}
      </button>
      {hasChildren && expanded && item.items!.map(child => (
        <MenuItem
          key={child.id}
          item={child}
          level={level + 1}
          onItemClick={onItemClick}
        />
      ))}
    </>
  );
}
