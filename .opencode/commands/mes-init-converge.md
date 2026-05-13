---
description: "收敛多次单仓初始化结果，生成接近全仓初始化的全局一致结果"
---
# mes-init-converge

## 功能说明

在多次 `/mes-init-project --repo/--module/--schema` 单仓/定向初始化完成后，执行一次**全局收敛**，将按仓库/模块/Schema 命名的局部知识结果汇总为接近一次全仓初始化的全局结果。

本命令的定位不是重新扫描业务代码仓，而是：
- 汇总单仓初始化已生成的局部产物
- 串行合并 `state/fragments/*.yaml` 状态片段
- 串行合并 `knowledge/fragments/` 下的 reference/rules 局部结果片段
- 串行合并 `knowledge/fragments/code-map/` 下的全局知识片段与热点候选结果
- 重算全局 overview / registry / hot 层
- 做一次全仓视角的覆盖率与一致性校验
- 将“多次单仓补录”收敛为“可按全仓口径消费”的知识库状态

> **边界说明**：
> - `/mes-init-project` = 基础建图（全仓或单仓）
> - `/mes-init-enrich` = 深化知识
> - `/mes-init-converge` = **全局收敛**（将多次单仓初始化结果收敛到全仓视角）

---

## 适用场景

- 项目包含多个代码仓，已按单仓模式分批执行 `/mes-init-project`
- 希望将多次单仓初始化的结果统一收敛为接近一次全仓初始化的全局结果
- 大仓/超大仓场景下，先做局部补录，再做一次共享文件与热点层全局重算
- 需要全仓视角的门禁、覆盖率、可信度与热点结果

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

**图谱/TDD Skill 继承说明**：当本命令编排的 Skill 命中 GitNexus / graphify / TDD 单元测试场景时，默认继承 `.opencode/references/mes-ai-reference/rules/governance/skill-graph-tdd-consumption-standard.md`；图谱能力仅作为证据导航或导读，不替代事实证据、阶段结论或门禁判断；TDD/Mockito/路径兼容规则以该统一标准为准。

---

## 使用方式

```bash
/mes-init-converge
/mes-init-converge --rebuild-hot
/mes-init-converge --verify-only
```

### 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| 无参数 | 执行标准全局收敛 | `/mes-init-converge` |
| `--rebuild-hot` | 强制重算 `hot-services.md` / `hot-apis.md` / `hot-tables.md` | `/mes-init-converge --rebuild-hot` |
| `--verify-only` | 只做全局校验，不写共享知识文件 | `/mes-init-converge --verify-only` |

---

## 前置条件

- 已至少执行过一次 `/mes-init-project`
- `state/state.yaml` 已存在
- 已存在局部知识产物（如 services/*/index.md、services/*/api-registry.md、modules/*/frontend-backend-map.md、database-index/*/registry-fragment.md）
- 若采用分仓补录模式，应确认本次需要收敛的 repo/module/schema 已全部完成单仓初始化
- 若存在共享 reference/rules 片段，应确认其 scope 命名与目标收敛范围一致

---

## 核心目标

### 目标一：基于局部产物全局汇总共享知识文件
- `backend-overview.md`
- `frontend-overview.md`
- `service-dependencies.md`
- `api-registry.md`
- `database-registry.md`
- `frontend-backend-map.md`

### 目标二：全局重算热点层
- `hot-services.md`
- `hot-apis.md`
- `hot-tables.md`

### 目标二点二：code-map 全局知识文件收口
- `business-flows.md`
- `ownership.md`
- `patterns.md`
- `legacy-debt.md`

### 目标二点五：共享参考知识文件全局收口
- `reference/terminology-glossary.md`
- `reference/domain-model.md`
- `reference/data-dictionary.md`
- `reference/enum-registry.md`
- `reference/error-code-registry.md`
- `reference/permission-matrix.md`
- `rules/api-conventions.md`
- `rules/coding-standards.md`

