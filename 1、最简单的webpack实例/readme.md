<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。


<h3>1、webpack基本结构</h3>

[示例目录](https://github.com/qq20004604/webpack-study/tree/master/1%E3%80%81%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84webpack%E5%AE%9E%E4%BE%8B)

文件目录见``1、最简单的webpack实例``这个目录。

```javascript
// webpack.config.js 这个是webpack的管理配置文件

// 以CMD的格式导出模块
module.exports = {
    // 入口文件，指向app.js
    entry: './app.js',
    // 出口文件
    output: {
        // 文件名，将打包好的导出为bundle.js
        filename: './bundle.js'
    }
}
```
```javascript
// app.js  这个是入口文件
import bar from './bar'

bar()
```
```javascript
// bar.js 这个是入口文件引入的模块
export default function bar () {
    console.log('bar')
}
```
```html
// page.html 这个是html目录文件，这个文件引入入口文件
<html>
<head>
    <title>1、最简单的webpack实例</title>
</head>
<body>
<script src="./bundle.js"></script>
</body>
</html>
```

控制台执行``webpack``（或者 ``webpack --config webpack.config.js`` ），会显示如下内容：

```
D:\study notes\Project\webpack_learner\1、最简单的webpack实例>webpack
Hash: 2fdcc03878d7c5480ce6
Version: webpack 3.8.1
Time: 58ms
      Asset     Size  Chunks             Chunk Names
./bundle.js  3.13 kB       0  [emitted]  main
   [0] ./app.js 115 bytes {0} [built]
   [1] ./bar.js 142 bytes {0} [built]
```

打完后的``bundle.js``文件内容略。这个时候打开html文件，查看控制台，会发现正常输出了``bar``。
