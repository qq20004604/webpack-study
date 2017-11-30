// 官方github: https://github.com/postcss/autoprefixer

module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                // 加这个后可以出现额外的3前缀
                "> 0.01%"
            ]
        })
    ]
}