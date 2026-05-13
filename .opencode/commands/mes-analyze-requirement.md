---
description: "执行完整需求分析，从业务语言到需求规格文档"
---
# mes-analyze-requirement

## 功能说明

执行完整的需求分析流程，将用户的业务需求语言转化为 OpenSpec 文档链。当前命令已按新骨架口径扩展为：需求解析、影响分析、仓级责任边界、业务/服务/数据链追踪、provider 选择与 API 复用判断、探索/提案判断、规格生成和需求评审。

## 使用方式

```
/mes-analyze-requirement
```

**适用场景**：
- 接到新需求，需要分析和规划时
- 需要将业务语言转化为技术规格时
- 需要评估需求影响范围时

**前置条件**：
- 知识库已初始化（执行过 `/mes-init-project`）
- 需求描述已提供（用户输入或文档）
- 若当前需求涉及统一响应、错误码、SDK 请求/响应模型、认证/MQ 契约等业务仓外定义源，应优先确认 `contracts.md` 已可消费；否则分析结果只能按候选/未知口径输出

> **全仓视角依赖说明**：
> 若本次需求分析依赖全仓级的 `backend-overview.md` / `frontend-overview.md` / `service-dependencies.md` / `hot-*` 结论，应优先确认已完成 `/mes-init-converge`；否则仅能按局部初始化结果分析，并需明确风险。

> **多仓 / provider 决策说明**：
> 若需求涉及多个代码仓、多个微服务、多个候选 provider 或现有接口复用，需求分析阶段必须形成仓级责任边界、provider 选择与 API 复用判断。
> 相关主定义以以下文件为准：
> - `.opencode/references/mes-ai-reference/rules/scenarios/scenario-multi-repo.md`
> - `.opencode/references/mes-ai-reference/rules/phases/phase-analyze.md`
> 本命令只负责要求这些产物必须形成，不再重复完整展开其原理定义。

**预期耗时**：约10-20分钟

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

**图谱/TDD Skill 继承说明**：当本命令编排的 Skill 命中 GitNexus / graphify / TDD 单元测试场景时，默认继承 `.opencode/references/mes-ai-reference/rules/governance/skill-graph-tdd-consumption-standard.md`；图谱能力仅作为证据导航或导读，不替代事实证据、阶段结论或门禁判断；TDD/Mockito/路径兼容规则以该统一标准为准。

