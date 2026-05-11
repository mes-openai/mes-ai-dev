---
title: 状态迁移场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - state-migration
cost_level: low
summary_first: false
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/state/state-rendering-index.md
---

# 状态迁移场景规则（scenario-state-migration）

## 一、适用范围
- 涉及 `knowledge/state/state.yaml`
- 涉及 `knowledge/state/fragments/*.yaml`
- 涉及 `.init-checkpoint.yaml`、`.sync-record.json` 等历史遗留状态文件

## 二、基本原则
- `state.yaml` 是唯一已合并机器事实源
- fragments 只作为待收口状态，不直接作为下游事实源
- 迁移与收口必须说明来源、覆盖范围与兼容视图影响

## 三、统一引用写法
“涉及统一状态源、状态片段、兼容视图与 legacy 状态文件时，必须符合 `knowledge/rules/scenarios/scenario-state-migration.md`。”
