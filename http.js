const utils = require('./utils')
const got = require('got')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

module.exports = {
    async gotBody (url) {
        return await got(url, {
            headers: {
                'X-Forwarded-For': utils.randIp()
            },
            timeout: 2500
        }).then(r => cheerio.load(r.body)).catch(e => {
            console.log(`请求失败，路径[${url}]，原因[${e.toString()}]`)
        })
    },

    async gotIconvBody (url, characterSet = 'gb2312') {
        let result = null
        for (let i = 0; i < 5; i++) {
            result = await got(url, {
                headers: {
                    'X-Forwarded-For': utils.randIp()
                },
                timeout: 2500
            }).then(r => cheerio.load(iconv.decode(r.rawBody, characterSet).toString())).catch(e => {
                console.log(`请求失败，路径[${url}]，原因[${e.toString()}]`)
            })
            if (result) {
                break
            }
        }
        return result
    }
}