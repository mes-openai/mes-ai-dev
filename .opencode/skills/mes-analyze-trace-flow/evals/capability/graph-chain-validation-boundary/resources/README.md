# graph-chain-validation-boundary 资源说明

本用例用于验证 `mes-analyze-trace-flow` 对图谱辅助链路的验证边界。

评测重点：

- GitNexus 调用链只能作为候选链路。
- 每段正式链路必须回到 API registry、dependency graph、配置、代码定义点或人工确认验证。
- graphify 关系导读不能替代业务链、服务链或数据链正式结论。
- 链路输出必须逐段区分确认、候选、未知与待补证。
