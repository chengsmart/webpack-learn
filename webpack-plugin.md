# webpack-plugin 整理

常见的 webpack plugin 功能介绍以及使用方法

---

## webpack-bundle-analyzer

打包体积展示工具，适用于测试或者本地环境，分析打包的体积以及相互关系

```javascript

const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [new WebpackBundleAnalyzer()],

```

---

## hard-source-webpack-plugin

缓存加速

```javascript

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

plugins: [new HardSourceWebpackPlugin()],

```

---

## friendly-errors-webpack-plugin

webpack 构建友好提示

```javascript

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

plugins: [new FriendlyErrorsWebpackPlugin()],

```
