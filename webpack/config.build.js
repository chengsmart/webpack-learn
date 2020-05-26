const TerserPlugin = require('terser-webpack-plugin');

const getConfig = require('./config.base');

const getBuildConfig = (options) => {
  const buildConfig = getConfig({})
  buildConfig.mode('production');
  buildConfig.optimization.minimizer('TerserPlugin')
    .use(TerserPlugin, [{
      parallel: true,
      cache: true
    }]);

  return buildConfig;
};
module.exports = getBuildConfig;