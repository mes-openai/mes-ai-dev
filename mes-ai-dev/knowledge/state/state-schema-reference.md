# state.yaml 字段参考

> 本文档用于解释 `mes-ai-dev/knowledge/state/state.yaml` 关键字段的语义、层级、写入时机与示例结构。
> 若字段说明与 `mes-ai-dev/knowledge/state/state.yaml` 示例、`mes-ai-dev/knowledge/rules/state/state-rendering-index.md` 及其分片冲突，以状态规则与 `mes-ai-dev/knowledge/state/state.yaml` 结构为准。

---

## 一、文档定位

| 文件 | 角色 | 用途 |
|------|------|------|
| `mes-ai-dev/knowledge/state/state.yaml` | 机器事实源 | 保存唯一已合并状态事实 |
| `mes-ai-dev/knowledge/state/state-schema-reference.md` | 字段参考 | 解释状态字段的语义、层级与示例 |
| `mes-ai-dev/knowledge/rules/state/state-rendering-index.md` | 状态规则索引 | 定义写入顺序、渲染规则与分片导航 |
| `mes-ai-dev/knowledge/state/summary.md` | 人工摘要 | 展示关键状态结论 |

---

## 二、顶层字段

| 字段 | 类型 | 含义 | 说明 |
|------|------|------|------|
| `schema_version` | string | 状态模型版本 | 用于兼容状态结构演进 |
| `state_mode` | string | 状态源模式 | 当前固定为 `primary` |
| `last_updated` | string | 最近更新时间 | ISO 时间字符串 |
| `last_command` | string | 最近写入命令 | 如 `/mes-init-project`、`/mes-init-converge` |
| `state_fragments_dir` | string | 状态片段目录 | 指向 `mes-ai-dev/knowledge/state/fragments/` |
| `merge_control` | object | 状态片段收口控制 | 管理待合并状态片段 |
| `initialization` | object | 初始化状态主模型 | 最核心字段组 |
| `checkpoint` | object | 断点续传状态 | 记录当前命令执行进度 |
| `sync` | object | 刷新同步状态 | 记录 refresh 过程状态 |

---

## 三、initialization 字段组

### 3.1 `initialization.scan`

记录初始化扫描本身的运行状态。

| 字段 | 类型 | 含义 |
|------|------|------|
| `status` | string | 扫描状态 |
| `time` | string | 扫描时间 |
| `duration` | string | 扫描耗时 |
| `code_baseline` | string | 代码基线标识 |
| `scope.repos/modules/schemas` | array | 本次扫描范围 |

### 3.2 `initialization.repository_scale`

记录仓规模事实，用于控制初始化/深化策略。

| 字段 | 类型 | 含义 |
|------|------|------|
| `backend_lines` | number | 后端代码行数 |
| `service_count` | number | 服务数量 |
| `api_count` | number | API 数量 |
| `table_count` | number | 表数量 |
| `scale_label` | string | small / medium / large / mega |
| `scale_rules` | string | 仓规模规则文件路径 |
| `detected_at` | string | 检测时间 |

### 3.3 `initialization.coverage`

记录 coverage 相关状态。在双写兼容阶段：

- `state.yaml.initialization.coverage_summary` 提供高频摘要字段
- `mes-ai-dev/knowledge/state/state-detail/coverage.yaml` 提供 backend / frontend / schema 级明细

`mes-ai-dev/knowledge/init-coverage.md` 应以统一状态源为准，并按“主文件 coverage 摘要 + `mes-ai-dev/knowledge/state/state-detail/coverage.yaml` 明细（若存在）”联合渲染。

| 字段 | 类型 | 含义 |
|------|------|------|
| `backend_services` | object | 后端服务覆盖状态 |
| `frontend_modules` | object | 前端模块覆盖状态 |
| `schemas` | object | Schema 覆盖状态 |

### 3.3.1 `schemas.<schema-name>` 推荐字段

