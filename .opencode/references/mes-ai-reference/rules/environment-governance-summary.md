---
title: 环境治理细则摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - environment
  - deploy
  - rollback
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/environment-governance.md
---

# 环境治理细则摘要

> 对应正文：`.opencode/references/mes-ai-reference/rules/environment-governance.md`
> 用途：帮助判断当前是否命中多环境部署、配置、数据库变更或回滚治理规则。

## 一、这份文档是干什么的

本文件定义开发、测试、预发布、生产等环境的配置管理、部署顺序、数据库变更与回滚治理要求。

## 二、什么时候应该加载

- 当前任务进入部署、回滚、环境配置审查或交付边界判断
- 当前变更涉及数据库变更与环境发布联动
- 需要确认环境跳级、配置治理、回滚验证规则

## 三、什么时候不该加载

- 普通分析、设计或开发阶段
- 不涉及环境、部署或回滚时
- 只需一般交付规则时

## 四、核心规则摘要

1. 部署顺序不可跳级。
2. 不兼容数据库变更必须分阶段。
3. 每个环境部署后都必须完成对应验证。
4. 无回滚方案不得上线。

## 五、若必须进入正文，应优先读哪一部分

- 环境部署规则
- 数据库变更治理
- 环境回滚规则

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：先根据当前是否命中环境/部署/回滚场景判断，再局部读取正文
