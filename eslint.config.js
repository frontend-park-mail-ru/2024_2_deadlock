import prettier from 'eslint-plugin-prettier';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/*', 'dist/*', '.babelrc.cjs', 'webpack.config.cjs'],
  },
  {
    env: {
      browser: true, // Указывает, что код будет выполняться в браузерной среде
      node: true, // Указывает, что код будет выполняться в среде Node.js
      es6: true, // Указывает использование ES6 (ECMAScript 2015) синтаксиса
    },
    files: ['**/*.{ts,js}'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
);
