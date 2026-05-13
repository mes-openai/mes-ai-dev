---
description: "按需深化知识库，补充detail/file-summaries/patterns/ownership等深度内容"
---
# mes-init-enrich

## 功能说明

按需深化知识库，补充基础建图后的深度内容。适用于：
- `/mes-init-project` 基础建图完成后，需要深入理解特定服务/模块
- 超大仓场景，不一次性全量初始化
- 针对性深化某个服务/Schema/模块的详细知识

**与 `/mes-init-project` 的关系**：
- `/mes-init-project` = 基础建图（仓级地图 + index/profile + registry索引）
- `/mes-init-enrich` = 深度补充（detail + file-summaries + patterns + ownership + reference详情 + hot层补充/刷新）
- **初始化链路闭环要求**：`/mes-init-enrich` 完成后必须具备已真实填充的 `mes-ai-dev/knowledge/reference/terminology-glossary.md`，不得再延后到需求分析阶段

**数据库深化边界**：
- `/mes-init-enrich` 对数据库执行**深化明细模式**或**增强索引模式**
- 若本次仅要求补强 Schema 风险画像，则至少更新 `database-index/schema-<schema-name>/index.md`
- 若本次深化目标包含表结构明细，则必须生成 `tables.md`
- 若本次深化目标包含关系分析，则必须生成 `relations.md`
- `tables.md` / `relations.md` 若因脚本质量或解析限制无法完整生成，必须在产物与审查结果中明确缺失原因、影响范围与后续补齐建议

**hot层职责边界**：
- `/mes-init-project` 负责在大仓/超大仓首次基础建图时生成 hot层
- `/mes-init-enrich` 不负责 hot层首次落地，而负责在后续深化、局部补录、知识修正时补充或刷新 hot层

**断点续传支持**：
- 若上一次深化未完成，下次执行默认从 checkpoint 继续
- 同一批次的服务/Schema/模块按未完成目标继续，不重复已完成对象

**初始化范围清单联动**：
- 每次深化完成后，必须同步更新 `mes-ai-dev/knowledge/init-coverage.md`
- 将目标对象的“深化状态”从 `⏳未深化` 更新为 `✅已深化`

**共享 reference/rules 文件写入边界**：
- `terminology-glossary.md`、`domain-model.md`、`data-dictionary.md`、`enum-registry.md`、`error-code-registry.md`、`permission-matrix.md`、`api-conventions.md`、`coding-standards.md` 均视为共享知识文件
- 多 session 或并行 Agent 不得直接同时写这些文件
- 深化阶段必须先输出 scope 级参考知识局部结果或待合并清单，再由主控Agent串行汇总写入共享文件
- 片段目录固定为 `mes-ai-dev/knowledge/fragments/`，命名示例：`reference/terminology/service-xxx.md`、`reference/domain-model/service-xxx.md`、`reference/data-dictionary/schema-xxx.md`、`rules/api-conventions/repo-xxx.md`

**共享 code-map 全局文件写入边界**：
- `business-flows.md`、`ownership.md`、`patterns.md`、`legacy-debt.md`、`hot-services.md`、`hot-apis.md`、`hot-tables.md` 均视为共享知识文件
- 多 session 或并行 Agent 不得直接同时写这些文件
- 必须先输出 scope 级片段或热点候选结果，再由主控Agent串行收口到最终全局文件
- 片段目录固定为 `mes-ai-dev/knowledge/fragments/code-map/`

**初始化锁要求**：
- `/mes-init-enrich` 在深化指定 repo/module/schema 前，必须先获取对应初始化锁
- 未获取锁前，不得写 detail/file-summaries、数据库索引、reference/rules/code-map 片段或热点候选片段
- 锁冲突时，可缩小 scope 继续执行不冲突部分，但不得写冲突 scope 的任何局部产物
- 命令正常结束后必须释放已持有锁；异常退出按 `exception-handbook.md` 处理

