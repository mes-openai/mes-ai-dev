# 执行步骤（2/2）

### 6. 设计数据校验方案
设计迁移前后数据完整性校验：

**校验维度**：
1. **数据量校验**：
   ```sql
   -- 迁移前
   SELECT COUNT(*) FROM source_table;
   -- 迁移后
   SELECT COUNT(*) FROM target_table;
   -- 应相等
   ```

2. **关键字段校验**：
   ```sql
   -- 检查关键字段是否正确迁移
   SELECT id, key_field FROM source_table
   WHERE NOT EXISTS (
       SELECT 1 FROM target_table 
       WHERE target_table.id = source_table.id
       AND target_table.key_field = source_table.key_field
   );
   -- 应返回空结果
   ```

3. **关联关系校验**：
   ```sql
   -- 检查关联数据完整性
   SELECT COUNT(*) FROM table_a a
   LEFT JOIN table_b b ON a.ref_id = b.id
   WHERE b.id IS NULL AND a.ref_id IS NOT NULL;
   -- 应返回0（无孤儿数据）
   ```

4. **业务数据校验**：
   ```sql
   -- 检查业务关键字段
   SELECT SUM(amount) FROM transaction_table;
   -- 迁移前后应相等
   ```

### 7. 评估迁移风险
分析迁移过程中可能的风险：

**风险评估维度**：
1. **大表DDL锁表时间**：
   - 表大小：估算记录数和存储大小
   - DDL类型：ALTER TABLE、CREATE INDEX等
   - 锁类型：表锁、行锁
   - 预估时间：根据表大小和操作复杂度

2. **数据量对迁移时间的影响**：
   - 数据量：百万级、千万级、亿级
   - 迁移方式：批量迁移、分批迁移
   - 预估时间：每批次耗时

3. **对线上服务的影响**：
   - 是否需要停机：评估是否必须停机
   - 服务影响范围：哪些服务会受影响
   - 影响时长：预估影响时长

4. **回滚可行性**：
   - 是否可回滚：评估回滚可行性
   - 回滚影响：回滚可能带来的问题
   - 回滚时间：预估回滚执行时间

### 8. 生成迁移方案文档
将迁移方案写入：`mes-ai-dev/workspace/development/REQ-YYYYMMDD-XXX/db-migration-plan.md`

**文档格式**：
```markdown
