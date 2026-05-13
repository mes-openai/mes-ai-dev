---
title: 知识库新鲜度SLA与预算审计规则摘要
doc_type: summary
load_strategy: index-only
phase_scope: []
trigger:
  - budget-audit
  - freshness-audit
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/rules/budget-audit-rules.md
related_files:
  - .opencode/references/mes-ai-reference/rules/budget-audit-rules.md
  - .opencode/references/mes-ai-reference/rules/context-budget-baseline.md
---

# 知识库新鲜度SLA与预算审计规则摘要

## 1. 文档目的

本文档为《知识库新鲜度SLA与预算审计规则》的摘要版，用于快速判断：

- 当前知识库是否新鲜可用
- 当前上下文预算是否接近上限
- 何时需要压缩、分批或阻断执行

若摘要已足够支撑判断，默认不进入正文。

---

## 2. 新鲜度SLA摘要

### 2.1 核心规则
- 新增服务、删除服务：应立即刷新
- API新增/修改、包结构重构、配置变更：7天内刷新
- 仅代码逻辑修改：14天内可批量刷新

### 2.2 新鲜度评级

| 评级 | 条件 | 影响 |
|------|------|------|
| 🟢 新鲜 | `state.yaml.sync.last_sync` ≤ 7天，覆盖率≥90% | 可正常使用 |
| 🟡 需刷新 | 7-14天，或覆盖率70-90% | 建议刷新，可继续使用 |
| 🔴 过期 | >14天，或覆盖率<70% | 阻止进入需求分析阶段 |

---

## 3. 预算审计摘要

### 3.1 审计频率
- 每个 Command 执行时，由 `mes-guard-context-budget` 自动审计

### 3.2 预算状态

| 状态 | 含义 | 动作 |
|------|------|------|
| ✅ 在预算内 | 可继续执行 | 正常推进 |
| ⚠️ 接近上限 | 预算使用较高 | 建议压缩 |
| ❌ 超限 | 已超过可接受范围 | 必须压缩、分批或拆分需求 |

### 3.3 超限处理

| 超限程度 | 处理 |
|---------|------|
| 80-100% | 警告，建议压缩 |
| 100-120% | 必须压缩或分批 |
| >120% | 拒绝执行，必须拆分需求 |

---

## 4. 与预算基线的关系

本文档负责：
- 新鲜度审计
- 预算审计流程
- 预算状态分级

以下内容以 `.opencode/references/mes-ai-reference/rules/context-budget-baseline.md` 为准：

- 常驻预算
- 单阶段预算
- scenario 预算
- governance / summary 预算
- heavy 文档预算
- 超预算回退顺序的基线口径

---

## 5. 建议使用顺序

1. 先读本摘要，判断是否需要进入正文
2. 若只需判断当前状态与基本处理动作，可停在摘要
3. 若需查看完整审计细则，再进入 `.opencode/references/mes-ai-reference/rules/budget-audit-rules.md`
