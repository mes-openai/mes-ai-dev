---
title: 初始化阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - init
trigger:
  - init
cost_level: medium
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/init.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md
---

# 初始化阶段规则（phase-init）

## 默认加载卡

### 必载
- `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`
- `.opencode/references/mes-ai-reference/rules/core/agent-core.md`
- `.opencode/references/mes-ai-reference/rules/core/safety-redlines.md`
- `.opencode/references/mes-ai-reference/rules/core/execution-baseline.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-init.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/init.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/rules.md`

### 按需加载
- `.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`
- `.opencode/references/mes-ai-reference/rules/budget-audit-rules.md`
- `.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`
- `.opencode/references/mes-ai-reference/rules/governance/shared-knowledge-write-policy.md`
- `.opencode/references/mes-ai-reference/reference/init-output-consumer-matrix.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-state-migration.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-shared-knowledge-converge.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-lock-conflict.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`

### 默认不加载
- 非当前阶段门禁分片
- 与初始化无关的 deliver/test 阶段规则正文
- 非当前范围的 reference / database-index 深化正文
- 模板正文与低频重型治理全文

### 预算提示
- 骨架自加载优先控制在 8K token 左右；涉及收敛与状态校验时允许适度上浮，但不得默认整份读取旧总表

## 一、阶段目标
初始化阶段负责建立后续阶段可消费的结构化知识底座，重点产出局部可汇总结果，而不是直接覆盖全局共享知识文件。

## 二、适用范围
- 全仓初始化
- 单仓初始化
- 定向 repo / module / schema 初始化
- 初始化深化
- 断点续传
- converge 前准备

## 三、基本原则
- 默认先写局部结果、状态片段、reference/rules 片段
- `/mes-init-project` 与 `/mes-init-enrich` 产局部结果
- `/mes-init-converge` 统一收口共享知识与状态
- 初始化允许在输出计划后自动继续
- 初始化也必须遵循仓规模与分层消费规则

## 三点二、阶段执行原则与图谱增强

初始化阶段必须优先体现以下原则：

- **编码前思考**：扫描前必须明确初始化 scope、仓/模块/Schema 边界、产物层级、断点策略与未知项标记方式。
- **简洁优先**：优先建立下游可消费的最小知识基线，不为一次初始化生成无关深度内容或全量长文档。
- **精准修改**：单仓、定向或深化初始化不得越界扫描、越界写入或覆盖非当前 scope 的共享知识。
- **目标驱动执行**：以知识面覆盖、局部产物、状态片段、门禁与下游消费映射作为完成标准。

命中大仓、多仓、调用链复杂、依赖关系不清或需要生成 code-map / dependency-graph / API registry 时，可按需使用 GitNexus 类代码知识图谱能力辅助抽取：

- 文件/目录/模块结构关系
- import / call / dependency 链路
- 入口点、热点节点与执行过程
- 可供后续阶段消费的图谱查询入口

命中多模态资料、历史文档、设计图、交接材料或需要生成知识导读时，可按需使用 graphify 类能力形成初始化图谱报告、wiki 化导读或跨资料关系索引。图谱输出必须区分 EXTRACTED / INFERRED / AMBIGUOUS 等可信状态，不得替代初始化产物中的确认/候选/未知三态。

## 三点五、契约级知识范围

初始化阶段除仓/模块/数据库/调用链等基础知识外，还必须识别并产出后续阶段可直接消费的契约级知识。

契约级知识包括但不限于：
- 统一响应包装与成功/失败判定机制
- 错误契约、错误码来源与扩展参数口径
- SDK / common / shared model 中的公共请求/响应模型
- 公共异常模型与统一异常处理机制
- MQ 消息契约
- 认证、网关与链路透传相关契约

契约级知识必须优先从定义点提取，不得仅从使用点反推。
若项目存在 SDK、common、shared、integration、framework-extension 等公共依赖目录，应纳入初始化扫描范围。

## 三点七、初始化最小知识面完成定义

初始化阶段要被视为“已足够读懂当前 scope 的存量代码仓到可下游消费”，至少应建立以下最小知识面：

- 仓/服务/模块边界
- 关键调用链与热点入口
- 关键数据库 ownership
- 契约级知识定义源
- 公共依赖与关键配置映射
- 测试资产可用性与回归缺口

上述知识面应按“确认 / 候选 / 未知”三态产出，不得以默认框架常识或模板示例填补缺口。

若当前初始化范围不足以完成全局知识面，也必须显式标注哪些知识面仅达到局部可消费状态。

