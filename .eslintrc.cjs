module.exports = {
  globals: {
    RequestInit: true,
  },
  extends: [
    // Airbnb configuration for ESLint & React rules
    'airbnb',
    'airbnb/hooks',

    // NextJS rules
    'next/core-web-vitals',

    // Accessibility rules
    'plugin:jsx-a11y/recommended',

    // Enforce Prettier formatting
    'prettier',
  ],
  plugins: [
    'unused-imports',
    'promise',
    'compat',
    'simple-import-sort',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    // Prettier rules
    'prettier/prettier': ['error'],

    // React rules
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-filename-extension': 'off',

    // Turn off in favor of @typescript-eslint/no-unused-vars
    'no-unused-vars': 'off',

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // Rules for imports
    'unused-imports/no-unused-imports': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // "react" should always show first
          ['^(react)$'],
          // All 3rd - party imports
          ['^(?!(app\\/)|(.*.scss)|(\\.)).*$'],
          // SCSS files
          ['^.*.scss$'],
          // local absolute imports
          ['^(app\\/).*$'],
          // local relative imports
          ['^\\.'],
        ],
      },
    ],

    // Other rules
    'promise/always-return': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    curly: 'error',
  },
};
