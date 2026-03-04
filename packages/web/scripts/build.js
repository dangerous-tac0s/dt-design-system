#!/usr/bin/env node

/**
 * @dangerousthings/web build script
 *
 * 1. Copies src/ to dist/ (component CSS, base tokens, index.css)
 * 2. Copies fonts/ to dist/fonts/
 * 3. Copies generated token CSS from @dangerousthings/tokens/dist/css/ into dist/tokens/
 * 4. Copies theme-registry from @dangerousthings/tokens
 *
 * Consumers (Vite, webpack) resolve @import chains at build time.
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "src");
const dist = path.join(root, "dist");
const fontsDir = path.join(root, "fonts");

// Resolve @dangerousthings/tokens dist directory
const tokensDir = path.join(root, "..", "tokens", "dist");

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clean dist
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true });
}

// 1. Copy src → dist
copyDir(src, dist);

// 2. Copy fonts → dist/fonts
if (fs.existsSync(fontsDir)) {
  copyDir(fontsDir, path.join(dist, "fonts"));
}

// 3. Copy generated token CSS from @dangerousthings/tokens → dist/tokens/
const tokensCssDir = path.join(tokensDir, "css");
if (fs.existsSync(tokensCssDir)) {
  const destTokens = path.join(dist, "tokens");
  fs.mkdirSync(destTokens, { recursive: true });
  for (const file of fs.readdirSync(tokensCssDir)) {
    if (file.endsWith(".css")) {
      fs.copyFileSync(
        path.join(tokensCssDir, file),
        path.join(destTokens, file)
      );
    }
  }
} else {
  console.error("ERROR: @dangerousthings/tokens CSS not found at", tokensCssDir);
  console.error("Run: npm run build -w packages/tokens first");
  process.exit(1);
}

// 4. Copy theme-registry from tokens
const registryFiles = ["theme-registry.js", "theme-registry.d.ts"];
// The theme-registry is now in @dangerousthings/tokens as index.js — consumers
// import types from @dangerousthings/tokens directly. We generate a thin re-export
// for backward compatibility with dt-web-theme consumers.
const reExport = `// Re-export from @dangerousthings/tokens for backward compatibility
export { themes, brands } from "@dangerousthings/tokens";
export { DEFAULT_THEME } from "@dangerousthings/tokens";
`;
const reExportDts = `export { ThemeDefinition, ThemeBrand, ThemeMode } from "@dangerousthings/tokens";
export declare const themes: import("@dangerousthings/tokens").ThemeDefinition[];
export declare const brands: Record<string, import("@dangerousthings/tokens").BrandTokens>;
export declare const DEFAULT_THEME: string;
`;
fs.writeFileSync(path.join(dist, "theme-registry.js"), reExport);
fs.writeFileSync(path.join(dist, "theme-registry.d.ts"), reExportDts);

console.log("@dangerousthings/web: built to dist/");
