---
description: "执行完整详细设计，从需求规格到设计文档"
---
# mes-design-detail

## 功能说明

执行完整的详细设计流程，将需求规格转化为技术设计文档。当前命令已按新骨架口径扩展为：方案设计、数据库设计、接口设计、前端设计、服务调用链设计、跨服务一致性与边界冻结、文档生成和设计评审。

## 使用方式

```
/mes-design-detail
```

**适用场景**：
- 需求分析完成后，需要进行技术设计时
- 需要确定数据库结构、接口定义、前端方案时

**前置条件**：
- 需求分析已完成（执行过 `/mes-analyze-requirement`）
- 需求规格文档已生成
- 若需求涉及业务仓外统一响应、错误码、SDK 模型、认证/MQ 契约，应优先确认 `contracts.md` 与对应契约事实源已可消费

> **全仓视角依赖说明**：
> 若本次设计依赖全仓级的服务依赖图、热点层或跨仓一致性判断，应优先确认已完成 `/mes-init-converge`；否则仅能基于局部初始化结果设计，并需显式记录边界与风险。

> **服务链冻结说明**：
> 若存在多个候选 provider、多个仓落点或现有接口复用路径，设计阶段必须冻结最终服务链、provider 选择理由、禁止路径与复用优先结论。
> 相关主定义以以下文件为准：
> - `.opencode/references/mes-ai-reference/rules/phases/phase-design.md`
> - `.opencode/references/mes-ai-reference/reference/phase-gates/design.md`
> - `.opencode/references/mes-ai-reference/rules/scenarios/scenario-multi-repo.md`
> 本命令只负责要求这些结果必须形成，不再重复完整展开其原理定义。

**预期耗时**：约15-25分钟

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

**图谱/TDD Skill 继承说明**：当本命令编排的 Skill 命中 GitNexus / graphify / TDD 单元测试场景时，默认继承 `.opencode/references/mes-ai-reference/rules/governance/skill-graph-tdd-consumption-standard.md`；图谱能力仅作为证据导航或导读，不替代事实证据、阶段结论或门禁判断；TDD/Mockito/路径兼容规则以该统一标准为准。

