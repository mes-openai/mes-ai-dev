---
title: Blocker 处理指南摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - blocker
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/blocker-handling-guide.md
related_files:
  - .opencode/references/mes-ai-reference/reference/exception-handbook.md
---

# Blocker 处理指南摘要

> 对应正文：`.opencode/references/mes-ai-reference/reference/blocker-handling-guide.md`
> 用途：帮助判断当前任务是否真的已进入 blocker 场景。

## 一、这份文档是干什么的

本文件规范 blocker 的判定、分类、升级、留痕与恢复流程。
它解决的是“什么时候算阻塞、如何处理阻塞、阻塞解除后如何恢复主线”的问题。

## 二、什么时候应该加载

- 连续失败达到阈值
- 缺少关键输入导致主线无法继续
- 环境、权限、依赖、数据缺失导致停滞
- 需要正式记录 blocker 并升级处理

## 三、什么时候不该加载

- 只是预防性阅读
- 只是轻微不确定
- 主线仍可继续推进

## 四、核心规则摘要

1. blocker 必须有明确阻塞对象与阻塞原因。
2. blocker 需要分类，并区分可降级与不可降级。
3. blocker 不是“麻烦”，而是“主线无法继续”。
4. blocker 解除后要恢复主线并更新状态。

## 五、若必须进入正文，应优先读哪一部分

- blocker 判定标准
- 升级路径
- 恢复流程

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：只有真实命中 blocker 时再读正文
