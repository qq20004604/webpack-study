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

<h4>7.3.1、HMR 的冒泡</h4>

先假设引用关系： A -> B -> C

<b>【1】HMR 是向上冒泡的：</b>

1. C 被更改后，会去找他的父模块 B，查看 B 中有没有关于 C 的 HMR 的处理代码：
2. 如果没有，那么会继续向上冒泡到 A，查看 A 中有没有关于 B 的 HMR 的处理代码；
3. 如果 A 没有，因为 A 是入口文件，所以会刷新整个页面；

<b>【2】冒泡过程中只有父子关系：</b>

C 更改，冒泡到 B（B 无 HMR 处理代码），然后冒泡到 A。

此时，在 A 这里，视为 B 被更改（而不是 C），

因此 A 里面处理 HMR 代码，捕获的模块，应该是 B，而不是 C，

如果 A 的目标是 C，那么该段代码不会响应（虽然冒泡的起点是 C）；

<b>【3】HMR 触发，会执行整个冒泡流程中涉及到的模块中的代码：</b>

例如上面的 C 更改，B 捕获到了，重新执行 C；

B 无捕获代码向上冒泡，A捕获到了，重新执行 B 和 C；

假如引用关系是：A -> B -> C 和 D，即 B 里面同时引用 C 和 D 两个模块，并且 B 没有处理 HMR 的代码，A 有：

1. 冒泡起点是 B：B 重新执行一遍自己的代码，C 和 D 不会执行；
2. 冒泡起点是 C：B 和 C 重新执行一遍自己的代码， D 不会执行；
3. 冒泡起点是 D：B 和 D 重新执行一遍自己的代码， C 不会执行；

<b>【4】冒泡行为起点的子模块，其代码不会被重新执行：</b>

先假设引用关系：A -> B -> C -> D，B 没有 处理 HMR 的代码，C 有没有无所谓，A 有。

冒泡起点是 C，因此冒泡到 A。

从上面我们可以得知，B 和 C 会被重新执行，那么 D 呢？

答案是不会，因为 D 不在冒泡路线上。

<b>总结：</b>

总结以上四点，得出一个结论：

1. 从修改的模块开始冒泡，直到被捕获为止；
2. 冒泡路径上的代码（不包含捕获到的模块），都会被重新执行；
3. 非冒泡路径上的代码，不管是子模块，或者是兄弟模块，都不会被重新执行（除非是整个页面被刷新）Z。


<h4>7.3.2、HMR 的隐患</h4>

以上特点这就可能带来一些后果（主要是 js 代码）：

1. 假如我代码里，有绑定事件，那么当修改代码并重新执行一遍后，显然会再绑定一次，因此会导致重复绑定的问题（因此要考虑到解绑之前的事件）；
2. 类似的，如果代码里添加了 DOM，那么当重新执行的时候，原本 DOM 节点还在，重新执行的时候又添加了一次；
3. 如果有某些一次性操作，比如代码里移除了某个 DOM，那么很可能 HMR 不能解决你的问题，也许需要重新刷新后，表现才正常；

<h4>7.3.3、HMR 的一个坑</h4>

那就是引用时候的名字，和处理的 API，引用的文件名，需要相同；

举例：

```
// 引入
import foo from './foo.js';

// 处理
module.hot.accept('./foo.js', callback);
```

如果不一样，会导致第一次响应正常，后面就可能导致无法正常触发 HMR ，虽然提示模块更新，但不会重新执行模块的代码。

<h4>7.4、示例</h4>

为了说明 HMR 是怎么使用和生效，这里将给一个最简单的示例，包含 html、css、和 js 代码，来解释其的使用方法。

可以直接 fork 本项目参看源码，以下是分析作用，以及如何生效的。

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
│  └─bar.js   模块bar，是foo的子模块
└─DOM.js      抽象出一个创造 DOM，并插入到 body 标签的函数
```


<b>1、先分析 js 部分</b>

>app.js

```
// 引入资源
import './style.css';
import foo from './foo.js';
import createDOM from './DOM.js'

