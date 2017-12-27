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

本文除了涉及到 webpack 中 vue-loader 的使用方法外，还包括 ``.vue`` 文件的一些独有使用方法。

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

<b>【1】``.vue`` 文件拆解：</b>

将 ``.vue`` 文件拆解成可用的三部分，然后扔到打包后的 ``.js`` 文件；

<b>【2】HMR功能：</b>

默认支持 HMR 功能（DEMO里已预置，执行 ``npm run dev`` 可以通过使用）；

<b>【3】css局部作用域：</b>

支持组件的 css 使用局部作用域，在 style 标签添加 ``scoped`` 即可。

例如：``<style scoped></style>``，这样的话，该组件内的样式只会对该组件生效（原理是给对应的组件加指定属性名，然后 css 选择器里也加上属性选择器）；

支持在组件使用 scoped 属性的情况下，让某些样式影响子元素。方法是使用 ``/deep/`` 或 ``>>>`` 关键字，该关键字前的选择器，会加局部作用域；该关键字后面的选择器，不会加局部作用域。例如``.app /deep/ .child`` 会被编译为：··.app[data-v-04c2046b] .child··

<b>【4】CSS Modules</b>

简单来说，就是可以将 ``<style></style>`` 标签内的东西，加了 ``module`` 属性后，可以直接在 vue 组件后，获取重命名后的类名。

可以用作模拟 css 作用域的解决方案。

详细说明见本文【3.1】

<b>【4】</b>

<b>【4】</b>

<b>【4】</b>

---

需要额外配置才有的功能：

<b>【1】es6代码转换成es5：</b>

通过配置，可以将 ``<script>`` 里的 es6代码。

指例如 created 这个函数里，使用的 es6 代码。

而 created 本身即可以用 ``created: function(){}`` ，也可以用 ``created()``，都能正常识别），自动通过 babel 编译为 es5 的代码；

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h4>2.0、</h4>

<h3>3、vue-loader 支持的功能</h3>

<h4>3.1、CSS Modules</h4>

简单来说，就是模块化css。

如果看过我的 [css-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader#28modules%E7%AD%89) 这一篇的【2.8、modules等】，可能就能体会到 css-loader 的这个功能是如何在这里实现的了。

例如，假如我在 ``.vue`` 文件里加了以下标签。

```
<!-- 调用方法示例：<div :class="$style.test"> -->
<style module>
    .test {
        border: 2px solid gold;
    }
</style>

<!-- 调用方法示例： <div :class="foo.bar"> -->
<style module="foo">
    .bar {
        position: relative;
        animation: move 2s linear infinite;
    }

    @keyframes move {
        0% {
            left: 0;
        }
        50% {
            left: 100px;
        }
        100% {
            left: 0;
        }
    }
</style>
```

那么编译后，代码会变成以下情况：

```
<style type="text/css">
    ._1MwiT3GNpEBkInFbvenNqf_1 {
        border: 2px solid gold;
    }
</style>

<style type="text/css">
    ._2zuIotdSd4Qw4JyIOKek2x_2 {
        position: relative;
        animation: _1Uijvgp95FT2K79a3BqAeg_2 2s linear infinite;
    }

    @keyframes _1Uijvgp95FT2K79a3BqAeg_2 {
        0% {
            left: 0;
        }
        50% {
            left: 100px;
        }
        100% {
            left: 0;
        }
    }
</style>
```

也就是说，加上 modules 属性后，原本的样式名会被重命名，然后可以通过变量来获取重命名后的名字。

获取方法如下：

【1】只有 ``module`` 属性的 ``<style>`` 标签中的 class 类名，通过 ``$style.类名`` 来获取，例如： ``$style.test``；

【2】``module``属性被命名（例如 ``module="foo"``），通过 ``module名.类名``来获取，例如： ``foo.bar``；

这个变量在对应组件中，可以通过 ``this.$style.test`` 或者 ``foo.bar`` 来获取，

```
console.log(this.$style);    // {test: "_1MwiT3GNpEBkInFbvenNqf_1"}
```

<h4>3.1、CSS Modules</h4>

<h4>3.1、CSS Modules</h4>

<h4>3.1、CSS Modules</h4>

<h4>3.1、CSS Modules</h4>

<h3>4、问题和解决</h3>

<h4>4.1、引入 vue 但是不能正常运行</h4>

打包后，无法正常运行。查看 console，有以下报错：

```
You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

原因可以参照这个文章[Vue 2.0 升（cai）级（keng）之旅](https://segmentfault.com/a/1190000006435886)。

这里简单总结一下，就是