<h3>0、前注</h3>

本文内容源于[webpack中文文档](https://doc.webpack-china.org/concepts/)，以及我自己实践中写的若干DEMO。

每个DEMO以文件夹为单位，从入门到进阶，根据文件夹编号为准，逐步递进。

成文时，webpack版本是【3.8.1】

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

<h3>1、webpack基本结构</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/1%E3%80%81%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84webpack%E5%AE%9E%E4%BE%8B)

文件目录见``1、最简单的webpack实例``这个目录。

```
// webpack.config.js 这个是webpack的管理配置文件

// 以CMD的格式导出模块
module.exports = {
    // 入口文件，指向app.js
    entry: './app.js',
    // 出口文件
    output: {
        // 文件名，将打包好的导出为bundle.js
        filename: './bundle.js'
    }
}

// app.js  这个是入口文件
import bar from './bar'

bar()

// bar.js 这个是入口文件引入的模块
export default function bar () {
    console.log('bar')
}

// page.html 这个是html目录文件，这个文件引入入口文件
<html>
<head>
    <title>1、最简单的webpack实例</title>
</head>
<body>
<script src="./bundle.js"></script>
</body>
</html>
```

控制台执行``webpack``（或者 ``webpack --config webpack.config.js`` ），会显示如下内容：

```
D:\study notes\Project\webpack_learner\1、最简单的webpack实例>webpack
Hash: 2fdcc03878d7c5480ce6
Version: webpack 3.8.1
Time: 58ms
      Asset     Size  Chunks             Chunk Names
./bundle.js  3.13 kB       0  [emitted]  main
   [0] ./app.js 115 bytes {0} [built]
   [1] ./bar.js 142 bytes {0} [built]
```

打完后的``bundle.js``文件内容略。这个时候打开html文件，查看控制台，会发现正常输出了``bar``。

<h3>2、简单指令（npm脚本）</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/2%E3%80%81%E7%AE%80%E5%8D%95%E6%8C%87%E4%BB%A4%EF%BC%88npm%E8%84%9A%E6%9C%AC%EF%BC%89)

我们实际开发中，一般都是使用``npm run build``或者``npm run dev``之类的指令，这是怎么实现的呢？

答案是利用``package.json``里面的``scripts``属性。

其他文件如【1】中的四个文件，新增一个``package.json``，内容如下：

```
// package.json  注：name只能是以下这种格式，不能有空格或者中文
{
    "name": "simple-command",
    "version": "0.0.1",
    "scripts": {
        "test": "webpack --config webpack.config.js"
    }
}
```

然后控制台执行命令``npm run test``即可。

<b>注：</b>

之所以我们能通过``npm run test``来执行``"webpack --config webpack.config.js"``这样一段命令。

原因是这段命令的开头，以``npm``为开头，所以执行的是全局变量（通常是全局变量，因为npm一般是全局安装）配置的npm包管理器。

然后后面的``run test``是npm负责去执行的，所以``npm run test``这段命令，是npm的特性，而不是webpack的，称作npm脚本。

而之后webpack的命令，是webpack做的事情。但webpack的执行，显然是通过Node.js执行的，所以可以用JavaScript语法。

