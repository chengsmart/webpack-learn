const webpack = require('webpack');
const getBuildConfig = require('./app.config.build');
const chalk = require('chalk');

webpack(getBuildConfig({}).toConfig(), (err, stats) => {
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