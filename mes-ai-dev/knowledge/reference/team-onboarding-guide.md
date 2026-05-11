---
title: 团队接入规范
doc_type: guide
load_strategy: explicit-only
phase_scope: []
trigger:
  - onboarding
  - team-guide
cost_level: high
summary_first: true
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/team-onboarding-guide-summary.md
  - knowledge/rules/core/runtime-entry.md
---

# 团队接入规范

> 对应摘要：`knowledge/reference/team-onboarding-guide-summary.md`
> 本文档面向团队 onboarding 与培训场景；正常执行任务时，若摘要足够，禁止把正文作为默认常驻输入。
> 本文档为各角色团队接入 MES-AI-DEV 框架的最小约束和使用指南。

---

## 一、概述

MES-AI-DEV 是一套 AI 驱动的开发框架，通过 OpenCode 的 Skill/Command/Agent 机制实现需求→分析→设计→开发→测试→交付的全流程自动化。本文档定义各角色在使用框架时必须遵守的最小约束。

当前骨架规则已按 **Core / Phase / Scenario / Governance** 分层下沉：

- 常驻总则：`AGENTS.md`
- 加载矩阵：`mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md`
- 阶段规则：`mes-ai-dev/knowledge/rules/phases/`
- 场景规则：`mes-ai-dev/knowledge/rules/scenarios/`
- 治理母规则：`mes-ai-dev/knowledge/rules/governance/`

当前骨架 Skill 已按目录化结构收口：

- 根目录：`.opencode/skills/mes-{动词}-{名词}/`
- 必需内容：`SKILL.md`、`INDEX.md`、`modules/`、`evals/`
- 默认读取顺序：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 或其他可选目录

当你不确定“当前阶段该读哪类规则”时，先查：
- `mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md`

当你不确定“哪些内容通常由 AI 生成、哪些需要人补充、阶段产物该重点看什么”时，补充查：
- `mes-ai-dev/knowledge/reference/skeleton-maintainer-quick-reference.md`
- `mes-ai-dev/knowledge/reference/skeleton-artifact-ownership-guide.md`
- `mes-ai-dev/knowledge/reference/stage-artifact-guide.md`

---

## 二、角色与职责

### 2.1 业务团队（产品经理/业务分析师）

- **职责**：提供需求输入，确认各阶段产出
- **必填输入**：原始需求描述（使用 `raw-requirement-template.md`）
- **必交付文件**：无（消费方）
- **阶段退出条件**：需求规格文档评审通过

### 2.2 设计团队（架构师/技术负责人）

- **职责**：确认技术方案，审核设计文档
- **必填输入**：需求规格文档
- **必交付文件**：无（审核方）
- **阶段退出条件**：设计文档评审通过

### 2.3 开发团队（后端/前端工程师）

- **职责**：代码审查，确认开发产出
- **必填输入**：设计文档
- **必交付文件**：代码文件（在 `jalor/` 和 `web/` 目录）
- **阶段退出条件**：代码自审通过 + 编译通过

### 2.4 测试团队（QA）

- **职责**：审核测试用例，确认测试结果
- **必填输入**：需求规格 + 设计文档
- **必交付文件**：测试报告
- **阶段退出条件**：P1用例100%通过 + P2用例通过率≥95%

### 2.5 运维团队（DevOps/SRE）

- **职责**：审核部署计划，执行部署
- **必填输入**：测试报告 + 部署计划
- **必交付文件**：部署日志
- **阶段退出条件**：部署成功 + 冒烟测试通过

---

## 三、阶段交接规则

### 3.1 交接文件清单

> **交接命名总入口**：若对“某阶段到底该产出什么文件名、某个 Phase 对应哪个 Skill、阶段评审报告应该叫什么”存在疑问，统一先查：
> `mes-ai-dev/knowledge/reference/command-skill-artifact-map.md`

| 阶段 | 产出文件 | 下一阶段消费方 |
|------|---------|--------------|
| 需求分析 | spec.md | 设计、开发、测试 |
| 详细设计 | design.md | 开发、测试 |
| 代码开发 | self-review-report.md + 代码文件 | 测试 |
| 测试验证 | test-report.md | 交付 |
| 发布交付 | release-note.md + handover-doc.md | 运维 |

### 3.2 交接检查规则

