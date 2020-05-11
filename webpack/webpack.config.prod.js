const baseWebpackConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
});
module.exports = webpackConfig;