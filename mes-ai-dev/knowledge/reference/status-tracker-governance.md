---
title: 状态追踪治理规范
doc_type: governance
load_strategy: explicit-only
phase_scope: []
trigger:
  - status-tracker
  - state-migration
cost_level: high
summary_first: true
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/status-tracker-governance-summary.md
  - knowledge/rules/scenarios/scenario-state-migration.md
---

# 状态追踪治理规范

> 对应摘要：`knowledge/reference/status-tracker-governance-summary.md`
> 若当前不涉及状态更新、迁移、闭环追踪或门禁联动校验，优先读取摘要并禁止默认整篇读取正文。
> 本文件定义 `workspace/status-tracker.md` 的字段含义、状态流转规则，以及与阶段门禁、步骤级门禁的联动关系。

---

## 一、定位

- `workspace/status-tracker.md` 是需求全生命周期的统一状态总表
- 结构模板：`mes-ai-dev/templates/governance/status-tracker-template.md`
- 阶段门禁 / 步骤级门禁 / 退回 / 条件闭环状态，均应在本文件中体现

---

## 二、核心字段

| 字段 | 含义 | 更新时机 |
|------|------|---------|
| 需求编号 | 唯一标识需求 | 创建需求时 |
| 状态 | 粗粒度生命周期状态 | 阶段进入/退出 |
| 当前阶段 | 当前所在阶段 | 阶段进入后 |
| 当前步骤 | 当前执行的步骤 | 步骤级门禁通过后 |
| 最近门禁结论 | 最近一次 gate 结论（✅/⚠️/❌） | 每次 gate 后 |
| 条件闭环状态 | 针对 `⚠️有条件通过` 的闭环状态 | `⚠️` 或闭环完成后 |
| 退回原因 | `❌不通过` 或退回时的结构化原因 | 退回时 |
| 备注 | 非结构化补充说明 | 需要时 |

---

## 三、状态流转规则

| 触发 | tracker 更新 |
|------|-------------|
| 阶段进入 gate = ✅ | 更新 `状态`、`当前阶段`、`最近门禁结论=✅` |
| 步骤级 gate = ✅ | 更新 `当前步骤`、`最近门禁结论=✅` |
| 步骤级 gate = ⚠️ | 更新 `当前步骤`、`最近门禁结论=⚠️`、`条件闭环状态=待闭环` |
| 条件已闭环 | 更新 `条件闭环状态=已闭环` |
| 任一 gate = ❌ | 更新 `最近门禁结论=❌`、`退回原因`；必要时回退 `状态/当前阶段/当前步骤` |
| 阶段退出 gate = ✅ | 将 `状态` 推进到下一阶段对应值 |

---

## 四、与步骤级门禁联动

1. `mes-verify-phase-gate` 执行后，必须同步更新 `status-tracker.md`
2. 若门禁为 `❌`，不得只在审查记录中体现而不更新 `status-tracker.md`
3. 若门禁为 `⚠️`，必须在 `status-tracker.md` 中显式体现 `条件闭环状态`
4. 跨阶段出口 gate 通过后，`status-tracker.md` 必须反映阶段推进结果
5. 若阶段退出依赖 `stage-output-report.md`，则 `status-tracker.md` 的阶段推进不得早于阶段完成产物报告通过门禁

### 4.1 与阶段完成产物报告联动

- 每个阶段退出前，若已生成 `stage-output-report.md`，应确保其与 `status-tracker.md` 的当前阶段、最近门禁结论、备注字段可互相追溯
- 若阶段完成产物报告判定 `❌不通过`，不得将 `status-tracker.md` 推进到下一阶段
- 若阶段完成产物报告为 `⚠️有条件通过`，`status-tracker.md` 必须同步体现条件闭环状态或在备注中保留可追溯摘要
- 若本阶段详细审查报告缺少审查时间或证据链不完整，不得将 `status-tracker.md` 推进到下一阶段

---

## 五、与步骤级门禁审查记录联动

- 强制落盘的 gate 记录文件：`step-gate-{阶段或步骤标识}.md`
- `status-tracker.md` 记录的是摘要状态
- 详细证据、打回原因、复审过程在步骤级门禁审查记录文件中保留
- 二者必须可互相追溯

### 5.1 目录放置规则

| 场景 | 落盘目录 |
|------|---------|
| 需求分析 | `workspace/requirements/REQ-YYYYMMDD-XXX/` |
| 详细设计 | `workspace/designs/REQ-YYYYMMDD-XXX/` |
| 代码开发 | `workspace/development/REQ-YYYYMMDD-XXX/` |
| 测试验证 | `workspace/testing/REQ-YYYYMMDD-XXX/` |
| 发布交付 | `workspace/delivery/REQ-YYYYMMDD-XXX/` |
| 紧急修复 | `workspace/emergency/EMG-YYYYMMDD-XXX/` |
| 知识刷新 | `workspace/refresh/` |

### 5.2 命名规则

- 标准文件名：`step-gate-{阶段或步骤标识}.md`
- 同一步骤多轮复审：`step-gate-{阶段或步骤标识}-r{轮次}.md`
- 阶段出口 gate 推荐：`step-gate-{阶段名}-exit.md`
- 阶段入口 gate 推荐：`step-gate-{阶段名}-enter.md`
- 步骤级 gate 推荐：`step-gate-{阶段名}-step-{步骤编号}.md`

