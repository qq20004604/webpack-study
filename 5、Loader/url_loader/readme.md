<h2>URL-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/style_loader)地址

<h3>1、概述</h3>

简单来说，``url-loader``的效果类似``file-loader``。

>安装

```
npm install --save url-loader
npm install --save file-loader
```

>优点：

1. 可以将css文件中的图片链接，转为base64字符串，或移动到打包后文件夹；
2. 即使图片大小超出限制，也可以通过 ``fallback`` 调用 ``file-loader`` 来处理；

>缺点：

1. 必须配置limit属的值，不然会默认将所有图片（无论大小）转为base64字符串；
2. 通常情况下，还需要安装 ``file-loader``，因为当图片超出 ``limit`` 大小的时候，就会去调用 ``file-loader`` 来处理；


<h3>2、配置</h3>

<h4>2.1、limit</h4>

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
    	<td>limit</td>
    	<td>{Number}</td>
    	<td>undefined</td>
    	<td>Byte limit to inline files as Data URL</td>
	</tr>
	</tbody>
</table>

使用``url-loader``的唯一目的，可以说就是为了这个，效果是将文件大小低于指定值的图片，转为base64字符串。

值表示小于这个大小的图片会被转码，单位是字节（``1024`` 即 1KB）

注意，假如没有设置这个属性，那么无论图片多大，都会被转为base64字符串。

配置：

```
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }
    ]
}
```

css文件：

```
#app {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid red;
    background: url('./logo.png') no-repeat;
    box-sizing: border-box;
}

#logo {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid red;
    background: url('./logo.jpg') no-repeat;
    box-sizing: border-box;
}
```

<b>webpack打包后效果：</b>

```
url('./logo.jpg')
``` 

和

```
url('./logo.png')
```

变为

``url(很长一个base64字符串)``

<b>注：</b>

1. 如果你想 ``.png`` 文件小于8kb转为base64字符串，但是 ``.jpg``文件不管大小多少，都不转为base64字符串；
2. 那么就需要用 ``file-loader`` 来搬运 ``.jpg`` 文件， ``url-loader`` 来搬运和转码 ``.png``文件；
3. 不能尝试两次调用 ``url-loader`` 来，用两个不同的配置来同时处理两种情况；
4. 不过这个场景应该出现的极少。

<h4>2.2、mimetype</h4>

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
    	<td>mimetype</td>
    	<td>{String}</td>
    	<td>extname</td>
    	<td>Specify MIME type for the file (Otherwise it's inferred from the file extension)</td>
	</tr>
	</tbody>
</table>

这个配置的意思呢，就是说，要不要把其他后缀名的图片文件，统一转为同一种格式的base64编码。

例如：

1. 假如我有一个``logo.png``和一个``logo.jpg``图片；
2. 那么png文件转码后的开头部分是：``data:image/png;base64,``；
3. 而jpg文件转码后的开头部分是：``data:image/jpeg;base64,``；
4. 如果配置这么写：``mimetype: 'image/png'``；
5. 那么开头部分将统一变为：``data:image/png;base64,``；
6. 另外，这个改变只是修改开头部分，但是实际大小是不影响的（当然，``jpeg``要比``png``多一个字符，实际测试结果，表示差别只有这一个字符而已）；

<h3>2.3、fallback</h3>

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
    	<td>fallback</td>
    	<td>{String}</td>
    	<td>file-loader</td>
    	<td>Specify loader for the file when file is greater than the limit (in bytes)</td>
	</tr>
	</tbody>
</table>

简单来说，就是指，当文件的大小超出 ``url-loader`` 的处理之后，该怎么进行处理。

默认情况下，是通过 ``file-loader`` 进行处理的。如果有特殊需要，也可以通过其他来处理。

至于 ``file-loader`` 的 ``options``，取的是 ``url-loader`` 的 ``options`` 的值，因为二者的 ``options`` 没有冲突，所以可以正常使用。

注意，这个属性的 type 是 ``String``，所以如果使用其他 ``loader`` ，也只能和 ``url-loader`` 的 ``options`` 写一起。

示例代码：

```
{
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8192,
                name: 'img/[hash].[ext]'
            }
        }
    ]
}
```

效果描述：

1. 图片小于 8KB （8192字节），转为base64字符串；
2. 如果大于等于 8KB，那么被 ``file-loader`` 所处理；
3. ``file-loader`` 将图片文件放在打包后的 ``img``文件夹下，命名规则是：``[hash].[ext]``（即哈希值 + 后缀名用原后缀名）；