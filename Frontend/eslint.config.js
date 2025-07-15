import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import { defineFlatConfig } from "eslint/config";


export default defineFlatConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      js,
      tseslint,
      react: pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    languageOptions: { language: "json" },
    rules: {},
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    languageOptions: { language: "jsonc" },
    rules: {},
  },
]);
