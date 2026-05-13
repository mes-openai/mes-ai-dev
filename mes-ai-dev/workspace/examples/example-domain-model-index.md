# 领域模型索引（示例）

> 示例文件，演示 `mes-ai-dev/knowledge/reference/domain-model.md` 在大仓/超大仓场景下应如何以“索引文件”形式输出。
> 完整领域规则与实体关系应下沉到按业务域拆分的正文文件。

## 一、文件定位

- **文件角色**：领域模型全局索引文件
- **生成阶段**：`/mes-init-converge`
- **消费原则**：先读索引，再按业务域进入分片；禁止无边界全量加载所有领域正文

## 二、业务域摘要

| 业务域 | 核心实体 | 规则数量（估算） | 分片路径 | 优先级 | 说明 |
|--------|----------|------------------|----------|--------|------|
| 生产 | WorkOrder、Route、Operation | 38 | `knowledge/fragments/reference/domain-model/service-mes-production.md` | 高 | 工单主链路与状态流转核心域 |
| 质量 | InspectionLot、DefectRecord | 24 | `knowledge/fragments/reference/domain-model/service-mes-quality.md` | 中 | 检验、不良、质量闭环 |
| 库存 | InventoryLot、StockRecord、FreezeRecord | 31 | `knowledge/fragments/reference/domain-model/service-mes-inventory.md` | 高 | 批次、库存、冻结与解冻 |

## 三、优先阅读分片

| 优先级 | 分片 | 原因 | 适用场景 |
|--------|------|------|----------|
| 1 | `service-mes-production.md` | 涉及生产主链路与工单状态变更 | 需求分析 / 设计 |
| 2 | `service-mes-inventory.md` | 与生产完工、入库、冻结联动频繁 | 需求分析 / 开发 |

## 四、跨域关系提示

| 关系类型 | 涉及业务域 | 说明 | 风险 |
|----------|------------|------|------|
| 完工入库联动 | 生产 / 库存 | 工单完工后触发库存批次入账 | 中 |
| 检验放行联动 | 质量 / 库存 | 质检通过后允许库存流转 | 高 |

## 五、消费建议

1. 需求分析阶段：先确定涉及业务域，再按域读取正文。
2. 设计阶段：只进入受影响业务域，必要时追踪跨域关系。
3. 发现跨域规则冲突时，回到索引检查其他相关域分片。

## 六、风险提示

- **未收口分片**：无
- **跨域冲突**：质量放行与库存冻结规则仍需进一步统一命名
- **消费限制**：本文件不是完整领域正文，不得替代分域模型文件

## 七、证据路径

| 编号 | 类型 | 路径/命令 | 说明 |
|------|------|-----------|------|
| E-01 | 分片 | `knowledge/fragments/reference/domain-model/service-mes-production.md` | 生产域正文片段 |
| E-02 | 状态 | `knowledge/state/state.yaml` | 收口批次与范围来源 |