**阶段工作目录命名说明**：本命令必须遵循 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`。执行前先从用户输入、`workspace/requirements/{REQ-ID}/spec.md` 或上游交接材料解析 `{REQ-ID}`：`US[0-9]+` 优先，`ITRQ[0-9]+` 次之，无编号时才生成 `REQ-YYYYMMDD-{序号}`。详细设计阶段只能读取 `mes-ai-dev/workspace/requirements/{REQ-ID}/` 作为需求输入，所有设计产物必须写入 `mes-ai-dev/workspace/designs/{REQ-ID}/`，禁止写入需求目录。

**审查报告强制要求**：本命令中的设计评审、跨步骤门禁与阶段出口结论，均必须形成详细审查报告；不得仅记录“通过/不通过”或简略评审意见。详细审查报告结构必须符合 `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`，若使用场景模板，再以 `.opencode/references/mes-ai-reference/templates/governance/detailed-review-report-template.md` 作为落盘载体。

**阶段详细审查报告**：
- `/mes-design-detail` 完成后必须输出 `design-review-report.md`
- 落盘目录：`mes-ai-dev/workspace/designs/{REQ-ID}/`
- 报告必须满足详细审查报告最小字段集，并包含明确审查时间与完整证据链
- 报告未生成或内容不达标，不得通过详细设计阶段退出门禁

## GSD 执行增强说明

当核心方案主路径明确、关键变更点明确、下游开发已可消费时，`/mes-design-detail` 可采用 GSD 模式，以最小设计包支撑开发阶段继续推进。

### 一、何时必须维持 Strict

命中以下情况时必须维持 Strict：

- 核心方案未明确
- 关键接口/数据边界不明确
- 跨仓职责边界无法判断
- 核心设计结果无法供开发消费
- 数据库或状态模型风险未评估

### 二、最小设计包定义

最小设计包至少包含：

- 方案主路径
- 关键变更点
- 核心接口/模型边界
- blocker 状态
- 风险说明
- 开发可先推进项
- 后补动作
- 推荐下一步

### 三、可并行开发识别要求

GSD 模式下，设计阶段必须显式识别：

- 哪些模块可立即开发
- 哪些模块必须等待确认
- 哪些模块可用 Mock/草案先推进
- 哪些项虽未完整，但不阻断开发主路径

### 四、blocker 规则

设计阶段 blocker 需重点区分：

- 阻断开发的 blocker
- 不阻断开发但影响完整性的 blocker
- 只影响增强设计质量、不影响当前推进的 blocker

### 五、GSD Continue Exit 条件

设计阶段进入 GSD Continue Exit 至少必须满足：

1. 核心方案主路径明确
2. 关键变更点明确
3. 下游开发可消费
4. blocker 已分类并记录
5. 风险与后补动作已记录
6. 开发可先推进项已明确
7. 已完成收尾扫描

### 六、Completion Sweep

设计结束前至少检查：

- 开发是否已具备可消费输入
- 是否存在“写了很多但开发其实没法继续”的假完成状态
- 是否已明确需等待确认项与可并行推进项
- 是否已明确推荐下一步

### 七、输出要求

本命令的最终输出至少应包含：

- 当前模式
- 当前设计目标
- 最小设计包状态
- blocker 状态
- 开发可先推进项
- 后补动作
- 推荐下一步

### 八、模板绑定说明

- 命中 blocker 时，应使用 `.opencode/references/mes-ai-reference/templates/governance/blocker-record-template.md` 记录设计 blocker 分类与处理路径
- 以 GSD Continue Exit 继续时，应使用 `.opencode/references/mes-ai-reference/templates/governance/minimum-deliverable-template.md` 说明最小设计包
- 当前设计完成状态，应映射到 `.opencode/references/mes-ai-reference/templates/governance/definition-of-done-template.md` 的 GSD 完成定义
- 设计阶段结束前，应使用 `.opencode/references/mes-ai-reference/templates/governance/completion-sweep-template.md` 执行收尾扫描
- 若需独立输出下一步建议，应使用 `.opencode/references/mes-ai-reference/templates/governance/next-step-recommendation-template.md`

## 编排流程

```
┌─────────────────────────────────────────────────────────────┐
│                     详细设计流程                              │
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
│  Phase 1: 方案设计                                            │
│  ┌─────────────┐                                             │
│  │design-      │ ──确定整体技术方案                           │
│  │  approach   │ ──选择技术实现路径                           │
│  │             │ ──评估方案可行性                             │
│  │             │ ──安全设计点输出（权限变更/脱敏/审计字段/越权）│
│  │             │ ──ADR触发判断（5种场景必须出ADR）            │
│  └─────────────┘                                             │
│  ADR强制触发场景：                                            │
│    ☐ 跨服务改动                                              │
│    ☐ 引入新表                                                │
│    ☐ 接口兼容变更                                            │
│    ☐ 权限模型变更                                            │
│    ☐ 性能方案取舍                                            │
│  任一命中 → 必须生成 adr-{序号}-*.md                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate A: Phase 1 输出审查                               │
│  ──方案/ADR/安全设计点必须通过                                 │
│  ──未通过 → 打回 Phase 1 重做                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: 并行设计                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │design-      │  │design-      │  │design-      │          │
│  │  database   │  │    api      │  │  frontend   │          │
│  │ 数据库设计  │  │ 接口设计    │  │ 前端设计    │          │
│  │             │  │             │  │             │          │
│  │ -表结构     │  │ -API定义   │  │ -页面布局  │          │
│  │ -字段设计  │  │ -参数设计  │  │ -组件设计  │          │
│  │ -索引设计  │  │ -响应设计  │  │ -交互设计  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│  ┌───────────────────────────────────────────┐               │
│  │ 兼容性设计（如触发条件命中）                │               │
│  │ ──使用 compatibility-design-template       │               │
│  │ ──老接口/老页面/老数据/旧脚本/多版本兼容   │               │
│  └───────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate B: Phase 2 输出审查                               │
│  ──DB/API/前端设计一致性校验                                   │
│  ──未通过 → 仅打回问题分支或当前阶段重做                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: 服务调用链                                          │
│  ┌─────────────┐                                             │
│  │design-      │ ──设计服务间调用关系                         │
│  │service-chain│ ──设计数据流转路径                           │
│  │             │ ──设计事务边界                               │
│  │             │ ──冻结最终服务链与 provider 选择             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3.2: 跨服务一致性与边界冻结                            │
│  ┌─────────────┐                                             │
│  │design-check │ ──校验跨服务一致性                           │
│  │consistency  │ ──记录禁止路径与架构边界决策                 │
│  │             │ ──确认复用优先与兼容边界                     │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3.5: 回归范围+性能影响+可观测性（强制）                 │
│  ┌───────────────────────────┐                               │
│  │ 回归影响范围              │ ──必回归链路                   │
│  │ (design-regression-scope) │ ──高风险服务                   │
│  │                           │ ──必冒烟页面                   │
│  ├───────────────────────────┤                               │
│  │ 性能影响分析              │ ──热表索引分析                 │
│  │(design-performance-impact)│ ──查询分页分析                 │
│  │                           │ ──写路径放大分析               │
│  │                           │ ──批处理影响                   │
│  │                           │ ──OEE/SPC/追溯影响            │
│  ├───────────────────────────┤                               │
│  │ 可观测性设计              │ ──日志点设计                   │
│  │ (design-observability)    │ ──审计点设计                   │
│  │                           │ ──指标点设计                   │
│  │                           │ ──告警点设计                   │
│  │ "上线后看得见"            │                               │
│  └───────────────────────────┘                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate C: Phase 3/3.5 输出审查                           │
│  ──调用链/边界冻结/回归范围/性能/可观测性必须可消费               │
│  ──未通过 → 打回对应步骤重做                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: 文档生成                                            │
│  ┌─────────────┐                                             │
│  │design-      │ ──加载设计文档模板                           │
│  │generate-doc │ ──整合各部分设计                             │
│  │             │ ──生成设计文档                               │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate D: Phase 4 输出审查                               │
│  ──设计文档不完整/不一致 → 打回 Phase 4 重做                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: 设计评审                                            │
│  ┌─────────────┐                                             │
│  │design-      │ ──审核设计完整性                             │
│  │review-      │ ──检查设计一致性                             │
│  │approach     │ ──验证设计可行性                             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate E: Phase 5 输出审查                               │
│  ──评审不通过 → 打回问题步骤重做                               │
│  ──未闭环不得结束设计阶段                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ✅ 详细设计完成
```

## 多Agent并行编排策略

## 关键产物补充

命中多仓 / 多 provider / 现有接口复用 / 业务仓外契约场景时，除 `design.md` 外，还应形成以下适用产物：

- `service-chain-design.md`
- `cross-service-consistency.md`
- `architecture-boundary-decision.md`

若设计涉及项目私有契约，还应显式引用 `contracts.md`、`api-conventions.md`、`error-code-registry.md` 或对应事实源，不得仅凭接口表象补写协议结构。

| Phase | 可并行 | 说明 |
|-------|--------|------|
| Phase 1: 方案设计 | 否 | 基础方案必须先确定 |
| Phase 2: 并行设计 | ✅ 三路并行 | 数据库设计、接口设计、前端设计可并行 |
| Phase 3: 服务调用链 | 否 | 依赖Phase 2的产出 |
| Phase 4: 文档生成 | 否 | 依赖前面所有Phase |
| Phase 5: 设计评审 | ✅ 多维度并行 | 完整性、一致性、可行性可并行审核 |

Agent分配:
- Phase 2: 3个Agent并行 — mes-design-database, mes-design-api, mes-design-frontend
- Phase 5: mes-review-auditor Agent审核

task()调用示例:

```
task(category="deep", load_skills=["mes-design-database"], run_in_background=true,
     prompt="设计数据库结构。\n需求文档: workspace/requirements/{REQ-ID}/spec.md\n输出: workspace/designs/{REQ-ID}/database-design.md")

