/**
 * Created by 王冬 on 2017/12/12.
 * QQ: 20004604
 * weChat: qq20004604
 */
import './userInfo.less'
import {insertTemplate} from '../../common/public'
import '../../less/reset.css'

const $ = require('../../common/jquery.min')

let userInfo = {
    userName: localStorage.userName,
    password: localStorage.password
}
let template = require('./userInfo_container.html')

template = template.replace(/{{[^}]+}}/g, str => {
    str = str.replace('{{', '')
    str = str.replace('}}', '')
    return userInfo[str]
})

insertTemplate(template, $('#container'))

$("#async-btn").click(function () {
    $("#async-btn").hide()
    $("#loading").show()
    require(['./async.js'], function () {
        $("#loading").hide()
    }, function () {
        $("#async-btn").html('加载失败，重新加载')
        $("#async-btn").show()
        $("#loading").hide()
    })
})