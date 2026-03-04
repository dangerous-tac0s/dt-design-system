# CLAUDE.md — DT Design System

## Project Overview

Monorepo for the Dangerous Things design system. Three npm packages publish under `@dangerousthings/*`:

- **tokens** — canonical design tokens in TypeScript, compiled to JS and auto-generated as CSS custom properties
- **web** — CSS themes (bevels, glows, elevation, forms) consumed by web apps
- **react-native** — React Native components built on React Native Paper

Three brand themes: **dt** (neon cyberpunk / beveled), **classic** (dark navy / magenta), **supra** (MD3 / blue).

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

1. **Tokens** — add/update the value in every brand file (`packages/tokens/src/brands/{dt,classic,supra}.ts`) and in the shared type (`packages/tokens/src/types.ts`).
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
