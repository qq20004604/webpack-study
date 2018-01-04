<h2>WEBPACK-SPRITESMITH配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/8%E3%80%81%E6%8F%92%E4%BB%B6/webpack-spritesmith)

<h3>0、使用说明</h3>

首先你得会用 Vue.js，不然可能对本文部分内容无法理解

安装：

```
npm install
```

运行：

```
// 开发模式（推荐使用这个）
npm run dev

// 打包到dist目录
npm run build
```

单独安装 webpack-spritesmith：（由于有雪碧图，所以记得，至少要有 ``file-loader``）

```
npm i --save webpack-spritesmith
```


<h3>1、概述</h3>

``webpack-spritesmith`` 简单来说，就是把小图片拼成雪碧图，然后通过 css 类引入（再也不需要你自己写雪碧图的css，和在ps里面拼雪碧图了）。

我们之前用 ``url-loader`` 来将图片转base64字符串，这是另外一种解决方案，据说雪碧图的性能更好一些。

使用说明：

1. 将小图片放到某一个文件夹；
2. 通过配置拿到这个文件夹下，后缀名符合要求（自己配置）的所有图片；
3. 自动生成雪碧图和 css 文件，并插入到配置好的文件夹内；
4. css 文件自动引入了雪碧图（需要自行配置相对路径）；
5. 用户引入 css 文件，然后使用指定类即可；


<h3>2、配置</h3>

【这里<b>不是</b>英文文档的直接翻译】，示例参照[DEMO](https://github.com/qq20004604/webpack-study/tree/master/8%E3%80%81%E6%8F%92%E4%BB%B6/webpack-spritesmith)

1、src 简单来说，这个属性用于配置你从哪里捕获这些小图片。这就意味着，你需要把加入雪碧图的图片，单独放到某一个文件夹。

```
cwd 
必填
就是小图片所在的目录啦，注意，不会递归子目录（即子目录里的会被无视）

glob 
必填
类型是字符串，语法是glob语法（类似正则语法），有点像loader匹配符合要求的文件名。
```

 
2、target 输出文件的配置

```
image 
必填
把雪碧图输出到哪（需要带文件名）（注意这里不是指打包后，而是指打包前，实际打包还是被url-loader处理的）

css 
必填
输出的css文件，可以是字符串、或者数组（如果是数组的话，输出多个同样的文件）
```


3、apiOptions 配置属性

```
generateSpriteName 
可选，
是一个函数，有一个参数（是文件的绝对路径，字符串），默认值是返回文件名（不含后缀和路径）。
这个用于命名类名，默认是文件名作为类名

cssImageRef 
必填，
生成的图片在 API 中被引用的路径。
简单来说，就是你上面输出了 image 和 css ，那么在 css 用什么样的路径书写方式来引用 image 图片（可以是别名，或相对路径）

handlebarsHelpers 
可选
是一个对象，并且是全局的（意味着后面的本插件的这个配置会覆盖前面的配置）。
给 handlebars 用的，没搞懂，但一般用不上。
```

4、spritesmithOptions 可选，配置 [spritesmith](https://github.com/Ensighten/spritesmith) 用的。里面可以定制比如雪碧图的排列方向。


5、retina 可选，retina 屏的配置。略略略。

关于解决 retina 屏的雪碧图的问题，可以参考这个 [Retina屏下的CSS雪碧图](https://www.toobug.net/article/css_image_sprites_on_retina_screen.html)，所以最好给 spritesmithOptions.padding 属性赋值 2。

这个属性用于图片放大缩小。

6、customTemplates 

可选，

这个应该是指用户自定义 css 模板，

官方参考模板是：``/node_modules/spritesheet-templates/lib/templates/css.template.handlebars``这个文件。

<h3>3、问题答疑</h3>

【问题一】为什么每个类名都以``.icon-``开头？

【答】因为其使用的是 handlebars 模板 ``node_modules/spritesheet-templates/lib/templates/css.template.js``

然后模板中 ``selector`` 的值是被 ``node_modules/spritesheet-templates/lib/templates/css.template.js`` 处理过的。

【问题二】我如何更改雪碧图的 css 模板？

【答】参考问题一中，给的 css 模板，然后自己在 customTemplates 去修改。