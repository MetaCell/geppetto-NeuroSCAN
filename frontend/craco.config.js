const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES
} = require('@craco/craco');

module.exports = {
  babel: {
    presets: ['@babel/preset-react'],
    plugins: [],
  },
};