**命名与路径要求**：
- 服务深化结果只能写入 `knowledge/code-map/services/service-<service-name>/`
- 模块深化结果只能写入 `knowledge/code-map/modules/module-<module-name>/`
- Schema 深化结果只能写入 `knowledge/database-index/schema-<schema-name>/`
- 状态片段只能写入 `knowledge/state/fragments/<scope-type>-<scope-name>.yaml`
- 不允许以命令名、自由别名或错误根目录变体生成文件路径

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

**图谱/TDD Skill 继承说明**：当本命令编排的 Skill 命中 GitNexus / graphify / TDD 单元测试场景时，默认继承 `.opencode/references/mes-ai-reference/rules/governance/skill-graph-tdd-consumption-standard.md`；图谱能力仅作为证据导航或导读，不替代事实证据、阶段结论或门禁判断；TDD/Mockito/路径兼容规则以该统一标准为准。

**阶段完成产物报告**：
- `/mes-init-enrich` 完成后必须输出一份阶段完成产物报告
- 报告必须说明：深化标准产物、已生成文件、各文件作用、未生成文件及未生成原因
- 报告未生成或内容不达标，不得通过深化阶段退出门禁

## 使用方式

``` 
/mes-init-enrich [选项]
/mes-init-enrich --services=mes-production --resume
/mes-init-enrich --services=mes-production --reset
```

**选项参数**：
| 参数 | 说明 | 示例 |
|------|------|------|
| `--services` | 指定要深化的服务列表（逗号分隔） | `--services=mes-production,mes-quality` |
| `--schemas` | 指定要深化的Schema列表（逗号分隔） | `--schemas=mes_main,mes_quality` |
| `--modules` | 指定要深化的前端模块列表 | `--modules=production-management` |
| `--depth` | 深化深度：`standard`（标准）/`deep`（完整） | `--depth=standard` |
| `--resume` | 强制从上次未完成的深化任务继续 | `--resume` |
| `--reset` | 清空深化 checkpoint 后重头开始 | `--reset` |

**适用场景**：
- 超大仓（>150万行）：初始化只做基础建图，后续按需深化
- 存量仓深化：先做基础建图识别边界，再针对性深化风险区域
- 需求驱动深化：某个需求涉及特定服务，只深化这些服务

**前置条件**：
- 已执行 `/mes-init-project` 基础建图
- 存在 backend-overview.md 和 frontend-overview.md
- 存在 services/*/index.md 和 modules/*/index.md

**预期耗时**：
- 单服务深化：约5-10分钟
- 5个服务深化：约15-25分钟
- 全量深化（超大仓不建议）：约60-120分钟

---

## Checkpoint 断点续传机制

> **完整定义与字段规则**：见 `AGENTS.md` §4.3.1「初始化模式与续传规则」与 `rules/state-rendering-spec.md`。

`/mes-init-enrich` 与 `/mes-init-project` 共用同一收拢模型：运行中 checkpoint 先写 `state/fragments/*.yaml`，合并后再体现在 `state.yaml` 中。

本命令仅保留深化场景差异：
1. 默认自动检测上次未完成的 `/mes-init-enrich` 状态片段与 checkpoint
2. `--resume`：强制继续当前片段中的 checkpoint
3. `--reset`：清空当前深化片段后重新开始
4. Phase 内若只完成部分服务/Schema/模块，下次只补剩余对象

---

## 初始化范围清单联动规则

> **完整定义与更新规则**：见 `AGENTS.md` §4.3.1「初始化模式与续传规则」与 `rules/state-rendering-spec.md`。

本命令仅强调深化联动差异：
- `/mes-init-enrich` 完成后必须更新 `state.yaml.initialization.coverage` 中对应服务/模块/Schema的「深化状态」
- `/mes-init-enrich` 运行中先写 `state/fragments/*.yaml`，结束后由主控串行合并到 `state.yaml.initialization.coverage`
- `/mes-init-enrich` 若产生 reference/rules/code-map 片段，必须同步更新 `state.yaml.initialization.recent_execution.pending_reference_fragments` / `pending_code_map_fragments`
- 未在本次执行范围中的对象不得被误修改
- 最近命令字段必须写为 `/mes-init-enrich`
- `baseline.md` 的统计结果必须能追溯到 `state.yaml.initialization.coverage` 明细

