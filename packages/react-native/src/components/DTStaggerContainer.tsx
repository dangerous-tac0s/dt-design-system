/**
 * DT Stagger Container
 *
 * Animates children with staggered scale-in entrances.
 * Source: dt-shopify-storefront framer-motion staggered card entrance pattern.
 */

import {ReactNode, Children, useRef, useEffect} from 'react';
import {Animated, ViewStyle, StyleProp} from 'react-native';

interface DTStaggerContainerProps {
  children: ReactNode;
  /**
   * Duration of each child's scale-in animation in ms
   * @default 330
   */
  duration?: number;
  /**
   * Delay between each child's animation start in ms
   * @default 75
   */
  interval?: number;
  /**
   * Additional styles for the container
   */
  style?: StyleProp<ViewStyle>;
}

export function DTStaggerContainer({
  children,
  duration = 330,
  interval = 75,
  style,
}: DTStaggerContainerProps) {
  const childArray = Children.toArray(children);
  const animations = useRef(childArray.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Reset animations if child count changes
    while (animations.length < childArray.length) {
      animations.push(new Animated.Value(0));
    }

    const staggered = childArray.map((_, i) =>
      Animated.timing(animations[i], {
        toValue: 1,
        duration,
        delay: i * interval,
        useNativeDriver: true,
      }),
    );
    Animated.parallel(staggered).start();
  }, [childArray.length, duration, interval]);

  return (
    <Animated.View style={style}>
      {childArray.map((child, i) => (
        <Animated.View
          key={i}
          style={{transform: [{scale: animations[i] ?? new Animated.Value(1)}]}}>
          {child}
        </Animated.View>
      ))}
    </Animated.View>
  );
}
