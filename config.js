module.exports = {
    knex: require('knex')({
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: 'root',
            database: 'epitome',
            charset: 'utf8mb4'
        },
        pool: {
            min: 1,
            max: 10
        }
    }),
    table: 'china_admin_division',
    // 国家统计局>>统计用区划和城乡划分代码
    baseUrl: 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/',
    baseAClass: '.center_list_contlist li:nth-child(1) a',
    provinceAClass: '.provincetr a',
    trClass: {
        2: '.citytr',
        3: '.countytr',
        4: '.towntr',
        5: '.villagetr'
    }
    
}