```yaml
schemas:
  schema-mes_main:
    base_status: completed
    index_generated: true
    risk_portrait_filled: true
    risk_portrait_quality: basic
    tables_generated: false
    relations_generated: false
    enrich_status: not_started
    notes: "已完成基础画像，尚未进入表结构深化"
```

| 字段 | 类型 | 含义 |
|------|------|------|
| `base_status` | string | 基础建图状态 |
| `index_generated` | boolean | 是否已生成 `index.md`；仅表示文件存在，不代表内容达标 |
| `risk_portrait_filled` | boolean | 风险画像是否已完成最小必填内容 |
| `risk_portrait_quality` | string | 画像质量级别：`placeholder` / `basic` / `complete` |
| `tables_generated` | boolean | 是否已生成 `tables.md` |
| `relations_generated` | boolean | 是否已生成 `relations.md` |
| `enrich_status` | string | Schema 深化进度：`not_started` / `partial` / `completed` |
| `notes` | string | 缺失原因、解析限制、后续补齐建议 |

---

## 四、recent_execution 字段组

recent_execution 在双写兼容阶段采用：

- `state.yaml.initialization.recent_execution_summary` 记录最近一次初始化/深化命令的高频摘要
- `state-detail/recent-execution.yaml` 记录 pending fragments、deferred_shared_files、scope summary 等过程态明细

二者共同构成 recent_execution 的完整状态来源。

### 4.1 基础字段

| 字段 | 类型 | 含义 |
|------|------|------|
| `mode` | string | full / targeted / resume |
| `command` | string | 最近执行命令 |
| `shared_write_policy` | string | 共享文件写入策略 |
| `state_write_policy` | string | 状态写入策略 |
| `scope` | object | 本次执行范围 |
| `new_coverage` | array | 新增覆盖对象 |
| `updated_coverage` | array | 更新覆盖对象 |
| `pending_coverage` | array | 待完成覆盖对象 |
| `deferred_shared_files` | array | 延后到收拢阶段生成的共享文件 |
| `checkpoint_status` | string | 当前 checkpoint 状态 |

### 4.2 `pending_reference_fragments`

记录最近一次执行后，尚未收口的 reference/rules 片段。

```yaml
pending_reference_fragments:
  count: 2
  files:
    - mes-ai-dev/knowledge/fragments/reference/terminology/service-mes-production.md
    - mes-ai-dev/knowledge/fragments/rules/api-conventions/repo-mes-production.md
  scope_summary:
    repos: [mes-production]
    modules: []
    schemas: []
```

字段说明：

| 字段 | 类型 | 含义 |
|------|------|------|
| `count` | number | 待收口片段数量 |
| `files` | array | 待收口片段路径列表 |
| `scope_summary` | object | 片段对应的 scope 汇总 |

### 4.3 `pending_code_map_fragments`

记录最近一次执行后，尚未收口的 code-map 全局片段与热点候选片段。

```yaml
pending_code_map_fragments:
  count: 3
  files:
    - mes-ai-dev/knowledge/fragments/code-map/business-flows/service-mes-production.md
    - mes-ai-dev/knowledge/fragments/code-map/patterns/repo-mes-production.md
    - mes-ai-dev/knowledge/fragments/code-map/hot-apis/repo-mes-production.md
  scope_summary:
    repos: [mes-production]
    services: [mes-production]
    schemas: []
```

字段说明：

| 字段 | 类型 | 含义 |
|------|------|------|
| `count` | number | 待收口 code-map 片段数量 |
| `files` | array | 候选片段路径列表 |
| `scope_summary` | object | 片段对应的 repo/service/schema 汇总 |

---

## 五、convergence 字段组

`initialization.convergence` 用于记录收敛状态，是 `/mes-init-converge` 的主要写入区域。

### 5.1 基础字段

