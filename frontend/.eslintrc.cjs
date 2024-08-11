module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.js', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    "import/prefer-default-export": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react-refresh/only-export-components": 0,
  },
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    'import/resolver': {
      typescript: {
        // Aquí puedes especificar el archivo tsconfig si no está en la raíz del proyecto
        project: './tsconfig.json',
      },
    },
  },
}