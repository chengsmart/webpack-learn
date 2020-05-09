const webpack = require('webpack');
const webpackConf = require('./webpack.config.test');

webpack(webpackConf, () => {});
