const baseWebpackConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [new WebpackBundleAnalyzer()], // 打包体积展示工具
});
module.exports = webpackConfig;