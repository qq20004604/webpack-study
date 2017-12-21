/**
 * Created by 王冬 on 2017/12/20.
 * QQ: 20004604
 * weChat: qq20004604
 */

import createDOM from './DOM'
import bar from './bar'

console.log('foo.js is running...')

function Foo() {
    let el = createDOM({
        id: 'foo-box',
        classList: 'foo',
        innerHTML: 'foo.js<input>'
    })

    document.body.appendChild(el);
}
export default Foo

// if (module.hot) {
//     module.hot.accept('./bar.js', function () {
//         console.log('%c%s', 'color:red;', 'bar is update')
//         bar()
//     })
// }