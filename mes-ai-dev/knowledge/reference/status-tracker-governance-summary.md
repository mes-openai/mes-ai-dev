---
title: 状态追踪治理摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - state-tracker
  - status-update
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/status-tracker-governance.md
related_files:
  - knowledge/rules/scenarios/scenario-state-migration.md
---

# 状态追踪治理摘要

> 对应正文：`knowledge/reference/status-tracker-governance.md`
> 用途：帮助判断当前任务是否需要进入状态追踪治理正文。

## 一、这份文档是干什么的

本文件规范状态台账、阶段状态、进行中/已完成/阻塞项的维护方式。
它解决的是“状态如何保持一致、可追踪、可解释”的问题。

## 二、什么时候应该加载

- 需要维护状态台账
- 需要更新阶段状态
- 需要处理状态迁移、状态冲突或状态恢复

## 三、什么时候不该加载

- 普通直接答疑
- 不涉及状态文件更新
- 仅临时调查

## 四、核心规则摘要

1. 状态必须唯一、清晰、可追踪。
2. 状态更新要有依据，不能随意跳转。
3. 进行中、已完成、阻塞应区分明确。
4. 状态应与阶段产物、handoff、review 保持一致。

## 五、若必须进入正文，应优先读哪一部分

- 状态字段定义
- 状态更新规则
- 状态迁移规则

## 六、成本提示

- 成本等级：medium-high
- 默认策略：`explicit-only`
- 建议：仅在状态更新、校验或迁移场景进入正文
