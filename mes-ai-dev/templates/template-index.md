---
title: 模板索引
doc_type: index
load_strategy: index-only
phase_scope: []
trigger:
  - template-selection
cost_level: medium
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/command-skill-artifact-map.md
  - knowledge/rules/governance/document-load-metadata-standard.md
---

# 模板索引

> 本索引可作为默认导航入口读取；具体模板正文仅在明确产物任务命中时按需进入。
> 本索引为模板导航的单一入口。
> 模板按阶段目录组织：analyze / design / develop / test / deliver / governance / code。
> 选型原则：按阶段定位 → 按场景选择具体模板。
>
> **补充导航**：若当前问题不是“该用哪个模板”，而是“某个 Command 在某个 Phase 应该调用哪个 Skill、产出哪个标准文件名”，请优先查阅：
> `mes-ai-dev/knowledge/reference/command-skill-artifact-map.md`
>
> **规则导航补充**：若当前问题不是“模板怎么选”，而是“当前阶段该加载哪些规则、哪些治理规则已经下沉、哪些场景规则应按需加载”，请优先查阅：
> - `mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md`
> - `mes-ai-dev/knowledge/rules/phases/phase-*.md`
> - `mes-ai-dev/knowledge/rules/scenarios/scenario-*.md`
> - `mes-ai-dev/knowledge/rules/governance/*.md`
>
> **产物责任补充**：若当前问题不是“模板怎么写”，而是“这个产物通常由 AI 生成还是人补充、阶段产物该重点看哪些”，请优先查阅：
> - `mes-ai-dev/knowledge/reference/skeleton-artifact-ownership-guide.md`
> - `mes-ai-dev/knowledge/reference/stage-artifact-guide.md`

---

## 一、目录结构

```
templates/
├── analyze/      # 需求分析阶段模板（15个）
├── design/       # 详细设计阶段模板（12个）
├── develop/      # 代码开发阶段模板（6个）
├── test/         # 测试验证阶段模板（7个）
├── deliver/      # 发布交付阶段模板（7个）
├── governance/   # 治理与规范模板（16个）
├── code/         # 代码骨架模板（18个）
└── template-index.md  # 本索引文件
```

---

## 二、各阶段模板清单

### 2.1 需求分析阶段（analyze/）

| 文件 | 场景 | 用途说明 |
|------|------|---------|
| `raw-requirement-template.md` | 原始需求录入 | 记录业务原始表述，未经结构化处理 |
| `exploration-template.md` | 探索文档 | 歧义拆解、方案比较、边界排查 |
| `proposal-template.md` | 提案文档 | 推荐方案、取舍理由、待确认决策 |
| `requirement-spec-template.md` | 需求规格文档 | 结构化需求规格，含功能点/验收标准 |
| `requirement-lineage-template.md` | 需求追溯链 | 需求→设计→代码→测试的完整链路 |
| `impact-scope-template.md` | 影响范围分析 | 识别受影响的服务/模块/表 |
| `impact-ledger-template.md` | 影响登记簿 | 持续记录历史影响分析结果 |
| `flow-trace-template.md` | 业务流追溯 | 跨服务调用链路追踪 |
| `business-flow-trace-report-template.md` | 业务流程追踪报告 | 从前端到数据库的完整调用链路追踪报告 |
| `repo-impact-list-template.md` | 仓级影响清单 | 记录受影响仓、仓角色、证据链与置信度 |
| `repo-placement-decision-template.md` | 仓落点决策 | 说明候选仓、最终落点与放弃理由 |
| `provider-selection-template.md` | Provider选择 | 说明技术可达、架构允许与最终选定 provider |
| `api-reuse-decision-template.md` | API复用决策 | 说明复用/扩展/新增判断与兼容边界 |
| `ambiguity-checklist-template.md` | 需求歧义检查 | 需求澄清阶段的歧义识别清单 |
| `spec-review-report-template.md` | 需求规格评审报告 | 五维度需求规格评审报告模板 |

### 2.2 详细设计阶段（design/）

