---
title: 阶段记忆治理摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - stage-memory
  - handoff
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/stage-memory-governance.md
related_files:
  - spec.md
---

# 阶段记忆治理摘要

> 对应正文：`knowledge/reference/stage-memory-governance.md`
> 用途：帮助判断当前任务是否需要进入阶段记忆治理正文。

## 一、这份文档是干什么的

本文件规范阶段 memory 的写入、消费、压缩与交接。
它解决的是“阶段间如何传递真正有用的上下文，而不是噪音”的问题。

## 二、什么时候应该加载

- 需要写符合 OpenSpec 的阶段主交接文档
- 需要消费历史阶段 memory
- 需要跨阶段交接或压缩记忆内容

## 三、什么时候不该加载

- 普通编码任务
- 单轮答疑
- 不涉及阶段交接或 memory 写入时

## 四、核心规则摘要

1. memory 面向下游消费，不是过程聊天。
2. 应保留关键决策、风险、未完成项与依赖关系。
3. 应控制长度与噪音，并与阶段产物保持一致。

## 五、若必须进入正文，应优先读哪一部分

- 写入规范
- 消费规范
- 压缩规则

## 六、成本提示

- 成本等级：medium-high
- 默认策略：`explicit-only`
- 建议：优先读摘要，再按需进入正文局部章节
