const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制静态资源的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录的插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract-text-webpack-plugin 废弃后的版本 CSS文件单独提取出来
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); //CSS文件单独提取出来
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 缓存加速
// const PurgecssPlugin = require('purgecss-webpack-plugin'); // 清理没有用到的css代码【注意，该插件可能导致npm包样式缺失】
const webpack = require('webpack');
// const config = require('config');
// const envName = config.get('envName');

const projectRoot = process.cwd();
const PATHS = {
  src: path.join(__dirname, 'src'),
};

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    // '/Users/cpselvis/my-project/src/index/index.js'

    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: '.css$',
        template: path.join(projectRoot, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

const webpackConf = {
  mode: 'development',
  stats: 'errors-only',
  entry: entry,
  output: {
    publicPath: '', //这里要放的是静态资源CDN的地址
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name]_[hash].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.tsx', '.ts', '.css', '.less'],
    modules: [path.resolve(projectRoot, 'node_modules')],
    alias: {}, //配置别名可以加快webpack查找模块的速度
  },
  module: {
    // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3,
            },
          },
          'babel-loader?cacheDirectory=true',
        ],
        include: path.join(projectRoot, 'src'),
      },
      {
        test: /\.tsx?$/,
        exclude: [
          path.join(projectRoot, 'node_modules'),
          // path.join(projectRoot, 'src', 'dll'),
        ],
        include: path.join(projectRoot, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: path.join(projectRoot, 'src'), //限制范围，提高打包速度
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        include: path.join(projectRoot, 'src'),
        exclude: /node_modules/,
      },
      {
        // file-loader 解决css等文件中引入图片路径的问题
        // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[hash:7].[ext]',
              publicPath: '../',
              // outputPath: path.join(projectRoot, 'images'), // 图片输出的路径
              limit: 10 * 1024,
            },
          },
          // {
          //   loader: 'image-webpack-loader', // 图片压缩
          //   options: {
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 65,
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false,
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.9],
          //       speed: 4,
          //     },
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     // the webp option will enable WEBP
          //     webp: {
          //       quality: 75,
          //     },
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // 全局变量
      // ENV_NAME: JSON.stringify(envName),
    }),
    // 设定全局引入
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      // 'window.Quill': 'quill',
      // 'window.hljs': 'highlight.js',
      // _: 'lodash', //所有页面都会引入 _ 这个变量，不用再import引入
      /* 'hljs': 'highlight.js' */
    }),

    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, {
    //     nodir: true
    //   }),
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(projectRoot, 'dist')],
    }),
    new HardSourceWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(), // webpack构建工具友好提示
  ].concat(htmlWebpackPlugins),
};

module.exports = webpackConf;
