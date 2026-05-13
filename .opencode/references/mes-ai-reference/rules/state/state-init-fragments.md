---
title: 初始化片段与收口规则
doc_type: state
load_strategy: explicit-only
phase_scope:
  - init
  - refresh
trigger:
  - state-init-fragments
  - init
  - converge
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/rules/state/state-rendering-index.md
related_files:
  - .opencode/references/mes-ai-reference/rules/state/state-core.md
  - .opencode/references/mes-ai-reference/rules/state/state-convergence.md
  - .opencode/references/mes-ai-reference/rules/context-budget-baseline.md
  - .opencode/references/mes-ai-reference/reference/rule-authority-matrix.md
---

# 初始化片段与收口规则

> 本文件主要服务于初始化、收口、refresh 写入与状态片段治理场景；普通 analyze / develop / deliver 任务不应默认进入正文。

## 一、写入规则

- `/mes-init-project` → 先写 `mes-ai-dev/knowledge/state/fragments/*.yaml`，由最终收拢阶段合并到 `mes-ai-dev/knowledge/state/state.yaml` 的初始化摘要字段；若已启用双写兼容，则同步写入 `mes-ai-dev/knowledge/state/state-detail/checkpoint.yaml` 与其他对应 detail 明细
- `/mes-init-enrich` → 先写 `mes-ai-dev/knowledge/state/fragments/*.yaml`，由主控合并到 `mes-ai-dev/knowledge/state/state.yaml` 的 coverage 摘要字段，并默认同步写入 `mes-ai-dev/knowledge/state/state-detail/coverage.yaml`
- `/mes-init-converge` → 先收口 `mes-ai-dev/knowledge/fragments/**/*.md` 与 `mes-ai-dev/knowledge/state/fragments/*.yaml`，再写 `mes-ai-dev/knowledge/state/state.yaml.initialization.convergence` 摘要字段与 `global_summary`，并默认同步写入 `mes-ai-dev/knowledge/state/state-detail/convergence.yaml`
- `/mes-refresh-knowledge` → 先写 `state.yaml.sync` 摘要字段；若已启用双写兼容，则同步写入 `state-detail/sync.yaml`
- 门禁校验 → 先写 `state.yaml.global_summary.gate_*`

### 阶段记忆索引字段约束

- `state.yaml.requirements.<req-id>.<stage>.stage_memory_path`
- `state.yaml.requirements.<req-id>.<stage>.pitfall_ledger_path`
- `state.yaml.requirements.<req-id>.<stage>.decision_log_path`
- `state.yaml.requirements.<req-id>.<stage>.blocker_log_path`
- `state.yaml.requirements.<req-id>.<stage>.global_memory_extracted`

约束：

1. `state.yaml` 只保存阶段记忆路径、状态与是否已抽取全局记忆等索引信息
2. 阶段记忆正文不得直接写入 `state.yaml`

### 共享知识片段追踪字段

- 主文件摘要建议仅保留 recent_execution / convergence 的必要计数或状态
- 以下长字段在双写兼容阶段建议迁入 `state-detail/recent-execution.yaml` / `state-detail/convergence.yaml`：
  - `pending_reference_fragments`
  - `pending_code_map_fragments`
  - `pending_shared_files`
  - `last_converged_fragment_batch`

---

## 二、单仓/定向初始化规则

- 只更新本次执行范围对象
- 不得清空其他对象状态
- 只写本次执行范围的仓级产物，不直接写共享 overview/registry/hot 文件
- 必须将本次 scope 的状态写入 `mes-ai-dev/knowledge/state/fragments/<scope-type>-<scope-name>.yaml`
- 必须将待收拢的共享文件列表记录到片段中的 `pending_shared_files`
- 必须将待收口的 `mes-ai-dev/knowledge/reference/`、`mes-ai-dev/knowledge/rules/`、`mes-ai-dev/knowledge/code-map/` 片段摘要写入 recent_execution 对应状态区域，并默认同步写入 `state-detail/recent-execution.yaml`

---

## 三、canonical 路径规则

- 状态片段路径固定为：`mes-ai-dev/knowledge/state/fragments/<scope-type>-<scope-name>.yaml`
- 禁止使用命令名前缀、自由别名或错误根目录变体
- 服务、模块、Schema 的局部产物路径必须分别符合：
  - `mes-ai-dev/knowledge/code-map/services/service-<service-name>/`
  - `mes-ai-dev/knowledge/code-map/modules/module-<module-name>/`
  - `mes-ai-dev/knowledge/database-index/schema-<schema-name>/`

---

## 四、Schema 覆盖状态扩展字段

对于 Schema 级 coverage 明细，双写兼容阶段建议迁入 `state-detail/coverage.yaml`；若主文件保留 coverage 摘要，则不再默认要求在 `state.yaml` 中长期承载完整 schema 明细。

`state-detail/coverage.yaml` 中的 Schema 明细建议支持：

- `base_status`
- `index_generated`
- `risk_portrait_filled`
- `risk_portrait_quality`
- `tables_generated`
- `relations_generated`
- `enrich_status`
- `notes`

### 渲染规则

- `index_generated=true` 且 `risk_portrait_filled=true` → “画像状态”显示 `✅已填充`
- `index_generated=true` 且 `risk_portrait_quality=placeholder` → “画像状态”显示 `⚠️占位`
- `tables_generated=false` 且当前 Schema 已进入深化范围 → “tables明细”显示 `❌缺失`
- `relations_generated=false` 且当前 Schema 已进入关系深化范围 → “relations明细”显示 `❌缺失`
- 若仍存在解析限制，必须在备注中显式写出原因与建议补齐方式

---

## 五、初始化收敛规则

- `/mes-init-converge` 负责将多次单仓初始化结果收敛为全仓视角结果
- `/mes-init-project` 全仓模式也必须先生成仓级产物与待收口状态，不得直接生成最终共享文件
- `/mes-init-converge` 必须先串行合并 `mes-ai-dev/knowledge/state/fragments/*.yaml` 与 `mes-ai-dev/knowledge/fragments/**/*.md`
- 必须在 `state.yaml.initialization.convergence` 中记录最近收敛摘要状态
- 若全局收敛结果被接受为基线，必须将 `accepted_as_global_baseline` 置为 `true`
- 若收敛结果仍与一次全仓初始化存在差异，双写兼容阶段建议将差异明细写入 `state-detail/convergence.yaml`
- 未收口片段清单、最近一次收口批次、范围与时间等长字段，双写兼容阶段建议写入 `state-detail/convergence.yaml`