---

## 大仓模式判定（自动）

> **完整阈值定义与强制规则**：见 `.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`。

执行前自动判定代码仓规模（优先读取 `state.yaml.initialization.repository_scale`，缺失时读取 `baseline.md` 摘要视图），并根据规模调整深化策略：

| 仓规模 | 深化策略 |
|--------|---------|
| 小仓 | 可一次性全量深化 |
| 中仓 | 建议**分批深化**，每批≤3服务 |
| 大仓 | **强制分批**，每批≤3服务 + 强制summary |
| 超大仓 | **禁止全量深化**，只能按需单服务深化 |

---

## 编排流程

```
┌─────────────────────────────────────────────────────────────┐
│                   按需深化知识库                               │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 0: 大仓模式判定 + 执行范围确认 + checkpoint检测           │
│  ┌─────────────┐                                             │
│  │guard-context│ ──判定仓规模（小/中/大/超大）                 │
│  │   -budget   │ ──检查深化范围是否合法                        │
│  │             │ ──超大仓→禁止全量深化                         │
│  │             │ ──优先读取 state/fragments/*.yaml checkpoint │
│  │             │ ──判定继续/重置                               │
│  └─────────────┘                                             │
│  ⚠️ 超大仓全量深化 = 阻断，必须指定--services                   │
│  > 历史遗留：`.init-checkpoint.yaml` 仅 mes-verify-state-migration 引用 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate A: Phase 0 输出审查                               │
│  ──范围/checkpoint/仓规模判定错误 → 打回 Phase 0 重做          │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: 服务详情深化                                         │
│  ┌─────────────┐                                             │
│  │init-analyze │ ──生成 services/*/detail.md                  │
│  │ -service    │ ──生成 services/*/file-summaries.md          │
│  │(增强版)     │ ──生成 services/*/repo-profile.md            │
│  └─────────────┘                                             │
│                                                             │
│  分批策略：                                                   │
│  - 小仓：一次性深化所有服务                                    │
│  - 中仓/大仓：分批深化，每批≤3服务                             │
│  - 超大仓：只深化--services指定的服务                          │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: Schema风险画像深化                                   │
│  ┌─────────────┐                                             │
│  │init-index   │ ──生成 database-index/*/index.md             │
│  │ -database   │ ──补充Schema风险画像                          │
│  │(增强版)     │ ──标注热表/共享表/大表                        │
│  │             │ ──按目标补充 `tables.md` / `relations.md`     │
│  └─────────────┘                                             │
│                                                             │
│  分批策略：                                                   │
│  - 只深化--schemas指定的Schema                                │
│  - 未指定→深化所有Schema（小仓允许）                           │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: 前端模块深化                                         │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──生成 modules/*/detail.md                   │
│  │ -frontend   │ ──补充模块职责卡                              │
│  │(增强版)     │                                              │
│  └─────────────┘                                             │
│                                                             │
│  分批策略：                                                   │
│  - 只深化--modules指定的模块                                  │
│  - 未指定→深化所有模块（小仓允许）                             │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate B: Phase 1-3 输出审查                             │
│  ──detail/file-summaries/模块深化未通过 → 打回对应阶段重做      │
│  ──Schema `index.md` 风险画像未补强、仍为模板占位或缺少关键结论 → 打回 Phase 2 重做 │
│  ──本次已声明生成 `tables.md` / `relations.md` 但产物缺失、为空壳或未说明解析边界 → 打回 Phase 2 重做 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: 实现模式深化                                         │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──先写 patterns/legacy-debt 片段             │
│  │ -patterns   │ ──标注参考实现 vs 反模式                      │
│  │             │ ──再由主控串行收口 patterns.md / legacy-debt.md│
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: 业务链路与实体归属深化                                │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──先写 business-flows / ownership 片段       │
│  │  -flows     │ ──必要时补充 legacy-debt 候选项               │
│  │             │ ──再由主控串行收口全局链路/归属/债务文件       │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 6: 参考知识深化                                         │
│  ┌─────────────┐                                             │
│  │init-extract │ ──先写 terminology/domain/data-dictionary 片段│
│  │ -reference  │ ──先写 enum/error-code/permission 片段       │
│  │(增强版)     │ ──先写 api-conventions/coding-standards 片段 │
│  │             │ ──再由主控串行收口共享 reference/rules 文件   │
│  └─────────────┘                                             │
│                                                             │
│  超大仓规则：                                                 │
│  - terminology-glossary、domain-model、data-dictionary、enum-registry：必须形成可消费版本 │
│  - error-code-registry、permission-matrix：若代码中可提取，必须补齐或明确缺口 │
│  - api-conventions、coding-standards：至少形成基线版本并标注来源 │
│  - 不允许以“首次需求分析时补充”替代初始化链路闭环               │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 7: 高频入口扫描（新增）                                  │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──先写 hot-services / hot-apis / hot-tables 候选片段 │
│  │ -hotspots   │ ──再由主控串行重算全局热点文件                │
│  │             │                                               │
│  └─────────────┘                                             │
│                                                             │
│  大仓/超大仓强制执行：                                         │
│  - 大仓/超大仓（50万+行）：必须生成高频入口层                    │
│  - 用于后续需求分析优先读取热点                                │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate C: Phase 4-7 输出审查                             │
│  ──patterns/flows/reference/hotspots 未通过 → 打回对应阶段重做 │
│  ──reference/rules 层若缺失共享知识必备产物或仍为占位骨架 → 不得进入基线更新 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 8: 深化结果校验与待收口状态更新                           │
│  ┌─────────────┐                                             │
│  │init-verify  │ ──更新 state/fragments/*.yaml 深化状态        │
│  │ -knowledge  │ ──更新 pending_reference_fragments / pending_code_map_fragments │
│  │             │ ──输出待 `/mes-init-converge` 收口清单            │
│  └─────────────┘                                             │
│  > 历史遗留：`.init-checkpoint.yaml` 仅 mes-verify-state-migration 引用 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate D: Phase 8 输出审查                               │
│  ──基线/覆盖率/状态更新未通过 → 打回 Phase 8 重做               │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
                          ✅ 深化完成
```

