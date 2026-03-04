/**
 * DT Drawer Component
 *
 * Hybrid component: RNP Portal for layering + custom Animated panel
 * for the sliding behavior. RNP has no sliding panel component.
 *
 * Uses the dual-SVG-path technique (outer border fill + inner dark fill)
 * consistent with DTCard/DTMediaFrame for proper visual clipping at
 * beveled corners.
 *
 * Web CSS reference (Aside.tsx):
 * - Fixed sidebar sliding from right
 * - Beveled left edges (top-left + bottom-left for right drawer)
 * - Colored header bar
 * - Overlay backdrop
 * - transition: transform 200ms ease-in-out
 */

import {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Pressable,
  Animated,
  BackHandler,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {Portal, Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DTColors} from '../theme/colors';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildDrawerBevelPath} from '../utils/bevelPaths';

interface DTDrawerProps {
  /**
   * Whether the drawer is visible
   */
  visible: boolean;
  /**
   * Called when the drawer is dismissed
   */
  onDismiss: () => void;
  /**
   * Heading text in the drawer header bar
   */
  heading: string;
  /**
   * Visual variant for the header bar
   * @default 'emphasis'
   */
  headingVariant?: DTVariant;
  /**
   * Which side the drawer slides from
   * @default 'right'
   */
  position?: 'right' | 'left';
  /**
   * Drawer panel width in pixels
   * @default 400
   */
  width?: number;
  /**
   * Bevel size in pixels
   * @default 32
   */
  bevelSize?: number;
  /**
   * Border width in pixels
   * @default 2
   */
  borderWidth?: number;
  /**
   * Drawer content
   */
  children: React.ReactNode;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled Drawer/Aside with beveled edges and slide animation
 *
 * @example
 * <DTDrawer visible={cartOpen} onDismiss={() => setCartOpen(false)} heading="Cart">
 *   <CartItems />
 * </DTDrawer>
 *
 * @example
 * <DTDrawer visible={menuOpen} onDismiss={close} heading="Menu" position="left">
 *   <MenuItems />
 * </DTDrawer>
 */
export function DTDrawer({
  visible,
  onDismiss,
  heading,
  headingVariant = 'emphasis',
  position = 'right',
  width: drawerWidth = 400,
  bevelSize = 32,
  borderWidth = 2,
  children,
  style,
}: DTDrawerProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const headerColor = getVariantColor(headingVariant);
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const effectiveWidth = Math.min(drawerWidth, screenWidth);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, overlayAnim]);

  // Android back button handling
  useEffect(() => {
    if (!visible) return;
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      onDismiss();
      return true;
    });
    return () => handler.remove();
  }, [visible, onDismiss]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      position === 'right' ? effectiveWidth : -effectiveWidth,
      0,
    ],
  });

  // Don't render when fully hidden
  const pointerEvents = visible ? 'auto' : 'none';

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill} pointerEvents={pointerEvents}>
        {/* Overlay backdrop */}
        <Animated.View style={[StyleSheet.absoluteFill, {opacity: overlayAnim}]}>
          <Pressable
            style={[StyleSheet.absoluteFill, styles.overlay]}
            onPress={onDismiss}
          />
        </Animated.View>

        {/* Drawer panel */}
        <Animated.View
          style={[
            styles.panel,
            position === 'right' ? styles.panelRight : styles.panelLeft,
            {width: effectiveWidth, transform: [{translateX}]},
            style,
          ]}>
          {/* Dual-SVG-path technique: outer border + inner dark fill */}
          <View style={StyleSheet.absoluteFill}>
            <Svg width={effectiveWidth} height={screenHeight}>
              {/* Outer path: accent border color */}
              <Path
                d={buildDrawerBevelPath(
                  effectiveWidth,
                  screenHeight,
                  bevelSize,
                  position,
                )}
                fill={headerColor}
              />
              {/* Inner path: dark background (inset by borderWidth) */}
              <Path
                d={buildDrawerBevelPath(
                  effectiveWidth - borderWidth * 2,
                  screenHeight - borderWidth * 2,
                  bevelSize - borderWidth,
                  position,
                )}
                fill={DTColors.dark}
                transform={`translate(${borderWidth}, ${borderWidth})`}
              />
            </Svg>
          </View>

          {/* Header bar */}
          <View style={[styles.header, {backgroundColor: headerColor, paddingTop: insets.top + 16}]}>
            <Text style={styles.headerText}>{heading}</Text>
            <Pressable
              onPress={onDismiss}
              style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.content}
            contentContainerStyle={[styles.contentContainer, {paddingBottom: insets.bottom + 16}]}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: DTColors.overlay,
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  panelRight: {
    right: 0,
  },
  panelLeft: {
    left: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    zIndex: 1,
  },
  headerText: {
    color: DTColors.dark,
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  closeButton: {
    color: DTColors.dark,
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});
