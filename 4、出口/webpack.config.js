module.exports = {
    // 入口文件，指向app.js
    entry: './app.js',
    // 出口文件
    output: {
        path: __dirname + '/dist',
        filename: 'dist.chunkhash=[chunkhash:10].name=[name].id=[id].js'
    }
}