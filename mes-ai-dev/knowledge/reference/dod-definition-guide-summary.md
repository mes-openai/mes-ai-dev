---
title: DoD 定义指南摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - dod
  - gsd
  - acceptance
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/dod-definition-guide.md
related_files:
  - knowledge/rules/core/completion-baseline.md
---

# DoD 定义指南摘要

> 对应正文：`knowledge/reference/dod-definition-guide.md`
> 用途：帮助判断当前任务是否需要进入完成定义正文。

## 一、这份文档是干什么的

本文件定义“完成”的判断口径，用于阶段退出、交付验收和结果是否达到最小完成条件的判定。

## 二、什么时候应该加载

- 用户对“完成”标准提出质疑
- 阶段退出条件不明确
- GSD 模式下需要确认 continue / exit
- 需要统一团队对 DoD 的口径

## 三、什么时候不该加载

- 普通实现中途
- 一般性代码修复
- 当前不存在验收分歧

## 四、核心规则摘要

1. DoD 关注结果达成，不是动作数量。
2. 完成必须有证据支撑，而不是主观判断。
3. 要区分“最小完成”与“增强完成”。
4. 缺少关键验证时，不应判定为完成。

## 五、若必须进入正文，应优先读哪一部分

- 完成证据要求
- 阶段退出判定
- GSD 相关退出判断

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：仅在 DoD 争议或阶段退出裁决时加载正文
