import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'src/renderer',
  base: './',
  plugins: [react()],
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@dangerousthings/web': path.resolve(__dirname, '../../web/dist'),
    },
  },
  optimizeDeps: {
    // Don't pre-bundle design system packages — they're local workspace deps
    // that change frequently during development. Pre-bundling caches them in
    // node_modules/.vite which causes stale CSS/JS after rebuilds.
    exclude: ['@dangerousthings/web', '@dangerousthings/react', '@dangerousthings/tokens'],
  },
  server: {
    // Watch design system dist directories for changes during dev
    watch: {
      ignored: ['!**/packages/web/dist/**', '!**/packages/react/dist/**', '!**/packages/tokens/dist/**'],
    },
  },
});
