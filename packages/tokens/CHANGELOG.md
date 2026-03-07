# @dangerousthings/tokens

## 0.3.0

### Minor Changes

- e74c285: Add mode CSS custom properties (--mode-normal, --mode-emphasis, --mode-warning, --mode-success, --mode-other) with RGB and selected variants for per-component color overrides

### Patch Changes

- e74c285: New package: @dangerousthings/react — React web components wrapping @dangerousthings/web CSS. 22 components matching the React Native package API (DTCard, DTButton, DTLabel, DTChip, DTModal, DTDrawer, DTAccordion, DTMenu, DTStaggerContainer, DTFeatureLegend, DTMobileFilterOverlay, DTGallery, DTHexagon, form primitives). Includes DTWebThemeProvider, animation hooks (useScaleIn, usePulse), and variant utility functions. DTVariant type moved to @dangerousthings/tokens as shared canonical source.

## 0.2.1

### Patch Changes

- 0453af8: Add per-package README and LICENSE for npm

## 0.2.0

### Minor Changes

- 1c8d585: Initial release of the DT design system monorepo.

  - `@dangerousthings/tokens`: Canonical design tokens for DT, Classic, and Supra brands with CSS generation
  - `@dangerousthings/web`: Web CSS theme with bevels, glows, form styles, and Tektur font
  - `@dangerousthings/react-native`: 18 React Native themed components (DTButton, DTCard, DTTextInput, etc.)
