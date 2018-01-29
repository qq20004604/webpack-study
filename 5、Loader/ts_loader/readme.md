<h2>TS-LOADER配置简述</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/ts_loader)地址

<h3>0、使用说明</h3>

安装：

```
npm install
```

运行：

```
npm run dev
```

打包：

```
npm run build
```

<h3>1、TypeScript概述</h3>

>安装

如果在windows下，为了你能使用tsc命令，所以你得全局安装一波ts

```
npm install --save-dev --g typescript
```

不需要全局安装的话，去掉 ``--g`` 就行了

```
npm install --save-dev typescript
```

>创建 tsconfig.json

```
tsc --init
```

[关于这个文件的说明（英文版）](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

也可以直接看该文件每行的注释。

> 转换指定文件

tsc 文件的相对路径（相对于执行 tsc 命令的路径）

示例：

```
tsc src/app.ts
```

会自动生成 ``src/app.js`` 文件。


> webpack 和 ts

安装 loader （因为是 ``.ts`` 结尾的文件）

```
npm install ts-loader
```

注意，webpack下使用 ts，也是依然要安装 ts 的。

```
npm install typescript
```

注：

1. 只需要安装 ts-loader 和 typescript；
2. 然后在 ``webpack.config.js`` 里配一下 loader；
3. 就可以在 webpack 中使用 ts 了；
4. 下载本 DEMO 可以直接查看效果；

> ts 配合 react

这里是在配合 webpack 的基础上进行进一步的设置。

首先除了安装react和react-dom外，还得安装 ts 版本的 react 和 react-dom：（如果报了一大堆语法错误，十有八九就是这个问题了）

```
npm install @types/react
npm install @types/react-dom
```

然后打开 ``tsconfig.json``，进行配置：

[TypeScript配置文件tsconfig简析.md](https://github.com/hstarorg/HstarDoc/blob/master/%E5%89%8D%E7%AB%AF%E7%9B%B8%E5%85%B3/TypeScript%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6tsconfig%E7%AE%80%E6%9E%90.md)

```
"sourceMap": true,
"noImplicitAny": true,
"module": "commonjs",
"target": "es5",
"jsx": "react",
"allowSyntheticDefaultImports": true
```

>用 ts 语法写react

```
// 这是接口
interface ChildDemoProps {
    // 如果是函数，需要用以下这种形式写接口；
    // 如果返回的 DOM 是一个 input，需要用 HTMLInputElement 才行
    getInput: (DOM: HTMLInputElement) => void;
}

interface ChildDemoState {
    value: string;
}

/* 关于<>：
 * 第一个参数是 props 的接口描述，第二个是 state 的接口描述
 * 如果缺少这个，会导致ts报错；
 * 如果没有比如 state，那么该位置用 {} 替代
  * */
class ChildDemo extends React.Component<ChildDemoProps, ChildDemoState> {
    constructor(props: any) {
        super(props)
        this.state = {
            value: '123'
        }
    }

    render() {
        return <div>
            <p>{this.state.value}</p>
            <input type="text" ref={this.props.getInput}/>
        </div>
    }
}

class RefsDemo extends React.Component {
    myInput: HTMLInputElement;

    render() {
        return <div>
            {/* 因为函数简单，所以直接写到这里，箭头函数自带绑定this到声明时的作用域 */}
            <ChildDemo getInput={this.getInput.bind(this)}/>
        </div>
    }

    // 传递一个函数，参数可以用 HTMLInputElement 也可以用 HTMLElement，不过还是统一一下
    getInput(DOM: HTMLInputElement): void {
        this.myInput = DOM
    }
}
```


<h3>问题释义：</h3>

<h4>1、体积过大</h4>

如果发现压缩后过大，通过以下插件给 ``webpack.config.js`` 来缩小来自 react 代码的体积

```
new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': '"production"'
    }
})
```

压缩比较（React + React-dom）：

1. 完全不压缩：接近 800 KB；
2. （不含上面的策略）单纯丑化压缩：280 KB +；
3. 【2】 + 将上面的值设置为：``"development"``，187 KB；
4. 【2】 + 将上面的值设置为：``"production"``，不到 110 KB；


