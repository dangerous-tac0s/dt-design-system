# @dangerousthings/react-native

React Native components for the Dangerous Things design system — 22 themed components built on React Native Paper with cyberpunk beveled aesthetics.

## Install

```bash
npm install @dangerousthings/react-native
```

### Peer Dependencies

```bash
npm install react-native-paper react-native-safe-area-context react-native-svg
```

Optional for custom fonts:

```bash
npx expo install expo-font
```

## Setup

Wrap your app with `DTThemeProvider`:

```tsx
import { DTThemeProvider } from "@dangerousthings/react-native";

export default function App() {
  return (
    <DTThemeProvider>
      {/* your app */}
    </DTThemeProvider>
  );
}
```

Options:

```tsx
<DTThemeProvider
  includeSafeArea={true}  // wraps in SafeAreaProvider (default: true)
/>
```

## Components

### Basic

| Component | Description |
|-----------|-------------|
| `DTButton` | Beveled button with variant colors (normal, emphasis, warning, success, other) |
| `DTCard` | Beveled card with optional header and title |
| `DTChip` | Compact labeled element (MD3 chip style) |
| `DTLabel` | Top-right beveled label with status colors |

### Forms

| Component | Description |
|-----------|-------------|
| `DTTextInput` | Sharp-cornered input with focus glow |
| `DTCheckbox` | Beveled checkbox with opposing corner cuts |
| `DTSwitch` | Angular toggle switch |
| `DTRadioGroup` | Hexagonal radio buttons |
| `DTQuantityStepper` | Beveled +/- increment buttons |
| `DTSearchInput` | Search-styled text input |

### Layout & Display

| Component | Description |
|-----------|-------------|
| `DTProgressBar` | Angular progress bar with optional label |
| `DTMediaFrame` | Diagonal beveled frame for images |
| `DTAccordion` | Collapsible sections with accent border |
| `DTHexagon` | Decorative hexagon SVG shape |
| `DTBadgeOverlay` | Absolute-positioned badge wrapper (top-left, top-right, bottom-left, bottom-right) |
| `DTStaggerContainer` | Staggered scale-in entrance animation for child elements |
| `DTFeatureLegend` | Product feature grid with icons and rotated labels |

### Interactive

| Component | Description |
|-----------|-------------|
| `DTModal` | Modal dialog with beveled corners |
| `DTDrawer` | Side drawer with edge bevels |
| `DTGallery` | Image gallery |
| `DTMenu` | Dropdown menu with item variants |
| `DTMobileFilterOverlay` | Full-screen slide-up filter overlay with backdrop |

### Animation Hooks

| Hook | Description |
|------|-------------|
| `useScaleIn` | Scale 0→1 entrance animation |
| `usePulse` | Looping opacity pulse animation |

## Usage Examples

```tsx
import { DTButton, DTCard, DTTextInput } from "@dangerousthings/react-native";

// Button with variant
<DTButton variant="normal" onPress={handlePress}>
  Scan NFC
</DTButton>

// Card with title
<DTCard title="Scan Results" mode="normal">
  <Text>Chip detected</Text>
</DTCard>

// Card with selected state and progress bar
<DTCard title="PRODUCT" mode="emphasis" selected progress={0.6}>
  <Text>Selected with 60% progress</Text>
</DTCard>

// Text input with error state
<DTTextInput
  variant="normal"
  label="Username"
  error={true}
  errorMessage="Required"
/>
```

## Theme Utilities

```tsx
import { useDTTheme, getColor, getVariantColor } from "@dangerousthings/react-native";

// Access the full theme in a component
const theme = useDTTheme();
theme.colors.primary; // "#00FFFF"

// Get a color with optional opacity
getColor("modeNormal", 0.5); // "rgba(0, 255, 255, 0.5)"

// Resolve a variant name to its color
getVariantColor("emphasis"); // "#FFFF00"
```

## Bevel Utilities

Build SVG paths for custom beveled shapes:

```tsx
import {
  buildBeveledRectPath,
  buildButtonBevelPath,
  buildCardBevelPath,
} from "@dangerousthings/react-native";

// Custom bevel
const path = buildBeveledRectPath(200, 48, { bottomRight: 12 });

// Preset bevel paths
const buttonPath = buildButtonBevelPath(200, 48);
const cardPath = buildCardBevelPath(300, 200);
```

## Re-exported Paper Components

For convenience, these React Native Paper components are re-exported:

`Text`, `Surface`, `IconButton`, `ActivityIndicator`, `Divider`, `List`, `Portal`, `Modal`, `Snackbar`, `TextInput`

## License

[MIT](LICENSE)
