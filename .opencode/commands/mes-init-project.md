---
description: "初始化项目知识库，支持全仓初始化、单仓初始化与断点续传"
---
# mes-init-project

## 功能说明

初始化项目知识库，对代码仓库进行**基础建图**，先生成按仓库/模块/Schema 命名的局部产物，再按模式决定是否在末尾统一收拢共享文件。

本命令支持两种执行模式：
- **全仓初始化**：扫描全部后端服务、前端模块和数据库Schema
- **单仓初始化**：只扫描指定服务/模块/Schema，增量更新知识库，不重做全仓

本命令同时支持**断点续传**：
- 若上一次初始化中断，下次执行时自动检测 checkpoint
- 默认从未完成的 Phase 接续执行
- 用户明确选择重置时，才允许从头开始

**大仓模式适配**：
- 小仓（<10万行）：可一次性完成基础建图+深度分析
- 中仓/大仓/超大仓：只执行基础建图，深度分析移到 `/mes-init-enrich` 按需深化
- 无论仓规模如何，**初始化 + 深化全部完成后必须具备已真实填充的 `terminology-glossary.md`**；不得以“后续需求分析再补充”为默认策略

**与后续命令的关系**：
- `/mes-init-project` = 基础建图（仓级地图 + index/profile + 局部 registry 片段；全仓模式在末尾统一收拢共享文件）
- `/mes-init-enrich` = 深度补充（detail + file-summaries + patterns + ownership + hotspots刷新）
- `/mes-init-converge` = 全局收敛（将多次单仓初始化结果收敛为接近全仓初始化的全局结果）

**数据库产物边界**：
- `/mes-init-project` 对数据库默认执行**基础索引模式**：每个纳入范围的 Schema 至少生成 `database-index/schema-<schema-name>/index.md`
- `index.md` 必须包含最小风险画像，不得仅生成空壳文件或模板占位
- `tables.md` / `relations.md` 不是基础建图默认强制产物；仅在命令、步骤或执行策略显式声明数据库明细抽取时才强制生成
- 若本次未生成 `tables.md` / `relations.md`，必须在 `index.md` 中明确当前知识边界、未覆盖范围与后续补齐建议

**契约级知识边界**：
- `/mes-init-project` 现在不仅要建立仓/模块/数据库/依赖图基础知识，还必须识别统一响应、错误码、SDK 请求/响应模型、公共异常、认证/MQ/网关等**契约级知识**
- 初始化阶段关于三态规则、来源优先级、来源类型、unknown 阻断与反编译兜底的**唯一主定义**，以以下文件为准：
  - `.opencode/references/mes-ai-reference/rules/phases/phase-init.md`
  - `.opencode/references/mes-ai-reference/reference/knowledge-consumption/contracts.md`
  - `.opencode/references/mes-ai-reference/rules/scenarios/scenario-external-contract-source.md`
- 本命令只负责提醒：命中业务仓外契约定义源时，必须按主定义执行，不得自行降级为模板补洞或常识推断

**空模板阻断规则**：
- `api-conventions.md`、`error-code-registry.md` 等契约类文件若仍为空模板/占位态，不得在后续 analyze/design 阶段默认视为已知规范
- “文件存在不等于知识存在 / 占位态不可消费”的唯一主定义以 `.opencode/references/mes-ai-reference/reference/phase-gates/common.md` 为准

**共享文件写入策略**：
- 无论全仓还是单仓，Phase 1-8 都先写按仓库/模块/Schema 命名的局部产物
- 全仓模式：在命令末尾的“最终收拢阶段”统一生成 overview / registry / hot 共享文件
- 单仓/定向模式：只记录待收拢状态，不直接写共享文件；后续由 `/mes-init-converge` 汇总

**状态写入策略**：
- 初始化运行中状态不直接覆盖 `state/state.yaml`
- 每个 repo/module/schema 先写 `state/fragments/*.yaml` 状态片段（含 coverage/checkpoint/pending_shared_files）
- 全仓模式在 Phase 8A 串行合并状态片段到 `state.yaml`
- 单仓/定向模式仅保留状态片段，后续由 `/mes-init-converge` 串行合并

**hot层职责边界**：
- `/mes-init-project` 在大仓/超大仓的**全仓模式最终收拢阶段**负责首次生成 `hot-services.md` / `hot-apis.md` / `hot-tables.md`
- `/mes-init-enrich` 负责在后续深化或存量补录时 **补充/刷新** hot层

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

