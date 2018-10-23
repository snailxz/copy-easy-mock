/**
 * 格式化接口 path 数据
 */
const formatData = (arrData) => {
    let projectArr = {}
    arrData.map(pathUrl => {
        let list = pathUrl.replace('./api/', '')
        let projectName = list.split('/')[0]
        let apiName = list.replace(projectName + '/', '')
        apiName = apiName.replace('.json', '')
        if (projectArr.hasOwnProperty(projectName)) {
            projectArr[projectName].push({
                path: pathUrl,
                apiName: apiName
            })
        } else {
            projectArr[projectName] = []
            projectArr[projectName].push({
                path: pathUrl,
                apiName: apiName
            })
        }
    })

    return projectArr
}

module.exports = formatData