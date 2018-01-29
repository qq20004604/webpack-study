// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 入口文件
    entry: {
        app: './src/app.tsx',
        vendor: [
            'react',
            'react-dom',
        ]
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
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    // 将插件添加到webpack中
    // 如果还有其他插件，将两个数组合到一起就行了
    plugins: [
        // html 源文件
        new HtmlWebpackPlugin({
            chunks: 'app',
            template: `./index.html`,
            hash: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        // HMR 需要的两个插件
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new UglifyJSPlugin()
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    }
}