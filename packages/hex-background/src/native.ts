/**
 * React Native entry point for @dangerousthings/hex-background
 *
 * Uses @react-three/fiber/native renderer with expo-gl.
 * Consumers must install: expo-gl, @react-three/fiber, three
 *
 * Note: The HexGridBackground component uses web-specific APIs (window, CSS units).
 * For React Native, use HexGrid and HexCamera directly within a native Canvas:
 *
 *   import { Canvas } from '@react-three/fiber/native';
 *   import { HexGrid, HexCamera } from '@dangerousthings/hex-background/native';
 *
 *   <Canvas camera={{ position: [5, 5, 5], fov: 40 }}>
 *     <HexCamera />
 *     <ambientLight intensity={20} />
 *     <directionalLight position={[20, 40, 20]} intensity={1.5} />
 *     <HexGrid rows={20} cols={20} />
 *   </Canvas>
 */

export { HexGrid } from './HexGrid';
export type { HexGridProps } from './HexGrid';

export { HexCamera } from './HexCamera';
export type { HexCameraProps } from './HexCamera';
