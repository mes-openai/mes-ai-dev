---
title: 自动调优字段与状态模型
doc_type: reference
load_strategy: explicit-only
phase_scope: []
trigger:
  - auto-optimization
  - state-model
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/governance/document-auto-optimization-rules.md
  - .opencode/references/mes-ai-reference/reference/document-auto-optimization-flow.md
---

# 自动调优字段与状态模型

> 本文件定义骨架文档自动调优所需的字段、对象、状态与状态流转模型，用于支持检测、执行、审计和后续实现。

---

## 一、模型目标

本模型用于支持自动调优体系回答以下问题：

- 当前文档是什么类型
- 当前文档成本多高
- 为什么被判定为高风险
- 已经做过哪些调优动作
- 当前处于哪个治理状态
- 是否允许自动落盘
- 是否需要人工确认
- 是否已经留痕和复审

---

## 二、模型分层

建议拆成以下 4 层对象：

1. `DocumentProfile`
2. `OptimizationAssessment`
3. `OptimizationAction`
4. `OptimizationRun`

---

## 三、DocumentProfile

建议字段：

```yaml
document:
  id: doc_exception_handbook
  path: .opencode/references/mes-ai-reference/reference/exception-handbook.md
  title: 例外流程手册
  doc_type: reference
  role: body
  load_strategy: explicit-only
  phase_scope: []
  trigger:
    - exception
    - emergency
  cost_level: high
  summary_first: true
  default_allowed: false
  parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
  related_files:
    - .opencode/references/mes-ai-reference/reference/exception-handbook-summary.md
```

关键字段说明：

- `doc_type`：文档类型
- `role`：`entry / index / summary / body / template-body`
- `load_strategy`：加载策略
- `cost_level`：成本等级
- `summary_first`：是否先读摘要
- `default_allowed`：是否默认允许进入上下文

---

## 四、DocumentMetrics

建议字段：

```yaml
metrics:
  line_count: 226
  token_estimate: 3200
  heading_count: 18
  table_count: 2
  long_paragraph_count: 6
  long_list_count: 4
  has_front_matter: true
  has_summary_file: true
  has_summary_link: true
  has_index_parent: true
  inbound_reference_count: 5
  referenced_by_high_frequency_entry: false
  last_modified_at: 2026-04-17T18:05:00+08:00
```

---

## 五、OptimizationAssessment

建议字段：

```yaml
assessment:
  assessment_id: assess_20260417_001
  document_id: doc_exception_handbook
  assessed_at: 2026-04-17T18:00:00+08:00
  assessed_by: Sisyphus
  trigger_type: post_edit_scan
  threshold_hits:
    - line_count_over_150
    - token_over_2k
    - high_cost_without_summary
  risk_level: high
  optimization_candidate: true
  reasoning:
    - 文档为低频 reference 手册
    - 正文偏长
    - 适合先摘要后正文
  recommended_actions:
    - add_summary
    - add_summary_link
    - set_summary_first
  requires_human_confirmation: false
```

---

## 六、OptimizationAction

建议字段：

```yaml
actions:
  - action_id: act_001
    type: add_summary
    mode: auto_apply
    status: completed
    target_file: .opencode/references/mes-ai-reference/reference/exception-handbook-summary.md
    created_files:
      - .opencode/references/mes-ai-reference/reference/exception-handbook-summary.md
    modified_files: []
    requires_confirmation: false
    executed_at: 2026-04-17T18:02:00+08:00
```

推荐枚举：

- `add_front_matter`
- `update_front_matter`
- `add_summary`
- `update_summary`
- `add_summary_link`
- `set_summary_first`
- `set_index_only`
- `suggest_split`
- `suggest_topic_index`
- `compress_summary`
- `no_change`

---

## 七、OptimizationRun

建议字段：

```yaml
run:
  run_id: opt_run_20260417_001
  started_at: 2026-04-17T17:58:00+08:00
  finished_at: 2026-04-17T18:06:00+08:00
  initiated_by: manual
  overall_status: completed
  audit_report: mes-ai-dev/workspace/refresh/auto-optimization-audit-20260417-001.md
  log_updated: true
  requires_formal_review: false
```

---

## 八、状态模型

### 8.1 文档优化状态

```text
[normal]
   ↓ 检测命中阈值
[candidate]
   ↓ 判定后需处理
[planned]
   ├─ 低风险自动执行 → [optimized]
   ├─ 生成草稿 → [drafted]
   ├─ 等待人工确认 → [awaiting_confirmation]
   └─ 判定无需处理 → [accepted_as_is]
```

### 8.2 summary 相关状态

```text
[no_summary]
   ↓ 建议新增
[summary_needed]
   ↓ 生成草稿
[summary_drafted]
   ↓ 落盘
[summary_active]
   ↓ 正文变化未同步
[summary_stale]
   ↓ 更新后
[summary_active]
```

### 8.3 元信息状态

- `metadata_missing`
- `metadata_partial`
- `metadata_valid`
- `metadata_outdated`

### 8.4 互链状态

- `unlinked`
- `linked_one_way`
- `linked_bidirectional`
- `link_stale`

---

## 九、最小实现字段集

### 9.1 文档级最小字段

```yaml
path
doc_type
role
line_count
token_estimate
cost_level
has_front_matter
has_summary
has_summary_link
```

### 9.2 判定级最小字段

```yaml
risk_level
threshold_hits
recommended_actions
requires_human_confirmation
```

### 9.3 动作级最小字段

```yaml
type
mode
status
target_file
modified_files
created_files
```
