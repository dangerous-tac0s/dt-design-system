import type { BrandTokens } from "../types.js";

export const dt: BrandTokens = {
  id: "dt",
  name: "Dangerous Things",
  description: "Official DT brand — Tektur font, neon cyberpunk, beveled corners",

  dark: {
    bg: "#000000",
    surface: "#0a0a0a",
    surfaceHover: "#141414",
    border: "#00ffff",

    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    textMuted: "#94a3b8",

    primary: "#00ffff",
    primaryDim: "#0891b2",
    secondary: "#ffff00",
    accent: "#00ff00",
    other: "#ff00ff",

    success: "#00ff00",
    warning: "#ffff00",
    error: "#ff0000",
    info: "#00ffff",
  },

  light: {
    bg: "#ffffff",
    surface: "#f8fafc",
    surfaceHover: "#f1f5f9",
    border: "#000000",

    textPrimary: "#000000",
    textSecondary: "#475569",
    textMuted: "#94a3b8",

    primary: "#0891b2",
    primaryDim: "#0e7490",
    secondary: "#a16207",
    accent: "#15803d",
    other: "#ff00ff",

    success: "#15803d",
    warning: "#a16207",
    error: "#dc2626",
    info: "#0891b2",
  },

  typography: {
    heading: "'Tektur', var(--font-sans)",
    body: "'Tektur', var(--font-sans)",
    mono: "'SF Mono', Monaco, 'Cascadia Code', monospace",
  },

  shape: {
    bevelSm: "1rem",
    bevelMd: "2rem",
    bevelLg: "2.5rem",
    radiusSm: "0",
    radius: "0",
    radiusLg: "0",
  },
};
