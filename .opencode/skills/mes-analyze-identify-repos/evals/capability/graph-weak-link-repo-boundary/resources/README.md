# graph-weak-link-repo-boundary 资源说明

本用例用于验证 `mes-analyze-identify-repos` 在仓库识别时不会把图谱弱关联升级为确认仓库影响范围。

评测重点：

- 仓库影响应区分确认仓、候选仓、待补证仓与未知仓。
- 确认仓必须具备 API registry、dependency graph、知识库事实源、代码定义点或人工确认支撑。
- graphify 导读只能作为关系导航，不得替代仓级责任边界。
- 不得因弱关联扩大到无关仓库、服务、表、页面或配置。
