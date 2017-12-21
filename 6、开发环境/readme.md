<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

<h3>6、开发环境</h3>

有三种，依次介绍。

<h4>6.1、观察模式 watch</h4>

<b>关键字：</b>

修改文件后自动编译，需要刷新浏览器后才能查看到新编译好的文件。

<b>使用方式：</b>

fork项目后，先通过 ``npm install`` 安装依赖，然后执行 ``npm run watch`` 就ok了。

这个的效果，是当编辑模块文件后，会自动触发编译。

<b>举个例子：</b>

1. 假如我已经启用了 watch 模式；
2. 通过 ``html-webpack-plugin`` 以引入一个源 html 文件；
3. 发现这个 html 里文件没有写 title 标签的内容；
4. 于是我修改这个 html 文件，添加了 title 标签的内容；
5. 此时webpack会自动重新编译打包大部分文件（并不是每一个）；
6. 消耗的时间比全部编译打包要少（以【实战五】为例，修改 title 标签内容，或者在相关的 js 添加一行代码，打包时间约1700-1900ms，全部打包大约耗时 6000ms）；
7. 刷新打包后的 html 文件，即可查看重新编译后的代码；

<b>优点：</b>

1. 修改代码后，只需要刷新就可以查看打包后的效果；
2. 无需多次打包；

<b>缺点：</b>

1. 每次修改后都要刷新，很麻烦；
2. 如果需要一定 UI 操作之后才能得到结果的内容，用这种方式测试会很麻烦；


<h4>6.2、实时重新加载 webpack-dev-server</h4>

<b>关键字：</b>

修改文件后实施编译，自动刷新浏览器。

<b>使用方式：</b>

<b>1.1、fork 项目形式</b>

fork项目后，先通过 ``npm install`` 安装依赖，然后执行 ``npm run start`` 就ok了。

<b>1.2、单独安装</b>

单独安装的话，先 ``npm install --save webpack-dev-server`` ，然后在 ``webpack.config.js`` 里添加属性：

```
// webpack-dev-server
devServer: {
    contentBase: './dist'
},
```

该属性和 entry，output 平级。

然后在 package.json 里添加一条 scripts：``"start": "webpack-dev-server --open http://localhost:8080/login.html --config build/webpack.config.js"``

就可以默认打开``http://localhost:8080/login.html``这个页面了。如果默认打开 index.html 页面的话，后面的 url 可以省略。

运行 ``npm run start`` 来执行。

<b>2、安装后</b>

会弹出一个窗口，url为：``localhost:8080``，但以本项目为例，因为dist文件夹没有 index.html，所以会无法显示内容。

修改url为：``http://localhost:8080/login.html``，即可。

<b>举个例子：</b>

1. 假如你已经成功启动，并且访问了 login.html 文件；
2. 你修改了 ``page/login/login_box.html`` 文件中的账号输入框的 ``placeholder`` 属性；
3. webpack-dev-server 触发编译，会重新编译所有文件（耗时比 watch 模式要多，以本项目为例，watch 2000ms内，这个 3000ms，但比全编译的 6000ms 要快）；
4. 编译好后会自动刷新页面；

<b>优点：</b>

1. 再也不用修改后，不停的刷新页面了；

<b>缺点：</b>

1. 但每次编译还是要额外花费时间，麻烦；
2. 如果需要一定 UI 操作之后才能得到结果的内容，用这种方式测试会很麻烦；
3. output 文件名不能用 ``[chunkhash]`` 只能用 ``[hash]``

<h4>6.3、中间件容器 webpack-dev-middleware</h4>

<b>关键字：</b>

<b>使用方式：</b>

<b>1.1、fork 项目形式</b>

fork项目后，先通过 ``npm install`` 安装依赖，然后执行 ``npm run server`` 就ok了。

<b>1.2、单独安装</b>

先安装 express 和 webpack-dev-middleware

```
npm install --save express webpack-dev-middleware
```

然后在 webpack.config.js 中的 output 添加 ``publicPath: '/'``属性，如：

```
output: {
    path: __dirname + '/../dist',
    // 文件名，将打包好的导出为bundle.js
    filename: '[name].[chunkhash].js',
    publicPath: '/'
},
```

在 build 目录下新建文件 ``server.js``，内容如下：

```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
var opn = require('opn')

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
opn('http://localhost:3000/login.html')
```

在 package.json 文件里添加一条 scripts：

```
"server": "node build/server.js"
```

注意因为是在根目录下执行命令，server.js 在 build 文件夹下，所以需要是 ``build/server.js``。


<b>举个例子：</b>

1. 直接对比 watch 模式和 webpack-dev-server 模式吧：
2. 也带服务器功能，不过 webpack-dev-server 用的是一个简单的web服务器，而这个用的是 express 的服务器；
3. 跟 watch 模式类似，只使用这个的话（没任何配置），需要手动刷新页面，才能获取修改后的代码；

<b>优点：</b>

1. 比 watch 模式多一个服务器。相较说，不需要从文件路径来访问，或者需要自己额外搭建一个服务器来访问；
2. 是 HMR （模块热替换）的基础；

<b>缺点：</b>

1. 单纯使用这个，并不能实现 HMR，还需要额外配置；

<h4>6.4、HMR</h4>

单纯的使用 开发中 Server(DevServer)，并不能达到我们预期的效果——修改代码后无需刷新页面，即可在页面上体现出变化。

因此还需要启用 HMR，参照下一篇博客。