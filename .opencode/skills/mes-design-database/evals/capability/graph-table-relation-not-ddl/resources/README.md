# 图谱表关系不替代数据库设计结论 eval 资源说明

本 eval 验证 `mes-design-database` 的图谱治理边界。

- GitNexus：仅用于候选表、实体、Mapper 和依赖关系定位。
- graphify：仅用于数据关系导读。
- 正式结论：Schema、表、字段、索引、DDL、迁移与回滚必须写入 `design.md` 或 `database-design.md`。
- 拦截重点：不得用图谱关系替代真实表核验，或新增未经确认的基表、聚合表、同步表、跨库平行机制。
