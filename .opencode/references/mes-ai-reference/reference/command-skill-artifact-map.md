# 骨架 Command-Skill-Artifact 映射总表

> 用途：统一骨架命令、阶段 skill 与标准产物命名，减少 command 文档、skill 文档和阶段产物之间的漂移。
> 规则：若本表与单个 command/skill 文档冲突，优先修正文档使其与本表一致；若需调整本表，必须同步刷新相关 command、skill 与骨架修改日志。

> **规则分层补充**：本表只解决 Command / Skill / Artifact 的标准映射，不替代阶段规则与场景规则。
> 若当前问题是“本阶段该加载哪些规则”而不是“产物叫什么”，优先查：
> - `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
> - `.opencode/references/mes-ai-reference/rules/phases/phase-*.md`
> - `.opencode/references/mes-ai-reference/rules/scenarios/scenario-*.md`
> - `.opencode/references/mes-ai-reference/rules/governance/*.md`

---

## 一、需求分析链路

| Command | Phase | 标准 Skill | 主要输入 | 标准产物 |
|---|---|---|---|---|
| `mes-analyze-requirement` | Phase 1 需求解析 | `mes-analyze-parse-requirement` | 原始需求描述 | `raw-requirement.md` |
| `mes-analyze-requirement` | Phase 2 影响分析 | `mes-analyze-impact-scope` | `raw-requirement.md` | 影响范围分析（追加到 `raw-requirement.md`） |
| `mes-analyze-requirement` | Phase 3 迭代差异分析 | `mes-analyze-requirement-diff` | `raw-requirement.md` + 历史需求 | 差异分析（追加到 `raw-requirement.md`） |
| `mes-analyze-requirement` | Phase 4 仓库影响识别 | `mes-analyze-identify-repos` | `raw-requirement.md` + `business-flow-trace.md` | `repo-impact-list.md`、`repo-placement-decision.md`（并将仓库影响结论追加到 `raw-requirement.md`） |
| `mes-analyze-requirement` | Phase 5 业务链与 Provider 选择 | `mes-analyze-trace-flow` | `raw-requirement.md` + `frontend-backend-map.md` + `service-dependencies.md` | `business-flow-trace.md`、`provider-selection.md`、`api-reuse-decision.md` |
| `mes-analyze-requirement` | Phase 5.5 探索文档（条件） | `mes-analyze-parse-requirement` | `raw-requirement.md` + 影响分析结论 | `exploration.md`（按需） |
| `mes-analyze-requirement` | Phase 5.6 提案文档（条件） | `mes-analyze-parse-requirement` | `exploration.md` + 关键决策点 | `proposal.md`（按需） |
| `mes-analyze-requirement` | Phase 6 规格生成 | `mes-analyze-generate-spec` | `raw-requirement.md` + `business-flow-trace.md` + `repo-impact-list.md` + `exploration.md`（按需） + `proposal.md`（按需） | `spec.md`、`nfr-checklist.md` |
| `mes-analyze-requirement` | Phase 7 需求评审 | `mes-analyze-review-spec` | `spec.md` | `spec-review-report.md` |

### 需求分析阶段标准评审产物

- 阶段详细审查报告：`spec-review-report.md`
- 条件 OpenSpec 产物：`exploration.md`、`proposal.md`
- 推荐模板：`exploration-template.md`、`proposal-template.md`
- 多仓/跨服务专项产物：`repo-impact-list.md`、`repo-placement-decision.md`、`provider-selection.md`、`api-reuse-decision.md`
- 验收追溯专项产物：`acceptance-trace-matrix.md`（按需）

---

## 二、详细设计链路

| Command | Phase | 标准 Skill | 主要输入 | 标准产物 |
|---|---|---|---|---|
| `mes-design-detail` | Phase 1 方案设计 | `mes-design-approach` | `spec.md` | `tech-approach.md` |
| `mes-design-detail` | Phase 2 数据库设计 | `mes-design-database` | `spec.md` + `tech-approach.md` | `database-design.md` |
| `mes-design-detail` | Phase 2 接口设计 | `mes-design-api` | `spec.md` + `tech-approach.md` | `api-design.md` |
| `mes-design-detail` | Phase 2 前端设计 | `mes-design-frontend` | `spec.md` + `tech-approach.md` + `api-design.md` | `frontend-design.md` |
| `mes-design-detail` | Phase 3 服务调用链 | `mes-design-service-chain` | `spec.md` + `tech-approach.md` + `api-design.md` | `service-chain-design.md` |
| `mes-design-detail` | Phase 4 跨服务一致性与边界冻结 | `mes-design-check-consistency` | `service-chain-design.md` + `provider-selection.md` + `api-reuse-decision.md` | `cross-service-consistency.md`、`architecture-boundary-decision.md` |
| `mes-design-detail` | Phase 5 文档生成 | `mes-design-generate-doc` | `tech-approach.md`、`database-design.md`、`api-design.md`、`frontend-design.md`、`service-chain-design.md`、`cross-service-consistency.md` | `design.md` |
| `mes-design-detail` | Phase 6 设计评审 | `mes-design-review-approach` | `design.md` + 各设计中间产物 | `design-review-report.md` |

### 设计阶段标准产物分层

- 中间设计产物：`tech-approach.md`、`database-design.md`、`api-design.md`、`frontend-design.md`、`service-chain-design.md`、`cross-service-consistency.md`、`architecture-boundary-decision.md`
- 主设计文档：`design.md`
- 阶段详细审查报告：`design-review-report.md`

---

## 三、开发链路

| Command | Phase | 标准 Skill | 主要输入 | 标准产物 |
|---|---|---|---|---|
| `mes-develop-code` | Phase 1 开发规划 | `mes-develop-plan-tasks` | `design.md` + 细分设计 | `tasks.md` |
| `mes-develop-code` | Phase 1.5 TDD 用例计划 | `mes-test-plan-cases` | `spec.md` + `design.md` + `tasks.md` + 存量测试资产 | `test-cases.md` |
| `mes-develop-code` | Phase 2 数据库开发 | `mes-develop-database-script` | `database-design.md` | 数据库脚本 / DDL |
| `mes-develop-code` | Phase 3 后端模型 | `mes-develop-backend-model` | `design.md` | 后端模型代码 |
| `mes-develop-code` | Phase 3 后端 DAO | `mes-develop-backend-dao` | `design.md` | DAO / Mapper 代码 |
| `mes-develop-code` | Phase 3 后端 Service | `mes-develop-backend-service` | `design.md` | Service 代码 |
| `mes-develop-code` | Phase 3 后端 Controller | `mes-develop-backend-controller` | `design.md` + `api-design.md` | Controller 代码 |
| `mes-develop-code` | Phase 3 后端配置 | `mes-develop-backend-config` | `design.md` | 配置代码 |
| `mes-develop-code` | Phase 4 前端 API | `mes-develop-frontend-api` | `design.md` + `api-design.md` | 前端 API 代码 |
| `mes-develop-code` | Phase 4 前端组件 | `mes-develop-frontend-component` | `design.md` | 前端组件代码 |
| `mes-develop-code` | Phase 4 前端页面 | `mes-develop-frontend-page` | `design.md` + `api-design.md` | 前端页面 / 路由代码 |
| `mes-develop-code` | Phase 5 自审 | `mes-develop-self-review` | `tasks.md` + 设计文档 + 代码 | `self-review-report.md` |
| `mes-develop-code` | Phase 5 安全审查 | `mes-develop-security-review` | 代码 + `api-design.md` + `database-design.md` | `security-review-report.md` |

### 开发阶段标准评审产物

- 自审报告：`self-review-report.md`
- 安全审查报告：`security-review-report.md`
- 阶段详细审查报告：`development-review-report.md`
- TDD 先行产物：`test-cases.md`
- 测试交接专项产物：`verify-object-change-list.md`（按需）
- 知识回写提示：`refresh-hints.md`（按需）

---

## 四、测试链路

| Command | Phase | 标准 Skill | 主要输入 | 标准产物 |
|---|---|---|---|---|
| `mes-test-verify` | Phase 1 测试规划 | `mes-test-plan-cases` | `spec.md` + `design.md` + `tasks.md` | `test-cases.md` |
| `mes-test-verify` | Phase 2 单元测试 | `mes-test-generate-unit` | `test-cases.md` + 源码 | 单元测试代码 |
| `mes-test-verify` | Phase 2 集成测试 | `mes-test-generate-integration` | `test-cases.md` + `design.md` | `integration-tests.md` / 集成测试代码 |
| `mes-test-verify` | Phase 2 性能分析 | `mes-test-performance-analysis` | 代码 + 数据库设计 | `performance-analysis.md` |
| `mes-test-verify` | Phase 4 测试报告 | `mes-test-generate-report` | `test-cases.md` + 测试结果 | `test-report.md` |

### 测试阶段标准评审产物

- 阶段详细审查报告：`test-review-report.md`
- 验收/发布追溯输入：`acceptance-trace-matrix.md`（按需）
- TDD 闭环证据：`test-cases.md` + `test-report.md`
- 覆盖率与删测检查结论：`test-report.md`

---

## 五、交付链路

| Command | Phase | 标准 Skill | 主要输入 | 标准产物 |
|---|---|---|---|---|
| `mes-deliver-release` | Phase 1 部署规划 | `mes-deliver-deploy-plan` | `test-report.md` + `design.md` | `deploy-plan.md` |
| `mes-deliver-release` | Phase 2 验收检查 | `mes-deliver-acceptance-check` | `spec.md` + `test-report.md` + `self-review-report.md` | `acceptance-report.md` |
| `mes-deliver-release` | Phase 3 部署执行 | `mes-deliver-execute-deploy` | `deploy-plan.md` + `acceptance-report.md` | `deploy-log.md` 等部署结果 |
| `mes-deliver-release` | Phase 4 发布说明 | `mes-deliver-release-note` | `design.md` + `test-report.md` + `acceptance-report.md` | `release-note.md` |
| `mes-deliver-release` | Phase 4 交付交接 | `mes-deliver-handover` | 全阶段主产物 | `handover-doc.md`、`delivery-scope.md` |

### 交付阶段标准评审产物

- 阶段详细审查报告：`delivery-review-report.md`
- 验收追溯专项产物：`acceptance-trace-matrix.md`（按需，可独立文件或并入 `acceptance-report.md`）
- 知识回写提示：`refresh-hints.md`（按需）

---

## 六、统一命名约束

### 1. 详细审查报告命名

| 阶段 | 标准文件名 |
|---|---|
| 需求分析 | `spec-review-report.md` |
| 详细设计 | `design-review-report.md` |
| 代码开发 | `development-review-report.md` |
| 测试验证 | `test-review-report.md` |
| 发布交付 | `delivery-review-report.md` |
| 知识刷新 | `refresh-review-report.md` |
| 紧急修复 | `emergency-review-report.md` |

### 2. 开发阶段专项审查命名

| 专项 | 标准文件名 |
|---|---|
| 开发自审 | `self-review-report.md` |
| 开发安全审查 | `security-review-report.md` |

### 3. 设计阶段中间产物命名

| 类型 | 标准文件名 |
|---|---|
| 技术方案 | `tech-approach.md` |
| 服务调用链设计 | `service-chain-design.md` |
| 完整设计文档 | `design.md` |

---

## 七、REQ 阶段目录分类管理基线

各阶段 `{REQ-ID}` 目录在不改变原有阶段目录结构的前提下，统一采用以下分类层；`{REQ-ID}` 解析规则遵循 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`：

| 分类目录 | 用途 | 典型文件 |
|---|---|---|
| `deliverable/` | 正式交付物 | `spec.md`、`design.md`、`tasks.md`、`test-report.md`、`release-note.md` |
| `mes-ai-dev/workspace/report/` | 阶段完成产物报告、详细审查报告、步骤门禁报告 | `stage-output-report.md`、`*-review-report.md` |
| `evidence/` | 证据链与验证材料 | 验证记录、链路追踪、检查结果、截图说明 |
| `handoff/` | 阶段交接与恢复材料 | 阶段辅助交接说明（按需） |
| `mes-ai-dev/workspace/memory/` | 阶段经验沉淀 | `pitfall-ledger.md`、`decision-log.md`、`blocker-log.md` |
| `working/` | 草稿与过程性文件 | 临时分析、方案草稿、中间推导 |

补充说明：

1. 该分类层位于 `<phase>/{REQ-ID}/` 下，不替代原有阶段根目录。
2. `deliverable/` 与 `mes-ai-dev/workspace/report/`、`evidence/`、`handoff/`、`mes-ai-dev/workspace/memory/`、`working/` 之间职责不可混淆。
3. 若 command / skill / 模板产生新的阶段标准文件，必须同时检查其应落入哪个分类目录。

---

## 八、阶段记忆标准产物基线

阶段记忆属于跨阶段交接与经验复用的标准产物，不属于可选附录。统一基线如下：

| 层级 | 标准文件 | 固定位置 | 用途 |
|---|---|---|---|
| 局部阶段交接 | OpenSpec 主交接文档 | 阶段根目录主文档 | `spec.md` / `design.md` / `tasks.md` / `test-report.md` / `handover-doc.md` |
| 局部阶段坑点台账 | `pitfall-ledger.md` | `mes-ai-dev/workspace/memory/pitfall-ledger.md` | 记录高风险坑点、触发条件、规避动作 |
| 局部阶段决策日志 | `decision-log.md` | `mes-ai-dev/workspace/memory/decision-log.md` | 记录关键决策、方案取舍、ADR 候选 |
| 局部阶段阻塞台账 | `blocker-log.md` | `mes-ai-dev/workspace/memory/blocker-log.md` | 记录 blocker 分类、代偿推进、后补动作 |
| 全局阶段坑点库 | `pitfalls.md` | `.opencode/references/mes-ai-reference/reference/stage-memory/<stage>/pitfalls.md` | 跨需求复用的阶段坑点 |
| 全局阶段模式库 | `patterns.md` | `.opencode/references/mes-ai-reference/reference/stage-memory/<stage>/patterns.md` | 跨需求复用的成功模式 |
| 全局阶段约束库 | `constraints.md` | `.opencode/references/mes-ai-reference/reference/stage-memory/<stage>/constraints.md` | 跨需求复用的稳定约束 |

### OpenSpec 主文档兼容说明

- `spec.md` 为需求分析阶段主交接文档，历史 `spec.md` 视为兼容别名
- `design.md` 为详细设计阶段主交接文档，历史 `design.md` 视为兼容别名
- `tasks.md` 为开发阶段主交接文档，历史 `task-plan.md` 视为兼容别名

适用阶段：

- analyze
- design
- develop
- test
- deliver
- cross-stage

补充说明：

1. 局部阶段记忆保存在具体 `REQ` 阶段目录中，保留完整上下文。
2. 全局阶段记忆保存在 `.opencode/references/mes-ai-reference/reference/stage-memory/` 下，沉淀高复用经验。
3. 若修改 command / skill / 模板涉及阶段交接、阶段报告、阶段记忆产物命名，必须同步检查本节。

---

## 九、维护要求

1. 新增或修改 command/skill 时，必须同步检查本表。
2. 若修改了产物文件名，必须同步更新：
   - 对应 command 文档
   - 对应 skill 文档
   - 阶段输出目录结构说明
   - 骨架修改日志
3. 若新增阶段或新增专项审查类型，必须在本表中追加条目。

---

## 十、与新分层规则结构的边界

### 本表负责什么
- Command → Phase → Skill 的标准映射
- 阶段主产物、中间产物、评审产物的标准命名
- 阶段目录分类与阶段记忆标准产物基线

### 补充说明：多仓 / 契约 / SDK 场景
- 当需求涉及 SDK / common / shared / integration 等公共契约定义源时，`mes-analyze-identify-repos` 应输出“契约定义仓”角色识别结果，不得只列业务实现仓。
- 当需求存在多个候选 provider 时，`mes-analyze-trace-flow` 与 `mes-design-service-chain` / `mes-design-check-consistency` 应共同承接“技术可达 provider / 架构允许 provider / 最终选定 provider”的冻结过程。
- 当统一响应、错误码或 SDK 请求/响应模型来自业务仓外部定义源时，应优先消费 `.opencode/references/mes-ai-reference/reference/knowledge-consumption/contracts.md` 与 `response-conventions-template.md`，不得仅依赖 `api-design.md` 或接口表象反推契约。

### 本表不负责什么
- 当前阶段是否允许开始
- 当前阶段的标准步骤与退出条件
- 特殊场景（如 GSD / DB migration / multi-repo）的执行边界
- 审查报告、收尾扫描、共享知识写入的治理细则

这些内容统一以下沉规则为准：
- 阶段规则：`.opencode/references/mes-ai-reference/rules/phases/`
- 场景规则：`.opencode/references/mes-ai-reference/rules/scenarios/`
- 治理母规则：`.opencode/references/mes-ai-reference/rules/governance/`