## 三点八、初始化产物到下游消费映射要求

初始化阶段除产出局部结果和共享知识外，还必须明确这些产物将如何被后续阶段消费。

下游消费映射的正式入口见：
- `.opencode/references/mes-ai-reference/reference/init-output-consumer-matrix.md`

当初始化结果将被 analyze / design / develop / test / deliver / refresh 直接消费时，必须至少回答：
- 哪些初始化产物已可作为事实输入
- 哪些仅支持局部分析或降级推进
- 哪些仍处于候选/未知状态，不得被下游当作全局事实

## 三点六、公共 SDK 与外部契约源获取顺序

当关键契约对象定义在业务仓之外时，初始化阶段必须优先识别并获取其真实定义源。

公共 SDK 与外部契约源的获取顺序固定为：

1. **工作区内源码（workspace-source）**
   - 当前 workspace 中已存在的 `sdk/`、`common/`、`shared/`、`integration/`、`framework-extension/` 等源码目录
2. **同项目多仓中的公共源码仓（repo-source）**
   - 已纳入当前工作区范围的公共仓、SDK 仓、基础能力仓
3. **源码附件（sources-jar / source bundle）**
   - 通过构建系统、私服或制品库可直接获取的源码附件
4. **受控反编译 jar（decompiled-jar）**
   - 仅当关键契约对象源码与源码附件均不可得时，方可作为兜底路径使用
5. **明确未知（unknown）**
   - 若以上事实源均不可得，则必须标记为未知或候选结论，不得脑补为确定事实

禁止跳过前 1～3 步直接进入 jar 反编译。
禁止将 jar 反编译作为默认主路径。
禁止在未获得公共契约定义源时输出统一响应、统一错误码、统一认证、统一 MQ 契约等全局结论。

## 四、必读入口
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/init.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/rules.md`
- `.opencode/references/mes-ai-reference/reference/init-output-consumer-matrix.md`（按需）
- `.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`（按需）
- `.opencode/references/mes-ai-reference/rules/budget-audit-rules.md`（按需）
- `.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`（按需）
- `.opencode/references/mes-ai-reference/rules/governance/shared-knowledge-write-policy.md`（按需）

## 五、条件加载
- 涉及统一状态源：加载 `scenario-state-migration.md`
- 涉及共享知识收口：加载 `scenario-shared-knowledge-converge.md`
- 涉及锁冲突：加载 `scenario-lock-conflict.md`
- 采用 GSD：加载 `scenario-gsd.md`

## 六、标准步骤
1. 确认初始化目标与范围
2. 建立最小计划与执行批次
3. 生成局部结果
4. 校验局部结果
5. 更新状态与 pending 信息
6. 判断是否触发 converge
7. 阶段收尾

## 六点五、事实结论三态规则

初始化阶段所有结论型知识只允许以下三种状态：

1. **确认结论**
   - 已找到明确事实来源
   - 可追溯到类定义、配置文件、SQL/脚本、接口签名或实际调用代码
   - 可作为后续分析、设计、开发的直接输入

2. **候选结论**
   - 已有局部证据，但事实链尚未闭合
   - 必须显式标注低置信度、证据不足点与待补证项
   - 不得写成统一规范或既定事实

3. **明确未知**
   - 当前范围内未找到足够依据
   - 应明确写为未知/待补证
   - 不得使用模板示例、通用框架习惯或常识推断进行补洞

禁止出现第四种状态：**无事实来源但看起来完整的常识性补全结论**。

## 七、硬约束
- 不得边扫描边直接覆盖共享最终文件
- 不得将局部结果伪装成全局完成态
- 不得在未明确 scope 时开始正式初始化
- 不得在收口前直接修改 `knowledge/state/state.yaml`
- 不得以通用框架常识替代项目私有规范
- 不得在未识别定义点时输出统一响应、错误、认证、MQ 等全局契约结论
- 不得将空模板、占位文件或仅有章节骨架的文档视为已可消费知识
- 不得跳过 SDK / common / 公共协议模型扫描后直接生成契约示例
- 不得默认以 jar 反编译替代源码事实
- 不得将反编译结果视为无条件高置信度事实

## 八、退出条件
- 当前 scope 的局部结果已生成并校验
- 状态片段或 pending 信息已更新
- 已明确是否进入 converge
- 已完成收尾扫描

## 九、统一引用写法
“初始化阶段的目标边界、模式分类、局部结果产出、续传约束、收口触发与退出判断，必须符合 `.opencode/references/mes-ai-reference/rules/phases/phase-init.md`。”
