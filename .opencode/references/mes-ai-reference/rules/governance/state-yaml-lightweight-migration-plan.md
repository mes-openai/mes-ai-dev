---
title: state.yaml 轻量化迁移方案
load_strategy: explicit-only
cost_level: medium
summary_first: false
default_allowed: false
related_files:
  - mes-ai-dev/knowledge/state/state.yaml
  - .opencode/references/mes-ai-reference/rules/state/state-core.md
  - .opencode/references/mes-ai-reference/rules/state/state-init-fragments.md
  - .opencode/references/mes-ai-reference/rules/state/state-convergence.md
  - .opencode/references/mes-ai-reference/rules/state/state-trust.md
  - .opencode/references/mes-ai-reference/rules/context-budget-baseline.md
  - .opencode/references/mes-ai-reference/reference/rule-authority-matrix.md
---

# state.yaml 轻量化迁移方案

## 1. 文档目的

本文档用于定义 `mes-ai-dev/knowledge/state/state.yaml` 的轻量化迁移目标、目标结构、字段迁移边界、兼容策略、受影响文件与分阶段实施计划。

本方案聚焦**状态模型轻量化设计**，当前阶段仅输出迁移方案，不直接修改 `state.yaml` 主状态模型。

---

## 2. 背景

当前 `mes-ai-dev/knowledge/state/state.yaml` 同时承担以下职责：

- 唯一已合并机器事实源
- 运行时高频判断入口
- 初始化覆盖状态容器
- 最近执行过程快照
- 收敛状态与片段待收口记录
- sync 状态明细
- checkpoint 断点信息
- 兼容说明的承载位置

这种结构虽然保证了“信息集中”，但也使 `state.yaml` 同时具备：

1. 高频判断字段
2. 长列表与过程台账
3. 低频明细字段
4. 可索引化的结构化细节

从上下文预算与运行时轻量消费角度看，当前主状态文件已经接近“主状态模型 + 过程台账 + 兼容说明合集”的混合体，存在进一步轻量化空间。

---

## 3. 目标

## 3.1 总体目标

在不破坏“`state.yaml` 是唯一已合并机器事实源”这一前提下，将主状态文件收敛为：

- 运行时快读入口
- 最小事实判断入口
- 细节状态文件的统一索引入口

并将低频、过程型、长列表与收口批次细节迁出到 `state-detail/` 目录。

## 3.2 定性目标

- 主状态文件更轻
- 运行时高频消费更稳定
- 状态模型职责更清晰
- 状态细节支持按需下钻
- 兼容迁移过程可控

---

## 4. 设计原则

### 4.1 不改变主事实源地位
`state.yaml` 仍然是唯一已合并机器事实源。轻量化是“迁出低频细节”，不是“拆散主状态模型”。

### 4.2 主文件只保留高频判断字段
主文件优先保留：
- 仓规模
- trust
- convergence 摘要
- sync 摘要
- 最小元信息

### 4.3 细节迁出到 `state-detail/`
过程快照、长列表、收口明细、覆盖明细、断点信息等迁出到 detail 文件。

### 4.4 先规则、后迁移、再收紧
迁移必须按以下顺序推进：
1. 先更新规则和消费边界
2. 再双写兼容
3. 再切换消费者
4. 最后收紧主文件

### 4.5 不在本轮直接变更 `state.yaml`
由于主状态模型变更属于高风险改动，本轮只落设计文档与实施方案，不直接修改主状态文件。

---

## 5. 目标结构

## 5.1 目标目录结构

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

## 5.2 文件角色

### `state.yaml`
角色：
- 运行时快读入口
- 最小事实判断入口
- detail 文件索引入口

### `state-detail/coverage.yaml`
角色：
- backend/frontend/schema 覆盖率与明细状态

### `state-detail/recent-execution.yaml`
角色：
- 最近一次执行模式、pending 列表、scope summary 等过程快照

### `state-detail/convergence.yaml`
角色：
- 待收口片段、最近收敛批次、差异明细、重建文件明细

### `state-detail/sync.yaml`
角色：
- backend/frontend/database 的同步明细

### `state-detail/checkpoint.yaml`
角色：
- 断点恢复相关状态

### `state-index.md`
角色：
- 说明主文件与 detail 文件各自承载什么
- 告知何时需要下钻 detail

---

## 6. 迁移字段设计

## 6.1 保留在 `state.yaml` 的字段

