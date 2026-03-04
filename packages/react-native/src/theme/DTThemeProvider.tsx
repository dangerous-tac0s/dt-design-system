/**
 * DT Theme Provider
 *
 * Wraps your app with the Dangerous Things theme.
 * Combines React Native Paper's PaperProvider with
 * custom theme context for extended DT colors.
 */

import { createContext, useContext, ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { DTExtendedDarkTheme, DTExtendedTheme } from './paperTheme';

/**
 * Context for accessing extended theme properties
 */
const DTThemeContext = createContext<DTExtendedTheme>(DTExtendedDarkTheme);

/**
 * Hook to access the full DT theme including custom properties
 *
 * @example
 * const theme = useDTTheme();
 * const successColor = theme.custom.success;
 */
export function useDTTheme(): DTExtendedTheme {
  return useContext(DTThemeContext);
}

interface DTThemeProviderProps {
  children: ReactNode;
  /**
   * Override the default theme (useful for testing or custom variants)
   */
  theme?: DTExtendedTheme;
  /**
   * Include SafeAreaProvider wrapper (default: true)
   * Set to false if you already have SafeAreaProvider higher in tree
   */
  includeSafeArea?: boolean;
}

/**
 * Theme provider component
 *
 * @example
 * // In your App.tsx
 * import { DTThemeProvider } from '@anthropic-dangerous-things/react-native-theme';
 *
 * export default function App() {
 *   return (
 *     <DTThemeProvider>
 *       <NavigationContainer>
 *         <YourApp />
 *       </NavigationContainer>
 *     </DTThemeProvider>
 *   );
 * }
 */
export function DTThemeProvider({
  children,
  theme = DTExtendedDarkTheme,
  includeSafeArea = true,
}: DTThemeProviderProps) {
  const content = (
    <DTThemeContext.Provider value={theme}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        {children}
      </PaperProvider>
    </DTThemeContext.Provider>
  );

  if (includeSafeArea) {
    return <SafeAreaProvider>{content}</SafeAreaProvider>;
  }

  return content;
}
