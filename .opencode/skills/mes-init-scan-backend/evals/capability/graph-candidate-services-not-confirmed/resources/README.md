# graph-candidate-services-not-confirmed 资源说明

本用例验证 `mes-init-scan-backend` 在使用 GitNexus 辅助识别服务候选时的事实边界。

评测重点：

- GitNexus 多服务发现只能作为候选线索。
- 确认服务必须来自当前初始化 scope 内的真实目录、`pom.xml` 与 Jalor 依赖证据。
- 单仓初始化不得越界扫描未指定服务。
- converge 前不得覆盖共享最终 `backend-overview`，只能写局部产物与待收口状态。
