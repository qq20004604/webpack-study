<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[实战项目示例目录](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%95%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AA%E6%A0%87%E5%87%86%E9%A1%B9%E7%9B%AE)


<h3>1、需求列表</h3>

基本需求：

1. 引入jQuery（或其他类似库，之所以用 ``jQuery`` 是每个前端开发者都理应会 jQuery）；
2. 使用 ``less`` 作为 ``css`` 预处理器；
3. 标准模块化开发；
4. 有异步加载的模块；
5. 使用 es6、es7 语法；
6. 写一个登录页面作为DEMO，再写一个登录后的示例页面作为跳转后页面；
7. 可适用于多页项目；

打包要求：

1. 启用 hash 命名，以应对缓存问题；
2. css 自动添加兼容性前缀；
3. 将图片统一放到同一个文件夹下，方便管理；

<h3>2、涉及到的知识</h3>

1. [入口](https://github.com/qq20004604/webpack-study/tree/master/3%E3%80%81%E5%85%A5%E5%8F%A3%EF%BC%88%E5%A4%9A%E5%85%A5%E5%8F%A3%EF%BC%89)：设置入口文件；
2. [出口](https://github.com/qq20004604/webpack-study/tree/master/4%E3%80%81%E5%87%BA%E5%8F%A3)：设置打包后的文件夹以及文件命名；
3. [babel-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/babel_loader)：用于将es6、es7等语法，转换为es5语法；
4. [css-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/css_loader)：用于处理css文件（主要是处理图片的url）；
5. [style-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/style_loader)：将转换后的css文件以 style 标签形式插入 html 中；
6. [postcss-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/postcss_loader)：一般用于添加兼容性属性前缀；
7. [less-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/less_loader)：以 less 语法来写 css ；
8. [url-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/url_loader)：用于将图片小于一定大小的文件，转为 base64 字符串；
9. [file-loader](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/file_loader)：``url-loader`` 不能转换 base64字符串 的文件，被这个处理（主要用于设置打包后图片路径，以及CDN等）；
10. ``html-webpack-plugin`` ：用于将已有 html 文件作为模板，生成打包后的 html 文件；


