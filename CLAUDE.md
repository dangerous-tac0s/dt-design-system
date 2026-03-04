# CLAUDE.md — DT Design System

## Project Overview

Monorepo for the Dangerous Things design system. Three npm packages publish under `@dangerousthings/*`:

- **tokens** — canonical design tokens in TypeScript, compiled to JS and auto-generated as CSS custom properties
- **web** — CSS themes (bevels, glows, forms) consumed by web apps
- **react-native** — React Native components built on React Native Paper

Two brand themes: **dt** (neon cyberpunk / beveled), **classic** (dark navy / magenta).

## Build & Tooling

- **Turbo** orchestrates builds; `packages/tokens` must build first (dependency for web and react-native).
- Build everything: `npm run build`
- Typecheck everything: `npm run typecheck`
- Tokens build: `tsc` then `node dist/scripts/generate-css.js`
- Web build: `node scripts/build.js` (copies CSS, assembles brand token CSS, copies fonts)
- React Native build: `tsc`
- Versioning: Changesets (`npx changeset`, `npm run version-packages`, `npm run release`)

## Architecture Rules

- Tokens are the single source of truth. Never hard-code color, typography, or shape values in web or react-native packages — always reference the tokens package.
- Web package is pure CSS — no JavaScript runtime except the optional `theme-registry` module.
- React Native components wrap React Native Paper and must list it (and react, react-native, react-native-svg, react-native-safe-area-context) as peer dependencies, never bundled dependencies.

## Feature Parity

When adding or modifying a design token, component, or visual behavior, keep all three layers in sync:

1. **Tokens** — add/update the value in every brand file (`packages/tokens/src/brands/{dt,classic}.ts`) and in the shared type (`packages/tokens/src/types.ts`).
2. **Web** — if the token maps to a CSS component, update the relevant CSS file under `packages/web/src/components/`. Ensure the CSS custom property name matches the token path (e.g., `--dt-color-brand-primary`).
3. **React Native** — update the corresponding component(s) under `packages/react-native/src/components/` and ensure the theme provider maps the new token.

### Parity Checklist (use before closing any PR)

- [ ] New tokens exist in all three brand files with correct values
- [ ] Token types are updated if the shape of the token object changed
- [ ] CSS generation script produces the expected custom properties (`npm run build:tokens` then inspect `dist/css/`)
- [ ] Web CSS files reference the new/changed custom properties
- [ ] React Native components consume the new tokens via the theme
- [ ] All three packages build cleanly (`npm run build`)
- [ ] TypeScript typechecks pass (`npm run typecheck`)

## Testing

> No test framework is configured yet. When adding tests, follow the guidance below.

### Strategy

- **Tokens**: unit tests for token value correctness and CSS generation output. Verify every brand file satisfies the shared type. Snapshot the generated CSS files.
- **Web**: visual regression tests or snapshot tests for the compiled CSS. Ensure each brand's generated stylesheet contains expected custom properties.
- **React Native**: component rendering tests with React Native Testing Library. Test that each component renders without errors under every brand theme. Test interactive behaviors (press, toggle, expand).

### Conventions (apply once a framework is added)

- Place test files next to source: `foo.ts` → `foo.test.ts`, `DTButton.tsx` → `DTButton.test.tsx`.
- Name test blocks clearly: `describe("DTButton")`, `it("renders in contained mode")`.
- Run tests via Turbo: add a `test` task to `turbo.json` and per-package `test` scripts.
- CI should run `turbo run test` alongside `build` and `typecheck`.

## Maintenance

### Adding a New Component

1. Create the React Native component in `packages/react-native/src/components/DTFoo.tsx`.
2. Re-export it from `packages/react-native/src/index.ts`.
3. If it needs new tokens, add them to all brand files and types first.
4. If there is a web equivalent (CSS-only), add a CSS file in `packages/web/src/components/`.
5. Create a changeset: `npx changeset` — select affected packages and describe the change.

### Adding a New Brand

1. Create `packages/tokens/src/brands/newbrand.ts` implementing the full `BrandTokens` type.
2. Re-export it from `packages/tokens/src/index.ts`.
3. The CSS generation script will pick it up automatically.
4. Add the brand to the React Native `DTThemeProvider` brand union.
5. Update this file and the README.

### Modifying Tokens

- Always start in `packages/tokens/src/types.ts` if the token shape changes.
- Update every brand file — the TypeScript compiler will flag missing properties.
- Rebuild tokens (`npm run build:tokens`) and verify the generated CSS before touching downstream packages.