1. **文件存在性**：上一阶段产出文件必须存在
2. **评审通过**：上一阶段必须经过人工审核门禁确认
3. **无阻塞问题**：上一阶段遗留的严重问题必须解决
4. **阶段完成产物报告**：每个阶段退出前必须生成 `stage-output-report.md` 或等价阶段完成产物报告，说明标准产物、已生成文件、未生成文件及原因
5. **阶段详细审查报告**：每个阶段退出前必须生成完整、详细的阶段审查报告，并记录明确审查时间
6. **审查证据链**：所有审核结论必须能回溯到输入、依据、检查结果与证据路径，禁止猜测性结论
7. **阶段交接与记忆**：每个阶段退出前必须生成符合 OpenSpec 的主交接文档（如 `spec.md`、`design.md`、`tasks.md`、`test-report.md`、`handover-doc.md`），并同步维护 `memory/pitfall-ledger.md`、`memory/decision-log.md`、`memory/blocker-log.md`

### 3.3 人工审核门禁说明

每个 Command 在关键节点设置了人工审核门禁。AI会暂停并输出审核摘要，等待人类确认后方可继续。**任何角色不得跳过门禁。**

---

## 四、使用流程

### 4.1 首次使用（初始化）

1. 确认代码仓已就位（`jalor/`、`web/`、`dbscript/`）
2. 执行 `/mes-init-project` 生成知识库
3. 人工审核知识库完整性
4. 知识库验证通过后，框架可用

### 4.2 日常使用（需求开发）

1. 业务团队提交需求 → 执行 `/mes-analyze-requirement`
2. 设计团队审核设计 → 执行 `/mes-design-detail`
3. 开发团队审查代码 → 执行 `/mes-develop-code`
4. 测试团队确认测试 → 执行 `/mes-test-verify`
5. 运维团队执行部署 → 执行 `/mes-deliver-release`

在执行任一阶段前，若需要快速确认：
- 本阶段有哪些中间产物
- 阶段详细审查报告标准文件名是什么
- Command 的每个 Phase 对应哪个 Skill

统一查阅：`mes-ai-dev/knowledge/reference/command-skill-artifact-map.md`

若要进一步确认：
- 哪些产物通常由 AI 生成
- 哪些产物需要人补充或人主导
- 人应优先看哪些阶段产物

统一查阅：
- `mes-ai-dev/knowledge/reference/skeleton-artifact-ownership-guide.md`
- `mes-ai-dev/knowledge/reference/stage-artifact-guide.md`

若要进一步确认：
- 当前阶段应读哪些规则
- 哪些场景规则需要按需加载
- 哪些治理规则已从 AGENTS 下沉

统一查阅：
- `mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md`
- `mes-ai-dev/knowledge/rules/phases/`
- `mes-ai-dev/knowledge/rules/scenarios/`
- `mes-ai-dev/knowledge/rules/governance/`

若要进一步确认某个 Skill 自身如何阅读：

- 先读对应目录下的 `SKILL.md`
- 再读 `INDEX.md`
- 最后只进入当前任务命中的 `modules/*.md`

不得把整个 Skill 目录正文一次性常驻加载。

### 4.3 知识更新

当代码仓发生变更时，执行 `/mes-refresh-knowledge` 更新知识库。

---

## 五、Command 速查表

> **命名规则**：所有骨架 Command 必须以 `mes-` 为前缀，格式为 `mes-{动词}-{名词}`，用于区分项目骨架工具与内置工具。
>
> **映射速查**：若需要进一步确认 Command → Phase → Skill → Artifact 的标准映射关系，请查：
> `mes-ai-dev/knowledge/reference/command-skill-artifact-map.md`

| 命令 | 用途 | 前置条件 | 预期耗时 |
|------|------|---------|---------|
| `/mes-init-project` | 首次初始化知识库 | 代码仓就位 | 60-120分钟 |
| `/mes-analyze-requirement` | 需求分析 | 知识库已初始化 | 15-30分钟 |
| `/mes-design-detail` | 详细设计 | 需求分析完成 | 20-40分钟 |
| `/mes-develop-code` | 代码开发 | 设计完成 | 数小时到数天 |
| `/mes-test-verify` | 测试验证 | 开发完成 | 20-40分钟 |
| `/mes-deliver-release` | 发布交付 | 测试通过 | 30-60分钟 |
| `/mes-refresh-knowledge` | 更新知识库 | 代码仓有变更 | 10-30分钟 |
| `/mes-emergency-fix` | 紧急修复 | 生产异常 | 30分钟-4小时 |
| `/mes-onboard-team` | 团队接入引导 | 无 | 5分钟 |

