# e2e-chain-requires-layer-evidence 资源说明

本用例验证 `mes-init-verify-e2e-chain` 对端到端链路分层证据的要求。

评测重点：

- E2E 确认链路必须有 UI、API、Service、DB 证据。
- GitNexus/graphify 链路只能辅助定位候选路径。
- 缺层链路必须标记候选、不完整或阻断。
- 不得污染后续测试阶段确认链路。
