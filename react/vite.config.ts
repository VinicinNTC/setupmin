import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: { alias: { '@legacy': resolve(__dirname, '../src') } },
  publicDir: resolve(__dirname, '../public'),
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: { outDir: '../dist-react', emptyOutDir: true },
});
