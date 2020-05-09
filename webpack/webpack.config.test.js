const baseWebpackConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
});
module.exports = webpackConfig;
