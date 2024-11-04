import pluginJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  prettierPlugin,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
    plugins: {
      jest: jestPlugin,
    },
  },
];