### 目标三：全仓视角校验
- 覆盖率是否完整
- 全局聚合结果是否与对象级产物一致
- `baseline.md` / `init-coverage.md` / `summary.md` 是否与 `state.yaml` 一致

### 目标四：更新统一状态源
- 先合并待收拢的 `state/fragments/*.yaml`
- 在 `state.yaml.initialization` 中写入本次全局收敛结果
- 更新 `state.yaml.initialization.convergence`
- 清空已完成收口的 `pending_reference_fragments` / `pending_code_map_fragments`，并记录 `last_converged_fragment_batch`
- 明确最近命令为 `/mes-init-converge`
- 在人工摘要中写明“已完成全局收敛”

---

## 与单仓初始化的关系

### 单仓初始化负责
- 局部扫描
- 局部 index / detail / schema index / registry 片段产物
- 局部 coverage 更新

### mes-init-converge 负责
- 全局 overview / registry 汇总
- 热点层全局重算
- 全仓口径校验
- 覆盖率与可信度的全局结论

> **重要说明**：
> 多次单仓初始化 ≠ 一次全仓初始化。
> 只有在执行 `/mes-init-converge` 后，才可将多次单仓初始化结果视为“接近全仓初始化结果”的全局知识状态。

---

## 编排流程

```
┌─────────────────────────────────────────────────────────────┐
│                    全局收敛知识库结果                         │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 0: 预检 + 收敛范围确认                                  │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │mes-guard-context-│  │mes-verify-phase-gate │                 │
│  │    budget        │  │                  │                 │
│  │──检查上下文预算  │  │──检查进入条件    │                 │
│  │──判定仓规模      │  │──确认允许收敛    │                 │
│  └──────────────────┘  └──────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate A: Phase 0 输出审查                               │
│  ──收敛条件/范围确认不通过 → 打回 Phase 0 重做                  │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: 局部产物盘点                                         │
│  ┌─────────────┐                                             │
│  │init-verify  │ ──盘点 services/modules/database-index 与 state/fragments 局部产物 │
│  │ -knowledge  │ ──检查 coverage 是否存在缺口                 │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate B: Phase 1 输出审查                               │
│  ──局部产物缺口未澄清 → 打回 Phase 1 重做                      │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: 共享知识文件全局汇总                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │init-build   │  │init-build   │  │init-extract │          │
│  │ -code-map   │  │-dependency   │  │   -api      │          │
│  │ 基于局部产物重算总览 │ │ 基于局部片段重算依赖图 │ │ 基于服务级片段重算API注册 │ │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│  ┌───────────────────────────────────────────┐               │
│  │ reference/rules 共享知识收口              │               │
│  │ ──汇总 terminology/domain/data-dictionary │               │
│  │ ──汇总 enum/error-code/permission-matrix  │               │
│  │ ──收口 api-conventions/coding-standards   │               │
│  └───────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: 热点层全局重算                                        │
│  ┌─────────────┐                                             │
│  │init-scan    │ ──重算 hot-services / hot-apis / hot-tables │
│  │ -hotspots   │                                             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate C: Phase 2-3 输出审查                             │
│  ──总览/注册表/reference/rules/code-map/hot 层收口未通过 → 打回对应阶段重做 │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: 全仓视角校验                                         │
│  ┌─────────────┐                                             │
│  │init-verify  │ ──校验全局 coverage / 可信度 / 一致性         │
│  │ -knowledge  │ ──写入 state.yaml（主写入路径）               │
│  │             │ ──渲染 baseline / init-coverage / summary   │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate D: Phase 4 输出审查                               │
│  ──校验不通过/状态未闭环/仍存在未收口片段 → 打回对应问题阶段重做   │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
                          ✅ 收敛完成
```

---

## 多Agent职责与汇总规则