task(category="deep", load_skills=["mes-design-api"], run_in_background=true,
     prompt="设计接口。\n需求文档: workspace/requirements/{REQ-ID}/spec.md\n输出: workspace/designs/{REQ-ID}/api-design.md")

task(category="visual-engineering", load_skills=["mes-design-frontend"], run_in_background=true,
     prompt="设计前端方案。\n需求文档: workspace/requirements/{REQ-ID}/spec.md\n输出: workspace/designs/{REQ-ID}/frontend-design.md")
```

结果合并:
- 主控Agent读取3个设计文档，检查一致性（数据库字段与API参数对齐、API路径与前端调用对齐），合并生成 `design.md`

共享文件规则:
- `design.md`、`design-regression-scope.md`、`design-performance-impact.md` 等总设计文件只允许主控Agent串行汇总写入
- Phase 2 并行Agent只输出各自局部设计文件，不直接覆盖总设计文件

错误处理:
- 任一设计失败可单独重试
- 已成功的数据库/API/前端设计结果必须保留，不因单路失败回滚全部设计

## 人工审核门禁

本命令在以下节点**必须等待用户确认**后才能继续。AI不得自动跳过任何门禁。

### 门禁点

| 节点 | 审核内容 | 必须确认的问题 |
|------|---------|--------------|
| Phase 1完成后 | 技术方案 | 方案是否可行？架构选型是否合理？ |
| Phase 2完成后 | 三路设计产出 | DB/API/前端设计是否一致？ |
| Phase 4完成后 | 完整设计文档 | 设计是否完整覆盖需求？ |
| Phase 5完成后 | 设计评审结论 | 是否通过？需要修改哪些部分？ |

### 门禁执行规则

1. 每个门禁点完成后，主控Agent必须**暂停并输出审核摘要**，等待用户明确回复"确认"或"继续"
2. 用户可以回复"确认"继续，或提出修改意见
3. 用户未确认时，不得进入下一阶段
4. 审核摘要应包含：本阶段产出清单、关键决策点、发现的问题

## 阶段完成产物报告要求

详细设计阶段退出前，必须基于正式产物清单生成 `stage-output-report.md` 或等价阶段完成产物报告，至少覆盖：

- `design.md`
- `tech-approach.md`
- `database-design.md`
- `api-design.md`
- `frontend-design.md`
- `service-chain-design.md`
- `design-regression-scope.md`
- `design-performance-impact.md`
- `design-observability.md`
- `compatibility-design.md`（若命中兼容性设计条件）
- `adr-{序号}-*.md`（若命中 ADR 触发条件）
- 设计评审报告 / 步骤级门禁记录

报告中必须明确：
- 每个文件的作用
- 哪些文件已生成
- 哪些文件未生成
- 未生成是否因“不适用 / 条件未命中 / 待补证 / 被门禁阻断”等原因
- 未生成是否影响进入开发阶段

## 执行计划模板

执行前需输出计划供用户确认：

```markdown
## 执行计划