**图谱/TDD Skill 继承说明**：当本命令编排的 Skill 命中 GitNexus / graphify / TDD 单元测试场景时，默认继承 `.opencode/references/mes-ai-reference/rules/governance/skill-graph-tdd-consumption-standard.md`；图谱能力仅作为证据导航或导读，不替代事实证据、阶段结论或门禁判断；TDD/Mockito/路径兼容规则以该统一标准为准。

**阶段完成产物报告**：
- `/mes-init-project` 完成后必须输出一份阶段完成产物报告
- 报告必须说明：初始化标准产物、已生成文件、各文件作用、未生成文件及未生成原因
- 报告未生成或内容不达标，不得通过初始化阶段退出门禁

---

## 使用方式

```bash
/mes-init-project
/mes-init-project --services=mes-production
/mes-init-project --services=mes-production,mes-quality
/mes-init-project --modules=production-management
/mes-init-project --schemas=mes_main,mes_quality
/mes-init-project --resume
/mes-init-project --reset
```

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `--services` | 初始化单个或多个后端服务（逗号分隔） | `--services=mes-production` 或 `--services=mes-production,mes-quality` |
| `--modules` | 初始化单个或多个前端模块（逗号分隔） | `--modules=production-management` 或 `--modules=production-management,quality-center` |
| `--schemas` | 初始化单个或多个Schema（逗号分隔） | `--schemas=mes_main` 或 `--schemas=mes_main,mes_quality` |
| `--resume` | 强制从 checkpoint 接续执行 | `--resume` |
| `--reset` | 清空 checkpoint 后重头开始 | `--reset` |

> **历史兼容说明**：原参数 `--repo/--repos/--module/--schema` 已统一为 `--services/--modules/--schemas`，与 `/mes-init-enrich` 保持一致。旧参数仍可识别但建议迁移。

### 模式判定规则

| 场景 | 模式 | 行为 |
|------|------|------|
| 无筛选参数 | 全仓初始化 | 扫描全部服务/模块/Schema |
| 指定 `--services` | 单仓后端初始化 | 只处理指定服务，仅写服务级局部产物 |
| 指定 `--modules` | 单仓前端初始化 | 只处理指定模块，仅写模块级局部产物 |
| 指定 `--schemas` | 单仓数据库初始化 | 只处理指定Schema，仅写Schema级局部产物 |
| 混合指定多类筛选参数 | 定向初始化 | 只处理明确指定的后端/前端/数据库单元 |

**适用场景**：
- 项目首次导入时
- 知识库损坏需要重建时
- 代码仓结构大幅调整后
- 新增单个服务后，只做单仓补录
- 上次初始化未完成，需要从断点恢复

**前置条件**：
- 代码仓库已就位（jalor/、web/、dbscript/）
- Git仓库状态正常
- 若项目存在 SDK / common / shared / integration 等公共依赖源码仓，建议一并纳入 workspace；否则初始化只能在来源可见范围内给出候选/未知结论

**预期耗时**：
- 单仓初始化：约2-8分钟
- 小仓全量：约10-20分钟（含深度分析）
- 中仓/大仓全量：约5-15分钟（基础建图）
- 超大仓全量：约5-10分钟（仅基础建图）

---

## 初始化范围清单机制

> **完整定义与更新规则**：见 `AGENTS.md` §4.3.1「初始化模式与续传规则」与 `rules/state-rendering-spec.md`。

本命令仅强调 `mes-init-project` 的差异化要求：
- 全仓模式：先写状态片段，再在最终收拢阶段刷新 `state.yaml.initialization.coverage` 全部对象状态
- 单仓/定向模式：只写本次执行范围涉及对象的状态片段
- 断点续传：只补未完成对象，并刷新最近时间
- 「基础建图」与「深化状态」必须分开记录，不可混淆

---

## Checkpoint 断点续传机制

> **完整定义与字段规则**：见 `AGENTS.md` §4.3.1「初始化模式与续传规则」与 `rules/state-rendering-spec.md`。

本命令仅保留 `mes-init-project` 特有续传差异：
1. 默认自动检测：优先读取 `state/fragments/*.yaml` 中未合并的 checkpoint；无片段时再读取 `state.yaml.checkpoint`
2. `--resume`：强制从片段或已合并 checkpoint 接续，不重新评估已完成 Phase
3. `--reset`：删除本次 scope 对应片段后重新开始
4. 单仓模式续传：只续传该次 scope 中未完成的 repos/modules/schemas
5. Phase 内若只完成部分对象，下次只补剩余部分

