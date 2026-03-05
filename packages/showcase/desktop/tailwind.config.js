import dtPreset from '@dangerousthings/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [dtPreset],
  content: ['./src/renderer/**/*.{tsx,ts,html}'],
  corePlugins: {
    preflight: false,
  },
};
