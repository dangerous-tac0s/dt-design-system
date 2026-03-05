/**
 * DT Badge Overlay
 *
 * Positioning wrapper for badges on cards and media frames.
 * Places children absolutely at a specified corner with configurable offset.
 */

import {ReactNode} from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';

type BadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface DTBadgeOverlayProps {
  children: ReactNode;
  /**
   * Corner position for the badge
   * @default 'bottom-right'
   */
  position?: BadgePosition;
  /**
   * Offset from the corner in pixels
   * @default 8
   */
  offset?: number;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

export function DTBadgeOverlay({
  children,
  position = 'bottom-right',
  offset = 8,
  style,
}: DTBadgeOverlayProps) {
  const positionStyle: ViewStyle = {
    position: 'absolute',
    zIndex: 4,
    ...(position.includes('top') ? {top: offset} : {bottom: offset}),
    ...(position.includes('right') ? {right: offset} : {left: offset}),
  };

  return <View style={[positionStyle, style]}>{children}</View>;
}
