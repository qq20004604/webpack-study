// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件，指向app.js
    entry: './app.js',
    // 出口文件
    output: {
        path: __dirname + '/dist',
        filename: 'dist.chunkhash=[chunkhash:10].name=[name].id=[id].js'
    },
    // 将插件添加到webpack中
    plugins: [
        // 这里是添加的插件
        new HtmlWebpackPlugin({
            title: 'title', // html的title（就是title标签里的东西）
            filename: 'index.html', // 重写后的html文件名，默认是index.html
            template: './demo.html',    // 这个就是那个模板文件，不会改动原有的内容，而是在原来html文件的末尾，将打包编译好的文件添加进去
        })
    ]
}