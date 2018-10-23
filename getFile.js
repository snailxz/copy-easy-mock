const fs = require("fs")

/**
 * 获取全部api列表
 */
const getFile = function(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results = results.concat(getFile(file))
        else results.push(file)
    })
    return results
}

/**
 * 读取api文件
 */
const getApi = function (path) {
    const apiText = fs.readFileSync(path, 'utf-8')
    return apiText
}

module.exports = {
    getFile,
    getApi
}
