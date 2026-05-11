---
title: 测试阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - test
trigger:
  - test
  - verify
cost_level: medium
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/test.md
  - knowledge/reference/knowledge-consumption/code-map.md
---

# 测试阶段规则（phase-test）

> 本文件是测试阶段的最小加载包，优先服务于阶段路由、最小消费边界与进入/退出判断。
> 详细验证步骤、测试收敛要求与技能入口见：`knowledge/rules/phases/phase-test-detail.md`

## 默认加载卡

### 必载
- `knowledge/rules/core/runtime-entry.md`
- `knowledge/rules/core/agent-core.md`
- `knowledge/rules/core/completion-baseline.md`
- `knowledge/rules/phases/phase-test.md`
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/test.md`
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/stage-memory.md`
- `knowledge/reference/knowledge-consumption/code-map.md`
- `knowledge/reference/knowledge-consumption/convergence.md`
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

### 按需加载
- `knowledge/code-map/test-assets.md`
- `knowledge/code-map/testability-matrix.md`
- `knowledge/code-map/e2e-chains.md`
- `knowledge/rules/scenarios/scenario-db-migration.md`
- `knowledge/rules/scenarios/scenario-multi-repo.md`
- `knowledge/rules/scenarios/scenario-gsd.md`
- `knowledge/rules/scenarios/scenario-high-risk-release.md`

### 默认不加载
- 初始化收口细则全文
- 非当前阶段门禁分片
- 与当前测试对象无关的 database-index 深化正文
- 模板正文与低频重型治理全文

### 预算提示
- 骨架自加载优先控制在 8K token 左右；用 code-map 与 convergence 分片替代旧总表全文

## 一、阶段目标
验证当前需求、设计或开发结果是否满足预期目标，识别剩余风险与未覆盖范围，并形成可供交付阶段消费的测试结论与证据材料。

## 二、进入条件
- 当前已有待验证对象
- 开发结果、修复结果或专项验证对象已基本稳定
- 已具备最小验证输入
- 已完成阶段计划并通过进入门禁

## 三、必读入口
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/test.md`
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/stage-memory.md`
- `knowledge/reference/knowledge-consumption/code-map.md`
- `knowledge/reference/knowledge-consumption/convergence.md`
- `knowledge/code-map/test-assets.md`（如存在）
- `knowledge/code-map/testability-matrix.md`（如存在）
- `knowledge/code-map/e2e-chains.md`（如存在）
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

## 四、条件加载规则
- DB 结构、数据迁移、回滚验证：`scenario-db-migration.md`
- 多仓联动验证：`scenario-multi-repo.md`
- GSD：`scenario-gsd.md`
- 高风险发布前置验证：`scenario-high-risk-release.md`

## 五、最小产物要求
- 应形成与当前测试目标匹配的测试计划、测试结论或最小验证结果
- 应具备关键验证证据、风险说明与未覆盖说明
- 若结论将被交付阶段消费，应明确可消费边界与限制条件
- 若本轮验证服务于需求验收或发布判断，应形成需求项到测试结果的追溯关系
- 若本轮测试承接开发阶段 TDD 计划，应显式核对用户补充与确认后的测试范围是否被执行
- 若本轮测试承接 AI 生成代码，应显式给出本轮新生成测试用例是否全部通过，以及本轮生成/修改并纳入验证范围的代码行覆盖率是否达到 100%

## 五点五、测试追溯链要求

当测试结论将被交付阶段用于验收或 go/no-go 判断时，测试阶段必须明确：

- 本轮覆盖了哪些需求项
- 每个需求项对应哪些测试对象、测试场景或测试结论
- 哪些需求项未覆盖，以及未覆盖原因
- 哪些需求项仅得到局部验证，不足以支撑全量交付结论

测试阶段不得只输出“测试通过”，而不说明其与需求项、验收标准和发布判断之间的映射关系。

## 六、硬约束
- 不得只给“测试通过”结论而不说明测试范围
- 不得只跑命令不沉淀证据
- 不得把未覆盖范围默认视为通过
- 不得在关键阻断未闭合时给出可发布结论
- 不得在未形成需求项追溯关系时支撑正式验收或 go/no-go 结论
- 不得在本轮新生成测试用例存在失败时给出开发结果通过结论
- 不得在本轮生成/修改并纳入验证范围的代码行覆盖率未达 100% 时给出测试阶段通过结论
- 覆盖率不足时，只允许补充测试用例与验证证据，不得删除已经生成且验证通过的测试用例

## 七、退出条件
- 测试目标与范围已明确
- 关键验证对象已完成验证或已明确未覆盖原因
- 若本轮验证承接开发阶段 TDD 计划，则用户补充与确认后的测试范围已执行或已记录未执行原因
- 本轮新生成测试用例已全部验证通过
- 本轮生成/修改并纳入验证范围的代码行覆盖率已达 100%
- 风险、剩余问题与限制条件已记录
- 测试结论已审查、产物已落盘并完成收尾扫描

## 八、详版入口
- 详细测试步骤、验证收敛要求与推荐技能入口：`knowledge/rules/phases/phase-test-detail.md`
