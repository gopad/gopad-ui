import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import vue from "@vitejs/plugin-vue";

import copy from "./rollup/copy.mjs";
import archive from "./rollup/archive.mjs";

export default defineConfig({
  mode: "production",
  envPrefix: "GOPAD_UI_",

  plugins: [tsconfigPaths(), vue(), copy(), archive()],

  server: {
    watch: {
      ignored: ["**/.devenv/**", "**/.direnv/**"],
    },
    proxy: {
      "/api": "http://localhost:8080",
    },
  },

  build: {
    outDir: "static",
    sourcemap: true,
    manifest: "manifest.json",
    emptyOutDir: true,
  },
});
