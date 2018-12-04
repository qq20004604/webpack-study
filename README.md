程序员技术交流、面试、职场、生活、游戏、相亲，综合讨论QQ群：387017550，群内经常发红包，欢迎加入

核心竞争力：每周一次免费面试，在YY频道直播，可旁听，有往期录音

<h3>0、前注</h3>

本文内容源于[webpack中文文档](https://doc.webpack-china.org/concepts/)，以及我自己实践中写的若干DEMO。

每个DEMO以文件夹为单位，从入门到进阶，根据文件夹编号为准，逐步递进。

成文时，webpack版本是【3.8.1】

交流QQ群：387017550

<h3>0.1、安装webpack</h3>

首先你需要安装Node.js，[点击打开Node.js下载页面](https://nodejs.org/zh-cn/download/)。安装完Node.js后，会自带npm包管理器。

>npm install webpack -g

这个命令将安装最新版本的webpack（全局，学习教程中推荐，避免多次安装。但实践中还是有必要一个项目一个webpack，避免版本冲突带来的bug）

目前版本是3.8.1（2017/11/27）

>webpack -v

查看当前webpack版本

<b>执行命令：</b>

以下执行webpack命令时，指在对应文件夹下，通过控制台执行命令。

<b>快速抵达对应目录的控制台（win）：</b>

在对应目录下，按住 ``shift``，然后点击鼠标右键，在弹窗里选择``在此处打开命令窗口``即可启用

<b>MAC 快速打开某个目录的终端：</b>

参考[这个链接](https://blog.phpgao.com/open_terminal_in_finder.html)

<h3>0.2、命令执行</h3>

>安装（fork项目后，第一次运行每个项目之前，都需要执行一遍）

```
npm install
```

> 执行（不同项目，执行的命令可能不同，参照每个项目的文档，或者 package.json 里的 scripts 里的值）

```
// 一般使用（没有特殊要求，表示这个只是为了熟悉功能）
npm run test

// 开发环境使用（从 7、HMR 一节开始添加，）
npm run dev

// 生产环境使用（一般用于实战项目，或该项目同时有开发和生产两个版本的webpack配置）
npm run build
```

<h3>0.3、webpack的版本</h3>

当我们全局安装webpack之后，package.json 里也会有webpack，这两个webpack的版本，可能是不一样的。

那么当我们打包的时候，如何确认当前使用的是哪一个webpack版本呢？

<b>使用全局的webpack的版本</b>

通过直接执行 ``webpack`` 命令，将使用全局的 webpack 版本

```
webpack
```

<b>使用当前项目的webpack版本</b>

当我们通过 ``npm`` 命令来执行时，将使用当前项目的 webpack 版本。

例如：

```
npm run build
```

就将使用 ``node_modules`` 里面的 webpack 的版本。

<h3>0.4、快捷链接，点击快速抵达对应项目目录</h3>

[1、最简单的webpack实例](https://github.com/qq20004604/webpack-study/tree/master/1%E3%80%81%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84webpack%E5%AE%9E%E4%BE%8B)

[2、简单指令（npm脚本）](https://github.com/qq20004604/webpack-study/tree/master/2%E3%80%81%E7%AE%80%E5%8D%95%E6%8C%87%E4%BB%A4%EF%BC%88npm%E8%84%9A%E6%9C%AC%EF%BC%89)

[3、入口（多入口）](https://github.com/qq20004604/webpack-study/tree/master/3%E3%80%81%E5%85%A5%E5%8F%A3%EF%BC%88%E5%A4%9A%E5%85%A5%E5%8F%A3%EF%BC%89)

[4、出口](https://github.com/qq20004604/webpack-study/tree/master/4%E3%80%81%E5%87%BA%E5%8F%A3)

[5、Loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader)

1. [babel-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/babel_loader)：用于将es6、es7等语法，转换为es5语法；
2. [css-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader)：用于处理css文件（主要是处理图片的url）；
3. [style-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/style_loader)：将转换后的css文件以 style 标签形式插入 html 中；
4. [postcss-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/postcss_loader)：一般用于添加兼容性属性前缀；
5. [less-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/less_loader)：以 less 语法来写 css ；
6. [url-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/url_loader)：用于将图片小于一定大小的文件，转为 base64 字符串；
7. [file-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/file_loader)：``url-loader`` 不能转换 base64字符串 的文件，被这个处理（主要用于设置打包后图片路径，以及CDN等）；
8. [html-withimg-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/html_withimg_loader)：用于加载html模板；

[6、开发环境](https://github.com/qq20004604/webpack-study/tree/master/6%E3%80%81%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)

[7、HMR 模块热加载](https://github.com/qq20004604/webpack-study/tree/master/7%E3%80%81HMR%20%E6%A8%A1%E5%9D%97%E7%83%AD%E5%8A%A0%E8%BD%BD)

[【实战１】打包一个CDN引入的jQuery项目](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%91%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AACDN%E5%BC%95%E5%85%A5%E7%9A%84jQuery%E9%A1%B9%E7%9B%AE)

[【实战２】打包一个bootstrap项目（打包文件带hash）](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%92%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AAbootstrap%E9%A1%B9%E7%9B%AE%EF%BC%88%E6%89%93%E5%8C%85%E6%96%87%E4%BB%B6%E5%B8%A6hash%EF%BC%89)

[【实战３】打包有es6、es7语法的js代码](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%93%E3%80%91%E6%89%93%E5%8C%85%E6%9C%89es6%E3%80%81es7%E8%AF%AD%E6%B3%95%E7%9A%84js%E4%BB%A3%E7%A0%81)

[【实战４】打包带异步加载功能的模块](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%94%E3%80%91%E6%89%93%E5%8C%85%E5%B8%A6%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD%E5%8A%9F%E8%83%BD%E7%9A%84%E6%A8%A1%E5%9D%97)

[【实战５】打包一个具有常见功能的多页项目](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%95%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AA%E5%85%B7%E6%9C%89%E5%B8%B8%E8%A7%81%E5%8A%9F%E8%83%BD%E7%9A%84%E5%A4%9A%E9%A1%B5%E9%A1%B9%E7%9B%AE)