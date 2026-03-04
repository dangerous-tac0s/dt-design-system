# @dangerousthings/web

Web CSS themes and components for the Dangerous Things design system — bevels, glows, and form styles powered by CSS custom properties.

## Install

```bash
npm install @dangerousthings/web
```

## Usage

Import the full bundle (base tokens + all components):

```css
@import "@dangerousthings/web";
```

Or import individual pieces:

```css
/* Brand tokens */
@import "@dangerousthings/web/tokens/dt.css";

/* Individual components */
@import "@dangerousthings/web/components/bevels.css";
@import "@dangerousthings/web/components/glows.css";
@import "@dangerousthings/web/components/forms-dt.css";
```

### Switching Brands

Swap the token import to change the entire look:

```css
/* Neon cyberpunk */
@import "@dangerousthings/web/tokens/dt.css";

/* Dark navy + magenta */
@import "@dangerousthings/web/tokens/classic.css";
```

### Theme Registry (JS)

For runtime theme switching:

```ts
import { themes, brands } from "@dangerousthings/web/theme-registry";
```

## CSS Modules

| File | Description |
|------|-------------|
| `bevels.css` | Angular clip-path bevels for cards, buttons, labels, modals, drawers |
| `glows.css` | Neon drop-shadow and text-shadow effects for clipped and standard elements |
| `forms-dt.css` | Text inputs, checkboxes, switches, radio buttons, progress bars, accordions, quantity steppers |

### Key Classes

**Bevels** — `.dt-bevel-card`, `.dt-bevel-btn`, `.dt-bevel-label`, `.dt-bevel-modal`, `.dt-bevel-drawer-left`, `.dt-bevel-drawer-right`, `.dt-bevel-sm`

**Glows** — `.dt-glow`, `.dt-glow-strong`, `.dt-glow-inset`, `.dt-text-glow`

## Exports

| Path | Description |
|------|-------------|
| `@dangerousthings/web` | Full CSS bundle (base + all components) |
| `@dangerousthings/web/tokens/*` | Per-brand CSS custom properties |
| `@dangerousthings/web/components/*` | Individual CSS component modules |
| `@dangerousthings/web/fonts/*` | Tektur font files |
| `@dangerousthings/web/theme-registry` | JS theme definitions for runtime switching |

## License

[MIT](LICENSE)
