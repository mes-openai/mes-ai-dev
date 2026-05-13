# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：设计数据库迁移策略和回滚方案
步骤：
  1. 读取DDL/DML脚本
  2. 读取数据库设计文档
  3. 设计迁移顺序
  4. 设计回滚脚本
  5. 设计数据校验方案
  6. 评估迁移风险
  7. 生成迁移方案文档
预期产出：db-migration-plan.md
风险：遗漏回滚脚本、风险评估不准确
```

### 2. 读取DDL/DML脚本
读取已生成的数据库脚本：
- `mes-ai-dev/workspace/development/{REQ-ID}/database/ddl-xxx.sql` - DDL脚本
- `mes-ai-dev/workspace/development/{REQ-ID}/database/dml-xxx.sql` - DML脚本（如有）

### 3. 读取数据库设计文档
读取完整数据库变更范围：
- `mes-ai-dev/workspace/designs/{REQ-ID}/database-design.md` - 数据库设计

**Step Gate A**：DDL/DML脚本或数据库设计输入不完整 → 打回步骤2-3重做，不得进入迁移顺序设计。

### 4. 设计迁移顺序
按照依赖关系设计迁移顺序：

**顺序原则**：
1. **先加后删**：先添加新字段/表，再删除旧字段/表
2. **先数据后结构**：先迁移数据，再修改结构
3. **先独立后依赖**：先迁移无依赖的对象，再迁移有依赖的对象
4. **先加索引后改数据**：先添加索引，再执行数据更新

**典型顺序**：
```
1. 创建新表（CREATE TABLE）
2. 添加新字段（ALTER TABLE ADD COLUMN）
3. 创建新索引（CREATE INDEX）
4. 数据迁移（INSERT/UPDATE）
5. 添加约束（ALTER TABLE ADD CONSTRAINT）
6. 删除旧字段（ALTER TABLE DROP COLUMN）- 确认无问题后执行
7. 删除旧表（DROP TABLE）- 确认无问题后执行
```

### 5. 设计回滚脚本
为每个变更操作设计对应的回滚操作：

**DDL回滚对应**：
| DDL操作 | 回滚DDL |
|---------|---------|
| CREATE TABLE table_name | DROP TABLE table_name |
| ALTER TABLE ADD COLUMN col | ALTER TABLE DROP COLUMN col |
| ALTER TABLE DROP COLUMN col | ALTER TABLE ADD COLUMN col (恢复原有定义) |
| CREATE INDEX idx_name | DROP INDEX idx_name |
| ALTER TABLE ADD CONSTRAINT | ALTER TABLE DROP CONSTRAINT |

**DML回滚对应**：
| DML操作 | 回滚DML |
|---------|---------|
| INSERT INTO table VALUES (...) | DELETE FROM table WHERE id = ... |
| UPDATE table SET col = new | UPDATE table SET col = old |
| DELETE FROM table WHERE ... | INSERT INTO table VALUES (原数据) |

**回滚脚本格式**：
```sql
-- ============================================
-- 回滚脚本：rollback-xxx.sql
-- 生成时间：YYYY-MM-DD HH:mm:ss
-- 对应变更：ddl-xxx.sql
-- ============================================

-- 回滚步骤1：删除新增表
DROP TABLE IF EXISTS new_table_name;

-- 回滚步骤2：删除新增字段
ALTER TABLE existing_table DROP COLUMN new_column;

-- 回滚步骤3：恢复删除的字段
ALTER TABLE existing_table ADD COLUMN old_column VARCHAR(100);

-- 回滚步骤4：删除新增索引
DROP INDEX idx_new_column ON existing_table;

-- 回滚步骤5：恢复数据（如有数据迁移）
-- 根据备份表恢复原数据
```
