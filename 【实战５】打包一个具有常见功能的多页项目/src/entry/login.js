/**
 * Created by 王冬 on 2017/12/12.
 * QQ: 20004604
 * weChat: qq20004604
 */
import '../less/login.less'
import {insertTemplate} from '../common/public'

const $ = require('../common/jquery.min')

insertTemplate(require('../template/login.html'), $('body'))

const $account = $("#account-input")
const $password = $("#password-input")
const $submit = $("#login-btn")
const $errorMessage = $("#error-msg")
const errorMessage = {}

// 单向绑定
Object.defineProperty(errorMessage, 'tips', {
    set(newVal) {
        this._msg = newVal
        $errorMessage.text(newVal)
    },
    get() {
        return this._msg
    }
})

$submit.click(() => {
    if ($account.val().length === 0) {
        errorMessage.tips = '请输入账号'
        return
    }
})