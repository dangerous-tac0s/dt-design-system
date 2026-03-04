export type {
  ThemeBrand,
  ThemeMode,
  ThemeDefinition,
  ColorTokens,
  TypographyTokens,
  ShapeTokens,
  BrandTokens,
} from "./types.js";

export { dt } from "./brands/dt.js";
export { classic } from "./brands/classic.js";

import { dt } from "./brands/dt.js";
import { classic } from "./brands/classic.js";
import type { BrandTokens, ThemeDefinition } from "./types.js";

/** All brand tokens keyed by id */
export const brands: Record<string, BrandTokens> = { dt, classic };

/** Theme registry for UI selectors */
export const themes: ThemeDefinition[] = [
  {
    id: "dt",
    name: dt.name,
    description: dt.description,
    supportsModes: ["dark", "light", "auto"],
    defaultMode: "dark",
  },
  {
    id: "classic",
    name: classic.name,
    description: classic.description,
    supportsModes: ["dark", "light", "auto"],
    defaultMode: "dark",
  },
];
