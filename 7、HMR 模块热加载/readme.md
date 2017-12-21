<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

<h3>7、模块热加载 HMR</h3>

<h3>7.0、使用说明</h3>

安装：

```
npm install
```

运行（注意，是 <b>dev</b>）：

```
npm run dev
```

<h4>7.1、现象和原理</h4>

当谈到 HMR 的时候，首先要明确一个概念，HMR 到底是什么？

如果用过带 HMR 功能的脚手架，例如我分享的这个 [Vue的脚手架](https://github.com/qq20004604/vue-scaffold)，大约能给出一个答案：

1. 修改代码后，不需要刷新页面，修改后的代码效果，就能立刻体现在页面上；
2. 已有的效果，比如输入框里输入了一些内容，代码更新后，往往内容还在；
3. 似乎想不到其他的了；

从现象来看，在一定程度上，这个描述问题不大，但不严谨。

我们需要分析 HMR 到底是什么？

1. webpack 是模块化的，每个 js, css 文件，或者类似的东西，都是一个模块；
2. webpack 有 [模块依赖图(Dependency Graph)](https://doc.webpack-china.org/concepts/dependency-graph/)，也就是说，知道每个模块之间的依赖关系；
3. HMR 是模块热加载，表现效果是模块被替换后，会把被替换后的新模块的代码重新执行一遍；

以上是理论基础，实际流程如下：

1. 假如 B 模块的代码被更改了，webpack 可以检测到，并且可以知道是哪个更改了；
2. 然后根据 依赖图，发现 A 模块依赖于 B 模块，于是向上冒泡到 A 模块中，判断 A 模块里有没有处理热加载的代码；
3. 如果没有，则继续向上冒泡，直到冒泡到顶层，最后触发页面刷新（如果引用了多个chunk，当一个冒泡到顶层并且没有被处理的话，整个页面都会触发刷新）；
4. 如果中途被捕获，那么将只加载该模块（以及依赖于该模块的所有子模块），并触发捕获函数的回调函数；

更具体的内容，请查看官网的说明，附链接如下：

[依赖图(Dependency Graph)](https://doc.webpack-china.org/concepts/dependency-graph/)

[模块热替换(Hot Module Replacement)（注：原理）](https://doc.webpack-china.org/concepts/hot-module-replacement/)

[模块热替换（注：使用方法）](https://doc.webpack-china.org/guides/hot-module-replacement/)

<h4>7.2、示例</h4>

为了说明 HMR 是怎么使用和生效，这里将给一个最简单的示例，包含 html、css、和 js 代码，来解释其的使用方法。

需要使用的东西：

1. 使用 webpack-dev-server，参考上一篇[6、开发环境](https://github.com/qq20004604/webpack-study/tree/master/6%E3%80%81%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)；
2. 两个HMR插件：``webpack.NamedModulesPlugin``，``webpack.HotModuleReplacementPlugin`` ；
3. 配置一下 ``package.json``，添加一行 scripts ：`` "dev": "webpack-dev-server --open --config webpack.config.js"``；

依赖图：

```
app.js        入口文件，未配置 HMR 处理功能，所以会向上冒泡
├─style.css   样式文件
├─img
│  ├─2.jpg    图片2
│  └─1.jpg    图片1
└─foo.js      模块foo，配置了 HMR 模块热替换的接口
   └─bar.js   模块bar，是foo的子模块
```