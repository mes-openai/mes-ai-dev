# 输入

## 输入
- `mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md`（核心）
- `mes-ai-dev/workspace/designs/{REQ-ID}/design.md`
- `mes-ai-dev/knowledge/code-map/frontend-overview.md`
- `mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md`
- `mes-ai-dev/knowledge/code-map/modules/module-xxx/file-summaries.md`
- `mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md`
- `web/module-xxx/src/api/` - 现有 API 文件
- `web/module-xxx/src/utils/request.js` - 请求封装
- 模板：
  - `.opencode/references/mes-ai-reference/templates/code/frontend-api-js.js`
  - `.opencode/references/mes-ai-reference/templates/code/frontend-api-ts.ts`
  - `.opencode/references/mes-ai-reference/templates/code/frontend-api-types.ts`
- **业务参考知识（必须）**
  - API规范约定：`mes-ai-dev/knowledge/rules/api-conventions.md` — 前端 API 调用路径需与后端对齐
