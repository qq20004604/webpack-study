module.exports = {
    // 入口文件，指向app.js
    entry: './app.js',
    // 出口文件
    output: {
        path: __dirname + '/dist',
        // 文件名，将打包好的导出为bundle.js
        filename: './dist.js'
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.js$/,
                // 这里表示忽略的文件夹，正则语法
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}