# 约束规则

## 约束规则

### 执行前必须输出计划
每次执行前必须输出执行计划，经用户确认后才可继续。

### 必须读取现有风格
在编写任何Mapper前，必须：
1. 读取目标服务现有的Mapper接口和XML（至少各2个）
2. 分析命名规范、SQL风格、动态SQL使用
3. 保持与现有代码风格一致

### 必须完成 MyBatis 一致性校验
在交付任何 Mapper / XML 前，必须：
1. 确认 `namespace` 与 Mapper 接口全限定名一致
2. 确认 XML 中每个 `id` 与接口方法名一致
3. 确认 `parameterType` / `resultType` / `resultMap` 引用真实存在
4. 确认表名、字段名、Schema 有真实数据库依据
5. 确认接口与 XML 文件名、目录位置、包路径都与目标仓一致

### 命名规范
- Mapper接口：`XxxMapper`（实体名+Mapper）
- XML文件：`XxxMapper.xml`（与接口同名）
- ResultMap ID：`BaseResultMap`
- SQL片段ID：`Base_Column_List`、`Query_Where_Clause`

### SQL规范
- 表名必须带Schema前缀：`schema_name.table_name`
- 所有SQL必须使用动态SQL片段
- 批量操作使用`<foreach>`标签
- 条件查询使用`<where>`+`<if>`标签
- 更新操作使用`<set>`标签

### 性能规范
- 查询字段必须明确指定，避免`SELECT *`
- 分页查询必须带`LIMIT`
- 大数据量查询必须有索引支持
- 批量插入单批次不超过1000条

### 安全规范
- 所有参数必须使用`#{}`占位符，禁止使用`${}`
- 动态SQL必须防止SQL注入
- 删除操作必须带WHERE条件

### 不硬编码服务名
在SQL中引用其他服务表时，使用配置的Schema名称，不硬编码具体值。
