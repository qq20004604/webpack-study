// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 多入口管理文件
const entryJSON = require('../config/entry.json');
// less的全局变量
const globalLessVars = require('../src/common/global_less_vars')
const path = require('path')

// 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
let plugins = entryJSON.map(page => {
    return new HtmlWebpackPlugin({
        title: page.title,
        filename: path.resolve(__dirname, `../dist/${page.url}.html`),
        template: path.resolve(__dirname, `../src/page/${page.url}.html`),
        chunks: [page.url], // 实现多入口的核心
        hash: true, // 为静态资源生成hash值
        minify: false,   // 压缩，如果启用这个的话，需要使用html-minifier，不然会直接报错
        xhtml: true,    // 自闭标签
    })
})

// 入口管理
let entry = {}
entryJSON.map(page => {
    entry[page.url] = path.resolve(__dirname, `../src/entry/${page.url}.js`)
})


module.exports = {
    // 入口文件，指向app.js
    entry: entry,
    // 出口文件
    output: {
        path: __dirname + '/../dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].[hash:8].js'
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 写法一
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './config'
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',   // compiles Less to CSS
                        options: {
                            globalVars: globalLessVars
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[hash].[ext]',
                            outputPath: function (fileName) {
                                return 'img/' + fileName    // 后面要拼上这个 fileName 才行
                            }
                        }
                    }
                ]
            }
        ]
    },
    // 将插件添加到webpack中
    plugins: plugins
}