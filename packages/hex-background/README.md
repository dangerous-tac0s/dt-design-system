# @dangerousthings/hex-background

3D hexagon grid background for the Dangerous Things design system. Renders an animated, instanced WebGL hex grid using Three.js and React Three Fiber. Hexagons animate to random heights on a loop, with a slowly orbiting camera.

## Install

```bash
npm install @dangerousthings/hex-background
```

### Peer Dependencies

```bash
npm install react @react-three/fiber three
```

For React Native, also install `expo-gl`.

## Web Usage

Drop-in full-viewport background that renders behind page content:

```tsx
import { HexGridBackground } from "@dangerousthings/hex-background";

function App() {
  return (
    <>
      <HexGridBackground />
      <main>{/* your content */}</main>
    </>
  );
}
```

The component renders a fixed-position Canvas at `z-index: -1` with `pointer-events: none`, so it sits behind all other content. It automatically sizes the grid to the viewport and skips rendering in automated browsers (Selenium, Puppeteer).

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `opacity` | `number` | `0.5` | Canvas opacity |
| `hexRadius` | `number` | `0.5` | Hexagon radius |
| `margin` | `number` | `0.05` | Spacing between hexagons |
| `maxHeight` | `number` | `3` | Maximum animation height |
| `animationInterval` | `number` | `1500` | Height target refresh interval in ms |
| `cameraSpeed` | `number` | `0.02` | Camera orbital speed |
| `cameraRadius` | `number` | `8` | Camera orbital radius |
| `fov` | `number` | `40` | Camera field of view |

## React Native Usage

The full-viewport `HexGridBackground` wrapper uses web-specific APIs. For React Native, use the lower-level `HexGrid` and `HexCamera` components directly within a native Canvas:

```tsx
import { Canvas } from "@react-three/fiber/native";
import { HexGrid, HexCamera } from "@dangerousthings/hex-background/native";

function Background() {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 40 }}>
      <HexCamera />
      <ambientLight intensity={20} />
      <directionalLight position={[20, 40, 20]} intensity={1.5} />
      <HexGrid rows={20} cols={20} />
    </Canvas>
  );
}
```

## Exports

| Path | Description |
|------|-------------|
| `@dangerousthings/hex-background` | `HexGridBackground`, `HexGrid`, `HexCamera` (web) |
| `@dangerousthings/hex-background/native` | `HexGrid`, `HexCamera` (React Native) |

## Monorepo

Part of the [DT Design System](https://github.com/dangerous-tac0s/dt-design-system) monorepo.

## License

[MIT](LICENSE)
