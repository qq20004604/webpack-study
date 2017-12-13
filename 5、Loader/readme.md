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
    module: {
        rules: [
        // loader放在rules这个数组里面
        ]
    }
}
```

3、将loader添加到上面那个数组里，并进行配置，然后就可以使用了。


【每个loader的使用方法】

请查看各个文件夹里的 ``readme.md`` ，或者查看整个项目的全文档。