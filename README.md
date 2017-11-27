<h3>0、前注</h3>

本文内容源于[webpack中文文档](https://doc.webpack-china.org/concepts/)，以及我自己实践中写的若干DEMO。

每个DEMO以文件夹为单位，从入门到进阶，根据文件夹编号为准，逐步递进。

成文时，webpack版本是【3.8.1】

<h3>1、安装webpack</h3>

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

<h3>1、webpack基本的框架</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/1%E3%80%81%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84webpack%E5%AE%9E%E4%BE%8B)

文件目录见``1、最简单的webpack实例``这个目录。

```
// webpack.config.js 这个是webpack的管理配置文件
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

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/2%E3%80%81%E7%AE%80%E5%8D%95%E6%8C%87%E4%BB%A4)

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

<h3>3、入口</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/3%E3%80%81%E5%85%A5%E5%8F%A3)

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

<h4>4.2、出口文件名根据入口文件名所决定：</h4>

上面讲了多入口，以及对应的多出口的配置写法，可以参考上面【3】中的内容。

那么假如单入口``entry: './app.js',``，然后output直接写``filename: './dist/[name].js'``会发生什么事情呢？

因为入口相当于``main: './app.js'``，所以打包好的文件名是：``main.js``。

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