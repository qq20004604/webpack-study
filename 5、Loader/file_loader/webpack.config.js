// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件，指向app.js
    entry: {
        dist: './src/app.js'
    },
    // 出口文件
    output: {
        path: __dirname + '/dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].js'
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // 这个是普通带[path]的，对context生效
                            // name: '[path][name].[hash:10].[ext]',   // 文件名，这个是将图片放在打包后的img文件夹中
                            // context: __dirname + '/../',
                            // 这个是对publicPath使用的
                            name: '[name].[ext]',   // 文件名，这个是将图片放在打包后的img文件夹中
                            publicPath: 'https://www.abc.cn/img/',
                            outputPath: function (fileName) {
                                return 'myImage/' + fileName
                            }
                        }
                    }
                ]
            }
        ]
    },
    // 将插件添加到webpack中
    plugins: [
        // 这里是添加的插件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}