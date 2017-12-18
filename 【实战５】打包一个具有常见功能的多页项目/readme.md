<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[实战项目示例目录](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%95%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AA%E6%A0%87%E5%87%86%E9%A1%B9%E7%9B%AE)

<h3>0、使用说明</h3>

安装：

```
npm install
```

运行（注，这里不像之前用的 test ，而是改用了 build）：

```
npm run build
```

<h3>1、需求列表</h3>

基本需求：

1. 引入jQuery（或其他类似库，之所以用 ``jQuery`` 是每个前端开发者都理应会 jQuery）；
2. 使用 ``less`` 作为 ``css`` 预处理器；
3. 标准模块化开发；
4. 有异步加载的模块；
5. 使用 es6、es7 语法；
6. 写一个登录页面作为DEMO，再写一个登录后的示例页面作为跳转后页面；
7. 可适用于多页项目；
8. css 文件与 图片 文件脱离（即更改 css 文件路径不影响其对图片的引用）

打包要求：

1. 启用 hash 命名，以应对缓存问题；
2. css 自动添加兼容性前缀；
3. 将图片统一放到同一个文件夹下，方便管理；
4. 将共同引入的模块单独打包出来，用于缓存，减少每次重复加载的代码量；
5. 代码进行丑化压缩；

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
10. [html-withimg-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/html_withimg_loader)：用于加载html模板；
10. ``html-webpack-plugin`` ：用于将已有 html 文件作为模板，生成打包后的 html 文件；
11. ``clean-webpack-plugin``：用于每次打包前清理dist文件夹
12. ``CommonsChunkPlugin``：提取 chunks 之间共享的通用模块


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

通过配置 ``html-webpack-plugin`` 的 ``options.chunks`` ，可以让我们实现让 ``login.html`` 只加载 ``login/index.js``，而 ``userInfo.html`` 只加载 ``userInfo/index.js``（注：由于以 entry 的 key 作为寻找出口文件的根据，因此打包后带 hash 的文件名不影响匹配）；

注意，这个实现的机制，是通过 ``options.chunk`` 的值，去匹配 ``webpack.config.js``的 ``entry`` 对象的 ``key``。

因为一个入口文件对应一个出口文件，所以这里会去拿入口文件对应的出口文件，将其加到 html 文件里。

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
    entry[page.url] = path.resolve(__dirname, `../src/page/${page.url}/index.js`)
})
```

其次，配置 ``plugins``：

```
// 在上面已经引用了 entryJSON
const path = require('path')

