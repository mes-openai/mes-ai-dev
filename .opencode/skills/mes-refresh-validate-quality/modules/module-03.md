# 输入依赖

## 输入依赖

| 输入项 | 路径 | 说明 |
|--------|------|------|
| backend-overview | `mes-ai-dev/knowledge/code-map/backend-overview.md` | 后端总览 |
| frontend-overview | `mes-ai-dev/knowledge/code-map/frontend-overview.md` | 前端总览 |
| service-indexes | `mes-ai-dev/knowledge/code-map/services/*/index.md` | 所有服务精简索引 |
| service-details | `mes-ai-dev/knowledge/code-map/services/*/detail.md` | 所有服务详情 |
| service-file-summaries | `mes-ai-dev/knowledge/code-map/services/*/file-summaries.md` | 所有文件摘要 |
| dependency-graph | `mes-ai-dev/knowledge/dependency-graph/service-dependencies.md` | 服务依赖图 |
| sync-state | `mes-ai-dev/knowledge/state/state.yaml`（统一状态源） | 同步状态摘要，优先读取 sync 摘要字段 |
| state-rendering-spec | `.opencode/references/mes-ai-reference/rules/state-rendering-spec.md` | 状态渲染与一致性规则 |

> 当前 Skill 在双写兼容前后都应优先作为 **sync 摘要消费者** 工作：
> 默认读取 `state.yaml.sync` 的摘要字段，不默认下钻未来的 `state-detail/sync.yaml`；
> detail 仅用于异常诊断或专项核查，不作为常规质量校验前置输入。
