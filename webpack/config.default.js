const { existsSync } = require('fs');
const { resolve } = require('path');

const cwd = process.cwd();

const defaultConf = {
  DefinePlugin: [],
  confWebpack: {},
  otherHtmlConfig: {},
  alias: {},
  provideDefs: {},
  externals: {},
  isAntd: false,
  indexPage: 'home.html',
  dev: {
    port: 3000,
    isOpenBrowser: true,
  },
};
const mergeConfig = () => {
  if (existsSync(resolve(cwd, 'app.config.js'))) {
    return Object.assign(defaultConf, require(resolve(cwd, 'app.config.js')));
  }
  return defaultConf;
};
module.exports = mergeConfig();
