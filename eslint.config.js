import prettier from 'eslint-plugin-prettier';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
<<<<<<< HEAD
    ignores: ['node_modules/*', 'dist/*', '.babelrc.cjs', 'webpack.config.cjs'],
  },
  {
    files: ['**/*.{ts,js}'],
=======
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
>>>>>>> c3fa99a (DEAD-1: add linters (#2))
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
);
