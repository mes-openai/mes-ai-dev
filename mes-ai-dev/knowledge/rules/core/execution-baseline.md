---
title: 执行基线
doc_type: rule
load_strategy: phase
phase_scope:
  - init
  - analyze
  - design
  - refresh
trigger:
  - execution
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/core/runtime-entry.md
---

# Core：执行基线

## 一、默认顺序
意图判定 → 阶段规则 → 场景规则 → 精准读取 → 执行 → 验证 → 收尾

## 二、Todo 使用
- 多步骤实现任务必须使用 todo 管理
- 仅实现类任务创建 todo
- 同一时间只保留一个 in_progress

## 三、写后动作
- 说明改动边界
- 执行适用验证
- 记录证据与风险