**阶段工作目录命名说明**：本命令必须遵循 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`。执行前先解析 `{REQ-ID}`：文档内存在 `US[0-9]+` 时使用 US 编号；无 US 但存在 `ITRQ[0-9]+` 时使用 ITRQ 编号；两者均无时才生成 `REQ-YYYYMMDD-{序号}`。需求分析产物只允许写入 `mes-ai-dev/workspace/requirements/{REQ-ID}/`。

**审查报告强制要求**：本命令中所有评审/门禁结果必须输出详细审查报告，不得仅输出简略结论或问题清单；详细审查报告结构必须符合 `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`，如使用专用模板，再以 `.opencode/references/mes-ai-reference/templates/governance/detailed-review-report-template.md` 作为落盘载体。

**阶段详细审查报告**：
- `/mes-analyze-requirement` 完成后必须输出 `spec-review-report.md`
- 落盘目录：`mes-ai-dev/workspace/requirements/{REQ-ID}/`
- 报告必须满足详细审查报告最小字段集，并包含明确审查时间与完整证据链
- 报告未生成或内容不达标，不得通过需求分析阶段退出门禁

## GSD 执行增强说明

当需求目标明确、影响范围可初步识别、核心验收标准可形成时，`/mes-analyze-requirement` 可采用 GSD 模式，先输出最小需求包，支撑设计阶段继续推进。

### 一、何时必须维持 Strict

命中以下情况时，必须维持 Strict：

- 核心目标不明确
- 业务边界无法判断
- 核心验收标准缺失
- 关键依赖链路无法识别
- 当前结果不足以支撑设计继续

### 二、最小需求包定义

最小需求包至少包含：

- 当前需求目标
- 影响范围初判
- 核心验收条件
- 关键歧义点
- blocker 状态
- 风险说明
- 推荐下一步

### 三、blocker 规则

需求分析阶段 blocker 必须优先回答：

- 哪些歧义会阻断设计继续
- 哪些歧义不会阻断设计继续
- 哪些项可在设计阶段继续细化
- 哪些项必须在分析阶段先决

不得把所有未明事项都视为硬阻塞。

### 四、GSD Continue Exit 条件

需求分析阶段进入 GSD Continue Exit 至少必须满足：

1. 当前需求边界明确
2. 当前影响范围已有初步结论
3. 核心验收标准已明确
4. 关键歧义点已显式列出
5. 设计阶段可基于当前结果继续推进
6. 风险与后补动作已记录
7. 已完成收尾扫描

### 五、Completion Sweep

需求分析结束前至少检查：

- 是否已回答“设计可以继续吗”
- 是否已压缩出最小决策点
- 是否已区分阻断歧义与可后补歧义
- 是否避免把大量项目管理职责直接抛回用户

### 六、输出要求

本命令的最终输出至少应包含：

- 当前模式
- 当前需求目标
- 最小需求包状态
- blocker 状态
- 风险说明
- 后补动作
- 推荐下一步

### 七、模板绑定说明

- 命中 blocker 时，应使用 `.opencode/references/mes-ai-reference/templates/governance/blocker-record-template.md` 记录歧义分类、代偿动作与后补动作
- 以 GSD Continue Exit 继续时，应使用 `.opencode/references/mes-ai-reference/templates/governance/minimum-deliverable-template.md` 说明最小需求包
- 当前需求分析完成状态，应映射到 `.opencode/references/mes-ai-reference/templates/governance/definition-of-done-template.md` 的 GSD 完成定义
- 分析阶段结束前，应使用 `.opencode/references/mes-ai-reference/templates/governance/completion-sweep-template.md` 执行收尾扫描
- 若需独立输出下一步建议，应使用 `.opencode/references/mes-ai-reference/templates/governance/next-step-recommendation-template.md`

## 编排流程

```
┌─────────────────────────────────────────────────────────────┐
│                     需求分析流程                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 0: 预算与门禁预检（不可跳过）                            │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │mes-guard-context-│  │mes-verify-phase-gate │                 │
│  │    budget        │  │                  │                 │
│  │──评估上下文预算  │  │──检查进入条件    │                 │
│  │──超限→强制拆分  │  │──不通过→阻止进入 │                 │
│  └──────────────────┘  └──────────────────┘                 │
│  ┌──────────────────┐                                        │
│  │新鲜度预检        │                                        │
│  │──优先读取mes-ai-dev/knowledge/state/summary.md，缺失时回退baseline.md │           │
│  │──对比目标服务变更│                                        │
│  │──过期→强制先刷新 │                                        │
│  └──────────────────┘                                        │
│  ⚠️ 任一检查不通过 = 暂停执行，输出原因和处理建议              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: 需求解析                                            │
│  ┌─────────────┐                                             │
│  │analyze-parse│ ──解析用户需求描述                           │
│  │             │ ──提取功能需求点                             │
│  │             │ ──识别数据需求                               │
│  │             │ ──识别接口需求                               │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate A: Phase 1 输出审查                               │
│  ──执行步骤级门禁                                             │
│  ──未通过 → 打回 Phase 1 重做                                 │
│  ──通过后方可进入 Phase 2                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: 影响分析                                            │
│  ┌─────────────┐                                             │
│  │analyze-impact│ ──分析涉及的服务范围                        │
│  │             │ ──分析涉及的数据库表                         │
│  │             │ ──分析涉及的前端模块                         │
│  │             │ ──识别新增/修改/删除类型                     │
│  │             │ ──识别是否命中业务仓外契约定义源             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate B: Phase 2 输出审查                               │
│  ──执行步骤级门禁                                             │
│  ──未通过 → 打回 Phase 2 重做                                 │
│  ──通过后方可进入 Phase 3/4                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: 迭代差异分析                                        │
│  ┌─────────────┐                                             │
│  │analyze-     │ ──对比新旧需求差异                           │
│  │requirement- │ ──分析是否存在迭代关系                       │
│  │   diff      │ ──识别可复用设计/代码资产                    │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: 仓库影响识别                                        │
│  ┌─────────────┐                                             │
│  │analyze-     │ ──识别确认仓/候选仓/待补证仓                 │
│  │identify-    │ ──识别契约定义仓/能力提供仓/能力消费仓       │
│  │  repos      │ ──评估修改风险与边界                         │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4.5: 业务链 / Provider / 复用判断                     │
│  ┌─────────────┐                                             │
│  │analyze-     │ ──串联业务链/服务链/数据链                   │
│  │trace-flow   │ ──区分技术可达provider/架构允许provider       │
│  │             │ ──判断现有接口复用/扩展/新增路径             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4.8: 探索/提案判断（条件触发）                          │
│  ┌─────────────┐                                             │
│  │exploration  │ ──命中歧义/多方案/结构适配风险时生成           │
│  │proposal     │ ──命中方案取舍/用户确认时生成                 │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate C: Phase 4.8 输出审查                             │
│  ──若命中触发条件但未形成 exploration/proposal → 打回重做      │
│  ──若 exploration/proposal 结论未吸收到 spec → 阻止进入规格生成 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: 规格生成                                            │
│  ┌─────────────┐                                             │
│  │analyze-     │ ──加载需求规格模板                           │
│  │  generate   │ ──生成需求规格文档                           │
│  │             │ ──填充各章节内容                             │
│  │             │ ──生成NFR清单（nfr-checklist.md）            │
│  │             │ ──吸收 exploration/proposal/repo-impact/provider/api-reuse 结论   │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5.5: 歧义收敛+验收标准分级（强制）                     │
│  ┌───────────────────────────┐                               │
│  │ 歧义收敛                  │ ──使用 ambiguity-checklist    │
│  │                           │    模板生成歧义清单            │
│  │                           │ ──所有歧义必须已澄清或已规避  │
│  ├───────────────────────────┤                               │
│  │ 验收标准分级              │ ──使用 acceptance-criteria    │
│  │                           │    -graded 模板               │
│  │                           │ ──P0/P1/P2分级+可测标记       │
│  │                           │ ──依赖外部系统项标注          │
│  ├───────────────────────────┤                               │
│  │ NFR确认                   │ ──确认 nfr-checklist.md       │
│  │                           │    8维度已全部评估             │
│  └───────────────────────────┘                               │
│  ⚠️ 歧义未全部解决 = 阻止进入评审                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate D: Phase 5/5.5 输出审查                           │
│  ──规格文档/歧义/NFR/验收标准必须全部通过                      │
│  ──未通过 → 打回 Phase 5 或 5.5 重做                           │
│  ──通过后方可进入 Phase 6                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 6: 需求评审                                            │
│  ┌─────────────┐                                             │
│  │analyze-     │ ──审核需求完整性                             │
│  │  review     │ ──检查与现有系统一致性                       │
│  │             │ ──验证需求可行性                             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate D: Phase 6 输出审查                               │
│  ──评审不通过 → 打回问题步骤重做                               │
│  ──未闭环不得结束需求分析                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ✅ 需求分析完成
```

## 多Agent并行编排策略

## 关键产物补充

命中多仓 / 跨服务 / 多 provider / 现有接口复用场景时，除 `spec.md` 外，还应形成以下适用产物：

- `repo-impact-list.md`
- `repo-placement-decision.md`
- `business-flow-trace.md`
- `provider-selection.md`
- `api-reuse-decision.md`

`mes-analyze-requirement` 以串行主链为主，但在中段存在明确的独立分析窗口。主控Agent先完成基础解析与影响判断，再将迭代差异分析和仓库影响识别拆分给不同Agent并行处理，最后统一汇总并发起评审。

### 并行机会分析

| Phase | 可并行 | 说明 |
|-------|--------|------|
| Phase 1: 需求解析 | 否 | 基础解析必须先完成 |
| Phase 2: 影响分析 | 否 | 依赖Phase 1的功能点 |
| Phase 3: 迭代差异分析 | ✅ 与Phase 4并行 | 独立对比历史需求 |
| Phase 4: 仓库影响识别 | ✅ 与Phase 3并行 | 独立识别代码仓/Schema/配置 |
| Phase 5: 规格生成 | 否 | 依赖前面所有Phase |
| Phase 6: 需求评审 | 否 | 依赖Phase 5 |

### Agent分配

- Phase 3：委派独立分析Agent执行 `mes-analyze-requirement-diff`，只处理历史需求差异、迭代关系与可复用项
- Phase 4：委派独立分析Agent执行 `mes-analyze-identify-repos`，只处理代码仓、Schema、配置项与风险边界
- Phase 6：由 `mes-review-auditor` Agent执行最终需求评审，避免由生成者自审

### task()调用示例

```python
task(category="deep", load_skills=["mes-analyze-requirement-diff"],
     run_in_background=true,
     prompt="对需求 {REQ-ID} 执行迭代差异分析。\n输入文件: mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md\n历史目录: mes-ai-dev/workspace/requirements/\n输出方式: 按 mes-analyze-requirement-diff 规则将差异分析追加到 raw-requirement.md")

