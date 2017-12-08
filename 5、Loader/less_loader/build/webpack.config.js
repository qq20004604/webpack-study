// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    // 入口文件，指向app.js
    entry: {
        // 这个路径，是相对于执行shell命令的文件夹的路径
        dist: './src/app.js'
    },
    // 出口文件
    output: {
        // 这个路径，是相对于webpack.config.js文件的目录
        path: __dirname + '/dist',
        // 文件名，将打包好的导出为bundle.js
        filename: '[name].js'
    },
    module: {
        // loader放在rules这个数组里面
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',   // compiles Less to CSS
                        options: {
                            globalVars: {   // 也可以用 modifyVars，二者貌似没区别
                                'ten': '10px',
                                'hundred': '100px'
                            },
                            // 使用独立的文件解析路径，参照 readme.md
                            paths: [
                                path.resolve(__dirname, "/../test")
                            ]
                        }
                    }
                ]
            },
            // css 作为入口时，引用less文件的话，必须使用以下配置
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'less-loader'   // compiles Less to CSS
            //     ]
            // },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
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
            title: 'css-loader',
            template: './src/index.html'
        })
    ]
}