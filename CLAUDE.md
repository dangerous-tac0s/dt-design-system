# CLAUDE.md — DT Design System

## Project Overview

Monorepo for the Dangerous Things design system. Six npm packages publish under `@dangerousthings/*`:

- **tokens** — canonical design tokens in TypeScript, compiled to JS and auto-generated as CSS custom properties
- **web** — CSS themes (bevels, forms, animations) consumed by web apps
- **react** — React web components wrapping web CSS
- **react-native** — React Native components built on React Native Paper
- **tailwind-preset** — Tailwind CSS v3 preset mapping DT tokens
- **hex-background** — 3D hexagon grid background (Three.js)

Two brand themes: **dt** (neon cyberpunk / beveled), **classic** (dark navy / magenta).

## Build & Tooling

- **Turbo** orchestrates builds; `packages/tokens` must build first (dependency for web and react-native).
- Build everything: `npm run build`
- Typecheck everything: `npm run typecheck`
- Tokens build: `tsc` then `node dist/scripts/generate-css.js`
- Web build: `node scripts/build.cjs` (copies CSS, assembles brand token CSS, copies fonts)
- React Native build: `tsc`
- Versioning: Changesets (`npx changeset`, `npm run version-packages`, `npm run release`)

## Architecture Rules

- Tokens are the single source of truth. Never hard-code color, typography, or shape values in web or react-native packages — always reference the tokens package.
- Web package is pure CSS — no JavaScript runtime except the optional `theme-registry` module.
- React Native components wrap React Native Paper and must list it (and react, react-native, react-native-svg, react-native-safe-area-context) as peer dependencies, never bundled dependencies.

## Feature Parity

When adding or modifying a design token, component, or visual behavior, keep all four layers in sync:

1. **Tokens** — add/update the value in every brand file (`packages/tokens/src/brands/{dt,classic}.ts`) and in the shared type (`packages/tokens/src/types.ts`).
2. **Web** — if the token maps to a CSS component, update the relevant CSS file under `packages/web/src/components/`. Ensure the CSS custom property name matches the token path (e.g., `--dt-color-brand-primary`).
3. **React** — if there is a React web component wrapper, update or create the corresponding component in `packages/react/src/components/`.
4. **React Native** — update the corresponding component(s) under `packages/react-native/src/components/` and ensure the theme provider maps the new token.

### Parity Checklist (use before closing any PR)

- [ ] New tokens exist in all brand files with correct values
- [ ] Token types are updated if the shape of the token object changed
- [ ] CSS generation script produces the expected custom properties (`npm run build:tokens` then inspect `dist/css/`)
- [ ] Web CSS files reference the new/changed custom properties
- [ ] React web components are updated if applicable
- [ ] React Native components consume the new tokens via the theme
- [ ] All packages build cleanly (`npm run build`)
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

1. If it needs new tokens, add them to all brand files and types first.
2. If there is a web equivalent, add a CSS file in `packages/web/src/components/`.
3. Create a React web component wrapper in `packages/react/src/components/DTFoo.tsx` and re-export from `packages/react/src/index.ts`.
4. Create the React Native component in `packages/react-native/src/components/DTFoo.tsx` and re-export from `packages/react-native/src/index.ts`.
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

## Storefront Component Migration — Implementation Reference

The DT Shopify Storefront (`dt-shopify-storefront`) is the genesis project for this design system.
The storefront features documented below have been migrated into the design system. This section
serves as a reference for the implemented components and their locations.

### Implemented Features

| Feature | CSS (web) | React Component | Notes |
|---|---|---|---|
| Card Color Modes | `.mode-normal`, `.mode-emphasis`, `.mode-warning`, `.mode-success`, `.mode-other` in `bevels.css` | `DTCard` | Five modes with `*-selected` variants at 70% opacity |
| Card Progress Bar | `.dt-card-progress` in `bevels.css` | `DTCard` (`progress` prop) | Vertical left-edge bar, 0-100%, fills on hover |
| Card Chip Badges | `.dt-badge-overlay` in `bevels.css` | `DTBadgeOverlay` | Positioned bottom-right, mode-color-aware |
| Card Hover/Selected | `.card.selected` and hover states in `bevels.css` | `DTCard` | Fills with `var(--dt-card-color-selected)` |
| Staggered Container | `.dt-stagger-container` in `animations.css` | `DTStaggerContainer` | CSS `nth-child` staggered `animation-delay` |
| Animation Library | `animations.css` | -- | `dt-scale-in`, `dt-fade-in`, `dt-slide-up`, `dt-pulse`, `dt-ping`, `dt-spin`, transition utilities |
| Filter System UI | `.dt-menu-item`, `.dt-filter-header`, `.dt-filter-overlay` in `forms-dt.css` | `DTMenu`, `DTMobileFilterOverlay` | Nested menus, filter accordions, mobile overlay |
| Feature Legend | `feature-legend.css` | `DTFeatureLegend` | Icon grid with rotated labels, mode-colored header, feature states |
| Theme Branching | `[data-brand="dt"]` / `[data-brand="classic"]` CSS scoping | -- | No JS conditionals needed; CSS handles visual differences |
| Scrollbar Styling | `scrollbar.css` (`.dt-scrollbar`) | -- | Thin scrollbar with mode-normal color |

**Card color modes reference:**

| Mode | Token | Default (DT dark) | Use Case |
|---|---|---|---|
| `mode-normal` | `--color-primary` | `#00FFFF` cyan | Default product cards |
| `mode-emphasis` | `--color-secondary` | `#FFFF00` yellow | Highlighted/selected states |
| `mode-warning` | `--color-error` | `#FF0000` red | Lab products, warnings |
| `mode-success` | `--color-accent` | `#00FF00` green | Positive/success states |
| `mode-other` | `--color-other` | `#FF00FF` magenta | Bundles, alternative states |

**Theme branching differences (handled by CSS, not JS):**

| Aspect | Cyberpunk (`data-brand="dt"`) | Clean (`data-brand="classic"`) |
|---|---|---|
| Clip-paths | Heavy bevels | `border-radius: 0.75rem` |
| Colors | Neon (#00FFFF, #FF00FF) | B&W or muted tones |
| Hover effects | Pulse glow animations | None |
| Typography | Tektur | system-ui sans-serif |
| Text shadows | `0 0 8px var(--mode)` | None |
| Borders | Thick neon (5px top) | Subtle 1px |

### Icon Set — Product Features & Filtering

Canonical icon set for the DT design system, sourced from `react-icons`.

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
| Sensors | `MdOutlineThermostat` | react-icons/md |
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

## Known Issues

(none currently)
