import createDOM from './DOM'

console.log('%c%s', 'color:blue;', 'bar.js is running...')

function Bar() {
    let el = createDOM({
        id: 'bar-box',
        classList: 'bar',
        innerHTML: 'bar.js<input>'
    })

    document.body.appendChild(el);
}

export default Bar
