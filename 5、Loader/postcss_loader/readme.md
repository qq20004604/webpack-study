<h2>POSTCSS-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/postcss_loader)地址

<h3>1、概述</h3>

``postcss-loader`` 用于处理css代码，具有下列特点：

1. 通常由 ``options`` 和 ``plugins`` 两部分组成，``plugins`` 虽然嵌套在 ``options`` 里，但实际上是通过其他插件生效的；
2. 配置是可以独立的。详细介绍阅读【2.1】；

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

```
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

```
module.exports = {}
```

经过``postcss-loader``的处理之后，有兼容性配置的css文件，其插入html文件后，css属性变为如下：

```
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


<h3>3、参考文章</h3>

[PostCSS配置指北](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/CSS/PostCSS%E9%85%8D%E7%BD%AE%E6%8C%87%E5%8C%97.md)

