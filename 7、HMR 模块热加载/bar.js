// 引入资源
import createDOM from './DOM'

// 执行本段代码的时候，表示 bar.js 被重新执行了
console.log('%c%s', 'color:blue;', 'bar.js is running...')

function Bar() {
    let el = createDOM({
        id: 'bar-box',
        classList: 'bar',
        innerHTML: 'bar.js<input>'
    })

    document.body.appendChild(el);
}

// 导出给 foo.js 执行
export default Bar
