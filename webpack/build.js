const webpack = require('webpack');
const webpackConf = require('./config.build');
const chalk = require('chalk');

webpack(webpackConf, (err, stats) => {
  if (err) throw err;
  process.stdout.write(
    `${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })}\n\n`
  );

  console.log(chalk.green(' 编译完成。\n'));
});