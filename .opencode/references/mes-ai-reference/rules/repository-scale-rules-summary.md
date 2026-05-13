---
title: 仓库规模分级规则摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - repository-scale
  - large-repo
  - mega-repo
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/repository-scale-rules.md
---

# 仓库规模分级规则摘要

> 对应正文：`.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`
> 用途：帮助判断当前仓库是否已命中大仓 / 超大仓规则，以及应先采用哪组约束。

## 一、这份文档是干什么的

本文件定义仓库规模分级标准，以及在大仓和超大仓条件下对初始化、需求/设计/开发、知识刷新等阶段的强制约束。

## 二、什么时候应该加载

- 当前仓库规模已达到 `large` 或 `mega`
- 当前任务涉及多服务、大范围 detail 读取、全局刷新或超大仓初始化
- 需要确认是否必须分批、限量读取或优先消费 hot 层

## 三、什么时候不该加载

- 小仓或中仓的普通任务
- 未命中大仓 / 超大仓阈值时
- 只需一般规则，无需规模专项限制时

## 四、核心规则摘要

1. 大仓 / 超大仓必须优先使用热层、索引和分批策略。
2. 不允许无边界生成或读取大量 detail 正文。
3. 初始化、开发、刷新都要遵守规模上限与分批限制。
4. 仓规模标签应从统一状态源读取，而不是临时猜测。

## 五、若必须进入正文，应优先读哪一部分

- 仓规模阈值定义
- 当前命中等级对应的强制规则
- 规则检查机制

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：先根据仓规模标签确认是否命中，再局部读取正文
