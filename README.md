# 自动导入 easy-mock 接口

> 使用 puppeteer 模拟用户操作网页，所以在导入的时候速度有点。有兴趣的同学也可以尝试从接口侧实现，速度肯定会更快

## 注意
1. 运行前请将 `./api/test` 目录删除
2. 不能有重复的项目名，包括线上和本地
3. 没有异常处理，所以遇到错误或者没反应时需要手动停止进程
4. 默认不显示浏览器处理过程，如需查看创建过程可将 `./index` 的 `const browser` 改为如下：
```javascript
    const browser = await puppeteer.launch({
        // 是否 不显示 浏览器
        headless: false,    // 改为 false 显示浏览器
        // 超时
        timeout: 10000
    });
```

## step
1. 在 `easy-mock` 下载已有接口 zip 包, 请按工程打包下载
2. 将下载的 zip 包加压至 `./api` 目录
3. 在根目录下创建 `user.config.js` 文件, 暴露出 `userInfo` 变量
```javascript
    const userInfo = {  // 账号密码工程名
        id: '用户名',
        pw: '密码',
        groupName: '项目要选择的分组名称'
    }
    module.exports = userInfo
```
3. npm install
4. npm run copyApi
5. 等待完成关闭

### [puppeteer中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)