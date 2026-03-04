import type { BrandTokens } from "../types.js";

export const classic: BrandTokens = {
  id: "classic",
  name: "Classic Cyberpunk",
  description: "Original dark navy aesthetic with magenta accents",

  dark: {
    bg: "#0a0e1a",
    surface: "#121827",
    surfaceHover: "#1a2332",
    border: "#1e293b",

    textPrimary: "#e2e8f0",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",

    primary: "#00ffff",
    primaryDim: "#0891b2",
    secondary: "#ff00ff",
    accent: "#00ff88",
    other: "#ff00ff",

    success: "#00ff88",
    warning: "#ffaa00",
    error: "#ff0055",
    info: "#00ffff",
  },

  light: {
    bg: "#ffffff",
    surface: "#f8fafc",
    surfaceHover: "#f1f5f9",
    border: "#e2e8f0",

    textPrimary: "#0f172a",
    textSecondary: "#475569",
    textMuted: "#94a3b8",

    primary: "#0891b2",
    primaryDim: "#0e7490",
    secondary: "#c026d3",
    accent: "#059669",
    other: "#c026d3",

    success: "#16a34a",
    warning: "#d97706",
    error: "#dc2626",
    info: "#0891b2",
  },

  typography: {
    heading: "var(--font-sans)",
    body: "var(--font-sans)",
    mono: "'SF Mono', Monaco, 'Cascadia Code', monospace",
  },

  shape: {
    bevelSm: "0px",
    bevelMd: "0px",
    bevelLg: "0px",
    radiusSm: "0.25rem",
    radius: "0.5rem",
    radiusLg: "0.75rem",
  },
};
