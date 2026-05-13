---
title: 完成基线
doc_type: rule
load_strategy: phase
phase_scope:
  - develop
  - test
  - deliver
  - emergency
trigger:
  - completion
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/core/runtime-entry.md
---

# Core：完成基线

## 一、完成的最小证据
- 改代码：至少有 diagnostics 或等价验证
- 跑构建：必须有成功结果或明确的既有问题说明
- 跑测试：必须说明通过、失败或未覆盖原因

## 二、未完成的典型表现
- 只有结论，没有证据
- 已知 blocker 未记录
- 风险未暴露
- 产物未落盘

## 三、报告口径
- 完成时说明证据
- 未完成时说明阻断点、后补动作与下一步
