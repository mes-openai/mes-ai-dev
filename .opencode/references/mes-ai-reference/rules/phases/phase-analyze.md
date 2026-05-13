---
title: 需求分析阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - analyze
trigger:
  - analyze
cost_level: medium
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/analyze.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/reference.md
---

# 需求分析阶段规则（phase-analyze）

## 默认加载卡

### 必载
- `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`
- `.opencode/references/mes-ai-reference/rules/core/agent-core.md`
- `.opencode/references/mes-ai-reference/rules/core/intent-gate.md`
- `.opencode/references/mes-ai-reference/rules/core/execution-baseline.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-analyze.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/analyze.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/reference.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/convergence.md`
- `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`
- `.opencode/references/mes-ai-reference/rules/governance/stage-artifact-layout.md`
- `.opencode/references/mes-ai-reference/rules/governance/completion-sweep-standard.md`

### 按需加载
- `mes-ai-dev/knowledge/reference/terminology-glossary.md`
- `mes-ai-dev/knowledge/reference/domain-model.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/contracts.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-multi-repo.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-cross-stage-change.md`

### 默认不加载
- 非当前阶段门禁分片
- 初始化收口与高风险发布全文
- 与当前范围无关的 database-index 深化正文
- 模板正文与低频重型治理全文

### 预算提示
- 骨架自加载优先控制在 8K token 左右；若依赖全仓收敛状态，优先读取 convergence 分片而不是旧总表全文

## 一、阶段目标
将原始业务诉求、问题描述或变更请求转化为结构化需求输入，形成后续设计与开发可消费的规格说明、影响范围与风险结论。

## 二、进入条件
- 当前任务属于新需求、迭代需求、问题调查后的需求收敛，或需要形成明确规格
- 当前目标尚未达到可直接设计或开发的清晰度
- 已具备最小业务背景或问题描述输入
- 已完成阶段计划并通过进入门禁

