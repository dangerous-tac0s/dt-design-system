/**
 * DT Menu Component
 *
 * Wraps React Native Paper's Menu for dropdown positioning, with custom
 * menu items styled to the Dangerous Things aesthetic.
 *
 * Web CSS reference (CyberMenu):
 * - Hierarchical items with menu-item-clipped styling
 * - Active/selected state with emphasis color fill
 * - borderTopWidth: 5 thick accent border
 */

import {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Pressable,
  Animated,
} from 'react-native';
import {Menu, Text} from 'react-native-paper';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

export interface DTMenuItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Display title
   */
  title: string;
  /**
   * Press handler (leaf items)
   */
  onPress?: () => void;
  /**
   * Sub-menu items
   */
  items?: DTMenuItem[];
  /**
   * Whether this item is currently active
   */
  isActive?: boolean;
}

interface DTMenuProps {
  /**
   * Menu items
   */
  items: DTMenuItem[];
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Variant for active items
   * @default 'emphasis'
   */
  activeVariant?: DTVariant;
  /**
   * Layout direction
   * @default 'vertical'
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled Menu with hierarchical items
 *
 * For inline menu display (not dropdown). Items with sub-items
 * expand/collapse on press.
 *
 * @example
 * <DTMenu items={[
 *   { id: '1', title: 'Home', onPress: goHome, isActive: true },
 *   { id: '2', title: 'Products', items: [
 *     { id: '2a', title: 'NFC Tags', onPress: goTags },
 *   ]},
 * ]} />
 */
export function DTMenu({
  items,
  variant = 'normal',
  activeVariant = 'emphasis',
  layout = 'vertical',
  style,
}: DTMenuProps) {
  return (
    <View
      style={[
        styles.container,
        layout === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}>
      {items.map(item => (
        <DTMenuItemRow
          key={item.id}
          item={item}
          variant={variant}
          activeVariant={activeVariant}
          level={0}
        />
      ))}
    </View>
  );
}

/**
 * For dropdown use, wraps RNP Menu for positioning/portal behavior
 */
interface DTMenuDropdownProps {
  /**
   * Menu items
   */
  items: DTMenuItem[];
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Anchor element or position
   */
  anchor: React.ReactNode;
  /**
   * Whether the menu is visible
   */
  visible: boolean;
  /**
   * Called when the menu is dismissed
   */
  onDismiss: () => void;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled dropdown Menu wrapping React Native Paper Menu
 *
 * @example
 * <DTMenuDropdown
 *   items={menuItems}
 *   anchor={<DTButton onPress={open}>Open Menu</DTButton>}
 *   visible={menuVisible}
 *   onDismiss={() => setMenuVisible(false)}
 * />
 */
export function DTMenuDropdown({
  items,
  variant = 'normal',
  anchor,
  visible,
  onDismiss,
  style,
}: DTMenuDropdownProps) {
  const theme = useDTTheme();
  const accentColor = getVariantColor(theme, variant);

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      anchor={anchor}
      anchorPosition="bottom"
      contentStyle={[
        styles.dropdownContent,
        {borderColor: accentColor, backgroundColor: theme.colors.background},
        style,
      ]}
      theme={{
        colors: {
          elevation: {level2: theme.colors.background},
        },
      }}>
      {items.map(item => (
        <Menu.Item
          key={item.id}
          title={item.title}
          onPress={() => {
            item.onPress?.();
            onDismiss();
          }}
          titleStyle={[styles.dropdownItemTitle, {color: theme.colors.onSurface}]}
          style={styles.dropdownItem}
        />
      ))}
    </Menu>
  );
}

// --- Internal DTMenuItemRow ---

function DTMenuItemRow({
  item,
  variant,
  activeVariant,
  level,
}: {
  item: DTMenuItem;
  variant: DTVariant;
  activeVariant: DTVariant;
  level: number;
}) {
  const theme = useDTTheme();
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.items && item.items.length > 0;
  const isActive = item.isActive || expanded;
  const itemColor = getVariantColor(theme, isActive ? activeVariant : variant);

  const heightAnim = useRef(new Animated.Value(0)).current;
  const chevronAnim = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    if (!hasChildren) return;
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: expanded ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(chevronAnim, {
        toValue: expanded ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [expanded, heightAnim, chevronAnim, hasChildren]);

  const handlePress = useCallback(() => {
    if (hasChildren) {
      setExpanded(prev => !prev);
    } else {
      item.onPress?.();
    }
  }, [hasChildren, item]);

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const chevronRotate = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={({pressed}) => [
          styles.menuItem,
          {
            borderColor: itemColor,
            borderTopColor: itemColor,
            backgroundColor: isActive
              ? `${itemColor}20`
              : theme.colors.background,
            paddingLeft: 16 + level * 16,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <Text style={[styles.menuItemTitle, {color: itemColor}]}>
          {item.title}
        </Text>
        {hasChildren && (
          <Animated.View
            style={[
              styles.chevron,
              {transform: [{rotate: chevronRotate}]},
            ]}>
            <View style={[styles.chevronArrow, {borderTopColor: itemColor}]} />
          </Animated.View>
        )}
      </Pressable>
      {hasChildren && (
        <Animated.View
          style={{
            height: measured ? animatedHeight : undefined,
            overflow: 'hidden',
          }}>
          <View
            onLayout={e => {
              const h = e.nativeEvent.layout.height;
              if (h > 0 && !measured) {
                setContentHeight(h);
                setMeasured(true);
                if (!expanded) {
                  heightAnim.setValue(0);
                }
              }
            }}>
            {item.items?.map(child => (
              <DTMenuItemRow
                key={child.id}
                item={child}
                variant={variant}
                activeVariant={activeVariant}
                level={level + 1}
              />
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  vertical: {
    flexDirection: 'column',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderTopWidth: 5,
    paddingVertical: 12,
    paddingRight: 16,
  },
  menuItemTitle: {
    fontWeight: '600',
    letterSpacing: 0.5,
    fontSize: 14,
  },
  chevron: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  chevronArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  dropdownContent: {
    borderWidth: 2,
    borderRadius: 0,
  },
  dropdownItem: {
    borderRadius: 0,
  },
  dropdownItemTitle: {
    letterSpacing: 0.3,
  },
});
