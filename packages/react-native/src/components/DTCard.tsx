/**
 * DT Card Component
 *
 * A themed card following the Dangerous Things design language
 * with SVG-based beveled corners matching the web storefront style.
 *
 * Web CSS reference:
 * - Bottom-right bevel: 2em (~32px)
 * - Bottom-left bevel: 1em (~16px)
 * - Border width: 0.2em (~3px)
 *
 * The progress bar is a structural element on the left edge (0 to bevelSizeSmall).
 * It is always present. At 0 progress it shows surface color (empty bar).
 * As progress increases, accent color fills from the bottom up.
 */

import {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle, StyleProp, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {useDTTheme} from '../theme/DTThemeProvider';
import {type DTVariant, getVariantColor} from '../utils/variantColors';
import {buildCardBevelPath} from '../utils/bevelPaths';
import {useComponentLayout} from '../utils/useComponentLayout';

interface DTCardProps {
  children: ReactNode;
  /**
   * Color mode for the card accent
   * @default 'normal'
   */
  mode?: DTVariant;
  /**
   * Custom border color (overrides mode)
   */
  borderColor?: string;
  /**
   * Card title (displayed in header)
   */
  title?: string;
  /**
   * Whether to show the accent header bar
   * @default true when title is provided
   */
  showHeader?: boolean;
  /**
   * Progress value (0–1) for left-edge vertical progress bar.
   * Always present. At 0 the bar shows surface color (empty).
   * @default 0
   */
  progress?: number;
  /**
   * Additional styles for the card container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the content area
   */
  contentStyle?: StyleProp<ViewStyle>;
  /**
   * Inner content padding
   * @default 16
   */
  padding?: number;
  /**
   * Border width in pixels
   * @default 3
   */
  borderWidth?: number;
  /**
   * Bottom-right bevel size in pixels
   * @default 32
   */
  bevelSize?: number;
  /**
   * Bottom-left bevel size in pixels (smaller accent bevel)
   * @default 16
   */
  bevelSizeSmall?: number;
  /**
   * Background color (defaults to theme background)
   */
  backgroundColor?: string;
  /**
   * Press handler
   */
  onPress?: () => void;
}

/**
 * Build inner card path with left edge at bevelSizeSmall (for progress bar zone).
 * 5-point polygon — no bottom-left bevel, straight vertical left edge.
 */
function buildInnerCardPath(
  w: number,
  h: number,
  bevelBR: number,
  bw: number,
  bevelSizeSmall: number,
): string {
  const right = w - bw;
  const top = bw;
  const bottom = h - bw;
  const br = Math.min(
    bevelBR - bw,
    (right - bevelSizeSmall) / 3,
    (bottom - top) / 3,
  );
  if (right <= bevelSizeSmall || bottom <= top) return '';
  return [
    `M ${bevelSizeSmall} ${top}`,
    `L ${right} ${top}`,
    `L ${right} ${bottom - br}`,
    `L ${right - br} ${bottom}`,
    `L ${bevelSizeSmall} ${bottom}`,
    'Z',
  ].join(' ');
}

/**
 * Build the full progress bar fill area path (inset 3px from frame on all sides).
 * This is the region where the surface/accent gradient fills.
 */
function buildProgressAreaPath(
  cardH: number,
  bw: number,
  bevelSizeSmall: number,
): string {
  const left = bw;
  const right = bevelSizeSmall - bw;
  const top = bw;
  const bevelStartY = cardH - bevelSizeSmall;
  const bottomRight = cardH - bw * 2; // y at bottom-right of fill area (on bevel diagonal)

  if (right <= left || bevelStartY <= top) return '';

  return [
    `M ${left} ${top}`,
    `L ${right} ${top}`,
    `L ${right} ${bottomRight}`,
    `L ${left} ${bevelStartY}`,
    'Z',
  ].join(' ');
}

/**
 * Build the accent-colored portion of the progress bar (fills from bottom).
 * Returns empty string when progress is 0.
 */
function buildProgressFillPath(
  cardH: number,
  bw: number,
  bevelSizeSmall: number,
  progress: number,
): string {
  const p = Math.max(0, Math.min(1, progress));
  if (p === 0) return '';

  const left = bw;
  const right = bevelSizeSmall - bw;
  const top = bw;
  const bevelStartY = cardH - bevelSizeSmall;
  const bottomRight = cardH - bw * 2;

  if (right <= left || bevelStartY <= top) return '';

  // Total fill area height (along the left edge, from top to bevelStartY)
  const areaH = bevelStartY - top;
  // How much of the area is filled from the bottom
  const fillTop = top + areaH * (1 - p);

  if (fillTop >= bevelStartY) {
    // Fill is entirely within the bevel zone
    // The bevel diagonal goes from (left, bevelStartY) to (right, bottomRight)
    // At y=fillTop, x on the diagonal: x = left + (fillTop - bevelStartY) * (right - left) / (bottomRight - bevelStartY)
    const bevelH = bottomRight - bevelStartY;
    if (bevelH <= 0) return '';
    const xAtFillTop = left + ((fillTop - bevelStartY) / bevelH) * (right - left);
    if (xAtFillTop >= right) return '';
    return [
      `M ${xAtFillTop} ${fillTop}`,
      `L ${right} ${fillTop}`,
      `L ${right} ${bottomRight}`,
      'Z',
    ].join(' ');
  }

  // Fill extends above the bevel zone — rectangle + bevel triangle
  return [
    `M ${left} ${fillTop}`,
    `L ${right} ${fillTop}`,
    `L ${right} ${bottomRight}`,
    `L ${left} ${bevelStartY}`,
    'Z',
  ].join(' ');
}

/**
 * DT-styled Card component with SVG beveled corners
 *
 * @example
 * <DTCard title="Detected Chip" mode="normal">
 *   <Text>NTAG215</Text>
 * </DTCard>
 *
 * @example
 * <DTCard mode="emphasis" onPress={handlePress}>
 *   <Text>Tap to scan</Text>
 * </DTCard>
 */
export function DTCard({
  children,
  mode = 'normal',
  borderColor,
  title,
  showHeader,
  progress = 0,
  style,
  contentStyle,
  padding = 16,
  borderWidth = 3,
  bevelSize = 32,
  bevelSizeSmall = 16,
  backgroundColor,
  onPress,
}: DTCardProps) {
  const theme = useDTTheme();
  const {dimensions, onLayout, hasDimensions} = useComponentLayout();
  const accentColor = getVariantColor(theme, mode, borderColor);
  const shouldShowHeader = showHeader ?? !!title;
  const bgColor = backgroundColor ?? theme.colors.background;

  const {width, height} = dimensions;
  const useBevels = theme.custom.bevelMd > 0;

  // Outer bevel path (full card shape)
  const outerPath = useBevels && hasDimensions
    ? buildCardBevelPath(width, height, bevelSize, bevelSizeSmall, 0)
    : '';
  // Inner bevel path — left edge at bevelSizeSmall (progress bar zone)
  const innerPath = useBevels && hasDimensions
    ? buildInnerCardPath(width, height, bevelSize, borderWidth, bevelSizeSmall)
    : '';

  // Progress bar paths — computed once, reused in progress SVG and frame overlay
  const progressAreaPath = useBevels && hasDimensions
    ? buildProgressAreaPath(height, borderWidth, bevelSizeSmall)
    : '';
  const progressFillPath = useBevels && hasDimensions && progress > 0
    ? buildProgressFillPath(height, borderWidth, bevelSizeSmall, progress)
    : '';
  // Frame overlay: outer + inner + progressArea hole (evenodd punches window for progress bar)
  const framePath = useBevels && hasDimensions
    ? outerPath + ' ' + innerPath + (progressAreaPath ? ' ' + progressAreaPath : '')
    : '';

  const content = (
    <View
      style={[
        styles.container,
        !useBevels && {
          borderWidth,
          borderColor: accentColor,
          borderRadius: theme.custom.radius,
          backgroundColor: bgColor,
          overflow: 'hidden',
        },
        style,
      ]}
      onLayout={onLayout}>
      {/* Background fill (behind content) — beveled mode only */}
      {useBevels && hasDimensions && (
        <Svg
          style={StyleSheet.absoluteFill}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}>
          <Path d={innerPath} fill={bgColor} />
        </Svg>
      )}
      {/* Progress bar fill area — beveled mode */}
      {useBevels && hasDimensions && (
        <Svg
          style={[StyleSheet.absoluteFill, {zIndex: 1}]}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          pointerEvents="none">
          {/* Accent base — visible through the semi-transparent surface above.
               Matches web where ::after sits over the accent-colored card bg. */}
          <Path d={progressAreaPath} fill={accentColor} />
          {/* Surface fill over accent base — 0.6 opacity lets accent bleed through.
               Matches web --dt-progress-empty-opacity default. */}
          <Path
            d={progressAreaPath}
            fill={bgColor}
            opacity={0.6}
          />
          {/* Accent fill from bottom (progressed portion) */}
          {progressFillPath !== '' && (
            <Path
              d={progressFillPath}
              fill={accentColor}
            />
          )}
        </Svg>
      )}
      {/* Progress bar — non-beveled (classic) mode */}
      {!useBevels && (
        <View style={[styles.progressBar, {
          width: bevelSizeSmall,
          left: borderWidth,
          top: borderWidth,
          bottom: borderWidth,
          borderBottomLeftRadius: theme.custom.radius > 0 ? Math.max(0, theme.custom.radius - borderWidth) : 0,
        }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: accentColor,
                height: `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%`,
              },
            ]}
          />
        </View>
      )}
      <View style={[styles.innerContainer, useBevels && {paddingLeft: bevelSizeSmall - borderWidth}]}>
        {shouldShowHeader && (
          <View style={[styles.header, {backgroundColor: accentColor}]}>
            {title && (
              <Text
                variant="titleMedium"
                style={[styles.headerText, {color: theme.colors.onPrimary}]}>
                {title}
              </Text>
            )}
          </View>
        )}
        <View style={[styles.content, {padding}, contentStyle]}>{children}</View>
      </View>
      {/* Frame overlay (above content) — beveled mode only.
           Uses evenodd with 3 sub-paths: outer + inner + progressArea.
           The progress area path punches a hole in the frame so the
           progress bar SVG underneath (zIndex:1) shows through. */}
      {useBevels && hasDimensions && (
        <Svg
          style={[StyleSheet.absoluteFill, styles.frameOverlay]}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          pointerEvents="none">
          <Path
            d={framePath}
            fillRule="evenodd"
            fill={accentColor}
          />
        </Svg>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => ({opacity: pressed ? 0.8 : 1})}>
        {content}
      </Pressable>
    );
  }

  return content;
}

/**
 * DT design system constants matching web CSS variables
 */
export const DTCardClipPath = {
  // CSS-style clip path (for web reference)
  css: `polygon(
    0% 0%,
    100% 0%,
    100% calc(100% - 2em),
    calc(100% - 2em) 100%,
    1em 100%,
    0% calc(100% - 1em)
  )`,
  // Default bevel sizes in pixels (matching 2em and 1em at 16px base)
  bevelSize: 32,
  bevelSizeSmall: 16,
  borderWidth: 3,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  innerContainer: {
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  },
  header: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {},
  frameOverlay: {
    zIndex: 2,
  },
  progressBar: {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 3,
    justifyContent: 'flex-end' as const,
    overflow: 'hidden' as const,
  },
  progressFill: {
    width: '100%' as const,
  },
});