## 三、必读入口
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/analyze.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/reference.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/convergence.md`
- `mes-ai-dev/knowledge/reference/terminology-glossary.md`（按需）
- `mes-ai-dev/knowledge/reference/domain-model.md`（按需）
- `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`
- `.opencode/references/mes-ai-reference/rules/governance/stage-artifact-layout.md`
- `.opencode/references/mes-ai-reference/rules/governance/completion-sweep-standard.md`

## 四、条件加载规则
- 迭代需求：加载相关 diff 规则或 Skill
- 多仓、跨服务、跨模块：加载 `scenario-multi-repo.md`
- 跨库数据访问、限定通道：加载 `database-cross-access-rule.md`（配套索引 `layer-decoupling-channel.md`）
- GSD：加载 `scenario-gsd.md`
- 跨阶段回流：加载 `scenario-cross-stage-change.md`

## 五、标准步骤
1. 解析原始诉求
2. 识别影响范围
3. 识别仓级责任边界
4. 串联业务链、服务链与数据链
5. 判断现有能力复用与 provider 选择
6. 判断是否需要探索文档与提案文档
7. 补齐约束、风险与关键决策点
8. 形成规格说明
9. 审查与收敛
10. 阶段收尾

## 五点一、阶段执行原则与图谱增强

需求分析阶段必须优先体现以下原则：

- **编码前思考**：在形成规格前先列明业务假设、隐藏歧义、候选解释、边界不清项与需要用户确认的取舍点。
- **目标驱动执行**：验收标准必须能被设计、开发、测试和交付阶段逐项追溯，不得停留在不可验证的自然语言愿望。
- **精准修改**：分析结论只覆盖当前需求相关仓、服务、表、页面、配置与契约，不得借机扩大到无关治理重构。
- **简洁优先**：优先判断现有能力复用、最小扩展或最小闭环方案，不得在未证明必要性时推动新增复杂链路。

命中多仓、跨服务、调用链复杂、现有能力复用判断不清或影响范围存在争议时，可按需使用 GitNexus 类代码知识图谱能力辅助识别：

- 文件/模块/服务结构关系
- import / call / dependency 链路
- 入口点到下游过程的执行路径
- 变更影响半径与候选回归范围

命中复杂业务链、跨阶段交接或多文档输入时，可按需使用 graphify 类能力辅助形成需求、约束、业务链、影响对象与验收标准之间的图谱化导读。图谱输出只能作为证据导航，最终规格结论仍必须回写到 `spec.md`、`impact-scope.md` 或对应阶段产物中。

## 五点二五、OpenSpec 文档分工与触发规则

需求分析阶段的 OpenSpec 文档分工如下：

- `exploration.md`：用于承载探索、歧义拆解、方案比较、边界排查与存量结构适配风险分析
- `proposal.md`：用于承载候选方案、推荐方案、取舍理由、用户待确认决策点
- `spec.md`：用于承载正式需求规格，是进入设计阶段的主交接文档

默认规则：

- `spec.md` 为需求分析阶段正式主文档，原则上始终需要形成
- `exploration.md` 与 `proposal.md` 为条件产物，不是所有需求都强制生成

`exploration.md` 触发条件：

- 需求描述存在较大歧义，无法直接稳定落到规格
- 存在两个及以上可行路径，需要先比较边界、风险或适配性
- 涉及多仓、跨服务、跨模块，且责任边界仍不清晰
- 存量项目中目标结构复杂，是否贴合现有结构仍需前置探索

`proposal.md` 触发条件：

- 存在多个候选方案，需要明确推荐方案与淘汰理由
- 需要用户对方案取舍、仓落点、provider、复用路径进行确认
- 存在高风险设计前置决策，若不确认将影响后续规格冻结

收口要求：

- 若已生成 `exploration.md`，其结论必须被 `proposal.md` 或 `spec.md` 显式吸收
- 若已生成 `proposal.md`，其推荐方案与确认结论必须被 `spec.md` 显式吸收
- 不得让 `exploration.md` 或 `proposal.md` 长期替代 `spec.md` 直接进入设计阶段

## 五点五、仓级责任边界要求

对于涉及多个代码仓、多个微服务、前后端联动、数据库脚本协同变更或存在公共 SDK / 协议定义源的需求，需求分析阶段必须形成仓级责任边界。

仓级责任边界至少应回答：
- 涉及哪些仓
- 每个仓的角色是什么（主责/配合/候选/待补证）
- 每个仓为什么涉及
- 哪些仓是事实定义源，哪些仓是实现落点，哪些仓是消费方
- 当前结论的证据链与置信度如何

仓级责任边界属于需求分析阶段输出，不得推迟到开发阶段才决定。

## 五点六、provider 选择与能力复用要求

当多个微服务均可提供某项数据或能力时，需求分析阶段必须区分：

- 技术可达 provider
- 架构允许 provider
- 最终选定 provider

同时必须判断：
- 当前需求是否已有可复用接口
- 是直接复用、最小扩展还是必须新增
- 是否存在聚合/解耦服务不可绕过的边界
- 若绕过既定 provider，会造成何种架构、兼容或治理风险

不得将“技术上可调通”直接视为“设计上应这样做”。
不得跳过现有能力复用判断直接推动新增接口。

## 五点七、验收追溯前置要求

需求分析阶段形成的验收标准，不得只停留在自然语言描述，必须具备可被 test / deliver 阶段逐项追溯的结构化表达。

至少应明确：
- 对应需求项编号
- 对应验收标准
- 对应验证对象或验证路径
- 若当前无法验证，应标记限制条件与待补动作

当需求将直接进入测试与验收链时，分析阶段应为后续阶段留下可追溯的验收输入，不得把“是否满足需求”完全推迟到交付阶段口头判断。

## 六、硬约束
- 不得把未确认猜测写成既定事实
- 不得跳过范围边界识别
- 不得跳过风险说明
- 不得未经审查直接把规格交给设计阶段
- 不得在未划定仓级责任边界时直接形成规格结论
- 不得将技术可达路径直接写成架构允许路径
- 不得忽略现有能力复用判断
- 不得忽略公共 SDK / 协议定义源在分析中的角色
- 不得把 GitNexus / graphify 的推断关系直接写成确定事实，除非已被项目事实源或人工确认支撑
- 不得在验收标准不可验证时进入设计阶段

## 七、退出条件
- 需求目标与范围已结构化
- 关键约束、风险、待确认项已明确
- 规格说明已完成审查
- 阶段产物已落盘并完成收尾扫描

## 七点五、最小产物要求（补充）

命中多仓、跨服务、跨模块、共享契约或现有能力复用场景时，分析阶段至少应补充以下产物中的适用项：

- `exploration.md`（命中探索触发条件时）
- `proposal.md`（命中方案取舍/用户确认触发条件时）
- `spec.md`
- `repo-impact-list.md`
- `repo-placement-decision.md`
- `flow-trace.md`
- `api-reuse-decision.md`
- `provider-selection.md`（若存在多个候选 provider）
- `acceptance-trace-matrix.md`（若需要进入正式测试/验收追溯链）

## 八、推荐技能入口
- `mes-analyze-parse-requirement`
- `mes-analyze-impact-scope`
- `mes-analyze-identify-repos`
- `mes-analyze-trace-flow`
- `mes-analyze-generate-spec`
- `mes-analyze-review-spec`
- `mes-analyze-requirement-diff`
