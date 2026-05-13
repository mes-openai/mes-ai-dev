# 输入

## 输入

- `mes-ai-dev/workspace/requirements/{REQ-ID}/spec.md` - OpenSpec 需求规格主文档
- `mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md` - 原始需求文档
- `mes-ai-dev/workspace/designs/{REQ-ID}/tech-approach.md` - 技术方案文档
- `mes-ai-dev/workspace/designs/{REQ-ID}/database-design.md` - 数据库设计文档
- `mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md` - API设计文档
- `mes-ai-dev/workspace/designs/{REQ-ID}/frontend-design.md` - 前端设计文档
- `mes-ai-dev/workspace/designs/{REQ-ID}/service-chain-design.md` - 服务调用链设计文档
- 设计文档模板，按优先级选择：用户显式提供模板 → `.opencode/references/mes-ai-reference/templates/design/custom-design-doc-template.md` → `.opencode/references/mes-ai-reference/templates/design/design-doc-template.md`
- 若使用用户内联模板或项目级自定义模板：`mes-ai-dev/workspace/designs/{REQ-ID}/template-source.md` - 模板来源、固定章节清单与回退说明
- 目录命名标准：`.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`
- **业务参考知识（建议读取）**
  - 术语表：`mes-ai-dev/knowledge/reference/terminology-glossary.md` — 设计文档使用准确的业务术语
