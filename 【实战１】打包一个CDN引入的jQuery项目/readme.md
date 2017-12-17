<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[实战项目示例目录](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%91%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AACDN%E5%BC%95%E5%85%A5%E7%9A%84jQuery%E9%A1%B9%E7%9B%AE)

<h3>0、使用说明</h3>

安装：

```
npm install
```

运行：

```
webpack
```

<h3>1、需求列表</h3>

1、在html文件里，通过CDN引入了jQuery；

<h3>2、步骤</h3>

安装依赖

```
npm install
```

html文件中引入了jQuery

```
index.html
```

``<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>``

执行打包命令：

```
npm run test
```

查看打包后效果：

```
dist.js
```

<h3>3、说明</h3>

jQuery文件通过CDN引入（script标签的方式），webpack只打包自己的逻辑代码，不打包jQuery代码。

代码开头的：

```
global.$ = window.$
```

不是必须的，但个人建议这么写，相当于明确说明``$``是通过其他方式引入的。