[npm小结（程序猿小卡）](http://www.cnblogs.com/chyingp/p/npm.html)

[npm的工作原理](http://blog.csdn.net/gentlycare/article/details/51332882)

<h3>3、入口（多入口）</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/3%E3%80%81%E5%85%A5%E5%8F%A3%EF%BC%88%E5%A4%9A%E5%85%A5%E5%8F%A3%EF%BC%89)

在上面的``webpack.config.js``中，有如下代码：

```
// 入口文件，指向app.js
entry: './app.js',
```

以上代码相当于：

```
entry: {
    main: './app.js'
}
```

如果是普通的项目（单入口），那么按照上面的方式写（``entry: './app.js'``）就可以了。

至于下面的方式是什么呢？答案是：用于提供<b>【多入口】</b>的解决方案。

假如我一个项目里，允许有A、B两个html文件，他们之间是不同的入口文件（比如一个是用户入口页，一个是管理入口页）。

显然虽然是两个不同的入口，但是他们之间有很多共通的逻辑（否则就有大量重复开发工作了），因此我们需要将其写在同一个工程中，然后通过不同的入口文件引入他。

他的依赖树可能是这样的：

```
.
|____first.html
| |____first.js
| | |____common.js
|____second.html
| |____second.js
| | |____common.js
```

也就是说，``first.js``和``second.js``两个文件，都共享一个``common.js``模块。

如示例代码[点击查看github](https://github.com/qq20004604/webpack-study/tree/master/3%E3%80%81%E5%85%A5%E5%8F%A3%EF%BC%88%E5%A4%9A%E5%85%A5%E5%8F%A3%EF%BC%89)。

核心代码如下：

```
// webpack.config.js
...
entry: {
    first: './first_entry.js',
    second: './second_entry.js'
},
...
```

当然，只配置入口，是无法正常运行的，会报错：

```
Multiple assets emit to the same filename
```

意思就是，你把多入口文件打包到一个文件里了，这样是不对的。

因此我们应当这样配置：

```
output: {
    // 文件名，将打包好的导出为bundle.js
    filename: './dist/[name].js'
}
```

这段代码的意思是：

1. 将多入口文件，打包到``dist``文件夹下；
2. 并且名字根据入口文件决定；
3. ``[name]``表示文件名自动匹配入口文件的key（即``first: './first_entry.js'``里面的``first``）；

fork[本项目](https://github.com/qq20004604/webpack-study)，并且在本文件夹下执行``npm run test``来打包，然后打开``first.html``和``second.html``来查看效果（见控制台console）

<h3>4、出口</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/4%E3%80%81%E5%87%BA%E5%8F%A3)

<h4>4.1、标准的出口写法</h4>

```
// 出口文件
output: {
    filename: './dist/dist.js'
}
```

意思是，将打包好的文件，打包到``dist``文件夹下的``dist.js``。

<b>注：</b>

大家一般将打包好的文件会放在dist文件夹下，方便管理。

---

<h4>4.2、出口文件名根据入口文件名所决定：</h4>

上面讲了多入口，以及对应的多出口的配置写法，可以参考上面【3】中的内容。

那么假如单入口``entry: './app.js',``，然后output直接写``filename: './dist/[name].js'``会发生什么事情呢？

因为入口相当于``main: './app.js'``，所以打包好的文件名是：``main.js``。

---

<h4>4.3、设置出口目录</h4>

之前我们文件名是统一写的，但在某些情况下（比如根据环境变量来决定出口目录，因此可能存在多个出口目录，在不同情况下【生产/测试】输出到不同目录）。

因此设置方法如下：

```
output: {
    path: __dirname + '/dist',
    filename: 'dist.js'
}
```

``__dirname``是一个绝对路径，指从根目录到当前目录的路径（不带最后一个``/``），因此``path: __dirname + '/dist'``指以绝对路径写的到当前目录的``dist``文件夹下。

注意，这个情况下，path不能用相对路径（如``./dist``来写），必须写成绝对路径。

而``filename``就是指输出到该绝对路径下，打包好的文件的名字（参考之前的，是一样的）。

---

<h4>4.4、占位符</h4>

在上面，解决多入口文件名的问题时，我们使用了``[name]``来根据入口文件自动生成文件名。

除了``[name]``之外，我们往往需要给文件名增加``[hash]``值来解决缓存的问题（即代码更新后，由于文件名的不同，强制用户下载最新的代码）。

增加方法如下：

```
...
filename: 'dist.[hash].js'
...
```

原本打包后的文件名为：``dist.js``，现如今打包后的文件名为（示例）：``dist.5099da45ae9fc763852d.js``。

如果要限制hash值的长度，可以通过``[hash:10]``来限制长度（默认是20，这里输出10位）。输出文件名示例为：``dist.49b3713789.js``

<b>注：使用``[hash]``时，这里的hash值，即使文件没有改变，每次生成的结果也不同。</b>

如果想让模块没有改变时，hash值不改变，那么应该使用``[chunkhash]``替代``[hash]``。

chunk表示模块，chunkhash就是指根据模块内容计算出来的哈希值。

还有一些其他的占位符，以下表格，是我根据[官方文档](https://doc.webpack-china.org/configuration/output#output-filename)追加写的占位符说明：

<table>
    <tr>
        <td><b>模板</b></td>
        <td><b>描述</b></td>
        <td><b>特点</b></td>
    </tr>
    <tr>
        <td>[hash]</td>
        <td>模块标识符(module identifier)的 hash</td>
        <td>每次都不同（低版本webpack可能有问题)</td>
    </tr>
    <tr>
        <td>[chunkhash]</td>
        <td>chunk 内容的 hash</td>
        <td>模块内容不变，hash值不变（不能和hash同时使用)</td>
    </tr>
    <tr>
        <td>[name]</td>
        <td>模块名称</td>
        <td>就是entry的key，单入口缩写写法默认是main</td>
    </tr>
    <tr>
        <td>[id]</td>
        <td>模块标识符(module identifier)</td>
        <td>默认情况下是例如'0'，'1'之类</td>
    </tr>
    <tr>
        <td>[query]</td>
        <td>模块的 query，例如，文件名 ? 后面的字符串</td>
        <td>我也没搞懂这个</td>
    </tr>
</table>

因此一个示例是：

```
filename: 'dist.chunkhash=[chunkhash:10].name=[name].id=[id].js'
```

具体效果请fork[我的项目](https://github.com/qq20004604/webpack-study/tree/master/4%E3%80%81%E5%87%BA%E5%8F%A3)，并down下来到本地；

然后进入【4、出口文件夹】，在该目录下运行``npm run test``；

最后查看dist文件夹里生成的js文件。对比``webpack.config.js``文件中的``output``属性，对比之。

至于加了哈希值后的文件，如何让html自动引入，下来进行说明。

---

<h4>4.5、引入启用了占位符的打好包文件</h4>

在【4.4】中，我们启用了 ``[hash]`` 和 ``[chunkhash]`` 占位符。

这个占位符，会根据哈希值，在打包好的js文件的文件名中，添加一段hash值。

而这个hash值显然是不可预期的，如果我们每次都在html里手动去写这些js文件名，不仅傻，还容易漏和犯错。

因此我们需要设法解决这个问题。

<b>解决步骤：</b>

1. webpack不能全局安装（虽然也可以，但是会造成污染），因此我们先在当前文件夹下安装一次webpack：``npm install --save webpack``；
2. 我们还需要安装一个webpack插件：``npm install --save-dev html-webpack-plugin``；
3. 除此之外，我们需要配置一下webpack文件。做两件事：1、引入插件；2、配置插件；

```
// webpack.config.js
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件，指向app.js
    entry: './app.js',
    // 出口文件
    output: {
        path: __dirname + '/dist',
        filename: 'dist.chunkhash=[chunkhash:10].name=[name].id=[id].js'
    },
    // 将插件添加到webpack中
    plugins: [
        // 这里是添加的插件
        new HtmlWebpackPlugin({
            title: 'My HTML'
        })
    ]
}
```

最后，如之前一样，运行``npm run test``，会发现在``dist``文件夹下，除了之前的js文件，还出现了一个html文件，而这个html文件引入了我们打包好的js文件。

<b>注：</b>

项目里的是已经将依赖加入了``package.json``，直接运行``npm install``即可自动安装webpack和该插件。

---

<h3>4.6、同时引入固定资源，以及打包好的文件</h3>

在【4.5】中，我们启用了插件，让插件可以自动创建html模板，并让该html文件引入打包好的js文件。

在本章，我们不会深入讲解这个插件，但是需要解决一个常见需求：

1. 我通过CDN引入jQuery（或其他类似资源）；
2. 并且该资源可能是一个，或者多个；
3. 或者是其他已经写在html里的文件内容；
4. 我不想在自动打包好html后，再去手动插入``script``标签或者其他类似标签；
5. 因此我希望以某个html文件为模板，额外加入打包好的js文件；

<br>
因此我们需要对这个插件进行配置：[HtmlWebpackPlugin的文档（英文）](https://github.com/jantimon/html-webpack-plugin#configuration)

对于这个需求，我们只需要配置一些简单的东西：

```
plugins: [
    // 这里是添加的插件
    new HtmlWebpackPlugin({
        title: 'title', // html的title（就是title标签里的东西）
        filename: 'index.html', // 重写后的html文件名，默认是index.html
        template: './demo.html',    // 这个就是那个模板文件，不会改动原有的内容，而是在原来html文件的末尾，将打包编译好的文件添加进去
    })
]
```

然后在模板文件里添加一些内容（具体查看文件夹内的 ``demo.html`` 文件。

最后一如既往的运行``npm run test``即可，查看 ``dist`` 文件夹下的 ``index.html`` 文件。


<h3>5、Loader</h3>

我们在用别人的脚手架的时候，基本总是会见到loader。

比如：

1. 用vue的时候，我们可能用``vue-loader``；
2. 引入css的时候，我们可能用``css-loader``；
3. 处理一些小图片，我们为了减少请求数，所以需要将图片转为base64字符串，这个时候要用``url-loader``；
4. 处理使用es6等高版本js代码的，我们需要使用``babel-loader``；

还有很多其他的，略略略。

<b>loader的使用方法：</b>

1、先通过npm安装loader，引入package.json中；

2、更改``webpack.config.js``文件，文件内容示例如以下代码，loader放在rules这个数组里面：

```
// webpack.config.js

module.exports = {
    // 入口文件，指向app.js
    entry: './app.js',
    // 出口文件
    output: {
        path: __dirname + '/dist',
        // 文件名，将打包好的导出为bundle.js
        filename: './dist.js'
    },
    module: {
        rules: [
        // loader放在rules这个数组里面
        ]
    }
}
```

3、将loader添加到上面那个数组里，并进行配置，然后就可以使用了。

<h4>5.1、babel-loader</h4>

这个用于将使用ES6规范的js代码，转为ES5。


首先安装一大堆东西，参照下面的命令，一共是4个（包括webpack）

```
npm install --save babel-loader babel-core babel-preset-env webpack
```

创建babel规则文件``.babelrc``，内容设置为：

```
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        }
      }
    ]
  ]
}

```

然后``app.js``里添加文件内容（这显然是es6语法）：

```
let foo = () => {
    console.log('1')
}
foo()
```

运行 ``npm run test`` 执行脚本，等脚本执行完毕后，查看dist文件夹下的 ``dist.js`` 文件。

会发现代码已经被成功转为非es6语法了（截取如下）：

```
var foo = function foo() {
  console.log('1');
};
foo();
```
---

但是，这个只能转一些普通的es6语法，像例如``Promise``、``Set``之类的，他是无法转换的。

如果想要转换这些，我们需要做一些额外的工作。

首先安装插件

```
npm install babel-runtime --save
npm install babel-plugin-transform-runtime --save-dev
```

然后修改``.babelrc``文件的内容为：

```
{
  "presets": [
    "babel-preset-env"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```

【注】：

``babel-runtime``（也就是上面``plugins``数组中的``transform-runtime``），解决了辅助代码（即让我们可以使用新特性的代码）被默认添加到每一个需要他的文件的问题（这会导致文件过大）。

具体解决方法是禁用了babel对每个文件的runtime注入，引入 ``babel-plugin-transform-runtime`` 并且使所有辅助代码从这里引用。

<b>表现效果：</b>假如A模块异步加载B模块，A、B模块里都使用了``Set``，那么为了使A模块正常运行，引入了某些代码。然后因为B模块又是被A模块引入的，那么B模块在被加载的时候，A模块里已经引入的代码，就没必要再次引入了，所以B模块里是不存在A模块引入的那些兼容代码的。

【注（完）】

修改webpack设置文件的loader内容为：

```
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
}
```

最后修改``app.js``这个文件的内容，给里面加一些特殊的es6语法：

```
let foo = () => {
    console.log('1')
}
foo()
let bar = new Promise((resolve, reject) => {
    resolve(1)
})
bar.then(msg => console.log(msg))

let baz = new Set([1, 2, 3])
console.log(baz)

let another = async function () {
    console.time('timeout')
    let result = await new Promise((resolve, reject) => {
        console.log('in Promise')
        setTimeout(() => {
            resolve('Promise resolve')
        }, 1000)
    })
    console.log(result)
    console.timeEnd('timeEnd')
}

another()
```

以上代码包含es6的``Promise``，``Set``，以及es7中的``async/await``。

此时我们运行一下``npm run test``试试，然后查看``dist/dist.js``文件，会发现我们的代码出现在大约1040行的位置，并且原本使用es6、es7语法的代码，都被一段很长很复杂的代码所替换（因为太长，所以这里略过）。

这说明我们转义成功了！

更多请参照[【实战３】解决有es6、es7语法的js代码](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%93%E3%80%91%E8%A7%A3%E5%86%B3%E6%9C%89es6%E3%80%81es7%E8%AF%AD%E6%B3%95%E7%9A%84js%E4%BB%A3%E7%A0%81)

<h4>5.2、css-loader</h4>

对于一般的css文件，我们需要动用三个loader（是不是觉得好麻烦）；

1、``css-loader``：

[css-loader文档](https://doc.webpack-china.org/loaders/css-loader/)

用于处理图片路径，并且会将css样式打包进js文件中，但问题在于，他不会将这些代码插入html中；

配置详解（在官网文档基础上补充）：

<table>
    <thead>
    <tr>
        <td width='10%'>名称</td>
        <td width='10%'>类型</td>
        <td width='10%'>默认值</td>
        <td width='10%'>描述</td>
        <td>备注</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>
            root
        </td>
        <td>
            {String}
        </td>
        <td>
            /
        </td>
        <td>
            解析 URL 的路径，以 / 开头的 URL 不会被转译
        </td>
        <td>
            1、这个是设置/开头的文件，去找哪个文件夹进行静态解析的。<br><br>
            2、例如我app.js文件放在src目录下，静态图片放在static文件夹下，那么root就可以设置为：【__dirname + '/static/'】（不含括号）<br><br>
            3、另外不要写成相对路径（如【'../static/'】），因为他是相对于css文件的路径去找图片的。<br><br>
        </td>
    </tr>
    <tr>
        <td>
            url
        </td>
        <td>
            {Boolean}
        </td>
        <td>
            true
        </td>
        <td>
            启用/禁用 url() 处理
        </td>
        <td>
            1、css正常会解析例如background: url('/logo.png')里面的值。<br><br>
            2、例如某图片不在你的工程里，而是在服务器上。<br><br>
            3、而你是可以预知打包后的html文件和这个图片的相对路径关系，你就可以直接写那个时候的路径，并将url设置为false。<br><br>
            4、如果设置为false，那么所有url都不会进行转义了（也不会触发file-loader），自然也不会报错（即使图片不存在）。
        </td>
    </tr>
    <tr>
        <td>
            alias
        </td>
        <td>
            {Object}
        </td>
        <td>
            {}
        </td>
        <td>
            创建别名更容易导入一些模块
        </td>
        <td>
            说实话我自己捣鼓了半天也没彻底搞明白其原理，但是琢磨出來一些用法：<br><br>
            1、假如图片放在/static目录下，alias: {'@': __dirname + '/static/'}这样写，然后图片可以这样写background:url(~@/logo.png)。注意@前要加~让webpack识别（~是webpack负责，@是css-loader负责）；<br><br>
            2、但是，如果通过@import '~@/another.css'来导入，那么即使another.css放在src/style目录下，然后alias: {'@': __dirname + '/src/style/'}也是没有用的；<br><br>
            3、也就是说，这个对url生效，但是对@import导入css无效；<br><br>
            4、解决场景可以分类摆放图片（例如@开头的是风景类图片，peopel开头的是人物图片），可以做到图片和css文件分离。<br><br>
            5、记得在别名之前加一个波浪线~让webpack识别，否则无法正常工作；
        </td>
    </tr>
    <tr>
        <td>
            import
        </td>
        <td>
            {Boolean}
        </td>
        <td>
            true
        </td>
        <td>
            启用/禁用 @import 处理
        </td>
        <td>
            1、假如你通过@import导入的是某个打包后工程所在位置的css文件；<br><br>
            2、即该文件不在打包前的工程里（例如CDN）；<br><br>
            3、那么这个就有用；<br><br>
            4、表现效果@import导进来的css没有被打包，只是单纯的引入了（该@import代码被直接放在style标签里）；<br><br>
            5、你可以查看dist/index.html的style标签来深刻了解；
        </td>
    </tr>
    <tr>
        <td>minimize</td>
        <td>{Boolean|Object}</td>
        <td>false</td>
        <td>启用/禁用 压缩</td>
        <td>
            1、这个很好理解，原本写css文件的时候，我们各种换行空格，这个改为true之后，换行和空格就去掉了；<br><br>
            2、一般开发的时候，取环境变量，当环境变量为生产环境的时候，设置为true；开发环境的时候，设置为false；<br><br>
            3、<a href="https://github.com/qq20004604/vue-scaffold/blob/master/build/utils.js">参考示例</a>，搜索minimize即可；
        </td>
    </tr>
    <tr>
        <td>sourceMap</td>
        <td>{Boolean}</td>
        <td>false</td>
        <td>启用/禁用 Sourcemap</td>
        <td>
            1、在minimize设置为true后，css代码被压缩了，那么如果我们要调试的话就很麻烦；<br><br>
            2、当这个设置为true后，通过Chrome控制台的Sources标签，在左边栏上面选Sources，可以在树结构的(no domain)里，查看到压缩后和压缩前的CSS代码；<br><br>
            3、即使minimize没有设置为true（不压缩），由于css代码被扔到了js里，因此也是无法直接查看我们写的css代码的；<br><br>
            4、但是这个设置为true后，就可以通过【2】中描述的途径来查看我们写的css代码；
        </td>
    </tr>
    <tr>
        <td>importLoaders</td>
        <td>{Number}</td>
        <td>{Number}</td>
        <td>在 css-loader 前应用的 loader 的数量</td>
        <td>说实话，加不加这个，感觉没啥区别（我还专门研究了一波postcss和autoprefixer让他生效。<br><br>见我关于postcss的配置，webpack把这个注释掉了，如果有见解，欢迎指正</td>
    </tr>
    <tr>
        <td>
            modules
        </td>
        <td>
            {Boolean}
        </td>
        <td>
            false
        </td>
        <td>
            启用/禁用 CSS 模块
        </td>
        <td>
            1、初步理解：这个相当于把css视为模块。例如我有一个css文件 foo.css ，然后里面有一个类 .bar，我可以在js文件里通过 import foo from './foo.css'导入这个css文件；<br><br>
            2、在打包后，foo.css里的类 .bar 会变成具有唯一性的一个字符串（举个例子假设他变成了abcdefg）；<br><br>
            3、假如我在html里使用的是class='bar'，那么显然是无法正常生效的（bar被转为了abcdefg）；<br><br>
            4、那么我可以使用变量foo.bar（在js这里，这是一个变量），赋给原本使用class='bar'的这个DOM节点；<br><br>
            5、由于是变量，所以他的值事实上已经被css-loader转为了abcdefg，可以正常运行了；<br><br>
            6、推荐阮一峰的博客<a href="http://www.ruanyifeng.com/blog/2016/06/css_modules.html">CSS Modules 用法教程</a>
        </td>
    </tr>
    <tr>
        <td>camelCase</td>
        <td>{Boolean|String}</td>
        <td>false</td>
        <td>以驼峰化式命名导出类名</td>
        <td>
            1、这个需要结合modules来看，在modules设置为true时，我们可以通过变量名来获取更名后的css类名；<br><br>
            2、但我们写css类名的时候，一般是例如foo-bar这种写法，在js里显然不合适；<br><br>
            3、因此把这个启用为true，我们就可以使用fooBar这种驼峰式写法了，方便js引用；<br>
        </td>
    </tr>
    <tr>
        <td>localIdentName</td>
        <td>{String}</td>
        <td>[hash:base64]</td>
        <td>配置生成的标识符(ident)</td>
        <td>
            1、这个也是跟modules相关的，用于对原本混算复杂不具有可读性的类名，进行重命名；<br><br>
            2、我觉得这个文章讲这个比较好，<a href="https://juejin.im/entry/5826e755c4c9710054313d6e">你真的知道 css-loader 怎么用吗？</a>，搜索关键词：localIdentName
        </td>
    </tr>
    </tbody>
</table>

2、``style-loader``：

[style-loader文档](https://doc.webpack-china.org/loaders/style-loader/)

用于将 ``css-loader`` 打包好的文件，插入到html文件中，变成一个 ``<style>``标签；

3、``file-loader``：

[file-loader文档](https://doc.webpack-china.org/loaders/file-loader/)

用于处理各种资源文件，一般是图片；