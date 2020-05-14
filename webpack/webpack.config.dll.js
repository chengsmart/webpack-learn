const path = require('path');
const webpack = require('webpack');

const projectRoot = process.cwd();

const dllConf = {
  // mode: 'production',
  // stats: 'minimal',
  // context: projectRoot,
  // resolve: {
  //   extensions: ['.js', '.json', '.tsx', '.ts', '.css', '.less'],
  //   modules: [__dirname, '../node_modules']
  // },
  entry: {
    library: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, '../src/dll'),
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '../src/dll/[name]-manifest.json') // manifest.json
    }),
  ]
};

module.exports = dllConf;