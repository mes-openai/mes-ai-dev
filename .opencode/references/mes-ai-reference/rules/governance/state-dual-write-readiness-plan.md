---
title: state 双写兼容实施前准入方案
load_strategy: explicit-only
cost_level: medium
summary_first: false
default_allowed: false
related_files:
  - .opencode/references/mes-ai-reference/rules/governance/state-yaml-lightweight-migration-plan.md
  - .opencode/references/mes-ai-reference/rules/governance/state-migration-consumer-adaptation-checklist.md
  - mes-ai-dev/knowledge/state/state-index.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md
  - .opencode/references/mes-ai-reference/rules/state/state-init-fragments.md
---

# state 双写兼容实施前准入方案

## 1. 文档目的

本文档用于定义 `state.yaml` 轻量化迁移进入“双写兼容实施”前的准入条件、字段边界、优先适配对象与实施顺序。

本方案的目标不是直接启动双写，而是明确：

- 哪些字段必须继续保留在主文件
- 哪些字段可以进入 `state-detail/`
- 哪些 skill / 规则已被识别为前置适配对象
- 何时才允许进入真正的双写兼容实施

---

## 2. 当前阶段定位

截至当前，state 迁移已完成以下准备工作：

1. `state.yaml` 轻量化迁移方案已落库
2. state 规则边界治理已完成
3. `state-index.md` 已建立
4. `knowledge-consumption/state.md` 已接入“主文件 + detail”未来结构
5. `state-detail/` 目录骨架与占位文件已建立
6. 规则层与 skill 层消费者适配清单已完成

因此，当前状态属于：

> **可以进入双写兼容前的准入评估，但尚不应直接改动 `state.yaml` 主状态模型。**

---

## 3. 准入目标

双写兼容实施启动前，应确保：

- 主文件保留字段集合已锁定
- `state-detail/` 承载范围已锁定
- P0 / P1 执行入口的适配方案已具备
- 兼容视图渲染来源已有清晰口径
- 不会因双写引入“主文件、detail、兼容视图”三者之间的事实冲突

---

## 4. 字段边界锁定

## 4.1 必须继续保留在主文件的字段

### 顶层元信息
- `schema_version`
- `state_mode`
- `last_updated`
- `last_command`

### 仓规模判断字段
- `initialization.repository_scale.backend_lines`
- `initialization.repository_scale.service_count`
- `initialization.repository_scale.api_count`
- `initialization.repository_scale.table_count`
- `initialization.repository_scale.scale_label`
- `initialization.repository_scale.scale_rules`
- `initialization.repository_scale.detected_at`

### convergence 摘要字段
- `initialization.convergence.status`
- `initialization.convergence.last_run`
- `initialization.convergence.last_command`
- `initialization.convergence.collection_mode`
- `initialization.convergence.accepted_as_global_baseline`

### knowledge trust 摘要字段
- `knowledge.trust.level`
- `knowledge.trust.last_refresh_time`
- `knowledge.trust.convergence_dirty`
- `knowledge.trust.convergence_dirty_reason`

### sync 摘要字段
- `sync.last_sync`
- `sync.last_command`
- `sync.status`
- `sync.backend_status`
- `sync.frontend_status`
- `sync.database_status`

### global summary / detail 索引字段
- `initialization.global_summary`
- `detail_paths`

---

## 4.2 允许进入 `state-detail/` 的字段族

### `coverage.yaml`
- `initialization.coverage.backend_services`
- `initialization.coverage.frontend_modules`
- `initialization.coverage.schemas`

### `recent-execution.yaml`
- `initialization.recent_execution.*`

### `convergence.yaml`
- `pending_state_fragments`
- `pending_shared_files`
- `pending_reference_fragments`
- `pending_code_map_fragments`
- `last_converged_fragment_batch`
- `rebuilt_shared_files`
- `rebuilt_hot_layers`
- `scope_summary`
- `deviations`

### `sync.yaml`
- `sync.backend.*`
- `sync.frontend.*`
- `sync.database.*`

