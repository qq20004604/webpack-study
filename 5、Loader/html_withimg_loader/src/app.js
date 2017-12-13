/**
 * Created by 王冬 on 2017/12/13.
 * QQ: 20004604
 * weChat: qq20004604
 */
// 以下两种写法都行
// let html = require('./template.html')
import html from './template.html'
console.log(html)
// 这个时候引入的是一个html字符串

let div = document.createElement('div')
div.innerHTML = html
document.body.append(div)