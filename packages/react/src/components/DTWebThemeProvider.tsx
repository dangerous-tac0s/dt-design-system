/**
 * DTWebThemeProvider
 *
 * Sets data-brand and data-theme attributes on a wrapper div.
 * Provides React context for child components to read the active brand/theme.
 */

import { createContext, type ReactNode } from 'react';
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
  /** Additional className for the wrapper div */
  className?: string;
  children: ReactNode;
}

export function DTWebThemeProvider({
  brand = 'dt',
  theme = 'dark',
  className,
  children,
}: DTWebThemeProviderProps) {
  return (
    <DTWebThemeContext.Provider value={{ brand, theme }}>
      <div data-brand={brand} data-theme={theme} className={cx('dt-theme-root', className)}>
        {children}
      </div>
    </DTWebThemeContext.Provider>
  );
}
