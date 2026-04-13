# @dangerousthings/hex-background

## 0.2.1

### Fixed
- Animation no longer degrades to noise over time — replaced frame-rate-dependent lerp with duration-based smoothstep easing

### Added
- `animationDuration` prop (default 1200ms) controls how long each hexagon takes to reach its target height

## 0.2.0

### Minor Changes

- e74c285: New package: 3D hexagon grid background using Three.js + React Three Fiber. Includes HexGridBackground (full-viewport web component), HexGrid (instanced mesh with animated heights), and HexCamera (orbiting camera). Supports both web and React Native via separate entry points.
