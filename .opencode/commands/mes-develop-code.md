---
description: "执行完整代码开发，按任务计划逐步实现"
---
# mes-develop-code

## 功能说明

执行完整的代码开发流程，按照设计文档和任务计划逐步实现代码。当前命令遵循“开发阶段只做实现，不重拍 analyze/design 主决策”的新骨架口径，包括开发规划、数据库开发、各层代码开发、前端开发、配置更新和自评审查多个阶段。

## 使用方式

```
/mes-develop-code
```

**适用场景**：
- 设计完成后，需要开始编码时
- 需要按分层逐步实现后端代码时
- 需要同步开发前端代码时

**前置条件**：
- 详细设计已完成（执行过 `/mes-design-detail`）
- 设计文档已评审通过
- 若需求涉及业务仓外统一响应、错误码、SDK 模型、认证/MQ 契约，应优先确认 `contracts.md` 与对应事实源已可消费
- 若需求涉及多仓、多个 provider 或现有接口复用，应优先确认 analyze/design 已冻结仓级责任边界、provider 选择与复用结论
- 已先生成本轮 `test-cases.md` TDD 用例计划草案，并准备进入用户补充与确认环节

> **开发阶段限边说明**：
> 开发阶段不得重做仓级责任边界、provider 选择、项目私有契约定义、现有接口复用 / 扩展 / 新增主路径。
> 若开发过程中发现以上决策存在冲突或事实不足，必须回流 analyze/design，不得在 develop 阶段直接拍板。
> 相关主定义以 `.opencode/references/mes-ai-reference/rules/phases/phase-develop.md` 与 `.opencode/references/mes-ai-reference/reference/phase-gates/develop.md` 为准。

> **服务链依赖说明**：
> 若设计阶段已冻结服务链与禁止路径，开发阶段只能沿冻结后的主路径实现；不得因为某条路径“技术上可实现”就绕开架构允许路径。
> 服务链冻结与禁止路径的主定义以 `phase-design.md` / `design gate` 为准。

**预期耗时**：根据需求复杂度，可能数小时到数天

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

**图谱/TDD Skill 继承说明**：当本命令编排的 Skill 命中 GitNexus / graphify / TDD 单元测试场景时，默认继承 `.opencode/references/mes-ai-reference/rules/governance/skill-graph-tdd-consumption-standard.md`；图谱能力仅作为证据导航或导读，不替代事实证据、阶段结论或门禁判断；TDD/Mockito/路径兼容规则以该统一标准为准。

