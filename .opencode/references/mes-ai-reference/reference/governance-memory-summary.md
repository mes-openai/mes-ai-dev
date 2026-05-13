---
title: 治理经验记忆库摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - governance-memory
  - skeleton-review
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/governance-memory.md
---

# 治理经验记忆库摘要

> 对应正文：`.opencode/references/mes-ai-reference/reference/governance-memory.md`
> 用途：帮助判断当前问题是否需要回查已固化的治理经验，而不是直接重读整份记忆库。

## 一、这份文档是干什么的

本文件用于沉淀骨架治理过程中已经确认的问题、根因、补救动作与防复发规则，服务于骨架修改、正式审查、全局复盘和治理类问题排查。

## 二、什么时候应该加载

- 骨架修改正式审查后需要回查同类治理问题
- 发现规则失联、入口漏同步、模板漂移、状态迁移遗漏等可复发问题
- 需要判断某类治理问题是否已经有正式经验条目

## 三、什么时候不该加载

- 普通业务需求执行
- 单次偶发且不具备复发价值的问题
- 未形成正式证据链的猜测性问题

## 四、核心规则摘要

1. 本文件只记录已确认的治理经验，不记录猜测。
2. 每条经验都应可追溯到正式规则、日志或审查结果。
3. 若某类问题已固化为正式规则，应优先回到正式规则执行。
4. 治理经验记忆库是补充层，不替代主规则、门禁和模板。

## 五、若必须进入正文，应优先读哪一部分

- 与当前问题最相关的记忆条目
- 维护要求
- 对应的正式落点与证据路径

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：先根据当前问题筛选是否已有同类条目，再局部读取正文