---

## 深化产物清单

| 产物 | 生成条件 | 用途 |
|------|---------|------|
| state/fragments/*.yaml | **运行中主写入**（所有仓） | 深化状态片段（coverage + checkpoint） |
| state.yaml.initialization.recent_execution.pending_reference_fragments | 所有仓 | 待收口 reference/rules 片段状态 |
| state.yaml.initialization.recent_execution.pending_code_map_fragments | 所有仓 | 待收口 code-map 片段状态 |
| services/*/detail.md | 指定服务或小仓全量 | 服务完整详情 |
| services/*/file-summaries.md | 指定服务或小仓全量 | 文件摘要索引 |
| services/*/repo-profile.md | 指定服务或小仓全量 | 仓库画像（强制） |
| database-index/*/index.md | 指定Schema或小仓全量 | Schema风险画像（强制） |
| database-index/*/tables.md | Schema 深化目标包含表结构明细时 | 表结构明细（条件强制） |
| database-index/*/relations.md | Schema 深化目标包含关系分析时 | 关系明细（条件强制） |
| modules/*/detail.md | 指定模块或小仓全量 | 模块完整详情 |
| patterns/ownership/legacy-debt/hot-* 对应 `knowledge/fragments/code-map/**/*.md` | 所有仓 | code-map 局部片段与热点候选 |
| terminology/domain-model/data-dictionary/enum/error-code/permission/api-conventions/coding-standards 对应 `knowledge/fragments/reference/**/*.md` / `knowledge/fragments/rules/**/*.md` | 所有仓 | reference/rules 局部片段 |
| state.yaml / state/summary.md / baseline.md / init-coverage.md | `/mes-init-converge` 统一生成 | 最终状态源与兼容视图 |
| .init-checkpoint.yaml | **历史遗留** | 仅 mes-verify-state-migration 引用 |
| .sync-record.json | **历史遗留** | 仅 mes-verify-state-migration 引用 |