| 文件 | 场景 | 用途说明 |
|------|------|---------|
| `design-doc-template.md` | 设计文档母版 | 完整设计文档，含API/DB/前端章节 |
| `tech-approach-template.md` | 技术方案 | 技术选型、架构决策、实现路径 |
| `api-design-template.md` | API设计 | REST接口设计，含请求/响应/错误码 |
| `database-design-template.md` | 数据库设计 | Schema变更、索引设计、风险评估 |
| `db-migration-template.md` | 数据库迁移 | DDL执行计划、回滚策略、验证脚本 |
| `adr-template.md` | 架构决策记录 | ADR格式记录重要架构决策 |
| `cross-service-consistency-template.md` | 跨服务一致性 | 服务间命名/数据/流程一致性检查 |
| `compatibility-design-template.md` | 兼容性设计 | 向后兼容性评估与触发条件检查 |
| `design-performance-impact-template.md` | 性能影响分析 | 设计阶段性能影响评估 |
| `design-observability-template.md` | 可观测性设计 | 监控/日志/链路追踪设计 |
| `design-regression-scope-template.md` | 设计回归范围 | 设计变更后的回归影响范围 |
| `code-pattern-consistency-template.md` | 代码模式一致性 | 与现有实现模式对齐检查 |

### 2.3 代码开发阶段（develop/）

| 文件 | 场景 | 用途说明 |
|------|------|---------|
| `task-plan-template.md` | 任务拆分计划 | 从设计文档拆分开发任务 |
| `agent-handoff-template.md` | Agent交接母版 | 统一 completion/results 两类交接 |
| `coordination-template.md` | 多仓协调 | 多团队/多服务协同开发协调 |
| `rollback-template.md` | 回滚准备 | 开发阶段回滚预案与验证 |
| `defect-tracking-template.md` | 缺陷追踪 | 缺陷记录与关闭标准 |
| `data-regression-template.md` | 数据回归 | 数据迁移后回归验证 |

### 2.4 测试验证阶段（test/）

| 文件 | 场景 | 用途说明 |
|------|------|---------|
| `test-case-template.md` | 测试用例 | 测试场景设计与预期结果 |
| `test-report-template.md` | 测试报告 | 测试结果汇总与覆盖率统计 |
| `uat-scenario-template.md` | UAT场景 | 用户验收测试场景设计 |
| `smoke-and-gray-template.md` | 冒烟/灰度测试 | 发布前快速验证场景 |
| `regression-testdata-template.md` | 回归测试数据 | 回归测试数据准备与管理 |
| `nfr-checklist-template.md` | 非功能需求检查 | 性能/安全/可用性等NFR检查清单 |
| `verification-evidence-template.md` | 验证证据 | 测试验证的证据记录模板 |

### 2.5 发布交付阶段（deliver/）

| 文件 | 场景 | 用途说明 |
|------|------|---------|
| `delivery-package-template.md` | 交付母版 | 统一交付范围/审计/验收三场景 |
| `deploy-plan-template.md` | 部署计划 | 部署步骤、环境差异、回滚预案 |
| `delivery-audit-record-template.md` | 交付审计记录 | 交付物完整性审计记录 |
| `go-nogo-template.md` | Go/No-Go决策 | 发布前29项系统性评估 |
| `release-note-template.md` | 发布说明 | 版本变更内容、升级指南、回滚指南 |
| `post-release-checklist-template.md` | 发布后检查 | 发布后监控与验证清单 |
| `release-retrospective-template.md` | 发布复盘 | 发布过程复盘与改进记录 |

### 2.6 治理与规范（governance/）

