# 清理范围清单

## 清理范围清单

| 类型 | 目录/文件 | 清理动作 | 是否必须确认 |
|------|----------|---------|-------------|
| 知识库索引 | `knowledge/code-map/services/` | 清空 | 是 |
| 知识库索引 | `knowledge/code-map/modules/` | 清空 | 是 |
| 知识库索引 | `knowledge/code-map/*.md` | 删除 | 是 |
| 依赖图谱 | `knowledge/dependency-graph/*.md` | 删除 | 是 |
| 数据库索引 | `knowledge/database-index/` | 清空 | 是 |
| 主状态文件 | `knowledge/state/state.yaml` | 重置为初始模板 | 是 |
| 状态详情 | `knowledge/state/state-detail/*.yaml` | 清空 | 是 |
| 状态片段 | `knowledge/state/fragments/` | 清空 | 是 |
| 同步记录 | `knowledge/.sync-record.json` | 删除 | 是 |
| 初始化标记 | `knowledge/.init-checkpoint.yaml` | 删除 | 是 |
| 需求产物 | `workspace/requirements/` | 清空 | 是 |
| 设计产物 | `workspace/designs/` | 清空 | 是 |
| 开发产物 | `workspace/development/` | 清空 | 是 |
| 测试产物 | `workspace/testing/` | 清空 | 是 |
| 交付产物 | `workspace/delivery/` | 清空（保留README） | 是 |
| 紧急产物 | `workspace/emergency/` | 清空 | 是 |
| 刷新记录 | `workspace/refresh/skeleton-change-review-*.md` | 删除 | 是 |
| 变更日志 | `workspace/refresh/skeleton-change-log.md` | **保留** | 否 |
| 刷新说明 | `workspace/refresh/README.md` | **保留** | 否 |
| 示例文件 | `workspace/examples/` | **保留** | 否 |
| 状态追踪 | `workspace/status-tracker.md` | 重置为初始模板 | 是 |
| 规则目录 | `.opencode/references/mes-ai-reference/rules/` | **保留** | 否 |
| 参考目录 | `.opencode/references/mes-ai-reference/reference/` | **保留** | 否 |
| 模板目录 | `templates/` | **保留** | 否 |
