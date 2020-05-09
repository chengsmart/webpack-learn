const baseWebpackConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

let webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map', // 指定加source-map的方式
  watch: true, // 开启监听文件更改，自动刷新
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000, //每秒询问的文件变更的次数
  },
});
module.exports = webpackConfig;