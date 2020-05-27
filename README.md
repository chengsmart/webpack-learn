# webpack-learn

webpack 构建、优化学习实践，从零构建 webpack 打包项目实践。

---

## 基础部分

webpack 简单打包：
该部分代码参照

> [tag v1.0.1](https://github.com/chengsmart/webpack-learn/releases/tag/v1.0.1)  
> [base-webpack-build 分支](https://github.com/chengsmart/webpack-learn/tree/base-webpack-build)

## 封装 cli

规范代码，重新规划相关功能和模块的分配，添加`app.config.js`

### 使用方法

因为是一个学习项目，没有提交到 npm 发布，只能使用本地安装进行尝试

- 下载该项目
- 新建项目，在项目根目录下安装该 cli 项目，`npm i {cli_local_path}`
- 运行项目执行`./node_modules/.bin/dev`
- 打包项目执行`./node_modules/.bin/build`

## TODO 增加项目模板，添加构建功能

GitHub 存放模板，可以做到模板的更新下载安装，同时适配 cli 进行 dev 以及 build

## 注意事项

本地调试安装脚本需要提前赋权限，mac 系统如下

`chmod 777 {path}`
