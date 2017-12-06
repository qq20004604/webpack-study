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
                    'css-loader',
                    // 'postcss-loader'
                    // 使用独立配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './config'    // 写到目录即可，文件名强制要求是postcss.config.js
                            },
                            sourceMap: true
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
            template: './src/index.html'
        })
    ]
}