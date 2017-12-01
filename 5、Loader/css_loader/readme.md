<h2>CSS-LOADER配置详解</h2>

<h3>1、概述</h3>

对于一般的css文件，我们需要动用三个loader（是不是觉得好麻烦）；

1、``css-loader``：

先附上官网文档（中文）的链接：[css-loader文档](https://doc.webpack-china.org/loaders/css-loader/)。

不过说实话，这个官方文档讲的很糟糕，看的人一脸懵逼。

``css-loader``主要用于处理图片路径（其实也包括例如导入css文件的路径），并且会将css样式打包进js文件中（以模块的形式打包导入）；

但问题在于，他不会将这些代码插入html中，因此还需要通过例如``style-loader``来实现将打包好的css代码插入html文件中。


2、``style-loader``：

同样先附上官网文档（中文）的链接：[style-loader文档](https://doc.webpack-china.org/loaders/style-loader/)

<b>基本用法：</b>

用于将 ``css-loader`` 打包好的css模块，插入到html文件中，变成一个 ``<style>``标签；

3、``file-loader``：

[file-loader文档](https://doc.webpack-china.org/loaders/file-loader/)

<b>基本用法：</b>

用于处理各种资源文件，一般是图片，不然图片是没办法被同时打包的。

<h3>2、css-loader配置详解</h3>

先吐槽一波，中文文档里的说明，真的是描述的一点都不清楚。

<h4>2.1、root</h4>

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
    </tr>
    </tbody>
</table>

官方文档里对这个解释不够严谨。

首先，假如不设置设个属性，如果理解为，以 ``/`` 开头的url不会被转译，从结果来看，也不算错；

然而，假如设置这个属性的话，那么就不一样了。

在面对<b>图片路径</b>时，这个属性有三种情况：

1. 当不设置这个属性的时候，``css-loader``不会去解析以``/``开头的图片路径，也不会报错；
2. 当设置这个属性的时候，即使你设置其值为默认值 ``/``，``css-loader``也会去尝试解析这个路径，如果找不到对应的图片，会报错；
3. 当设置这个属性的值为非默认值，和【2】中的行为是一样的，``css-loader``去尝试解析这个路径，如果找到图片，则正常解析，找不到，会报错；

<br>
当设置这个属性时，是指，当url以 ``/``为开头时，到底去找哪里的文件夹作为解析以 ``/``为开头的url路径的文件；

当面对<b>css文件路径</b>时，即在css文件里，通过 ``@import`` 引入css文件时，这个是不对css文件的路径生效的（即使找不到，也不会报错）。

<b>示例：</b>

文件树：

```
根目录
|-- src
| |-- app.js
| |-- src
|   |-- logo.png
|
|-- static
| |-- abc.png
|
|-- webpack.config.js
```

那么在 ``webpack.config.js`` 里配置的时候，应该这么写：``root: __dirname + '/static/'``。

``__dirname`` 表示根目录的绝对路径。假如根目录的路径是 ``D:/abc/def``，那么 ``__dirname`` 就表示 ``D:/abc/def`` ，而 ``__dirname + '/static/`` 则表示 ``D:/abc/def/static``

这就是告诉 ``css-loader`` ，遇见 ``/`` 开头的url路径，你应该去 ``D:/abc/def/static`` 这个路径下去找文件。



<h4>2.2、</h4>

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
    </tr>
    </tbody>
</table>

首先，我们已知，``css-loader`` 正常会解析css属性里的图片url路径，例如 ``background: url('/logo.png')`` 里面的值。

那么，假如某图片不在你的工程里，而是在服务器上。

而你是可以预知打包后的html文件和这个图片的相对路径关系，你就可以直接写那个时候的路径，并将url设置为false。

但是，如果设置为false，那么所有url都不会进行转义了（也不会触发file-loader），自然也不会报错（即使图片不存在）。

<b>示例：</b>

假如打包后，上传到服务器的目录为：

```
dist
|-- app.js
|-- logo.png
```

那么你如果想引用 ``logo.png`` ，那么把 ``url`` 设置为 ``false`` 之后，然后路径这么写就行了 ``background: url('./logo.png')``。

<h4>2.3、alias</h4>

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
    </tr>
    </tbody>
</table>

说实话我自己捣鼓了半天也没彻底搞明白其原理，但是琢磨出來一些用法：

1、对图片路径生效

假如文件结构：

```
根目录
|--static
|  |-- logo.png
|-- webpack.config.js
```

解释：

1. <b>已知：</b> 图片放在 ``/static`` 目录下；
2. <b>已知：</b>不确认css文件放在哪里（因为模块化，方便移动，所以可能更改模块的目录结构）；
3. <b>需求：</b>我想要确保我的css文件必然能引用到这个图片，即使更改模块的文件路径，也不影响（不需要我二次去修改）；
4. <b>行动：</b>那么添加 ``css-loader`` 的属性，设置如下：``alias: {'@': __dirname + '/static/'}`` ;
5. <b>行动：</b>在css文件里，图片如下引用 ``background: url(~@/logo.png)``；
6. <b>结果：</b>我就可以确保必然css文件必然能引用到这个图片了；
7. <b>注意：</b> ``@`` 前要加 ``~`` 让 ``webpack`` 识别（``~`` 是 ``webpack`` 负责识别，认为是根目录，而 ``@`` 是 ``css-loader`` 负责）；



2、对 ``@import`` 引入的css文件无效；

假如文件结构：

```
根目录
|--static
|  |-- style.css
|  |-- foo.css
|-- webpack.config.js
```

解释：

1. 文件目录结构如上；
2. 在 ``style.css`` 如果通过 ``@import '~@/foo.css'`` 来导入；
3. 即使在 ``webpack.config.js`` 里这么设置 ``alias: {'@': __dirname + '/src/style/'}`` 也是没有用的；

3、解决场景：

这个可以应用的场景挺多，不过现在很多是通过webpack的别名通用配置来解决

1. css文件和图片文件分离；
2. 也可以分类摆放图片（例如@开头的是风景类图片，peopel开头的是人物图片）；
3. 记得在别名之前加一个波浪线~让webpack识别，否则无法正常工作；

<h4>2.4、</h4>

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
    
    </tbody>
</table>


<h4>2.5、</h4>

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
    
    </tbody>
</table>


<h4>2.6、</h4>

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
    
    </tbody>
</table>

<h3>3、项目地址</h3>

[https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader) ，请 <b>Star</b> 和 <b>fork</b> 到本地后，注意相关配置。