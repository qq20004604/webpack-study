<h2>WEBPACK-SPRITESMITH配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO]()

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

