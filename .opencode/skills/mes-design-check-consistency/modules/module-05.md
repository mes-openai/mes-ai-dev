# 执行步骤

## 执行步骤

### 1. 输出执行计划
```
本次执行计划：
目标：校验设计文档在跨服务维度的一致性
步骤：
  1. 读取设计文档和涉及服务列表
  2. 读取涉及服务的 detail.md
  3. 读取 patterns.md 了解现有模式
  4. 对比字段命名一致性
  5. 对比错误码一致性
  6. 对比状态枚举一致性
  7. 对比接口语义一致性
  8. 对比数据格式一致性
  9. 生成交叉服务一致性报告
预期产出：cross-service-consistency.md
风险：服务数量多时上下文可能超限
```

### 2. 读取前置输入
- `workspace/designs/{REQ-ID}/design.md`
- `workspace/designs/{REQ-ID}/api-design.md`
- `workspace/designs/{REQ-ID}/database-design.md`
- 涉及服务的 `detail.md`（第1层完整版）
- `knowledge/code-map/patterns.md`
- `mes-ai-dev/knowledge/reference/error-code-registry.md`
- `mes-ai-dev/knowledge/reference/enum-registry.md`

**Step Gate A**：设计输入或参考基线读取不完整 → 打回步骤2重做，不得进入各维度一致性对比。

### 3. 字段命名对比
1. 从设计中提取新增/修改的字段名
2. 与涉及服务中已有字段名对比
3. 检查同一概念是否使用了不同命名

### 4. 错误码对比
1. 从设计中提取新增错误码
2. 与 error-code-registry.md 对比
3. 检查同一错误场景是否有不同错误码

### 5. 状态枚举对比
1. 从设计中提取状态枚举定义
2. 与 enum-registry.md 和其他服务对比
3. 检查同一实体的状态枚举是否冲突

### 6. 接口语义对比
1. 从设计中提取新增接口
2. 与涉及服务的已有接口对比语义
3. 检查是否有语义不同但命名相同的接口

### 7. 数据格式对比
1. 日期格式、金额精度、编码规则等
2. 检查新增设计是否与现有格式一致

**Step Gate B**：字段/错误码/枚举/接口语义/数据格式任一维度对比存在缺口 → 打回步骤3-7重做，不得生成一致性报告。

### 8. 生成报告
使用 `templates/cross-service-consistency-template.md` 模板生成报告：
- `workspace/designs/{REQ-ID}/cross-service-consistency.md`

**Step Gate C**：一致性报告缺少冲突分级、建议或服务覆盖范围 → 打回步骤8重做，不得交付设计决策阶段。
