/**
 * Hook to access the DTWebThemeProvider context.
 */
import { useContext } from 'react';
import { DTWebThemeContext } from '../components/DTWebThemeProvider';
import type { ThemeBrand, ThemeMode } from '@dangerousthings/tokens';

export function useDTWebTheme(): { brand: ThemeBrand; theme: ThemeMode } {
  const ctx = useContext(DTWebThemeContext);
  if (!ctx) {
    return { brand: 'dt', theme: 'dark' };
  }
  return ctx;
}
