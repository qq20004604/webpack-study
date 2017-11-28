/**
 * Created by 王冬 on 2017/11/28.
 * QQ: 20004604
 * weChat: qq20004604
 */

let foo = () => {
    console.log('1')
}
foo()

let bar = new Promise((resolve, reject) => {
    resolve(1)
})
bar.then(msg => console.log(msg))

let baz = new Set([1, 2, 3])
console.log(baz)

let another = async function () {
    console.time('timeout')
    let result = await new Promise((resolve, reject) => {
        console.log('in Promise')
        setTimeout(() => {
            resolve('Promise resolve')
        }, 1000)
    })
    console.log(result)
    console.timeEnd('timeEnd')
}

another()