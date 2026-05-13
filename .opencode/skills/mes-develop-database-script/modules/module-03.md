# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发数据库DDL/DML脚本
步骤：
  1. 读取数据库设计文档
  2. 读取现有数据库索引
  3. 分析现有数据库脚本风格
  4. 编写DDL脚本
  5. 编写DML脚本
  6. 编写回滚脚本
预期产出：DDL脚本、DML脚本、回滚脚本
风险：表结构冲突、命名不一致
```

### 2. 读取设计文档
按顺序读取：
1. `mes-ai-dev/workspace/designs/{REQ-ID}/database-design.md` - 数据库设计
2. `mes-ai-dev/workspace/designs/{REQ-ID}/design.md` - OpenSpec 详细设计主文档（数据相关部分）

### 3. 读取现有数据库信息
1. **识别Schema**：从设计文档确定涉及的数据库Schema
2. **读取索引**：`mes-ai-dev/knowledge/database-index/schema-xxx/` 下相关索引
3. **读取现有脚本风格**：`dbscript/schema-xxx/` 下查看现有脚本格式

**Step Gate A**：数据库设计输入、Schema识别或现有脚本基线读取不完整 → 打回步骤2-3重做，不得进入脚本风格分析。

### 4. 分析脚本风格
从现有脚本中学习：
- 命名规范（表名、字段名、索引名）
- 注释风格
- SQL格式化方式
- 字段类型约定
- 约束命名约定

### 5. 编写DDL脚本
创建文件：`mes-ai-dev/workspace/development/{REQ-ID}/database/ddl-xxx.sql`

**DDL脚本结构**：
```sql
-- ============================================================================
-- 需求编号：REQ-YYYYMMDD-XXX
-- 功能描述：XXXXX
-- 作者：AI-Assistant
-- 创建时间：YYYY-MM-DD HH:mm:ss
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 表：表名
-- 说明：表功能说明
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `schema_name`.`table_name` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `column_name` VARCHAR(100) NOT NULL COMMENT '字段说明',
  `created_by` VARCHAR(50) DEFAULT NULL COMMENT '创建人',
  `created_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` VARCHAR(50) DEFAULT NULL COMMENT '更新人',
  `updated_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_column_name` (`column_name`),
  KEY `idx_column_name` (`column_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='表功能说明';

-- ----------------------------------------------------------------------------
-- 索引：索引说明
-- ----------------------------------------------------------------------------
ALTER TABLE `schema_name`.`table_name`
  ADD INDEX `idx_column_name` (`column_name`);
```
