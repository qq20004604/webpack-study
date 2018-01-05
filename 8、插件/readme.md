<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

<h3>8、插件（Plugins）</h3>

<h4>8.1、前述</h4>

Plugins 即插件，开发者可以通过 ``plugins`` 这个属性（数组），来配置插件。

插件的使用特点：

1. 通常需要先 ``require()`` 插件后，才能用；
2. 通过 ``new 对应的插件()`` 来使用；
3. 通常一个插件只干一件事情（或针对一个文件/文件夹），因此如果需要对多个处理，需要 new 多个插件，典型的就是多页项目；
4. 插件大部分配置是独立的（即相同插件，多次 new 出实例，使用各自的配置），但个别情况下，会出现某些插件的部分配置是公共的（比如 webpack-spritesmith 的 ``apiOptions.handlebarsHelpers`` ）；

<h4>8.2、插件的安装和使用</h4>

1、先通过 npm 安装需要的插件，引入 package.json 中（建议安装时参数带 ``--save``）；

2、更改``webpack.config.js``文件，文件内容示例如以下代码，插件放在 plugins 这个数组里面：

```javascript
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
    plugins: [
        // 插件放这里
    ]
}
```

3、将插件添加到上面那个数组里，并进行配置，然后就可以使用了。

<h4>8.3、插件的作用</h4>

可以处理 loader 所不能做的事情。

loader 的特点是链式处理，并且根据模块依赖图来做事。假如有一个模块不在依赖关系之中，那么 loader 就无能为力了。

但是插件就不一样：

1. html-webpack-plugin：可以自定义/选择一个 html 文件，然后打包后生成入口 html 文件，并且在该 html 文件中引入打包好的 js。
2. webpack-spritesmith：可以实现雪碧图。

<h4>8.4、插件列表</h4>

[官方插件列表](https://doc.webpack-china.org/plugins/)

我自己写的插件使用方法：

1. [webpack-spritesmith](https://github.com/qq20004604/webpack-study/tree/master/8%E3%80%81%E6%8F%92%E4%BB%B6/webpack-spritesmith)：用于处理雪碧图；

请查看各个文件夹里的 ``readme.md`` 。