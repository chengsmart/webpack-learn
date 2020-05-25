const Config = require('webpack-chain');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空打包目录的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // extract-text-webpack-plugin 废弃后的版本 CSS文件单独提取出来
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); //CSS文件单独提取出来
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); // 缓存加速
const conf = require('./app.config.default');

const devMode = process.env.NODE_ENV !== 'production';

const getConfig = (options) => {
  const cwd = options.cwd || process.cwd();
  const config = new Config();
  config.context(cwd);

  // entry
  const setMPA = () => {
    const entryFiles = glob.sync(path.join(cwd, './src/*/index.js'));

    Object.keys(entryFiles).map((index) => {
      const entryFile = entryFiles[index];
      // '/Users/cpselvis/my-project/src/index/index.js'

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      config.entry(pageName).add(entryFile).end();
      config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [{
        inlineSource: '.css$',
        template: path.join(cwd, `./src/${pageName}/index.html`),
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
      }, ]);
    });
  };
  setMPA();
  config.end();

  // resolve
  config.resolve.modules
    .add('node_modules')
    .end()
    .extensions.merge([
      '.web.js',
      '.js',
      '.json',
      '.tsx',
      '.ts',
      '.ejs',
      '.jsx',
      '.css',
      '.png',
      '.jpg',
      '.less',
      '.scss',
      '.sass',
    ]);
  config.externals(conf.externals);

  // alias
  Object.keys(conf.alias).forEach((name) => {
    config.resolve.alias.set(`${name}`, conf.alias[`${name}`]);
  });

  // module
  config.module
    .rule('js')
    .test(/\.js$/)
    .include.add(path.join(cwd, 'src'))
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options({
      cacheDirectory: true,
    })
    .end()
    .use('thread-loader')
    .loader(require.resolve('thread-loader'))
    .options({
      workers: 3,
    });

  config.module
    .rule('tsx')
    .test(/\.tsx?$/)
    .include.add(path.join(cwd, 'src'))
    .end()
    .exclude.add(path.join(cwd, 'node_modules'))
    .end()
    .use('ts-loader')
    .loader(require.resolve('ts-loader'))
    .options({
      transpileOnly: true,
    });


  // config.module
  // .rule('less')
  // .test(/\.(less|css)$/)
  // .include.add(path.join(cwd, 'src'))
  // .end()
  // .exclude.add(path.join(cwd, 'node_modules'))
  // .end()
  // .use('MiniCssExtractPlugin-loader')
  // .loader(MiniCssExtractPlugin.loader)
  // .end()
  // .use('css-loader')
  // .loader(require.resolve('css-loader'))
  // .options({
  //   sourceMap: true
  // })
  // .end()
  // .use('less-loader')
  // .loader(require.resolve('less-loader'))




  config.module
    .rule('css')
    .test(/^((?!\.module).)*css$/)
    .include.add(path.join(cwd, 'src'))
    .end()
    .exclude.add(path.join(cwd, 'node_modules'))
    .end()
    .use('MiniCssExtractPlugin-loader')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      sourceMap: devMode,
    })

  config.module
    .rule('module-css')
    .test(/\.module\.css$/)
    .include.add(path.join(cwd, 'src'))
    .end()
    .exclude.add(path.join(cwd, 'node_modules'))
    .end()
    .use('MiniCssExtractPlugin-loader')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      sourceMap: devMode,
      modules: true,
    });

  config.module
    .rule('less')
    .test(/^((?!\.module).)*less$/)
    .include.add(path.join(cwd, 'src'))
    .end()
    .exclude.add(path.join(cwd, 'node_modules'))
    .end()
    .use('MiniCssExtractPlugin-loader')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      sourceMap: devMode,
    })
    .end()
    .use('less-loader')
    .loader(require.resolve('less-loader'));

  config.module
    .rule('module-less')
    .test(/\.module\.less$/)
    .include.add(path.join(cwd, 'src'))
    .end()
    .exclude.add(path.join(cwd, 'node_modules'))
    .end()
    .use('MiniCssExtractPlugin-loader')
    .loader(MiniCssExtractPlugin.loader)
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({
      sourceMap: devMode,
      modules: true,
    })
    .end()
    .use('less-loader')
    .loader(require.resolve('less-loader'));

  config.module
    .rule('image')
    .test(/\.(png|jpg|jpeg|gif|svg)/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options({
      name: 'img/[name].[hash:7].[ext]',
      publicPath: '../',
      // outputPath: path.join(cwd, 'images'), // 图片输出的路径
      limit: 10 * 1024,
    });

  // plugin
  config
    .plugin('.providePlugin')
    .use(webpack.ProvidePlugin, [conf.provideDefs]);
  config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [{
    filename: '[name]_[contenthash:8].css',
  }, ]);
  config.plugin('CleanWebpackPlugin').use(CleanWebpackPlugin, [{
    cleanOnceBeforeBuildPatterns: [path.join(cwd, 'dist')],
  }, ]);
  config.plugin('HardSourceWebpackPlugin').use(HardSourceWebpackPlugin, []);
  config
    .plugin('friendlyErrorsWebpackPlugin')
    .use(friendlyErrorsWebpackPlugin, []);

  return config;
};
module.exports = getConfig;