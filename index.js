// 引入
const puppeteer = require('puppeteer');
const file = require('./getFile');
const formatData = require('./format');
const createP = require('./create');
const userInfo = require('./user.config');

const host = 'http://192.168.10.117:7300/'; // 本地mock地址

(async () => {

    const browser = await puppeteer.launch({
        // 是否 不显示 浏览器
        headless: true,
        // 超时
        timeout: 8000
    });

    // 打开一个新的标签页
    const page = await browser.newPage();

    // 跳转到我们想要的地址去
    // 暂时不等待
    console.log('正在打开地址：', host)
    await page.goto(host);

    page.setViewport({
        width: 1376,
        height: 768,
    });

    // await page.waitFor(1000)

    console.log('自动登陆中。。。。。')
    // 获取登录页的按钮
    const buttons = await page.$$('.ivu-btn');
    // 如果有两个按钮
    if (buttons.length === 2) {
        buttons[1].click()
        await page.waitFor(800)
        buttons[0].click()
    } else {
        buttons[1].click()
    }
    await page.waitFor(1000)


    // 输入账号和密码
    const inputs = await page.$$('.ivu-input-large')
    await inputs[0].type(userInfo.id)
    await inputs[1].type(userInfo.pw)

    // 点击登录按钮
    const loginBtn = await page.$('.ivu-btn')
    await page.waitFor(100)
    loginBtn.click()


    await page.waitFor(1000)
    console.log('登录成功')
    // 获取到api列表
    console.log('获取api列表。。。。')
    const files = file.getFile('./api')
    // 格式化数据
    const projcets = formatData(files)
    // 获取到工程名字
    const projcetNames = Object.keys(projcets)

    console.log(`api列表获取成功,一共: ${projcetNames.length}个工程，${files.length}个api\n\n`)
    console.log('开始导入。。。。。')

    // 写入工程
    createP(browser, page, projcetNames, 0, projcets)
})()