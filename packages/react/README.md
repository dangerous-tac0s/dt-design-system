# @dangerousthings/react

React web components for the Dangerous Things design system — 20 themed components wrapping `@dangerousthings/web` CSS with React APIs matching `@dangerousthings/react-native` for cross-platform parity.

## Install

```bash
npm install @dangerousthings/react
```

### Peer Dependencies

```bash
npm install react react-dom @dangerousthings/tokens @dangerousthings/web
```

## Setup

Wrap your app with `DTWebThemeProvider` and import the web CSS bundle:

```tsx
import "@dangerousthings/web";
import { DTWebThemeProvider } from "@dangerousthings/react";

export default function App() {
  return (
    <DTWebThemeProvider brand="dt" theme="dark">
      {/* your app */}
    </DTWebThemeProvider>
  );
}
```

The provider sets `data-brand` and `data-theme` attributes on a wrapper div and exposes brand/theme via React context.

## Components

### Bevel & Layout

| Component | Description |
|-----------|-------------|
| `DTCard` | Beveled card with header, progress bar, and mode colors |
| `DTButton` | Beveled button with variant colors |
| `DTLabel` | Top-right beveled label with status colors |
| `DTChip` | Compact labeled element |
| `DTMediaFrame` | Diagonal beveled frame for images |
| `DTModal` | Modal dialog with beveled corners |
| `DTDrawer` | Side drawer with edge bevels |
| `DTHexagon` | Decorative hexagon SVG shape |

### Forms

| Component | Description |
|-----------|-------------|
| `DTTextInput` | Sharp-cornered input with focus glow |
| `DTCheckbox` | Beveled checkbox with opposing corner cuts |
| `DTSwitch` | Angular toggle switch |
| `DTRadioGroup` | Hexagonal radio buttons |
| `DTQuantityStepper` | Beveled +/- increment buttons |
| `DTSearchInput` | Search-styled text input |

### Layout & Animation

| Component | Description |
|-----------|-------------|
| `DTProgressBar` | Angular progress bar with optional label |
| `DTAccordion` | Collapsible sections with accent border |
| `DTStaggerContainer` | Staggered scale-in entrance animation for children |
| `DTBadgeOverlay` | Absolute-positioned badge wrapper |

### Filter & Feature

| Component | Description |
|-----------|-------------|
| `DTMenu` | Dropdown menu with item variants |
| `DTFeatureLegend` | Product feature grid with icons and rotated labels |
| `DTMobileFilterOverlay` | Full-screen slide-up filter overlay with backdrop |
| `DTGallery` | Image gallery |

### Animation Hooks

| Hook | Description |
|------|-------------|
| `useScaleIn` | Scale 0 to 1 entrance animation |
| `usePulse` | Looping opacity pulse animation |

## Usage Examples

```tsx
import { DTButton, DTCard, DTTextInput } from "@dangerousthings/react";

// Button with variant
<DTButton variant="normal" onClick={handleClick}>
  Scan NFC
</DTButton>

// Card with title and progress bar
<DTCard title="PRODUCT" variant="emphasis" progress={60}>
  <p>60% progress</p>
</DTCard>

// Text input
<DTTextInput variant="normal" label="Username" />
```

## Theme Utilities

```tsx
import { useDTWebTheme } from "@dangerousthings/react";

const { brand, theme } = useDTWebTheme();
// brand: "dt" | "classic"
// theme: "dark" | "light"
```

## Variant Utilities

```tsx
import { getVariantClass, variantToClassName } from "@dangerousthings/react";

getVariantClass("emphasis"); // mode class name for CSS
variantToClassName("warning"); // token-level variant mapping
```

## Monorepo

Part of the [DT Design System](https://github.com/nicholasgriffintn/dt-design-system) monorepo.

## License

[MIT](LICENSE)
