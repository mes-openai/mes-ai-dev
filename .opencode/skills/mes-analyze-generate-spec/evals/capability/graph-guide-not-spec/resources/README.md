# graph-guide-not-spec 资源说明

本用例用于验证 `mes-analyze-generate-spec` 生成正式规格时对 graphify / GitNexus 辅助内容的边界控制。

评测重点：

- graphify 关系导读不能替代 `spec.md` 正式规格。
- GitNexus 推断不能直接写入正式需求、影响范围或验收标准。
- 正式结论必须有 exploration/proposal、知识库事实源、API registry、dependency graph、代码定义点或人工确认支撑。
- 验收标准必须只覆盖确认范围，并能被后续设计、开发、测试或交付追溯。
