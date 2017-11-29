<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

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
