/**
 * Created by 王冬 on 2017/12/15.
 * QQ: 20004604
 * weChat: qq20004604
 */
import {insertTemplate} from '../../common/public'

const $ = require('../../common/jquery.min')

insertTemplate(require('./async.html'), $('#async-box'))

let imgArray = []

$("#random").click(function () {
    if (imgArray.length === 0) {
        imgArray.push(require('./1.jpg'));
        imgArray.push(require('./2.jpg'));
        imgArray.push(require('./3.jpg'));
        imgArray.push(require('./4.jpg'));
        imgArray.push(require('./5.jpg'));
    }
    let img = $(`<img src='${imgArray[0]}'>`)
    imgArray.shift();
    $("#img-container").html('')
    $("#img-container").append(img);
})
