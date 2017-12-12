// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entryJSON = require('./config/entry.json');

let plugins = entryJSON.map(page => {
    console.log(page.title)
    return new HtmlWebpackPlugin({
        title: page.title,
        filename: `${__dirname}/dist/${page.url}.html`,
        template: `${__dirname}/src/page/${page.url}.html`,
        chunks: [page.url],
        hash: true, // 为静态资源生成hash值
        minify: false,
        xhtml: true,
    })
})
let entry = {}
entryJSON.map(page => {
    entry[page.url] = `./src/entry/${page.url}`
})


module.exports = {
    // 入口文件，指向app.js
    entry: entry,
    // 出口文件
    output: {
        path: __dirname + '/dist',
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
                test: /\.css$/,
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
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpe?g|gif)$/,
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