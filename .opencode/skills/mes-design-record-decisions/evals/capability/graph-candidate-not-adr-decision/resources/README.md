# 图谱候选关系不替代 ADR 决策 eval 资源说明

本 eval 验证 `mes-design-record-decisions` 在记录架构决策时的图谱治理边界。

- GitNexus：仅用于记录候选依赖和待验证证据。
- graphify：仅用于决策背景导读。
- 正式结论：ADR 必须引用 `design.md` 中已冻结的服务链、Provider 选择和契约边界，或阻断直到设计补齐。
- 拦截重点：不得因图谱建议直接采纳中间层、聚合层或平行机制；决策影响必须映射到开发 / 测试 / 验收。
