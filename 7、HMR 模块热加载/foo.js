// 引入资源
import createDOM from './DOM'
import bar from "./bar.js";
// bar 中创建的DOM逻辑，在 foo 中执行
bar()

// 执行本段代码的时候，表示 foo.js 被重新执行了
console.log('%c%s', 'color:green;', 'foo.js is running...')

function Foo() {
    let el = createDOM({
        id: 'foo-box',
        classList: 'foo',
        innerHTML: 'foo.js<input>'
    })

    document.body.appendChild(el);
}

// 导出给 app.js 执行
export default Foo

// 这里写 bar.js 的 HMR 逻辑
// if (module.hot) {
//     module.hot.accept('./bar.js', function (args) {
//         console.log('%c%s', 'color:#FF00FF', `[${args}] is update`)
//     })
// }