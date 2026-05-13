# graph-scope-requires-benchmark-evidence 资源说明

本用例用于回归验证 `mes-test-performance-analysis` 的性能证据边界：

- GitNexus / graphify 可用于识别候选热点、影响范围和观测链路；
- 性能结论必须依赖可复现压测、执行指标、SQL explain、样本规模和对比基线；
- 缺少真实指标时只能输出待验证项和补证清单；
- 不得把图谱复杂度直接等同于性能问题或性能测试结论。

评测时应重点检查输出是否把“候选热点”与“已验证问题”明确区分。