---

## 多Agent并行编排策略

| Phase | 可并行 | 说明 |
|-------|--------|------|
| Phase 1: 服务详情深化 | ✅ 分组并行 | 每批≤3服务，每组1个Agent |
| Phase 2: Schema深化 | ✅ 分组并行 | 每批≤3Schema |
| Phase 3: 前端深化 | ✅ 分组并行 | 每批≤3模块 |
| Phase 4-6: 模式/链路/参考 | ✅ 三路并行 | patterns/flows/reference并行 |
| Phase 7: 高频入口 | 否 | 需汇总统计 |
| Phase 8: 基线更新 | 否 | 汇总验证 |

---

## 多Agent职责与汇总规则

| Phase | 主负责Agent | 协同方式 | 汇总规则 |
|------|-------------|---------|---------|
| Phase 0 | `mes-sisyphus` | 串行 | 执行范围判定、checkpoint 续传决策 |
| Phase 1-3 | `mes-service-analyzer` | 分批并行 | 各Agent只输出 detail/file-summaries/局部结果文件 |
| Phase 4-7 | `mes-knowledge-refresh` | 分组并行 | patterns/flows/reference/hotspots 输出局部结果 |
| Phase 8 | `mes-sisyphus` | 串行 | 汇总更新深化状态片段与待收口清单，不直接写最终共享文件 |

### 共享知识文件串行更新

> **完整规则与禁止列表**：见 `AGENTS.md` §10.3「共享知识文件更新规则」。

主控 Agent 必须串行汇总写入共享文件，不允许并行 Agent 直接覆盖。违反协同规则时必须回滚并改为主控串行汇总。

### 局部成功 / 局部失败处理

> **完整规则**：见 `AGENTS.md` §10.3「局部成功保留」「局部失败续传」。

关键要点：
- 已成功的 detail/file-summaries/局部分析结果必须保留
- 失败对象写入 checkpoint 的 pending 列表，下次续传只重派 pending 对象
- 若共享知识文件被并行直接写入，视为协同违例，必须回滚并改为主控串行更新
- reference/rules 共享文件必须先形成 scope 级局部结果或待汇总清单，不得由多个 session 直接覆盖目标文件

---

## 执行计划模板

执行前需输出计划，但初始化阶段无需等待用户确认：

