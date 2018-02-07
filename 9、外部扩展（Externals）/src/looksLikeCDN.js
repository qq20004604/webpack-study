/**
 * Created by 王冬 on 2018/2/7.
 * QQ: 20004604
 * weChat: qq20004604
 * 这个放置于CDN上，模拟CDN加载js文件后，会出现一个全局变量（类似jQuery的 $ ）
 */

window.globalVariableName = function (...args) {
    return args.reduce((last, next) => last + next)
}