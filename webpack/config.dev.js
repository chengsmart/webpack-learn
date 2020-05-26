const getConfig = require('./config.base');

const getDevConfig = (options) => {
  const devConfig = getConfig({})
  devConfig.mode('development');
  return devConfig;
};
module.exports = getDevConfig;