task(category="deep", load_skills=["mes-analyze-identify-repos"],
     run_in_background=true,
     prompt="对需求 {REQ-ID} 执行仓库影响识别。\n输入文件: mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md\n输入文件: mes-ai-dev/workspace/requirements/{REQ-ID}/business-flow-trace.md\n输出方式: 按 mes-analyze-identify-repos 规则将仓库影响清单追加到 raw-requirement.md。")

task(category="deep", load_skills=["mes-analyze-review-spec"],
     run_in_background=true,
     prompt="使用 mes-review-auditor 角色对需求 {REQ-ID} 执行评审。\n待审文件: mes-ai-dev/workspace/requirements/{REQ-ID}/spec.md\n输出文件: mes-ai-dev/workspace/requirements/{REQ-ID}/spec-review-report.md\n审核维度: 完整性、一致性、可实施性。")
```

### 结果合并

- Phase 3 完成后主控Agent从 `raw-requirement.md` 中读取差异分析结果；Phase 4 完成后从 `raw-requirement.md` / `business-flow-trace.md` 读取仓库影响识别结果，并合并进入需求规格文档
- Phase 5 生成规格文档后，再由 `mes-review-auditor` 输出独立审核结论，主控Agent只负责是否返工的编排决策

### 主控汇总与局部失败处理

- Phase 3 / Phase 4 任一成功结果必须保留，不因另一支失败而回滚
- 失败分析支路只重试失败对象，不重做成功分析支路
- 共享需求文件（如 `spec.md`）只允许主控Agent统一写入，不允许并行分析Agent直接覆盖

### 错误处理

- Phase 3 与 Phase 4 任一失败时，只重试对应分析Agent，不影响另一条结果保留
- 若 `mes-review-auditor` 评审不通过，主控Agent根据审核意见修正文档后重新发起Phase 6

## 人工审核门禁

本命令在以下节点**必须等待用户确认**后才能继续。AI不得自动跳过任何门禁。

### 门禁点

| 节点 | 审核内容 | 必须确认的问题 |
|------|---------|--------------|
| Phase 1完成后 | 需求解析结果 | 功能点提取是否完整？理解是否准确？ |
| Phase 2完成后 | 影响范围 | 涉及的服务/模块是否遗漏？ |
| Phase 5完成后 | 需求规格文档 | `spec.md` 是否准确反映业务意图？ |
| Phase 6完成后 | 评审结论 | 是否通过？需要返工哪些部分？ |

### 门禁执行规则

1. 每个门禁点完成后，主控Agent必须**暂停并输出审核摘要**，等待用户明确回复"确认"或"继续"
2. 用户可以回复"确认"继续，或提出修改意见
3. 用户未确认时，不得进入下一阶段
4. 审核摘要应包含：本阶段产出清单、关键决策点、发现的问题

## 阶段完成产物报告要求

需求分析阶段退出前，必须基于正式产物清单生成 `stage-output-report.md` 或等价阶段完成产物报告，至少覆盖：

- `spec.md`
- `impact-scope.md`
- `ambiguity-checklist.md`（若命中歧义收敛）
- `acceptance-criteria-graded.md`（若命中验收标准分级）
- `nfr-checklist.md`
- 迭代差异分析结果（追加到 `raw-requirement.md`，若命中）
- `business-flow-trace.md`（若命中业务流程追踪）
- 仓库影响识别结果（追加到 `raw-requirement.md`，若命中）
- 需求评审报告 / 步骤级门禁记录

报告中必须明确：
- 每个文件的作用
- 哪些文件已生成
- 哪些文件未生成
- 未生成是否因“不适用 / 条件未命中 / 待补证 / 被门禁阻断”等原因
- 未生成是否影响进入设计阶段

## 执行计划模板

执行前需输出计划供用户确认：

```markdown
## 执行计划

