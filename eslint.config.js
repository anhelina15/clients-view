import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

const ERROR = 'error';
const OFF = 'off';

export default defineConfig([
  globalIgnores([
    'dist',
    'node_modules',
    '*.log',
    '.env*',
    '.vscode',
    '.idea',
    '.DS_Store',
    'pnpm-lock.yaml',
  ]),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Core ESLint rules
      'no-unused-vars': OFF, // Handled by @typescript-eslint/no-unused-vars
      '@typescript-eslint/no-unused-vars': [
        ERROR,
        { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' },
      ],
      curly: [ERROR, 'all'],
      'no-console': [ERROR, { allow: ['warn', 'error'] }],

      // Padding line rules
      'padding-line-between-statements': [
        ERROR,
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],

      // Import rules
      'import/no-duplicates': ERROR,
      'import/order': [
        ERROR,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
        },
      ],

      // Prettier rules
      'prettier/prettier': ERROR,
    },
  },
]);
