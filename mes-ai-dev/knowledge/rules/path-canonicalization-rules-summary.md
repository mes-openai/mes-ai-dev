---
title: 路径 canonical 化规则摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - canonical-path
  - path-audit
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/path-canonicalization-rules.md
---

# 路径 canonical 化规则摘要

> 对应正文：`knowledge/rules/path-canonicalization-rules.md`
> 用途：帮助判断当前任务是否命中路径命名、目录命名、片段命名与审计规则。

## 一、这份文档是干什么的

本文件定义骨架路径、目录、状态片段、知识片段与索引引用的 canonical 命名规则，用于阻断错误根目录、前缀缺失与路径漂移。

## 二、什么时候应该加载

- 当前任务涉及路径审计、初始化片段、知识片段或目录结构治理
- 需要确认服务 / 模块 / schema / fragment 的 canonical 命名规则
- 需要判断历史文档或模板中的路径是否仍符合规范

## 三、什么时候不该加载

- 普通业务逻辑问题
- 不涉及路径、目录、片段命名与索引引用的任务

## 四、核心规则摘要

1. 骨架根目录必须是 `mes-ai-dev/`。
2. 服务 / 模块 / schema / 状态片段 / 知识片段都必须遵守 canonical 命名。
3. 索引、模板、门禁和示例中的路径引用必须与实际路径一致。
4. 历史口径若保留旧路径，必须显式标注边界。

## 五、若必须进入正文，应优先读哪一部分

- 根目录规则
- 目录命名 canonical 规则
- 状态片段 / 知识片段规则
- 自动检查清单

## 六、成本提示

- 成本等级：high
- 默认策略：`explicit-only`
- 建议：优先读摘要，根据当前对象类型再进入对应章节
