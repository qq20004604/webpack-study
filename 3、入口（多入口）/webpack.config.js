module.exports = {
    // 入口文件，指向app.js
    entry: {
        first: './first_entry.js',
        second: './second_entry.js'
    },
    // 出口文件
    output: {
        // 文件名，将打包好的导出为bundle.js
        filename: './dist/[name].js'
    }
}