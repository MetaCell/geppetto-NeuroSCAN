module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/prop-types': 0,
  },
  globals: {
    window: true,
  }
};
