<h2>POSTCSS-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/postcss_loader)地址

<h3>0、使用说明</h3>

安装：

```
npm install
```

运行：

```
npm run test
```

<h3>1、概述</h3>

``postcss-loader`` 用于处理css代码，具有下列特点：

1. 通常由 ``options`` 和 ``plugins`` 两部分组成，``plugins`` 虽然嵌套在 ``options`` 里，但实际上是通过其他插件生效的；
2. 配置是可以独立的（每个配置的插件也是独立的）。详细介绍阅读【2.1】；

还有一些自定义配置，但由于篇幅所限，这里就不像之前那样详解每个配置了（主要是很多都依赖于其他东西）。

只写一些常用功能。

<h3>2、配置</h3>

<h4>2.1、独立配置</h4>

所谓独立配置，指的是在js文件中，引入的css文件如何被``postcss-loader``解析，取决于和他最近的那一个postcss的设置文件。

<b>注：</b>

对在css文件中，通过``@import``导入的css文件无效：

1. 必须是通过通过``import``引入到js里面的css文件，才会被``postcss-loader``解析生效；
2. 如果是``a.css``，通过``@import './b.css'``引入``b.css``文件，那么该配置对``a.css``生效，对``b.css``无效；
3. 我查了很多资料，目前没找到能让``postcss-loader``对在css文件中，通过``@import``方式导入其他的css文件，进行生效的方法。如果有，请提 [issues](https://github.com/qq20004604/webpack-study/issues) 给我。

优先级：

1. 在 ``webpack.config.js`` 中的``module.rules``属性里设置的优先级最高；
2. 然后按顺序找，离css文件最近的``postcss.config.js``配置文件，遇见的第一个文件其次；
3. 按顺序找的后面的文件优先级最低；
4. 找不到配置会报错；

<b>注（完）</b>

先假设 ``webpack.config.js`` 里配置方式如下（无任何特殊配置）：

```
// ...略略略
{
	test: /\.css$/,
	use: [
	    'style-loader',
	    'css-loader',
	    'postcss-loader'
	    ]
}   
// ...略略略              
```

简单来说，``postcss-loader`` 的配置文件名为：``postcss.config.js``。

假设文件树结构如下：

```
.
|____app.js
|____webpack.config.js
|____index.html
|____postcss.config.js	// 1#设置文件
|____style
| |____postcss.config.js	// 2#设置文件
| |____style.css
|____style2
| |____bar.css
| |____postcss.config.js	// 3#设置文件
```

引用（``import``）结构是：

1. ``app.js`` -> ``style/style.css``
2. ``app.js`` -> ``style2/bar.css``

假如两个css文件都有一条css属性：``box-sizing: border-box;``；

然后 ``style/postcss.config.js`` （2#)的设置如下（兼容性配置）：

```javascript
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                "> 0.01%"
            ]
        })
    ]
}
```

``style2/postcss.config.js`` (3#)的设置如下（默认配置）：

```javascript
module.exports = {}
```

经过``postcss-loader``的处理之后，有兼容性配置的css文件，其插入html文件后，css属性变为如下：

```css
-webkit-box-sizing: border-box;
   -moz-box-sizing: border-box;
        box-sizing: border-box;
```

无兼容性配置的css文件，其插入html文件后，css属性变为如下：

```
box-sizing: border-box;
```

说明一点，对于``postcss-loader``来说，他优先取同目录下的``postcss.config.js``的配置属性。

另外，由于2#和3#设置文件的存在，因此无论1#如何设置，都不会影响其效果。

假如css文件找不到同目录下的``postcss.config.js``文件，那么会依次往上级目录寻找，直到找到，或者抵达项目根目录为止（以上面这个目录结构为例，即``webpack.config.js``所在目录是根目录）

<h4>2.2、自定义配置文件路径</h4>

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
    	<td>config</td>
    	<td>{Object}</td>
    	<td>undefined</td>
    	<td>Set postcss.config.js config path && ctx</td>
	</tr>
	</tbody>
</table>

在上面，我们写了``postcss-loader``的配置文件的使用方式，分别是：【写在``webpack.config.js``中】，【配置文件放在对应的css文件的同级目录或者上级目录】。

但是假如我们需要统一管理 ``postcss-loader`` 的配置文件，那么就需要通过 ``config`` 来处理。

示例代码如下：

```javascript
{
    loader: 'postcss-loader',
    options: {
        config: {
            path: './config'    // 写到目录即可，文件名强制要求是postcss.config.js
        }
    }
}
```

表示会去 ``webpack.config.js`` 的同目录下去找文件夹 ``config``，然后在该文件夹下找到 ``postcss.config.js`` 文件（文件名不能改变），从而读取配置。

假如这么写，会导致【放在对应的css文件，的同级目录或者上级目录，的``postcss-loader``的配置文件<b>失效</b>】。原因是优先级问题。

除此之外，还有一个``context``设置，略略略。


<h4>2.3、sourceMap</h4>

测试后，无效（开启与否文件大小不变）


<h3>3、插件</h3>

除了 ``autoprefixer`` 用于加兼容性前缀，其他基本都有更好的，比如``stylelint``不如用``eslint``系列替代。

<h4>3.1、autoprefixer</h4>

这个是最应该添加的插件了。

效果是对css文件添加兼容性前缀。

>安装：

```
npm install autoprefixer --save
```

>官方github地址：

https://github.com/postcss/autoprefixer

>使用方式：

```javascript
// postcss.config.js
let autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                "> 0.01%"
            ]
        })
    ]
}
```

>效果：

应该是兼容性最强的配置方法了，例如``box-sizing``可以添加两个前缀，有些特性可以添加三个前缀，如下：

转换前

```css
transform: rotate(0deg);
```

转换后：

```css
-webkit-transform: rotate(0deg);
   -moz-transform: rotate(0deg);
     -o-transform: rotate(0deg);
        transform: rotate(0deg);
```

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

>其他特性：

不仅可以添加前缀，也可以删除旧前缀（过时前缀）等。详细查看官方文档。

非特殊要求，直接使用上面这个配置就行了（如果不需要最多的前缀，可以把上面的改为

```javascript
autoprefixer({
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                "> 1%"
            ]
        })
```

<h3>3、参考文章</h3>

[PostCSS配置指北](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/CSS/PostCSS%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8C%97.md)