**阶段工作目录命名说明**：本命令必须遵循 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`。开发阶段开始前必须复用上游已解析的 `{REQ-ID}`，并重新计算当前输出目录为 `mes-ai-dev/workspace/development/{REQ-ID}/`；不得沿用 `workspace/requirements/{REQ-ID}/` 或 `workspace/designs/{REQ-ID}/` 作为开发产物目录。

**审查报告强制要求**：本命令中的自审、验证证据、门禁审查和相关验收性结论，必须输出详细审查报告；不得退化为摘要式记录、单表格记录或仅问题列表。

**阶段完成产物报告**：
- `/mes-develop-code` 完成后必须输出一份阶段完成产物报告
- 报告必须说明：代码开发阶段标准产物、已生成文件、各文件作用、未生成文件及未生成原因
- 报告未生成或内容不达标，不得通过代码开发阶段退出门禁

**TDD 强制前置**：
- `/mes-develop-code` 在任何代码生成前，必须先调用 `mes-test-plan-cases` 形成 `test-cases.md`
- `test-cases.md` 必须包含：AI 初始测试计划、用户补充区、确认后的最终计划
- 用户未补充并确认前，不得进入数据库、后端或前端代码生成

**测试与覆盖率强制要求**：
- 代码生成后，必须先验证本轮新生成测试用例全部通过
- 随后必须复核本轮生成/修改并纳入验证范围的代码行覆盖率、分支覆盖率和方法覆盖率均达到 100%
- 覆盖率不足时，只允许补充测试用例，不得删除已经生成且验证通过的测试用例

**存量项目结构强制要求**：
- 在存量项目中生成代码前，必须先对齐目标仓既有目录结构、分层模式、命名风格、依赖组织、异常模式和测试组织方式
- 不得为了生成方便在存量项目内另起一套平行结构

**阶段详细审查报告**：
- `/mes-develop-code` 完成后必须输出 `development-review-report.md`
- 落盘目录：`mes-ai-dev/workspace/development/{REQ-ID}/`
- 报告必须满足详细审查报告最小字段集，并包含明确审查时间与完整证据链
- 报告未生成或内容不达标，不得通过代码开发阶段退出门禁

## GSD 执行增强说明

当设计输入已足够支撑核心改动、风险中低、工作单元边界明确时，`/mes-develop-code` 可采用 GSD 模式推进，以“核心改动闭合 + 可验证 + 可提测/可继续”为优先目标。

### 一、何时必须维持 Strict

命中以下情况时必须维持 Strict：

- 关键设计输入缺失
- 高风险数据库/状态模型改动
- 高风险安全修复
- 核心逻辑无法验证
- 当前改动影响范围无法识别

### 二、工作单元 DoD 原则

开发阶段必须以工作单元 DoD 驱动推进，而不能只以“代码已修改”作为完成依据。

每个工作单元至少要明确：

- 完整完成条件
- GSD 完成条件
- 不完成条件
- 可后补项
- 验证方式
- 是否严格遵循 analyze/design 已冻结的仓边界、provider 与契约结论

### 三、最小可提测标准

开发阶段的最小可提测结果至少应满足：

- 核心改动已闭合
- 影响范围已登记
- 验证方式已明确
- blocker 未命中硬阻塞
- 风险与后补动作已记录
- 已完成收尾扫描

### 四、blocker 规则

开发阶段 blocker 需重点判断：

- 是否阻碍形成闭合改动
- 是否阻碍形成最小可提测结果
- 是否只阻碍完整交付但不阻碍继续推进

### 五、GSD Continue Exit 条件

开发阶段进入 GSD Continue Exit 至少必须满足：

1. 核心改动已闭合
2. 影响范围已记录
3. 验证方式已说明
4. blocker 未命中硬阻塞
5. 风险与后补动作已记录
6. 当前结果已达到可提测或可继续开发状态
7. 已完成收尾扫描

### 六、Completion Sweep

开发结束前至少检查：

- 改动是否闭合
- 引用/说明/日志是否同步
- blocker 是否关闭或转移
- 风险与后补动作是否明确
- refresh hints / 测试建议 / 下一步建议是否明确

### 七、输出要求

本命令的最终输出至少应包含：

- 当前模式
- 当前开发目标
- 工作单元 DoD 状态
- blocker 状态
- 当前是否可提测
- 风险说明
- 后补动作
- 推荐下一步

### 九、关键约束补充

- `tasks.md` 只能拆执行任务，不得重定义仓边界、provider 选择或私有契约；历史 `task-plan.md` 仅为兼容别名
- 若设计已明确“必须复用现有接口”，开发阶段不得默认重造平行接口
- 若设计已明确“禁止路径”，开发阶段不得以局部实现便利为由绕开
- 若发现设计输入与真实代码冲突，应记录冲突并回流，不得私自修订上游结论

### 八、模板绑定说明

- 命中 blocker 时，应使用 `.opencode/references/mes-ai-reference/templates/governance/blocker-record-template.md` 记录开发 blocker 分类与推进判定
- 以 GSD Continue Exit 继续时，应使用 `.opencode/references/mes-ai-reference/templates/governance/minimum-deliverable-template.md` 说明最小可提测结果
- 工作单元完成状态，应映射到 `.opencode/references/mes-ai-reference/templates/governance/definition-of-done-template.md` 的 GSD 完成定义
- 开发阶段结束前，应使用 `.opencode/references/mes-ai-reference/templates/governance/completion-sweep-template.md` 执行收尾扫描
- 若需独立输出下一步建议，应使用 `.opencode/references/mes-ai-reference/templates/governance/next-step-recommendation-template.md`

## 编排流程

```
┌─────────────────────────────────────────────────────────────┐
│                     代码开发流程                              │
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
│  │──优先读取state/summary.md，缺失时回退baseline.md │           │
│  │──对比目标服务变更│                                        │
│  │──过期→强制先刷新 │                                        │
│  └──────────────────┘                                        │
│  ⚠️ 任一检查不通过 = 暂停执行，输出原因和处理建议              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: 开发规划                                            │
│  ┌─────────────┐                                             │
│  │develop-plan │ ──读取设计文档                               │
│  │             │ ──生成任务拆分                               │
│  │             │ ──确定开发顺序                               │
│  │             │ ──不得重拍仓边界/provider/复用主路径         │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate A: Phase 1 输出审查                               │
│  ──任务拆分不完整/不可执行 → 打回 Phase 1 重做                  │
│  ──若 tasks 重定义仓边界/provider/复用主路径 → 打回 Phase 1 重做 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1.5: TDD 用例计划（强制）                              │
│  ┌─────────────┐                                             │
│  │test-plan    │ ──生成 `test-cases.md`                      │
│  │  -cases     │ ──写入 AI 初始测试计划                        │
│  │             │ ──预留用户补充区                              │
│  │             │ ──等待用户确认最终计划                        │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate B: Phase 1.5 输出审查                              │
│  ──未形成 `test-cases.md` / 无用户补充区 / 未确认 → 阻止进入代码生成 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: 数据库开发                                          │
│  ┌─────────────┐                                             │
│  │develop-db   │ ──生成DDL脚本                                │
│  │             │ ──执行数据库变更                             │
│  │             │ ──验证数据结构                               │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate C: Phase 2 输出审查                               │
│  ──DDL/结构验证未通过 → 打回 Phase 2 重做                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: 后端分层开发                                        │
│  ┌─────────────┐                                             │
│  │develop-     │ ──生成Entity/DTO/VO                         │
│  │  model      │                                             │
│  └─────────────┘                                             │
│              │                                               │
│              ▼                                               │
│  ┌─────────────┐                                             │
│  │develop-     │ ──生成Mapper/DAO                            │
│  │   dao       │                                             │
│  └─────────────┘                                             │
│              │                                               │
│              ▼                                               │
│  ┌─────────────┐                                             │
│  │develop-     │ ──生成Service接口和实现                      │
│  │  service    │                                             │
│  └─────────────┘                                             │
│              │                                               │
│              ▼                                               │
│  ┌─────────────┐                                             │
│  │develop-     │ ──生成Controller                            │
│  │ controller  │                                             │
│  └─────────────┘                                             │
│              │                                               │
│              ▼                                               │
│  ┌─────────────┐                                             │
│  │develop-     │ ──更新配置文件                               │
│  │   config    │                                             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate D: Phase 3 输出审查                               │
│  ──后端代码未通过 → 仅打回问题服务/步骤                         │
│  ──若实现绕开冻结服务链/禁止路径/既有复用结论 → 打回对应步骤重做 │
│  ──通过后方可进入前端收尾/统一审查                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 4: 前端开发                                            │
│  ┌─────────────┐                                             │
│  │develop-     │ ──生成API调用层                              │
│  │  fe-api     │                                             │
│  └─────────────┘                                             │
│              │                                               │
│              ▼                                               │
│  ┌─────────────┐                                             │
│  │develop-     │ ──生成Vue组件                                │
│  │fe-component │                                             │
│  └─────────────┘                                             │
│              │                                               │
│              ▼                                               │
│  ┌─────────────┐                                             │
│  │develop-     │ ──生成页面和路由                             │
│  │  fe-page    │                                             │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate E: Phase 4 输出审查                               │
│  ──前后端不对齐/前端未通过 → 打回 Phase 4 重做                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5: 自评审查                                            │
│  ┌─────────────┐                                             │
│  │develop-     │ ──代码质量审查                               │
│  │self-review  │ ──功能完整性检查                             │
│  │             │ ──一致性验证                                 │
│  │             │ ──TDD 全绿 + 覆盖率 100% 校验                 │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 5.5: 变更影响汇总+证据化验证+刷新提示（强制）           │
│  ┌───────────────────────────┐                               │
│  │ 变更影响台账              │ ──使用 impact-ledger-template │
│  │ (impact-ledger.md)        │ ──汇总改了哪些服务/表/接口    │
│  │                           │ ──标记影响链路和测试范围      │
│  ├───────────────────────────┤                               │
│  │ 验证证据收集              │ ──使用 verification-evidence  │
│  │ (verification-evidence.md)│    -template                 │
│  │                           │ ──编译结果+静态检查+单证+smoke│
│  ├───────────────────────────┤                               │
│  │ 知识库刷新提示            │ ──使用 refresh-hints-template│
│  │ (refresh-hints.md)        │ ──需更新的code-map/registry  │
│  │                           │ ──按优先级排列刷新项          │
│  └───────────────────────────┘                               │
│  ⚠️ 编译不通过 / 新生成测试未全绿 / 覆盖率未达 100% = 阻止退出开发阶段 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate F: Phase 5/5.5 输出审查                           │
│  ──审核/证据/影响台账未通过 → 打回对应问题步骤重做              │
│  ──未闭环不得结束代码开发                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ✅ 代码开发完成
```

## 多Agent并行编排策略

## 关键产物补充

开发阶段除 `tasks.md`、代码产物、自审报告外，还必须能够引用并对齐以下上游产物（如命中场景）：

- `repo-impact-list.md`
- `repo-placement-decision.md`
- `provider-selection.md`
- `api-reuse-decision.md`
- `service-chain-design.md`
- `cross-service-consistency.md`
- `architecture-boundary-decision.md`

若命中业务仓外契约场景，还应显式引用：

- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/contracts.md`
- `api-conventions.md`
- `error-code-registry.md`

