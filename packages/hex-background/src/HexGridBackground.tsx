/**
 * HexGridBackground — Full-viewport hex grid background
 *
 * Drop-in component that renders a fixed, semi-transparent 3D hexagon grid
 * behind page content. Automatically sizes grid to viewport and detects
 * automated browsers to skip rendering.
 */

import {useState, useEffect, useRef, Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {HexGrid} from './HexGrid';
import {HexCamera} from './HexCamera';

export interface HexGridBackgroundProps {
  /** Canvas opacity @default 0.5 */
  opacity?: number;
  /** Hexagon radius @default 0.5 */
  hexRadius?: number;
  /** Spacing between hexagons @default 0.05 */
  margin?: number;
  /** Maximum animation height @default 3 */
  maxHeight?: number;
  /** Height target refresh interval in ms @default 1500 */
  animationInterval?: number;
  /** Camera orbital speed @default 0.02 */
  cameraSpeed?: number;
  /** Camera orbital radius @default 8 */
  cameraRadius?: number;
  /** Camera field of view @default 40 */
  fov?: number;
}

function calculateGridDimensions(
  width: number,
  height: number,
  cameraDistance: number,
  fov: number,
  hexRadius: number,
  margin: number,
): {rows: number; cols: number} {
  const aspect = width / height;
  const fovRadians = (fov * Math.PI) / 180;
  const visibleHeight = 2 * cameraDistance * Math.tan(fovRadians / 2);
  const visibleWidth = visibleHeight * aspect;

  const hexWidth = hexRadius * 2;
  const horizontalStep = hexWidth * 0.75 + margin;
  const verticalStep = hexWidth * 0.866 + margin;

  const cols = Math.ceil((visibleWidth / horizontalStep) * 1.5);
  const rows = Math.ceil((visibleHeight / verticalStep) * 1.5);

  return {
    rows: Math.min(Math.max(rows, 15), 35),
    cols: Math.min(Math.max(cols, 15), 35),
  };
}

export function HexGridBackground({
  opacity = 0.5,
  hexRadius = 0.5,
  margin = 0.05,
  maxHeight = 3,
  animationInterval = 1500,
  cameraSpeed = 0.02,
  cameraRadius = 8,
  fov = 40,
}: HexGridBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [isAutomated, setIsAutomated] = useState(false);
  const [gridDimensions, setGridDimensions] = useState({rows: 20, cols: 20});
  const resizeTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setMounted(true);

    // Detect automated browsers (Selenium, Puppeteer, etc.)
    if (typeof navigator !== 'undefined' && (navigator as any).webdriver) {
      setIsAutomated(true);
      return;
    }

    const updateDimensions = () => {
      const dims = calculateGridDimensions(
        window.innerWidth,
        window.innerHeight,
        cameraRadius,
        fov,
        hexRadius,
        margin,
      );
      setGridDimensions(dims);
    };

    updateDimensions();

    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(updateDimensions, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout.current);
    };
  }, [cameraRadius, fov, hexRadius, margin]);

  if (!mounted || isAutomated) return null;

  return (
    <Canvas
      camera={{position: [5, 5, 5], fov, near: 0.5, far: 50}}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        opacity,
        margin: 0,
      }}>
      <HexCamera speed={cameraSpeed} radius={cameraRadius} />
      <ambientLight intensity={20} />
      <directionalLight position={[20, 40, 20]} intensity={1.5} />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />
      <Suspense fallback={null}>
        <HexGrid
          rows={gridDimensions.rows}
          cols={gridDimensions.cols}
          hexRadius={hexRadius}
          margin={margin}
          maxHeight={maxHeight}
          animationInterval={animationInterval}
        />
      </Suspense>
    </Canvas>
  );
}
