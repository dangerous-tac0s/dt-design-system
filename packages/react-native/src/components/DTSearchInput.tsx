/**
 * DT SearchInput Component
 *
 * A themed search input wrapping React Native Paper's Searchbar
 * with the Dangerous Things angular aesthetic.
 *
 * Styled input only — predictive results logic is app-specific
 * (composable principle from CLAUDE.md).
 */

import {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, ViewStyle, TextStyle, StyleProp, Animated} from 'react-native';
import {Searchbar, ActivityIndicator} from 'react-native-paper';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

interface DTSearchInputProps {
  /**
   * Current search text
   */
  value: string;
  /**
   * Called when text changes
   */
  onChangeText: (text: string) => void;
  /**
   * Called when search is submitted
   */
  onSubmit?: () => void;
  /**
   * Placeholder text
   * @default 'Search...'
   */
  placeholder?: string;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Show loading indicator instead of search icon
   * @default false
   */
  loading?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Auto-focus the input on mount
   */
  autoFocus?: boolean;
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the input text
   */
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * DT-styled SearchInput wrapping React Native Paper Searchbar
 *
 * @example
 * <DTSearchInput value={query} onChangeText={setQuery} onSubmit={handleSearch} />
 *
 * @example
 * <DTSearchInput value={query} onChangeText={setQuery} loading={isSearching} variant="emphasis" />
 */
export function DTSearchInput({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Search...',
  variant = 'normal',
  loading = false,
  disabled = false,
  autoFocus = false,
  color,
  style,
  inputStyle,
}: DTSearchInputProps) {
  const theme = useDTTheme();
  const accentColor = getVariantColor(theme, variant, color);
  const [focused, setFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(focusAnim, {
      toValue: focused ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    });
    anim.start();
    return () => anim.stop();
  }, [focused, focusAnim]);

  return (
    <View style={[styles.container, style]}>
      <Searchbar
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        placeholder={placeholder}
        placeholderTextColor={theme.colors.onSurfaceDisabled}
        editable={!disabled}
        autoFocus={autoFocus}
        icon={
          loading
            ? () => <ActivityIndicator size={20} color={accentColor} />
            : 'magnify'
        }
        iconColor={accentColor}
        inputStyle={[styles.input, {color: theme.colors.onSurface}, inputStyle]}
        style={[styles.searchbar, {borderColor: accentColor, backgroundColor: theme.colors.background}]}
        rippleColor={accentColor}
        theme={{
          colors: {
            elevation: {level3: theme.colors.background},
            onSurface: theme.colors.onSurface,
            onSurfaceVariant: accentColor,
          },
          roundness: 0,
        }}
      />
      {/* Focus glow bar — matches DTTextInput */}
      <Animated.View
        style={[
          styles.focusBar,
          {
            backgroundColor: accentColor,
            opacity: focusAnim,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  searchbar: {
    borderWidth: 2,
    elevation: 0,
  },
  input: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  focusBar: {
    height: 4,
    marginTop: 1,
  },
});
