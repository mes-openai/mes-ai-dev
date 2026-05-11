---
title: state 迁移消费者适配清单
load_strategy: explicit-only
cost_level: medium
summary_first: false
default_allowed: false
related_files:
  - mes-ai-dev/knowledge/rules/governance/state-yaml-lightweight-migration-plan.md
  - mes-ai-dev/knowledge/reference/knowledge-consumption/state.md
  - mes-ai-dev/knowledge/rules/state/state-core.md
  - mes-ai-dev/knowledge/rules/state/state-init-fragments.md
  - mes-ai-dev/knowledge/rules/state/state-convergence.md
  - mes-ai-dev/knowledge/rules/state/state-trust.md
---

# state 迁移消费者适配清单

## 1. 文档目的

本文档用于收敛 `state/state.yaml` 轻量化迁移前的消费者影响面盘点结果，明确：

- 哪些规则、skill、消费入口依赖 `state.yaml`
- 哪些依赖字段属于高风险迁移项
- 双写兼容前必须先适配哪些执行入口
- 哪些消费者可在双写期内逐步切换

本清单是进入 `state.yaml` 双写兼容前的准入依据之一。

---

## 2. 分级标准

### P0
双写前必须先适配，否则高概率断链。

### P1
双写前必须确认，改动量可能较小，但不能跳过。

### P2
可在双写期内同步跟进。

### P3
偏历史 / 说明层，可后补。

---

## 3. 正式适配清单

| 消费者 | 类型 | 依赖字段/结构 | 风险级别 | 迁移前动作 |
|---|---|---|---|---|
| `knowledge/rules/state/state-init-fragments.md` | 规则主定义 | `initialization.coverage.*`、`recent_execution.*`、`initialization.convergence.*`、阶段记忆索引字段 | P0 | 先改为“主文件摘要 + detail 明细”口径，明确哪些字段继续保留在主文件、哪些转 `state-detail/` |
| `knowledge/rules/state/state-core.md` | 规则主定义 | `state.yaml` 主事实源、兼容视图渲染、`initialization.convergence` pending 判断 | P1 | 保持主事实源口径不变，补充 `detail_paths` 与主文件摘要字段关系 |
| `knowledge/rules/state/state-trust.md` | 规则主定义 | `knowledge.trust.*`、`initialization.convergence.*` | P1 | trust 核心字段留主文件，`affected_* / impacted_requirements` 的迁出策略需写清 |
| `knowledge/rules/state/state-convergence.md` | 规则主定义 | `initialization.convergence.status`、全局/局部消费判断 | P1 | 明确只依赖 convergence 摘要字段，避免绑定明细列表 |
| `knowledge/reference/knowledge-consumption/state.md` | 消费入口 | `state.yaml`、`state-detail/*.yaml` 消费顺序 | P0 | 已接入未来结构；双写开始前补真实 detail 已激活说明 |
| `mes-init-verify-knowledge` | Skill | `initialization.coverage`、`recent_execution`、`initialization.convergence`、`sync`、兼容视图渲染 | P0 | 双写前必须先适配；改为优先读主文件摘要，不足再读 `coverage.yaml` / `recent-execution.yaml` / `convergence.yaml` / `sync.yaml` |
| `mes-refresh-detect-changes` | Skill | `state.yaml.sync`、`last_commit`、`.sync-record.json` 渲染 | P0 | 先适配 sync 双写策略；明确哪些 sync 字段留主文件，哪些迁到 `sync.yaml` |
| `mes-refresh-validate-quality` | Skill | `state.yaml.sync` 摘要状态 | P0 | 确认只依赖主文件 sync 摘要字段，不绑定迁出的 backend/frontend/database 明细 |
| `mes-guard-context-budget` | Skill | `initialization.repository_scale.scale_label`、`initialization.convergence.status`、`accepted_as_global_baseline` | P1 | 核心字段继续保留主文件；双写前做确认性适配，确保不读取迁出字段 |
| `mes-verify-phase-gate` | Skill | `initialization.convergence.status`、全仓视角门禁判断 | P1 | 确认只依赖主文件摘要字段，不绑定 convergence 明细结构 |
| `mes-analyze-impact-scope` | Skill | `state.yaml`、仓规模标签 | P2 | 确认只依赖 repository_scale，不受 coverage / recent_execution 迁移影响 |
| `mes-init-scan-hotspots` | Skill | `initialization.repository_scale.scale_label` | P2 | 无需优先适配，只需确认仓规模字段保留主文件 |
| `mes-init-extract-api` | Skill | `state.yaml` 作为服务状态与索引入口 | P2 | 确认不直接依赖 coverage 明细字段 |
| `mes-init-analyze-service` | Skill | `state.yaml` 作为服务状态入口 | P2 | 确认不读取将迁出的 coverage / recent_execution 明细 |
| `mes-init-analyze-routes` | Skill | `state.yaml` 作为前端状态入口 | P2 | 确认只读高层状态 |
| `mes-init-analyze-config` | Skill | `state.yaml` 作为服务状态入口 | P2 | 确认只读高层状态 |
| `knowledge/rules/budget-audit-rules.md` | 审计规则 | `sync.last_sync`、`sync.status` | P1 | 保持 sync 摘要留主文件，文档无需依赖 sync detail |
| `knowledge/rules/repository-scale-rules.md` | 规则 | `initialization.repository_scale.*` | P1 | 仓规模字段必须继续留主文件 |
| `knowledge/rules/core/runtime-entry.md` | 运行入口 | 高层状态判断入口 | P1 | 后续补“state 高层判断读主文件，明细按需下钻”的说明 |
| `knowledge/state/state-schema-reference.md` | 说明文档 | coverage / recent_execution / convergence 字段说明 | P2 | 双写前同步更新字段去向说明 |
| `knowledge/state/migration-checklist.md` | 迁移核查文档 | convergence、sync、checkpoint 等结构核对 | P2 | 双写阶段更新清单，接受主文件 + detail 双结构 |
| `knowledge/init-coverage.md` | 兼容视图 | `state.yaml.initialization.coverage` 渲染来源 | P1 | 明确未来是从主文件摘要还是 `coverage.yaml` 渲染 |
| `knowledge/state/summary.md` | 兼容视图 | trust / convergence / sync 摘要 | P1 | 摘要继续从主文件摘要字段渲染 |
| `knowledge/baseline.md` | 兼容视图 | 仓规模、可信度、初始化摘要 | P1 | 继续从主文件摘要字段渲染 |
| `mes-verify-state-migration` | Skill | `state.yaml`、checkpoint、sync、兼容视图一致性 | P1（专项） | 在双写期更新校验口径，让它接受主文件 + detail 并存 |
| `workspace/refresh/*` | 历史文档 | 旧字段路径说明 | P3 | 用历史口径说明处理，不阻断双写 |
| `workspace/examples/*` | 示例文档 | `state.yaml` 字段示例 | P3 | 双写稳定后再统一更新 |

