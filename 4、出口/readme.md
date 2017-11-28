<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

<h3>4、出口</h3>

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

···
plugins: [
    // 这里是添加的插件
    new HtmlWebpackPlugin({
        title: 'title', // html的title（就是title标签里的东西）
        filename: 'index.html', // 重写后的html文件名，默认是index.html
        template: './demo.html',    // 这个就是那个模板文件，不会改动原有的内容，而是在原来html文件的末尾，将打包编译好的文件添加进去
    })
]
···

然后在模板文件里添加一些内容（具体查看文件夹内的 ``demo.html`` 文件。

最后一如既往的运行``npm run test``即可，查看 ``dist`` 文件夹下的 ``index.html`` 文件。


