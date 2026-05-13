# API 注册索引（示例）

> 示例文件，演示 `mes-ai-dev/knowledge/dependency-graph/api-registry.md` 在大仓/超大仓场景下应如何以“索引文件”形式输出。
> 完整 API 明细应继续下沉到服务级片段，不在本文件全量展开。

## 一、文件定位

- **文件角色**：全局 API 注册索引文件
- **生成阶段**：`/mes-init-converge`
- **消费原则**：先读索引，再按需进入服务级 API 片段；禁止全量加载所有服务 API 明细

## 二、范围摘要

| 项目 | 内容 |
|------|------|
| 服务总数 | 3 |
| API 总量（估算） | 426 |
| 高频 API 数量 | 20 |
| 高风险 API 数量 | 8 |
| 最近收口时间 | 2026-04-15T21:00:00+08:00 |

## 三、服务级 API 分片列表

| 服务 | API 数量 | 片段路径 | 优先级 | 说明 |
|------|----------|----------|--------|------|
| service-mes-production | 186 | `mes-ai-dev/knowledge/code-map/services/service-mes-production/api-registry.md` | 高 | 工单、报工、完工相关 API 密集 |
| service-mes-quality | 97 | `mes-ai-dev/knowledge/code-map/services/service-mes-quality/api-registry.md` | 中 | 检验、不良、质量追溯相关 |
| service-mes-inventory | 143 | `mes-ai-dev/knowledge/code-map/services/service-mes-inventory/api-registry.md` | 高 | 出入库、批次、库存冻结相关 |

## 四、高频/高风险 API 提示

| 类别 | API/服务 | 原因 | 建议消费顺序 |
|------|----------|------|--------------|
| 高频 | service-mes-production | 生产主链路入口集中 | 先读 |
| 高频 | service-mes-inventory | 出入库相关调用频繁 | 先读 |
| 高风险 | /work-order/complete | 涉及状态流转与库存联动 | 先读并谨慎修改 |
| 高风险 | /inventory/freeze | 涉及批次与库存一致性 | 先读并谨慎修改 |

## 五、消费建议

1. 需求分析阶段：先读高频/高风险 API 所在服务片段。
2. 设计阶段：仅进入受影响服务的 API 片段，不全量读取。
3. 开发阶段：结合服务 `detail.md` 与对应 API 片段消费。

## 六、风险提示

- **未收口片段**：无
- **覆盖缺口**：历史低频管理类 API 尚未纳入高频提示，但不影响按服务检索
- **消费限制**：禁止将本索引文件当作完整 API 明细正文使用

## 七、证据路径

| 编号 | 类型 | 路径/命令 | 说明 |
|------|------|-----------|------|
| E-01 | 片段 | `mes-ai-dev/knowledge/code-map/services/service-mes-production/api-registry.md` | 服务级 API 明细片段 |
| E-02 | 状态 | `mes-ai-dev/knowledge/state/state.yaml` | 收口批次与 pending 状态来源 |
