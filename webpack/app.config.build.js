const Config = require('webpack-chain');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract-text-webpack-plugin 废弃后的版本 CSS文件单独提取出来
const getConfig = require('./app.config.base.js');
const TerserPlugin = require('terser-webpack-plugin');

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