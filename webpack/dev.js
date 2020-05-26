const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');

const getDevConfig = require('./config.dev');
const defaultConfig = require('./config.default');

const devSerOptions = {
  quiet: true,
  contentBase: path.join(process.cwd(), 'dist'), //静态文件根目录
  port: defaultConfig.dev.port, // 端口
  host: require('ip').address(),
  index: defaultConfig.indexPage,
  openPage: defaultConfig.indexPage,
  open: defaultConfig.dev.isOpenBrowser,
  hot: true,
  overlay: true,
  compress: false, // 服务器返回浏览器的时候是否启动gzip压缩
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: true,
  },
};
const compiler = webpack(
  merge(getDevConfig().toConfig(), defaultConfig.confWebpack)
);
const server = new WebpackDevServer(compiler, devSerOptions);
server.listen(8888, '0.0.0.0', () => {
  console.log(chalk.green(`Starting server`));
});
