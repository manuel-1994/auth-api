import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importAlias from 'eslint-plugin-import-alias';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'import-alias': importAlias,
    },
    rules: {
      'import-alias/import-alias': [
        'error',
        {
          relativeDepth: 0, // Prohíbe ../
          aliases: [{ alias: '@', matcher: '^src' }],
        },
      ],
    },
  },
];
