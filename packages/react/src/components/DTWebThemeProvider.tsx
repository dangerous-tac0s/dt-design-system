/**
 * DTWebThemeProvider
 *
 * Sets data-brand and data-theme attributes on a wrapper div (default)
 * or on document.documentElement (documentLevel mode).
 * Provides React context for child components to read the active brand/theme.
 */

import { createContext, useEffect, type ReactNode } from 'react';
import type { ThemeBrand, ThemeMode } from '@dangerousthings/tokens';
import { cx } from '../utils/cx';

interface DTWebThemeContextValue {
  brand: ThemeBrand;
  theme: ThemeMode;
}

export const DTWebThemeContext = createContext<DTWebThemeContextValue | null>(null);

interface DTWebThemeProviderProps {
  /** Brand to apply @default 'dt' */
  brand?: ThemeBrand;
  /** Theme mode @default 'dark' */
  theme?: ThemeMode;
  /** When true, sets data-brand/data-theme on document.documentElement instead of a wrapper div */
  documentLevel?: boolean;
  /** Additional className for the wrapper div (ignored when documentLevel is true) */
  className?: string;
  children: ReactNode;
}

export function DTWebThemeProvider({
  brand = 'dt',
  theme = 'dark',
  documentLevel,
  className,
  children,
}: DTWebThemeProviderProps) {
  useEffect(() => {
    if (documentLevel) {
      document.documentElement.dataset.brand = brand;
      document.documentElement.dataset.theme = theme;
    }
  }, [documentLevel, brand, theme]);

  return (
    <DTWebThemeContext.Provider value={{ brand, theme }}>
      {documentLevel ? (
        children
      ) : (
        <div data-brand={brand} data-theme={theme} className={cx('dt-theme-root', className)}>
          {children}
        </div>
      )}
    </DTWebThemeContext.Provider>
  );
}
