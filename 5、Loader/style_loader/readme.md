<h2>STYLE-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

<h3>1、概述</h3>

简单来说，``style-loader``是将``css-loader``打包好的css代码以``<style>``标签的形式插入到html文件中。

对于简单项目，打包然后插入也就足够了，但是遇见复杂情况，例如：

1. 需要使用webpack的服务器热加载服务；
2. 对css文件二次处理（更改类名之类）；
3. 启用sourceMap等；
4. 路径转换（相对路径转为绝对路径）等；

显然就不行了。

所以需要通过配置来进行设置。

<h3>2、配置</h3>

有几个属性需要和其他东西（比如某些loader）配合，才能生效。

所以先介绍功能明确的几个，再简述很难直接应用的几个。

<h4>2.0、普通</h4>

导入方式有两种

1. 直接``import 'foo.css'``；
2. es6语法 ``import foo from 'foo.css'``;

前者没啥好说的。

当使用后者导入时，有一些特殊特性：

1. 在使用局部作用域时（``css-loader``的``modules``属性的应用），会有``生成的（局部）标识符(identifier)。``，可以通过``foo.className``来获取
2. 当使用``useable``特性时，可以通过``foo.use()``以及``foo.unuse()``来让css生效/失效；
3. ``url`` 特性尝试失败。


<h4>2.1、attrs</h4>


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
    	<td>attrs</td>
    	<td>{Object}</td>
    	<td>{}</td>
    	<td>添加自定义 attrs 到 style 标签</td>
	</tr>
	</tbody>
</table>	

``attrs`` 属性最好理解。

1. ``attrs``的值是一个对象；
2. 对象 key , val 成对出现的；
3. 插入形式是以 ``key=val``的形式插入；
4. 但例如 ``[name]`` 或者 ``[hash]`` 之类的，无效；

例如：

```
{
    loader: 'style-loader',
    options: {
        attrs: {
            id: 'foo'
        }
    }
}
```

插入到html后，style标签变为如下形式：``<style id="foo" type="text/css">css代码略</style>``。

但是缺点是不能变为哈希值，所以如果想要实现css的局部作用域，还需要其他东西配合（这里略略略）。

<h4>2.2、transform</h4>

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
    	<td>transform</td>
    	<td>{Function}</td>
    	<td>false</td>
    	<td>转换/条件加载 CSS，通过传递转换/条件函数</td>
	</tr>
	</tbody>
</table>	

简单来说，这个是拿到以字符串的形式拿到css文件，然后将这个字符串以参数的形式传给处理函数，函数处理完后返回，返回值即实际插入style标签的内容。

使用方法：

1、配置 ``style-loader`` 的属性如下：

```
{
    loader: 'style-loader',
    options: {
        transform: 'transform.js' // 可以使用相对路径，这里表示跟 webpack.config.js 同目录
    }
}
```

2、在``webpack.config.js``的同一个目录下创建文件：``transform.js``（即上面写的那个路径）