**目标**：完成需求分析，生成 OpenSpec 需求规格主文档

**步骤**：
1. 需求解析：解析需求描述，提取功能/数据/接口需求点
2. 影响分析：分析涉及的服务、数据库、前端模块范围
3. 迭代差异分析：**与步骤4并行**，对比历史需求，识别差异与可复用项
4. 仓库影响识别：**与步骤3并行**，识别代码仓、Schema、配置项与风险边界
5. 探索/提案判断：命中歧义、多方案或高风险取舍时，先生成 `exploration.md` / `proposal.md`
6. 规格生成：生成 `spec.md` 需求规格主文档
7. 需求评审：审核完整性和一致性

**预期产出**：
- exploration.md（条件产物：探索、方案比较、边界排查）
- proposal.md（条件产物：推荐方案、取舍理由、待确认决策）
- spec.md（OpenSpec 需求规格主文档）
- ambiguity-checklist.md（歧义收敛清单，强制）
- acceptance-criteria-graded.md（验收标准分级，强制）
- nfr-checklist.md（NFR非功能需求清单，强制）
- raw-requirement.md（含迭代差异与仓库影响识别追加结果）
- business-flow-trace.md（业务流程追踪，若命中）
- spec-review-report.md（需求评审报告）
- spec-review-report.md（阶段详细审查报告，强制）

