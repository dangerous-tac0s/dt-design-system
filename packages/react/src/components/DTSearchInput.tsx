/**
 * DTSearchInput — Search field with icon.
 *
 * CSS reference: forms-dt.css .input
 */

import { useCallback, type CSSProperties, type KeyboardEvent } from 'react';
import { cx } from '../utils/cx';

interface DTSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function DTSearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
  className,
  style,
}: DTSearchInputProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(value);
      }
    },
    [onSearch, value],
  );

  return (
    <div
      className={cx('dt-search-input-wrapper', className)}
      style={{ position: 'relative', ...style }}>
      <input
        type="search"
        className="input"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{ width: '100%', padding: '8px 12px 8px 36px' }}
      />
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}