| Phase | 主负责Agent | 协同方式 | 汇总规则 |
|------|-------------|---------|---------|
| Phase 0-1 | `mes-sisyphus` | 串行 | 判定收敛条件、检查局部产物完整性 |
| Phase 2 | `mes-service-analyzer` / `mes-knowledge-refresh` | 可并行 | 只输出局部汇总结果，由主控串行写共享文件 |
| Phase 3 | `mes-knowledge-refresh` | 串行优先 | 热点层必须按全局数据重算 |
| Phase 4 | `mes-sisyphus` | 串行 | 汇总校验结果并更新统一状态源 |

> **共享知识文件规则**：继续遵守 `AGENTS.md` §10.3，所有共享知识文件必须由主控 Agent 串行汇总写入。

---

## 预期产出

| 产物 | 说明 |
|------|------|
| `state/state.yaml` | **主写入**：记录本次全局收敛结果与最近执行摘要 |
| `state/fragments/*.yaml` | 待合并的初始化状态片段（收敛后应清空 pending） |
| `knowledge/fragments/reference/**/*.md` | 待合并的 reference 层局部结果片段 |
| `knowledge/fragments/rules/**/*.md` | 待合并的 rules 层局部结果片段 |
| `knowledge/fragments/code-map/**/*.md` | 待合并的 code-map 全局知识片段与热点候选片段 |
| `state.yaml.initialization.convergence.pending_reference_fragments` | 待收口 reference/rules 片段状态 |
| `state.yaml.initialization.convergence.pending_code_map_fragments` | 待收口 code-map 片段状态 |
| `state.yaml.initialization.convergence.last_converged_fragment_batch` | 最近收口批次记录 |
| `state/summary.md` | 人工摘要，标注“已完成全局收敛” |
| `baseline.md` | **兼容视图**：从 state.yaml 渲染的全局摘要 |
| `init-coverage.md` | **兼容视图**：从 state.yaml 渲染的全局覆盖清单 |
| `backend-overview.md` | 基于仓级产物全局重算后的后端总览 |
| `frontend-overview.md` | 全局重算后的前端总览 |
| `service-dependencies.md` | 全局重算后的依赖图 |
| `api-registry.md` | 全局重算后的 API 注册索引文件（完整明细按服务级片段下沉） |
| `database-registry.md` | 全局重算后的数据库注册表 |
| `frontend-backend-map.md` | 全局重算后的前后端映射 |
| `business-flows.md` | 全局收口后的业务主链路 |
| `ownership.md` | 全局收口后的实体归属与热点 |
| `patterns.md` | 全局收口后的实现模式与反模式 |
| `legacy-debt.md` | 全局收口后的历史债务清单 |
| `hot-services.md` | 全局热点服务排行 |
| `hot-apis.md` | 全局热点 API 排行 |
| `hot-tables.md` | 全局热点表排行 |
| `reference/terminology-glossary.md` | 全局收口后的业务术语索引文件（正文按服务/术语组分片） |
| `reference/domain-model.md` | 全局收口后的领域模型索引文件（正文按业务域分片） |
| `reference/data-dictionary.md` | 全局收口后的数据字典 |
| `reference/enum-registry.md` | 全局收口后的枚举注册表 |
| `reference/error-code-registry.md` | 全局收口后的错误码注册表 |
| `reference/permission-matrix.md` | 全局收口后的权限矩阵 |
| `rules/api-conventions.md` | 全局收口后的API规范基线 |
| `rules/coding-standards.md` | 全局收口后的编码规范基线 |
| `workspace/refresh/*-converge-report.md` | 建议使用 `templates/governance/converge-report-template.md` 记录本次收敛结论 |
| `workspace/refresh/*-fragment-convergence-checklist.md` | 建议使用 `templates/governance/fragment-convergence-checklist-template.md` 记录收口前统一检查结果 |

> **历史遗留**：`.init-checkpoint.yaml` / `.sync-record.json` 仅 `mes-verify-state-migration` 专项核查时引用。

---

## 执行门禁

初始化阶段默认自动执行，无需等待用户确认；但必须在以下节点输出自检结论：

