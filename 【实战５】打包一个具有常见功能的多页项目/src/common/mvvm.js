/**
 * Created by 王冬 on 2017/12/14.
 * QQ: 20004604
 * weChat: qq20004604
 */

// 这是一个简陋的双向绑定
const mvvm = function (obj, key, $DOM) {
    if ($DOM.prop('tagName') === "INPUT") {
        $DOM.keyup(function () {
            obj[key] = $DOM.val()
        })
    }
    let state = Object.getOwnPropertyDescriptor(obj, key)
    Object.defineProperty(obj, key, {
        configurable: true,
        set(newVal) {
            let val
            let isInput
            if (/input|textarea/i.test($DOM.prop('tagName'))) {
                val = $DOM.val()
                isInput = true
            } else {
                val = $DOM.text()
                isInput = false
            }
            if (newVal !== val) {
                if (isInput) {
                    $DOM.val(newVal)
                } else {
                    $DOM.text(newVal)
                }
                if (typeof state.get === 'function') {
                    state.get.call(null, newVal)
                }
            }
        },
        get() {
            if (/input|textarea/i.test($DOM.prop('tagName'))) {
                return $DOM.val()
            } else {
                return $DOM.text()
            }
        }
    })
}
export default mvvm