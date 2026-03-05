/**
 * DTAccordion — Expandable sections with animated height and chevron.
 *
 * CSS reference: forms-dt.css .dt-accordion, .dt-accordion-header,
 * .dt-accordion-chevron, .dt-accordion-content
 */

import { useState, useCallback, type ReactNode, type CSSProperties } from 'react';
import type { DTVariant } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';

export interface DTAccordionSection {
  key: string;
  title: string;
  children: ReactNode;
}

interface DTAccordionProps {
  sections: DTAccordionSection[];
  /** Header variant when closed @default 'normal' */
  variant?: DTVariant;
  /** Header variant when open @default 'emphasis' */
  activeVariant?: DTVariant;
  /** Allow multiple sections open @default false */
  allowMultiple?: boolean;
  initialOpenKeys?: string[];
  onSectionToggle?: (key: string, isOpen: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export function DTAccordion({
  sections,
  allowMultiple = false,
  initialOpenKeys,
  onSectionToggle,
  className,
  style,
}: DTAccordionProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(
    new Set(initialOpenKeys),
  );

  const toggle = useCallback(
    (key: string) => {
      setOpenKeys(prev => {
        const next = new Set(allowMultiple ? prev : []);
        const isOpening = !prev.has(key);
        if (isOpening) next.add(key);
        else next.delete(key);
        onSectionToggle?.(key, isOpening);
        return next;
      });
    },
    [allowMultiple, onSectionToggle],
  );

  return (
    <div className={cx('dt-accordion', className)} style={style}>
      {sections.map(section => {
        const isOpen = openKeys.has(section.key);
        return (
          <div key={section.key}>
            <button
              className="dt-accordion-header"
              aria-expanded={isOpen}
              onClick={() => toggle(section.key)}
              type="button"
              style={{ width: '100%' }}>
              <span>{section.title}</span>
              <span className="dt-accordion-chevron" />
            </button>
            <div
              className="dt-accordion-content"
              data-open={isOpen}>
              {section.children}
            </div>
          </div>
        );
      })}
    </div>
  );
}
