# @dangerousthings/tokens

Canonical design tokens for the Dangerous Things design system — colors, typography, and shape values defined in TypeScript and exported as CSS custom properties.

## Install

```bash
npm install @dangerousthings/tokens
```

## Brands

Three brand themes are included:

| Brand | Description |
|-------|-------------|
| **dt** | Neon cyberpunk — Tektur font, beveled corners, cyan/yellow/magenta palette |
| **classic** | Dark navy with magenta accents, standard border radius |
| **supra** | Material Design 3 — VivoKey blue, rounded corners, elevation shadows |

Each brand provides dark and light mode values.

## Usage

### TypeScript / JavaScript

```ts
import { dt } from "@dangerousthings/tokens/brands/dt";

console.log(dt.color.dark.primary);  // "#00ffff"
console.log(dt.typography.heading);  // "Tektur Variable"
console.log(dt.shape.bevelMd);       // "2rem"
```

Import all brands at once:

```ts
import { brands } from "@dangerousthings/tokens";

Object.keys(brands); // ["dt", "classic", "supra"]
```

### Types

```ts
import type { BrandTokens, ColorTokens, ThemeBrand } from "@dangerousthings/tokens";
```

### CSS Custom Properties

Generated CSS files are available per brand:

```css
@import "@dangerousthings/tokens/css/dt.css";
```

This provides custom properties like `--color-primary`, `--color-primary-rgb`, `--font-heading`, `--bevel-md`, etc.

## Exports

| Path | Description |
|------|-------------|
| `@dangerousthings/tokens` | All brands, theme definitions, and types |
| `@dangerousthings/tokens/brands/dt` | DT brand tokens |
| `@dangerousthings/tokens/brands/classic` | Classic brand tokens |
| `@dangerousthings/tokens/brands/supra` | Supra brand tokens |
| `@dangerousthings/tokens/css/dt.css` | DT CSS custom properties |
| `@dangerousthings/tokens/css/classic.css` | Classic CSS custom properties |
| `@dangerousthings/tokens/css/supra.css` | Supra CSS custom properties |

## Token Categories

- **Color** — background, surface, text, brand primary/secondary/accent, semantic (success, warning, error, info)
- **Typography** — heading, body, and mono font families
- **Shape** — bevel sizes (sm/md/lg) and border radius (sm/md/lg)

## License

[MIT](LICENSE)
