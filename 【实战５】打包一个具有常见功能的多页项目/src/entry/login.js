/**
 * Created by 王冬 on 2017/12/12.
 * QQ: 20004604
 * weChat: qq20004604
 */
import '../less/login.less'
import {insertTemplate} from '../common/public'
import mvvm from '../common/mvvm'

const $ = require('../common/jquery.min')

insertTemplate(require('../template/login.html'), $('body'))

const $account = $("#account-input")
const $password = $("#password-input")
const $submit = $("#login-btn")
const $errorMessage = $("#error-msg")
const errorMessage = {}
window.errorMessage = errorMessage
window.$ = $




// 双向绑定数据-账号输入框
mvvm(errorMessage, 'tips', $account)
// 双向绑定数据-错误提示信息
mvvm(errorMessage, 'tips', $errorMessage)

$submit.click(() => {
    if ($account.val().length === 0) {
        errorMessage.tips = '请输入账号'
        return
    }
    if ($password.val().length === 0) {
        errorMessage.tips = '请输入密码'
        return
    }
})