3、在``transform.js``文件内，粘贴如下代码(CommonJS模块形式）：

```
// 这里只有一个参数，即css字符串
module.exports = function (css) {
    console.log(css)
    const transformed = css.replace(/}/g, 'box-sizing: border-box;\n}')
    return transformed
}
```

这段代码的作用，相当于给每个css样式里，添加了一个``box-sizing: border-box;``属性。

例如css文件如下：

```
// foo.css 转换前
#app {
    position: relative;
}
```

转换完后的结果变为：

```
// foo.css 转换后
#app {
    position: relative;
box-sizing: border-box;
}
```

``box-sizing:``前面没有空格，是因为转换函数里，replace第二个参数的``box-sizing:``前没有空格。

4、每个css文件都会执行一次这段代码。css字符串，不包含``@import``导入的css文件相关的几行代码；

5、<b>重要：</b>这段代码执行的时间不在打包的时候，而是在插入到html文件中的时候。

这意味着你可以取得一些根据当前浏览器环境设置的值。例如通过``document.body.clientWidth``拿到浏览器宽度，然后动态计算一些css属性是否插入到页面中（响应式）.

<b>应用：</b>

当以字符串形式拿到css代码的时候，我们可以做很多事情。我举几个例子：

1、判断当前浏览器环境，当需要额外兼容代码的时候，给css属性添加兼容性代码。

例如遇见``box-sizing``，添加``-webkit-box-sizing:``和``-moz-box-sizing:``。

2、可以进行风格设置。

例如同时存在亮色和暗色风格，用户使用的风格在设置后存在cookies或者localStorage，那么写两套代码显然是比较麻烦的。

就可以引入一个颜色映射表（暗色的值->亮色的值），默认使用暗色的值。

当检查到用户使用亮色风格时（读取cookies或者localStorage），通过颜色映射表，利用 ``replace`` 函数，将颜色值替换为亮色的。

<h4>2.3、insertAt和insertInto</h4>

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
    	<td>insertAt</td>
    	<td>{String|Object}</td>
    	<td>bottom</td>
    	<td>在给定位置处插入style标签</td>
	</tr>
    <tr>
    	<td>insertInto</td>
    	<td>{String}</td>
    	<td><head></td>
    	<td>给定位置中插入style标签 </td>
	</tr>
	</tbody>
</table>

简单来说，``insertAt`` 和 ``insertInto`` 共通决定style标签插入哪里。

两种情况：

1. ``insertAt`` 值为 ``string`` 类型。可以是 ``top`` 或者 ``bottom``，表示插入某个标签 <b>内</b> 的顶部或者结尾，和该标签是父子关系；
2. ``insertAt`` 值为 ``object`` 类型。key只能是 ``before``（见 ``node_modules/style-loader/lib/addStyles.js`` 第173行），表示插入到某个标签之前（和该标签是兄弟关系），例如以下：

```
insertAt: {
    before: '#app'
},
insertInto: 'body'
```

以上代码表示，先在``<body>`` 标签能找到``<div id='app'></div>``这个标签，然后插入到这个标签之前；

假如找不到符合要求的标签，则默认插入到 ``<head></head>`` 标签的末尾。


整个插入逻辑如下：

1. 假如 ``insertAt`` 是值是 ``top`` 或者 ``bottom`` ，那么 ``style`` 标签将插入到 ``insertInto`` 所指向的DOM（通过``document.querySelector(target)``获取）的开头或末尾（ ``style`` 标签为指向DOM的子元素）；
2. 假如 ``insertAt`` 的值是对象，那么则插入 ``insertInto`` 的子元素的 ``insertAt.before`` 所指向的DOM之前（即 ``document.querySelector("insertInto insertAt.before")`` 指向的DOM）。

注意，两个属性的标签选择器，都是通过 ``document.querySelector`` 实现的，所以存在两个问题：

1. 属性的值，需要符合 ``document.querySelector`` 的语法；
2. 低版本浏览器（比如IE）可能不支持这个选择器API；


<h4>2.4、sourceMap和convertToAbsoluteUrls</h4>

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
    	<td> sourceMap </td>
    	<td>{Boolean}</td>
    	<td> false </td>
    	<td>启用/禁用 Sourcemap</td>
	</tr>
    <tr>
    	<td> convertToAbsoluteUrls </td>
    	<td>{Boolean}</td>
    	<td> false </td>
    	<td>启用 source map 后，将相对 URL 转换为绝对 URL</td>
	</tr>
	</tbody>
</table>	

首先，``sourceMap`` 实测和翻源代码后，感觉没有生效。

在跟了一遍代码后，推测原因在于，sourceMap的取值，取的是 ``css-laoder`` 的sourceMap的值。

准确的说，在webpack里，css文件被视为一个模块，因此``import``引入的css文件，也是一个模块对象。而在判断的时候，取的是这个模块（是一个object）的属性sourceMap的值，而不是 ``options.sourceMap`` 的值。

我已经提了[issues](https://github.com/webpack-contrib/style-loader/issues/280)给官方了。

而这个模块的值，推测是被``css-loader``的``sourceMap``属性赋值的（我没有去跟源代码，但测试后推断就是这样的）。

其次，从相对路径转为绝对路径，是在前端通过js代码转换的。

第三，``convertToAbsoluteUrls`` 的效果如官方描述一样，具体下面举例。

<b>几种情况如下（截止``style-loader``版本``0.19.0``）：</b>

1. 当``convertToAbsoluteUrls`` 值为false时，依然使用相对路径，即例如``./foo.png``；
2. 当 ``css-loader`` 的 ``sourceMap`` 的值为true，且``convertToAbsoluteUrls`` 值为true时，更改为绝对路径，即例如``http://127.0.0.1:8080/foo.png``；
3. 可能是bug，所以目前不受``style-loader``的``sourceMap``属性的影响；


bug的demo如[链接](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/style_loader_demo)

<h4>2.5、useable</h4>

>作用

让所有引入的css文件，变为手动加载；

>使用方法

```loader: 'style-loader/useable'```

>说明：

1. 当使用这个特性时，``transform``属性失效（打包正常，但挂载的时候表示会报错）
2. 示例代码如下，效果解释：
3. 用一个变量标记当前是否挂载，点击后进行判断；
4. 如果挂载了，通过``style.unref()``从DOM树中移出（这些样式会失效）；
5. 如果没有挂载，那么通过``style.ref()``插入到DOM树中进行挂载（样式生效）

代码：

```
// app.js

import style from './style/style.css'

/* useable（开始） */
let isUse = false

// 这是一个按钮的点击事件
document.querySelector('#test').onclick = function () {
    if (isUse) {
        style.unref()
    } else {
        style.ref()
    }
    isUse = !isUse
}
/* useable（结束） */
```


<h4>2.1、hmr</h4>


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
    	<td></td>
    	<td></td>
    	<td></td>
    	<td></td>
	</tr>
	</tbody>
</table>	
