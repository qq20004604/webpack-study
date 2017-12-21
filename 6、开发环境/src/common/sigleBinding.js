/**
 * Created by 王冬 on 2017/12/14.
 * QQ: 20004604
 * weChat: qq20004604
 */

// 单向绑定
// DOM需要是jQuery的DOM（为了省事）
const sigleBinding = {
    // 绑定文本框
    DOM(obj, key, $DOM) {
        Object.defineProperty(obj, key, {
            configurable: true,
            set(newVal) {
                $DOM.text(newVal)
            },
            get() {
                return $DOM.text()
            }
        })
    },
    // 绑定输入框
    input(obj, key, $input) {
        Object.defineProperty(obj, key, {
            configurable: true,
            set(newVal) {
                $input.val(newVal)
            },
            get() {
                return $input.val()
            }
        })
    }
}

export default sigleBinding