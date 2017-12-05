// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件，指向app.js
    entry: {
        dist: './app.js'
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
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true,
                            // singleton: true,
                            convertToAbsoluteUrls: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    // 将插件添加到webpack中
    plugins: [
        // 这里是添加的插件
        new HtmlWebpackPlugin({
            title: 'css-loader',
            template: './index.html'
        })
    ]
}