`mes-develop-code` 的核心是按任务拆分执行开发工作。主控Agent先完成开发规划与数据库前置处理，再将后端服务、前端模块和审核任务拆成独立工作单元，通过锁机制和结果回收机制保证并行开发可控。

### 并行机会分析

| Phase | 可并行 | 说明 |
|-------|--------|------|
| Phase 1: 开发规划 | 否 | 必须先完成任务拆分 |
| Phase 2: 数据库开发 | 否 | 后端开发的前置条件 |
| Phase 3: 后端分层开发 | ✅ 多服务并行 | 不同服务可由不同Agent并行开发 |
| Phase 4: 前端开发 | ✅ 与Phase 3并行 | 前后端可并行（前提：API设计已确定） |
| Phase 5: 自评审查 | ✅ 多维度并行 | 不同审核维度可并行 |

### Agent分配

- Phase 3：多个 `mes-backend-developer` Agent并行开发不同服务，每个Agent只负责一个服务或一个独立服务组
- Phase 4：委派 `mes-frontend-developer` Agent并行处理前端 API、组件、页面与路由
- Phase 5：多个 `mes-review-auditor` Agent按代码质量、安全性、实现一致性等维度并行审查

### task()调用示例

```python
task(category="deep", load_skills=["mes-develop-backend-model", "mes-develop-backend-dao", "mes-develop-backend-service", "mes-develop-backend-controller", "mes-develop-backend-config"],
     run_in_background=true,
     prompt="使用 mes-backend-developer 角色开发服务 {service-name}。\n需求编号: {REQ-ID}\n设计文档: mes-ai-dev/workspace/designs/{REQ-ID}/design.md\n目标源码: jalor/{service-path}/src/main/java/\n锁文件: mes-ai-dev/workspace/locks/{service-name}.lock\n要求: 开发前先检查并获取锁，完成后写入 mes-ai-dev/workspace/development/{REQ-ID}/{service-name}-completion.md。")

task(category="visual-engineering", load_skills=["mes-develop-frontend-api", "mes-develop-frontend-component", "mes-develop-frontend-page"],
     run_in_background=true,
     prompt="使用 mes-frontend-developer 角色开发前端模块。\n需求编号: {REQ-ID}\n设计文档: mes-ai-dev/workspace/designs/{REQ-ID}/design.md\nAPI设计: mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md\n输出标记: mes-ai-dev/workspace/development/{REQ-ID}/frontend-completion.md")

task(category="deep", load_skills=["mes-develop-self-review"],
     run_in_background=true,
     prompt="使用 mes-review-auditor 角色执行代码质量审查。\n待审范围: mes-ai-dev/workspace/development/{REQ-ID}/\n输出文件: mes-ai-dev/workspace/development/{REQ-ID}/self-review-report.md")

task(category="deep", load_skills=["mes-develop-security-review"],
     run_in_background=true,
     prompt="使用 mes-review-auditor 角色执行安全审查。\n待审范围: mes-ai-dev/workspace/development/{REQ-ID}/\n输出文件: mes-ai-dev/workspace/development/{REQ-ID}/security-review-report.md")
```

