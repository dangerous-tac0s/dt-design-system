/**
 * HexCamera — Orbiting camera for hexagon grid
 *
 * Continuously rotates around the grid center at a fixed radius and height.
 */

import {useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';

export interface HexCameraProps {
  /** Orbital rotation speed in radians per second @default 0.02 */
  speed?: number;
  /** Orbital distance from center @default 8 */
  radius?: number;
  /** Camera Y height @default 5 */
  height?: number;
}

export function HexCamera({
  speed = 0.02,
  radius = 8,
  height = 5,
}: HexCameraProps) {
  const angleRef = useRef(0);
  const {camera} = useThree();

  useFrame((_state, delta) => {
    angleRef.current = (angleRef.current + speed * delta) % (Math.PI * 2);
    const x = Math.cos(angleRef.current) * radius;
    const z = Math.sin(angleRef.current) * radius;
    camera.position.set(x, height, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
