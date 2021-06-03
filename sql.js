module.exports = {
    createTableSQL: "CREATE TABLE `china_admin_division` (" +
        "  `id` int unsigned NOT NULL AUTO_INCREMENT," +
        "  `parent_code` bigint unsigned NOT NULL COMMENT '父代码（顶层的父代码为0）'," +
        "  `code` bigint unsigned NOT NULL COMMENT '统计用区划代码（1～2位：省级代码；3～4 位：地级代码；5～6位：县级代码；7～9位：乡级代码；10～12位：村级代码）'," +
        "  `type_code` tinyint unsigned NOT NULL COMMENT '城乡分类代码（0：无；111：主城区；112：城乡结合区；121：镇中心区；122：镇乡结合区；123：特殊区域；210：乡中心区；220：村庄）'," +
        "  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '名称'," +
        "  `level` tinyint unsigned NOT NULL COMMENT '级别'," +
        "  PRIMARY KEY (`id`)" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;"
}