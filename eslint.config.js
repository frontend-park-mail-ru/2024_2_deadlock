import prettier from 'eslint-plugin-prettier';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['node_modules/*', 'dist/*', '.babelrc.cjs', 'webpack.config.cjs'],
  },
  {
    files: ['**/*.{ts,js}'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error'
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
