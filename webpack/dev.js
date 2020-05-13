const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConf = require('./webpack.config.dev');
const config = require('config');
const confPort = config.get('port');
const indexPage = config.get('indexPage');
const openPage = config.get('openPage');

const devSerOptions = {
  quiet: true,
  contentBase: path.join(process.cwd(), 'dist'), //静态文件根目录
  port: confPort, // 端口
  host: require('ip').address(),
  index: indexPage,
  openPage: openPage,
  open: true,
  hot: true,
  overlay: true,
  compress: false, // 服务器返回浏览器的时候是否启动gzip压缩
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: true,
  },

};

const server = new WebpackDevServer(webpack(webpackConf), devSerOptions);
server.listen(confPort, '0.0.0.0', () => {
  // console.log(chalk.green(`Starting server on http:${domain}`));
});