| 文件 | 场景 | 用途说明 |
|------|------|---------|
| `change-management-template.md` | 变更母版 | 统一变更申请/影响分析/变更清单三场景 |
| `detailed-review-report-template.md` | 详细审查报告母版 | 所有审查结果类产物的统一最小结构模板 |
| `stage-output-report-template.md` | 阶段完成产物报告 | 阶段退出时汇总已生成/未生成产物及原因 |
| `step-gate-review-template.md` | 步骤级门禁审查 | 单个步骤输出进入下一步骤前的强制门禁审查记录 |
| `skeleton-change-review-template.md` | 骨架修改审查 | 审查骨架规则、入口、模板、示例与日志改动是否满足骨架治理要求 |
| `version-governance-template.md` | 版本治理 | 版本号管理、基线记录、变更范围 |
| `repo-profile-template.md` | 仓库画像 | 服务AI开发适配度、风险热力图 |
| `module-responsibility-card-template.md` | 模块责任卡 | 模块职责边界与责任人记录 |
| `review-notes-template.md` | 通用评审报告 | 各阶段可复用的详细审查报告模板 |
| `status-tracker-template.md` | 状态追踪 | `workspace/status-tracker.md` 的标准字段与更新协议 |
| `user-guide-template.md` | 用户指南 | 功能使用说明文档模板 |
| `operations-manual-template.md` | 运维手册 | 运维操作与故障处理手册 |
| `handoff-template.md` | 项目交接 | 项目/团队交接文档模板 |
| `traceability-template.md` | 追溯矩阵 / Trace Matrix | 需求→设计→代码→测试追溯矩阵（可作为 trace-matrix 模板） |
| `acceptance-criteria-graded-template.md` | 分级验收标准 | 按优先级分级的验收标准定义 |
| `refresh-hints-template.md` | 知识刷新提示 | 知识库刷新操作提示模板 |
| `schema-index-template.md` | Schema索引 | 数据库Schema索引模板 |
| `schema-tables-template.md` | Schema表结构明细 | 数据库 Schema 表结构深化模板 |
| `schema-relations-template.md` | Schema关系分析 | 数据库 Schema 关系分析深化模板 |
| `converge-report-template.md` | 初始化收敛报告 | 多次单仓初始化后的全局收敛结果记录 |
| `fragment-terminology-template.md` | 术语表片段 | reference/terminology 片段模板 |
| `fragment-domain-model-template.md` | 领域模型片段 | reference/domain-model 片段模板 |
| `fragment-business-flows-template.md` | 业务链路片段 | code-map/business-flows 片段模板 |
| `fragment-ownership-template.md` | 实体归属片段 | code-map/ownership 片段模板 |
| `fragment-patterns-template.md` | 实现模式片段 | code-map/patterns 片段模板 |
| `fragment-hotspots-template.md` | 热点候选片段 | code-map/hot-* 片段模板 |
| `fragment-convergence-checklist-template.md` | 片段收口前检查 | 收口前统一检查命名/重复/冲突/可消费性 |
| `api-registry-index-template.md` | API索引文件 | api-registry 索引化收口模板 |
| `domain-model-index-template.md` | 领域模型索引 | domain-model 索引化收口模板 |
| `terminology-glossary-index-template.md` | 术语表索引 | terminology-glossary 索引化收口模板 |
| `business-rules-template.md` | 真实业务规则 | business-rules 规则沉淀模板 |
| `change-impact-memory-template.md` | 变更影响记忆 | change-impact-memory 经验沉淀模板 |
| `stage-memory-template.md` | 阶段记忆 | 阶段交接、恢复与阶段经验摘要模板 |
| `pitfall-ledger-template.md` | 阶段坑点台账 | 记录阶段坑点、规避规则与证据路径 |
| `decision-log-template.md` | 阶段决策日志 | 记录关键决策、选型取舍与 ADR 候选 |
| `blocker-log-template.md` | 阶段阻塞台账 | 记录 blocker 分类、代偿推进与后补动作 |
| `test-assets-template.md` | 测试资产 | test-assets 测试接管模板 |
| `testability-matrix-template.md` | 测试可测性矩阵 | testability-matrix 评估模板 |
| `e2e-chains-template.md` | E2E链路 | e2e-chains 测试链路模板 |
| `runtime-map-template.md` | 运行时配置地图 | runtime 运行环境接管模板 |
| `ai-takeover-readiness-template.md` | AI接管准备度 | AI 接管 readiness 评估模板 |
| `path-canonicalization-audit-template.md` | 路径 canonical 审计 | 路径命名规范检查模板 |
| `self-review-report-template.md` | 自审报告 | 六维代码自审报告模板 |
| `design-deviation-template.md` | 设计偏差记录 | 设计与实现偏差记录模板 |
| `state-migration-report-template.md` | 状态迁移校验报告 | 统一状态源迁移校验专项报告模板 |
| `response-conventions-template.md` | 响应契约 | 记录统一响应包装、来源类型、字段与样例接口 |
| `authentication-conventions-template.md` | 认证契约 | 记录认证方式、透传字段、失败口径与来源类型 |
| `mq-conventions-template.md` | MQ契约 | 记录消息主题、消息体结构、失败处理与来源类型 |
| `gateway-conventions-template.md` | 网关契约 | 记录网关入口、路由规则、透传字段与来源类型 |
| `blocker-record-template.md` | blocker 记录 | 记录 blocker 分类、代偿动作、后补动作与升级路径 |
| `minimum-deliverable-template.md` | 最小可交付 | 记录当前已形成的最小可继续结果 |
| `definition-of-done-template.md` | DoD 定义 | 定义完整完成 / GSD 完成 / 不完成标准 |
| `completion-sweep-template.md` | 收尾扫描 | 阶段或任务结束前的统一收尾扫描模板 |
| `next-step-recommendation-template.md` | 下一步建议 | 输出推荐下一步、待确认项与可立即推进项 |
| `document-auto-optimization-audit-template.md` | 自动调优审计 | 记录文档自动检测、判定、动作与留痕的统一审计模板 |
| `skeleton-remediation-regression-plan-template.md` | 骨架整改回归计划 | 记录骨架整改后的专项回归范围、基线案例与执行计划 |
| `skeleton-remediation-regression-result-template.md` | 骨架整改回归结果 | 记录骨架整改后的专项回归结论、问题清单与下一步动作 |
| `skeleton-remediation-regression-checklist-template.md` | 骨架整改回归清单 | 骨架整改专项回归的标准检查项模板 |
| `code-generation-authenticity-regression-checklist-template.md` | 代码生成真实性回归清单 | 专门覆盖虚构表、错 import、错 namespace、错方法、错返回值的专项检查项 |
| `code-generation-authenticity-regression-result-template.md` | 代码生成真实性回归结果 | 记录 5 类真实问题的专项回归结论、剩余风险与下一步动作 |
| `validation-rule-structuring-template.md` | 业务校验规则结构化 | 将业务语言校验规则转为结构化规则表，形成"业务表述→结构化规则"转换方法 |
| `validation-placement-decision-template.md` | 校验点归属判断 | 判断校验应在前端/Controller/Service/跨服务哪个层次实现，防止校验可绕过 |
| `validation-logic-expression-template.md` | 校验逻辑表达式设计 | 将结构化校验规则转为具体代码表达式，保障实现一致性 |
| `cross-db-validation-design-template.md` | 跨库校验方案设计 | 设计跨库数据校验方案，含限定通道调用链、禁止路径、风险边界 |
| `warning-mechanism-template.md` | 业务预警机制设计 | 设计预警触发、展示、处理、记录、关闭完整链路，区分预警与阻断 |
| `validation-fallback-template.md` | 校验失败回退边界设计 | 设计校验失败后的回退边界和业务处理流程，防止状态悬空 |
| `business-scenario-index-template.md` | 业务场景定义索引 | 从代码、枚举、配置中提取业务场景候选定义，形成业务语义定义索引 |

