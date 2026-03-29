// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import importX from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      "@stylistic": stylistic,
      "import": /** @type {any} */ (importX),
      "unused-imports": unusedImports,
    },
    rules: {
      // --- ЛОГИЧЕСКИЕ ПРАВИЛА --- 
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unsafe-argument": "error",

      // --- ИМПОРТЫ И ПЕРЕМЕННЫЕ ---
      "import/order": ["error", {
        groups: [["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"]],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "never",
      }],
      "import/export": "error",
      "import/newline-after-import": ["error", { count: 2, exactCount: true }],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { 
        vars: "all", 
        varsIgnorePattern: "^_", 
        args: "after-used", 
        argsIgnorePattern: "^_" 
      }],

      // --- ПРАВИЛА ФОРМАТИРОВАНИЯ --- 
      "@stylistic/indent": ["error", 2], 
      "@stylistic/quotes": ["error", "double"], 
      "@stylistic/semi": ["error", "always"], 
      "@stylistic/max-len": ["error", { "code": 100 }], 
      "@stylistic/comma-dangle": ["error", "always-multiline"], 
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/keyword-spacing": ["error", { "before": true, "after": true }],
      "@stylistic/object-curly-spacing": ["error", "always"],

      // --- ПРОВЕРКИ И ОГРАНИЧЕНИЯ ---
      "curly": ["error", "all"],
      "no-console": ["error", { allow: ["info", "error", "warn"] }],
      "no-irregular-whitespace": ["error", { skipStrings: false, skipTemplates: false }],
      "@stylistic/padded-blocks": ["error", { "classes": "always", "blocks": "never" }],
    },
  },
]);