---

## 六、常见问题

### Q1：可以跳过某个阶段吗？

不可以。每个阶段的产出是下一阶段的输入，跳过会导致上下文丢失。

### Q2：可以多个需求并行吗？

可以，但需要确保不同需求不修改同一服务。框架通过 `workspace/locks/` 锁机制防止冲突。

### Q3：AI生成的代码可以直接提交吗？

不建议。每个阶段都有人工审核门禁，必须经过审查确认后才可进入下一阶段。

### Q4：知识库多久更新一次？

建议在每次代码仓有显著变更后执行 `/mes-refresh-knowledge`。至少每周一次。

### Q5：如何迁移到新项目？

修改 `AGENTS.md` 第十一节的移植配置（项目名称、代码仓路径、技术栈等），然后重新执行 `/mes-init-project`。

### Q6：阶段结束时除了正式产物，还必须补什么？

必须补两类治理产物：

1. **阶段完成产物报告**：说明本阶段生成了哪些文件、每个文件的作用、哪些文件没有生成、为什么没有生成、是否影响进入下一阶段。
2. **阶段详细审查报告**：说明本阶段为何可以通过，必须包含审查时间、审查依据、检查结果、证据路径和正式结论。
3. **阶段记忆**：说明本阶段发生了什么、有哪些 active 风险 / active pitfall / blocker、下一阶段必须读什么、不要再踩什么坑；主交接文档命名应符合 OpenSpec。

若缺少上述任一类治理产物，或内容缺少证据链/审查时间/交接信息，则不得通过阶段退出门禁。

---

## 七、权限矩阵

各角色对框架命令和文件的权限详见 `reference/permission-matrix.md`。简述如下：

| 角色 | 可执行命令 | 可读写文件范围 |
|------|-----------|--------------|
| 产品经理 | `/mes-analyze-requirement`, `/mes-onboard-team` | workspace/requirements/ |
| 架构师 | `/mes-design-detail`, `/mes-analyze-requirement`, `/mes-onboard-team` | workspace/designs/ |
| 开发工程师 | `/mes-develop-code`, `/mes-refresh-knowledge`, `/mes-onboard-team` | jalor/, web/, workspace/development/ |
| 测试工程师 | `/mes-test-verify`, `/mes-onboard-team` | workspace/testing/ |
| 运维工程师 | `/mes-deliver-release`, `/mes-emergency-fix`, `/mes-onboard-team` | workspace/delivery/, workspace/emergency/ |
| 项目经理 | 全部命令（只读模式），`/mes-onboard-team` | 全部 workspace/（只读） |

> 完整权限矩阵（含文件级粒度）见 `mes-ai-dev/knowledge/reference/permission-matrix.md`。

---

## 八、角色化学习路径

> 从0到可作业的最小知识路径。每个角色按顺序阅读以下文件，即可开始使用框架。

### 8.1 产品经理/业务分析师

**学习目标**：能提交规范的需求、确认需求规格和验收标准。

| 顺序 | 阅读内容 | 路径 | 目的 |
|------|---------|------|------|
| 1 | AGENTS.md + 骨架加载矩阵 | `AGENTS.md`; `knowledge/reference/skeleton-loading-matrix.md` | 理解总则、阶段入口与规则加载方式 |
| 2 | 原始需求模板 | templates/raw-requirement-template.md | 学会规范填写需求描述 |
| 3 | 需求规格模板 | templates/requirement-spec-template.md | 了解需求分析的产出格式 |
| 4 | 验收标准分级模板 | templates/acceptance-criteria-graded-template.md | 学会分级验收标准 |
| 5 | 歧义检查清单 | templates/ambiguity-checklist-template.md | 理解需求歧义排查 |
| 6 | 变更申请模板 | templates/change-request-template.md | 理解范围变更流程 |

### 8.2 架构师/技术负责人

**学习目标**：能审核技术方案、确认设计文档、记录架构决策。

