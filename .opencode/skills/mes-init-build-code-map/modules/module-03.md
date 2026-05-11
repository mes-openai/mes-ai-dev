# 执行步骤

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何汇总操作前，必须先向用户输出本次执行计划，包含：
- 汇总目标：所有已分析的知识库文件
- 预期产出：更新后的overview文件
- 风险评估：需读取多个文件，确保数据一致性
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 读取所有分析结果
```
工具：Read
读取以下文件：
1. mes-ai-dev/knowledge/code-map/services/service-*/index.md、detail.md、file-summaries.md（所有服务目录）
2. mes-ai-dev/knowledge/code-map/modules/module-*/index.md、detail.md、file-summaries.md（所有模块目录）
3. mes-ai-dev/knowledge/code-map/services/service-*/api-registry.md
4. mes-ai-dev/knowledge/code-map/services/service-*/service-dependencies.md
5. mes-ai-dev/knowledge/code-map/modules/module-*/frontend-backend-map.md
6. mes-ai-dev/knowledge/database-index/schema-*/registry-fragment.md
```

**Step Gate A**：输入分析结果读取不完整或数据源范围错误 → 打回步骤2重做，不得进入完整性验证。

### Step 3: 验证数据完整性
```
检查项：
1. 后端服务数量是否与service文档数量一致
2. 前端模块数量是否与module文档数量一致
3. API注册表中的服务是否都在服务列表中
4. 前后端映射中的服务是否都存在
5. 数据库Schema是否都有归属服务
```

### Step 4: 补充交叉引用
对每个服务和模块：
```
补充内容：
1. 服务 → 数据库Schema映射
2. 服务 → 前端模块映射
3. 模块 → 后端服务映射
4. 服务 → API数量统计
5. 模块 → API数量统计
```

### Step 5: 更新backend-overview.md
```
工具：Read
路径：mes-ai-dev/knowledge/code-map/backend-overview.md

工具：Edit
补充内容：
1. 增加服务依赖关系摘要
2. 增加数据库归属摘要
3. 增加API统计
4. 增加前端模块映射
```

### Step 6: 更新frontend-overview.md
```
工具：Read
路径：mes-ai-dev/knowledge/code-map/frontend-overview.md

工具：Edit
补充内容：
1. 增加后端服务映射
2. 增加API统计
3. 增加路由统计
4. 增加公共组件使用统计
```

**Step Gate B**：完整性验证、交叉引用补充或 overview 更新存在缺口 → 打回步骤3-6重做，不得生成知识库索引。

### Step 7: 生成知识库索引
```
工具：Write
路径：mes-ai-dev/knowledge/INDEX.md

内容：
- 知识库结构说明
- 文件清单
- 使用指南
```

**Step Gate C**：INDEX 或 overview 缺少交叉引用、统计或使用说明 → 打回步骤7重做，不得交付最终收拢结果。