**目标**：完成详细设计，生成 OpenSpec 设计主文档

**步骤**：
1. 方案设计：确定整体技术方案和实现路径
2. 并行设计：**三Agent并行**——数据库设计、接口设计、前端设计
3. 服务调用链：设计服务间调用关系和数据流转
4. 文档生成：整合设计内容，生成 `design.md` 设计主文档
5. 设计评审：**多维度并行**审核完整性、一致性、可行性

**预期产出**：
- design.md（OpenSpec 设计主文档）
- tech-approach.md（技术方案中间产物）
- database-design.md（数据库设计）
- api-design.md（接口设计）
- frontend-design.md（前端设计）
- service-chain-design.md（服务调用链设计中间产物）
- adr-{序号}-*.md（架构决策记录，触发场景时强制）
- compatibility-design.md（兼容性设计，触发条件命中时强制）
- design-regression-scope.md（回归影响范围，强制）
- design-performance-impact.md（性能影响分析，涉及DB/接口变更时强制）
- design-observability.md（可观测性设计，新功能/新接口/状态流转时强制）
- design-review-report.md（阶段详细审查报告，强制）

**风险评估**：
- 数据库设计可能涉及现有表结构变更
- 接口设计需考虑前后端对齐
- 三路并行设计需确保一致性
```

## 输出目录结构

```
mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/
├── design.md                   # OpenSpec 设计主文档
├── tech-approach.md            # 技术方案中间产物
├── database-design.md          # 数据库设计（可选）
├── api-design.md               # 接口设计（可选）
├── frontend-design.md          # 前端设计（可选）
├── service-chain-design.md     # 服务调用链设计中间产物
├── adr-{序号}-{标题}.md        # ADR（触发时强制）
├── compatibility-design.md     # 兼容性设计（触发时强制）
├── design-regression-scope.md  # 回归影响范围（强制）
├── design-performance-impact.md # 性能影响分析（涉及DB/接口时强制）
├── design-observability.md     # 可观测性设计（新功能/状态流转时强制）
└── design-review-report.md     # 阶段详细审查报告（强制产物）
```

## 注意事项

1. **并行设计**：Phase 2 三部分设计可并行执行
2. **模板使用**：使用相应模板生成各部分文档
3. **一致性对齐**：确保数据库、接口、前端设计相互一致
4. **服务边界**：明确服务间调用边界和事务边界
5. **设计评审**：必须通过评审才能进入开发阶段
6. **OpenSpec 命名**：阶段主交接文档固定为 `design.md`