### 2.7 代码骨架（code/）

| 文件 | 用途 |
|------|------|
| `backend-controller-template.java` | 后端 Controller 骨架 |
| `backend-service-template.java` | 后端 Service 骨架 |
| `backend-dao-template.java` | DAO/Mapper 骨架 |
| `backend-entity-template.java` | Entity 骨架 |
| `backend-dto-template.java` | DTO 骨架 |
| `backend-vo-template.java` | VO 骨架 |
| `backend-page-vo-template.java` | 分页VO 骨架 |
| `frontend-api-template.js` | 前端 API 调用骨架 |
| `frontend-page-template.vue` | 前端页面骨架 |
| `vue-page-options-api.vue` | Vue页面模板（Options API） |
| `vue-page-composition-api.vue` | Vue页面模板（Composition API / TypeScript） |
| `vue-route-config.js` | Vue路由配置模板 |
| `vue-component-options-api.vue` | Vue组件模板（Options API） |
| `vue-component-composition-api.vue` | Vue组件模板（Composition API / TypeScript） |
| `vue-detail-subcomponent.vue` | Vue详情子组件模板 |
| `frontend-api-js.js` | 前端API模板（JavaScript） |
| `frontend-api-ts.ts` | 前端API模板（TypeScript） |
| `frontend-api-types.ts` | 前端API类型定义模板 |