**风险评估**：
- 需求描述不清晰可能导致分析偏差
- 需要用户确认需求理解是否准确
- 多方案场景若跳过 exploration/proposal，容易把未冻结判断直接写入 spec
```

## 输出目录结构

```
mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/
├── exploration.md              # 条件产物：探索与方案比较
├── proposal.md                 # 条件产物：推荐方案与待确认决策
├── spec.md                      # OpenSpec 需求规格主文档
├── ambiguity-checklist.md       # 歧义收敛清单（强制产物）
├── acceptance-criteria-graded.md # 验收标准分级（强制产物）
├── nfr-checklist.md             # NFR非功能需求清单（强制产物）
├── spec.md                      # OpenSpec 需求规格主文档
└── spec-review-report.md        # 阶段详细审查报告（强制产物）
```

## 注意事项

1. **需求编号**：自动生成 REQ-YYYYMMDD-XXX 格式
2. **迭代识别**：检查 workspace/requirements/ 下是否有相关历史需求
3. **用户确认**：关键理解点需与用户确认
4. **一致性检查**：确保与现有系统不冲突
5. **模板使用**：使用需求规格模板生成 `spec.md`
6. **OpenSpec 收口**：`exploration.md` / `proposal.md` 只能作为条件产物，最终必须收口到 `spec.md`
