// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const SpritesmithPlugin = require('webpack-spritesmith');
const path = require('path')

module.exports = {
    // 入口文件，指向app.js
    entry: {
        dist: './src/index.js'
    },
    // 出口文件
    output: {
        path: __dirname + '/dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].js'
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
                // 这里表示忽略的文件夹，正则语法
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            // 用雪碧图的时候，这个不可或缺
            {
                test: /\.png$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    // 将插件添加到webpack中
    plugins: [
        // 这里是添加的插件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // HMR 需要的两个插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                // 图片所在文件夹（全部会被打包出来）
                cwd: path.resolve(__dirname, './src/icons'),
                // 匹配 png 文件，可以用glob语法，比如 '*.(png|jpg)' 这样；
                // 但png和jpg拼一起，有时候图片无法正常显示
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                // 将其输出到 src/assets 目录下
                // 这个是打包前的目录，所以不要学某个教程将其输出到 dist 目录下
                image: path.resolve(__dirname, './src/assets/sprite.png'),
                css: path.resolve(__dirname, './src/assets/sprite.css')
            },
            apiOptions: {
                // 简单来说，这个就是雪碧图的 css 文件怎么找到 雪碧图的 png 文件
                cssImageRef: './sprite.png'
            },
            spritesmithOptions: {
                // 这个是雪碧图的排列顺序（从上到下）
                algorithm: 'top-down'
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js'
        }
    }
}