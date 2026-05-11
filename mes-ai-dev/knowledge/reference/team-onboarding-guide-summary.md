---
title: 团队接入指南摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - onboarding
  - team-guide
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/team-onboarding-guide.md
related_files:
  - knowledge/rules/core/runtime-entry.md
  - knowledge/reference/skeleton-loading-matrix.md
---

# 团队接入指南摘要

> 对应正文：`knowledge/reference/team-onboarding-guide.md`
> 用途：帮助判断当前任务是否属于团队接入或培训场景。

## 一、这份文档是干什么的

本文件面向团队 onboarding、新成员培训和框架使用讲解。
它不是日常任务执行规则。

## 二、什么时候应该加载

- 团队 onboarding
- 新成员培训
- 需要说明角色职责与协作边界

## 三、什么时候不该加载

- 普通 analyze / design / develop / test / deliver 任务
- 普通调查或修复
- 单次问题处理

## 四、核心规则摘要

1. 本文档服务于“上手理解”，不是“日常执行”。
2. 应帮助建立阶段认知、角色认知与产物认知。
3. 日常执行优先依赖 `runtime-entry.md` 与当前阶段规则。

## 五、若必须进入正文，应优先读哪一部分

- 框架流程总览
- 角色职责
- 常见接入路径

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：正常任务执行中，摘要通常已足够

## 七、相关快速入口

若需要快速确认“日常执行该读什么、预算怎么控、哪份文件是主定义”，优先查阅：

- `mes-ai-dev/knowledge/rules/core/runtime-entry.md`
- `mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md`
- `mes-ai-dev/knowledge/rules/context-budget-baseline.md`
- `mes-ai-dev/knowledge/reference/rule-authority-matrix.md`

说明：
- 本摘要负责 onboarding 场景的快速判断，不负责定义预算阈值。
- 日常执行任务时，应先回到运行时入口、加载矩阵与预算基线，而不是把 onboarding 正文当作默认执行规则。
