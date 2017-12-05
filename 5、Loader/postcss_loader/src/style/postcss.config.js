/**
 * Created by 王冬 on 2017/12/5.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */
// https://github.com/postcss/autoprefixer
let autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        autoprefixer({
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                "> 0.01%"
            ]
        })
    ]
}