# graph-candidate-fact-boundary 资源说明

本用例用于验证 `mes-analyze-parse-requirement` 在需求解析阶段对图谱辅助信息的使用边界。

评测重点：

- GitNexus / graphify 输出只能作为候选线索、背景导航或待验证关系。
- 需求事实必须来源于原始需求、知识库事实源、代码定义点或人工确认。
- 不得把 graphify 关系导读替代正式需求解析结果。
- 验收标准必须只覆盖确认范围，并能追溯到明确来源。
