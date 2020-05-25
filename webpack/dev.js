const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getDevConfig = require('./app.config.dev.js');
// const config = require('config');
// const confPort = config.get('port');
// const indexPage = config.get('indexPage');
// const openPage = config.get('openPage');

const devSerOptions = {
  quiet: true,
  contentBase: path.join(process.cwd(), 'dist'), //静态文件根目录
  port: 8888, // 端口
  host: require('ip').address(),
  index: 'home.html',
  openPage: 'home.html',
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

const server = new WebpackDevServer(webpack(getDevConfig({}).toConfig()), devSerOptions);
server.listen(8888, '0.0.0.0', () => {
  // console.log(chalk.green(`Starting server on http:${domain}`));
});