### 结果合并

- 主控Agent在Phase 3结束后汇总全部 `{service-name}-completion.md`，确认后端服务是否全部完成
- Phase 4 完成后校验 `frontend-completion.md` 与后端接口清单是否一致，再进入统一审查
- Phase 5 收集所有 `mes-review-auditor` 审核报告，形成最终自评结论和返工清单
- Phase 5.5 汇总本轮新生成测试用例结果、覆盖率结果与 `tasks.md`

### 共享文件与局部成功规则

- `impact-ledger.md`、`verification-evidence.md`、`refresh-hints.md` 等汇总文件只允许主控Agent串行写入
- 单个服务开发成功时，必须保留对应 `{service-name}-completion.md`，不得因其他服务失败而回滚
- 前端完成标记 `frontend-completion.md` 成功时必须保留，只重试失败对象

### 错误处理

- 锁机制：开发前先检查 `mes-ai-dev/workspace/locks/`，若目标服务已被占用，则等待、跳过或改派其他服务
- 失败隔离：单个 `mes-backend-developer` 或 `mes-frontend-developer` Agent失败时，不影响其他并行任务继续执行
- 定向重试：失败服务仅重试对应Agent；已通过审核的服务和前端模块不重复开发
- 审核返工：某个 `mes-review-auditor` 发现问题时，只对对应范围触发修复Agent，不回滚全部开发任务

