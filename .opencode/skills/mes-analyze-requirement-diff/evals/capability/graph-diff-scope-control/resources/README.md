# graph-diff-scope-control 资源说明

本用例用于验证 `mes-analyze-requirement-diff` 在迭代需求分析中对图谱弱关联的范围控制。

评测重点：

- 图谱关系只能作为候选背景或待验证线索。
- 正式 diff 结论必须回到历史需求、新需求、知识库事实源、API registry、dependency graph、代码定义点或人工确认。
- 不得因弱关联扩大到无关服务、表、页面或配置。
- 验收标准必须追溯到确认差异，而不是 graphify 关系导读。
