/**
 * Created by 王冬 on 2017/12/13.
 * QQ: 20004604
 * weChat: qq20004604
 */
// 模拟jQuery选择器，但实际上已经使用jQuery了，所以这个没用
const $ = function (selector) {
    if (selector[0] === '#') {
        return document.querySelector(selector)
    } else {
        return document.querySelectorAll(selector)
    }
}

// 将模板插入到某个DOM里
// 示例：
// insertTemplate(require('../template/login_box.html'), document.body)
const insertTemplate = function (template, insertDOM) {
    let DOM = document.createElement('div')
    DOM.innerHTML = template
    insertDOM.append(DOM)
}


export {insertTemplate, $}