// 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
let plugins = entryJSON.map(page => {
    return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `../dist/${page.url}.html`),
        template: path.resolve(__dirname, `../src/page/${page.url}/index.html`),
        chunks: [page.url], // 实现多入口的核心，决定自己加载哪个js文件，这里的 page.url 指的是 entry 对象的 key 所对应的入口打包出来的js文件
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
    └─page
       ├─login
       │  ├─index.js
       │  ├─index.html
       │  └─login.less
       └─userInfo
          ├─index.js
          └─index.html
```

<h4>3.2、文件分类管理</h4>

如何将页面整齐的分类，也是很重要的。不合理的规划，会增加项目的维护难度。

项目目录如下分类：

```
├─build     webpack 的配置文件，例如 webpack.config.js
├─config    跟 webpack 有关的配置文件，例如 postcss-loader 的配置文件，以及多入口管理文件
├─dist      打包的目标文件夹，存放 html 文件
│  └─img    打包后的图片文件夹
└─src       资源文件夹
    ├─common    全局配置，或者公共方法，放在此文件夹，例如 less-loader 的全局变量
    ├─img       图片资源文件夹，这些是共用的图片
    ├─less      less 文件夹，共用的less文件
    ├─page      每个页面，在page里会有一个文件夹，里面放置入口 js 文件，源 html 文件，以及不会被复用的 html template文件。
    ├─template  html 模板文件夹（通过js引入模板，这里的可能被复用）
    └─static    静态资源文件夹，这里放使用静态路径的资源
```

虽然还不够精细，但应对小型项目是足够了的。

<h3>3.3、别名</h3>

别名的优势很多，比如：

<b>1、css/less 代码，可以和图片分离：</b>

只要 webpack 配置和图片的位置不变。

那么使用别名，就可以随意移动 less 文件。

不必担心因为移动 less 文件，而造成的 less 文件与 图片 文件的相对路径改变，导致找不到图片而出错。

<b>2、方便整体移动图片</b>

假如原本图片放在``src/img``文件夹下，现在你突然想把图片放在``src/image``文件夹下。

如果不使用别名，你需要一个一个去修改图片的路径；

而使用别名，只需要改一下别名的路径就行了。

``css-loader`` 支持独立于 webpack 的别名的设置，教程参照：[css-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader)

这里基于【3.2】的文件分类管理，附上关于别名的控制代码：

```
{
    loader: 'css-loader',
    options: {
        root: path.resolve(__dirname, '../src/static'),   // url里，以 / 开头的路径，去找src/static文件夹
        minimize: true, // 压缩css代码
        // sourceMap: true,    // sourceMap，默认关闭
        alias: {
            '@': path.resolve(__dirname, '../src/img') // '~@/logo.png' 这种写法，会去找src/img/logo.png这个文件
        }
    }
},
```

其余代码已省略，如果有需要，请查看 [DEMO](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%95%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AA%E5%85%B7%E6%9C%89%E5%B8%B8%E8%A7%81%E5%8A%9F%E8%83%BD%E7%9A%84%E5%A4%9A%E9%A1%B5%E9%A1%B9%E7%9B%AE) 中的 ``build/webpack.config.js`` 文件。

<h4>3.4、安装jQuery</h4>

<b>方案：</b>

由于npm上并没有最新的 jQuery，目前来说， ``1.7.4`` 是最新的版本。

所以可以从下面这个CDN直接下载 jQuery 来使用，版本是 1.12.4

https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js

然后在js文件的开始位置，通过require引入（注意，不能通过 ``import`` 引入）

```javascript
const $ = require('../../common/jquery.min')
```

webpack会帮你做剩下的事情，你只需要愉快的使用 jQuery 就好了。

<h4>3.5、提取 chunks 之间共享的通用模块</h4>

在 3.4 中，我们引入了 jQeury，方法简单易行，但又一个缺点，那就是会导致代码重复打包的问题。

即 jQuery 会被打包进每一个引入他的入口 js 文件中，每个页面都需要重复下载一份将jQuery代码打包到其中的 js 文件（很可能两个 js 文件只有 20kb 是自己的代码，却有 90kb 是 jQuery 代码）。

我们期望：

1. 访问第一个页面时，预期加载 foo.js 和 jQuery.js；
2. 访问第二个页面时，预期加载 bar.js 和 jQuery.js；
3. 当访问第二个页面时，发现已经在第一个页面下载过 jQuery.js 了，因此将不需要再下载 jQuery 代码，只需要下载 bar.js 就可以了；

<b>方案改进：</b>

为了实现这个目标，毫无疑问，我们需要将 jQuery.js 文件单独打包，或者说，每一个在多个模块中共享的模块，都会被单独打包。

有几种做法，但实测后都不好用，鉴于 jQuery 会在每个页面都适用，因此综合考虑后，我采用以下方案来初步实现我的目标。

最后我采用了 webpack 自带的插件：``webpack.optimize.CommonsChunkPlugin``来实现，他可以将在多个文件中引入的 模块，单独打包。

关于这个插件可以先参考官方文档：[CommonsChunkPlugin: 	
提取 chunks 之间共享的通用模块](https://doc.webpack-china.org/plugins/commons-chunk-plugin/)。

为了实现我们的目的，我们需要做两件事：

1、使用这个插件，如下配置：

```
const webpack = require('webpack')

new webpack.optimize.CommonsChunkPlugin({
    name: "foo", // 这个对应的是 entry 的 key
    minChunks: 2
})
```

这个的效果是将至少有 2 个 chunk 引入的公共代码，打包到 foo 这个 chunk 中。

2、我们需要引入这个打包后的 chunk ，方法是通过 ``html-webpack-plugin`` 这个插件引入。

```
// 无关配置已经省略
new HtmlWebpackPlugin({
    chunks: [page.url, 'foo'], // 这里的foo，就是通过CommonsChunkPlugin生成的chunk
})
```

无需修改源代码，此时我们可以执行``npm run build``查看打包后的效果：

```
foo.d78e8f4193f50cc42a49.js    // 199 KB（这里包含jQuery以及公共代码）
login.d2819f642c5927565e7b.js  // 15 KB
userInfo.1610748fb3346bcd0c47.js // 4 KB
0.fe5c2c427675e10b0d3a.js      // 2 KB
```

<b>注：</b>

如果页面很多的话，那么很可能某些公共组建被大量chunk所共享，而某些chunk又被少量chunk所共享。

因此可能需要特殊配置 ``minChunks`` 这个属性，具体请查看官方文档。

<h4>3.6、每次打包前，清理dist文件夹</h4>

需要借助 ``clean-webpack-plugin`` 这个插件。

使用这个插件后，可以在每次打包前清理掉整个文件夹。

基于本项目来说，清除的时候配置的时候需要这样配置：

```javascript
new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
    root: path.resolve(__dirname, '../'),    // 设置root
    verbose: true
})
```

原因在于，这个插件会认为``webpack.config.js``所在的目录为项目的根目录。

只使用第一个参数的话，会报错移除目标的目录位置不对：

```
clean-webpack-plugin: （略）【实战５】打包一个具有常见功能的多页项目\dist is outside of the project root. Skipping...
```

而添加了第二个参数的设置后，就可以正常使用了。

<b>注：</b>

他的效果是直接删除文件夹，因此千万别写错目录了，如果删除了你正常的文件夹，那么……就只能哭啦。


<h4>3.7、使用 html 模板</h4>

由于我们很可能在 html 中使用 ``<img>`` 标签，

而 ``html-webpack-plugin`` 这个插件，只能用于将某个 html 文件作为打包后的源 html 文件，

不会将其 ``<img>`` 标签中的 ``src``属性转为打包后的图片路径，同时也不会将引入的图片进行打包。

因此我们需要将 html 内容单独拆出来，``page`` 文件夹里的源文件只负责作为 html 模板而已。

为了使用 html 模板，我们需要专门引入一个插件：

``html-withimg-loader``：用于解析 html 文件。

使用方法很简单：

1. 配置``loader``（参照 ``webpack.config.js``）；
2. ``import`` 导入 html 模板文件（例如 ``login.html``）；

导入的时候，是一个字符串，并且图片的 url 已经被解析了。然后我们将其引入源 html 文件中（比如``page/login.html``），再写各种逻辑就行了。

<b>注：</b>

务必记得先把 html 模板插入页面中，再写他的相关逻辑。

<h4>3.8、代码的丑化压缩</h4>

使用插件 ``UglifyjsWebpackPlugin`` ，文档参照 (UglifyjsWebpackPlugin)[https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin]

压缩前：

```
0.fe5c2c427675e10b0d3a.js    // 2 KB
foo.a5e497953a435f418876.js    // 199 KB
login.9698d39e5b8f6c381649.js    // 15 KB
userInfo.f5a705ffcb43780bb3d6.js    // 4 KB
```

丑化压缩后：

```

