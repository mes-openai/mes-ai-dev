# 性能分析报告

## 性能分析报告

### 分析时间
YYYY-MM-DD HH:mm:ss

### 分析范围
- Service: XxxServiceImpl.java
- Mapper: XxxMapper.xml
- Database: table_name

### 性能问题清单

| 序号 | 问题类型 | 文件位置 | 影响程度 | 问题描述 | 建议优化方案 |
|------|----------|----------|----------|----------|--------------|
| 1    | N+1查询  | XxxServiceImpl.java:行号 | 高 | 循环中调用selectById | 改用批量查询：selectByIds |
| 2    | 缺少索引 | XxxMapper.xml:行号 | 高 | WHERE字段无索引 | 添加索引：idx_column_name |
| 3    | 大事务   | XxxServiceImpl.java:行号 | 中 | 事务中包含远程调用 | 将远程调用移出事务 |
| ...  | ...      | ...      | ...      | ...      | ...          |

### 索引优化建议

| 表名 | 字段名 | 索引类型 | 建议原因 | SQL语句 |
|------|--------|----------|----------|---------|
| table_name | column_name | 普通索引 | 高频查询条件 | CREATE INDEX idx_column_name ON table_name(column_name) |
| table_name | created_time | 组合索引 | 范围查询+排序 | CREATE INDEX idx_time_order ON table_name(created_time, id) |

### 查询优化建议

| SQL位置 | 原SQL | 优化后SQL | 预期效果 |
|---------|-------|-----------|----------|
| XxxMapper.xml:行号 | SELECT * FROM table | SELECT id, name FROM table | 减少数据传输量 |
| XxxMapper.xml:行号 | LIKE '%xxx%' | LIKE 'xxx%' | 利用索引 |

### 性能基准建议
- 单次查询返回数据量：< 1000条
- 分页大小：20-50条
- 批量操作批次大小：100-500条
- 事务执行时间：< 1秒
- 远程调用超时：3-5秒

### 分析结论
[通过/需优化] - 是否存在需要立即优化的高影响问题
```

**Step Gate B**：性能问题清单、索引建议或优化方案存在缺口 → 打回步骤5-6重做，不得交付测试/发布阶段使用。
