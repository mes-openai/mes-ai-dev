---
title: 意图门
doc_type: rule
load_strategy: phase
phase_scope:
  - analyze
  - design
trigger:
  - explain
  - investigate
  - evaluate
  - design
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/core/runtime-entry.md
  - .opencode/references/mes-ai-reference/rules/core/agent-core.md
---

# Core：意图门

## 一、只分析不实现的情形
- 用户当前只是在问原理、调查现状、评估方案、比较路线
- 用户仍在补充上下文、约束或风险
- 当前范围不清，无法安全执行

## 二、可进入实现的最小条件
1. 当前消息存在明确实现动词（实现/修改/修复/新增/重构）
2. 目标范围足够清晰
3. 不依赖尚未返回的关键结论

## 三、必须先提问的情形
- 存在关键歧义
- 存在显著工作量分歧
- 缺失关键输入、路径或错误信息
