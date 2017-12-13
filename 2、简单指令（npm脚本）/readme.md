<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。


<h3>2、简单指令（npm脚本）</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/2%E3%80%81%E7%AE%80%E5%8D%95%E6%8C%87%E4%BB%A4%EF%BC%88npm%E8%84%9A%E6%9C%AC%EF%BC%89)

我们实际开发中，一般都是使用``npm run build``或者``npm run dev``之类的指令，这是怎么实现的呢？

答案是利用``package.json``里面的``scripts``属性。

其他文件如【1】中的四个文件，新增一个``package.json``，内容如下：

```javascript
// package.json  注：name只能是以下这种格式，不能有空格或者中文
{
    "name": "simple-command",
    "version": "0.0.1",
    "scripts": {
        "test": "webpack --config webpack.config.js"
    }
}
```

然后控制台执行命令``npm run test``即可。

<b>注：</b>

之所以我们能通过``npm run test``来执行``"webpack --config webpack.config.js"``这样一段命令。

原因是这段命令的开头，以``npm``为开头，所以执行的是全局变量（通常是全局变量，因为npm一般是全局安装）配置的npm包管理器。

然后后面的``run test``是npm负责去执行的，所以``npm run test``这段命令，是npm的特性，而不是webpack的，称作npm脚本。

而之后webpack的命令，是webpack做的事情。但webpack的执行，显然是通过Node.js执行的，所以可以用JavaScript语法。

[npm小结（程序猿小卡）](http://www.cnblogs.com/chyingp/p/npm.html)

[npm的工作原理](http://blog.csdn.net/gentlycare/article/details/51332882)
