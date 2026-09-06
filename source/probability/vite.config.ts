import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // relative asset paths so the built site works from any sub-folder (e.g. GitHub Pages)
  base: './',
  plugins: [react()],
  server: { port: 3020 },
  build: { chunkSizeWarningLimit: 1600 },
});
