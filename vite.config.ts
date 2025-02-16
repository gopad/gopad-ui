import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

import copy from "./rollup/copy.mjs";
import archive from "./rollup/archive.mjs";

// https://vite.dev/config/
export default defineConfig({
  mode: "production",
  envPrefix: "GOPAD_UI_",
  base: "./",

  plugins: [vue(), copy(), archive()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  build: {
    outDir: 'pkg/frontend/files',
    sourcemap: true,
    manifest: 'manifest.json',
    emptyOutDir: true,
  },
});
