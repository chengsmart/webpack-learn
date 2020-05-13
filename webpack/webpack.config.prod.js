const baseWebpackConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      // 多进程加速压缩，parallel为true默认为cpu物理核心*2-1，如双核为3，false为不加速
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
});
module.exports = webpackConfig;
