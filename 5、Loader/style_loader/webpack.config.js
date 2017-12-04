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
                    {
                        loader: 'style-loader',
                        // 测试useable时，使用下面这行
                        // loader: 'style-loader/useable',
                        options: {
                            base: 1000,
                            attrs: {
                                id: 'foo'
                            },
                            // 测试useable时，****注释**** 下面这行
                            transform: 'transform.js',
                            insertAt: {
                                before: '.abc',
                            },
                            insertInto: 'body',
                            sourceMap: true,    // 无效 by version 0.19.0
                            convertToAbsoluteUrls: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            root: __dirname + '/static/',
                            sourceMap: false,
                            alias: {
                                '@': __dirname + '/static/'
                            }
                        }
                    },
                    'postcss-loader'
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
            template: './src/index.html'
        })
    ]
}