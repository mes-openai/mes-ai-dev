---
title: 发布交付阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - deliver
trigger:
  - deliver
  - release
cost_level: medium
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/deliver.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/stage-memory.md
---

# 发布交付阶段规则（phase-deliver）

> 本文件是交付阶段的最小加载包，优先服务于阶段路由、最小消费边界与进入/退出判断。
> 详细交付步骤、交付判断与技能入口见：`.opencode/references/mes-ai-reference/rules/phases/phase-deliver-detail.md`

## 默认加载卡

### 必载
- `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`
- `.opencode/references/mes-ai-reference/rules/core/agent-core.md`
- `.opencode/references/mes-ai-reference/rules/core/completion-baseline.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-deliver.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/deliver.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/convergence.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/stage-memory.md`
- `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`
- `.opencode/references/mes-ai-reference/rules/governance/stage-artifact-layout.md`
- `.opencode/references/mes-ai-reference/rules/governance/completion-sweep-standard.md`

### 按需加载
- `.opencode/references/mes-ai-reference/rules/environment-governance.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-db-migration.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-multi-repo.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-high-risk-release.md`

### 默认不加载
- 非当前阶段门禁分片
- 与当前交付范围无关的 code-map detail / database-index 深化正文
- 模板正文与低频重型治理全文

### 预算提示
- 骨架自加载优先控制在 9K token 左右；仅在确实需要部署/回滚判断时再读取环境治理全文

## 一、阶段目标
将已完成设计、开发、测试并具备基本交付条件的结果，转化为可执行的发布动作、可审查的验收结论和可恢复的交接状态。

## 二、进入条件
- 当前存在明确交付对象
- 已具备最小交付输入：测试结论、关键产物、风险与 blocker 状态
- 当前结果已达到可评估“能否发布”的成熟度
- 已完成阶段计划并通过进入门禁

## 三、必读入口
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/deliver.md`
- `.opencode/references/mes-ai-reference/rules/environment-governance.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/convergence.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/stage-memory.md`
- `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`
- `.opencode/references/mes-ai-reference/rules/governance/stage-artifact-layout.md`
- `.opencode/references/mes-ai-reference/rules/governance/completion-sweep-standard.md`

## 四、条件加载规则
- 数据库迁移、发布窗口、回滚边界：`scenario-db-migration.md`
- 多仓协同发布：`scenario-multi-repo.md`
- GSD：`scenario-gsd.md`
- 高风险发布：`scenario-high-risk-release.md`

## 五、最小产物要求
- 应形成与当前交付对象匹配的交付结论或最小可消费发布判断
- 应具备部署、回滚、验收、交接所需的关键材料或明确缺口说明
- 若命中数据库迁移、多仓协同或高风险发布，应补充对应专项说明与限制条件
- 若交付结论依赖需求验收，必须具备需求项到测试/验收结论的追溯关系

## 五点一、阶段执行原则与图谱增强

发布交付阶段必须优先体现以下原则：

- **编码前思考**：发布前必须明确交付对象、Go/No-Go 标准、风险分层、回滚策略、观察指标与后补动作。
- **简洁优先**：交付材料优先服务发布判断、回滚恢复和交接消费，不为形式完整生成无关长文档。
- **精准修改**：交付阶段不得重新定义需求、契约、Provider、仓边界或测试结论，只能基于上游已审查结果做发布判断。
- **目标驱动执行**：以可执行部署计划、可验证验收结论、可恢复回滚路径和可追溯交接状态作为完成标准。

命中多仓协同发布、发布影响范围不清、回滚路径依赖复杂或发布后观察对象较多时，可按需使用 GitNexus 类代码知识图谱能力辅助核对：

- 发布包涉及的服务、模块、接口与消费者
- 关键调用链与回滚影响面
- 发布后观察对象与回归路径
- 需要刷新知识库的事实变化

命中交付材料复杂、验收追溯关系多或交接阅读成本较高时，可按需使用 graphify 类能力辅助生成交付图谱导读，表达需求项、测试结论、验收结论、发布风险、回滚动作和交接对象之间的关系。图谱导读不得替代 `go-nogo.md`、`deploy-plan.md`、`handover-doc.md` 或阶段主结论。

## 五点五、验收追溯链要求

发布交付阶段形成的验收结论、go/no-go 结论与交付判断，不得脱离需求项追溯链独立成立。

至少应明确：
- 当前交付对象覆盖哪些需求项
- 每个需求项对应的测试结论与验收结论
- 哪些需求项尚未完全闭合
- 当前 go/no-go 结论适用的范围与限制条件

若缺少需求项到测试/验收结论的追溯关系，只能给出局部或有条件交付判断，不得直接输出无保留“可发布”。

## 六、交付结论口径
- 可发布
- 有条件可发布
- 不可发布
- 需返工后重审

## 七、硬约束
- 不得只因测试“基本通过”就默认可发布
- 不得跳过部署顺序、回滚边界与观察指标说明
- 不得遗漏剩余风险与限制条件
- 不得只输出 release note 而无验收、交接与收尾材料
- 不得在缺少需求追溯链的情况下输出无条件 go/no-go 结论
- 不得把 GitNexus / graphify 的图谱关系替代真实测试、验收、部署或回滚证据
- 不得在交付阶段扩大范围重做上游设计或测试决策

## 八、退出条件
- 当前交付结论已明确并完成审查
- 部署、回滚、观察与验收材料已补齐
- 阶段产物与证据已落盘
- 已完成收尾扫描并形成可恢复交接状态

## 九、详版入口
- 详细交付步骤、交付判断与推荐技能入口：`.opencode/references/mes-ai-reference/rules/phases/phase-deliver-detail.md`
