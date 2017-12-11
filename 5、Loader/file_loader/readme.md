<h2>FILE-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/file_loader)地址

<h3>1、概述</h3>

简单来说，``file-loader`` 就是将文件（由于一般是图片文件为主，所以下面通常使用图片两字作为替代，方便理解。其他的包括字体文件等），在进行一些处理后（主要是处理文件名和路径），移动打包后的目录中。

处理的内容包括：

1. 文件名的处理，比如加 ``[hash]`` ；
2. 路径的处理，比如【把图片文件统一放到img文件夹中】；

>优点：

相较于 ``url-loader`` 可以将图片转为base64字符串，``file-loader`` 在功能上更加强大一些；

>缺点：

实际开发中，将一定大小以下的图片转为 base64字符串，有利于加载速度的提升。

<h3>2、配置</h3>

<h4>2.1、name</h4>

<table>
    <thead>
    <tr>
        <td>名称</td>
        <td>类型</td>
        <td>默认值</td>
        <td>描述</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>name</td>
    	<td>{String|Function}</td>
    	<td>[hash].[ext]</td>
    	<td>为你的文件配置自定义文件名模板</td>
	</tr>
	</tbody>
</table>

简单的来说，这个就是规定，如何命名打包后的文件夹的文件名的。

默认值表示：命名是 ``哈希值`` + ``扩展名`` 的形式。

常见命名方式是：``img/[hash].[ext]``，即将所有的图片（准确的说，是被``file-loader``处理的文件），都打包到 img 文件夹下。

几点：

1. ``[hash:6]``可以控制 hash 值的长度，6 表示长度为6，默认是 32；
2. ``[ext]`` 表示是原文件的扩展名，应该没人会想改这个吧？
3. ``[path]`` 不好用一句话概括。举个例子，图片在 ``/src/logo.png``，打包后文件夹是 ``dist``，配置为 ``'[path][name].[ext]'``，那么图片最终为：``/dist/src/logo.png``。实际上是相对于``context``的路径，``context``默认是``webpack.config.js`` 的路径；
4. ``[name]`` 表示原文件的文件名（不含后缀名）。例如 ``logo.png`` 就是指 ``logo``，但一般不推荐用这个，或者就算用这个，也要加上 ``[hash]``，不然不同文件夹有同名文件就出问题了；
5. ``[hash]`` 的全部实际为：``[<hashType>:hash:<digestType>:<length>]``，中间用冒号连接，除了 hash 都可以省略，通常使用默认的就行了，顶多带个长度来限制文件名长度。

<h4>2.2、context</h4>

<table>
    <thead>
    <tr>
        <td>名称</td>
        <td>类型</td>
        <td>默认值</td>
        <td>描述</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>context</td>
    	<td>{String}</td>
    	<td>this.options.context</td>
    	<td>配置自定义文件 context，默认为 webpack.config.js context</td>
	</tr>
	</tbody>
</table>

简单暴力的说，影响 ``name`` 中的 ``[path]``，

举例：

1. 根目录文件夹名为：``file_loader``；
2. 图片路径：``src/logo.png``；
3. 打包文件夹是：``dist``；
4. 配置为：``context: __dirname + '/../'``，``name: '[path][name].[ext]'``；
5. 打包结果：``dist/file_loader/src/logo.png``；



<h4>2.3、publicPath</h4>

<table>
    <thead>
    <tr>
        <td>名称</td>
        <td>类型</td>
        <td>默认值</td>
        <td>描述</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>publicPath</td>
    	<td>{String|Function}</td>
    	<td>__webpack_public_path__</td>
    	<td>为你的文件配置自定义 public 发布目录</td>
	</tr>
	</tbody>
</table>

``publicPath`` 这个一般会用webpack本身配置的，和那个效果也一样，但假如你想单独配置，就用这个。

举例：

