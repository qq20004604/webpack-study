<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[实战项目示例目录](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%92%E3%80%91%E6%89%93%E5%8C%85%E4%B8%80%E4%B8%AAbootstrap%E9%A1%B9%E7%9B%AE%EF%BC%88%E6%89%93%E5%8C%85%E6%96%87%E4%BB%B6%E5%B8%A6hash%EF%BC%89)

<h3>1、需求列表</h3>

1、html文件引入了一些外部资源；

2、html文件里有一些写好的内容（比如html）；

3、打包好的js文件加 ``chunk`` ，用于解决缓存问题；

<h3>2、步骤</h3>

安装依赖

```
npm install
```

html模板（有需要可以自行编辑）：

```
demo.html
```

执行打包命令：

```
npm run test
```

查看打包后效果：

```
dist/index.html
```

<h3>3、说明</h3>

因为打包好的地址带hash值，所以显然不能手动写html文件来引入打包好的文件，因此引入了 ``html-webpack-plugin`` 插件，以原文件为模板渲染出打包好的html文件。