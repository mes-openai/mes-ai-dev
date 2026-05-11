---
title: 收敛状态与消费边界规则
doc_type: state
load_strategy: explicit-only
phase_scope:
  - analyze
  - design
  - test
  - deliver
  - refresh
trigger:
  - state-convergence
  - convergence
  - global-vs-local
cost_level: medium
summary_first: false
default_allowed: false
parent_index: knowledge/rules/state/state-rendering-index.md
related_files:
  - knowledge/rules/state/state-core.md
  - knowledge/rules/state/state-trust.md
  - knowledge/rules/context-budget-baseline.md
  - knowledge/reference/rule-authority-matrix.md
---

# 收敛状态与消费边界规则

> 本文件用于判断当前任务应按全局、局部还是降级口径消费知识；仅在需要 convergence 判定时进入正文。

## 一、状态定义

### completed
- 全局共享知识已完成收敛
- 当前可作为全仓事实消费

### pending
- 初始化或刷新后待收敛
- 只能按局部或降级口径消费，不得直接产出全仓统一结论

### failed
- 收敛失败或质量校验未通过
- 禁止作为全局事实消费

### partial / local-only
- 仅部分 scope 已完成
- 只能用于已覆盖 scope 内的局部结论，不得推广为全仓统一结论

---

## 二、Must-pass 检查项

- 当前任务是否要求全局统一结论
- 当前 `state.yaml` 中的 convergence 状态是否满足任务消费要求
- 当前依赖资产是否受 refresh / dirty 影响而失去全局可信度
- 当前任务所需范围是否已被已收敛知识覆盖

---

## 三、Should-check 检查项

- 若仅局部知识可用，是否足以支撑当前任务结论
- 是否存在关键未覆盖范围、待人工确认规则或关键共享资产缺口
- 是否需要将当前任务降级为局部分析、局部设计或局部验证结论

---

## 四、Mandatory-record 记录项

- 当前收敛状态判定
- 当前消费口径：全局 / 局部 / 降级
- 当前可消费范围
- 当前禁止消费范围
- 未覆盖范围
- 风险提示
- 所依赖知识基线时间点或版本说明
