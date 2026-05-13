---
title: 自动调优执行流程
doc_type: reference
load_strategy: explicit-only
phase_scope: []
trigger:
  - auto-optimization
  - execution-flow
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/governance/document-auto-optimization-rules.md
  - .opencode/references/mes-ai-reference/reference/document-auto-optimization-matrix.md
  - templates/governance/document-auto-optimization-audit-template.md
---

# 自动调优执行流程

> 本文件定义骨架文档自动调优从触发、检测、判定、执行到留痕的完整流程，用于约束自动化行为的边界与升级路径。

---

## 一、总体流程

```text
[开始]
   ↓
[触发自动调优]
   ↓
[收集文档基础信息]
   ↓
[识别文档类型]
   ↓
[执行体量 / 结构 / 使用风险检测]
   ↓
[是否命中阈值？]
   ├─ 否 → [输出“保持原样”结论] → [可选轻量留痕] → [结束]
   └─ 是
        ↓
   [进入判定矩阵]
        ↓
   [判断最合适动作]
        ↓
   [动作属于哪一类？]
        ├─ 低风险自动动作 → [直接落盘] → [写日志 / 审计] → [结束]
        ├─ 中风险草稿动作 → [生成草稿 / 建议] → [等待人工确认] → [写日志 / 审计] → [结束]
        └─ 高风险结构动作 → [禁止自动落盘] → [输出审计报告 + 建议方案] → [等待人工决策] → [结束]
```

---

## 二、触发入口

自动调优可以从以下入口触发：

1. 文档修改后触发
2. 定期扫描触发
3. 审查后触发
4. 手动指定触发

---

## 三、执行步骤

### 3.1 收集文档基础信息

至少收集：

- 文件路径
- 文档类型初判
- 当前行数
- 当前 token 估计
- 是否已有 front matter
- 是否已有 summary
- 是否已有头部互链
- 是否属于 index / summary / 正文
- 是否被高频入口引用

### 3.2 识别文档类型

建议按以下顺序识别：

1. 是否为 `index.md`
2. 是否为 `*-summary.md`
3. 是否位于 `.opencode/references/mes-ai-reference/rules/`
4. 是否位于 `.opencode/references/mes-ai-reference/reference/`
5. 是否位于 `templates/`
6. 是否为 `AGENTS.md` / `runtime-entry.md` / loading matrix 等特殊入口

### 3.3 动作分流

#### 低风险动作
- front matter
- 头部互链
- `summary_first`
- `index-only`
- 新增 summary
- 日志记录

#### 中风险动作
- 专题索引建议
- 分片建议
- 正文重组草稿

#### 高风险动作
- 大规模拆正文
- 大范围跨文件结构迁移
- 主入口调整

---

## 四、日志与审计

### 4.1 轻量留痕

低风险自动落盘动作至少写入：

- `mes-ai-dev/workspace/refresh/skeleton-change-log.md`

### 4.2 完整审计

若一次自动调优涉及多个文件、生成草稿但未落盘、或做了中风险建议，应使用：

- `.opencode/references/mes-ai-reference/templates/governance/document-auto-optimization-audit-template.md`

---

## 五、升级为正式骨架审查的条件

满足以下任一条件时，应升级为正式骨架修改审查：

- 改 `AGENTS.md`
- 改 `runtime-entry.md`
- 改 `skeleton-loading-matrix.md`
- 批量改主入口或主规则
- 大规模重构治理结构
