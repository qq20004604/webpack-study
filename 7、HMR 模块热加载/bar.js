/**
 * Created by 王冬 on 2017/12/21.
 * QQ: 20004604
 * weChat: qq20004604
 */
import createDOM from './DOM'
console.log('bar.js is running...')

function Bar() {
    let el = createDOM({
        id: 'bar-box',
        classList: 'bar',
        innerHTML: 'bar.js<input>'
    })

    document.body.appendChild(el);
}

export default Bar