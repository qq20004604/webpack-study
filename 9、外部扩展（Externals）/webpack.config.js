// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const config = {
    // 入口文件
    entry: {
        app: './src/app.js'
    },
    // 出口文件
    output: {
        path: __dirname + '/dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].[hash].js'
    },
    // webpack-dev-server
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 写法一
                loader: 'babel-loader'
            }
        ]
    },
    // 将插件添加到webpack中
    // 如果还有其他插件，将两个数组合到一起就行了
    plugins: [
        // html 源文件
        new HtmlWebpackPlugin({
            chunks: 'app',
            template: `./index.html`
        }),
        // HMR 需要的两个插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        // 省略后缀名
        extensions: ['.js']
    },
    // 指定别名
    externals: {
        // 后面是原本使用的全局变量名，前面的是引入的包名（就是import xx from 'echart'），然后我们实际写代码时候，用的是xx这个变量名。
        "moduleName": 'globalVariableName'
    }
}

module.exports = config