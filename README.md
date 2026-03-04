# DT Design System

Shared design tokens, web CSS, and React Native components for the Dangerous Things product family.

## Packages

| Package | Description |
|---------|-------------|
| [`@dangerousthings/tokens`](packages/tokens) | Canonical design tokens (colors, typography, shape) defined in TypeScript and exported as CSS custom properties |
| [`@dangerousthings/web`](packages/web) | Web CSS themes — bevels, glows, elevation, and form styles |
| [`@dangerousthings/react-native`](packages/react-native) | React Native components built on React Native Paper |

## Brand Themes

Three brand themes ship out of the box:

- **DT** — neon cyberpunk aesthetic with beveled corners and glow effects (Tektur font)
- **Classic** — dark navy palette with magenta accents and standard border radius
- **Supra** — Material Design 3–inspired with blue accent and rounded corners

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 10

### Install & Build

```bash
npm install
npm run build        # builds all packages via Turbo
```

### Per-Package Builds

```bash
npm run build:tokens
npm run build:web
npm run build:react-native
```

## Usage

### Web (CSS)

```css
@import "@dangerousthings/web";                     /* base index */
@import "@dangerousthings/web/tokens/dt.css";       /* DT brand tokens */
@import "@dangerousthings/web/components/bevels.css";
```

### React Native

```tsx
import { DTThemeProvider } from "@dangerousthings/react-native";
import { DTButton, DTCard } from "@dangerousthings/react-native";

export default function App() {
  return (
    <DTThemeProvider brand="dt">
      <DTCard>
        <DTButton mode="contained" onPress={() => {}}>
          Press Me
        </DTButton>
      </DTCard>
    </DTThemeProvider>
  );
}
```

### Tokens (JavaScript/TypeScript)

```ts
import { dt } from "@dangerousthings/tokens/brands/dt";
console.log(dt.color.brand.primary); // "#00ffff"
```

## Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build all packages (Turbo) |
| `npm run clean` | Remove all `dist/` directories |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Lint all packages |

### Release

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

```bash
npx changeset              # create a new changeset
npm run version-packages   # bump versions from pending changesets
npm run release            # build + publish to npm
```

## React Native Components

DTAccordion, DTButton, DTCard, DTCheckbox, DTChip, DTDrawer, DTGallery, DTHexagon, DTLabel, DTMediaFrame, DTMenu, DTModal, DTProgressBar, DTQuantityStepper, DTRadioGroup, DTSearchInput, DTSwitch, DTTextInput

## Web CSS Modules

- `bevels.css` — angular clip-path patterns for the DT brand
- `glows.css` — neon drop-shadow effects for clipped elements
- `forms-dt.css` — text inputs, checkboxes, radio buttons, switches
- `elevation.css` — shadow elevation for Supra / MD3 brand

## Project Structure

```
dt-design-system/
├── packages/
│   ├── tokens/          # Design token definitions + CSS generation
│   ├── web/             # CSS themes and components
│   ├── react-native/    # React Native Paper components
│   └── showcase/        # Demo app (placeholder)
├── turbo.json           # Turbo pipeline config
└── package.json         # Workspace root
```

## License

[MIT](LICENSE)
