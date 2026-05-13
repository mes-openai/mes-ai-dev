# tdd-graph-path-mockito-risk-plan 资源说明

本用例用于回归验证 `mes-test-plan-cases` 在测试计划阶段提前覆盖以下风险：

- TDD 顺序必须是测试计划先行，并等待用户补充或确认；
- GitNexus / graphify 只能用于测试范围和链路导读；
- Windows / Linux 路径差异必须体现在测试点中；
- Mockito matcher 一致性、`ArgumentCaptor` / `argThat(...)`、stub 返回链初始化必须进入计划；
- 禁止万能 mock、弱断言、吞异常和删除断言制造通过。

评测时应重点检查计划是否可执行、可验收，并且不会把图谱导读误写为测试覆盖结论。
