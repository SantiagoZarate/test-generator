import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["./src/**/*.ts"],
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  prettierPlugin,
  ...tseslint.configs.recommended,
];
