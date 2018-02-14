<h3>1、安装</h3>

推荐使用 DEMO 的 package.json 配置来安装

```
npm install
```

运行（HMR）：

```
npm run dev
```


单独安装

```
npm install --save react react-dom
npm i --save babel-preset-react babel-preset-env
```

说明：

1. ``babel-preset-react``: 需要配置 ``.babelrc`` 这个文件的 ``presets`` 属性，添加一个元素 ``"babel-preset-react"``；
2. 目前是<b>练习</b>【基础语法】版，不涉及 css 甚至更复杂的内容，我会随着我自己学习的深入，逐步添加相关功能（参照小标题）；

<h3>2、初步使用，渲染一个DOM</h3>

app.js 添加内容：

```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
```

运行 ``npm run dev`` 即可。

<h3>3、嵌套</h3>

被嵌套的目标可以是函数或者类，需要以大写字母开头：

函数是 ``return`` 的返回值，类是 ``render`` 函数的返回值；

示例：

```
// 被嵌套
function Foo() {
    return <h3>这是一个h3标签</h3>
}

// 嵌套到目标
ReactDOM.render(
    <div>
        <Foo/>
        <p>当前时间是：{formatDate(new Date())}</p>
    </div>,
    document.getElementById('root')
)
```

核心是函数名/类名是 Foo，所以嵌套的地方的标签名也为 ``Foo``，并且是一个闭合标签。

类的写法：

```
class Foo extends React.Component {
    // 如果只是单纯的显示DOM，这里的构造函数可以省略
    constructor(props) {
        super(props)
    }

    render() {
        return <h3>这是一个h3标签</h3>
    }
}
```

<h3>4、变量</h3>

被中括号包含。

```
let foo = 'world'

class HelloWord extends React.Component {

    render() {
        return <div className={domClass}>
            Hello，{foo}
        </div>
    }
}
```

<h3>5、组件变量</h3>

放在 state 属性中，通过 ``setState`` 方法修改.

```
class HelloWord extends React.Component {
    constructor(props) {
        super(props);
        // 必须存在this.state中
        this.state = {
            seconds: 0
        }
        setInterval(() => {
            // 调用setState方法修改变量的值
            this.setState({
                seconds: this.state.seconds + 1
            })
        }, 1000)
    }

    render() {
        return <div className={domClass}>
            Hello，{foo}！距离上一次修改页面，过去了{this.state.seconds}秒
        </div>
    }
}
```

<h3>6、变量传递</h3>

父组件中，通过写在子组件的标签里来传值。

```
class HelloWord extends React.Component {
    constructor(props) {
        // props的值就是你传给他的变量，比如这里就是 {toChild: 'world'}
        super(props);
        // 必须存在this.state中
        this.state = {
            world: props.toChild,
            seconds: 0
        }
        setInterval(() => {
            // 调用setState方法修改变量的值
            this.setState({
                seconds: this.state.seconds + 1
            })
        }, 1000)
    }

    render() {
        return <div className={domClass}>
            {/* 需要通过this.state.world 来使用。当然你也可以赋值到 this 的其他变量 */}
            Hello，{this.state.world}！距离上一次修改页面，过去了{this.state.seconds}秒
        </div>
    }
}

// 要传的变量
let foo = 'world'

ReactDOM.render(
    <div>
        {/* ---- toChild 就是传递给子组件的变量的key ---- */}
        {/* ---- foo就是被传的变量（这里就是字符串 'world'） ---- */}
        <HelloWord toChild={foo}/>
        <p>当前时间是：{formatDate(new Date())}</p>
        {/*<Leaner/>*/}
    </div>,
    document.getElementById('root')
)
```