0.fe5c2c427675e10b0d3a.js    // 1 KB
foo.a5e497953a435f418876.js    // 120 KB
login.9698d39e5b8f6c381649.js    // 10 KB
userInfo.f5a705ffcb43780bb3d6.js    // 2 KB
```

<h3>4、分析</h3>

重新列出所有需求：

基本需求：

1. 引入jQuery（或其他类似库，之所以用 ``jQuery`` 是每个前端开发者都理应会 jQuery）；
2. 使用 ``less`` 作为 ``css`` 预处理器；
3. 标准模块化开发；
4. 有异步加载的模块；
5. 使用 es6、es7 语法；
6. 写一个登录页面作为DEMO，再写一个登录后的示例页面作为跳转后页面；
7. 可适用于多页项目；
8. css 文件与 图片 文件脱离（即更改 css 文件路径不影响其对图片的引用）

打包要求：

1. 启用 hash 命名，以应对缓存问题；
2. css 自动添加兼容性前缀；
3. 将图片统一放到同一个文件夹下，方便管理；
4. 将共同引入的模块单独打包出来，用于缓存，减少每次重复加载的代码量；
5. 代码进行丑化压缩；


---

<b>需求的实现：</b>

<b>基本需求：</b>

<table>
    <tr>
        <td colspan="2">需求的实现过程</td>
    </tr>
    <tr>
        <td>需求</td>
        <td>实现方法</td>
    </tr>
    <tr>
        <td>引入jQuery</td>
        <td>1. 通过 require() 引入，并通过 CommonsChunkPlugin 实现单独打包；</td>
    </tr>
    <tr>
        <td>使用 less 作为 css 预处理器</td>
        <td>1. 使用 less-loader 来处理 .less 文件；</td>
    </tr>
    <tr>
        <td>标准模块化开发</td>
        <td>1. 使用 import 和 require 语法来进行模块化开发；</td>
    </tr>
    <tr>
        <td>有异步加载的模块</td>
        <td>1. 通过 require([], callback) 来实现模块的异步加载</td>
    </tr>
    <tr>
        <td>使用 es6、es7 语法</td>
        <td>1. 使用 babel 来转义</td>
    </tr>
    <tr>
        <td>写一个登录页面作为DEMO，再写一个登录后的示例页面作为跳转后页面</td>
        <td>1. 登录页：page/login<br>2. 跳转后页面：page/userInfo</td>
    </tr>
    <tr>
        <td>可适用于多页项目</td>
        <td>1. config/entry.json 用于配置多页入口；<br>2. html-withimg-loader 来生成多页模板；<br>3. 最后在webpack.config.js里配置 entry 和 plugins</td>
    </tr>
    <tr>
        <td>css 文件与 图片 文件脱离（即更改 css 文件路径不影响其对图片的引用）</td>
        <td>通过 css-loader 的别名实现</td>
    </tr>
</table>

<b>打包需求：</b>

<table>
    <tr>
        <td colspan="2">需求的实现过程</td>
    </tr>
    <tr>
        <td>需求</td>
        <td>实现方法</td>
    </tr>
    <tr>
        <td>启用 hash 命名，以应对缓存问题</td>
        <td>配置 output 的 filename 属性，加 [chunkhash] 即可</td>
    </tr>
    <tr>
        <td>css 自动添加兼容性前缀</td>
        <td>使用 post-loader 的 autoprefixer</td>
    </tr>
    <tr>
        <td>将图片统一放到同一个文件夹下，方便管理</td>
        <td>配置 url-loader （实质是 file-loader ）的 outputPath</td>
    </tr>
    <tr>
        <td>将共同引入的模块单独打包出来，用于缓存，减少每次重复加载的代码量</td>
        <td>使用插件 CommonsChunkPlugin 来实现</td>
    </tr>
    <tr>
        <td>代码进行丑化压缩</td>
        <td>使用插件 UglifyjsWebpackPlugin 来实现</td>
    </tr>
</table>