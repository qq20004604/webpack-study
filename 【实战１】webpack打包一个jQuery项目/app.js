/**
 * Created by 王冬 on 2017/11/27.
 * QQ: 20004604
 * weChat: qq20004604
 */
global.$ = window.$

$("#btn").click(function () {
    console.log($("#content").css('color'))
    if ($("#content").css('color') === 'rgb(255, 0, 0)') {
        $("#content").css('color', 'green')
    } else {
        $("#content").css('color', 'red')
    }
})