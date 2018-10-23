const file = require('./getFile');
const userInfo = require('./user.config');

/**
 * 新建工程
 */
const createP = async (browser, page, projcetNames, i, projcets) => {
    name = projcetNames[i]
    console.log('正在写入', name, '项目')
    // 新增接口按钮
    const createBtn = await page.$('.em-add')
    createBtn.click()

    await page.waitFor(500)

    // 选择项目目录
    await page.evaluate((userInfo) => {
        // 点击列表进入 api 编辑页面
        const nameSel = document.querySelector('.ivu-form-item')
        nameSel.click()
        const groups = document.querySelector('.ivu-select-dropdown-list').querySelectorAll('li')
        for (let i = 0, len = groups.length; i < len; i++) {
            if (groups[i].innerText == userInfo.groupName) {
                groups[i].click()
            }
        }
        return true
    }, userInfo);

    await page.waitFor(100)
    // 获取输入框
    const porjectInputs =  await page.$$('.ivu-input')
    // 项目名
    await porjectInputs[1].type(name)
    // 项目基础url
    await porjectInputs[2].type(name)
    // 保存按钮
    const saveBtn = await page.$$('.ivu-btn')
    saveBtn[2].click()
    await page.waitFor(800)

    const this_pj = await page.$('.em-project__item')
    await this_pj.click()
    await page.waitFor(500)

    createApi(page, projcets[name], 0, function () {
        i++
        if (i < projcetNames.length) {
            createP(browser, page, projcetNames, i, projcets)
        } else {
            console.log('所有api写入完毕')
            browser.close();
        }
    })
}

/**
 * 新建接口
 */
const createApi = async (page, projcets, i, callBack) => {
    apiInfo = projcets[i]
    console.log(`正在在写入第${i + 1}个api：${apiInfo.apiName}`)

    // 获取api文本
    let apiText = await file.getApi(apiInfo.path)

    // 点击新增按钮
    await page.evaluate(() => {
        // 点击列表进入 api 编辑页面
        const navBar = document.querySelectorAll('.em-proj-detail__switcher')[1].querySelector('li')
        navBar.click()
        return true
    });

    // 获取文本编辑器
    const editor = await page.$('.em-editor__editor')
    editor.click()

    await page.waitFor(500)

    // 删除原有的
    for (let i = 0; i < 16; i++) {
        page.keyboard.press('Backspace');
    }

    await page.waitFor(500)

    // 输入接口文本
    await page.evaluate((apiText) => {
        // 点击列表进入 api 编辑页面
        const edit = document.querySelector('textarea')
        edit.value = apiText
        return true
    }, apiText);
    const textInput = await page.$('.ace_text-input')
    await textInput.type(' ', {
        delay: 0
    })


    await page.evaluate(() => {
        // 选择接口类型 post
        document.querySelector('.em-proj-detail__switcher').querySelector('li').click()
        document.querySelector('.ivu-select-selection').click()
        document.querySelector('.ivu-select-dropdown-list').querySelectorAll('li')[1].click()
        return true
    });

    await page.waitFor(500)

    // 接口名称 和 接口描述
    const porjectInfoInput = await page.$$('.ivu-input')
    await porjectInfoInput[1].type(apiInfo.apiName)
    await porjectInfoInput[2].type(apiInfo.apiName)

    // 保存
    const porjectSaveBtn = await page.$('.ivu-btn')
    porjectSaveBtn.click()

    await page.waitFor(500)

    // 继续
    i++
    if (i < projcets.length) {
        createApi(page, projcets, i, callBack)
    } else {
        callBack()
    }
}
module.exports = createP