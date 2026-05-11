# 输出

## 输出
- `mes-ai-dev/knowledge/state/state.yaml`（主写入，统一状态源）
- `mes-ai-dev/knowledge/state/summary.md`（人工摘要）
- `mes-ai-dev/knowledge/state/state-detail/coverage.yaml`（coverage 明细）
- `mes-ai-dev/knowledge/state/state-detail/recent-execution.yaml`（recent_execution 明细）
- `mes-ai-dev/knowledge/state/state-detail/convergence.yaml`（convergence 明细）
- `mes-ai-dev/knowledge/state/state-detail/sync.yaml`（sync 明细）
- 兼容视图（以统一状态源为准，必要时按双写口径联合渲染）：
  - `mes-ai-dev/knowledge/baseline.md`
  - `mes-ai-dev/knowledge/init-coverage.md`
- **历史遗留**：`.init-checkpoint.yaml` / `.sync-record.json` 仅 mes-verify-state-migration 引用
