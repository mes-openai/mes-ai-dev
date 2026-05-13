---
title: 高风险发布场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - high-risk-release
  - release
cost_level: low
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/deliver.md
---

# 高风险发布场景规则（scenario-high-risk-release）

## 一、触发条件
- 关键发布路径
- 数据库高风险迁移
- 多仓同步发布
- 回滚成本高或不可逆
- 发布失败会造成明显业务中断

## 二、附加要求
- 必须明确 Go/No-Go 判断
- 必须明确回滚边界与观察指标
- 必须暴露剩余风险与人工干预条件
- 默认不应轻量使用 GSD

## 三、统一引用写法
“涉及关键发布路径、不可逆操作或高影响发布时，必须符合 `.opencode/references/mes-ai-reference/rules/scenarios/scenario-high-risk-release.md`。”