---

## 4. 按字段族的高风险依赖

## 4.1 `initialization.coverage.*`

高风险消费者：
- `state-init-fragments.md`
- `mes-init-verify-knowledge`
- `init-coverage.md`
- `state-schema-reference.md`

结论：
- coverage 不能直接迁出
- 必须先决定主文件保留哪些 coverage summary 字段
- 必须先决定 `init-coverage.md` 的未来渲染路径

## 4.2 `initialization.recent_execution.*`

高风险消费者：
- `state-init-fragments.md`
- `mes-init-verify-knowledge`
- `exception-handbook.md`
- `fragment-convergence-checklist-template.md`

结论：
- recent_execution 是过程态重灾区
- 双写前不适配 `mes-init-verify-knowledge` 就不应迁移

## 4.3 `initialization.convergence.*`

高风险消费者：
- `state-init-fragments.md`
- `mes-init-verify-knowledge`
- `state-core.md`
- `mes-verify-phase-gate`
- `mes-guard-context-budget`

结论：
- `status` / `accepted_as_global_baseline` 必须继续留在主文件
- pending 列表、批次、差异等才适合迁到 `convergence.yaml`

## 4.4 `knowledge.trust.*`

高风险消费者：
- `state-trust.md`
- analyze/design/test/deliver 的状态消费判断

结论：
- `level / convergence_dirty / convergence_dirty_reason` 建议保留主文件
- `affected_assets / affected_scopes / impacted_requirements` 可迁出，但要同步规则说明

## 4.5 `sync.*`

高风险消费者：
- `mes-refresh-detect-changes`
- `mes-refresh-validate-quality`
- `budget-audit-rules.md`

结论：
- `sync.last_sync` / `sync.last_command` / `sync.status` 应继续保留主文件
- backend/frontend/database 明细才迁到 `sync.yaml`

## 4.6 `checkpoint.*`

高风险消费者：
- `mes-verify-state-migration`
- 迁移核查文档

结论：
- checkpoint 可晚于 coverage / recent_execution / convergence / sync 迁移

---

## 5. 双写前必须优先适配的执行入口

### P0：必须先适配
1. `mes-init-verify-knowledge`
2. `mes-refresh-detect-changes`
3. `mes-refresh-validate-quality`

### P1：必须先确认
4. `mes-guard-context-budget`
5. `mes-verify-phase-gate`

在这 5 个执行入口未完成适配或确认前，不建议进入 `state.yaml` 双写兼容实施。

---

## 6. 双写前准入清单

- [ ] `state-init-fragments.md` 已更新为主文件 + detail 口径
- [ ] `mes-init-verify-knowledge` 已完成适配方案
- [ ] `mes-refresh-detect-changes` 已完成适配方案
- [ ] `mes-refresh-validate-quality` 已完成适配方案
- [ ] `sync` 摘要字段保留方案已定稿
- [ ] `convergence` 摘要字段保留方案已定稿
- [ ] `coverage` 渲染路径已确定
- [ ] `mes-guard-context-budget` / `mes-verify-phase-gate` 已确认不依赖迁出字段

---

## 7. 建议结论

当前盘点结果表明，`state.yaml` 迁移进入双写前最关键的不是继续扩展目录骨架，而是先完成以下消费者适配准备：

1. `mes-init-verify-knowledge`
2. `mes-refresh-detect-changes`
3. `mes-refresh-validate-quality`
4. `mes-guard-context-budget`
5. `mes-verify-phase-gate`

因此，推荐的下一步不是直接开启双写，而是：

- 先按本清单逐项制定适配方案
- 再进入双写兼容设计细化或实施
