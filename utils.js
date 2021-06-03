const moment = require('moment')

module.exports = {
    log (msg) {
        console.log(`[${moment().format('YYYY-MM-DD kk:mm:ss')}] ${msg}`)
    },
    randIp () {
        return (
            Math.floor(Math.random() * (10 - 255) + 255) +
            "." +
            Math.floor(Math.random() * (10 - 255) + 255) +
            "." +
            Math.floor(Math.random() * (10 - 255) + 255) +
            "." +
            Math.floor(Math.random() * (10 - 255) + 255)
        )
    },
    zerofill (code, level) {
        return level <= 3 ? code.padEnd(6, '0') : code.padEnd(12, '0')
    }
}