import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptESLintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      ".direnv/*",
      ".devenv/*",
      ".bingo/*",
      ".github/*",
      "cmd/*",
      "pkg/*",
      "static/*",
      "src/client/*",
    ],
  },
  {
    languageOptions: {
      globals: {
        process: true,
        module: true,
        require: true,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  js.configs.recommended,
  ...compat
    .extends("plugin:@typescript-eslint/recommended")
    .map(({ ...config }) => config),
  {
    files: ["**/*.{js,ts,mjs,cjs}"],
  },
  ...compat.extends("plugin:vue/vue3-recommended").map((config) => {
    return {
      ...config,
      files: ["**/*.vue"],
      languageOptions: {
        ...config.languageOptions,
        parserOptions: {
          ...config.languageOptions?.parserOptions,
          parser: typescriptESLintParser,
        },
      },
    };
  }),
  ...compat.extends("eslint-config-prettier"),
];
