/**
 * DT Design System — Tailwind CSS v3 Preset
 *
 * Maps design tokens (CSS custom properties) to Tailwind theme values.
 * Uses var() references so the same utility classes work with both
 * DT and Classic brands at runtime via [data-brand] switching.
 *
 * Usage in consumer's tailwind.config.js:
 *
 *   import dtPreset from '@dangerousthings/tailwind-preset';
 *
 *   export default {
 *     presets: [dtPreset],
 *     content: ['./src/**\/*.{tsx,ts,html}'],
 *   };
 *
 * Then use: bg-dt-primary, text-dt-text-primary, gap-dt-4, rounded-dt, etc.
 * Opacity modifiers work for colors with -rgb variants: bg-dt-primary/50
 */
import type { Config } from 'tailwindcss';

const dtPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        dt: {
          // Colors with -rgb variants support Tailwind opacity modifiers (bg-dt-primary/50)
          bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
          primary: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
          accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          other: 'rgb(var(--color-other-rgb) / <alpha-value>)',
          error: 'rgb(var(--color-error-rgb) / <alpha-value>)',
          warning: 'rgb(var(--color-warning-rgb) / <alpha-value>)',
          success: 'rgb(var(--color-success-rgb) / <alpha-value>)',
          info: 'rgb(var(--color-info-rgb) / <alpha-value>)',
          // Colors without -rgb variants (plain var)
          border: 'var(--color-border)',
          'surface-hover': 'var(--color-surface-hover)',
          'primary-dim': 'var(--color-primary-dim)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-muted': 'var(--color-text-muted)',
        },
        mode: {
          normal: 'var(--mode-normal)',
          emphasis: 'var(--mode-emphasis)',
          warning: 'var(--mode-warning)',
          success: 'var(--mode-success)',
          other: 'var(--mode-other)',
        },
      },
      spacing: {
        'dt-1': 'var(--space-1)',
        'dt-2': 'var(--space-2)',
        'dt-3': 'var(--space-3)',
        'dt-4': 'var(--space-4)',
        'dt-6': 'var(--space-6)',
        'dt-8': 'var(--space-8)',
      },
      borderRadius: {
        'dt-sm': 'var(--radius-sm)',
        dt: 'var(--radius)',
        'dt-lg': 'var(--radius-lg)',
      },
      fontFamily: {
        'dt-heading': 'var(--font-heading)',
        'dt-body': 'var(--font-body)',
        'dt-mono': 'var(--font-mono)',
      },
    },
  },
};

export default dtPreset;
