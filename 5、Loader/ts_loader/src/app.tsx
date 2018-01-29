/**
 * Created by 王冬 on 2018/1/23.
 * QQ: 20004604
 * weChat: qq20004604
 */

// React DEMO
import * as React from "react";
import * as ReactDOM from "react-dom";

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

ReactDOM.render(
    <div>
        <RefsDemo/>
    </div>,
    document.getElementById('root')
)


// 普通 DEMO
let a = 1;

function Foo(val: number) {
    return val * 3
}

function Bar(val: string) {
    return val + '：123'
}

let baz = Bar(String(Foo(a)))

function CreateDOM(str: string) {
    let DOM = document.createElement('div')
    DOM.innerHTML = str
    return DOM
}

let RootDOM = document.querySelector("#root")
if (RootDOM) {
    RootDOM.appendChild(CreateDOM(baz))
}