### CI

GitHub Actions runs on push to `main` and on PRs:
- Builds across Node 18, 20, 22
- Runs typecheck
- Validates changesets on PRs (`npx changeset status`)

### Code Style

- TypeScript strict mode.
- CSS uses BEM-ish class names prefixed with `dt-` (e.g., `.dt-bevel-card`).
- React Native components are prefixed `DT` (e.g., `DTButton`).
- Keep files focused — one component per file, one brand per file.

## Storefront Component Migration — Features to Extend

The DT Shopify Storefront (`dt-shopify-storefront`) is the genesis project for this design system. Several
storefront features are not yet represented in the design system and need to be baked in. This section
documents everything that must be supported before the storefront can fully adopt design system components.

### Card Color Modes (per-card `--mode`)

The storefront assigns each card a color mode that controls border, header background, glow, and accent colors.
The design system's current `.card` component only uses `--color-primary` (always cyan). Cards must support
per-instance mode overrides.

**Five modes (tokens already exist, need component support):**

| Mode | Token | Default (DT dark) | Use Case |
|---|---|---|---|
| `mode-normal` | `--color-primary` | `#00FFFF` cyan | Default product cards |
| `mode-emphasis` | `--color-secondary` | `#FFFF00` yellow | Highlighted/selected states |
| `mode-warning` | `--color-error` | `#FF0000` red | Lab products, warnings |
| `mode-success` | `--color-accent` | `#00FF00` green | Positive/success states |
| `mode-other` | `--color-other` | `#FF00FF` magenta | Bundles, alternative states |

Each mode also has a `*-selected` variant at 70% opacity for hover/active states.

**Implementation pattern in storefront:**
```css
.mode-normal {
  --mode: var(--mode-normal);
  --accent-mode: var(--mode-emphasis);
  --selected: var(--mode-normal-selected);
}
.selected {
  background-color: var(--selected) !important;
  color: black !important;
}
```

**Recommendation:** Add a `--dt-card-color` custom property that defaults to `--color-primary` and can be
overridden per-card. All card sub-components (header bg, border, glow, progress bar) should reference this
variable instead of `--color-primary` directly.

### Card Progress Bar (thick left edge)

Product cards have a vertical progress bar on the left edge that fills based on a percentage value.
This does not exist in the design system.

**Storefront implementation:**
- CSS variable: `--card-thick-edge-width: 0.75em`
- Class: `.progress` — left-side vertical bar inheriting the card's `--mode` color
- Fill: Dynamic height (0-100%) controlled by `progress` prop
- Hover: Fills to 100% on hover
- States: `.progress-indicator` (semi-transparent), `.progress-indicator-1` (darker with bevel clip)

**Recommendation:** Add an optional `.dt-card-progress` child element to the card component, driven by
a `--dt-card-progress` custom property (0-100).

### Card Chip Badges

Product cards display contextual badges (e.g., "LAB", "BUNDLE") positioned absolute bottom-right of the
image area, with background color matching the card's mode.

**Recommendation:** The existing `.badge` component in `bevels.css` could be extended with positioning
utilities (`.badge-overlay`, `.badge-bottom-right`) and mode-color-aware variants.

### Card Hover / Selected State

On hover, the storefront card fills with the mode's selected color and the progress bar fills to 100%.
The entire card gets a `.selected` class. The design system's `.card:hover` only applies a `drop-shadow`
but doesn't change fill color.

**Recommendation:** Add `.card.selected` and `.card:hover` states that fill with `var(--dt-card-color-selected)`
(defaulting to `rgba(var(--color-primary-rgb), 0.7)`).

### Staggered Card Container (Sequential Loading Animation)

The storefront animates product cards with staggered scale-in entrances — each card scales from 0 to 1 with
an incrementing delay. This creates a sequential "loading" effect across the grid.

**Current storefront pattern (per-card, using framer-motion):**
```tsx
<motion.div
  initial={{scale: 0}}
  animate={{scale: 1}}
  transition={{ ease: 'easeInOut', duration: 0.33, delay: index * 0.075 }}
/>
```

**Recommendation:** Create a `dt-stagger-container` component that automatically assigns staggered
`animation-delay` values to its children. This should work with pure CSS (using `nth-child` or CSS
custom properties) so consumers don't need a JS animation library. Example:

