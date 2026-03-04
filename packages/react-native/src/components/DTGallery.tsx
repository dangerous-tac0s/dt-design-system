/**
 * DT Gallery Component
 *
 * Custom-built image gallery with thumbnail navigation following
 * the Dangerous Things design language. No RNP equivalent.
 *
 * Uses the dual-SVG-path technique for the main image frame,
 * consistent with DTCard/DTMediaFrame.
 *
 * Web CSS reference (CyberGallery):
 * - Horizontal thumbnail strip with arrow navigation
 * - Active thumbnail with glow effect (box-shadow: 0 0 8px)
 * - Beveled arrow buttons
 * - Main image in beveled media frame
 */

import {useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  Pressable,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildButtonBevelPath, buildMediaFrameBevelPath} from '../utils/bevelPaths';
import {useComponentLayout} from '../utils/useComponentLayout';

export interface DTGalleryItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Image URI
   */
  uri: string;
  /**
   * Accessibility label
   */
  alt?: string;
}

interface DTGalleryProps {
  /**
   * Gallery items
   */
  items: DTGalleryItem[];
  /**
   * Currently active item index
   */
  activeIndex: number;
  /**
   * Called when an item is selected
   */
  onSelect: (index: number) => void;
  /**
   * Visual variant
   * @default 'normal'
   */
  variant?: DTVariant;
  /**
   * Thumbnail size in pixels
   * @default 64
   */
  thumbnailSize?: number;
  /**
   * Bevel size for the main image frame
   * @default 24
   */
  bevelSize?: number;
  /**
   * Border width for the main image frame
   * @default 3
   */
  borderWidth?: number;
  /**
   * Additional styles
   */
  style?: StyleProp<ViewStyle>;
}

const ARROW_SIZE = 32;
const ARROW_BEVEL = 4;
const ARROW_BORDER = 2;

/**
 * DT-styled Gallery with thumbnail strip and arrow navigation
 *
 * @example
 * <DTGallery
 *   items={images}
 *   activeIndex={activeIdx}
 *   onSelect={setActiveIdx}
 *   variant="normal"
 * />
 */
