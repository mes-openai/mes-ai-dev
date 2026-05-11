---
title: 知识可信度与脏化规则
doc_type: state
load_strategy: explicit-only
phase_scope:
  - refresh
  - analyze
  - design
  - test
  - deliver
trigger:
  - state-trust
  - refresh
  - knowledge-trust
cost_level: medium
summary_first: false
default_allowed: false
parent_index: knowledge/rules/state/state-rendering-index.md
related_files:
  - knowledge/rules/state/state-core.md
  - knowledge/rules/state/state-convergence.md
  - knowledge/rules/context-budget-baseline.md
  - knowledge/reference/rule-authority-matrix.md
---

# 知识可信度与脏化规则

> 本文件仅在 refresh、可信度判断、收敛脏化判断或需要确认知识消费口径时进入；普通阶段路由不应默认整份读取。

## 一、可信级别

- `trusted`：当前知识可作为全局事实消费
- `partial`：当前知识仅局部可信，只允许按局部或降级口径消费
- `dirty`：知识已受 refresh、共享资产变化或收敛失效影响，需重新确认
- `unknown`：尚未建立明确可信度，不得默认视为全局可信

---

## 二、脏化触发条件

满足任一条件，应标记 `knowledge.trust.convergence_dirty=true`，并将 `knowledge.trust.level` 至少降为 `dirty` 或 `partial`：

1. 全局共享知识文件被 `/mes-refresh-knowledge` 更新
2. `ownership.md`、`patterns.md`、`business-flows.md`、`hot-*`、reference 聚合文件发生全局变化
3. `/mes-init-converge` 未完成、失败或被中断
4. 关键共享资产缺失、失效或与当前事实源不一致

---

## 三、局部脏化与全局脏化

- 若仅影响局部 scope，应写入 `affected_scopes`，并将 `level` 置为 `partial` 或 `dirty`
- 若影响全局共享资产，应将 `level` 置为 `dirty`，并要求重新判断 convergence 是否仍可视为 completed

---

## 四、refresh 写入要求

`/mes-refresh-knowledge` 完成后必须更新：

- `knowledge.trust.last_refresh_time`
- `knowledge.trust.affected_assets`
- `knowledge.trust.affected_scopes`
- `knowledge.trust.impacted_requirements`（若可判定）
- `knowledge.trust.convergence_dirty`
- `knowledge.trust.convergence_dirty_reason`

---

## 五、渲染要求

- `baseline.md` 应显示当前知识可信级别
- `summary.md` 应显示是否存在 dirty 状态及原因
- `init-coverage.md` 在必要时应显示“覆盖完成但知识待重新确认”的说明
- 后续消费阶段优先读取 `state.yaml.knowledge.trust.*` 与 `initialization.convergence.*` 共同判断消费口径