// 创建一个DOM并插入<body>标签
let el = createDOM({
    id: 'app-box',
    innerHTML: 'app.js<input>'
})
document.body.appendChild(el);

// 本行代码表示app.js已经被执行了一遍
console.log('%c%s', 'color:red;', 'app.js is running...')

// 两个子模块创建DOM并插入<body>标签
foo()

// 这里是控制 HMR 的函数
// 注：
// 这里引用的 foo.js 模块，那么处理 foo.js HMR 效果的代码必须写在这里；
// 特别提示：这段代码不能抽象封装到另外一个js文件中（即使那个js文件也被 app.js import进来）
// 推测是根据webpack的依赖图，向上找父模块，然后在父模块的代码中，找有没有处理 HMR 的代码
if (module.hot) {
    module.hot.accept('./foo.js', function (url) {
        // 回调函数只有url一个参数，类型是数组
        // 执行时机是 foo.js 中的代码执行完毕后执行
        console.log('%c%s', 'color:#FF00FF;', `[${url}] is update`)
    })
}
```

>foo.js

```
// 引入资源
import createDOM from './DOM'
import bar from "./bar.js";
// bar 中创建的DOM逻辑，在 foo 中执行
bar()

// 执行本段代码的时候，表示 foo.js 被重新执行了
console.log('%c%s', 'color:green;', 'foo.js is running...')

function Foo() {
    let el = createDOM({
        id: 'foo-box',
        classList: 'foo',
        innerHTML: 'foo.js<input>'
    })

    document.body.appendChild(el);
}

// 导出给 app.js 执行
export default Foo

// 这里写 bar.js 的 HMR 逻辑
if (module.hot) {
    module.hot.accept('./bar.js', function (args) {
        console.log('%c%s', 'color:#FF00FF', `[${args}] is update`)
    })
}
```

>bar.js

```
// 引入资源
import createDOM from './DOM'

// 执行本段代码的时候，表示 bar.js 被重新执行了
console.log('%c%s', 'color:blue;', 'bar.js is running...')

function Bar() {
    let el = createDOM({
        id: 'bar-box',
        classList: 'bar',
        innerHTML: 'bar.js<input>'
    })

    document.body.appendChild(el);
}

// 导出给 foo.js 执行
export default Bar
```

简单总结一下以上代码：

1. app.js 作为入口文件，他引入了自己的子模块 foo.js，以及 css 资源文件，并且处理自己子模块的 HMR 行为；
2. foo.js 作为 app.js 的子模块，他引入了自己的子模块 bar.js ，并且处理自己子模块的 HMR行为；
3. bar.js 没做什么特殊的；
4. 三个模块里，都有一行 ``console.log()`` 代码，当出现在浏览器的控制台里的时候，表示该模块代码被重新执行了一遍；
5. 父模块处理子模块的 HMR 时，回调函数里有一行 ``console.log()`` 代码，表示该子模块已经重新加载完毕；
6. 因此，理论上，我们修改 foo.js 或者 bar.js 文件后，首先会看到该模块的 ``console.log()`` 代码，其次会看到其父模块处理 HMR 的回调函数中的 ``console.log()`` 代码；

<br>
首次刷新页面后，控制台先输出三条 log，和几行 HMR代码，略略略。

<b>修改 foo.js</b>

当我们修改 foo.js 的 log 代码：``console.log('%c%s', 'color:green;', 'foo.js is running...I change it')``

控制台提示：

```
foo.js is running...I change it
[./foo.js] is update
[HMR] Updated modules:
[HMR]  - ./foo.js
[HMR] App is up to date.
```

正如我们所料，foo.js 代码被重新执行了一遍，然后触发了 app.js 里面 ``module.hot.accept()`` 的回调函数（注意，有先后顺序）。

并且，页面上多了一个 DOM 节点（来自 bar.js的，因为在 foo.js 里面执行了 ``bar()``），这正是我们前面所提出来的，HMR 机制的天生缺陷之一。

另外请注意，所以 bar.js 是 foo.js 的子模块，但由于 bar.js 并没有被修改，所以 bar.js 里面的代码没有重新执行一遍（除了他暴露给 foo.js 的接口）。

