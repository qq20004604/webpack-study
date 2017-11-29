/**
 * Created by 王冬 on 2017/11/28.
 * QQ: 20004604
 * weChat: qq20004604
 */

console.log('%c%s%s', 'color:green', 'app.js loaded, time:', Number(new Date()))

setTimeout(() => {
    // 下面一行代码，是我们在异步加载组件的时候，常见写法。
    // 框架帮我们执行了下面注释掉的第二段代码，所以我们一般不需要写
    // let test = resolve => require(['./bar.js'], resolve)
    // test(function (module) {
    //     module.test()
    // })

    // 这是我们的代码
    require(['./bar.js'], function (module) {
        // console.log(module)
        module.test()
    })
    console.log('after require')
}, 1000)