> **历史遗留**：`.init-checkpoint.yaml` 已标记为历史遗留，仅 mes-verify-state-migration 专项核查时引用。

---

## 同步记录

> **完整定义与状态规则**：见 `AGENTS.md` §4.2「知识库使用规则」与 `rules/state-rendering-spec.md`。

本命令仅强调 `mes-init-project` 的初始化职责：首次初始化完成后必须写入 `state.yaml.sync`。

> **历史遗留**：`.sync-record.json` 已标记为历史遗留，仅 mes-verify-state-migration 专项核查时引用。

---

## 大仓模式判定（Phase 0 自动执行）

> **完整阈值定义与强制规则**：见 `.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`。

Phase 0 自动判定代码仓规模（优先读取 `state.yaml.initialization.repository_scale`，缺失时读取 `baseline.md` 摘要视图），并根据规模调整执行流程：

| 仓规模 | 执行策略 |
|--------|---------|
| 小仓 | 可执行 Phase 1-9 全流程（含深度分析） |
| 中仓/大仓 | Phase 1-6 基础建图，Phase 7-9 移到 `/mes-init-enrich` + **强制生成高频入口层** |
| 超大仓 | Phase 1-5 最小基础建图，Phase 6-9 全部移到 `/mes-init-enrich` + **禁止全量深化** |

---

## 存量仓特殊处理（Phase 0 检测）

Phase 0 会检测代码仓是否为存量仓（有历史提交记录），并标注：
- 存量仓模式：优先识别真实边界、风险边界、参考实现
- 新仓模式：按标准流程执行

---

## 编排流程

