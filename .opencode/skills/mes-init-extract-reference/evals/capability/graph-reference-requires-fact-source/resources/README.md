# graph-reference-requires-fact-source 资源说明

本用例验证 `mes-init-extract-reference` 对术语、枚举、错误码等参考知识的事实源要求。

评测重点：

- 术语、枚举、错误码必须来自代码、配置、文档或人工确认事实源。
- GitNexus 命名推断和 graphify 关系导读只能作为候选线索。
- 候选参考知识不得写入后续阶段可直接消费的确认知识。
- 输出必须包含确认、候选、未知三态与待补证说明。
