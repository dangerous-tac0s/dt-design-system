# @dangerousthings/tailwind-preset

Tailwind CSS v3 preset that maps Dangerous Things design tokens to Tailwind theme values. Uses CSS custom property references so the same utility classes work across both DT and Classic brands at runtime.

## Install

```bash
npm install @dangerousthings/tailwind-preset
```

### Peer Dependencies

```bash
npm install tailwindcss@^3.4
```

You also need a brand token CSS file loaded (from `@dangerousthings/web` or `@dangerousthings/tokens`).

## Setup

Add the preset to your `tailwind.config.js`:

```js
import dtPreset from "@dangerousthings/tailwind-preset";

export default {
  presets: [dtPreset],
  content: ["./src/**/*.{tsx,ts,html}"],
};
```

## Available Utilities

### Colors

All DT design token colors are available under the `dt-` prefix. Colors with `-rgb` variants support Tailwind opacity modifiers.

```html
<div class="bg-dt-bg text-dt-text-primary">
  <h1 class="text-dt-primary">Heading</h1>
  <p class="text-dt-text-secondary">Body text</p>
  <button class="bg-dt-primary/50 text-dt-bg">50% opacity</button>
</div>
```

| Utility | Token |
|---------|-------|
| `bg-dt-bg`, `text-dt-bg` | `--color-bg` |
| `bg-dt-surface` | `--color-surface` |
| `bg-dt-primary`, `text-dt-primary` | `--color-primary` |
| `bg-dt-secondary` | `--color-secondary` |
| `bg-dt-accent` | `--color-accent` |
| `bg-dt-error` | `--color-error` |
| `text-dt-text-primary` | `--color-text-primary` |
| `text-dt-text-secondary` | `--color-text-secondary` |
| `text-dt-text-muted` | `--color-text-muted` |

### Mode Colors

Card mode colors are available under the `mode-` prefix:

```html
<div class="border-mode-normal">Normal</div>
<div class="text-mode-emphasis">Emphasis</div>
<div class="bg-mode-warning">Warning</div>
```

### Spacing

```html
<div class="p-dt-4 gap-dt-2 m-dt-1">...</div>
```

| Utility | Token |
|---------|-------|
| `*-dt-1` through `*-dt-8` | `--space-1` through `--space-8` |

### Border Radius

```html
<div class="rounded-dt">Default</div>
<div class="rounded-dt-sm">Small</div>
<div class="rounded-dt-lg">Large</div>
```

### Font Family

```html
<h1 class="font-dt-heading">Tektur heading</h1>
<p class="font-dt-body">Body text</p>
<code class="font-dt-mono">Monospace</code>
```

## Brand Switching

Because the preset uses `var()` references, switching brands at runtime requires only changing the CSS custom properties (e.g., via `data-brand` attribute). No Tailwind rebuild is needed.

```html
<div data-brand="dt">Cyan neon theme</div>
<div data-brand="classic">Navy magenta theme</div>
```

## Monorepo

Part of the [DT Design System](https://github.com/nicholasgriffintn/dt-design-system) monorepo.

## License

[MIT](LICENSE)
