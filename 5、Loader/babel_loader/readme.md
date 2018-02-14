<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

<h3>0、使用说明</h3>

安装：

```
npm install
```

运行：

```
npm run test
```


<h4>5.1、babel-loader</h4>

这个用于将使用ES6规范的js代码，转为ES5。


首先安装一大堆东西，参照下面的命令，一共是4个（包括webpack）

```
npm install --save babel-loader babel-core babel-preset-env webpack
```

创建babel规则文件``.babelrc``，内容设置为：

```javascript
{
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "not ie <= 8"
          ]
        }
      }
    ]
  ]
}

```

然后``app.js``里添加文件内容（这显然是es6语法）：

```javascript
let foo = () => {
    console.log('1')
}
foo()
```

运行 ``npm run test`` 执行脚本，等脚本执行完毕后，查看dist文件夹下的 ``dist.js`` 文件。

会发现代码已经被成功转为非es6语法了（截取如下）：

```javascript
var foo = function foo() {
  console.log('1');
};
foo();
```
---

但是，这个只能转一些普通的es6语法，像例如``Promise``、``Set``之类的，他是无法转换的。

如果想要转换这些，我们需要做一些额外的工作。

首先安装插件

```
npm install babel-runtime --save
npm install babel-plugin-transform-runtime --save-dev
```

然后修改``.babelrc``文件的内容为：

```javascript
{
  "presets": [
    "babel-preset-env"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```

【注】：

``babel-runtime``（也就是上面``plugins``数组中的``transform-runtime``），解决了辅助代码（即让我们可以使用新特性的代码）被默认添加到每一个需要他的文件的问题（这会导致文件过大）。

具体解决方法是禁用了babel对每个文件的runtime注入，引入 ``babel-plugin-transform-runtime`` 并且使所有辅助代码从这里引用。

<b>表现效果：</b>假如A模块异步加载B模块，A、B模块里都使用了``Set``，那么为了使A模块正常运行，引入了某些代码。然后因为B模块又是被A模块引入的，那么B模块在被加载的时候，A模块里已经引入的代码，就没必要再次引入了，所以B模块里是不存在A模块引入的那些兼容代码的。

【注（完）】

修改webpack设置文件的loader内容为：

```javascript
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
}
```

最后修改``app.js``这个文件的内容，给里面加一些特殊的es6语法：

```javascript
let foo = () => {
    console.log('1')
}
foo()
let bar = new Promise((resolve, reject) => {
    resolve(1)
})
bar.then(msg => console.log(msg))

let baz = new Set([1, 2, 3])
console.log(baz)

let another = async function () {
    console.time('timeout')
    let result = await new Promise((resolve, reject) => {
        console.log('in Promise')
        setTimeout(() => {
            resolve('Promise resolve')
        }, 1000)
    })
    console.log(result)
    console.timeEnd('timeEnd')
}

another()
```

以上代码包含es6的``Promise``，``Set``，以及es7中的``async/await``。

此时我们运行一下``npm run test``试试，然后查看``dist/dist.js``文件，会发现我们的代码出现在大约1040行的位置，并且原本使用es6、es7语法的代码，都被一段很长很复杂的代码所替换（因为太长，所以这里略过）。

这说明我们转义成功了！

更多请参照[【实战３】解决有es6、es7语法的js代码](https://github.com/qq20004604/webpack-study/tree/master/%E3%80%90%E5%AE%9E%E6%88%98%EF%BC%93%E3%80%91%E8%A7%A3%E5%86%B3%E6%9C%89es6%E3%80%81es7%E8%AF%AD%E6%B3%95%E7%9A%84js%E4%BB%A3%E7%A0%81)

<h3>5.2、支持新特性</h3>

例如支持对象扩展运算符

```
let foo = {
    a: 1,
    b: 2
}

let bar = {c: 3, ...foo}
```

或者支持 class 里直接赋值变量

```
class Foo extends React.Component {
    state = {
        a: 1
    }

    render() {
        return (<div>a: {this.state.a}</div>)
    }
}
```

一般来说，这种新特性，正常来说 runtime 是不支持的，因此额外安装下面这个

```
npm install --save babel-preset-stage-2
```

然后配置 ``.babelrc`` 文件：

```
{
  "presets": [
    "babel-preset-env",
    "stage-2"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```

即可。

注：

1. 通常安装到 stage-2 就足够了，如果还不行，再安装 stage-1 或者 stage-0 （越小越新）；
2. 安装这个对体积影响不大，我自己在 React 项目里测试，添加了上面两段代码后，并添加 ``"stage-2"`` 配置，体积大约增加了 2KB；