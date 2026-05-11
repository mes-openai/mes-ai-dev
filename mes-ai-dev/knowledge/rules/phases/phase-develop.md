---
title: 开发阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - develop
trigger:
  - implement
  - fix
cost_level: medium
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/develop.md
  - knowledge/reference/knowledge-consumption/stage-memory.md
---

# 开发阶段规则（phase-develop）

> 本文件是开发阶段的最小加载包，优先服务于阶段路由、最小消费边界与进入/退出判断。
> 详细执行步骤、扩展说明与技能入口见：`knowledge/rules/phases/phase-develop-detail.md`

## 默认加载卡

### 必载
- `knowledge/rules/core/runtime-entry.md`
- `knowledge/rules/core/agent-core.md`
- `knowledge/rules/core/safety-redlines.md`
- `knowledge/rules/core/execution-baseline.md`
- `knowledge/rules/core/completion-baseline.md`
- `knowledge/rules/phases/phase-develop.md`
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

### 按需加载
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/develop.md`
- `knowledge/reference/knowledge-consumption/rules.md`
- `knowledge/reference/knowledge-consumption/stage-memory.md`
- `knowledge/rules/coding-standards.md`
- `knowledge/rules/scenarios/scenario-multi-repo.md`
- `knowledge/rules/scenarios/scenario-db-migration.md`
- `knowledge/rules/scenarios/scenario-lock-conflict.md`
- `knowledge/rules/scenarios/scenario-gsd.md`
- `knowledge/rules/scenarios/scenario-cross-stage-change.md`

### 默认不加载
- `knowledge/reference/phase-gates.md` 旧总表全文
- 非当前阶段门禁分片
- 与当前开发任务无关的 consumption 分片
- 模板正文与低频重型治理全文

### 预算提示
- 开发阶段优先保持轻量加载；除非命中门禁或消费边界判断，否则不默认读取门禁/消费矩阵旧总表

## 一、阶段目标
将已确认的设计、明确修复目标或具体变更需求落实为代码与相关产物，并完成必要验证、自审与阶段收尾。

## 二、进入条件
- 当前任务明确要求实现、修改或修复
- 作用范围已基本明确
- 已具备设计结论、修复目标或明确变更需求
- 已完成阶段计划并通过进入门禁

## 三、必读入口
- `knowledge/rules/coding-standards.md`
- `knowledge/rules/core/execution-baseline.md`
- `knowledge/rules/core/completion-baseline.md`
- `knowledge/reference/phase-gates/common.md`（按需）
- `knowledge/reference/phase-gates/develop.md`（按需）
- `knowledge/reference/knowledge-consumption/rules.md`（按需）
- `knowledge/reference/knowledge-consumption/stage-memory.md`（按需）
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

## 四、条件加载规则
- 多仓/多服务：`scenario-multi-repo.md`
- DB 结构、迁移、回滚：`scenario-db-migration.md`
- 跨库数据访问、限定通道：`database-cross-access-rule.md`（配套索引 `layer-decoupling-channel.md`）
- 锁冲突：`scenario-lock-conflict.md`
- GSD：`scenario-gsd.md`
- 跨阶段变更：`scenario-cross-stage-change.md`

## 五、最小产物要求
- 应形成与当前开发任务匹配的代码改动或最小可交付结果
- 应先形成可供用户补充的 TDD 用例计划，并在收到用户补充与确认后再进入代码生成
- 应具备必要验证结果、自审结果与阶段收尾材料
- 若命中高风险场景，应补充对应专项产物或风险说明
- 若改动将进入测试阶段消费，应明确验证对象变化清单
- 若改动将影响知识库事实，应补充刷新提示

## 五点二五、TDD 前置要求

开发阶段默认采用 TDD 闭环，至少满足以下顺序：

1. 先根据需求、设计和存量测试资产生成本轮 `test-cases.md`
2. 在 `test-cases.md` 中预留用户补充区与确认结论
3. 等待用户补充并确认测试计划
4. 仅在确认完成后进入代码生成
5. 代码生成后，必须先验证本轮新生成测试用例全部通过
6. 新生成测试用例通过后，必须复核本轮生成/修改并纳入验证范围的代码行覆盖率是否达到 100%
7. 若覆盖率不足 100%，只允许补充测试用例，不得删除已经生成且验证通过的测试用例

开发阶段不得跳过“测试计划 -> 用户补充 -> 用户确认 -> 代码生成”的顺序直接产码。

## 五点五、开发到测试交接要求

当开发结果将进入测试阶段消费时，开发阶段至少应明确：

- 本次改动覆盖了哪些接口、服务、表、页面、配置或脚本对象
- 哪些验证对象必须新增、修改或回归
- 开发阶段已完成了哪些最小验证，哪些留待测试阶段补充
- 是否存在设计偏差、契约限制或仅局部生效边界
- 本轮 TDD 用例计划的用户补充项、确认结论与未采纳说明
- 本轮新生成测试用例的通过情况与覆盖率结论

推荐交接入口见：
- `knowledge/reference/change-handoff-matrix.md`

## 五点六、开发到刷新提示要求

当本次改动会影响 API、服务依赖、数据库对象、前后端映射、契约口径或其他知识基线时，开发阶段必须形成刷新提示。

刷新提示至少应说明：
- 可能受影响的知识文件
- 影响来源
- 是必须刷新、建议刷新还是人工复核

## 六、硬约束
- 不得在无明确实现意图时直接改代码
- 不得使用 `as any`、`@ts-ignore`、`@ts-expect-error`
- 不得删除失败测试来替代修复
- 不得绕过验证直接宣告完成
- 不得在开发阶段重做仓级责任划分
- 不得在开发阶段重做 provider 选择
- 不得在开发阶段重新定义项目私有契约
- 必须引用 analyze/design 已冻结结论
- 若发现边界冲突，必须回流 analyze/design
- 不得在缺少验证对象变化清单时默认测试阶段可完整接手
- 不得在未完成 TDD 用例计划、用户补充和用户确认前进入代码生成
- 不得以口头说明替代 `test-cases.md` 中的用户补充区与确认结论
- 不得在本轮新生成测试用例未全部通过时宣告代码生成完成
- 不得在本轮生成/修改并纳入验证范围的代码行覆盖率未达 100% 时宣告开发阶段通过
- 不得通过删除、降级、跳过或缩窄已经生成且验证通过的测试用例来换取覆盖率达标
- 在存量项目中生成代码时，必须先对齐目标仓既有代码结构、分层方式、命名风格、依赖组织、测试组织与已有实现模式

## 六点五、开发阶段回流条件

出现以下任一情况时，开发阶段必须停止直接推进并回流 analyze/design：

- 仓边界冲突
- provider 选择冲突
- 契约定义冲突
- 现有接口复用判断失效
- 存量项目现有代码结构与拟生成方案明显不一致

## 七、退出条件
- 计划内目标已落地或已形成最小可交付结果
- 关键改动已完成必要验证
- 本轮 TDD 用例计划已记录用户补充与确认结论
- 本轮新生成测试用例已全部验证通过
- 本轮生成/修改并纳入验证范围的代码行覆盖率已达 100%
- 已完成自审
- 阶段产物已落盘并完成收尾扫描

## 八、详版入口
- 详细执行步骤、补强要求与推荐技能入口：`knowledge/rules/phases/phase-develop-detail.md`