### `checkpoint.yaml`
- `checkpoint.*`

---

## 5. 已识别的前置适配对象

## 5.1 P0：双写前必须先适配

1. `mes-init-verify-knowledge`
2. `mes-refresh-detect-changes`
3. `mes-refresh-validate-quality`

### 原因
- P0 skill 要么直接写未来要迁出的长字段
- 要么直接校验这些字段是否有效
- 若不先适配，双写会导致写入与校验口径错位

## 5.2 P1：双写前必须先确认

4. `mes-guard-context-budget`
5. `mes-verify-phase-gate`

### 原因
- 它们依赖的是应继续保留在主文件中的摘要字段
- 原则上不需要大改，但必须确认不依赖迁出明细

## 5.3 规则侧必须同步确认

- `.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md`
- `.opencode/references/mes-ai-reference/rules/state/state-core.md`
- `.opencode/references/mes-ai-reference/rules/state/state-trust.md`
- `.opencode/references/mes-ai-reference/rules/state/state-convergence.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`

---

## 6. 双写前准入清单

以下项目全部满足，才允许进入双写兼容实施：

- [ ] 主文件保留字段集合已锁定
- [ ] `state-detail/` 承载字段集合已锁定
- [ ] `state-index.md` 已明确 detail 非默认事实源
- [ ] `knowledge-consumption/state.md` 已接入未来结构
- [ ] `state-init-fragments.md` 已更新为主文件 + detail 口径
- [ ] `mes-init-verify-knowledge` 已形成双写兼容适配方案
- [ ] `mes-refresh-detect-changes` 已形成 sync 双写兼容适配方案
- [ ] `mes-refresh-validate-quality` 已形成 sync 摘要消费者适配方案
- [ ] `mes-guard-context-budget` 已确认只依赖主文件摘要字段
- [ ] `mes-verify-phase-gate` 已确认只依赖主文件摘要字段
- [ ] `init-coverage.md` 的未来渲染路径已明确
- [ ] `.sync-record.json` 的未来渲染路径已明确

若任一项未满足，不得启动 `state.yaml` 双写兼容实施。

---

## 7. 推荐实施顺序

## 第一阶段：规则与消费口径确认

目标：
- 锁定主文件与 detail 的字段边界
- 确认规则与消费入口口径一致

动作：
- 复核 state 规则
- 复核 `knowledge-consumption/state.md`
- 明确兼容视图未来渲染来源

## 第二阶段：P0 执行入口适配

目标：
- 让最关键的写入 / 校验 skill 具备双写兼容准备

动作：
- `mes-init-verify-knowledge`
- `mes-refresh-detect-changes`
- `mes-refresh-validate-quality`

## 第三阶段：P1 入口确认

目标：
- 确认高频运行时判断入口不依赖迁出字段

动作：
- `mes-guard-context-budget`
- `mes-verify-phase-gate`

## 第四阶段：进入双写兼容实施

目标：
- 主文件继续可用
- detail 文件开始写入
- 兼容视图不失真

动作：
- 双写主文件摘要 + detail 明细
- 校验兼容视图来源
- 记录迁移状态

---

## 8. 禁止事项

在本准入条件未满足前，禁止以下动作：

1. 直接删除 `state.yaml` 中的长字段
2. 让运行时默认依赖 `state-detail/` 占位文件
3. 在未确定渲染来源前修改 `init-coverage.md` / `.sync-record.json` 渲染逻辑
4. 同时大改 `state.yaml`、多个 skill 和兼容视图渲染逻辑

---

## 9. 建议结论

当前 state 迁移已经具备较完整的前置设计与目录骨架，但**尚未满足直接进入双写兼容实施的全部准入条件**。

最合理的下一步是：

1. 优先把 P0 skill 的适配方案转化为可执行任务
2. 锁定 `init-coverage.md` 与 `.sync-record.json` 的未来渲染来源
3. 全部完成后，再进入真正的双写兼容实施

只有在上述前置条件满足后，才建议开始对 `state.yaml` 与 `state-detail/` 做真实双写。
