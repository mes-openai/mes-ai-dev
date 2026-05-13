# flow-graph-requires-source-confidence 资源说明

本用例验证 `mes-init-scan-flows` 对业务流图谱证据、状态与置信度的要求。

评测重点：

- 业务流每段必须有事实来源与可信状态。
- GitNexus 链路只能辅助定位候选路径。
- 缺少 SQL/DDL/Mapper 证据时不得确认 DB 段。
- 初始化链路不得污染后续测试阶段的确认 E2E 输入。
