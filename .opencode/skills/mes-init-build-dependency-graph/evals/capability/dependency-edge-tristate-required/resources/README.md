# dependency-edge-tristate-required 资源说明

本用例验证 `mes-init-build-dependency-graph` 对依赖边三态与证据来源的要求。

评测重点：

- 依赖边必须区分确认、候选、未知。
- 确认边必须来自配置、代码、API、数据库等事实源。
- GitNexus/graphify 只能辅助发现候选边。
- 候选/未知边不得污染共享最终 dependency graph。
