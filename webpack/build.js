const webpack = require('webpack');
const chalk = require('chalk');

const getBuildConfig = require('./config.build');
const defaultConfig = require('./config.default');

const config = merge(getBuildConfig().toConfig(), defaultConfig.confWebpack);
webpack(config, (err, stats) => {
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