---

## 三、优先模板速查

| 场景 | 优先模板 | 说明 |
|------|---------|------|
| 落地与试点指南 | `mes-ai-dev/adoption-guide.md` | 当关注“如何引入、如何试点、如何判断 adoption 是否成功”时，优先查看独立 adoption 指南 |
| Command / Skill / 标准产物映射 | `knowledge/reference/command-skill-artifact-map.md` | 当需要确认某个阶段应调用哪个 Skill、标准产物叫什么、评审报告文件名应如何命名时，优先查这份总表 |
| 通用详细审查报告 | `governance/detailed-review-report-template.md` | 所有审查结果类产物的统一母版，现有场景模板至少需满足其最小字段集 |
| 阶段完成产物报告 | `governance/stage-output-report-template.md` | 阶段退出时统一说明本阶段标准产物、已生成文件、未生成文件及原因 |
| 阶段记忆 | `governance/stage-memory-template.md` | 阶段交接、恢复、风险与下一阶段建议的标准模板 |
| 阶段坑点台账 | `governance/pitfall-ledger-template.md` | 记录高风险坑点、触发条件、根因与规避动作 |
| 阶段决策日志 | `governance/decision-log-template.md` | 记录关键决策、取舍原因与 ADR 升级候选 |
| 阶段阻塞台账 | `governance/blocker-log-template.md` | 记录 blocker 分类、代偿动作与后补动作 |
| 共享知识片段（术语） | `governance/fragment-terminology-template.md` | 用于 reference/terminology 片段，最终需经主控收口 |
| 共享知识片段（领域） | `governance/fragment-domain-model-template.md` | 用于 reference/domain-model 片段，最终需经主控收口 |
| 共享知识片段（链路/归属/模式） | `governance/fragment-business-flows-template.md` / `fragment-ownership-template.md` / `fragment-patterns-template.md` | 用于 code-map 全局片段，最终需经主控收口 |
| 共享知识片段（热点候选） | `governance/fragment-hotspots-template.md` | 用于 hot-* 候选片段，最终需统一重算为正式热点文件 |
| 共享知识片段收口前检查 | `governance/fragment-convergence-checklist-template.md` | 主控或 `/mes-init-converge` 合并片段前的统一检查模板 |
| 高风险大文件索引（API） | `governance/api-registry-index-template.md` | 用于 api-registry 的索引化收口，完整明细下沉到服务级片段 |
| 高风险大文件索引（领域） | `governance/domain-model-index-template.md` | 用于 domain-model 的索引化收口，正文按业务域分片 |
| 高风险大文件索引（术语） | `governance/terminology-glossary-index-template.md` | 用于 terminology-glossary 的索引化收口，正文按服务/术语组分片 |
| AI接管能力资产（业务规则） | `governance/business-rules-template.md` | 用于沉淀真实业务规则、状态流转、校验与跨服务一致性 |
| AI接管能力资产（影响记忆） | `governance/change-impact-memory-template.md` | 用于沉淀历史联动范围、回归热点与回滚热点 |
| AI接管能力资产（测试接管） | `governance/test-assets-template.md` / `testability-matrix-template.md` / `e2e-chains-template.md` | 用于沉淀测试资产、可测性矩阵与 E2E 链路 |
| AI接管能力资产（运行环境） | `governance/runtime-map-template.md` / `governance/operations-manual-template.md` | 用于沉淀环境差异、功能开关、外部依赖与运维约束 |
| AI接管准备度评估 | `governance/ai-takeover-readiness-template.md` | 用于评估当前知识库是否足以支撑 AI 在目标范围内接管仓库工作 |
| 路径 canonical 审计 | `governance/path-canonicalization-audit-template.md` | 用于审计错误根目录、前缀缺失、片段命名违规与示例漂移 |
| 自动调优审计 | `governance/document-auto-optimization-audit-template.md` | 用于记录文档超阈值后的自动检测、判定、执行与复审过程 |
| 骨架整改专项回归 | `governance/skeleton-remediation-regression-plan-template.md` / `skeleton-remediation-regression-checklist-template.md` / `skeleton-remediation-regression-result-template.md` | 用于骨架适配整改后的专项回归计划、检查清单与结果留痕 |
| 代码生成真实性专项回归 | `governance/code-generation-authenticity-regression-checklist-template.md` / `code-generation-authenticity-regression-result-template.md` | 用于验证虚构表、错 import、错 namespace、错方法、错返回值 5 类问题是否已被联合阻断 |
| 业务校验规则结构化 | `governance/validation-rule-structuring-template.md` | 将业务语言校验规则转为结构化规则表（六步转换流程） |
| 校验点归属判断 | `governance/validation-placement-decision-template.md` | 判断校验应在哪个层次实现，防止前端替代后端等错误 |
| 校验逻辑表达式设计 | `governance/validation-logic-expression-template.md` | 将结构化规则转为代码表达式，保障实现一致性 |
| 跨库校验方案设计 | `governance/cross-db-validation-design-template.md` | 跨库数据校验完整方案（限定通道调用链、二次校验、风险边界） |
| 业务预警机制设计 | `governance/warning-mechanism-template.md` | 预警触发→展示→处理→记录→关闭完整链路 |
| 校验失败回退边界设计 | `governance/validation-fallback-template.md` | 校验失败后的回退边界和业务处理流程 |
| 业务场景定义索引 | `governance/business-scenario-index-template.md` | 从代码提取业务场景候选定义，形成语义定义索引 |
| 契约模板族（响应/认证/MQ/网关） | `reference/response-conventions-template.md` / `authentication-conventions-template.md` / `mq-conventions-template.md` / `gateway-conventions-template.md` | 用于将业务仓外契约、平台契约与集成契约按来源类型、版本一致性与真实样例统一落盘 |
| AI接管准备度示例 | `workspace/examples/example-ai-takeover-readiness.md` | 演示 readiness 成品形态，供能力评估场景参考 |
| 路径 canonical 审计示例 | `workspace/examples/example-path-canonicalization-audit.md` | 演示路径规范审计成品形态，供治理审计场景参考 |
| 骨架修改审查示例 | `workspace/examples/example-skeleton-change-review.md` | 演示骨架修改审查成品形态，供后续骨架治理审查场景参考 |
| 步骤级门禁审查示例 | `workspace/examples/example-step-gate-review.md` | 演示 step-gate 审查记录成品形态，供执行层落盘与审计场景参考 |
| 高风险大文件索引示例 | `workspace/examples/example-api-registry-index.md` / `example-domain-model-index.md` / `example-terminology-glossary-index.md` | 演示索引文件成品形态，供收口阶段参考 |
| REQ 目录分类示例 | `workspace/examples/example-req-directory-classification.md` | 演示 `deliverable/report/evidence/handoff/memory/working` 六类目录如何在真实 REQ 中组织 |
| Agent任务交接 | `develop/agent-handoff-template.md` | 统一 completion/results 两类交接 |
| 跨阶段变更管理 | `governance/change-management-template.md` | 变更申请/影响分析/清单三合一 |
| 初始化结果收敛 | `governance/converge-report-template.md` | 单仓初始化收敛为全仓视角结果的标准报告 |
| 前端页面开发 | `code/vue-page-options-api.vue` / `code/vue-page-composition-api.vue` | 按模块技术栈选择页面模板 |
| 前端组件开发 | `code/vue-component-options-api.vue` / `code/vue-component-composition-api.vue` | 按模块技术栈选择组件模板 |
| 前端API开发 | `code/frontend-api-js.js` / `code/frontend-api-ts.ts` | 按模块技术栈选择 API 模板 |
| 开发自审 | `governance/self-review-report-template.md` | 自审报告与问题分级输出模板 |
| 状态迁移校验 | `governance/state-migration-report-template.md` | 统一状态源迁移校验专项报告模板 |
| 交付边界审计验收 | `deliver/delivery-package-template.md` / `deliver/delivery-audit-record-template.md` | 交付范围母版 + 详细审计留痕模板 |
| 发布说明 | `deliver/release-note-template.md` | 保持独立，与交付母版配套使用 |
| 设计文档 | `design/design-doc-template.md` | 完整设计文档母版 |
| 需求规格 | `analyze/requirement-spec-template.md` | 结构化需求规格 |
| 需求规格评审 | `analyze/spec-review-report-template.md` | 五维度需求规格评审报告模板，且需满足详细审查报告最小字段集 |
| 业务流程追踪 | `analyze/business-flow-trace-report-template.md` | 从前端到数据库的完整调用链路追踪报告 |
| 步骤级门禁审查 | `governance/step-gate-review-template.md` | 单步骤输出的强制门禁审查与打回重做记录，且需保留问题/风险/证据/闭环字段 |
| 骨架修改审查 | `governance/skeleton-change-review-template.md` | 骨架修改专用审查模板，覆盖约束纳入、人工确认、入口同步与日志留痕检查 |
| GSD blocker 治理 | `governance/blocker-record-template.md` | blocker 分类、推进判定、代偿与后补动作记录模板 |
| GSD 最小可交付 | `governance/minimum-deliverable-template.md` | 当前为何允许继续推进的最小结果说明模板 |
| GSD 完成定义 | `governance/definition-of-done-template.md` | 完整完成 / GSD 完成 / 不完成的标准模板 |
| GSD 收尾扫描 | `governance/completion-sweep-template.md` | 任务或阶段结束前的统一收尾扫描模板 |
| GSD 下一步建议 | `governance/next-step-recommendation-template.md` | 输出推荐下一步、待确认项与推进建议 |

