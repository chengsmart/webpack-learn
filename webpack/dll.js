const webpack = require('webpack');
const dllConf = require('./webpack.config.dll');
const chalk = require('chalk');

webpack(dllConf, (err, stats) => {

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