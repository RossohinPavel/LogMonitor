// @ts-check
import { defineConfig } from "eslint/config";
import globals from "globals";
import baseConfig from "../eslint.base.mjs";

export default defineConfig([
  {
    ignores: ["dist/", "node_modules/"],
  },
  ...baseConfig,
  {
    languageOptions: {
      globals: {...globals.node, ...globals.jest,},
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);