```css
.dt-stagger-container {
  --dt-stagger-duration: 0.33s;
  --dt-stagger-interval: 75ms;
}
.dt-stagger-container > * {
  animation: dt-scale-in var(--dt-stagger-duration) ease-in-out both;
}
.dt-stagger-container > :nth-child(1) { animation-delay: calc(0 * var(--dt-stagger-interval)); }
.dt-stagger-container > :nth-child(2) { animation-delay: calc(1 * var(--dt-stagger-interval)); }
/* ... up to a reasonable limit, or use @property for dynamic calculation */

@keyframes dt-scale-in {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}
```

### Animation Library

The storefront uses several animation patterns that should be standardized in the design system:

**Entrance animations:**
- `dt-scale-in` — scale 0→1 (card entrance, staggered)
- `dt-fade-in` — opacity 0→1
- `dt-slide-up` — translateY(100%)→0 (mobile menus, modals)

**Interactive animations:**
- `dt-pulse` — opacity oscillation for hover glow (`2s cubic-bezier(0.4, 0, 0.6, 1) infinite`)
- `dt-ping` — scale + fade-out ping effect (used on active filter indicators)
- `dt-spin` — 360deg rotation (loading spinners)

**Transition utilities:**
- `dt-accordion-expand` — max-height 0→auto with 250ms ease-in-out
- `dt-chevron-rotate` — 180deg rotation for expand/collapse indicators
- `dt-progress-fill` — height transition for progress bars

**Recommendation:** Add `packages/web/src/components/animations.css` with `@keyframes` definitions
and utility classes. These should be brand-independent (no color references in animations).

### Filter System UI

The storefront's filter system includes several components that are not in the design system:

**NestedMenu:** Hierarchical filter navigation with recursive submenus.
- Level 0: Large icons (4xl) with vertical rotated labels below
- Level 1+: `.menu-item-clipped` buttons with bevel clip-path and thick top border
- Submenus: Portal-rendered, absolute positioned, hover-activated with 120ms close delay
- Selected state: `mode-emphasis` color, `menu-item-clipped-selected` class

**FilterAccordion:** Expandable filter panel with nested levels.
- Thick top border (5px in cyberpunk, 1px in clean)
- Active state: border and text color switch to `--mode-emphasis`
- Indent per level: `paddingLeft: (level + 1) * 16px`
- Chevron: MdExpandMore with 180deg rotation on expand

**MobileFilterMenu:** Full-screen overlay with spring animation.
- Backdrop: `rgba(0,0,0,0.5)` with blur(4px)
- Slide-up animation: `y: 100%` → `y: 0`
- Active filter count badge in header
- "Clear All Filters" button when filters are active

**Recommendation:** These are complex interactive components. Start with CSS patterns
(`.dt-menu-item`, `.dt-filter-header`) and leave JS behavior to consumers.

### Icon Set — Product Features & Filtering

The storefront uses a specific set of icons from `react-icons` for product features and UI controls.
These should be documented as the canonical icon set for the DT design system.

**Product Feature Icons (react-icons/md — Material Design):**

| Feature | Icon | Package |
|---|---|---|
| Illumination | `MdLightbulbOutline` | react-icons/md |
| Visibility/Glow | `MdOutlineVisibility` | react-icons/md |
| Data Sharing | `MdOutlineMobileScreenShare` | react-icons/md |
| UID Cloning/Magic | `MdOutlineCopyAll` | react-icons/md |
| Payment/NFC | `MdOutlineCreditCard` | react-icons/md |
| Smartphone Compat | `MdOutlinePhonelinkRing` | react-icons/md |
| Access Control | `MdOutlineVpnKey` | react-icons/md |
| Temperature | `MdOutlineThermostat` | react-icons/md |
| NFC Sensing | `MdOutlineSensors` | react-icons/md |
| Fitness/Bio | `MdOutlineFitbit` | react-icons/md |
| Vibration | `MdOutlineVibration` | react-icons/md |
| Exploration | `MdOutlineExplore` | react-icons/md |
| Cryptography | `LuBinary` | react-icons/lu |
| Digital Security | `FaUserShield` | react-icons/fa |
| Temperature (alt) | `BsThermometerHalf` | react-icons/bs |

**UI Control Icons:**

