const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require('@craco/craco');

module.exports = {
  babel: {
    presets: [
      '@babel/preset-react',
    ],
    plugins: [],
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const config = { ...webpackConfig };
      const objLoader = {
        test: /\.obj|\.drc|\.gltf/,
        loader: 'url-loader',
      };
      const rule = config.module.rules[1];
      if (!rule || !('oneOf' in rule)) {
        throw new Error('Craco config needs updating, CRA has been updated.');
      }
      rule.oneOf = [objLoader, ...rule.oneOf];
      return config;
    },
  },
};
