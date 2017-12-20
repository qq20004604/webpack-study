// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
// 多入口管理文件
const entryJSON = require('../config/entry.json');
// less的全局变量
const globalLessVars = require('../src/common/global_less_vars')
const path = require('path')

// 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
let plugins = entryJSON.map(page => {
    return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `../dist/${page.url}.html`),
        template: path.resolve(__dirname, `../src/page/${page.url}/index.html`),
        chunks: [page.url, 'foo'], // 实现多入口的核心，决定自己加载哪个js文件，这里的 page.url 指的是 entry 对象的 key 所对应的入口打包出来的js文件
        hash: true, // 为静态资源生成hash值
        minify: false,   // 压缩，如果启用这个的话，需要使用html-minifier，不然会直接报错
        xhtml: true,    // 自闭标签
    })
})

// 入口管理
let entry = {
    // 引入jQuery，这个是为了配合 webpack.optimize.CommonsChunkPlugin 这个插件使用。
}

entryJSON.map(page => {
    entry[page.url] = path.resolve(__dirname, `../src/page/${page.url}/index.js`)
})

module.exports = {
    // 入口文件
    entry: entry,
    // 出口文件
    output: {
        path: __dirname + '/../dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].[chunkhash].js'
    },
    // webpack-dev-server
    devServer: {
        contentBase: './dist'
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // 写法一
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            root: path.resolve(__dirname, '../src/static'),   // url里，以 / 开头的路径，去找src/static文件夹
                            minimize: true, // 压缩css代码
                            // sourceMap: true,    // sourceMap，默认关闭
                            alias: {
                                '@': path.resolve(__dirname, '../src/img') // '~@/logo.png' 这种写法，会去找src/img/logo.png这个文件
                            }
                        }
                    },
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
                            limit: 4096,
                            name: '[hash].[ext]',
                            outputPath: function (fileName) {
                                return 'img/' + fileName    // 后面要拼上这个 fileName 才行
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-withimg-loader',
                    }
                ]
            }
        ]
    },
    // 将插件添加到webpack中
    // 如果还有其他插件，将两个数组合到一起就行了
    plugins: ([
        new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
            root: path.resolve(__dirname, '../'),
            verbose: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "foo", // 这个对应的是 entry 的 key
            minChunks: 2
        }),
        new UglifyJSPlugin()
    ].concat(plugins))
}