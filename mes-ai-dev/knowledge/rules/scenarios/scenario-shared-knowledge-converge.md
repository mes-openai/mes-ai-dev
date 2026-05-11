---
title: 共享知识收口场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - shared-knowledge-converge
cost_level: low
summary_first: false
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/governance/shared-knowledge-write-policy.md
---

# 共享知识收口场景规则（scenario-shared-knowledge-converge）

## 一、适用范围
- 多次单仓初始化后统一收口
- 刷新后的共享知识更新
- 统一更新 `state.yaml`、兼容视图、全局 registry / reference / rules / code-map 汇总文件

## 二、基本原则
- 局部结果先校验再收口
- 收口前必须执行汇总消费门禁
- 未合并对象、冲突对象、pending 对象必须显式记录

## 三、统一引用写法
“涉及共享知识文件统一收口、局部结果合并与 pending 管理时，必须符合 `knowledge/rules/scenarios/scenario-shared-knowledge-converge.md`。”
