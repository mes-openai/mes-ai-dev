---
title: 状态文件索引
doc_type: index
load_strategy: index-only
phase_scope: []
trigger:
  - state-index
  - state
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/knowledge-consumption/state.md
related_files:
  - knowledge/state/state.yaml
  - knowledge/state/state-detail/
  - knowledge/rules/state/state-rendering-index.md
  - knowledge/rules/context-budget-baseline.md
  - knowledge/reference/rule-authority-matrix.md
---

# 状态文件索引

## 1. 文档目的

本文档用于说明状态文件层的未来结构与消费顺序，帮助运行时与维护者区分：

- 哪些内容属于 `state.yaml` 主状态文件
- 哪些内容属于 `state-detail/` 细节状态文件
- 何时只读主文件
- 何时需要下钻 detail

本文件是 `state.yaml` 轻量化迁移的前置导航入口，不改变 `state/state.yaml` 作为唯一已合并机器事实源的地位。

---

## 2. 目标结构

```text
mes-ai-dev/knowledge/state/
├─ state.yaml
├─ state-detail/
│  ├─ coverage.yaml
│  ├─ recent-execution.yaml
│  ├─ convergence.yaml
│  ├─ sync.yaml
│  └─ checkpoint.yaml
└─ state-index.md
```

说明：
- 当前阶段允许先引入 `state-index.md` 作为结构导航
- `state-detail/` 为未来迁移目标结构；当前已建立目录骨架与占位文件，但尚未成为正式事实源

---

## 3. 默认消费顺序

1. 先读 `state/state.yaml`，用于高频事实判断
2. 若主文件摘要不足，再按需下钻 `state-detail/*.yaml`
3. 若当前只是规则判断而非状态字段消费，优先读 `knowledge/rules/state/state-rendering-index.md`

---

## 4. 文件角色

### 4.1 `state.yaml`
角色：
- 唯一已合并机器事实源
- 运行时快读入口
- 高层状态摘要入口

### 4.2 `state-detail/*.yaml`
角色：
- 低频、长列表、过程型、明细型状态承载位置
- 仅在主文件不足以支撑判断时按需读取

当前阶段补充说明：
- 已创建占位文件，仅用于迁移落点与目录骨架
- 在正式双写兼容完成前，不得把占位文件视为正式状态事实源

### 4.3 `state-index.md`
角色：
- 导航主文件与 detail 文件结构
- 说明何时下钻 detail
- 不承载事实正文

---

## 5. 何时只读 `state.yaml`

以下场景通常只需读取主文件：

- 判断仓规模标签
- 判断 trust / dirty 状态
- 判断 convergence 是否可作为全局口径消费
- 判断 sync 是否正常
- 进行普通阶段的高层状态判断

---

## 6. 何时需要下钻 detail

以下场景才建议进入 `state-detail/`：

- 需要查看覆盖明细与 schema / service / module 层级状态
- 需要查看 recent execution 的 pending fragments / deferred 列表
- 需要查看 convergence 的批次、差异与重建明细
- 需要查看 sync 的 backend/frontend/database 细节
- 需要查看 checkpoint 断点过程信息

---

## 7. 边界说明

- 本索引不定义预算阈值；预算口径以 `mes-ai-dev/knowledge/rules/context-budget-baseline.md` 为准
- 本索引不改变主定义边界；规则主定义关系以 `mes-ai-dev/knowledge/reference/rule-authority-matrix.md` 为准
- 本索引不替代 `state.yaml`，也不替代 state 规则正文

---

## 8. 相关入口

- 状态规则索引：`mes-ai-dev/knowledge/rules/state/state-rendering-index.md`
- 状态消费分片：`mes-ai-dev/knowledge/reference/knowledge-consumption/state.md`
- 轻量化迁移方案：`mes-ai-dev/knowledge/rules/governance/state-yaml-lightweight-migration-plan.md`
