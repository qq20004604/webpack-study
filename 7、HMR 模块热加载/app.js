/**
 * Created by 王冬 on 2017/12/20.
 * QQ: 20004604
 * weChat: qq20004604
 */

// 引入资源
import './style.css';
import foo from './foo.js';
import createDOM from './DOM.js'

// 创建一个DOM并插入<body>标签
let el = createDOM({
    id: 'app-box',
    innerHTML: 'app.js<input>'
})
document.body.appendChild(el);

// 本行代码表示app.js已经被执行了一遍
console.log('%c%s', 'color:green;', 'app.js is running...')

// 两个子模块创建DOM并插入<body>标签
foo()

// 这里是控制 HMR 的函数
// 注：
// 代码必须写在这里，而不能抽象封装到另外一个js文件中
// 推测是根据webpack的依赖图，向上找父模块，然后找有没有处理的代码
if (module.hot) {
    module.hot.accept(['./foo.js', './bar.js'], function (args) {
        console.log('%c%s', 'color:red;', `[${args}] is update`)
    })
}