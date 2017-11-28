<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

<h3>1、需求列表</h3>

1、html文件引入的js文件，需要使用es6、es7的语法；

2、使用的语法里，除了常规的es6语法外，还包括例如Promise、async等特殊特性，要求可以转换。

注：babel默认只转js语法，而不转换新的API，例如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assig）

<h3>2、步骤</h3>

安装依赖

```
npm install
```

执行打包命令：

```
npm run test
```

查看打包后效果：

```
index.html
```

<h3>3、说明</h3>

引入的模块就不说了，如果不想引入全部，而是想引入部分，请参照【5、Loader】里的【babel-loader】文档。

关于loader的写法很简单，唯一区别是在哪里设置babel的配置。

---

第一种办法：

写在 ``.babelrc``文件里，就像我们一般使用babel那样，文件内容如下。

```
{
  "presets": [
    "babel-preset-env"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```

此时loader写法如下（以上以下代码已省略）：

```
module: {
    // loader放在rules这个数组里面
    rules: [
        {
            test: /\.js$/,
            // 这里表示忽略的文件夹，正则语法
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
    ]
}
```

---

第二种写法，不使用 ``.babelrc`` 文件，而是直接写在babel-loader里。

此时loader写法如下（以上以下代码已省略）：

```
module: {
    // loader放在rules这个数组里面
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['babel-preset-env'],
                plugins: ['transform-runtime']
            }
        }
    ]
}
```

---

第三种写法，和第二种写法类似，只不过细节有所区别。

```
module: {
    // loader放在rules这个数组里面
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            // 区别在这里
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env'],
                    plugins: ['transform-runtime']
                }
            }
        }
    ]
}
```