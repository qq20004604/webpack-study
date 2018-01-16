import React from 'react';
import ReactDOM from 'react-dom';

function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

let domClass = 'container parent'

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