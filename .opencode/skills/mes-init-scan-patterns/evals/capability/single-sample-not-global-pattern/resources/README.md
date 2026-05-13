# single-sample-not-global-pattern 资源说明

本用例验证 `mes-init-scan-patterns` 对模式抽取证据数量与适用范围的要求。

评测重点：

- 单个样例只能作为候选或局部模式。
- 全局规范需多点代码证据或人工确认。
- graphify/GitNexus 发现不得直接转成 coding standard。
- 不得污染 develop 阶段的默认实现规范。
