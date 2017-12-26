<h2>VUE-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/vue_loader)地址

<h3>0、使用说明</h3>

首先你得会用 Vue.js，不然可能对本文部分内容无法理解

安装：

```
npm install
```

运行：

```
// 开发模式（推荐使用这个）
npm run dev

// 普通模式（需要执行后手动刷新页面）
npm run test
```

单独安装 Vue-loader：

1. 首先要有 Vue；
2. 其次解析 vue 文件还要 ``vue-template-compiler``；
3. 解析 css 内容当然还要 ``css-loader``，以及配套的 ``style-loader``。

```
npm i --s vue
npm i --s vue-loader
npm i --s vue-template-compiler
npm i --s css-loader
npm i --s style-loader
```

通过以上安装，至少可以开始使用了

<h3>1、概述</h3>

简单来说，``vue-loader`` 就是处理 ``.vue`` 文件的。

但单独一个 ``vue-loader`` 并不能解决问题，因此还需要一些其他的东西。

<b>【1】</b> ``vue-template-compiler``：关于他的作用，根据 ``readme.md`` 文件中所介绍的：

>This package can be used to pre-compile Vue 2.0 templates into render functions to avoid runtime-compilation overhead and CSP restrictions. You will only need it if you are writing build tools with very specific needs. In most cases you should be using vue-loader or  vueify instead, both of which use this package internally. 

大致意思就是说，这个用于把 Vue 的模板文件（应该指.vue）预编译为渲染函数，避免运行时再编译带来的性能开销。

就是说 ``.vue`` 文件，在 js 执行时再拆开，然后使用是会消耗很多性能的。

一般情况下，不需要单独用他，用 ``vue-loader`` 就行了（但是你却需要单独安装他，安装 ``vue-loader`` 时是不带这个的）。

<b>【2】</b> 解析 css 内容当然还要 ``css-loader``，以及配套的 ``style-loader``。

根据你的需要，可能还需要更多，但一般情况下，只需要你单独安装好这 2 个就行了（安装``vue-laoder``不会附带安装这 2 个）。


<h3>2、配置</h3>

<h4>2.0、默认配置</h4>

默认配置下，vue-loader只具备基础功能：

1. 将 ``.vue`` 文件拆解成可用的三部分，然后扔到打包后的 ``.js`` 文件；
2. 默认支持 HMR 功能（DEMO里已预置，执行 ``npm run dev`` 可以通过使用）

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h3>3、问题和解决</h3>

<h4>3.1、引入 vue 但是不能正常运行</h4>

打包后，无法正常运行。查看 console，有以下报错：

```
You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

原因可以参照这个文章[Vue 2.0 升（cai）级（keng）之旅](https://segmentfault.com/a/1190000006435886)。

这里简单总结一下，就是