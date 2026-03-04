/**
 * DT Switch Component
 *
 * Custom-built angular toggle switch following the Dangerous Things design language.
 * RNP Switch delegates to native <NativeSwitch> with no shape control,
 * so we build a rectangular toggle from scratch.
 */

import {useRef, useEffect} from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
  Animated,
} from 'react-native';
import {Text} from 'react-native-paper';
import {DTColors} from '../theme/colors';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

const TRACK_WIDTH = 48;
const TRACK_HEIGHT = 26;
const THUMB_SIZE = 20;
const THUMB_MARGIN = 3;

interface DTSwitchProps {
  /**
   * Whether the switch is on
   */
  value: boolean;
  /**
   * Called when the value changes
   */
  onValueChange: (value: boolean) => void;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean;
  /**
   * Label text displayed beside the switch
   */
  label?: string;
  /**
   * Custom color (overrides variant)
   */
  color?: string;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled angular Switch/Toggle
 *
 * @example
 * <DTSwitch value={enabled} onValueChange={setEnabled} label="Enable NFC" />
 *
 * @example
 * <DTSwitch value={true} onValueChange={toggle} variant="success" />
 */
export function DTSwitch({
  value,
  onValueChange,
  variant = 'normal',
  disabled = false,
  label,
  color,
  style,
}: DTSwitchProps) {
  const accentColor = getVariantColor(variant, color);
  const thumbAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(thumbAnim, {
      toValue: value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [value, thumbAnim]);

  const thumbTranslateX = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_MARGIN, TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN],
  });

  const trackColor = thumbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [DTColors.disabledBackground, accentColor],
  });


  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={({pressed}) => [
        styles.container,
        {opacity: disabled ? 0.5 : pressed ? 0.7 : 1},
        style,
      ]}>
      {label && (
        <Text style={[styles.label, {color: DTColors.light}]}>{label}</Text>
      )}
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: trackColor,
            borderColor: accentColor,
          },
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: value ? DTColors.dark : DTColors.light,
              transform: [{translateX: thumbTranslateX}],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    letterSpacing: 0.3,
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderWidth: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
  },
});
