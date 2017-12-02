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

<h4>2.1、hmr</h4>
<h4>2.1、hmr</h4>
<h4>2.1、hmr</h4>
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
