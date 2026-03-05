/**
 * HexGrid — Core 3D hexagon grid renderer
 *
 * Renders an instanced mesh of animated hexagonal columns using Three.js.
 * Source: dt-shopify-storefront HexagonGrid.tsx
 */

import {useRef, useMemo, useEffect} from 'react';
import {useFrame} from '@react-three/fiber';
import {
  InstancedMesh,
  Object3D,
  Shape,
  ExtrudeGeometry,
  MeshStandardMaterial,
  MathUtils,
} from 'three';

export interface HexGridProps {
  rows: number;
  cols: number;
  /** Hexagon radius in world units @default 0.5 */
  hexRadius?: number;
  /** Extrude depth of hex geometry @default 1 */
  extrudeHeight?: number;
  /** Spacing between hexagons @default 0.05 */
  margin?: number;
  /** Maximum random height for animation @default 3 */
  maxHeight?: number;
  /** Interval (ms) between height target changes @default 1500 */
  animationInterval?: number;
}

function computeHexPositions(
  rows: number,
  cols: number,
  hexWidth: number,
  hexHeight: number,
  margin: number,
) {
  const positions: {x: number; z: number}[] = [];
  const horizontalStep = hexWidth * 0.75 + margin;
  const verticalStep = hexHeight * 0.866 + margin;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * horizontalStep;
      const z = row * verticalStep + (col % 2 ? verticalStep / 2 : 0);
      const centerX = ((cols - 1) * horizontalStep) / 2;
      const centerZ = ((rows - 1) * verticalStep) / 2;
      positions.push({x: x - centerX, z: z - centerZ});
    }
  }
  return positions;
}

export function HexGrid({
  rows,
  cols,
  hexRadius = 0.5,
  extrudeHeight = 1,
  margin = 0.05,
  maxHeight = 3,
  animationInterval = 1500,
}: HexGridProps) {
  const meshRef = useRef<InstancedMesh>(null);

  const positions = useMemo(
    () => computeHexPositions(rows, cols, hexRadius * 2, extrudeHeight, margin),
    [rows, cols, hexRadius, extrudeHeight, margin],
  );

  const targetHeightsRef = useRef(
    positions.map(() => 1 + Math.random() * maxHeight),
  );
  const currentHeightsRef = useRef(
    positions.map(() => 1 + Math.random() * maxHeight),
  );

  // Reuse dummy object for matrix updates — 15-20% FPS improvement
  const dummyRef = useRef(new Object3D());

  const hexGeometry = useMemo(() => {
    const shape = new Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = hexRadius * Math.cos(angle);
      const z = hexRadius * Math.sin(angle);
      i === 0 ? shape.moveTo(x, z) : shape.lineTo(x, z);
    }
    shape.closePath();
    const geometry = new ExtrudeGeometry(shape, {
      depth: 1,
      bevelEnabled: false,
    });
    geometry.rotateX(Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }, [hexRadius]);

  // Regenerate target heights at interval
  useEffect(() => {
    const interval = setInterval(() => {
      targetHeightsRef.current = positions.map(
        () => 0.5 + Math.random() * maxHeight,
      );
    }, animationInterval);
    return () => clearInterval(interval);
  }, [positions, maxHeight, animationInterval]);

  // Animate per frame: lerp current heights toward targets
  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const dummy = dummyRef.current;

    positions.forEach(({x, z}, i) => {
      currentHeightsRef.current[i] = MathUtils.lerp(
        currentHeightsRef.current[i],
        targetHeightsRef.current[i],
        delta * 0.5,
      );
      const height = currentHeightsRef.current[i];

      dummy.position.set(x, height / 2, z);
      dummy.scale.set(1, height, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        hexGeometry,
        new MeshStandardMaterial({
          color: 'black',
          metalness: 0.3,
          roughness: 0.7,
        }),
        positions.length,
      ]}
    />
  );
}
