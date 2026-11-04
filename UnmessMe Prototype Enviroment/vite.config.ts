import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  optimizeDeps: {
    // Do NOT pre-bundle the design system. It is a workspace source package we
    // actively edit; pre-bundling caches it and breaks HMR on component edits.
    // Excluding it lets Vite serve it as source so changes hot-reload.
    exclude: ['@unmessme/design-system'],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
