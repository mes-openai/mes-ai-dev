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
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/deliver.md
  - knowledge/reference/knowledge-consumption/stage-memory.md
---

# 发布交付阶段规则（phase-deliver）

> 本文件是交付阶段的最小加载包，优先服务于阶段路由、最小消费边界与进入/退出判断。
> 详细交付步骤、交付判断与技能入口见：`knowledge/rules/phases/phase-deliver-detail.md`

## 默认加载卡

### 必载
- `knowledge/rules/core/runtime-entry.md`
- `knowledge/rules/core/agent-core.md`
- `knowledge/rules/core/completion-baseline.md`
- `knowledge/rules/phases/phase-deliver.md`
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/deliver.md`
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/state.md`
- `knowledge/reference/knowledge-consumption/convergence.md`
- `knowledge/reference/knowledge-consumption/stage-memory.md`
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

### 按需加载
- `knowledge/rules/environment-governance.md`
- `knowledge/rules/scenarios/scenario-db-migration.md`
- `knowledge/rules/scenarios/scenario-multi-repo.md`
- `knowledge/rules/scenarios/scenario-gsd.md`
- `knowledge/rules/scenarios/scenario-high-risk-release.md`

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
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/deliver.md`
- `knowledge/rules/environment-governance.md`
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/state.md`
- `knowledge/reference/knowledge-consumption/convergence.md`
- `knowledge/reference/knowledge-consumption/stage-memory.md`
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

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

## 八、退出条件
- 当前交付结论已明确并完成审查
- 部署、回滚、观察与验收材料已补齐
- 阶段产物与证据已落盘
- 已完成收尾扫描并形成可恢复交接状态

## 九、详版入口
- 详细交付步骤、交付判断与推荐技能入口：`knowledge/rules/phases/phase-deliver-detail.md`