| 字段 | 类型 | 含义 |
|------|------|------|
| `status` | string | 收敛状态 |
| `last_run` | string | 最近收敛时间 |
| `last_command` | string | 最近收敛命令 |
| `collection_mode` | string | 收口模式 |
| `pending_state_fragments` | array | 待合并状态片段 |
| `repo_scoped_sources` | object | 本次收敛涉及的范围 |
| `pending_shared_files` | array | 待汇总共享文件 |
| `rebuilt_shared_files` | array | 已重建共享文件 |
| `rebuilt_hot_layers` | array | 已重算热点层 |
| `scope_summary` | object | 收敛范围摘要 |
| `deviations` | array | 与理想全仓收敛仍存在的差异 |
| `accepted_as_global_baseline` | boolean | 是否接受为全局基线 |

### 5.2 `pending_reference_fragments`

记录当前仍未完成收口的 reference/rules 片段状态。

```yaml
pending_reference_fragments:
  count: 1
  files:
    - mes-ai-dev/knowledge/fragments/reference/domain-model/service-mes-quality.md
  scope_summary:
    repos: [mes-quality]
    modules: []
    schemas: []
```

### 5.3 `pending_code_map_fragments`

记录当前仍未完成收口的 code-map 片段状态。

```yaml
pending_code_map_fragments:
  count: 2
  files:
    - mes-ai-dev/knowledge/fragments/code-map/ownership/service-mes-quality.md
    - mes-ai-dev/knowledge/fragments/code-map/hot-tables/schema-mes_main.md
  scope_summary:
    repos: [mes-quality]
    services: [mes-quality]
    schemas: [mes_main]
```

### 5.4 `last_converged_fragment_batch`

记录最近一次收口批次，便于追踪“哪些片段已经被正式吸收进共享知识文件”。

```yaml
last_converged_fragment_batch:
  batch_id: conv-20260415-001
  converged_at: 2026-04-15T16:00:00+08:00
  source_scope:
    repos: [mes-production, mes-quality]
    modules: []
    schemas: [mes_main]
    services: [mes-production, mes-quality]
  reference_fragments:
    - mes-ai-dev/knowledge/fragments/reference/terminology/service-mes-production.md
    - mes-ai-dev/knowledge/fragments/reference/domain-model/service-mes-quality.md
  code_map_fragments:
    - mes-ai-dev/knowledge/fragments/code-map/business-flows/service-mes-production.md
    - mes-ai-dev/knowledge/fragments/code-map/hot-apis/repo-mes-production.md
```

字段说明：

| 字段 | 类型 | 含义 |
|------|------|------|
| `batch_id` | string | 收口批次标识 |
| `converged_at` | string | 收口时间 |
| `source_scope` | object | 本批次涉及范围 |
| `reference_fragments` | array | 已收口的 reference/rules 片段 |
| `code_map_fragments` | array | 已收口的 code-map 片段 |

---

## 六、维护要求

1. 新增初始化状态字段时，必须同步更新：
   - `mes-ai-dev/knowledge/state/state.yaml` 示例
   - `mes-ai-dev/knowledge/rules/state/state-rendering-index.md` 及对应分片
   - `mes-ai-dev/knowledge/state/summary.md`（如需人工展示）
   - 相关命令/Skill 写入说明
2. 若字段用于阻断初始化闭环，必须同时更新：
   - `mes-ai-dev/knowledge/reference/phase-gates/index.md` 与相关分片
   - `mes-init-verify-knowledge/SKILL.md`
3. `knowledge/fragments/**/*.md` 不得直接被下游消费；相关追踪字段仅表示“待收口/已收口状态”，不替代正式共享文件。

---

## 七、阅读建议

- 想看**机器状态真实结构**：读 `mes-ai-dev/knowledge/state/state.yaml`
- 想看**字段语义和示例**：读本文件
- 想看**写入顺序/渲染规则**：读 `mes-ai-dev/knowledge/rules/state/state-rendering-index.md` 与对应分片
- 想看**人工结论摘要**：读 `mes-ai-dev/knowledge/state/summary.md`