### 顶层基础字段
- `schema_version`
- `state_mode`
- `last_updated`
- `last_command`

### `knowledge.trust` 最小判断字段
保留：
- `level`
- `last_refresh_time`
- `convergence_dirty`
- `convergence_dirty_reason`

可选保留：
- `last_verified_at`
- `verified_by`

迁出：
- `affected_assets`
- `affected_scopes`
- `impacted_requirements`

### `initialization.repository_scale`
建议全部保留：
- `backend_lines`
- `service_count`
- `api_count`
- `table_count`
- `scale_label`
- `scale_rules`
- `detected_at`

### `initialization.convergence` 最小判断字段
保留：
- `status`
- `last_run`
- `last_command`
- `collection_mode`
- `accepted_as_global_baseline`

建议新增摘要字段：
- `pending_fragment_count`
- `deviation_count`
- `rebuilt_shared_file_count`
- `rebuilt_hot_layer_count`

### `sync` 最小摘要
保留：
- `last_sync`
- `last_command`
- `status`

建议新增：
- `backend_status`
- `frontend_status`
- `database_status`

### `detail_paths`
建议新增：

```yaml
detail_paths:
  coverage: "mes-ai-dev/knowledge/state/state-detail/coverage.yaml"
  recent_execution: "mes-ai-dev/knowledge/state/state-detail/recent-execution.yaml"
  convergence: "mes-ai-dev/knowledge/state/state-detail/convergence.yaml"
  sync: "mes-ai-dev/knowledge/state/state-detail/sync.yaml"
  checkpoint: "mes-ai-dev/knowledge/state/state-detail/checkpoint.yaml"
```

---

## 6.2 迁出到 detail 的字段

### 迁到 `coverage.yaml`
迁出：
- `initialization.coverage.backend_services`
- `initialization.coverage.frontend_modules`
- `initialization.coverage.schemas`

主文件只保留 coverage 摘要字段。

### 迁到 `recent-execution.yaml`
迁出：
- `initialization.recent_execution.*`

主文件可仅保留：
- `mode`
- `command`
- `checkpoint_status`

### 迁到 `convergence.yaml`
迁出：
- `pending_state_fragments`
- `repo_scoped_sources`
- `pending_shared_files`
- `pending_reference_fragments`
- `pending_code_map_fragments`
- `last_converged_fragment_batch`
- `rebuilt_shared_files`
- `rebuilt_hot_layers`
- `scope_summary`
- `deviations`

### 迁到 `sync.yaml`
迁出：
- `sync.backend.*`
- `sync.frontend.*`
- `sync.database.*`

### 迁到 `checkpoint.yaml`
迁出：
- `checkpoint.*` 绝大部分字段

主文件仅保留必要摘要或 detail path。

---

## 6.3 建议缩减的说明性内容

当前 `state.yaml` 头部存在较长注释说明。

建议：
- 将长说明迁移到 `state-index.md` 或 `state-core.md`
- 主文件头部仅保留最短说明

这样可以进一步降低运行时读取噪音。

---

## 7. 字段迁移表

| 当前字段块 | 去向 | 处理方式 |
|---|---|---|
| `schema_version` / `state_mode` / `last_*` | 保留在主文件 | 原样保留 |
| `knowledge.trust.level` 等核心判断字段 | 保留在主文件 | 原样保留 |
| `knowledge.trust.affected_*` / `impacted_requirements` | 迁出到 `convergence.yaml` 或 `sync.yaml` 附近明细 | 主文件只保留摘要判断 |
| `initialization.repository_scale.*` | 保留在主文件 | 原样保留 |
| `initialization.coverage.*` | 迁出到 `coverage.yaml` | 主文件保留 coverage summary |
| `initialization.recent_execution.*` | 迁出到 `recent-execution.yaml` | 主文件保留极少量摘要或仅路径 |
| `initialization.convergence` 明细列表 | 迁出到 `convergence.yaml` | 主文件保留 status 与摘要计数 |
| `checkpoint.*` | 迁出到 `checkpoint.yaml` | 主文件保留极少量摘要或仅路径 |
| `sync.backend/frontend/database` 明细 | 迁出到 `sync.yaml` | 主文件保留全局 sync 摘要 |
| 顶部长注释 | 迁移到 `state-index.md` / `state-core.md` | 主文件保留最短说明 |

---

## 8. 兼容策略

## 8.1 双写期策略

迁移初期，建议采用双写：

