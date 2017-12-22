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
console.log('%c%s', 'color:red;', 'app.js is running...')

// 两个子模块创建DOM并插入<body>标签
foo()

// 这里是控制 HMR 的函数
// 注：
// 这里引用的 foo.js 模块，那么处理 foo.js HMR 效果的代码必须写在这里；
// 特别提示：这段代码不能抽象封装到另外一个js文件中（即使那个js文件也被 app.js import进来）
// 推测是根据webpack的依赖图，向上找父模块，然后在父模块的代码中，找有没有处理 HMR 的代码
if (module.hot) {
    module.hot.accept('./foo.js', function (url) {
        // 回调函数只有url一个参数，类型是数组
        // 执行时机是 foo.js 中的代码执行完毕后执行
        console.log('%c%s', 'color:#FF00FF;', `[${url}] is update`)
    })
}