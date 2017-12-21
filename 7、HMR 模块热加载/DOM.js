/**
 * Created by 王冬 on 2017/12/21.
 * QQ: 20004604
 * weChat: qq20004604
 */

function createDOM(options) {
    const defaultOptions = {
        id: '',
        classList: [],
        innerHTML: '',
        tagName: 'div'  //默认是div
    }
    // 容错处理
    if (typeof options !== 'object') {
        options = {}
    }
    let opt = Object.assign({}, defaultOptions, options)

    let DOM = document.createElement(opt.tagName)

    if (typeof opt.classList === 'string') {
        DOM.classList.add(opt.classList)
    } else if (opt.classList instanceof Array) {
        DOM.classList.forEach(c => {
            DOM.classList.add(c)
        })
    }

    DOM.innerHTML = opt.innerHTML

    DOM.id = opt.id

    return DOM
}

export default createDOM