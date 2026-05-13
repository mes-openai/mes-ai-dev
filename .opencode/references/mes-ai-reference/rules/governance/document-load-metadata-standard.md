---
title: 骨架文档加载元信息规范
doc_type: governance
load_strategy: explicit-only
phase_scope: []
trigger:
  - skeleton-change
  - load-metadata
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/core/runtime-entry.md
  - .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
---

# 骨架文档加载元信息规范（document-load-metadata-standard）

> 本文件定义骨架文档首部的加载元信息，用于支持运行时快速判断“是否需要加载该文档”。

## 一、适用范围

本规范适用于以下文档：

- `.opencode/references/mes-ai-reference/rules/**/*.md`
- `.opencode/references/mes-ai-reference/reference/**/*.md`
- `templates/**/*.md`
- `*-summary.md`
- 后续新增的治理、导航、模板与摘要文档

## 二、基本原则

1. 每份文档应能回答：何时加载、何时不加载、成本多大、是否应先读摘要。
2. 高成本文件不得在无触发条件时默认进入上下文。
3. 摘要文档优先于正文文档。
4. 索引入口优先于目录级展开。

## 二点五、相关治理文档

文档加载元信息规范与以下治理资产直接相关：

- 骨架上下文预算优化方案：
  `.opencode/references/mes-ai-reference/rules/governance/context-budget-optimization-plan.md`
- 骨架上下文预算基线：
  `.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`

说明：
- `load_strategy`、`cost_level`、`default_allowed`、`summary_first` 等字段，是骨架上下文预算优化的重要基础设施。
- heavy 文档、summary 文档、index 文档与 stub 文档的角色边界，应结合预算基线与规则主定义边界理解。
- 若文档角色、默认加载策略或成本分级不明确，应优先补齐 metadata，再决定是否进入运行时上下文。

## 三、标准字段

建议使用 YAML front matter：

```yaml
---
title: 需求分析阶段规则
doc_type: rule
load_strategy: phase
phase_scope: [analyze]
trigger: [analyze]
cost_level: medium
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/analyze.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md
---
```

## 四、字段定义

### 4.1 `title`
文档标题。

### 4.2 `doc_type`
可选值建议：
- `rule`
- `reference`
- `template`
- `summary`
- `index`
- `governance`
- `state`
- `guide`

### 4.3 `load_strategy`
可选值：
- `always`
- `phase`
- `scenario`
- `explicit-only`
- `index-only`

### 4.4 `phase_scope`
适用阶段列表，例如：`[analyze]`、`[develop, test, deliver]`。

### 4.5 `trigger`
触发条件数组，例如：
- `db-migration`
- `blocker`
- `high-risk-release`
- `skeleton-change`
- `stage-memory`

### 4.6 `cost_level`
成本等级：`low` / `medium` / `high`。

### 4.7 `summary_first`
是否必须先读摘要：`true` / `false`。

### 4.8 `default_allowed`
默认是否允许进入上下文：`true` / `false`。

### 4.9 `parent_index`
该文档的上级导航入口。

### 4.10 `related_files`
与当前文档联动的文件列表。

## 五、推荐组合

### 5.1 Core 轻量规则
```yaml
doc_type: rule
load_strategy: always
cost_level: low
summary_first: false
default_allowed: true
```

### 5.2 当前阶段规则
```yaml
doc_type: rule
load_strategy: phase
phase_scope: [develop]
cost_level: medium
summary_first: false
default_allowed: true
```

### 5.3 场景规则
```yaml
doc_type: rule
load_strategy: scenario
trigger: [db-migration]
cost_level: low
summary_first: false
default_allowed: false
```

### 5.4 重型治理正文
```yaml
doc_type: governance
load_strategy: explicit-only
trigger: [skeleton-change]
cost_level: high
summary_first: true
default_allowed: false
```

### 5.5 摘要文档
```yaml
doc_type: summary
load_strategy: index-only
cost_level: low
summary_first: false
default_allowed: true
```

## 六、加载判定顺序

1. 先看 `load_strategy`
2. 再看 `phase_scope`
3. 再看是否命中 `trigger`
4. 再看 `cost_level`
5. 若 `summary_first=true`，先读摘要
6. 若 `default_allowed=false` 且无触发条件，禁止加载正文

## 七、校验要求

新增或修改文档时，应校验：

- front matter 是否填写完整
- `load_strategy` 与文档用途是否一致
- 高成本文件是否设置 `summary_first: true`
- `default_allowed` 是否与成本、触发条件匹配
- 是否存在对应的 summary 或索引入口

## 七点五、与自动调优机制的关系

自动调优若涉及文档元信息补全、修正或升级，必须遵守本规范，不得自行发明字段或改变既有字段语义。

### 自动调优可修改的元信息范围

在高置信度、低风险场景下，自动调优允许补充或修正以下字段：

- `doc_type`
- `load_strategy`
- `phase_scope`
- `trigger`
- `cost_level`
- `summary_first`
- `default_allowed`
- `parent_index`
- `related_files`

### 自动调优不得违反的约束

1. 不得绕过本规范新增未注册字段
2. 不得仅凭文件变大就强行将轻量规则改为高成本正文
3. 不得将 `summary_first` 用于不适合摘要优先的轻量规则
4. 不得将索引页错误标记为正文型高成本文件
5. 不得在未留痕的情况下批量修改骨架元信息

### 自动调优后的最小要求

若自动调优已对元信息做出修改，则至少应保证：

- 字段组合与文档角色一致
- 正文与 summary / index 的关系清晰
- `load_strategy` 与实际消费边界一致
- `default_allowed` 与文档成本等级一致

自动调优的具体规则与判定见：
- `.opencode/references/mes-ai-reference/rules/governance/document-auto-optimization-rules.md`
- `.opencode/references/mes-ai-reference/reference/document-auto-optimization-matrix.md`
- `.opencode/references/mes-ai-reference/reference/document-auto-optimization-state-model.md`

## 八、例外留痕

以下情况可临时突破默认策略，但应留痕：

- 当前任务为骨架治理本身
- 当前问题无法靠索引或摘要解决
- 当前阶段确实需要正式产出模板正文
- 当前已真实命中 blocker，需要升级读取治理全文

留痕至少包括：
- 为什么需要突破
- 读取了哪些正文
- 是否先读摘要
- 是否存在更轻替代
