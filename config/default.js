const ip = require('ip').address() || '127.0.0.1';
const PORT = 3824;
module.exports = {
  envName: 'DEV',
  port: PORT,
  indexPage: 'home.html',
  openPage: 'home.html',
  hostname: `${ip}:${PORT}/`, // combo 将要替换的域名
  domain: `//${ip}:${PORT}/`, // 替换后域名
  apiDomain: '//m.10101111.com/',
};