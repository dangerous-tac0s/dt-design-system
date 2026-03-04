/**
 * DT TextInput Component
 *
 * A themed text input wrapping React Native Paper's TextInput
 * with the Dangerous Things angular aesthetic.
 *
 * Web CSS reference (.mode-input):
 * - 2px solid border in mode color
 * - Focus: box-shadow 0 4px 0 1px var(--mode)
 * - border-radius: 0
 */

import {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  Animated,
} from 'react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import {DTColors} from '../theme/colors';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

interface DTTextInputProps
  extends Omit<TextInputProps, 'mode' | 'theme' | 'error' | 'ref'> {
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Border width
   * @default 2
   */
  borderWidth?: number;
  /**
   * Whether the input is in error state
   */
  error?: boolean;
  /**
   * Error message text displayed below input
   */
  errorMessage?: string;
  /**
   * Additional styles for the outer wrapper
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the input text
   */
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * DT-styled TextInput wrapping React Native Paper TextInput
 *
 * @example
 * <DTTextInput variant="normal" label="Username" value={name} onChangeText={setName} />
 *
 * @example
 * <DTTextInput variant="warning" error errorMessage="Required field" label="Email" />
 */
export function DTTextInput({
  variant = 'normal',
  color,
  borderWidth = 2,
  error = false,
  errorMessage,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  style,
  ...props
}: DTTextInputProps) {
  const [focused, setFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const accentColor = error
    ? DTColors.modeWarning
    : getVariantColor(variant, color);

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
    <View style={containerStyle}>
      <View
        style={[
          styles.inputWrapper,
          {borderColor: accentColor, borderWidth},
        ]}>
        <TextInput
          {...props}
          mode="flat"
          error={false}
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[styles.input, inputStyle, style]}
          textColor={DTColors.light}
          placeholderTextColor={DTColors.disabled}
          activeUnderlineColor="transparent"
          underlineColor="transparent"
          theme={{
            colors: {
              primary: accentColor,
              onSurfaceVariant: accentColor,
            },
            roundness: 0,
          }}
        />
      </View>
      {/* Focus glow bar — simulates web box-shadow: 0 4px 0 1px */}
      <Animated.View
        style={[
          styles.focusBar,
          {
            backgroundColor: accentColor,
            opacity: focusAnim,
          },
        ]}
      />
      {error && errorMessage && (
        <View style={styles.errorContainer}>
          <Animated.Text style={[styles.errorText, {color: DTColors.modeWarning}]}>
            {errorMessage}
          </Animated.Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: DTColors.dark,
  },
  input: {
    backgroundColor: 'transparent',
  },
  focusBar: {
    height: 4,
    marginTop: 1,
  },
  errorContainer: {
    marginTop: 4,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
