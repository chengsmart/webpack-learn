const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态资源的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
// const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin'); //CSS文件单独提取出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract-text-webpack-plugin 废弃后的版本 CSS文件单独提取出来
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); //CSS文件单独提取出来
const webpack = require('webpack');
const config = require('config');
const envName = config.get('envName');

const webpackConf = {
  mode: 'development',
  entry: {
    home: path.resolve(process.cwd(), 'src', 'entry', 'index.ts'),
    vendor: ['lodash', 'react', 'react-dom'], // 多个页面所需的公共库文件，防止重复打包带入
  },
  output: {
    publicPath: '', //这里要放的是静态资源CDN的地址
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts', '.css', '.less'],
    alias: {}, //配置别名可以加快webpack查找模块的速度
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules: [{
        test: /\.tsx?$/,
        exclude: [
          path.join(process.cwd(), 'node_modules'),
          path.join(process.cwd(), 'src', 'dll'),
        ],
        include: path.join(process.cwd(), 'src'),
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        }, ],
      },
      {
        test: /\.css$/,

        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: path.join(process.cwd(), 'src'), //限制范围，提高打包速度
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        include: path.join(process.cwd(), 'src'),
        exclude: /node_modules/,
      },
      // {
      //   test: /\.jsx?$/,
      //   use: {
      //     loader: 'babel-loader',
      //     query: { //同时可以把babel配置写到根目录下的.babelrc中
      //       presets: ['env', 'stage-0'] // env转换es6 stage-0转es7
      //     }
      //   }
      // },
      {
        //file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[hash:7].[ext]',
            publicPath: '../',
            // outputPath: path.join(process.cwd(), 'images'), // 图片输出的路径
            limit: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV_NAME: JSON.stringify(envName),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.Quill': 'quill',
      'window.hljs': 'highlight.js',
      // _: 'lodash', //所有页面都会引入 _ 这个变量，不用再import引入
      /* 'hljs': 'highlight.js' */
    }),
    // 多入口的html文件用chunks这个参数来区分
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src', 'home.html'),
      filename: 'home.html',
      chunks: ['home', 'vendor'],
      hash: true, //防止缓存
      minify: {
        removeAttributeQuotes: true, //压缩 去掉引号
      },
    }),
    // new ExtractTextWebapckPlugin('css/[name].[hash].css'), // 其实这个特性只用于打包生产环境，测试环境这样设置会影响HMR
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(process.cwd(), "static"),
    //     to: path.resolve(process.cwd(), "dist/static"),
    //     ignore: [".*"],
    //   },
    // ]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'dist')],
    }),
    // new CleanWebpackPlugin([path.join(process.cwd(), 'dist')]),
    new friendlyErrorsWebpackPlugin(), // webpack构建工具友好提示
  ],
};

module.exports = webpackConf;