> GSD 模板落盘方式建议：
> - `blocker-record-template.md`：命中硬阻塞时强制独立落盘；软阻塞可独立落盘或内联到阶段产物中
> - `minimum-deliverable-template.md`：命中 `GSD Continue Exit` 时推荐独立落盘
> - `definition-of-done-template.md`：阶段级 DoD 可独立落盘，工作单元级 DoD 可独立落盘或内联到开发/设计产物中
> - `completion-sweep-template.md`：阶段结束前推荐独立落盘
> - `next-step-recommendation-template.md`：可独立落盘，也可作为阶段结论中的固定小节内联
| 需求状态追踪 | `governance/status-tracker-template.md` | 阶段/步骤/门禁结论/退回原因的统一状态总表模板 |

---

## 四、选型建议

1. **按阶段定位**：先确定当前处于哪个阶段，进入对应目录
2. **按场景选择**：每个模板文件名直观反映其场景
3. **母版优先**：当需要覆盖多个相近场景时，优先使用母版模板
4. **单一导航入口**：本索引为唯一模板导航入口，不另设分散的索引文件
5. **代码骨架独立**：代码骨架模板位于 `code/` 目录，与阶段模板分开

---

## 五、统计

| 目录 | 数量 |
|------|------|
| analyze/ | 9 |
| design/ | 12 |
| develop/ | 6 |
| test/ | 7 |
| deliver/ | 7 |
| governance/ | 46 |
| code/ | 18 |

---

## 六、与新分层规则结构的关系

模板只解决“怎么写产物”，不解决“当前阶段该做什么”。

当前骨架已采用：
- Core 常驻规则
- Phase 阶段规则
- Scenario 场景规则
- Governance 治理母规则

推荐顺序：

1. 先查 `AGENTS.md` 与 `knowledge/reference/skeleton-loading-matrix.md`，确认当前应加载哪些规则
2. 再查 `knowledge/rules/phases/phase-*.md`，确认当前阶段目标、步骤与退出条件
3. 命中特殊条件时再查 `knowledge/rules/scenarios/scenario-*.md`
4. 需要写产物时再回到本模板索引选模板

常用入口：
- 阶段规则：`mes-ai-dev/knowledge/rules/phases/`
- 场景规则：`mes-ai-dev/knowledge/rules/scenarios/`
- 治理母规则：`mes-ai-dev/knowledge/rules/governance/`
- 技能索引：`mes-ai-dev/knowledge/reference/phase-skill-index.md`
| **合计** | **105** |