| Control | Icon | Package |
|---|---|---|
| Filter toggle | `MdFilterList` | react-icons/md |
| Expand/collapse | `MdExpandMore` | react-icons/md |
| Close/dismiss | `MdClose` | react-icons/md |
| Dropdown arrow | `MdOutlineKeyboardArrowDown` | react-icons/md |
| No image placeholder | `MdOutlineHideImage` | react-icons/md |
| More details | `CgMoreR` | react-icons/cg |
| Loading spinner | `FaSpinner` | react-icons/fa6 |
| Cart | `FaCartShopping` | react-icons/fa6 |
| Add to cart | `FaCartPlus` | react-icons/fa6 |
| Search | `FaMagnifyingGlass` | react-icons/fa6 |
| Back | `FaArrowLeft` | react-icons/fa6 |
| User (logged in) | `FaUser` | react-icons/fa6 |
| User (logged out) | `FaUserSlash` | react-icons/fa6 |
| Delete | `FaTrash` | react-icons/fa |

**Custom SVG Icons (ThemeToggle.tsx):**
- Sun icon (24x24) — switch to clean theme
- Terminal/matrix icon (24x24) — switch to cyberpunk theme

**Icon display standard:** Feature icons render at 42px in the UseCaseLegend grid. UI icons at 1.5em.
Icons inherit color from their parent's `--mode` variable.

**Recommendation:** The design system should document this icon set as the canonical reference.
Consider bundling an icon sprite or re-exporting the specific react-icons subset as
`@dangerousthings/icons` for consistency across projects.

### Feature Legend Component

The storefront has a specialized `UseCaseLegend` component that displays product features in a
grid with icons, rotated labels, and a hover-driven detail header. This is a key product page
component that should be represented in the design system.

**Structure:**
- **Header bar:** Full-width, mode-colored background, shows chip name + hovered feature details
- **Icon grid:** 5-column flex layout with icons + vertical rotated labels
- **Labels:** `writing-mode: vertical-rl` + `transform: rotate(180deg)`, 0.85rem, font-weight 600
- **Feature states:** Supported (mode-normal/cyan), disabled (mode-other/magenta), unsupported (mode-warning/red)

**Color assignment in the legend uses hardcoded hex values** in `app/lib/cyberTheme.ts` — these
need to be migrated to use CSS variables. This is a known pre-existing issue in the storefront.

### Theme Branching Pattern

Many storefront components have two rendering paths: cyberpunk and clean. The design system should
support this via the two-axis theme system (`data-brand` + `data-theme`) so that components
automatically adapt without conditional JS logic.

**Key differences between branches:**

| Aspect | Cyberpunk (DT brand) | Clean |
|---|---|---|
| Clip-paths | Heavy bevels | `border-radius: 0.75rem` |
| Colors | Neon (#00FFFF, #FF00FF) | B&W or muted tones |
| Hover effects | Pulse glow animations | None |
| Typography | Tektur | system-ui sans-serif |
| Text shadows | `0 0 8px var(--mode)` | None |
| Borders | Thick neon (5px top) | Subtle 1px |

**Recommendation:** The clean theme should be a brand variant (e.g., `data-brand="classic"`) that
nullifies bevels, glows, and animations via CSS. Components should not need JS `if (isClean)` branches
if the design system CSS handles the visual differences.

### Scrollbar Styling

The storefront styles scrollbars in cyberpunk mode:
```css
scrollbar-width: thin;
scrollbar-color: var(--mode-normal) transparent;
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: var(--mode-normal); border-radius: 3px; }
```

**Recommendation:** Add to design system as a utility: `.dt-scrollbar` or scope under `[data-brand="dt"]`.

## Known Issues

### Link hover glow ignores per-element mode colors (glows.css)

`packages/web/dist/components/glows.css` line 37-38 applies a blanket link hover glow:

```css
[data-brand="dt"] a:hover {
  text-shadow: 0 0 8px var(--color-primary);
}
```

`--color-primary` is always the brand's primary color (cyan for DT). This means **every** link glows cyan on hover, even inside elements that define their own mode color (e.g., a product card with `--mode: var(--mode-warning)` still gets a cyan glow instead of red).

**Workaround (dt-shopify-storefront):** The storefront overrides this with a higher-specificity rule:
```css
[data-brand="dt"] .card-container a:hover {
  text-shadow: 0 0 8px var(--mode);
}
```

**Proper fix:** The link glow rule should respect a local color variable. Options:
1. Use `currentColor` instead of `var(--color-primary)` — glows whatever color the text already is
2. Introduce a `--glow-color` custom property defaulting to `--color-primary`, which components can override locally
3. Scope the rule more narrowly so it doesn't apply inside component containers that define their own color context
