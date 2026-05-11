# 输入

## 输入
- 服务级 API 片段：`mes-ai-dev/knowledge/code-map/services/*/api-registry.md`
- 服务级依赖片段：`mes-ai-dev/knowledge/code-map/services/*/service-dependencies.md`
- Schema 级注册片段：`mes-ai-dev/knowledge/database-index/schema-*/registry-fragment.md`
- 模块级映射片段：`mes-ai-dev/knowledge/code-map/modules/*/frontend-backend-map.md`
- 服务索引：`mes-ai-dev/knowledge/code-map/services/*/index.md`

> **收敛模式说明**：在 `/mes-init-converge` 场景下，本 Skill 负责根据已存在的局部 dependency / registry 结果重算全局依赖图与注册表，不重新扫描业务代码仓。
