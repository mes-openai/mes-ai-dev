# MyBatis 真实性优先要求

## MyBatis 真实性优先要求
- Mapper 接口全限定名、XML `namespace`、SQL `id`、`parameterType`、`resultType`、`resultMap`、表名、字段名都必须以目标仓真实定义为准。
- 不得仅根据模板文件名或理想命名规则猜测 `namespace`。
- 不得在未核对真实 DDL / schema 索引 / 现有 Mapper 风格前直接生成 XML。