## 人工审核门禁

本命令在以下节点**必须等待用户确认**后才能继续。AI不得自动跳过任何门禁。

### 门禁点

| 节点 | 审核内容 | 必须确认的问题 |
|------|---------|--------------|
| Phase 1完成后 | 任务拆分计划 | 开发顺序是否合理？任务划分是否完整？ |
| Phase 1.5完成后 | TDD 用例计划 | 用户补充是否已吸收？是否确认可进入代码生成？ |
| Phase 2完成后 | 数据库变更脚本 | DDL是否安全？是否影响现有数据？ |
| Phase 3完成后 | 后端代码 | 代码风格是否一致？业务逻辑是否正确？ |
| Phase 4完成后 | 前端代码 | 前后端接口是否对齐？组件复用是否合理？ |
| Phase 5/5.5完成后 | 审核结论 | 新生成测试用例是否全绿？覆盖率是否 100%？是否需要修复哪些问题？ |

### 门禁执行规则

1. 每个门禁点完成后，主控Agent必须**暂停并输出审核摘要**，等待用户明确回复"确认"或"继续"
2. 用户可以回复"确认"继续，或提出修改意见
3. 用户未确认时，不得进入下一阶段
4. 审核摘要应包含：本阶段产出清单、关键决策点、发现的问题

## 阶段完成产物报告要求

