<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

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