const config = require('./config')
const sql = require('./sql')
const http = require('./http')
const utils = require('./utils')

const argv = process.argv,
    knex = config.knex,
    collectLevel = argv[2] || 3,
    dataList = []

let $ = null,
    nextUrl = null,
    code = null,
    data = null

collect().catch(e => console.log(`采集中国行政区划数据失败：${e.toString()}`))
    .then(() => console.log('采集中国行政区划数据完毕！'))

async function collect () {
    const hasTable = await knex.schema.hasTable(config.table)
    if (hasTable) {
        console.log(`表格 ${config.table} 已存在.`)
        return
    }

    await knex.schema.raw(sql.createTableSQL).then(async function () {
    }).then(async function () {
        $ = await http.gotBody(config.baseUrl)
        nextUrl = $(config.baseAClass).attr('href')
        await collectProvince(nextUrl)
        await knex(config.table).insert(dataList)
        await knex.destroy()
    }).catch(e => {
        console.log(`创建表格失败：${e.toString()}`)
        knex.destroy()
    })
}

async function collectProvince (url) {
    const preUrl = url.substring(0, url.lastIndexOf('/') + 1)
    $ = await http.gotIconvBody(url)
    const $provinces = $(config.provinceAClass)
    for (let i = 0; i < $provinces.length; i++) {
        const $province = $($provinces[i]),
            name = $province.text()
        nextUrl = preUrl + $province.attr('href')
        const provinceCode = $province.attr('href').split('.')[0]
        code = utils.zerofill(provinceCode, collectLevel)
        data = {
            parent_code: 0,
            code: code,
            type_code: 0,
            name: name,
            level: 1
        }
        dataList.push(data)
        console.log()
        const msg = `正在采集 ${name} [${i + 1}/${$provinces.length}]`
        utils.log(msg)
        await collectChildren(code, nextUrl, 2, msg)
    }
}

async function collectChildren (parentCode, url, level, parMsg) {
    const preUrl = nextUrl.substring(0, nextUrl.lastIndexOf('/') + 1)
    $ = await http.gotIconvBody(url)
    const $children = $(config.trClass[level])
    for (let i = 0; i < $children.length; i++) {
        const $child = $($children[i])
        code = $child.find('td').eq(0).text()
        code = collectLevel <= 3 ? code.substr(0, 6) : code
        data = {
            parent_code: parentCode,
            code: code,
            type_code: 0,
            name: $child.find('td').eq(1).text(),
            level: level
        }
        if ($child.find('td').length === 3) {
            data.type_code = $child.find('td').eq(1).text()
            data.name = $child.find('td').eq(2).text()
        }
        dataList.push(data)
        const msg = `${parMsg} ${data.name} [${i + 1}/${$children.length}]`
        // utils.log(msg)
        if (level < collectLevel && $child.find('a').length !== 0) {
            nextUrl = preUrl + $child.find('a').eq(0).attr('href')
            await collectChildren(code, nextUrl, level + 1, msg)
        }
    }
}
