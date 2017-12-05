/**
 * Created by 王冬 on 2017/11/29.
 * QQ: 20004604
 * weChat: qq20004604
 */
// 引入css文件
import style from './style/style.css'

console.log(style)

/* useable（开始） */
let isUse = false

document.querySelector('#test').onclick = function () {
    if (isUse) {
        style.unref()
    } else {
        style.ref()
    }
    isUse = !isUse
}
/* useable（结束） */

// import baz from './style/baz.css'

// console.log(baz)
// document.querySelector('.bottom').innerHTML = baz.abcDef