1. 继续保留 `state.yaml` 中的旧字段
2. 同时生成 `state-detail/*.yaml`
3. 同时写入 `detail_paths`

这样可以保证：
- 旧消费者不立即失效
- 新消费者可开始验证 detail 模式

## 8.2 消费者切换策略

新消费者统一采用：
1. 先读 `state.yaml`
2. 若摘要不足，再读 `detail_paths` 对应文件

只有当主要消费者都完成切换后，才能删除主文件中的迁出字段。

## 8.3 不允许的迁移方式

本次迁移不得：
- 一次性删除主文件旧字段
- 在未识别消费者前直接迁出长字段
- 同时大改 state 规则、state.yaml 与 init/refresh 执行逻辑

---

## 9. 受影响文件

## 9.1 高优先级受影响文件
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- `.opencode/references/mes-ai-reference/rules/state/state-core.md`
- `.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md`
- `.opencode/references/mes-ai-reference/rules/state/state-convergence.md`
- `.opencode/references/mes-ai-reference/rules/state/state-trust.md`
- `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`

## 9.2 中优先级受影响文件
- `.opencode/references/mes-ai-reference/rules/budget-audit-rules.md`
- `.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`
- `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`

## 9.3 可能受影响的 skill / command
- init 相关 skill / command
- converge 相关 skill / command
- refresh 相关 skill / command
- budget guard
- verify-state-migration

---

## 10. 风险分析

| 风险 | 表现 | 应对 |
|---|---|---|
| 主状态模型变更属于高风险 | 直接精简主文件可能破坏全链路消费 | 先设计、再双写、后切换 |
| 初始化/收口链条断裂 | `state-init-fragments` / `convergence` 旧字段引用失效 | 优先梳理受影响文件，再迁移 |
| 隐藏消费者依赖旧字段 | 某些 command / skill / 脚本直接读取旧路径 | 迁移前做消费方盘点 |
| 双写期复杂度上升 | 主文件与 detail 同时存在 | 明确双写期边界与退出条件 |

---

## 11. 分阶段实施计划

## 11.1 阶段一：规则先行

目标：
- 先让 state 规则、消费入口与运行时入口接受“主文件 + detail 文件”的未来结构

动作：
- 更新 `knowledge-consumption/state.md`
- 视情况新增 `state-index.md`
- 在 state 规则中补 detail 结构说明

本阶段不修改 `state.yaml`。

## 11.2 阶段二：双写兼容

目标：
- 开始写入 detail 文件，但暂不删除主文件旧字段

动作：
- 新增 `state-detail/` 目录
- 写入 coverage / recent-execution / convergence / sync / checkpoint 细节文件
- 在主文件写入 `detail_paths`

## 11.3 阶段三：消费者切换

目标：
- 让主要消费者优先读主文件，再按需下钻 detail

动作：
- 改造相关规则、入口、skill / command 逻辑
- 验证旧消费者已不再依赖长字段

## 11.4 阶段四：主文件收紧

目标：
- 从 `state.yaml` 中移除已迁出的长字段

动作：
- 删除 coverage / recent_execution / convergence / sync / checkpoint 的长明细字段
- 保留摘要字段和 detail_paths

---

## 12. 验收标准

### 12.1 结构验收
- `state.yaml` 仅保留高频判断字段、摘要字段与 detail_paths
- `state-detail/` 已形成稳定的细节承载结构

### 12.2 行为验收
- 运行时默认先读 `state.yaml`
- 不足时才进入 detail 文件
- 普通阶段不再因长状态字段而增加主状态读取负担

### 12.3 兼容验收
- 主要消费者完成切换前，旧字段仍可兼容
- 无关键 command / skill 因状态字段迁移而失效

### 12.4 治理验收
- 轻量化后仍保持 `state.yaml` 为唯一已合并机器事实源
- state 规则、预算基线、主定义矩阵口径一致

---

## 13. 建议结论

建议将 `state.yaml` 轻量化视为**高风险、分阶段迁移**事项，而不是一次性重构事项。

当前最合理的下一步不是直接修改 `state.yaml`，而是：

1. 先新增 `state-index.md` 与 `state-detail/` 结构草案
2. 先更新消费入口与 state 规则的未来结构说明
3. 在完成消费者盘点后，再进入双写兼容阶段

在未完成上述前置工作前，不建议直接删除或迁出 `state.yaml` 中的现有长字段。
