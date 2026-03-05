/**
 * DT Mobile Filter Overlay
 *
 * Full-screen slide-up overlay for mobile filter menus.
 * Source: dt-shopify-storefront MobileFilterMenu component.
 */

import {ReactNode, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Pressable,
  Animated,
  Dimensions,
  BackHandler,
} from 'react-native';
import {Text, Portal} from 'react-native-paper';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

interface DTMobileFilterOverlayProps {
  visible: boolean;
  onDismiss: () => void;
  /**
   * Header title
   */
  heading?: string;
  /**
   * Number of active filters (shown as badge in header)
   */
  activeFilterCount?: number;
  /**
   * Callback to clear all filters
   */
  onClearAll?: () => void;
  /**
   * Color variant for the header
   * @default 'normal'
   */
  variant?: DTVariant;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function DTMobileFilterOverlay({
  visible,
  onDismiss,
  heading = 'Filters',
  activeFilterCount,
  onClearAll,
  variant = 'normal',
  children,
  style,
}: DTMobileFilterOverlayProps) {
  const theme = useDTTheme();
  const accentColor = getVariantColor(theme, variant);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropAnim, slideAnim]);

  // Android back button
  useEffect(() => {
    if (!visible) return;
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      onDismiss();
      return true;
    });
    return () => handler.remove();
  }, [visible, onDismiss]);

  if (!visible) return null;

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, 0],
  });

  return (
    <Portal>
      <View style={styles.overlay}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, {opacity: backdropAnim}]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            styles.content,
            {
              backgroundColor: theme.colors.background,
              transform: [{translateY}],
              maxHeight: screenHeight * 0.85,
            },
            style,
          ]}>
          {/* Header */}
          <View style={[styles.header, {backgroundColor: accentColor}]}>
            <View style={styles.headerLeft}>
              <Text
                variant="titleMedium"
                style={[styles.headerText, {color: theme.colors.onPrimary}]}>
                {heading}
              </Text>
              {activeFilterCount !== undefined && activeFilterCount > 0 && (
                <View style={[styles.countBadge, {backgroundColor: theme.colors.onPrimary}]}>
                  <Text style={[styles.countText, {color: accentColor}]}>
                    {activeFilterCount}
                  </Text>
                </View>
              )}
            </View>
            <Pressable onPress={onDismiss} hitSlop={8}>
              <Text style={[styles.closeText, {color: theme.colors.onPrimary}]}>
                CLOSE
              </Text>
            </Pressable>
          </View>

          {/* Clear all button */}
          {onClearAll && activeFilterCount !== undefined && activeFilterCount > 0 && (
            <Pressable
              onPress={onClearAll}
              style={[styles.clearAll, {borderBottomColor: accentColor}]}>
              <Text style={[styles.clearAllText, {color: accentColor}]}>
                Clear All Filters
              </Text>
            </Pressable>
          )}

          {/* Filter content */}
          <View style={styles.body}>{children}</View>
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  clearAll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  body: {
    flexGrow: 1,
  },
});
