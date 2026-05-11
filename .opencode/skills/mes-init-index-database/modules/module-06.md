# 执行步骤

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何索引操作前，必须先向用户输出本次执行计划，包含：
- 索引目标：dbscript目录下的所有SQL文件
- 预期产出：schema-xxx目录和 Schema 级注册片段
- 风险评估：SQL文件可能很多，需分类处理
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 扫描数据库脚本目录
```
工具：Glob
路径：dbscript/
模式：**/*.sql
目的：定位所有SQL脚本文件
```

**Step Gate A**：SQL脚本扫描不完整或 Schema 范围识别错误 → 打回步骤2重做，不得进入 Schema 归属识别。

### Step 3: 识别Schema归属
```
工具：Read
路径：mes-ai-dev/knowledge/code-map/services/*/service-dependencies.md
目的：从服务级依赖片段中提取 Schema 归属关系，避免依赖尚未收拢的共享文件

提取信息：
- 服务名 → 数据库Schema映射
```

### Step 4: 解析SQL脚本
对每个SQL文件执行：
```
工具：Read
路径：dbscript/<schema>/xxx.sql

解析内容：
1. CREATE TABLE语句
   - 表名
   - 字段列表（字段名、类型、约束）
   - 主键
   - 索引
   - 表注释
   
2. ALTER TABLE语句
   - 新增字段
   - 修改字段
   - 新增索引
   
3. INSERT语句（初始数据）
   - 识别字典表
   
4. 注释提取
   - 表注释
   - 字段注释
```

### Step 5: 按Schema分类整理
对每个Schema生成独立目录：
```
目录结构：
mes-ai-dev/knowledge/database-index/
├── schema-mes_main/
│   ├── index.md        # Schema索引（含风险画像，模板参考：templates/governance/schema-index-template.md）
│   ├── tables.md       # 表结构详情
│   └── relations.md    # 表关联关系
├── schema-mes_quality/
│   ├── index.md
│   ├── tables.md
│   └── relations.md
```

**index.md 格式**（Schema索引，含风险画像）：
```markdown
# Schema索引：mes_main