| 节点 | 自检内容 | 处理方式 |
|------|---------|---------|
| Phase 0 完成后 | 收敛范围 + 已完成局部产物 | 记录缺口与阻断项 |
| Phase 2 完成后 | overview / registry 汇总结果 | 记录重建文件清单 |
| Phase 3 完成后 | hot 层重算结果 | 记录排行来源与异常 |
| Phase 4 完成后 | 全仓视角校验 | 记录是否可接受为全局基线 |

---

## 注意事项

1. **本命令是初始化共享产物唯一汇总入口**：所有最终共享文件一律由本命令统一生成或更新
2. **本命令不替代 `/mes-init-project` / `/mes-init-enrich` 的局部扫描职责**：它负责汇总，不负责初次扫描代码仓或局部深化
3. **本命令必须持有全局收口锁**：未获取 `workspace/locks/mes-init-converge.lock` 前，不得开始任何共享文件汇总、状态合并与热点重算
4. **热点层必须全局重算**：不能以单仓增量结果直接替代全局热点层
5. **全局收敛后才能视为初始化结果可消费**：初始化各阶段/步骤只产生局部结果；未执行 `/mes-init-converge` 前，不得将共享依赖文件视为最终可消费结果
6. **统一状态源优先**：已合并状态写入 `state.yaml`，兼容视图从 state.yaml 渲染
7. **初始化状态先片段后合并**：`/mes-init-converge` 必须先串行合并 `state.fragments/*.yaml`，再更新 `state.yaml`
8. **共享知识文件必须串行写入**：不得并行覆盖 overview / registry / baseline / init-coverage
9. **收敛状态必须留痕**：是否已完成全局收敛，应写入 `state.yaml.initialization.convergence`
10. **共享 reference/rules 文件必须经收口**：多次单仓/多session 初始化后的 reference/rules 共享文件，必须由 `/mes-init-converge` 或主控等价收口过程串行合并，禁止各 session 直接覆盖最终文件
11. **reference/rules 片段命名必须可追溯**：收敛前必须按 scope 校验 `knowledge/fragments/` 下片段命名是否可映射到 repo/module/schema/service；无法映射的片段不得静默合并
12. **code-map 全局片段也必须经收口**：`business-flows` / `ownership` / `patterns` / `legacy-debt` / `hot-*` 的片段或候选结果，必须由主控或 `/mes-init-converge` 串行汇总，禁止各 session 直接覆盖最终文件
13. **收口前必须留痕检查**：建议在最终共享文件写入前，使用 `templates/governance/fragment-convergence-checklist-template.md` 记录命名映射、重复、冲突、最小可消费内容、热点候选重算准备度和 state.yaml 对齐情况
14. **收口锁释放必须留痕**：若 `mes-init-converge.lock` 释放异常或被强制接管，必须记录到例外流程与收口报告中
15. **高风险大文件必须索引化**：`api-registry.md`、`domain-model.md`、`terminology-glossary.md` 的收口目标应为可消费索引文件，不得在全局共享文件中无限堆积完整正文

---

## 执行计划模板

执行前需输出计划，但初始化阶段无需等待用户确认：

```markdown
## 执行计划

**目标**：将多次单仓初始化结果收敛为全仓视角的全局知识结果

**步骤**：
1. Phase 0：预检 + 收敛范围确认
2. Phase 1：盘点局部产物与 coverage 缺口
3. Phase 2：重算 overview / registry / 依赖图
4. Phase 3：全局重算 hot-services / hot-apis / hot-tables
5. Phase 4：执行全仓视角校验并更新 state.yaml / baseline / init-coverage / summary

**预期产出**：
- 全局 overview / registry / dependency files
- 全局热点层
- 更新后的 state.yaml / baseline / init-coverage / summary

**风险评估**：
- 局部产物缺失会导致收敛结果不完整
- 热点层依赖全局数据，必须接受全局重算结果
- 若共享文件已被人工修改，可能出现汇总冲突
```
