---
title: 详细设计阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - design
trigger:
  - design
cost_level: medium
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/design.md
  - knowledge/reference/knowledge-consumption/dependency-graph.md
---

# 详细设计阶段规则（phase-design）

> 本文件是设计阶段的最小加载包，优先服务于阶段路由、最小消费边界与进入/退出判断。
> 详细设计步骤、关键对象展开要求与技能入口见：`knowledge/rules/phases/phase-design-detail.md`

## 默认加载卡

### 必载
- `knowledge/rules/core/runtime-entry.md`
- `knowledge/rules/core/agent-core.md`
- `knowledge/rules/core/intent-gate.md`
- `knowledge/rules/core/execution-baseline.md`
- `knowledge/rules/phases/phase-design.md`
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/design.md`
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/rules.md`
- `knowledge/reference/knowledge-consumption/reference.md`
- `knowledge/reference/knowledge-consumption/dependency-graph.md`
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

### 按需加载
- `knowledge/rules/api-conventions.md`
- `knowledge/reference/parameter-switch-patterns.md`
- `knowledge/reference/terminology-glossary.md`
- `knowledge/reference/domain-model.md`
- `knowledge/reference/knowledge-consumption/contracts.md`
- `knowledge/rules/scenarios/scenario-multi-repo.md`
- `knowledge/rules/scenarios/scenario-db-migration.md`
- `knowledge/rules/scenarios/scenario-gsd.md`
- `knowledge/rules/scenarios/scenario-cross-stage-change.md`
- `knowledge/rules/scenarios/scenario-high-risk-release.md`

### 默认不加载
- 非当前阶段门禁分片
- 初始化收口正文
- 与当前设计范围无关的 stage-memory 全文
- 模板正文与低频重型治理全文

### 预算提示
- 骨架自加载优先控制在 9K token 内；跨仓/跨库场景通过 scenario 分片加载，而不是把所有场景规则常驻

## 一、阶段目标
将已确认的需求规格、问题收敛结论或变更目标转化为可开发、可验证、可交接的设计输入。

## 二、进入条件
- 已具备最小需求输入
- 需求或问题范围已达到可设计清晰度
- 已有规格说明、影响范围分析或明确修复目标
- 已完成阶段计划并通过进入门禁

## 二点五、设计前加载检查

进入详细设计前，必须完成加载检查；若未完成，不得进入设计阶段。

### must-pass 检查清单
- [ ] 已加载 `phase-design.md` 规定的必读入口
- [ ] 已读取 `knowledge/reference/parameter-switch-patterns.md`（命中参数开关/配置取值场景时必选）
- [ ] 已读取 `knowledge/code-map/backend-overview.md` 和 `knowledge/code-map/frontend-overview.md`
- [ ] 已明确后端服务定位（服务名称、代码仓、Schema）
- [ ] 已明确前端模块定位（模块名称、代码仓、路由路径）
- [ ] 已遵循现有模式（参数开关、数据字典、既有接口/表/配置）
- [ ] 已显式标注知识来源

### 拒绝进入规则
- 任一 must-pass 未完成：自动拒绝进入详细设计阶段
- 未完成 overview 与 index 层消费：自动拒绝生成设计文档
- 仅凭需求描述或局部源码片段，未完成仓/服务/模块定位：自动拒绝输出实现型设计结论

## 三、必读入口
- `knowledge/code-map/backend-overview.md`
- `knowledge/code-map/frontend-overview.md`
- `knowledge/rules/api-conventions.md`
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/design.md`
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/rules.md`
- `knowledge/reference/knowledge-consumption/reference.md`
- `knowledge/reference/knowledge-consumption/dependency-graph.md`
- `knowledge/reference/parameter-switch-patterns.md`（命中参数开关/配置取值场景时必读）
- `knowledge/reference/terminology-glossary.md`（按需）
- `knowledge/reference/domain-model.md`（按需）
- `knowledge/rules/governance/review-report-standard.md`
- `knowledge/rules/governance/stage-artifact-layout.md`
- `knowledge/rules/governance/completion-sweep-standard.md`

## 四、条件加载规则
- 多仓联动：`scenario-multi-repo.md`
- 数据库结构、索引、迁移：`scenario-db-migration.md`
- 跨库数据访问、限定通道：`database-cross-access-rule.md`（配套索引 `layer-decoupling-channel.md`）
- GSD：`scenario-gsd.md`
- 跨阶段变更：`scenario-cross-stage-change.md`
- 高风险发布前置设计判断：`scenario-high-risk-release.md`

## 五、最小产物要求
- 应形成与当前设计目标匹配的设计结论或最小可消费设计输入
- 应具备关键设计对象、风险约束与待确认项说明
- 若命中多仓、数据库或发布高风险场景，应补充对应专项设计说明或风险提示
- 应明确代码仓定位（后端服务、前端模块、Schema、路由路径）
- 应显式标注知识来源与复用依据

## 五点四、知识消费顺序强制要求

详细设计阶段必须按以下顺序消费知识：

1. overview：`backend-overview.md`、`frontend-overview.md`
2. index：`parameter-switch-patterns.md`、`terminology-glossary.md` 与当前主题索引
3. detail / file-summaries：命中的服务 `index.md`、模块 `index.md`、必要时进入 `file-summaries.md`
4. 精准源码：仅在前三级仍不足以支撑结论时进入

禁止跳过 overview 与 index 直接生成设计文档。
禁止在未明确代码仓定位前直接展开表设计、接口设计或页面设计。

## 五点五、服务链冻结要求

详细设计阶段应在需求分析已给出责任边界与 provider 选择基础上，形成可开发、可验证的服务链设计结论。

服务链设计至少应明确：
- 最终调用链
- 每个节点的职责
- 哪些路径允许，哪些路径禁止
- 是否存在聚合/解耦层不可绕过要求
- 契约兼容与回退边界

服务链冻结后，开发阶段不得重新改写其主路径与 provider 选择。

## 五点六、私有契约显式消费要求

若当前设计涉及项目私有响应契约、错误契约、认证契约、SDK 模型、MQ 消息契约或其他契约级知识，设计阶段必须显式引用对应事实源或契约知识文件。

不得在存在项目私有契约的情况下退回通用框架常识或通用 REST 风格。
不得仅凭接口表象补写协议结构。

## 六、硬约束
- 不得在需求边界未收敛时直接给出实现型设计结论
- 不得跳过接口、数据、流程影响分析
- 不得遗漏兼容性、回退边界或高风险说明
- 不得未经审查直接将设计交给开发阶段
- 不得绕过架构限定 provider 直接设计调用链
- 不得以“能调通”代替“符合架构”
- 不得忽略现有接口复用优先策略
- 不得忽略项目私有契约的显式消费
- 不得跳过 overview / index 层直接生成设计
- 不得遗漏后端服务、前端模块、Schema、路由路径定位
- 不得在存在既有参数开关模式时另起并行机制而不说明原因
- 不得省略知识来源标注

## 七、退出条件
- 设计目标与边界已明确
- 关键设计对象已形成可消费结论
- 风险、约束、待确认项已记录
- 设计产物已审查、落盘并完成收尾扫描

## 八、详版入口
- 详细设计步骤、关键对象展开要求与推荐技能入口：`knowledge/rules/phases/phase-design-detail.md`
