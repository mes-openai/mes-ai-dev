# 术语表索引（示例）

> 示例文件，演示 `knowledge/reference/terminology-glossary.md` 在大仓/超大仓场景下应如何以“索引文件”形式输出。
> 完整术语条目应下沉到服务级或术语组分片，不在本文件中全量展开。

## 一、文件定位

- **文件角色**：业务术语全局索引文件
- **生成阶段**：`/mes-init-converge`
- **消费原则**：先读索引，再按服务或术语组分片消费；禁止一次性全量加载所有术语正文

## 二、术语分组摘要

| 分组/服务 | 术语数量 | 分片路径 | 优先级 | 说明 |
|-----------|----------|----------|--------|------|
| `service-mes-production` | 86 | `knowledge/fragments/reference/terminology/service-mes-production.md` | 高 | 工单、工艺路线、工序等生产核心术语 |
| `service-mes-quality` | 42 | `knowledge/fragments/reference/terminology/service-mes-quality.md` | 中 | 检验、不良、复判等质量术语 |
| `group-quality` | 35 | `knowledge/fragments/reference/terminology/group-quality.md` | 高 | 检验、放行、复判等术语组 |

## 三、高频/高歧义术语提示

| 术语 | 所在分片 | 风险类型 | 建议 |
|------|----------|----------|------|
| 工单 | `service-mes-production.md` | 高频 | 需求分析先读 |
| 批次 | `service-mes-quality.md` | 高频/跨服务不一致 | 修改前先核对库存与质量分片 |
| 放行 | `group-quality.md` | 歧义 | 先确认是质检放行还是库存放行 |

## 四、消费建议

1. 需求分析阶段：先读索引中的高频/高歧义术语提示。
2. 涉及具体服务时，只进入对应服务或术语组分片。
3. 遇到术语冲突时，回到索引核对别名/跨服务差异。

## 五、风险提示

- **未收口术语分片**：无
- **歧义术语**：放行、冻结、完工存在跨域语义差异
- **消费限制**：本文件不是完整术语正文，不得替代服务级/术语组分片

## 六、证据路径

| 编号 | 类型 | 路径/命令 | 说明 |
|------|------|-----------|------|
| E-01 | 分片 | `knowledge/fragments/reference/terminology/service-mes-production.md` | 生产术语分片 |
| E-02 | 状态 | `knowledge/state/state.yaml` | 收口批次与范围来源 |
