module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
  },
  globals: {
    window: true,
  }
};
