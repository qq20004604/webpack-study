/**
 * Created by 王冬 on 2017/12/12.
 * QQ: 20004604
 * weChat: qq20004604
 */
import './login.less'
import '../../less/reset.css'
import {insertTemplate} from '../../common/public'
import mvvm from '../../common/mvvm'

const $ = require('../../common/jquery.min')

insertTemplate(require('./login_box.html'), $('body'))

const $account = $("#account-input")
const $password = $("#password-input")
const $submit = $("#login-btn")
const $errorMessage = $("#error-msg")

localStorage.userName = ''
localStorage.password = ''

// 变量
// 错误提示信息
const data = {
    done: false
}

// 双向绑定数据-错误提示信息
mvvm(data, 'tips', $errorMessage)
// 绑定数据和提示信息
mvvm(data, 'submitting', $submit)

$submit.click(() => {
    if (data.done) {
        return
    }
    let sendData = {
        userName: $account.val(),
        password: $password.val()
    }
    if (sendData.userName.length === 0) {
        data.tips = '请输入账号'
        return
    }
    if (sendData.password.length === 0) {
        data.tips = '请输入密码'
        return
    }
    if ($submit.hasClass('submitting')) {
        data.tips = '登录中，请勿重复登录'
        return
    }
    $submit.addClass('submitting')
    data.submitting = '登录中'
    data.tips = ''

    // 偷懒，模拟一下异步
    setTimeout(() => {
        // 重置状态
        $submit.removeClass('submitting')
        data.tips = ''

        // 模拟成功或失败
        let success = Math.random() < 0.5 ? true : false
        if (success) {
            data.submitting = '登录成功'
            data.done = true
            data.tips = '页面即将跳转'
            // 实际开发中不能这么存！（以下）
            localStorage.userName = sendData.userName
            localStorage.password = sendData.password

            setTimeout(() => {
                window.location.href = 'userInfo.html'
            }, 1000)
        } else {
            data.submitting = '登录'
            data.tips = '服务器错误，请点击重试'
        }
    }, 1000)
})