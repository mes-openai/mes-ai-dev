# 输出

## 输出
- Schema索引目录：`mes-ai-dev/knowledge/database-index/schema-xxx/`
  - `index.md` — Schema索引（含风险画像，模板参考：templates/governance/schema-index-template.md）
  - `tables.md` — 表结构详情（模板参考：templates/governance/schema-tables-template.md）
  - `relations.md` — 表关联关系（模板参考：templates/governance/schema-relations-template.md）
  - `registry-fragment.md` — Schema级注册片段，供最终收拢使用
- 全局数据库注册表：`mes-ai-dev/knowledge/dependency-graph/database-registry.md`（由最终收拢阶段统一生成）
- 模板参考：
  - `mes-ai-dev/templates/governance/schema-index-template.md`
  - `mes-ai-dev/templates/governance/schema-tables-template.md`
  - `mes-ai-dev/templates/governance/schema-relations-template.md`
- 内容格式：

说明：
- `index.md` 是所有 Schema 的标准消费入口，不得缺失
- `tables.md` 与 `relations.md` 属于深化消费对象，不要求基础建图阶段默认全量生成
- 若未生成深化文件，`index.md` 必须明确记录当前知识边界与未覆盖范围

**tables.md**：
```markdown
# Schema: mes_user
