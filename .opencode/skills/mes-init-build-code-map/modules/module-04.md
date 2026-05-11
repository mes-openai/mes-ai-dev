# 输入

## 输入
- 所有已生成的知识库文件：
  - `mes-ai-dev/knowledge/code-map/backend-overview.md`
  - `mes-ai-dev/knowledge/code-map/frontend-overview.md`
  - `mes-ai-dev/knowledge/code-map/services/*/index.md`
  - `mes-ai-dev/knowledge/code-map/services/*/detail.md`
  - `mes-ai-dev/knowledge/code-map/services/*/file-summaries.md`
  - `mes-ai-dev/knowledge/code-map/modules/*/index.md`
  - `mes-ai-dev/knowledge/code-map/modules/*/detail.md`
  - `mes-ai-dev/knowledge/code-map/modules/*/file-summaries.md`
  - `mes-ai-dev/knowledge/dependency-graph/*.md`
  - `mes-ai-dev/knowledge/database-index/**/*`

> **收敛模式说明**：在 `/mes-init-converge` 场景下，本 Skill 负责基于已存在的局部服务/模块结果重算全局 overview，不重新扫描业务代码仓。
