/**
 * Created by 王冬 on 2017/12/20.
 * QQ: 20004604
 * weChat: qq20004604
 */
import './style.css';
import foo from './foo.js';
import createDOM from './DOM'
import bar from "./bar";

let el = createDOM({
    id: 'app-box',
    innerHTML: 'app.js<input>'
})
console.log(el)

document.body.appendChild(el);

foo()

if (module.hot) {
    module.hot.accept('./foo.js', function () {
        console.log('%c%s', 'color:red;', 'foo is update')
        bar()
    })
    module.hot.accept('./bar.js', function () {
        console.log('%c%s', 'color:red;', 'bar is update')
        bar()
    })
}