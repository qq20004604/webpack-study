import createDOM from './DOM'
import bar from "./bar.js";
bar()

console.log('%c%s', 'color:green;', 'foo.js is running...')

function Foo() {
    let el = createDOM({
        id: 'foo-box',
        classList: 'foo',
        innerHTML: 'foo.js<input>'
    })

    document.body.appendChild(el);
}

export default Foo

if (module.hot) {
    module.hot.accept('./bar.js', function (args) {
        console.log('%c%s', 'color:red;', `[${args}] is update`)
    })
}