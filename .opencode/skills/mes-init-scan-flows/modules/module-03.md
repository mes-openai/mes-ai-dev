# 执行步骤

## 执行步骤

### 1. 输出执行计划
```
本次执行计划：
目标：推断核心业务链路，识别实体归属和风险热点
步骤：
  1. 优先读取服务级局部索引与依赖片段；已收拢场景可回退读取全局 overview / dependency
  2. 读取第1层精简版确认核心业务服务
  3. 按需读取 detail.md 和 file-summaries.md 追踪调用链
  4. 从 Controller/Service 推断业务主链路
  5. 识别核心实体归属
  6. 标注变更热点和高风险模块
  7. 生成 business-flows.md 和 ownership.md
预期产出：business-flows.md, ownership.md
风险：大服务调用链推断可能不完整
```

### 2. 读取前置输入
- 优先：各核心服务的 `index.md` 与 `services/*/service-dependencies.md`
- 已完成收拢时可回退读取：`mes-ai-dev/knowledge/code-map/backend-overview.md`、`mes-ai-dev/knowledge/dependency-graph/service-dependencies.md`

**Step Gate A**：前置输入不完整或核心服务选择范围错误 → 打回步骤2重做，不得进入主链路推断。

### 3. 推断业务主链路
1. 从 service-dependencies.md 中找出调用深度最长的链路
2. 从 Controller 的 `@RequestMapping` 推断资源类型和业务动作
3. 从 Service 层的业务编排推断端到端流程
4. 从 Entity/Enum 的状态字段推断状态机

### 4. 识别实体归属
1. 对每个核心实体，找出拥有完整 CRUD 的服务（主责服务）
2. 找出只有查询的服务（镜像服务）
3. 标注事实源和派生表的映射关系

### 5. 标注风险热点
1. 从依赖图的出度标注高耦合服务
2. 从 API 注册表标注核心入口 API
3. 标注无测试覆盖的核心模块

**Step Gate B**：业务主链路、实体归属或风险热点分析存在缺口 → 打回步骤3-5重做，不得生成交付文件。

### 6. 生成交付文件
- `mes-ai-dev/knowledge/code-map/business-flows.md`
- `mes-ai-dev/knowledge/code-map/ownership.md`

**Step Gate C**：business-flows 或 ownership 缺少核心链路、主责实体或热点说明 → 打回步骤6重做，不得交付后续初始化/分析阶段。
