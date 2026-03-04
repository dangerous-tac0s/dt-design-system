import type { BrandTokens } from "../types.js";

export const supra: BrandTokens = {
  id: "supra",
  name: "VivoKey Supra",
  description: "Material Design 3 with VivoKey blue, rounded corners, elevation shadows",

  dark: {
    bg: "#000000",
    surface: "#28292E",
    surfaceHover: "#303136",
    border: "#42667E",

    textPrimary: "#ffffff",
    textSecondary: "#e2e8f0",
    textMuted: "#94a3b8",

    primary: "#42667E",
    primaryDim: "#385872",
    secondary: "#8BAEC7",
    accent: "#8BAEC7",
    other: "#F67448",

    success: "#8BB174",
    warning: "#F67448",
    error: "#ED4337",
    info: "#42667E",
  },

  light: {
    bg: "#ffffff",
    surface: "#AFB8C2",
    surfaceHover: "#C5CCD4",
    border: "#000000",

    textPrimary: "#000000",
    textSecondary: "#374151",
    textMuted: "#6b7280",

    primary: "#000000",
    primaryDim: "#1f2937",
    secondary: "#F67448",
    accent: "#FDFE1B",
    other: "#F67448",

    success: "#8BB174",
    warning: "#F67448",
    error: "#ED4337",
    info: "#42667E",
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
    radiusSm: "0.5rem",
    radius: "0.625rem",
    radiusLg: "0.75rem",
  },
};
