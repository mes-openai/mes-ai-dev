---
title: 阶段产物与压缩标准摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - artifact-generation
  - skeleton-change
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/rules/artifact-standards.md
related_files:
  - .opencode/references/mes-ai-reference/rules/governance/stage-artifact-layout.md
---

# 阶段产物与压缩标准摘要

> 对应正文：`.opencode/references/mes-ai-reference/rules/artifact-standards.md`
> 用途：帮助判断当前任务是否需要读取正式产物与压缩标准正文。

## 一、这份文档是干什么的

本文件规范阶段产物的结构、命名、压缩方式与标准化输出要求。
它主要用于正式生成产物、整理报告、交接与归档，不属于日常执行常驻规则。

## 二、什么时候应该加载

- 正式生成阶段产物
- 整理 `mes-ai-dev/workspace/report/`、`handoff/`、审查报告等输出
- 做压缩、归档、规范化整理

## 三、什么时候不该加载

- 普通调研
- 普通代码修改
- 尚未进入正式交付或产物沉淀阶段

## 四、核心规则摘要

1. 阶段产物应放入标准目录，不得散落。
2. 产物命名应统一，正式产物要区分草稿与最终版。
3. 压缩应保留关键信息，不得把噪音一并固化。
4. handoff、review、report 等产物应具备最小完整要素。
5. 不得把聊天记录或无结构笔记直接当正式产物。

## 五、若必须进入正文，应优先读哪一部分

- 目录标准
- 命名规则
- 压缩与归档要求

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：优先读摘要，再按需进入正文局部章节
