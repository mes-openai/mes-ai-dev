---
title: 例外流程手册摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - exception
  - emergency
  - rollback
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/exception-handbook.md
---

# 例外流程手册摘要

> 对应正文：`.opencode/references/mes-ai-reference/reference/exception-handbook.md`
> 用途：帮助判断当前任务是否真的命中标准流程之外的例外场景。

## 一、这份文档是干什么的

本文件用于定义标准流程之外的例外处理方式，包括紧急修复、回滚后补文档、设计缺失先开发、历史脏代码区特殊处理、初始化锁冲突接管、并行任务部分失败、跳过测试的紧急上线等场景。

## 二、什么时候应该加载

- 已命中紧急修复、回滚、例外审批、锁冲突接管等特殊流程
- 当前判断无法用标准 phase / scenario 规则覆盖
- 需要查找例外审批矩阵、补偿动作或例外记录格式

## 三、什么时候不该加载

- 普通阶段执行
- 一般实现、分析、设计、测试、交付主流程
- 尚未确认是否真的属于例外场景

## 四、核心规则摘要

1. 例外场景必须说明触发条件、审批人、补偿动作与关闭状态。
2. 例外不是绕过治理，而是特殊情况下的受控治理。
3. 一旦进入例外流程，仍需补文档、补测试、补复盘或补状态更新。
4. 初始化锁冲突、收口接管和并行任务部分失败等情况必须留痕，不得口头处理。

## 五、若必须进入正文，应优先读哪一部分

- 与当前例外类型直接相关的章节
- 例外审批矩阵
- 例外记录模板

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：优先读摘要，仅在确认命中例外类型后进入正文局部章节
