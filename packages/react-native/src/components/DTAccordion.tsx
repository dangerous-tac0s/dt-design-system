/**
 * DT Accordion Component
 *
 * Custom-built accordion with animated height expansion following
 * the Dangerous Things angular aesthetic.
 *
 * Web CSS reference (FilterAccordion):
 * - menu-item-clipped style headers with thick top border
 * - Expand/collapse with height animation
 * - Active sections switch to activeVariant color
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
import {Text} from 'react-native-paper';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';

export interface DTAccordionSection {
  /**
   * Unique key for the section
   */
  key: string;
  /**
   * Section header title
   */
  title: string;
  /**
   * Section content (rendered when expanded)
   */
  children: React.ReactNode;
}

interface DTAccordionProps {
  /**
   * Array of accordion sections
   */
  sections: DTAccordionSection[];
  /**
   * Visual variant for section headers
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Variant color for active/expanded sections
   * @default 'emphasis'
   */
  activeVariant?: DTVariant;
  /**
   * Allow multiple sections open simultaneously
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * Section keys to open initially
   */
  initialOpenKeys?: string[];
  /**
   * Called when a section is toggled
   */
  onSectionToggle?: (key: string, isOpen: boolean) => void;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * DT-styled Accordion with animated height expansion
 *
 * @example
 * <DTAccordion
 *   sections={[
 *     { key: 'size', title: 'Size', children: <SizeFilter /> },
 *     { key: 'color', title: 'Color', children: <ColorFilter /> },
 *   ]}
 *   variant="normal"
 * />
 */
export function DTAccordion({
  sections,
  variant = 'normal',
  activeVariant = 'emphasis',
  allowMultiple = false,
  initialOpenKeys,
  onSectionToggle,
  style,
}: DTAccordionProps) {
  const theme = useDTTheme();
  const [openKeys, setOpenKeys] = useState<Set<string>>(
    new Set(initialOpenKeys),
  );

  const toggleSection = useCallback(
    (key: string) => {
      setOpenKeys(prev => {
        const next = new Set(allowMultiple ? prev : []);
        const isOpening = !prev.has(key);
        if (isOpening) {
          next.add(key);
        } else {
          next.delete(key);
        }
        onSectionToggle?.(key, isOpening);
        return next;
      });
    },
    [allowMultiple, onSectionToggle],
  );

  const inactiveColor = getVariantColor(theme, variant);
  const activeColor = getVariantColor(theme, activeVariant);

  return (
    <View style={[styles.container, style]}>
      {sections.map(section => (
        <AccordionSection
          key={section.key}
          section={section}
          isOpen={openKeys.has(section.key)}
          onToggle={() => toggleSection(section.key)}
          inactiveColor={inactiveColor}
          activeColor={activeColor}
        />
      ))}
    </View>
  );
}

function AccordionSection({
  section,
  isOpen,
  onToggle,
  inactiveColor,
  activeColor,
}: {
  section: DTAccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  inactiveColor: string;
  activeColor: string;
}) {
  const theme = useDTTheme();
  const heightAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const chevronAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [measured, setMeasured] = useState(false);
  const sectionColor = isOpen ? activeColor : inactiveColor;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(chevronAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen, heightAnim, chevronAnim]);

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
      {/* Header */}
      <Pressable
        onPress={onToggle}
        style={({pressed}) => [
          styles.header,
          {
            borderColor: sectionColor,
            borderTopColor: sectionColor,
            backgroundColor: theme.colors.background,
            opacity: pressed ? 0.7 : 1,
          },
        ]}>
        <Text style={[styles.title, {color: sectionColor}]}>
          {section.title}
        </Text>
        <Animated.View
          style={[
            styles.chevron,
            {transform: [{rotate: chevronRotate}]},
          ]}>
          <View
            style={[styles.chevronArrow, {borderTopColor: sectionColor}]}
          />
        </Animated.View>
      </Pressable>

      {/* Animated content */}
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            height: measured ? animatedHeight : undefined,
            overflow: 'hidden',
          },
        ]}>
        <View
          style={[styles.content, {backgroundColor: theme.colors.background}]}
          onLayout={e => {
            const h = e.nativeEvent.layout.height;
            if (h > 0 && !measured) {
              setContentHeight(h);
              setMeasured(true);
              if (!isOpen) {
                heightAnim.setValue(0);
              }
            }
          }}>
          {section.children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderTopWidth: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  contentWrapper: {},
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