```
┌─────────────────────────────────────────────────────────────┐
│                    初始化项目知识库                           │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 0: 模式判定 + checkpoint 检测                         │
│  ┌─────────────┐                                             │
│  │guard-context│ ──判定全仓 / 单仓 / 定向初始化模式            │
│  │   -budget   │ ──优先读取 state/fragments/*.yaml checkpoint │
│  │             │ ──默认续传；仅在 --reset 时重置               │
│  │             │ ──判定仓规模与存量仓标签                     │
│  │             │ ──识别是否存在业务仓外契约源（SDK/common等）   │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate A: Phase 0 输出审查                               │
│  ──模式/范围/checkpoint 判定错误 → 打回 Phase 0 重做          │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: 后端扫描                                            │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──全仓模式：扫描 jalor/ 全部服务              │
│  │ -backend    │ ──单仓模式：仅确认指定 repo 是否存在          │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: 服务索引 + 仓画像生成                                │
│  ┌─────────────┐                                             │
│  │init-analyze │ ──全仓模式：生成全部 services/*/index.md     │
│  │ -service    │ ──全仓模式：生成全部 repo-profile.md         │
│  │             │ ──单仓模式：只生成执行范围内服务产物           │
│  └─────────────┘                                             │
│                                                             │
│  checkpoint 记录：                                            │
│  - 每个 repo 的完成/未完成状态                                │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3A: 配置与依赖分析                                      │
│  ┌─────────────┐                                             │
│  │init-analyze │ ──按服务生成 `services/*/service-dependencies.md` │
│  │  -config    │ ──共享 `service-dependencies.md` 延后到收拢阶段   │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3B: API提取 + 数据库索引                                │
│  ┌─────────────┐  ┌─────────────┐                            │
│  │init-extract │  │init-index   │                            │
│  │   -api      │  │ -database   │                            │
│  │ 全仓：提取全部服务级API片段 │ │ 全仓：索引全部Schema片段 │           │
│  │ 单仓：仅写执行范围局部片段 │ │ 单仓：只处理执行范围Schema │         │
│  └─────────────┘  └─────────────┘                            │
│  数据库默认输出：                                              │
│  - 每个 Schema 必须生成 `index.md`                             │
│  - `index.md` 必须完成最小风险画像                             │
│  - `tables.md` / `relations.md` 仅在显式声明明细抽取时强制生成  │
│  - 未生成明细文件时，`index.md` 必须记录未覆盖范围             │
│                                                             │
│  checkpoint 记录：                                            │
│  - 每个 schema 的完成/未完成状态                              │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate B: Phase 1-3B 输出审查                            │
│  ──服务/依赖/API/Schema 片段不完整 → 打回对应阶段重做          │
│  ──Schema `index.md` 缺少风险画像、仍为模板占位或缺少关键结论 → 打回 Phase 3B 重做 │
│  ──若已声明数据库明细抽取但 `tables.md` / `relations.md` 缺失或为空壳 → 打回 Phase 3B 重做 │
│  ──若统一响应/错误码/认证/MQ 契约缺少来源类型或把未知写成确定事实 → 打回对应阶段重做 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: 前端扫描                                            │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──全仓模式：扫描全部模块                      │
│  │ -frontend   │ ──单仓模式：只处理指定 module                │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: 路由分析 + 前后端映射                                │
│  ┌─────────────┐                                             │
│  │init-analyze │ ──按模块生成 `modules/*/frontend-backend-map.md` │
│  │  -routes    │ ──共享 `frontend-backend-map.md` 延后到收拢阶段 │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 6: 高频入口扫描（大仓/超大仓强制）                       │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──输出服务/模块/Schema 级热点候选               │
│  │ -hotspots   │ ──全局 hot 文件延后到最终收拢或 `/mes-init-converge` │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate C: Phase 4-6 输出审查                             │
│  ──模块/映射/hot 候选不可消费 → 打回对应阶段重做               │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
                     ⚠️ 仓规模分支判定
                    ┌──────────────────┐
                    │ 小仓？           │ → Phase 7-8
                    │ 中仓/大仓？      │ → 提示执行 `/mes-init-enrich`
                    │ 超大仓？         │ → 强制执行 `/mes-init-enrich`
                    └──────────────────┘
                               │
               ┌───────────────┴───────────────┐
               │ 小仓继续Phase 7-8：             │
               ▼                               │
┌─────────────────────────────────────────────────────────────┐
│  Phase 7: 小仓专用深化                                        │
│  ┌─────────────┐                                             │
│  │init-build   │ ──生成 detail.md / file-summaries.md        │
│  │ -code-map   │ ──只在小仓全量模式执行                        │
│  └─────────────┘                                             │
│                                                             │
│  单仓模式：                                                  │
│  - 只深化执行范围内对象                                        │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 8: 参考知识提取（小仓直接执行）                            │
│  ┌─────────────┐                                             │
│  │init-extract │ ──生成 terminology/domain/data-dictionary   │
│  │ -reference  │ ──小仓：在本命令直接执行                       │
│  │             │ ──中/大/超大仓：转由 `/mes-init-enrich` 强制补齐   │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 8A: 最终收拢（仅全仓模式）                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │init-build   │  │init-build   │  │init-scan    │          │
│  │ -code-map   │  │-dependency   │  │ -hotspots   │          │
│  │ 重算总览     │  │ 重算共享注册表 │ │ 汇总全局hot层 │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  同步动作：                                                  │
│  - 串行合并 `state/fragments/*.yaml` 到 `state.yaml`         │
│  单仓/定向模式：                                               │
│  - 跳过本阶段，仅记录待 `/mes-init-converge` 收拢                   │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate D: Phase 7-8A 输出审查                            │
│  ──小仓参考知识/最终收拢未通过 → 打回对应阶段重做               │
│  ──中/大/超大仓若未明确登记 terminology-glossary 待由 `/mes-init-enrich` 生成 → 不得标记初始化闭环 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 9: 完整性与基线校验                                    │
│  ┌─────────────┐                                             │
│  │init-verify  │ ──全仓模式：校验全仓覆盖率                    │
│  │ -knowledge  │ ──单仓模式：校验本次执行范围产物完整         │
│  │             │ ──写入 state.yaml（主写入路径）               │
│  │             │ ──渲染兼容视图：baseline.md / init-coverage.md │
│  └─────────────┘                                             │
│  > 历史遗留：.init-checkpoint.yaml / .sync-record.json 仅专项核查时引用 │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                          ✅ 初始化完成
```

---

## 多Agent职责与汇总规则

| Phase | 主负责Agent | 协同方式 | 汇总规则 |
|------|-------------|---------|---------|
| Phase 0 | `mes-sisyphus` | 串行 | 负责模式判定、checkpoint 检测、仓规模判断 |
| Phase 1-5 | `mes-service-analyzer` | 可分批并行 | 各Agent只写局部结果文件，不直接写共享知识文件 |
| Phase 6 | `mes-knowledge-refresh` | 可并行统计 | 只输出热点局部结果，由主控汇总写 hot 文件 |
| Phase 7-9（含 8A） | `mes-sisyphus` | 串行 | 负责局部产物完整性校验、coverage/checkpoint 状态更新，并明确待 `/mes-init-converge` 汇总项 |

### 共享知识文件串行更新

> **完整规则与禁止列表**：见 `AGENTS.md` §10.3「共享知识文件更新规则」。

初始化阶段各 Agent 只允许写局部产物、状态片段与知识片段；共享文件统一由 `/mes-init-converge` 汇总写入。违反协同规则时必须回滚并改为局部落盘 + 收口汇总。

### 局部成功 / 局部失败处理

> **完整规则**：见 `AGENTS.md` §10.3「局部成功保留」「局部失败续传」。

关键要点：
- 成功结果必须保留，不回滚
- 失败对象写入 checkpoint 的 pending 列表，下次只续传 pending 对象
- 交接文件缺少「结论 / 风险 / 下一步 / 证据路径」任一节，视为该批次失败

### 锁与暂停策略（开发相关阶段衔接）

- 初始化阶段原则上不创建开发锁；若与开发阶段衔接且需生成可被开发直接消费的中间结果，由主控 Agent 记录冲突摘要，不提前抢占开发锁
- 若 checkpoint 状态为 `paused`，续传时优先检查是否存在后续开发锁冲突，再决定继续/等待/升级

### 初始化阶段锁策略

- Phase 0 必须检查并获取本次 scope 对应的初始化锁：`init-repo-*.lock` / `init-module-*.lock` / `init-schema-*.lock`
- 未获取锁前，不得写局部产物、状态片段或知识片段
- 发生锁冲突时，只允许：等待 / 强制获取 / 跳过当前冲突 scope / 仅执行不冲突 scope
- 锁冲突不得降级为“继续写局部产物试试看”
- 本命令结束后必须释放本次获取的初始化锁；异常退出按 `exception-handbook.md` 处理

### 路径与命名规范

- 后端服务目录必须为：`knowledge/code-map/services/service-<service-name>/`
- 前端模块目录必须为：`knowledge/code-map/modules/module-<module-name>/`
- Schema 目录必须为：`knowledge/database-index/schema-<schema-name>/`
- 状态片段必须为：`knowledge/state/fragments/<scope-type>-<scope-name>.yaml`
- 严禁写入以下变体：
  - `mes-aiai-dev/...`
  - `knowledge/code-map/services/<service-name>/`（缺少 `service-` 前缀）
  - `knowledge/database-index/<schema-name>/`（缺少 `schema-` 前缀）
  - `knowledge/state/fragments/mes-init-enrich-*.yaml`（将命令名写入片段名）

---

## 单仓初始化规则

### 后端单仓初始化
- 只允许处理 `--repo/--repos` 指定的服务
- 只允许写目标服务目录下的局部产物，例如 `index.md`、`repo-profile.md`、`api-registry.md`、`service-dependencies.md`
- 不直接写 `backend-overview.md`、`service-dependencies.md` 共享文件
- 若指定服务不存在，必须阻断执行

### 前端单仓初始化
- 只允许处理 `--module/--modules` 指定的模块
- 只允许写目标模块目录下的局部产物
- 不直接写 `frontend-overview.md`、`frontend-backend-map.md` 共享文件

### 数据库单仓初始化
- 只允许处理 `--schema/--schemas` 指定的Schema
- 只允许写目标 Schema 目录及其 `registry-fragment.md`
- 不直接写 `database-registry.md` 共享文件

### 混合定向初始化
- 允许 repo + module + schema 同时指定
- 所有未指定对象一律不得扫描、不得生成产物
- 产物更新策略必须是局部落盘 + 延后收拢，不得边扫描边覆盖共享文件

---

## 执行策略矩阵

| 模式 | 仓规模 | 执行范围 | 退出要求 |
|------|--------|---------|---------|
| 全仓初始化 | 小仓 | 全部 Phase 1-9 | 校验全仓局部产物与待收口状态 |
| 全仓初始化 | 中/大仓 | 基础建图 + 热点 | 校验全仓基础局部产物与待收口状态 |
| 全仓初始化 | 超大仓 | 最小基础建图 | 校验全仓最小局部产物与待收口状态 |
| 单仓初始化 | 任意 | 仅指定 scope | 只校验指定 scope 产物 |
| 续传模式 | 任意 | 仅未完成 scope | 跳过已完成 Phase / 目标 |

---

## 预期产出

### 初始化阶段局部产物（全仓 / 单仓统一口径）

| 产物 | 说明 |
|------|------|
| state/fragments/*.yaml | 初始化阶段的 scope 级状态片段 |
| state.yaml.initialization.recent_execution.pending_reference_fragments | 待收口 reference/rules 片段状态 |
| state.yaml.initialization.recent_execution.pending_code_map_fragments | 待收口 code-map 片段状态 |
| services/*/index.md | 后端服务局部索引 |
| services/*/repo-profile.md | 后端服务仓库画像 |
| services/*/api-registry.md | 后端服务 API 局部片段 |
| services/*/service-dependencies.md | 后端服务依赖局部片段 |
| modules/*/index.md | 前端模块局部索引 |
| modules/*/frontend-backend-map.md | 前端模块映射局部片段 |
| database-index/*/index.md | Schema 局部索引 |
| database-index/*/registry-fragment.md | Schema 注册片段 |
| knowledge/fragments/reference/**/*.md | reference/rules 局部知识片段 |
| knowledge/fragments/code-map/**/*.md | code-map 局部知识片段与热点候选片段 |
| .init-checkpoint.yaml | **历史遗留**：仅 mes-verify-state-migration 引用 |
| .sync-record.json | **历史遗留**：仅 mes-verify-state-migration 引用 |

