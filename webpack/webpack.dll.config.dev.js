const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态资源的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin'); //CSS文件单独提取出来
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); //CSS文件单独提取出来
const webpack = require('webpack');

const webpackConf = {
  entry: {
    // 第三方库
    react: ['react', 'react-dom']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    filename: '[name].dll.js',
    path: path.resolve(process.cwd(), 'src', 'dll'),
    // library必须和后面dllplugin中的name一致 后面会说明
    library: '[name]_dll_[hash]'
  },
  plugins: [
    // 接入 DllPlugin
    new webpack.DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      name: '[name]_dll_[hash]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(process.cwd(), 'src', 'dll', '[name].manifest.json')
    }),
  ]
}

module.exports = webpackConf;