export function DTGallery({
  items,
  activeIndex,
  onSelect,
  variant = 'normal',
  thumbnailSize = 64,
  bevelSize = 24,
  borderWidth = 3,
  style,
}: DTGalleryProps) {
  const theme = useDTTheme();
  const flatListRef = useRef<FlatList>(null);
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const accentColor = getVariantColor(theme, variant);
  const atStart = activeIndex <= 0;
  const atEnd = activeIndex >= items.length - 1;

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      onSelect(activeIndex - 1);
    }
  }, [activeIndex, onSelect]);

  const handleNext = useCallback(() => {
    if (activeIndex < items.length - 1) {
      onSelect(activeIndex + 1);
    }
  }, [activeIndex, items.length, onSelect]);

  const scrollToActive = useCallback(
    (index: number) => {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    },
    [],
  );

  const handleSelect = useCallback(
    (index: number) => {
      onSelect(index);
      scrollToActive(index);
    },
    [onSelect, scrollToActive],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: thumbnailSize + 8,
      offset: (thumbnailSize + 8) * index,
      index,
    }),
    [thumbnailSize],
  );

  const renderArrow = (direction: 'left' | 'right', onPress: () => void, isDisabled: boolean) => {
    const center = ARROW_SIZE / 2;
    const arrowSize = ARROW_SIZE * 0.2;
    const iconPath =
      direction === 'left'
        ? `M ${center + arrowSize} ${center - arrowSize} L ${center - arrowSize} ${center} L ${center + arrowSize} ${center + arrowSize}`
        : `M ${center - arrowSize} ${center - arrowSize} L ${center + arrowSize} ${center} L ${center - arrowSize} ${center + arrowSize}`;

    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={({pressed}) => ({
          opacity: isDisabled ? 0.3 : pressed ? 0.7 : 1,
        })}>
        {useBevels ? (
          <Svg width={ARROW_SIZE} height={ARROW_SIZE} viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`}>
            <Path
              d={buildButtonBevelPath(ARROW_SIZE, ARROW_SIZE, ARROW_BEVEL, ARROW_BORDER)}
              fill="transparent"
              stroke={accentColor}
              strokeWidth={ARROW_BORDER}
            />
            <Path
              d={iconPath}
              fill="none"
              stroke={accentColor}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        ) : (
          <View style={{
            width: ARROW_SIZE,
            height: ARROW_SIZE,
            borderWidth: ARROW_BORDER,
            borderColor: accentColor,
            borderRadius: theme.custom.radiusSm,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Svg width={ARROW_SIZE * 0.6} height={ARROW_SIZE * 0.6} viewBox={`${ARROW_SIZE * 0.2} ${ARROW_SIZE * 0.2} ${ARROW_SIZE * 0.6} ${ARROW_SIZE * 0.6}`}>
              <Path
                d={iconPath}
                fill="none"
                stroke={accentColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        )}
      </Pressable>
    );
  };

  const renderThumbnail = ({item, index}: {item: DTGalleryItem; index: number}) => {
    const isActive = index === activeIndex;
    return (
      <Pressable
        onPress={() => handleSelect(index)}
        style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
        <View
          style={[
            styles.thumbnail,
            {
              width: thumbnailSize,
              height: thumbnailSize,
              borderColor: isActive ? accentColor : 'transparent',
              borderRadius: useBevels ? 0 : theme.custom.radiusSm,
            },
            isActive && styles.thumbnailActive,
          ]}>
          {/* Android glow: colored border overlay since elevation is gray-only */}
          {isActive && Platform.OS === 'android' && (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  borderWidth: 3,
                  borderColor: accentColor,
                  opacity: 0.5,
                  margin: -3,
                },
              ]}
            />
          )}
          <Image
            source={{uri: item.uri}}
            style={styles.thumbnailImage}
            accessibilityLabel={item.alt}
            resizeMode="cover"
          />
        </View>
      </Pressable>
    );
  };

  if (items.length === 0) return null;

  const {width, height} = dimensions;
  const useBevels = theme.custom.bevelMd > 0;

  // Outer and inner bevel paths for frame overlay
  const outerPath = useBevels && hasDimensions
    ? buildMediaFrameBevelPath(width, height, bevelSize)
    : '';
  const innerPath = useBevels && hasDimensions
    ? buildMediaFrameBevelPath(width, height, bevelSize - borderWidth, borderWidth)
    : '';

  return (
    <View style={[styles.container, style]}>
      {/* Main image with beveled frame */}
      <View
        style={[
          styles.mainImageContainer,
          !useBevels && {
            borderWidth,
            borderColor: accentColor,
            borderRadius: theme.custom.radius,
            overflow: 'hidden',
          },
        ]}
        onLayout={onLayout}>
        {/* Background fill — beveled mode only */}
        {useBevels && hasDimensions && (
          <Svg
            style={StyleSheet.absoluteFill}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}>
            <Path d={innerPath} fill={theme.colors.surfaceVariant} />
          </Svg>
        )}
        <View style={[styles.mainImageContent, {padding: useBevels ? borderWidth : 0}]}>
          <Image
            source={{uri: items[activeIndex]?.uri}}
            style={styles.mainImage}
            accessibilityLabel={items[activeIndex]?.alt}
            resizeMode="contain"
          />
        </View>
        {/* Frame overlay — beveled mode only */}
        {useBevels && hasDimensions && (
          <Svg
            style={[StyleSheet.absoluteFill, styles.frameOverlay]}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            pointerEvents="none">
            <Path
              d={`M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z ` + outerPath}
              fillRule="evenodd"
              fill={theme.colors.background}
            />
            <Path
              d={outerPath + ' ' + innerPath}
              fillRule="evenodd"
              fill={accentColor}
            />
          </Svg>
        )}
      </View>

      {/* Thumbnail strip with arrows */}
      {items.length > 1 && (
        <View style={styles.thumbnailStrip}>
          {renderArrow('left', handlePrev, atStart)}
          <FlatList
            ref={flatListRef}
            data={items}
            renderItem={renderThumbnail}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            getItemLayout={getItemLayout}
            contentContainerStyle={styles.thumbnailList}
            style={styles.thumbnailFlatList}
            initialNumToRender={8}
            maxToRenderPerBatch={4}
            windowSize={5}
            removeClippedSubviews={Platform.OS === 'android'}
          />
          {renderArrow('right', handleNext, atEnd)}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  mainImageContainer: {
    aspectRatio: 1,
    position: 'relative',
  },
  mainImageContent: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    overflow: 'hidden',
  },
  mainImage: {
    flex: 1,
  },
  thumbnailStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  thumbnailFlatList: {
    flex: 1,
  },
  thumbnailList: {
    gap: 8,
  },
  thumbnail: {
    borderWidth: 2,
    overflow: 'hidden',
  },
  thumbnailActive: {
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 8,
      },
    }),
  },
  thumbnailImage: {
    flex: 1,
  },
  frameOverlay: {
    zIndex: 2,
  },
});
