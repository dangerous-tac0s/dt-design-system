# @dangerousthings/web

Web CSS themes and components for the Dangerous Things design system — bevels, animations, and form styles powered by CSS custom properties.

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
| `bevels.css` | Angular clip-path bevels for cards, buttons, labels, modals, drawers. Card color modes, selected states, progress bars, badge overlays, interactive bevel buttons |
| `forms-dt.css` | Text inputs, checkboxes, switches, radio buttons, progress bars, accordions, steppers, menu items, filter headers, filter overlays |
| `animations.css` | Entrance animations (scale-in, fade-in, slide-up), interactive animations (pulse, ping, spin), stagger container, transition utilities |
| `scrollbar.css` | Thin neon scrollbar styling scoped under `[data-brand="dt"]` |
| `feature-legend.css` | Product feature grid with icons and rotated labels, state-based coloring |

### Key Classes

**Bevels** — `.dt-bevel-card`, `.dt-bevel-btn`, `.dt-bevel-label`, `.dt-bevel-modal`, `.dt-bevel-drawer-left`, `.dt-bevel-drawer-right`, `.dt-bevel-sm`

**Card Modes** — `.mode-normal`, `.mode-emphasis`, `.mode-warning`, `.mode-success`, `.mode-other`, `.card.selected`, `.dt-card-progress`, `.dt-badge-overlay`

**Interactive Buttons** — `.dt-btn` (outlined rectangle, bevels on hover/select)

**Animations** — `.dt-animate-scale-in`, `.dt-animate-fade-in`, `.dt-animate-slide-up`, `.dt-animate-pulse`, `.dt-animate-ping`, `.dt-animate-spin`, `.dt-stagger-container`

**Scrollbar** — `.dt-scrollbar`, `.dt-scrollbar-mode`

**Filters** — `.dt-menu-item`, `.dt-filter-header`, `.dt-filter-overlay`

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
