import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";

import copy from './rollup/copy.js';
import archive from './rollup/archive.js';

export default defineConfig({
  build: {
    outDir: "static",
    sourcemap: true,
    manifest: true,
  },
  plugins: [
    eslintPlugin(),
    vue(),
    copy({
      assets: [["public/favicon.ico", "favicon.ico"]],
    }),
    archive(),
  ],
});
