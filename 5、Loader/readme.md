<h3>5、Loader</h3>

<h4>5.1、前述</h4>

我们在用别人的脚手架的时候，基本总是会见到loader。

比如：

1. 用vue的时候，我们可能用``vue-loader``；
2. 引入css的时候，我们可能用``css-loader``；
3. 处理一些小图片，我们为了减少请求数，所以需要将图片转为base64字符串，这个时候要用``url-loader``；
4. 处理使用es6等高版本js代码的，我们需要使用``babel-loader``；

还有很多其他的，略略略。

<h4>5.2、loader的安装和使用</h4>

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

<h4>5.3、loader 作用</h4>

对模块的源代码进行转换。

例如输入一个 css 文件，拿到后是一个字符串，进行处理，再返回处理后内容作为css文件；

又例如输出一个有 es6、7 语法的 js 文件，将其编译转换为 es5 语法。

<h4>5.4、loader 匹配方式</h4>

webpack 从入口文件（ entry ）开始解析代码，遇见 es6 的 import，或者 require 语法，导入对应的模块。

每次加载一个新模块时（包括入口文件）（每个文件都被 webpack 视为模块），就会触发能匹配成功的loader（比如 ``test: /\.css$/`` 会匹配成功 ``.css`` 结尾的文件），然后模块被该 loader 所处理。

<h4>5.5、loader 特点</h4>

到 loader 成功匹配到文件后，他是通过以下方式处理的：

<b>1、链式处理：</b>

如代码：

```
{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader'
    ]
},
```

当匹配到 css 文件后，首先被 ``css-loader`` 进行处理，打包成模块，然后被 ``style-loader`` 处理，在 加载 js 文件时，将 css 代码插入到 html 文件之中。

<b>注意：</b>在use这个数组中，处理顺序是从后往前执行的。

<b>注意2：</b>以上是 webpack3 写法。早期是查询字符串写法。

<b>2、可同步可异步：</b>

这个好像没有很好的例子可以体现。

<b>3、运行在 node.js 环境中：</b>

所以 loader 的代码，当然是 Node.js 的啦。

<b>4、loader能支持查询参数，也可以使用 options 对象配置：</b>

查询参数就是查询字符串，如示例代码：

```
{ test: /\.png$/, use: [ "url-loader?mimetype=image/png" ] }
```

就相当于

```
{
    test: /\.png$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                mimetype: 'image/png'
            }
        }
    ]
}
```

下面的是新版webpack写法，上面的是早期的。

这个字符串可以单独针对模块来使用（如果你不需要 loader 按同样的方式处理每一个模块的话）。

<b>5、loader 可以使用插件：</b>

比如 ``postcss-loader`` 的 ``autoprefixer`` 插件，就是用于加 css 兼容性前缀的。

<b>6、其他略略略。</b>

<h4>5.6、loader列表</h4>

1. [babel-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/babel_loader)：用于将es6、es7等语法，转换为es5语法；
2. [css-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader)：用于处理css文件（主要是处理图片的url）；
3. [style-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/style_loader)：将转换后的css文件以 style 标签形式插入 html 中；
4. [postcss-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/postcss_loader)：一般用于添加兼容性属性前缀；
5. [less-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/less_loader)：以 less 语法来写 css ；
6. [url-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/url_loader)：用于将图片小于一定大小的文件，转为 base64 字符串；
7. [file-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/file_loader)：``url-loader`` 不能转换 base64字符串 的文件，被这个处理（主要用于设置打包后图片路径，以及CDN等）；
8. [html-withimg-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/html_withimg_loader)：用于加载html模板；

请查看各个文件夹里的 ``readme.md`` 。