1. 假如，你计划把图片打包到放到CDN，我随便举个例子：``https://www.abc.com/img``这个目录下；
2. 由于 CDN 和你本地服务器的网址肯定不同，所以你显然是需要通过绝对路径来加载这个图片的；
3. 假如，图片名字为：``logo.png``（为了方便理解，我不加``[hash]``），那么预期图片的 url 为：``https://www.abc.com/img/logo.png``；
4. 那么，你这样配置就可以了：``publicPath: 'https://www.abc.cn/img/'``，``name: '[name].[ext]'``
5. 于是，图片被打包到``img``文件夹下，加载该图片的链接是：``https://www.abc.cn/img/logo.png``；
6. 最后，你把``img``文件夹整个丢到 CDN 上，就ok啦；

<h4>2.4、outputPath</h4>

<table>
    <thead>
    <tr>
        <td>名称</td>
        <td>类型</td>
        <td>默认值</td>
        <td>描述</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>outputPath</td>
    	<td>{String|Function}</td>
    	<td>'undefined'</td>
    	<td>为你的文件配置自定义 output 输出目录</td>
	</tr>
	</tbody>
</table>

这个就更简单了，就是相当于在name之前加了一个文件夹路径；

示例代码：

```
name: '[name].[ext]',   // 文件名，这个是将图片放在打包后的img文件夹中
publicPath: 'https://www.abc.cn/img/',
outputPath: 'myImage/'    // 这里记得后面要加一个斜杠
```

图片路径为：``src/logo.png``，打包后引用该图片的 url 变为：``https://www.abc.cn/img/myImage/logo.png``

效果和以下配置是一样的：

```
name: 'myImage/[name].[ext]',   // 文件名，这个是将图片放在打包后的img文件夹中
publicPath: 'https://www.abc.cn/img/',
```

但优点在于，这个属性可以配为函数，因为是函数，所以就可以判断环境，然后返回不同的值；

当然，``name`` 也可以实现（写成一个函数的返回值，例如 ``name: getName()``），但毕竟不好看，对吧；

<b>注：</b>

1、如果要写成函数，应该写成如下形式：

```
outputPath: function (fileName) {
    return 'myImage/' + fileName    // 后面要拼上这个 fileName 才行
}
```


<h4>2.5、useRelativePath</h4>

<table>
    <thead>
    <tr>
        <td>名称</td>
        <td>类型</td>
        <td>默认值</td>
        <td>描述</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>useRelativePath</td>
    	<td>{Boolean}</td>
    	<td>false</td>
    	<td>如果你希望为每个文件生成一个相对 url 的 context 时，应该将其设置为 true</td>
	</tr>
	</tbody>
</table>

一般不启用这个。

至于效果，简单来说，当这个开关打开时：

1. 首先会获取源代码中，图片文件，相对于css文件的路径关系；
2. 然后打包后，css 代码通常会被打包到 js 文件中，于是根据之前所获取的【路径关系】，来保存打包好的图片文件；

举例来说：

1. 图片路径：``src/img/logo.png``；
2. css 路径：``src/style/style.css``；
3. useRelativePath 设为 true；
4. css被打包到js后，js的文件路径：``dist/dist.js``；
5. 打包后的图片路径：``img/logo.png``；
6. 原因是图片相对于css的路径关系是：css文件的上级目录的img文件夹中命名为logo.png；



<h4>2.6、emitFile</h4>

<table>
    <thead>
    <tr>
        <td>名称</td>
        <td>类型</td>
        <td>默认值</td>
        <td>描述</td>
    </tr>
    </thead>
    <tbody>
    <tr>
    	<td>emitFile</td>
    	<td>{Boolean}</td>
    	<td>true</td>
    	<td>默认情况下会生成文件，可以通过将此项设置为 false 来禁止（例如，使用了服务端的 packages）</td>
	</tr>
	</tbody>
</table>

简单粗暴的说，这个设置为 false 后，除了图片不会被打包出来，其他都按正常的来。