| 顺序 | 阅读内容 | 路径 | 目的 |
|------|---------|------|------|
| 1 | AGENTS.md + 加载矩阵 + 设计阶段规则 | `AGENTS.md`; `knowledge/reference/skeleton-loading-matrix.md`; `knowledge/rules/phases/phase-design.md` | 全面理解规则总览与设计阶段主线 |
| 2 | API规范 | knowledge/rules/api-conventions.md | 理解API设计规范 |
| 3 | 技术方案模板 | templates/tech-approach-template.md | 理解技术方案格式 |
| 4 | API设计模板 | templates/api-design-template.md | 理解API设计格式 |
| 5 | 数据库设计模板 | templates/database-design-template.md | 理解数据库设计规范 |
| 6 | ADR模板 | templates/adr-template.md | 学会记录架构决策 |
| 7 | 兼容性设计模板 | templates/compatibility-design-template.md | 理解兼容性设计 |
| 8 | 阶段门禁标准 | knowledge/reference/phase-gates/index.md | 理解各阶段退出条件 |

### 8.3 后端开发工程师

**学习目标**：能根据设计文档开发代码、完成自审。

| 顺序 | 阅读内容 | 路径 | 目的 |
|------|---------|------|------|
| 1 | AGENTS.md + 开发阶段规则 | `AGENTS.md`; `knowledge/rules/phases/phase-develop.md` | 理解总则、后端分层与开发阶段边界 |
| 2 | 编码规范 | knowledge/rules/coding-standards.md | 掌握命名/分层/注解规范 |
| 3 | 实现模式 | knowledge/code-map/patterns.md | 了解参考实现和遗留债务 |
| 4 | 枚举注册表 | knowledge/reference/enum-registry.md | 理解枚举值定义 |
| 5 | 后端代码模板 | templates/backend-*-template.java | 了解各层代码骨架 |
| 6 | 数据库迁移模板 | templates/db-migration-template.md | 理解数据库变更流程 |
| 7 | 变更清单模板 | templates/change-list-template.md | 理解代码变更记录 |

### 8.4 前端开发工程师

**学习目标**：能根据设计文档开发前端页面和组件。

| 顺序 | 阅读内容 | 路径 | 目的 |
|------|---------|------|------|
| 1 | AGENTS.md + 开发阶段规则 | `AGENTS.md`; `knowledge/rules/phases/phase-develop.md` | 理解总则、前端结构与开发阶段边界 |
| 2 | 前后端映射 | knowledge/dependency-graph/frontend-backend-map.md | 理解API调用关系 |
| 3 | 实现模式（前端部分） | knowledge/code-map/patterns.md | 了解前端实现模式 |
| 4 | 前端页面模板 | templates/frontend-page-template.vue | 了解页面组件结构 |
| 5 | 前端API调用模板 | templates/frontend-api-template.js | 了解API调用层写法 |
| 6 | 前端组件模板 | templates/frontend-component-template.vue | 了解公共组件写法 |

### 8.5 测试工程师

**学习目标**：能规划测试用例、执行测试、跟踪缺陷。

| 顺序 | 阅读内容 | 路径 | 目的 |
|------|---------|------|------|
| 1 | AGENTS.md + 测试阶段规则 | `AGENTS.md`; `knowledge/rules/phases/phase-test.md` | 理解总则与测试阶段边界 |
| 2 | 测试用例模板 | templates/test-case-template.md | 学会规划测试用例 |
| 3 | 缺陷跟踪模板 | templates/defect-tracking-template.md | 学会记录和跟踪缺陷 |
| 4 | 回归测试数据模板 | templates/regression-testdata-template.md | 理解回归范围和数据治理 |
| 5 | 测试报告模板 | templates/test-report-template.md | 学会编写测试报告 |
| 6 | 测试可用性矩阵 | knowledge/code-map/testability-matrix.md | 了解存量测试资产可用性 |
| 7 | 验收标准分级 | templates/acceptance-criteria-graded-template.md | 理解P0/P1/P2分级 |

### 8.6 运维工程师

**学习目标**：能执行部署计划、处理紧急修复、完成发布决策。

| 顺序 | 阅读内容 | 路径 | 目的 |
|------|---------|------|------|
| 1 | AGENTS.md §二 业务参考信息 | AGENTS.md | 理解业务术语 |
| 2 | 环境治理细则 | knowledge/rules/environment-governance.md | 理解多环境部署规则 |
| 3 | 运行时配置 | knowledge/code-map/runtime.md | 了解运行时行为和环境差异 |
| 4 | 部署计划模板 | templates/deploy-plan-template.md | 学会编写部署计划 |
| 5 | 回滚方案模板 | templates/rollback-template.md | 学会编写可执行回滚方案 |
| 6 | Go/No-Go决策模板 | templates/go-nogo-template.md | 理解发布决策流程 |
| 7 | 紧急修复流程 | knowledge/reference/exception-handbook.md | 理解紧急修复例外流程 |
