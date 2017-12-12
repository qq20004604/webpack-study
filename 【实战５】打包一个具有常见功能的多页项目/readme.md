<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[实战项目示例目录](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%95%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AA%E6%A0%87%E5%87%86%E9%A1%B9%E7%9B%AE)


<h3>1、需求列表</h3>

基本需求：

1. 引入jQuery（或其他类似库，之所以用 ``jQuery`` 是每个前端开发者都理应会 jQuery）；
2. 使用 ``less`` 作为 ``css`` 预处理器；
3. 标准模块化开发；
4. 有异步加载的模块；
5. 使用 es6、es7 语法；
6. 写一个登录页面作为DEMO，再写一个登录后的示例页面作为跳转后页面；
7. 可适用于多页项目；

打包要求：

1. 启用 hash 命名，以应对缓存问题；
2. css 自动添加兼容性前缀；
3. 将图片统一放到同一个文件夹下，方便管理；

<h3>2、涉及到的知识</h3>

1. [入口](https://github.com/qq20004604/webpack-study/tree/master/3%E3%80%81%E5%85%A5%E5%8F%A3%EF%BC%88%E5%A4%9A%E5%85%A5%E5%8F%A3%EF%BC%89)：设置入口文件；
2. [出口](https://github.com/qq20004604/webpack-study/tree/master/4%E3%80%81%E5%87%BA%E5%8F%A3)：设置打包后的文件夹以及文件命名；
3. [babel-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/babel_loader)：用于将es6、es7等语法，转换为es5语法；
4. [css-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader)：用于处理css文件（主要是处理图片的url）；
5. [style-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/style_loader)：将转换后的css文件以 style 标签形式插入 html 中；
6. [postcss-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/postcss_loader)：一般用于添加兼容性属性前缀；
7. [less-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/less_loader)：以 less 语法来写 css ；
8. [url-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/url_loader)：用于将图片小于一定大小的文件，转为 base64 字符串；
9. [file-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/file_loader)：``url-loader`` 不能转换 base64字符串 的文件，被这个处理（主要用于设置打包后图片路径，以及CDN等）；
10. ``html-webpack-plugin`` ：用于将已有 html 文件作为模板，生成打包后的 html 文件；


<h3>3、技术难点</h3>

<h4>3.1、多页面</h4>

多页模式是一个难点。

且不考虑共同模块（这里主要指的是html模板，而不是js的模块），光是单独每个入口 js 文件需要搭配一个相对应的 html 文件，就已经是一件很麻烦的事情了。

对于这个问题，需要借助使用 ``html-webpack-plugin`` 来实现。

由于之前木有 ``html-webpack-plugin`` 的相关内容，这里只讲思路和代码。

<b>第一：多入口则多个html文件</b>

也是核心内容，``html-webpack-plugin`` 只负责生成一个 html 文件。

而多入口显然需要生成多个 html 文件，因此 有多少个入口，就需要在 webpack 的 plugins 里添加多少个 ``html-webpack-plugin`` 的实例。

同时，我们还要更改 webpack 的 entry 入口，entry 的值应该是根据入口数量自动生成的对象。

<b>第二：chunks特性实现按需加载</b>

通过配置 ``html-webpack-plugin`` 的 ``options.chunks`` ，可以让我们实现让 login.html 只加载 login.js，而 userInfo.html 只加载 userInfo.js（注：hash 文件名不影响匹配）；

<b>第三：template自定义作为模板的 html 文件</b>

``options.template`` 可以自定义该实例以哪个 html 文件作为模板。

<b>第四：filename</b>

``options.filename`` 可以自定义生成的 html 文件输出为什么样的文件名。

<b>第五：管理多入口</b>

已知：

一个 ``html-webpack-plugin`` 实例具有以下功能：

1. 生成一个 html 文件（一）；
2. 决定自己引入哪个 js 文件（二）（记得，webpack只负责打包js文件，不负责生成 html 文件。生成实例是依靠这个 plugins）；
3. 决定自己以哪个 html 文件作为模板（三）；
4. 决定自己打包后的目录和文件名（四）；

我们通过webpack打包后，一个入口 js 文件会对应一个出口 js 文件；

而每个入口 js 文件，都对应一个 html 模板文件；

因此每个 html 模板文件，都知道自己对应哪个出口 js 文件；

所以以上是实现多入口的原理。

<b>代码：</b>

多入口管理文件：

>config/entry.json

```
[
    {
        "url": "login",
        "title": "登录"
    },
    {
        "url": "userInfo",
        "title": "用户详细信息"
    }
]
```

webpack配置文件：

> webpack.config.js：

首先，配置 ``entry``：

```
const entryJSON = require('../config/entry.json');

// 入口管理
let entry = {}
entryJSON.map(page => {
    entry[page.url] = path.resolve(__dirname, `../src/entry/${page.url}.js`)
})
```

其次，配置 ``plugins``：

```
// 在上面已经引用了 entryJSON
const path = require('path')

// 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
let plugins = entryJSON.map(page => {
    return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `../dist/${page.url}.html`),    // 输出文件名
        template: path.resolve(__dirname, `../src/page/${page.url}.html`),    // 输入模板html
        chunks: [page.url], // 实现多入口的核心，决定自己加载哪个js文件
        hash: true, // 为静态资源生成hash值
        minify: false,   // 压缩，如果启用这个的话，需要使用html-minifier，不然会直接报错
        xhtml: true,    // 自闭标签
    })
})
```

最后，webpack 本身的配置：

```
module.exports = {
    // 入口文件
    entry: entry,
        // 出口文件
    output: {
        path: __dirname + '/../dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].[hash:8].js'
    },
    // 省略中间的配置
    // 将插件添加到webpack中
    plugins: plugins
}
```

文件目录（已省略无关文件）：

```
├─build
│  └─webpack.config.js
├─dist
└─src
    ├─common
    ├─entry
    │  ├─userInfo.js
    │  └─login.js
    ├─page
    │  ├─userInfo.html
    │  └─login.html
    └─static
```