### 单仓模式增量产物

| 产物 | 说明 |
|------|------|
| state/fragments/*.yaml | **主写入**：仅记录本次执行范围的状态节点、checkpoint 与待收拢共享文件 |
| state.yaml | 初始化阶段不直接写；由 `/mes-init-converge` 合并片段后统一更新 |
| 指定 `services/*/index.md` | 仅目标服务 |
| 指定 `services/*/repo-profile.md` | 仅目标服务 |
| 指定 `services/*/api-registry.md` | 仅目标服务的 API 片段 |
| 指定 `services/*/service-dependencies.md` | 仅目标服务依赖片段 |
| 指定 `modules/*/index.md` | 仅目标模块 |
| 指定 `modules/*/frontend-backend-map.md` | 仅目标模块映射片段 |
| 指定 `database-index/*/index.md` | 仅目标Schema |
| 指定 `database-index/*/registry-fragment.md` | 仅目标Schema注册片段 |
| 共享 overview / registry / hot / reference / rules 文件 | 初始化阶段一律不直接写入；由 `/mes-init-converge` 统一生成 |
| init-coverage.md | **兼容视图**：初始化阶段不直接写；由 `/mes-init-converge` 统一渲染 |

### 大仓/超大仓强制产物

| 产物 | 说明 |
|------|------|
| knowledge/fragments/code-map/hot-services/*.md | 高频服务候选片段 |
| knowledge/fragments/code-map/hot-apis/*.md | 高频API候选片段 |
| knowledge/fragments/code-map/hot-tables/*.md | 高频表候选片段 |

---

## 执行门禁

初始化阶段默认自动执行，无需等待用户确认；但仍必须在以下节点输出自检结论并写入状态：

| 节点 | 自检内容 | 处理方式 |
|------|---------|---------|
| Phase 0 完成后 | 模式判定 + checkpoint | 记录 scope、续传策略与风险，不阻塞执行 |
| Phase 2 完成后 | 服务识别 + 仓画像 | 输出缺失项与异常项，继续执行 |
| Phase 5 完成后 | 前后端映射 | 输出未映射项，继续执行 |
| Phase 8A/Phase 9 完成后 | 局部产物结果/完整性验证 | 输出待 `/mes-init-converge` / `/mes-init-enrich` 的清单与阻断项 |

---

## 注意事项

1. **默认自动续传**：检测到未完成 checkpoint 时，不允许静默从头重跑
2. **只有 `--reset` 才能重置**：防止误覆盖中间成果
3. **单仓模式必须局部落盘**：不得直接写共享 overview / registry / hot 文件，也不得直接覆盖 `state.yaml`
4. **初始化锁强制**：写任何 repo/module/schema 局部产物前，必须先获取对应初始化锁
4. **超大仓禁止全量深化**：超大仓必须分两次初始化，先基础建图再按需深化
5. **高频入口强制**：大仓/超大仓（50万+行）必须生成 hot-xxx.md，后续需求优先读取热点
6. **术语表闭环强制**：若本命令未直接生成 `terminology-glossary.md`，必须在初始化结论中明确标记该产物由 `/mes-init-enrich` 补齐；初始化链路未补齐术语表前，不得宣告"初始化+深化闭环完成"
6. **存量仓优先真实边界**：优先识别真实边界而非理想结构
7. **state.yaml 为统一状态源**：初始化阶段运行中不直接写最终 `state.yaml`，仅写 `state/fragments/*.yaml` 与待收口状态；兼容视图统一由 `/mes-init-converge` 渲染
8. **历史遗留文件**：`.init-checkpoint.yaml` / `.sync-record.json` 仅 `mes-verify-state-migration` 专项核查时引用
9. **init-coverage.md 属于兼容视图**：后续判断哪些仓已初始化，优先读取 state.yaml.initialization.coverage
10. **初始化阶段统一收口**：无论全仓还是单仓，只要涉及共享文件，均必须由 `/mes-init-converge` 统一重算与收口
11. **共享知识片段待收口状态必须入库**：若本次产生 reference/code-map 片段或候选结果，必须写入 `state.yaml.initialization.recent_execution.pending_reference_fragments` / `pending_code_map_fragments`
12. **锁释放必须留痕**：若本次 scope 锁释放异常，必须记录到 checkpoint / 例外记录中，避免后续 session 误判
13. **命名与路径强制**：若产物目录/文件名不符合 canonical 规则，必须阻断执行并打回，不得继续生成错误路径产物
14. **【新增】中/大/超大仓必补齐提示**：当仓规模判定为 medium/large/mega 时，Phase 9 完成后必须输出明确提示：
    ```
    ⚠️ 本次初始化为[中仓/大仓/超大仓]基础建图，以下产物尚未生成：
    - terminology-glossary.md（业务术语表）
    - domain-model.md（领域模型）
    - data-dictionary.md（数据字典）
    - enum-registry.md（枚举注册表）
    - error-code-registry.md（错误码注册表）
    - permission-matrix.md（权限矩阵）
    
    请执行 `/mes-init-enrich --services=<本次服务列表>` 补齐参考知识
    或执行 `/mes-init-converge` 完成全局收口后再深化
    ```
15. **【新增】初始化链路闭环检查**：初始化结论中必须明确标注：
    - 本次是否完成参考知识提取（terminology/domain-model 等）
    - 若未完成，后续命令是什么（`/mes-init-enrich` 或 `/mes-init-converge`）
    - 当前 `state.yaml.initialization.recent_execution.pending_reference_fragments.count` 值

## 执行计划模板

执行前需输出计划，但初始化阶段无需等待用户确认：

```markdown
## 执行计划

**目标**：初始化项目知识库，支持全仓/单仓执行与断点续传

**执行模式**：[全仓初始化 / 单仓初始化 / 定向初始化 / 断点续传]

**本次范围**：
- 服务：[全部 / 指定列表]
- 模块：[全部 / 指定列表]
- Schema：[全部 / 指定列表]

**checkpoint 状态**：
- 是否检测到历史记录：[是/否]
- 接续策略：[续传 / 重置]
- 已完成 Phase：[列表]
- 待完成 Phase：[列表]

**步骤**：
1. Phase 0：模式判定 + checkpoint 检测
2. Phase 1-6：按 scope 执行基础建图
3. 小仓时继续 Phase 7-8；所有模式都只产出局部结果与待收口状态；大仓以上按规则转 `/mes-init-enrich`
4. Phase 9：按模式执行完整性校验，并输出待 `/mes-init-converge` 收口清单

**预期产出**：
- 目标执行范围的 index/profile/局部 registry 片段
- `state/fragments/*.yaml`（主写入：本次 scope 状态片段）
- `state.yaml.initialization.recent_execution.pending_reference_fragments` / `pending_code_map_fragments`（记录待收口共享知识片段）
- 局部 reference/rules/code-map 片段目录
- 所有待 `/mes-init-converge` 汇总的共享文件状态
- 最终共享文件、state.yaml、summary/baseline/init-coverage 一律由 `/mes-init-converge` 生成或更新
- **历史遗留**：`.init-checkpoint.yaml` / `.sync-record.json` 仅 mes-verify-state-migration 引用

**风险评估**：
- 单仓模式若错误写入共享文件，会污染全局知识
- checkpoint 状态不准确会导致重复扫描或漏扫
- 大仓/超大仓必须控制 scope，禁止无边界扩散
```
