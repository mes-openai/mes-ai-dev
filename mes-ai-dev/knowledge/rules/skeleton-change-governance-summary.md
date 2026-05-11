---
title: 骨架修改治理摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - skeleton-change
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/rules/skeleton-change-governance.md
related_files:
  - workspace/refresh/skeleton-change-log.md
---

# 骨架修改治理摘要

> 对应正文：`knowledge/rules/skeleton-change-governance.md`
> 用途：帮助判断当前任务是否需要进入骨架修改治理正文。

## 一、这份文档是干什么的

本文件用于约束骨架自身修改行为，包括规则、模板、命令、知识结构、状态规范与主入口调整。
它不面向普通业务开发任务，也不用于一般分析、设计、编码或修复。

## 二、什么时候应该加载

- 修改 `AGENTS.md`
- 修改 `knowledge/rules/`、`templates/`、骨架目录结构
- 修改状态主模型、共享收口机制或骨架加载策略

## 三、什么时候不该加载

- 普通 analyze / design / develop / test / deliver 任务
- 只改业务代码仓
- 只做方案讨论而不改骨架

## 四、核心规则摘要

1. 骨架修改必须留痕。
2. 修改骨架文件时必须同步更新 `skeleton-change-log.md`。
3. 高风险骨架修改应按 Strict 模式处理。
4. 不得只改局部文案而忽略入口、索引与下游规则影响。
5. 骨架修改完成后应补一致性检查与必要审查。

## 五、若必须进入正文，应优先读哪一部分

- 变更留痕要求
- 影响范围判定
- 高风险改动门禁

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：摘要足够时，不进入正文