```markdown
## 执行计划

**目标**：按需深化知识库，补充 detail/file-summaries 与共享知识局部片段，并为 `/mes-init-converge` 提供准确收口输入

**仓规模判定**：[小仓/中仓/大仓/超大仓]（代码行数：XXX万行）

**深化范围**：
- 服务：[指定列表 或 "小仓全量"]
- Schema：[指定列表 或 "小仓全量"]
- 模块：[指定列表 或 "小仓全量"]

**步骤**：
1. Phase 0：检测 checkpoint，确定续传/重置策略
2. 服务详情深化：**分组并行**，每批≤3服务
3. Schema风险画像深化：**分组并行**
4. 前端模块深化：按需
5. 实现模式深化：生成 patterns/legacy-debt 局部片段
6. 业务链路深化：生成 business-flows/ownership 局部片段
7. 参考知识深化：生成 terminology/domain-model/data-dictionary/enum-registry/error-code/permission/api-conventions/coding-standards 局部片段
8. 高频入口扫描：生成 hot-* 候选片段（大仓/超大仓强制）
9. 深化结果校验：更新 state/fragments 与待 `/mes-init-converge` 收口状态

**预期产出**：
- state/fragments/*.yaml（主写入：initialization.coverage 深化状态）
- state.yaml.initialization.recent_execution.pending_reference_fragments / pending_code_map_fragments
- services/*/detail.md（指定服务）
- services/*/file-summaries.md（指定服务）
- services/*/repo-profile.md（指定服务）
- database-index/*/index.md（指定Schema）
- `knowledge/fragments/code-map/patterns/*.md`
- `knowledge/fragments/code-map/business-flows/*.md`
- `knowledge/fragments/code-map/ownership/*.md`
- `knowledge/fragments/code-map/legacy-debt/*.md`
- `knowledge/fragments/code-map/hot-services/*.md`
- `knowledge/fragments/code-map/hot-apis/*.md`
- `knowledge/fragments/code-map/hot-tables/*.md`
- 所有最终共享文件（overview / registry / hot / reference / rules / state.yaml / summary / baseline / init-coverage）均由 `/mes-init-converge` 统一收口
- reference/rules 片段目录（运行中主写入）：
  - `knowledge/fragments/reference/terminology/*.md`
  - `knowledge/fragments/reference/domain-model/*.md`
  - `knowledge/fragments/reference/data-dictionary/*.md`
  - `knowledge/fragments/reference/enum-registry/*.md`
  - `knowledge/fragments/reference/error-code/*.md`
  - `knowledge/fragments/reference/permission-matrix/*.md`
  - `knowledge/fragments/rules/api-conventions/*.md`
  - `knowledge/fragments/rules/coding-standards/*.md`
- code-map 全局片段目录（运行中主写入）：
  - `knowledge/fragments/code-map/patterns/*.md`
  - `knowledge/fragments/code-map/business-flows/*.md`
  - `knowledge/fragments/code-map/ownership/*.md`
  - `knowledge/fragments/code-map/legacy-debt/*.md`
  - `knowledge/fragments/code-map/hot-services/*.md`
  - `knowledge/fragments/code-map/hot-apis/*.md`
  - `knowledge/fragments/code-map/hot-tables/*.md`
- 兼容视图（从 state.yaml 渲染）：
  - baseline.md
  - init-coverage.md
- **历史遗留**：`.init-checkpoint.yaml` 仅 mes-verify-state-migration 引用

**风险评估**：
- 大仓/超大仓必须分批执行
- 超大仓禁止全量深化
- checkpoint 错误会导致重复深化或漏深化
```

---

## 注意事项

1. **超大仓强制按需**：必须指定--services，禁止全量深化
2. **分批上限**：中仓/大仓每批≤3服务，避免上下文溢出
3. **高频入口强制**：大仓/超大仓（50万+行）必须生成hot-xxx.md
4. **存量仓优先真实边界**：深化时优先识别风险边界和参考实现
5. **reference/rules/code-map 局部化强制**：初始化/深化链路内只生成局部片段与候选结果，最终共享文件必须由 `/mes-init-converge` 统一收口
6. **初始化锁强制**：每个 repo/module/schema scope 在深化前必须持有对应初始化锁
6. **默认自动续传**：检测到未合并状态片段或未完成 checkpoint 时，不允许静默从头重跑
7. **只有 `--reset` 才能清空进度**：防止误覆盖已完成深化结果
8. **state.yaml 为统一状态源**：深化阶段运行中只写状态片段与待收口状态，最终 state.yaml 由 `/mes-init-converge` 统一更新
9. **init-coverage.md 为兼容视图**：初始化/深化阶段不直接渲染，统一由 `/mes-init-converge` 从 state.yaml 生成
10. **历史遗留**：`.init-checkpoint.yaml` / `.sync-record.json` 仅 mes-verify-state-migration 专项核查时引用
11. **共享文件串行收口**：多 session / 并行 Agent 深化同类 reference/rules/code-map 全局文件时，必须先写局部结果，再由主控串行收口
12. **锁释放必须留痕**：若本次深化锁释放异常，必须记录例外事项与未释放 scope，避免后续 session 误判
13. **路径审查必须阻断错误命名**：发现 `service-` / `module-` / `schema-` 前缀缺失、错误根目录或命令名混入片段文件名时，视为 must-pass 不通过