说明：
- `{阶段名}` 推荐使用稳定中文或英文短标识，例如 `analyze`、`design`、`develop`、`test`、`deliver`、`refresh`、`emergency`
- `{步骤编号}` 推荐使用 `01`、`02` 等两位编号，避免同阶段多步骤文件名难以排序

### 5.3 字段映射表

| step-gate 审查记录字段 | status-tracker 字段 | 更新规则 |
|----------------------|---------------------|---------|
| 需求编号 | 需求编号 | 直接对应 |
| 阶段 | 当前阶段 | 进入/退出 gate 后同步 |
| 步骤名称 | 当前步骤 | 步骤级 gate 后同步 |
| 门禁结论 | 最近门禁结论 | 记录最近一次有效 gate 结论 |
| 5.1 条件项闭环状态 | 条件闭环状态 | `⚠️有条件通过` 时更新 |
| 5.2 打回原因 | 退回原因 | `❌不通过` 时更新 |
| 结论说明/备注 | 备注 | 必要时摘要写入 |

### 5.3.1 阶段完成产物报告映射补充

| stage-output-report 字段 | status-tracker 字段 | 更新规则 |
|-------------------------|---------------------|---------|
| 阶段名称 | 当前阶段 | 阶段退出前校对一致 |
| 阶段完成结论 | 最近门禁结论 | 仅当该报告参与阶段退出 gate 时更新 |
| 未生成产物原因摘要 | 备注 | 必要时保留阶段产物缺口摘要 |
| 整改要求与闭环计划 | 条件闭环状态 / 备注 | `⚠️有条件通过` 时同步更新 |

### 5.4 更新优先级

1. 同一步骤多轮复审时，以**最新一轮** gate 结果更新 `status-tracker.md`
2. 若上一轮为 `⚠️`、本轮闭环后为 `✅`，则：
   - `最近门禁结论` 更新为 `✅`
   - `条件闭环状态` 更新为 `已闭环`
3. 若任一轮为 `❌` 且尚未复审通过，不得将 `最近门禁结论` 回写为 `✅`

---

## 六、禁止行为

- ❌ 只更新步骤级门禁审查记录，不更新 `status-tracker.md`
- ❌ `⚠️有条件通过` 时不记录闭环状态
- ❌ `❌不通过` 时不记录退回原因
- ❌ 阶段已推进，但 `status-tracker.md` 仍停留在上一阶段

---

## 七、GSD 模式状态追踪要求

当阶段或任务进入 GSD 模式时，状态追踪必须显式记录其模式、目标、blocker、最小可交付、DoD、收尾扫描与下一步建议状态。

### 7.1 建议新增字段

| 字段 | 含义 | 说明 |
|------|------|------|
| `mode` | 当前模式 | `strict` / `gsd` |
| `current_goal` | 当前目标 | 当前阶段或任务正在推进的目标 |
| `blocker_status` | blocker 状态 | 无 blocker / 存在软阻塞 / 存在硬阻塞 / 外部依赖阻塞 |
| `blocker_count` | blocker 数量 | blocker 总数 |
| `hard_blocker_count` | 硬阻塞数量 | 硬阻塞数 |
| `minimum_deliverable_status` | 最小可交付状态 | 未形成 / 已形成 |
| `dod_status` | 完成定义状态 | 完整完成 / GSD 完成 / 不完成 |
| `completion_sweep_status` | 收尾扫描状态 | 未执行 / 已执行 / 有条件通过 |
| `next_step` | 推荐下一步 | 当前最合理的下一步 |
| `followup_actions` | 后补动作 | 当前已登记的后补动作摘要 |

### 7.2 记录要求

- 当阶段进入 GSD 模式时，必须记录 `mode=gsd`
- 当存在 blocker 时，必须记录 blocker 状态，不允许空白推进
- 当以 `GSD Continue Exit` 结论退出阶段时，必须同步记录：
  - `minimum_deliverable_status`
  - `dod_status`
  - `next_step`
  - `completion_sweep_status`

### 7.2.1 模板字段与状态字段映射

| 模板字段 | 状态字段 | 说明 |
|----------|----------|------|
| 当前模式 | `mode` | 来自 blocker / minimum deliverable / next-step 等模板 |
| 当前目标 | `current_goal` | 来自 blocker / minimum deliverable / DoD 模板 |
| 当前 blocker 状态 | `blocker_status` | 来自 blocker 模板或阶段输出中的 blocker 概述 |
| blocker 数量 | `blocker_count` | 来自 blocker 记录汇总 |
| 硬阻塞数量 | `hard_blocker_count` | 来自 blocker 记录汇总 |
| 当前最小可交付结论 | `minimum_deliverable_status` | 来自 minimum deliverable 模板结论 |
| 当前完成状态 | `dod_status` | 来自 DoD 模板结论或阶段完成状态 |
| 收尾结论 | `completion_sweep_status` | 来自 completion sweep 模板结论 |
| 推荐下一步 | `next_step` | 来自 next-step 模板或阶段输出结论 |
| 后补动作 | `followup_actions` | 来自 blocker / minimum deliverable / completion sweep 模板 |

### 7.3 禁止事项

以下状态追踪方式视为不合格：

- 已进入 GSD 模式但未记录 `mode`
- 存在 blocker 但未记录 blocker 状态
- 已以 `GSD Continue Exit` 退出但无最小可交付状态
- 已标记完成但无 DoD 状态
- 已输出结果但无下一步建议
