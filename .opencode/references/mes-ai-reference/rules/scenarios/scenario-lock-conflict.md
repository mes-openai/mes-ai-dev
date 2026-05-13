---
title: 锁冲突场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - lock-conflict
cost_level: low
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/common.md
---

# 锁冲突场景规则（scenario-lock-conflict）

## 一、适用范围
- 服务锁、模块锁、初始化锁、收口锁冲突
- 强制接管、死锁恢复、跳过策略

## 二、基本原则
- 先判断等待、跳过、接管哪种策略最小风险
- 冲突必须留痕，不得口头绕过
- 强制接管前必须明确影响范围与恢复方式

## 三、统一引用写法
“涉及服务锁、模块锁、初始化锁、收口锁冲突及强制接管时，必须符合 `.opencode/references/mes-ai-reference/rules/scenarios/scenario-lock-conflict.md`。”
