# 执行步骤（1/2）

## 执行步骤

### 1. 执行前输出计划（必须）
在执行任何操作前，先输出本次执行计划：
```
【执行计划】
目标：对需求规格文档进行五维度交叉审核
步骤：
  1. 读取 spec.md 获取需求规格主文档
  2. 读取知识库验证对现有系统的描述准确性
  3. 完整性审核：检查所有章节是否完整
  4. 一致性审核：检查内部逻辑是否一致
  5. 可测性审核：检查验收标准是否可测试
  6. 可行性审核：检查技术实现可行性
  7. 关联性审核：检查与现有系统的关联是否准确
  8. 使用评审模板生成评审报告
预期产出：spec-review-report.md（详细审查报告）
风险：评审维度可能遗漏关键问题
上下文预算控制：需求文档约15K + 知识库约5K ≈ 20K token
```

### 2. 读取需求规格文档
从文件交接路径读取：
```
mes-ai-dev/workspace/requirements/{REQ-ID}/spec.md
```

提取关键信息：
- 需求编号和类型
- 功能需求列表
- 数据需求
- 接口需求
- 影响分析
- 验收标准
- 存量功能变更说明（若为迭代需求）

**Step Gate A**：需求规格文档读取不完整、关键信息提取不准确 → 打回步骤2重做，不得进入知识库验证。

### 3. 读取知识库验证准确性
按需读取知识库验证对现有系统的描述：

#### 3.1 后端服务验证
读取文件：
- `mes-ai-dev/knowledge/code-map/backend-overview.md`
- `mes-ai-dev/knowledge/code-map/services/service-xxx/index.md`（快速验证涉及的服务）
- 必要时：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`（深度验证）

验证内容：
- 影响的服务是否真实存在
- 服务职责描述是否准确
- 服务依赖关系是否正确

#### 3.2 前端模块验证
读取文件：
- `mes-ai-dev/knowledge/code-map/frontend-overview.md`
- `mes-ai-dev/knowledge/code-map/modules/module-xxx/index.md`（快速验证涉及的模块）
- 必要时：`mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md`（深度验证）

验证内容：
- 影响的模块是否真实存在
- 模块功能描述是否准确
- 前后端映射关系是否正确

#### 3.3 数据库验证
读取文件：`mes-ai-dev/knowledge/dependency-graph/database-registry.md`

验证内容：
- 数据表是否真实存在
- 表字段定义是否准确
- 表关联关系是否正确

**Step Gate B**：知识库验证证据不足或现有系统描述未校准 → 打回步骤3重做，不得进入五维审核。
