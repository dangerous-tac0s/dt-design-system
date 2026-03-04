/**
 * Generates CSS custom property files from canonical TypeScript token definitions.
 * Run via: node dist/scripts/generate-css.js
 * Output: dist/css/{brand}.css
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { BrandTokens, ColorTokens } from "../types.js";
import { dt } from "../brands/dt.js";
import { classic } from "../brands/classic.js";
import { supra } from "../brands/supra.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "css");

/** Convert hex #rrggbb to "r, g, b" triplet for rgba() usage */
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

/** Generate CSS custom properties from color tokens */
function colorVars(colors: ColorTokens): string {
  return `  /* Backgrounds */
  --color-bg: ${colors.bg};
  --color-bg-rgb: ${hexToRgb(colors.bg)};
  --color-surface: ${colors.surface};
  --color-surface-rgb: ${hexToRgb(colors.surface)};
  --color-surface-hover: ${colors.surfaceHover};
  --color-border: ${colors.border};

  /* Text */
  --color-text-primary: ${colors.textPrimary};
  --color-text-secondary: ${colors.textSecondary};
  --color-text-muted: ${colors.textMuted};

  /* Brand Palette */
  --color-primary: ${colors.primary};
  --color-primary-rgb: ${hexToRgb(colors.primary)};
  --color-primary-dim: ${colors.primaryDim};
  --color-secondary: ${colors.secondary};
  --color-secondary-rgb: ${hexToRgb(colors.secondary)};
  --color-accent: ${colors.accent};
  --color-accent-rgb: ${hexToRgb(colors.accent)};
  --color-other: ${colors.other};
  --color-other-rgb: ${hexToRgb(colors.other)};

  /* Status */
  --color-success: ${colors.success};
  --color-success-rgb: ${hexToRgb(colors.success)};
  --color-warning: ${colors.warning};
  --color-warning-rgb: ${hexToRgb(colors.warning)};
  --color-error: ${colors.error};
  --color-error-rgb: ${hexToRgb(colors.error)};
  --color-info: ${colors.info};
  --color-info-rgb: ${hexToRgb(colors.info)};`;
}

/** Generate a full brand CSS file */
function generateBrandCSS(brand: BrandTokens): string {
  const id = brand.id;

  // DT is also the default (when no data-brand is set)
  const darkSelector =
    id === "dt"
      ? `:root[data-brand="${id}"],\n:root:not([data-brand])`
      : `:root[data-brand="${id}"]`;

  let css = `/* @dangerousthings/tokens — Generated CSS for "${brand.name}" */\n/* DO NOT EDIT — regenerate with: npm run build -w packages/tokens */\n\n`;

  // Dark mode (default)
  css += `/* ${brand.name} — Dark Mode (Default) */\n`;
  css += `${darkSelector} {\n`;
  css += colorVars(brand.dark) + "\n\n";
  css += `  /* Typography */\n`;
  css += `  --font-heading: ${brand.typography.heading};\n`;
  css += `  --font-body: ${brand.typography.body};\n\n`;
  css += `  /* Shape */\n`;
  css += `  --bevel-sm: ${brand.shape.bevelSm};\n`;
  css += `  --bevel-md: ${brand.shape.bevelMd};\n`;
  css += `  --bevel-lg: ${brand.shape.bevelLg};\n`;
  css += `  --radius-sm: ${brand.shape.radiusSm};\n`;
  css += `  --radius: ${brand.shape.radius};\n`;
  css += `  --radius-lg: ${brand.shape.radiusLg};\n\n`;
  css += `  color-scheme: dark;\n`;
  css += `}\n\n`;

  // Light mode (explicit)
  css += `/* ${brand.name} — Light Mode */\n`;
  css += `:root[data-brand="${id}"][data-theme="light"] {\n`;
  css += colorVars(brand.light) + "\n\n";
  css += `  color-scheme: light;\n`;
  css += `}\n\n`;

  // Auto mode (prefers-color-scheme)
  css += `/* ${brand.name} — Auto Mode (follows system preference) */\n`;
  css += `@media (prefers-color-scheme: light) {\n`;
  css += `  :root[data-brand="${id}"][data-theme="auto"] {\n`;
  css += colorVars(brand.light).replace(/^/gm, "  ") + "\n\n";
  css += `    color-scheme: light;\n`;
  css += `  }\n`;
  css += `}\n`;

  // DT gets explicit dark override
  if (id === "dt") {
    css += `\n/* Force dark explicitly */\n`;
    css += `:root[data-brand="${id}"][data-theme="dark"] {\n`;
    css += `  color-scheme: dark;\n`;
    css += `}\n`;
  }

  return css;
}

// --- Main ---
mkdirSync(outDir, { recursive: true });

for (const brand of [dt, classic, supra]) {
  const css = generateBrandCSS(brand);
  const path = join(outDir, `${brand.id}.css`);
  writeFileSync(path, css, "utf-8");
  console.log(`  tokens: generated ${path}`);
}

console.log("  tokens: CSS generation complete");
