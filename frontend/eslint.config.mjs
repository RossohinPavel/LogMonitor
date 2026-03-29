// @ts-check
import { defineConfig } from "eslint/config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import baseConfig from "../eslint.base.mjs";

export default defineConfig([
  {
    ignores: ["dist/", "node_modules/", "build/", "./src/api"],
  },
    ...baseConfig,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": /** @type {any} */ (reactHooks),
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {...globals.browser},
      parserOptions: {
        project: ["./tsconfig.app.json"], 
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "import-x/resolver": {
        typescript: { project: "./tsconfig.app.json", alwaysTryTypes: true, },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "import/order": ["error", {
        // Мы объединяем ВСЕ локальные типы путей в одну группу
        groups: ["builtin", "external", ["internal", "parent", "sibling", "index"] ],
        pathGroups: [
          { pattern: "{../*,./*}", group: "internal",position: "after"
          },
          {pattern: "react", group: "external", position: "before"}
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "never"
      }],
    }
  },
  {
    files: ["vite.config.ts"],
    languageOptions: {
      globals: {...globals.node,},
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);