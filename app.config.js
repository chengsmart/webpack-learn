const path = require('path');

const cwd = process.cwd();

module.exports = {
  definePlugin: [{
    DOMAIN: JSON.stringify('https://www.test.com'),
  }, ],
  alias: {
    '@homeComponents': path.resolve(cwd, 'src/home/components'),
  },
  provideDefs: {
    $: 'jquery',
    'window.$': 'jquery',
  },
  externals: {
    jQuery: '$',
    jQuery: 'window.$',
  },
  dev: {
    port: 8888,
    isOpenBrowser: false,
  },
  build: {},
  isAntd: false,
  indexPage: 'home.html',
};