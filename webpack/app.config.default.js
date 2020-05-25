// import {
//   resolve
// } from 'path';
// import {
//   existsSync
// } from 'fs';
// import {
//   DefinePlugin
// } from 'webpack';
const {
  DefinePlugin
} = require('webpack');
const {
  existsSync
} = require('fs');
const {
  resolve
} = require('path');

const cwd = process.cwd();

const defaultConf = {
  DefinePlugin: [],
  confWebpack: {},
  otherHtmlConfig: {},
  alias: {},
  provideDefs: {},
  isAntd: false,
  indexPage: 'home.html',
}
const mergeConfig = () => {
  if (existsSync(resolve(cwd, 'app.config.js'))) {
    return Object.assign(
      defaultConf,
      require(resolve(cwd, 'app.config.js'))
    );
  }
  return defaultConf;
};
module.exports = mergeConfig();