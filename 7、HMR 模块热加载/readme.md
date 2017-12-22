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
4. 如果中途被捕获，那么将只重新加载该模块（并不会重新加载子模块），并触发捕获函数的回调函数；

更具体的内容，请查看官网的说明，附链接如下：

[依赖图(Dependency Graph)](https://doc.webpack-china.org/concepts/dependency-graph/)

[模块热替换(Hot Module Replacement)（注：原理）](https://doc.webpack-china.org/concepts/hot-module-replacement/)

[模块热替换（注：使用方法）](https://doc.webpack-china.org/guides/hot-module-replacement/)

<h4>7.2、应用场景</h4>

HMR 的应用场景，最合适的是带 HMR 功能的loader。

例如 ``style-loader``，或 ``vue-loader``。

原因很简单，自己在页面里写 HMR 冒泡捕获功能，写起来很麻烦，也很容易导致遗漏。

最重要的是，这些代码并不是业务代码，而是 HMR 专用代码，这些代码会在webpack打包时被打包进去（可以查看打包好后的源代码）Z，但这没有意义。

因此在 loader 里进行处理，对模块的加载才是更加有效的。

具体可以参照下面的示例DEMO。

<h4>7.3、使用说明</h4>

在使用前，需要明白 HMR 的几个特点：

1. HMR 是向上冒泡的：子模块被更改后，会去找他的父模块，查看有没有 HMR 的处理代码，如果没有，那么会继续向上冒泡；
2. 捕获是父子关系：假如依赖是 A->B->C，C 更改，找 B，发现没有处理代码，于是找 A。此时，视为 B 被更改，因此 A 的处理代码，处理的是 B。如果 A 里面处理的是 C，那么是不响应的；
3. 处理后，会重新执行整个模块的代码；


<h4>7.4、示例</h4>

为了说明 HMR 是怎么使用和生效，这里将给一个最简单的示例，包含 html、css、和 js 代码，来解释其的使用方法。

需要使用的东西：

1. 使用 webpack-dev-server，参考上一篇[6、开发环境](https://github.com/qq20004604/webpack-study/tree/master/6%E3%80%81%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)；
2. 两个HMR插件：``webpack.NamedModulesPlugin``，``webpack.HotModuleReplacementPlugin`` ；
3. 配置一下 ``package.json``，添加一行 scripts ：`` "dev": "webpack-dev-server --open --config webpack.config.js"``；
4. style-loader，用于实现 css 的 HMR（使用后默认开启）；

依赖图：

```
app.js        入口文件，在其中配置了 foo.js 和 bar.js 的 HMR 处理函数
├─style.css   样式文件
├─img
│  ├─1.jpg    图片1
│  └─2.jpg    图片2
├─foo.js      模块foo，配置了 HMR 模块热替换的接口
├─bar.js      模块bar，是foo的子模块
└─DOM.js      抽象出一个创造 DOM，并插入到 body 标签的函数
```

三个js文件，效果很简单，分别创建一个DOM，并且内部各有一条 ``console.log(‘xxx is running')`` 代码，

```
// app.js


```