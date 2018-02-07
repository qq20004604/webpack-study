<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

点击这里查看[DEMO](https://github.com/qq20004604/webpack-study/tree/master/9%E3%80%81%E5%A4%96%E9%83%A8%E6%89%A9%E5%B1%95%EF%BC%88Externals%EF%BC%89)

<h3>9、外部扩展（Externals）</h3>

<h4>9.0、DEMO使用说明</h4>

安装：

```
npm i
```

运行：

```
npm run dev
```

打包（生产模式）：

```
npm run build
```

<h4>9.1、应用场景</h4>

当我们加载一个外部库，比如 ``jQuery``，比如 ``echarts`` 等，为了节约流量，我们往往会使用 CDN 来加载这些东西。

这和我们平常进行模块化开发就有了一定的矛盾：

1. 需求：我们需要引入一个全局变量（实质是引入一个模块）；
2. 常规做法：所以正常来说，我们应该通过 ``import`` 来引入这个模块；
3. 问题：但由于通过CDN来加载，显然我们不能这么做；

<br>
<b>解决方案：</b>

1、一般解决方案：

我们可以直接通过使用这个全局变量来使用这个变量，例如：

```
// globalVariableName 通过CDN引入js文件，这个变量名其该js文件暴露出来的全局变量名（类型是一个函数）
document.getElementById("root").innerText = globalVariableName(1, 2, 3)
```

这个不是不行，但容易造成一个问题就是，容易在一不小心的情况下，篡改了原有的变量。

并且，这种方式是高耦合度的，不推荐使用。

2、模块化解决方案：

按照正常的开发方式，我们通常是使用 <b>外部扩展</b> 来实现。

他具有以下特点：

示例代码：

```
// ``webpack.config.js`` 文件里的配置代码

// 指定别名
externals: {
    // 后面是原本使用的全局变量名，前面的是引入的包名（就是import xx from 'echart'），然后我们实际写代码时候，用的是xx这个变量名。
    "moduleName": 'globalVariableName'
}

// app.js 里的业务代码
import add from 'moduleName'
document.getElementById("root").innerText = add(1, 2, 3)
```

1. 在 ``webpack.config.js`` 里进行配置；
2. 通常使用 kv 模式，并且 v 一般是字符串（就像 ``"moduleName": 'globalVariableName'`` 这样）；
3. 效果是当引入某个模块时（k 决定），将不会像常规处理那样去加载他，而是排除掉（就像 ``import add from 'moduleName'`` 这段代码，不会去找 ``moduleName`` 这个模块）；
4. 排除掉后怎么处理呢，运行时从外部获取这个扩展；
5. 具体做法是（需要一定程度上知晓 webpack 打包后如何加载模块，才能理解以下内容）：获取时，像正常导入一个模块一样，加载一个模块；
6. 但这个模块做的事情，是将一个外部变量，通过 AMD 规范赋值给 ``module.exports``（我们使用 require 加载模块时，获取的值，就是 AMD 规范的模块，通过这个属性导出的值）；
7. 从而让加载 ``moduleName`` 模块时，实际加载到的是这个全局变量（5-7这个过程，实际体现的就是以下这段代码）。

```
// 其他代码略
"moduleName": (function (module, exports) {
    module.exports = globalVariableName;
})
```


<h4>9.2、简单来说（使用说明）</h4>

【需求】

假如我需要通过 CDN 加载一个我自定义的库，示例我用的是：``<script src="http://www.jianwangsan.cn/looksLikeCDN.js"></script>``。

这个库就做了一件事情，暴露了一个全局变量 ``window.globalVariableName``，这个变量是一个函数，他会将所有参数的和相加，并返回。（当然实际应用中，这个可能是一个对象，有 N 个属性，非常复杂，但原理是一样的）

【第一步，修改html源文件】

我现在通过 CDN 来加载这个库，因此我的 html 源文件是这样的（当然实际上我不是CDN，因此用的是我个人服务器上的一个js文件，但道理也是一样的）：

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="http://www.jianwangsan.cn/looksLikeCDN.js"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

【第二步，配置webpack】

我现在需要使用这个方法，又不想通过模块化引入（因为这个是固定不变的，没有必要每次重复打包，这样不利于缓存，就像 jQuery 库一样）。

于是我首先编辑 ``webpack.config.js`` 文件，给打包配置对象添加一个属性，具体配置如下：

```
// 指定别名
externals: {
    // 后面是原本使用的全局变量名，前面的是引入的包名（就是import xx from 'echart'），然后我们实际写代码时候，用的是xx这个变量名。
    "moduleName": 'globalVariableName'
}
```

将你想使用的全局变量，作为 kv 键值对的 v，而 k 作为在 js 文件中引入的模块名使用（参考第三步）。

<b>不想看解释的跳过下面这段话，直接看第三步</b>

以上配置意味着：

1. ``moduleName`` 不会被正常加载：当我需要加载 ``import add from 'moduleName'`` 这个模块时，webpack 不会像之前去找对应模块那样而处理（找到对应模块，加载对应模块，将模块的返回值赋值给 add），而是采用一种新的机制来处理；
2. 创造出的模块：新的机制意味着，将创造一个 ``'moduleName'`` 模块（注意，实际上这个模块在工程里并不存在）；
3. ``globalVariableName`` 全局变量：创造出来的模块做了一件事情，他返回了一个值，这个值是 ``globalVariableName`` 这个全局变量的值。（想想 AMD 规范中，``module.exports = globalVariableName;`` 这段代码表示什么？）；

于是体现的效果，就相当于以下代码：

```
// app.js
import add from './moduleName'

// moduleName.js
export default window.globalVariableName
```

【第三步，在工程中引入】

上面我们获得一个 k（``moduleName``），作为模块名，因此在 ``app.js`` 这个工程中查看：

```
// app.js
import add from 'moduleName'

// 这里的 moduleName 模块，返回 window.globalVariableName 这个值
// 所以就意味着 add 的值等同于 globalVariableName 的值
document.getElementById("root").innerText = add(1, 2, 3)
```

【结束】

这样就可以了，现在可以尝试进入命令行，输入 ``npm run build`` 打包，并查看一下效果啦。

