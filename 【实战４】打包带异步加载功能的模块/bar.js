/**
 * Created by 王冬 on 2017/11/28.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */

console.log('%c%s%s', 'color:red', 'bar.js loaded, time:', Number(new Date()))

async function test () {
    console.time('async timeout')
    let result = await new Promise((resolve, reject) => {
        console.log('in Promise')
        setTimeout(() => {
            resolve('Promise resolve')
        }, 1000)
    })
    console.log(result)
    console.timeEnd('async timeout')
}

// 以下两种写法都可以
// module.exports = {
//     test
// }
export {test}