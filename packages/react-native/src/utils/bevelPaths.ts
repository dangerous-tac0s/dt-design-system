/**
 * Shared SVG bevel path builders
 *
 * Generic and preset functions for generating SVG path data
 * for beveled rectangle shapes used across DT components.
 */

type BevelCorner = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';

interface BevelConfig {
  corners: Partial<Record<BevelCorner, number>>;
  strokeWidth?: number;
  /** Additional inset applied to all coordinates (used for frame overlays) */
  offset?: number;
}

/**
 * Build an SVG path for a rectangle with any combination of beveled corners.
 *
 * Each corner can have an independent bevel size. Corners without a bevel
 * value (or with 0) are rendered as sharp 90-degree angles.
 */
export function buildBeveledRectPath(
  width: number,
  height: number,
  config: BevelConfig,
): string {
  const sw = config.strokeWidth ?? 0;
  const off = config.offset ?? 0;
  const inset = sw / 2 + off;
  const w = width - sw - off * 2;
  const h = height - sw - off * 2;

  if (w <= 0 || h <= 0) return '';

  const maxBevel = Math.min(w / 3, h / 3);
  const tl = Math.min(config.corners.topLeft ?? 0, maxBevel);
  const tr = Math.min(config.corners.topRight ?? 0, maxBevel);
  const br = Math.min(config.corners.bottomRight ?? 0, maxBevel);
  const bl = Math.min(config.corners.bottomLeft ?? 0, maxBevel);

  // Build path clockwise from top-left
  return [
    // Top-left corner
    `M ${inset + tl} ${inset}`,
    // Top edge → top-right corner
    `L ${w + inset - tr} ${inset}`,
    tr > 0 ? `L ${w + inset} ${inset + tr}` : `L ${w + inset} ${inset}`,
    // Right edge → bottom-right corner
    br > 0
      ? `L ${w + inset} ${h + inset - br} L ${w + inset - br} ${h + inset}`
      : `L ${w + inset} ${h + inset}`,
    // Bottom edge → bottom-left corner
    bl > 0
      ? `L ${inset + bl} ${h + inset} L ${inset} ${h + inset - bl}`
      : `L ${inset} ${h + inset}`,
    // Left edge → back to top-left
    tl > 0 ? `L ${inset} ${inset + tl}` : `L ${inset} ${inset}`,
    'Z',
  ].join(' ');
}

/**
 * DTButton shape: bottom-right bevel only
 */
export function buildButtonBevelPath(
  width: number,
  height: number,
  bevelSize: number,
  strokeWidth: number,
): string {
  return buildBeveledRectPath(width, height, {
    corners: {bottomRight: bevelSize},
    strokeWidth,
  });
}

/**
 * DTCard shape: bottom-right (large) + bottom-left (small) bevels
 */
export function buildCardBevelPath(
  width: number,
  height: number,
  bevelBR: number,
  bevelBL: number,
  inset: number,
): string {
  const w = width - inset * 2;
  const h = height - inset * 2;

  if (w <= 0 || h <= 0) return '';

  const br = Math.min(bevelBR, w / 3, h / 3);
  const bl = Math.min(bevelBL, w / 3, h / 3);

  return `
    M ${inset} ${inset}
    L ${w + inset} ${inset}
    L ${w + inset} ${h - br + inset}
    L ${w - br + inset} ${h + inset}
    L ${bl + inset} ${h + inset}
    L ${inset} ${h - bl + inset}
    Z
  `;
}

/**
 * DTLabel shape: top-right bevel only
 */
export function buildLabelBevelPath(
  width: number,
  height: number,
  bevelSize: number,
): string {
  return buildBeveledRectPath(width, height, {
    corners: {topRight: bevelSize},
  });
}

/**
 * DTMediaFrame shape: top-left + bottom-right (diagonal symmetry)
 */
export function buildMediaFrameBevelPath(
  width: number,
  height: number,
  bevelSize: number,
  offset = 0,
): string {
  return buildBeveledRectPath(width, height, {
    corners: {topLeft: bevelSize, bottomRight: bevelSize},
    offset,
  });
}

/**
 * DTDrawer shape (right-side): top-left + bottom-left bevels
 */
export function buildDrawerBevelPath(
  width: number,
  height: number,
  bevelSize: number,
  position: 'left' | 'right' = 'right',
): string {
  if (position === 'right') {
    return buildBeveledRectPath(width, height, {
      corners: {topLeft: bevelSize, bottomLeft: bevelSize},
    });
  }
  return buildBeveledRectPath(width, height, {
    corners: {topRight: bevelSize, bottomRight: bevelSize},
  });
}
