---
title: 状态规则索引
doc_type: index
load_strategy: index-only
phase_scope: []
trigger:
  - state
  - state-rules
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/state/state-core.md
  - knowledge/rules/state/state-init-fragments.md
  - knowledge/rules/state/state-convergence.md
  - knowledge/rules/state/state-trust.md
  - knowledge/rules/context-budget-baseline.md
  - knowledge/reference/rule-authority-matrix.md
---

# 状态规则索引

> 本目录用于替代原 `knowledge/rules/state-rendering-spec.md` 的单文件重型结构。
> 默认先读本索引，再按当前任务选择状态核心、初始化片段、收敛状态或知识可信度分片。

---

## 一、默认加载顺序

1. 先读 `state-core.md`，确认唯一事实源、兼容视图与禁止行为
2. 命中初始化或状态写入时，再读 `state-init-fragments.md`
3. 命中全局/局部消费边界判断时，再读 `state-convergence.md`
4. 命中 refresh、知识脏化或可信度判断时，再读 `state-trust.md`

---

## 二、分片导航

- `state-core.md`：单一事实源、渲染顺序、兼容视图边界、禁止行为
- `state-init-fragments.md`：初始化片段写入、canonical 路径、Schema 覆盖字段、收口规则
- `state-convergence.md`：收敛状态定义、可消费边界、状态记录要求
- `state-trust.md`：knowledge trust / dirty 机制、refresh 写入、渲染要求

---

## 三、兼容说明

原 `knowledge/rules/state-rendering-spec.md` 仍保留为兼容导航入口。
如需按需加载，应优先使用本目录分片，而不是整份读取旧文件。

---

## 四、相关约束说明

- 运行时入口见：`mes-ai-dev/knowledge/rules/core/runtime-entry.md`
- 阶段加载矩阵见：`mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md`
- 预算基线见：`mes-ai-dev/knowledge/rules/context-budget-baseline.md`
- 规则主定义边界见：`mes-ai-dev/knowledge/reference/rule-authority-matrix.md`

说明：
- 本索引负责状态规则导航与进入条件，不负责定义预算阈值。
- 是否进入 `state-init-fragments.md`、`state-convergence.md`、`state-trust.md` 正文，应结合当前阶段、命中场景和预算基线判断。