代码开发阶段退出前，必须基于正式产物清单生成 `stage-output-report.md` 或等价阶段完成产物报告，至少覆盖：

- `tasks.md`
- `test-cases.md`
- 数据库变更脚本 / DDL 产物（若命中数据库开发）
- 后端代码产出（按服务或目录范围说明）
- 前端代码产出（按模块或目录范围说明）
- `self-review-report.md`
- `security-review-report.md`（若命中安全审查）
- `impact-ledger.md`
- `verification-evidence.md`
- `refresh-hints.md`
- `tasks.md`
- 安全审查 / 质量审查报告（若命中并行审核）
- 步骤级门禁记录

报告中必须明确：
- 每个文件或产物组的作用
- 哪些文件已生成
- 哪些文件未生成
- 未生成是否因“不适用 / 条件未命中 / 由后续测试或交付阶段承接 / 待补证 / 被门禁阻断”等原因
- 未生成是否影响进入测试阶段

## 执行计划模板

执行前需输出计划供用户确认：

```markdown
## 执行计划

**目标**：完成代码开发，实现设计文档中的功能

**步骤**：
1. 开发规划：读取设计文档，生成任务拆分
2. TDD 用例计划：先生成 `test-cases.md`，等待用户补充并确认
3. 数据库开发：生成DDL脚本，执行数据库变更
4. 后端分层开发：**多Agent并行**，每个服务一个Agent（需检查锁）
5. 前端开发：**与步骤4并行**，API层 → 组件 → 页面
6. 自评审查：**多维度并行**审核（代码质量 + 安全）
7. 验证闭环：确认新生成测试用例全绿、覆盖率 100%、交接文档完成

**预期产出**：
- tasks.md（开发任务主文档，OpenSpec）
- test-cases.md（TDD 用例计划，含用户补充区和确认结论）
- DDL脚本（数据库变更）
- 后端代码（Entity/DTO/Service/Controller等）
- 前端代码（API/组件/页面）
- 审核报告
- impact-ledger.md（变更影响台账，强制）
- verification-evidence.md（验证证据，强制）
- refresh-hints.md（知识库刷新提示，强制）
- tasks.md（阶段主交接文档，强制）
- development-review-report.md（阶段详细审查报告，强制）

**风险评估**：
- 用户补充未确认前不得进入代码生成
- 数据库变更需谨慎执行
- 多服务并行需确保锁机制生效
- 前后端并行需确保API设计已确定
- 覆盖率不足时只能补测，不得删测
```

## 输出目录结构

```
mes-ai-dev/workspace/development/REQ-YYYYMMDD-XXX/
├── tasks.md                    # 开发任务主文档（OpenSpec）
├── test-cases.md               # TDD 用例计划（用户补充+确认）
├── ddl-scripts/                # 数据库脚本
│   ├── create_tables.sql
│   ├── alter_tables.sql
│   └── create_indexes.sql
├── self-review-report.md       # 自评报告
├── security-review-report.md   # 安全审查报告（若命中）
└── development-review-report.md # 阶段详细审查报告（强制产物）

jalor/xxx-service/src/main/java/com/xxx/
├── entity/                     # 新增Entity
├── dto/                        # 新增DTO
├── service/                    # 新增Service
├── controller/                 # 新增Controller

web/src/
├── api/xxx.js                  # 新增API调用
├── components/xxx/             # 新增组件
└── views/xxx/                  # 新增页面
```

## 注意事项

1. **分层顺序**：按 Model → DAO → Service → Controller 顺序开发
2. **前后端并行**：后端Controller完成后可并行开发前端
3. **数据库先执行**：数据库变更需先执行，确保数据结构就绪
4. **代码风格**：遵循现有代码风格和命名规范
5. **自评必须**：开发完成后必须进行自评审查
6. **先测后码**：用户未确认 `test-cases.md` 前不得进入代码生成
7. **覆盖率闭环**：本轮新增/修改代码覆盖率不足 100% 时，只能补充测试用例
