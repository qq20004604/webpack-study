<h2>URL-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/less_loader)地址

<h3>1、概述</h3>

``less-loader`` 用于处理编译 ``.less`` 文件，将其转为 ``css``文件代码。

使用 ``less-loader`` 的话，必须安装 ``less``，单独一个 ``less-loader`` 是没办法正常使用的。

> 安装

```
npm install --save less-loader less
```

<h3>2、配置</h3>

<h4>2.1、无任何配置</h4>

``less-loader`` 不使用任何配置的时候，也可以正常使用。但需要配合 ``style-loader`` 和 ``css-loader`` 一起。

示例配置（其他略，参照github上的示例DEMO）：

```
 {
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ]
}
```

less文件：

```
@hundred: 100px;

#app {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid red;
  background: url('./logo.png') no-repeat;
  box-sizing: border-box;
  .top {
    position: absolute;
    top: 0;
    left: @hundred;
    right: @hundred;
    height: @hundred;
    border: 2px dotted green;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: @hundred;
    right: @hundred;
    height: @hundred;
    border: 2px dotted green;
  }
}
```

编译后结果：

```
#app {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid red;
  background: url(fb05d05e8b958e9341f72003afbffed3.png) no-repeat;
  box-sizing: border-box;
}
#app .top {
  position: absolute;
  top: 0;
  left: 100px;
  right: 100px;
  height: 100px;
  border: 2px dotted green;
}
#app .bottom {
  position: absolute;
  bottom: 0;
  left: 100px;
  right: 100px;
  height: 100px;
  border: 2px dotted green;
}
```

说明运行正常。

<b>【注一】</b>

1. ``.less`` 可以通过 ``@import`` 来引入其他的 ``.less`` 文件 或 ``.css`` 文件；
2. 引入的less文件会和之前的less文件同一个``<style>``标签，而引入的css文件会变成新标签；

<b>【注二】</b>

如果想要实现如下引用顺序：

1. ``.css`` 引用 ``.less``；

那么必须在解析 ``.css`` 文件的时候，配置``less-loader``，配置如下：

```
{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader'   // compiles Less to CSS
    ]
}
```

当以css文件作为入口时，起作用的是上面这个配置，而不是 ``test: /\.less$/,`` 这个配置了。


<h4>2.2、globalVars</h4>

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
    	<td>globalVars</td>
    	<td>{Object}</td>
    	<td>undefined</td>
    	<td>声明全局变量</td>
	</tr>
	</tbody>
</table>

正常使用less的全局变量没什么好说的（创建一个用于配置全局样式的 ``.less`` 文件，然后在需要使用全局样式的 ``.less``文件里引用他）。

当然，这种方式很麻烦。

但是，``less-loader``里还提供了另外一种使用全局变量的方式，即在``options.globalVars``里进行配置。

示例代码：

```
//webpack.config.js
...
test: /\.less$/,
use: [
    'style-loader',
    'css-loader',
    {
        loader: 'less-loader',   // compiles Less to CSS
        options: {
            // 这里配置全局变量
            globalVars: {
                'ten': '10px',    // ten可以是ten，也可以是@ten，效果一样，下同
                'hundred': '100px'
            }
        }
    }
]
...
```

```
// style.less
...
height: @hundred;
...
border: @ten dotted green;
...
```

编译后变为：

```
...
height: 100px;
...
border: 10px dotted green;
...
```

<b>【注】</b>

1. ``globalVars`` 的 key ，前面有没有 ``@`` 的效果是一样的；
2. 用 ``modifyVars`` 替代 ``globalVars`` 的效果似乎是一样的（简单测试后如此，但不确定）；


<h4>2.2、paths</h4>

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
    	<td>paths</td>
    	<td>{Array}</td>
    	<td>undefined</td>
    	<td>less文件里，使用独立的文件解析路径</td>
	</tr>
	</tbody>
</table>

<b>解释：</b>

1. 首先，这个不影响 js 文件导入 less 文件，只是影响 less 文件引入其他 less 文件（<b>不包括</b>图片文件等）；
2. 值是数组，数组的元素的类型是字符串（但实测中，数组只有第一个元素生效，其他似乎会被忽视）；
3. 数组的元素的值，需要是文件夹的【绝对路径】；
4. 假如图片／文件在使用非相对路径时，例如：是 ``bar.less`` 时，``less-loader`` 会去 ``paths`` 数组里第一个元素描述的绝对路径，去找对应的文件；

<b>使用 ``paths`` 时，路径寻找顺序：</b>

1、假如配置如下：

```
paths: [
    path.resolve(__dirname, "test")
]
```

2、less文件里，这么引用其他 ``.less`` 文件：

```
@import 'foo.less';
```

3、webpack的寻找顺序是：

1. 在同目录下寻找 'foo.less'，没有找到的话进入下一步；
2. 在 ``path.resolve(__dirname, "test")`` ，即 ``webpack.config.js`` 的同目录中的 ``test`` 文件夹里，去找 ``foo.less``，没有找到的话进入下一步；
3. 最后，会在执行shell命令的文件夹中，去找 ``foo.less``这个文件；
4. 如果以上都找不到，那么会报错。

