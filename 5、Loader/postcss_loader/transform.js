/**
 * Created by 王冬 on 2017/12/2.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */

// 这里只有一个参数，即css字符串
module.exports = function (css) {
    console.log(document.getElementById('app'))
    console.log(css)
    const transformed = css.replace(/}/g, 'box-sizing: border-box;\n}')
    return transformed
}