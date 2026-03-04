/**
 * Shared layout measurement hook
 *
 * Extracts the common pattern of tracking component dimensions
 * via onLayout for SVG rendering.
 */

import {useState, useCallback} from 'react';
import {LayoutChangeEvent} from 'react-native';

interface ComponentDimensions {
  width: number;
  height: number;
}

export function useComponentLayout() {
  const [dimensions, setDimensions] = useState<ComponentDimensions>({
    width: 0,
    height: 0,
  });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setDimensions(prev => {
      if (prev.width === width && prev.height === height) return prev;
      return {width, height};
    });
  }, []);

  const hasDimensions = dimensions.width > 0 && dimensions.height > 0;

  return {dimensions, onLayout, hasDimensions};
}
