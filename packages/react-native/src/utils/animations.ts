/**
 * Reusable animation hooks for DT components
 *
 * Provides common animation patterns (scale-in, pulse) as hooks
 * that consumers and new components can use consistently.
 */

import {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

/**
 * Scale-in entrance animation.
 * Returns an Animated.Value (0→1) to use as a scale transform.
 */
export function useScaleIn(options?: {
  enabled?: boolean;
  duration?: number;
  delay?: number;
}): Animated.Value {
  const {enabled = true, duration = 330, delay = 0} = options ?? {};
  const anim = useRef(new Animated.Value(enabled ? 0 : 1)).current;

  useEffect(() => {
    if (enabled) {
      anim.setValue(0);
      Animated.timing(anim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }).start();
    } else {
      anim.setValue(1);
    }
  }, [enabled, duration, delay, anim]);

  return anim;
}

/**
 * Pulse (ping) opacity animation loop.
 * Returns an Animated.Value that oscillates between 1 and 0.3.
 */
export function usePulse(enabled = true): Animated.Value {
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (enabled) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return () => {
        loop.stop();
        anim.setValue(1);
      };
    }
    anim.setValue(1);
  }, [enabled, anim]);

  return anim;
}
