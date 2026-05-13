# graph-inference-boundary 资源说明

本用例用于验证 `mes-analyze-impact-scope` 在消费 GitNexus / graphify 图谱辅助信息时的边界：图谱只能作为候选线索或关系导读，不能直接形成确认影响范围。

评测重点：

- 图谱输出必须标注为候选、推断或待验证。
- 正式影响范围必须回到知识库事实源、API registry、dependency graph、代码定义点或人工确认中验证。
- 不得因弱关联扩大到无关仓、服务、表、页面或配置。
- 影响结论必须区分确认、候选、未知，并保留待补证项。
