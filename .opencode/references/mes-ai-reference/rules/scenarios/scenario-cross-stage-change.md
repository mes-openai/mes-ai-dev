---
title: 跨阶段变更场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - cross-stage-change
cost_level: low
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/common.md
---

# 跨阶段变更场景规则（scenario-cross-stage-change）

## 一、适用范围
- 设计后修改需求
- 开发后修改设计
- 测试后回流开发或设计
- 交付前重新打开上游阶段

## 二、基本原则
- 必须显式说明回流原因、影响范围与受影响产物
- 不得静默修改已确认结果
- 必须重新确认哪些上游产物需要重审、重测、重交接

## 三、统一引用写法
“涉及已确认阶段结果的回流修改时，必须符合 `.opencode/references/mes-ai-reference/rules/scenarios/scenario-cross-stage-change.md`。”
