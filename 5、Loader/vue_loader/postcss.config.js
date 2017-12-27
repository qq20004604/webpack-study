// https://github.com/postcss/autoprefixer
// 添加 css 兼容性前缀
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