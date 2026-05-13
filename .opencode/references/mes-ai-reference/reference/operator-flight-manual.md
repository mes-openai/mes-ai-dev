# MES-AI-DEV 飞行员手册（操作地图）

> **本文档定位**：面向人类角色的操作指南，帮助各角色理解"做什么、怎么做、何时做"。
> 
> **与 AGENTS.md 的边界**：
> - AGENTS.md 是 AI 系统规则（每次会话自动加载），定义硬性约束和机器可解析规则
> - 本手册是人类操作指南，解释流程、角色职责、评审要点、常见场景
> - 硬性规则（上下文预算、阶段门禁、锁机制、知识库结构等）详见 AGENTS.md，此处不作复述
> - AI 技术细节（Skill 定义、Agent 角色、并行编排策略）详见 AGENTS.md §十
> - 当前骨架规则已按 Core / Phase / Scenario / Governance 下沉，若要确认某阶段该读哪些规则，先查 `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
> 
> **面向角色**：项目经理、需求分析师、架构师、开发工程师、测试工程师。
> **阅读建议**：先读本手册理解流程，再按需查阅 AGENTS.md 了解技术细节。

---

## 一、框架总览

### 1.1 这套框架是什么

MES-AI-DEV 是一套让 AI 自动实现软件需求的开发框架。它通过：

- **知识库**：将大型代码仓（250万+行后端 + 80万+行前端）压缩为轻量索引
- **Skill集**：将开发流程拆分为46个原子操作，AI拿到就能执行
- **Agent集**：6个专业Agent角色，支持多Agent并行协作
- **Command集**：6个入口命令，一条指令编排完整阶段
- **模板集**：60+个标准模板与代码骨架，确保产出格式统一

核心原理：**AI 不需要读懂全部代码，只需要读懂跟需求相关的那部分代码。**

### 1.1A 规则结构怎么读

当前骨架不再把所有规则都塞在 `AGENTS.md` 中，而是拆为四层：

- **Core**：最小常驻内核，负责意图门、安全红线、执行与完成基线
- **Phase**：按阶段加载，负责 init / analyze / design / develop / test / deliver / refresh / emergency
- **Scenario**：按命中条件加载，负责 GSD、多仓协同、数据库迁移、状态迁移等特殊场景
- **Governance**：治理母规则，负责审查报告、产物布局、收尾扫描、门禁使用、共享知识写入等共性约束

推荐阅读顺序：

1. `AGENTS.md`
2. `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
3. 当前阶段对应 `.opencode/references/mes-ai-reference/rules/phases/phase-*.md`
4. 命中场景时读取 `.opencode/references/mes-ai-reference/rules/scenarios/scenario-*.md`
5. 需要写产物时再回到 `.opencode/references/mes-ai-reference/templates/template-index.md`

若当前问题不是“执行哪个阶段”，而是“进入维护期后如何避免把骨架改回重型总表结构”，补充阅读：

- `.opencode/references/mes-ai-reference/reference/skeleton-maintenance-ten-commandments.md`

若当前问题不是“怎么执行阶段”，而是：

- 哪些文件通常由 AI 生成、哪些要人补充
- 各阶段产物该重点看什么
- 维护骨架时最容易漏刷哪些入口

建议补充阅读：

- `.opencode/references/mes-ai-reference/reference/skeleton-maintainer-quick-reference.md`
- `.opencode/references/mes-ai-reference/reference/skeleton-artifact-ownership-guide.md`
- `.opencode/references/mes-ai-reference/reference/stage-artifact-guide.md`

### 1.2 目录结构说明

```
项目根目录/
│
├── .opencode/                  # 【AI框架配置】自动加载
│   ├── skills/                 # 46个Skill定义
│   │   ├── mes-init-scan-backend/  # 初始化阶段（10个）
│   │   ├── mes-analyze-xxx/    # 需求分析阶段（7个）
│   │   ├── mes-design-xxx/     # 详细设计阶段（7个）
│   │   ├── mes-develop-xxx/    # 代码开发阶段（13个，含安全审查+DB迁移）
│   │   ├── mes-test-xxx/       # 测试阶段（5个，含性能分析）
│   │   └── mes-refresh-xxx/    # 刷新阶段（4个）
│   ├── commands/               # 6个入口命令（含并行编排策略）
│   └── agents/                 # 6个Agent角色定义
│       ├── mes-service-analyzer/   #   服务分析Agent
│       ├── mes-backend-developer/  #   后端开发Agent
│       ├── mes-frontend-developer/ #   前端开发Agent
│       ├── mes-test-executor/      #   测试执行Agent
│       ├── mes-knowledge-refresh/  #   知识刷新Agent
│       └── mes-review-auditor/     #   审核Agent
│
├── AGENTS.md                   # 项目规则（每次会话自动加载）
│
├── jalor/                      # 后端代码仓（只读）
├── web/                        # 前端代码仓（只读）
├── dbscript/                   # 数据库脚本（只读）
│
└── mes-ai-dev/                 # 骨架工作目录（读写）
    ├── mes-ai-dev/knowledge/              # 知识库（初始化阶段生成）
    │   ├── mes-ai-dev/knowledge/code-map/           # 代码地图（四层索引）
    │   ├── mes-ai-dev/knowledge/dependency-graph/   # 依赖关系图
    │   └── mes-ai-dev/knowledge/database-index/     # 数据库索引
    ├── workspace/              # 工作空间（需求进行中）
    │   ├── requirements/       # 需求文档
    │   ├── designs/            # 设计文档
    │   ├── development/        # 开发产出
    │   ├── testing/            # 测试产出
    │   ├── locks/              # 并发锁
    │   └── coordination/       # 多仓协同
└── .opencode/references/mes-ai-reference/templates/  # SDK 静态模板与代码骨架
        ├── analyze/            # 需求分析阶段模板（7个）
        ├── design/             # 详细设计阶段模板（12个）
        ├── develop/            # 代码开发阶段模板（6个）
        ├── test/               # 测试验证阶段模板（7个）
        ├── deliver/            # 发布交付阶段模板（7个）
        ├── governance/         # 治理与规范模板
        ├── code/               # 代码骨架模板（19个）
        ├── mes-ai-dev/knowledge/reference/          # 项目侧 reference 知识结构模板
        ├── mes-ai-dev/knowledge/rules/              # 项目侧 rules 知识结构模板
        └── template-index.md   # 单一导航入口
```

### 1.4 模板选型速查

> 模板按阶段目录组织，单一导航入口为 `.opencode/references/mes-ai-reference/templates/template-index.md`。
> 选型原则：按阶段定位 → 按场景选择具体模板。
>
> **补充说明**：若你要确认的不是“模板怎么选”，而是“某个 Command 的某个 Phase 应该用哪个 Skill、产出文件到底叫什么”，统一查：
> `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`

| 场景 | 模板路径 | 说明 |
|------|---------|------|
| Agent任务交接 | `.opencode/references/mes-ai-reference/templates/develop/agent-handoff-template.md` | 统一 completion/results 交接结构 |
| 阶段记忆 | `.opencode/references/mes-ai-reference/templates/governance/stage-memory-template.md` | 阶段交接、恢复、风险与下一阶段建议模板 |
| 坑点台账 | `.opencode/references/mes-ai-reference/templates/governance/pitfall-ledger-template.md` | 阶段坑点、规避规则与证据路径模板 |
| 决策日志 | `.opencode/references/mes-ai-reference/templates/governance/decision-log-template.md` | 关键决策、取舍与 ADR 候选模板 |
| 阻塞台账 | `.opencode/references/mes-ai-reference/templates/governance/blocker-log-template.md` | blocker 分类、代偿推进与后补动作模板 |
| 跨阶段变更 / 影响分析 / 代码变更清单 | `.opencode/references/mes-ai-reference/templates/governance/change-management-template.md` | 变更申请/影响分析/清单三合一母版 |
| 交付边界 / 交付审计 / 验收报告 | `.opencode/references/mes-ai-reference/templates/deliver/delivery-package-template.md` | 交付范围/审计/验收三合一母版 |
| 发布说明 / 升级指南 | `.opencode/references/mes-ai-reference/templates/deliver/release-note-template.md` | 保持独立，与交付母版配套使用 |
| 设计文档 | `.opencode/references/mes-ai-reference/templates/design/design-doc-template.md` | 完整设计文档母版 |
| 需求规格 | `.opencode/references/mes-ai-reference/templates/analyze/requirement-spec-template.md` | 结构化需求规格 |

**选型原则**：
- 按阶段定位：先确定当前阶段，进入对应目录
- 母版优先：当需要覆盖多个相近场景时，优先使用母版模板
- 单一入口：所有模板导航从 `template-index.md` 开始

### 1.4A Command / Skill / 产物命名总导航

当你遇到以下任何一种问题时，不要分别翻 command 文档和 skill 文档猜：

- 某个阶段到底该产出 `spec-review-report.md`、`design-review-report.md`、`development-review-report.md` 还是其他 `*-review-report.md`
- `design.md`、`tech-approach.md`、`service-chain-design.md` 的边界是什么
- 某个 Command 的某个 Phase 应该调用哪个 Skill
- 开发阶段的自审报告和安全审查报告标准命名分别是什么

统一先看：

- `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`

若你要确认的是：

- 当前阶段应该加载哪类规则
- 哪些细则已经从 AGENTS 下沉
- 某个特殊场景是否应该单独加载

统一先看：

- `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
- `.opencode/references/mes-ai-reference/rules/phases/`
- `.opencode/references/mes-ai-reference/rules/scenarios/`
- `.opencode/references/mes-ai-reference/rules/governance/`

这份总表定义了：

1. **Command → Phase → Skill** 的标准映射
2. **阶段主产物 / 中间产物 / 评审产物** 的标准命名
3. **设计链 / 开发链 / 测试链 / 交付链** 的主要输入输出关系

使用原则：

- 先看总表，确认标准命名和映射
- 再回到具体 command / skill 文档看执行细节
- 如果发现具体文档与总表冲突，应视为骨架漂移，需修正文档并刷新骨架修改日志

### 1.5 产物治理总表（过程产物 / 最终产物 / 维护方式）

> 本节用于回答：哪些产物由 AI 生成、哪些产物由人补充、哪些是过程产物、哪些是最终产物、最终给谁使用。
>
> **关键原则**：
> 1. **局部片段 / 草案 / 中间结果** 默认是**过程产物**，不得直接作为下游正式事实源消费。
> 2. **收口后的共享知识 / 正式阶段产物 / 审查与交接结果** 才是**最终产物**。
> 3. `business-rules.md`、`change-impact-memory.md`、`patterns.md`、`legacy-debt.md`、`runtime.md`、`test-assets.md`、`testability-matrix.md`、`e2e-chains.md` 这类 AI 接管关键资产，默认采用**AI 首稿 + 人工审核/补录 + 后续 AI 辅助增量维护**模式，而不是完全放任 AI 无人校正。
> 4. **凡骨架新增、删除、重命名、拆分、合并任何产物文件或产物路径模式，必须同步刷新本手册。** 否则视为骨架修改不完整。
> 5. 阶段执行不只要交正式产物，还必须交“阶段记忆”：包括交接摘要、坑点台账、决策日志和阻塞台账。

#### 1.5.1 维护方式定义

| 维护方式 | 含义 | 典型动作 |
|------|------|---------|
| AI主生成 | 由初始化 / 深化 / 刷新 / 阶段 Command 直接生成首稿，人主要做审核 | 发起对应 Command 或给 AI 明确提示词，让 AI 写入正式文件或过程文件 |
| 人主补充 | 需要人基于业务、历史经验、运维经验补充，AI只做辅助整理 | 人直接改文件，或先给 AI 补充要点再让 AI 归档成文 |
| AI首稿 + 人工校正 | AI先按模板生成初稿，人补证据、补例外、补真实范围，后续再由 AI 协助更新 | 推荐优先方式 |
| 主控收口 | 多个局部片段或草案必须由主控 Agent / `/mes-init-converge` 串行合并成正式共享文件 | 不允许并行 Agent 直接覆盖最终共享文件 |

#### 1.5.2 知识库最终共享产物（`mes-ai-dev/knowledge/` 下）

| 路径模式 | 产物类型 | 过程/最终 | 默认维护方式 | 主要生成阶段/命令 | 典型维护动作 | 最终使用者 |
|------|------|---------|------------|------------------|-------------|-----------|
| `mes-ai-dev/knowledge/code-map/backend-overview.md` | 后端总览 | 最终产物 | AI主生成 + 主控收口 | `/mes-init-project`、`/mes-init-converge` | 触发初始化/收敛生成；人工只做抽查纠偏 | 所有阶段的第0层入口、项目经理、架构师、AI |
| `mes-ai-dev/knowledge/code-map/frontend-overview.md` | 前端总览 | 最终产物 | AI主生成 + 主控收口 | `/mes-init-project`、`/mes-init-converge` | 同上 | 所有阶段、前端负责人、AI |
| `mes-ai-dev/knowledge/code-map/services/service-xxx/index.md` | 服务精简索引 | 最终产物 | AI主生成 | `/mes-init-project`、`/mes-init-enrich` | 通过初始化/深化刷新，不建议人工手改正文 | 需求分析、设计、AI |
| `mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md` | 服务完整详情 | 最终产物 | AI主生成 | `/mes-init-enrich` | 由 AI 深化生成，人工按需纠偏 | 设计、开发、AI |
| `mes-ai-dev/knowledge/code-map/services/service-xxx/file-summaries.md` | 文件摘要 | 最终产物 | AI主生成 | `/mes-init-enrich` | 由 AI 按代码扫描生成 | 开发、AI |
| `mes-ai-dev/knowledge/code-map/services/service-xxx/repo-profile.md` | 仓库画像 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-enrich` 或专项补齐 | 可直接改文件，也可先给 AI 提示再归档 | 设计、开发、测试、AI |
| `mes-ai-dev/knowledge/code-map/modules/module-xxx/index.md` | 模块精简索引 | 最终产物 | AI主生成 | `/mes-init-project`、`/mes-init-enrich` | 通过初始化/深化刷新 | 需求分析、设计、AI |
| `mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md` | 模块完整详情 | 最终产物 | AI主生成 | `/mes-init-enrich` | 通过深化刷新 | 设计、开发、AI |
| `mes-ai-dev/knowledge/code-map/modules/module-xxx/file-summaries.md` | 模块文件摘要 | 最终产物 | AI主生成 | `/mes-init-enrich` | 通过深化刷新 | 开发、AI |
| `mes-ai-dev/knowledge/code-map/business-flows.md` | 业务链路 | 最终产物 | AI主生成 + 主控收口 | `/mes-init-enrich`、`/mes-init-converge` | 可由 AI 先写片段，主控收口；人工做链路校验 | 需求分析、测试、AI |
| `mes-ai-dev/knowledge/code-map/ownership.md` | 实体归属与事实源 | 最终产物 | AI主生成 + 人工校正 | `/mes-init-enrich`、`/mes-init-converge` | 人工重点确认事实源与高风险归属 | 需求分析、设计、开发、AI |
| `mes-ai-dev/knowledge/code-map/patterns.md` | 实现模式目录 | 最终产物 | **AI首稿 + 人工校正** | `/mes-init-enrich`、整改专项 | 可直接改正式文件；也可先让 AI 按模板产出再人工补真实参考文件 | 设计、开发、评审、AI |
| `mes-ai-dev/knowledge/code-map/business-rules.md` | 真实业务规则库 | 最终产物 | **AI首稿 + 人工校正** | `/mes-init-enrich`、整改专项 | 允许直接改正式文件；推荐“人给要点/证据 → AI归档成文 → 人复核” | 需求分析、设计、开发、测试、AI |
| `mes-ai-dev/knowledge/code-map/change-impact-memory.md` | 变更影响记忆 | 最终产物 | **人主补充 + AI辅助整理** | 整改专项、后续 refresh / 复盘回补 | 可直接改正式文件；推荐由人提供历史经验，再由 AI 结构化整理 | 需求分析、设计、开发、测试、交付、AI |
| `mes-ai-dev/knowledge/code-map/test-assets.md` | 测试资产索引 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-enrich`、测试阶段补齐 | AI先扫测试资产，人补手工回归入口 | 测试、开发、AI |
| `mes-ai-dev/knowledge/code-map/runtime.md` | 运行时配置地图 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-enrich`、交付/运维补齐 | AI先抽配置，人补环境差异与功能开关语义 | 设计、测试、交付、运维、AI |
| `mes-ai-dev/knowledge/code-map/hot-services.md` | 高频服务排行 | 最终产物 | AI主生成 + 主控重算 | `/mes-init-enrich`、`/mes-init-converge` | 不建议人工直接手改排行结果 | 大仓需求分析、AI |
| `mes-ai-dev/knowledge/code-map/hot-apis.md` | 高频API排行 | 最终产物 | AI主生成 + 主控重算 | `/mes-init-enrich`、`/mes-init-converge` | 同上 | 大仓需求分析、AI |
| `mes-ai-dev/knowledge/code-map/hot-tables.md` | 高频表排行 | 最终产物 | AI主生成 + 主控重算 | `/mes-init-enrich`、`/mes-init-converge` | 同上 | 设计、测试、AI |
| `mes-ai-dev/knowledge/code-map/legacy-debt.md` | 存量仓历史债务 | 最终产物 | **AI首稿 + 人工校正** | `/mes-init-enrich`、整改专项 | 允许直接改正式文件；人应重点确认禁区/高风险区/受控修改区 | 开发、紧急修复、架构师、AI |
| `mes-ai-dev/knowledge/code-map/testability-matrix.md` | 可测性矩阵 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-enrich`、测试阶段补齐 | AI先评分，人补真实难点 | 测试、设计、AI |
| `mes-ai-dev/knowledge/code-map/e2e-chains.md` | E2E链路 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-enrich`、测试阶段补齐 | AI先梳链，人确认关键断点与验证点 | 测试、交付、AI |
| `mes-ai-dev/knowledge/dependency-graph/service-dependencies.md` | 服务依赖图 | 最终产物 | AI主生成 + 主控收口 | `/mes-init-project`、`/mes-init-converge` | 主控汇总，人工按需纠偏 | 需求分析、设计、AI |
| `mes-ai-dev/knowledge/dependency-graph/api-registry.md` | API注册表 | 最终产物 | AI主生成 + 主控收口 | `/mes-init-project`、`/mes-init-converge` | 主控汇总，必要时索引化拆分 | 需求分析、设计、开发、AI |
| `mes-ai-dev/knowledge/dependency-graph/database-registry.md` | 数据库注册表 | 最终产物 | AI主生成 + 主控收口 | `/mes-init-project`、`/mes-init-converge` | 主控汇总 | 设计、测试、AI |
| `mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md` | 前后端映射 | 最终产物 | AI主生成 + 主控收口 | `/mes-init-project`、`/mes-init-converge` | 主控汇总 | 需求分析、测试、AI |
| `mes-ai-dev/knowledge/database-index/schema-xxx/index.md` | Schema索引 | 最终产物 | AI主生成 | `/mes-init-project`、`/mes-init-enrich` | 初始化/深化生成，不建议手工长期维护 | 设计、测试、AI |
| `mes-ai-dev/knowledge/reference/terminology-glossary.md` | 术语表 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-extract-reference`、`/mes-init-converge` | AI先抽术语，人补标准定义 | 需求分析、设计、AI |
| `mes-ai-dev/knowledge/reference/domain-model.md` | 领域模型 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-extract-reference`、`/mes-init-converge` | AI先建模，人确认边界与关系 | 需求分析、设计、AI |
| `mes-ai-dev/knowledge/reference/data-dictionary.md` | 数据字典 | 最终产物 | AI主生成 + 人工补注释 | `/mes-init-extract-reference`、`/mes-init-converge` | 人重点补业务字段含义 | 设计、开发、AI |
| `mes-ai-dev/knowledge/reference/enum-registry.md` | 枚举注册表 | 最终产物 | AI主生成 + 人工补例外 | `/mes-init-extract-reference`、`/mes-init-converge` | 可直接编辑，也可通过 AI 增量补齐 | 开发、测试、AI |
| `mes-ai-dev/knowledge/reference/error-code-registry.md` | 错误码注册表 | 最终产物 | AI主生成 + 人工校正 | `/mes-init-extract-reference`、`/mes-init-converge` | 需人工确认错误码语义和冲突 | 开发、测试、前端、AI |
| `mes-ai-dev/knowledge/reference/permission-matrix.md` | 权限矩阵 | 最终产物 | 人主补充 + AI辅助整理 | 初始化后按需补齐 | 推荐人先定义权限原则，再让 AI 结构化 | 所有阶段、AI |
| `.opencode/references/mes-ai-reference/reference/phase-gates/index.md` | 门禁规则索引 | 最终产物 | 人主设计 + AI辅助编辑 | 治理修改时 | 推荐先写索引与分片草案，再并入正式文件 | 所有阶段、AI |
| `.opencode/references/mes-ai-reference/reference/exception-handbook.md` | 例外流程手册 | 最终产物 | 人主设计 + AI辅助编辑 | 治理修改时 | 推荐先梳理例外场景，再让 AI 落文 | 紧急修复、发布、AI |
| `mes-ai-dev/knowledge/rules/api-conventions.md` | API规范 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-extract-reference`、治理修改 | 人工确认硬性规范 | 设计、开发、AI |
| `mes-ai-dev/knowledge/rules/coding-standards.md` | 编码规范 | 最终产物 | AI首稿 + 人工校正 | `/mes-init-extract-reference`、治理修改 | 人工确认是否为硬规则 | 开发、评审、AI |
| `.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md` | 状态规则索引 | 最终产物 | 人主设计 + AI辅助编辑 | 治理修改时 | 必须先明确状态语义，再按 core/init/convergence/trust 分片更新 | 状态写入者、AI |
| `mes-ai-dev/knowledge/state/state.yaml` | 唯一机器事实源 | 最终产物 | AI主写入 + 人工审语义 | 初始化/收敛/刷新/治理修改 | 不建议手工随意改值；如需改结构，先审规则 | 所有阶段、AI |
| `mes-ai-dev/knowledge/state/summary.md` | 人工摘要入口 | 最终产物（兼容视图） | AI主渲染 | `/mes-init-converge`、`/mes-refresh-knowledge` | 原则上不直接人工维护正文 | 人工查看、AI回退消费 |
| `mes-ai-dev/knowledge/baseline.md` | 兼容摘要视图 | 最终产物（兼容视图） | AI主渲染 | `/mes-init-converge`、`/mes-refresh-knowledge` | 不直接人工维护正文 | Phase 0 预检、人工查看、AI回退 |
| `mes-ai-dev/knowledge/init-coverage.md` | 兼容清单视图 | 最终产物（兼容视图） | AI主渲染 | `/mes-init-converge`、`/mes-refresh-knowledge` | 不直接人工维护正文 | 覆盖率查看、AI回退 |

#### 1.5.3 初始化/深化/刷新过程产物（只允许过程消费，不得直接当正式事实源）

| 路径模式 | 产物类型 | 过程/最终 | 默认维护方式 | 主要生成阶段/命令 | 典型维护动作 | 最终使用者 |
|------|------|---------|------------|------------------|-------------|-----------|
| `mes-ai-dev/knowledge/state/fragments/<scope-type>-<scope-name>.yaml` | 状态片段 | 过程产物 | AI主生成 | `/mes-init-project`、`/mes-init-enrich` | 不直接人工编辑，异常时按例外流程处理 | 仅主控 Agent / `/mes-init-converge` |
| `mes-ai-dev/knowledge/fragments/reference/**/*.md` | reference 局部片段 | 过程产物 | AI主生成 | `/mes-init-extract-reference`、`/mes-init-enrich` | 先写片段，再由主控收口；人工可审核不直接下游消费 | 仅主控 Agent / `/mes-init-converge` |
| `mes-ai-dev/knowledge/fragments/rules/**/*.md` | 规则片段 | 过程产物 | AI主生成 | `/mes-init-extract-reference`、`/mes-init-enrich` | 同上 | 仅主控 Agent / `/mes-init-converge` |
| `mes-ai-dev/knowledge/fragments/code-map/**/*.md` | code-map 局部片段 / 热点候选 | 过程产物 | AI主生成 | `/mes-init-scan-flows`、`/mes-init-scan-patterns`、`/mes-init-scan-hotspots`、`/mes-init-enrich` | 同上 | 仅主控 Agent / `/mes-init-converge` |
| `mes-ai-dev/workspace/refresh/skeleton-remediation-wave*/**/*.md` | 骨架整改草案 | 过程产物 | 人主维护 + AI辅助编辑 | 骨架整改专项 | 先草案、后评审、再并入正式骨架 | 骨架修改评审者、主控 |
| `mes-ai-dev/workspace/refresh/*-report.md`、`*-audit.md`、`*-retrospective.md` | 刷新/审计/复盘过程材料 | 过程产物（部分长期保留） | AI主生成 + 人工审核 | `/mes-refresh-knowledge`、专项审计、复盘 | 可直接改文件补审计结论 | 架构师、治理负责人、AI |

> **重要限制**：`mes-ai-dev/knowledge/state/fragments/*.yaml` 与 `mes-ai-dev/knowledge/fragments/**/*.md` 都是过程产物，**不能直接给下游阶段当正式知识消费**。必须经过 `/mes-init-converge` 或主控收口。

#### 1.5.4 各阶段工作空间产物（`mes-ai-dev/workspace/` 下）

| 路径模式 | 典型文件 | 产物类型 | 过程/最终 | 默认维护方式 | 主要生成阶段/命令 | 典型维护动作 | 最终使用者 |
|------|---------|---------|---------|------------|------------------|-------------|-----------|
| `mes-ai-dev/workspace/requirements/{REQ-ID}/` | `raw-requirement.md`、`impact-scope.md`、`flow-trace.md` / `business-flow-trace-report.md`、`ambiguity-checklist.md`、`acceptance-criteria-graded.md`、`nfr-checklist.md`、`spec.md`、`spec-review-report.md` | 需求分析产物 | 过程产物 + 该阶段最终产物 | AI主生成 + 人工评审 | `/mes-analyze-requirement` | 通过提示词给 AI 生成；评审后可人工直接修订或让 AI 改稿 | 设计、开发、测试、项目经理、AI |
| `mes-ai-dev/workspace/designs/{REQ-ID}/` | `design.md`、`tech-approach.md`、`api-design.md`、`database-design.md`、`db-migration.md`、`cross-service-consistency.md`、`compatibility-design.md`、`design-performance-impact.md`、`design-observability.md`、`design-regression-scope.md`、`code-pattern-consistency.md`、`design-review-report.md` | 设计产物 | 过程产物 + 该阶段最终产物 | AI主生成 + 人工评审 | `/mes-design-detail` | AI生成后由架构师/设计负责人评审，必要时人工修订 | 开发、测试、交付、AI |
| `mes-ai-dev/workspace/development/{REQ-ID}/` | `task-plan.md`、`impact-ledger.md`、`verification-evidence.md`、`refresh-hints.md`、`self-review-report.md`、`code-pattern-consistency.md`、`*-completion.md`、`*-results.md` | 开发产物 / 交接产物 / 自审产物 | 过程产物 + 阶段最终产物 | AI主生成 + 人工审核 | `/mes-develop-code`、多 Agent 协作 | 代码相关证据可由 AI 写，审查结论需人工确认；交接文件由执行 Agent 生成 | 测试、交付、主控 Agent、AI |
| `mes-ai-dev/workspace/testing/{REQ-ID}/` | `test-cases.md`、`uat-scenarios.md`、`smoke-and-gray.md`、`regression-testdata.md`、`verification-evidence.md`、`test-report.md`、`acceptance-test-mapping.md` | 测试产物 | 过程产物 + 阶段最终产物 | AI主生成 + 人工校验 | `/mes-test-verify` | 测试计划类可由 AI 生成；执行结果与验收映射需人确认 | 交付、项目经理、AI |
| `mes-ai-dev/workspace/delivery/{REQ-ID}/` | `deploy-plan.md`、`delivery-audit-record.md`、`go-nogo.md`、`release-note.md`、`post-release-checklist.md`、`release-retrospective.md`、`delivery-package*.md`、`acceptance-report.md` | 交付产物 | 过程产物 + 阶段最终产物 | AI主生成 + 人工审核/签字 | `/mes-deliver-release` | 交付结论、Go/No-Go、验收建议必须经人确认 | 交付负责人、运维、项目经理、业务方、AI |
| `mes-ai-dev/workspace/emergency/EMG-*/` | `incident-report.md`、`postmortem.md`、例外记录、紧急修复结果 | 紧急修复产物 | 过程产物 + 阶段最终产物 | AI主生成 + 人工审核 | `/mes-emergency-fix` | 事故事实、人审结论、人补操作细节 | 技术负责人、运维、AI |
| `mes-ai-dev/workspace/coordination/` | 协调方案、接口契约、Mock 策略、升级路径 | 过程产物 | 人主维护 + AI辅助整理 | 多仓协同开发时 | 推荐人工主写约定，再让 AI 结构化整理 | 多团队、主控 Agent |
| `mes-ai-dev/workspace/locks/*.lock` | 服务锁 / 初始化锁 / 收口锁 | 过程控制产物 | 过程产物 | AI主生成 | 开发前、初始化前、收口前 | 不建议手工随意改；异常时按例外流程强制接管 | 主控 Agent、所有执行者 |
| `mes-ai-dev/workspace/status-tracker.md` | 需求状态总表 | 最终治理产物 | 最终产物 | AI更新 + 人工核对 | 所有阶段门禁/流转 | 原则上按模板更新，必要时可人工修正状态说明 | 项目经理、治理负责人、AI |

#### 1.5.5 审查、门禁、交接、示例类产物

| 路径模式 | 产物类型 | 过程/最终 | 默认维护方式 | 主要生成阶段/命令 | 典型维护动作 | 最终使用者 |
|------|------|---------|------------|------------------|-------------|-----------|
| `mes-ai-dev/workspace/refresh/skeleton-change-review-*.md` | 骨架修改正式审查结果 | 最终产物 | AI起草 + 人工审核 | 骨架修改专项 | 推荐先用模板生成，再人工确认结论 | 骨架维护者、治理负责人 |
| `mes-ai-dev/workspace/examples/*.md` | 示例产物 | 示例类最终产物 | AI主生成 + 人工抽查 | 骨架建设时 | 可直接人工修订示例 | 人工学习、后续 Agent 参考 |
| `*-completion.md`、`*-results.md` | Agent 交接文件 | 过程产物 | AI主生成 | 多 Agent 并行执行 | 不建议人工重写，只在审查或返工时修正 | 主控 Agent、下游 Agent |
| 步骤级 gate 审查记录 | 审查产物 | 过程产物 / 条件通过时长期保留 | AI主生成 + 人工审核 | `mes-verify-phase-gate` | 通过模板生成；人确认阻断理由或补偿动作 | 主控 Agent、治理负责人 |
| `spec-review-report.md`、`design-review-report.md`、`development-review-report.md`、`self-review-report.md`、`test-review-report.md`、`acceptance-report.md` 等 | 阶段审查/报告产物 | 阶段最终产物 | AI主生成 + 人工审核 | 各阶段末 | 人工负责最终通过/不通过判断 | 下一阶段、人类评审者、AI |
| `stage-output-report.md` | 阶段完成产物报告 | 阶段最终产物 | AI主生成 + 人工审核 | 各阶段退出前 | 按模板说明标准产物、已生成文件、未生成文件及原因 | 下一阶段、人类评审者、AI |
| `*-review-report.md` / 等价详细审查报告 | 阶段详细审查报告 | 阶段最终产物 | AI主生成 + 人工审核 | 各阶段退出前 | 必须记录审查时间、审查依据、检查结果与证据链，不得猜测性通过 | 下一阶段、人类评审者、AI |

#### 1.5.6 “人补充”与“AI 生成”的实际操作方式

| 场景 | 推荐方式 | 不推荐方式 |
|------|---------|-----------|
| 业务规则、影响记忆、遗留债务、运行约束等需要业务/历史经验的资产 | **人先给事实、案例、范围、例外，再让 AI 按模板整理成文；或直接人工改正式文件** | 让 AI 凭空脑补事实 |
| 初始化/深化产生的索引、依赖图、摘要、片段 | **由对应 Command / Skill 自动生成** | 人工跳过初始化直接手写大量索引 |
| 收口类共享知识文件（overview、registry、hot-*、patterns、legacy-debt、reference 聚合） | **先片段，后主控 / `/mes-init-converge` 收口** | 多个 session 直接改最终共享文件 |
| 手册、规则、模板、门禁、状态规范等治理文件 | **先草案（可由 AI 起草），评审后再并入正式骨架** | 语义未定稿就直接改正式主文件 |

**具体建议**：
- **直接改文件**：适用于人已明确知道要补什么事实，例如业务规则、历史事故、运维步骤、权限规则。
- **用提示词让 AI 补**：适用于结构化整理、模板落稿、从已给证据中抽摘要、补表格、补章节。
- **AI 自动生成**：适用于初始化索引、依赖图、片段、服务详情、文件摘要、测试资产扫描等可从仓内稳定抽取的产物。

#### 1.5.7 飞行员手册刷新规则（新增硬要求）

凡发生以下任一情况，**必须同步刷新本手册的产物治理总表**：

1. 新增产物文件或新增产物路径模式
2. 删除、废弃、合并、拆分既有产物文件
3. 过程产物与最终产物的边界变化
4. 维护方式变化（如从 AI 主生成改为人主补充）
5. 产物主要消费方变化
6. 产物生成阶段 / 命令 / 模板入口变化
7. `command-skill-artifact-map.md` 中的标准映射或标准命名发生变化

同步动作至少包括：
- 更新本手册相关表格与说明
- 更新 `templates/template-index.md`（若涉及模板或模板导航变化）
- 更新 `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`（若涉及命令/Skill/产物映射变化）
- 更新 `mes-ai-dev/workspace/refresh/skeleton-change-log.md`

> **判定标准**：若骨架产物体系发生变化，但本手册未同步更新，则视为骨架修改不完整，不得宣告完成。

### 1.3 全流程阶段图

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  ①初始化  │ →  │ ②需求分析 │ →  │ ③详细设计 │ →  │ ④代码开发 │ →  │ ⑤测试验证 │
│/init-proj│    │/analyze  │    │/design   │    │/develop  │    │/test     │
│  (仅首次) │    │(每个需求) │    │(每个需求) │    │(每个需求) │    │(每个需求) │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                                        ↓
                              ┌──────────┐                              交付
                              │ ⑥刷新知识 │ ← 代码更新后随时执行
                              │/refresh  │
                              └──────────┘

人工评审点：每个阶段完成后都需要人工确认才能进入下一阶段

阶段退出补充要求：
- 必须同时具备**阶段完成产物报告**与**阶段详细审查报告**
- 详细审查报告必须记录**审查时间**
- 所有审查结论必须具备**完整证据链**，不得基于猜测
```

---

## 二、阶段一：初始化项目

### 2.1 做什么

首次使用框架时，扫描全部代码仓，生成知识库。知识库是后续所有阶段的基础。

### 2.2 谁来做

**项目经理**发起，AI自动执行。

### 2.3 怎么做

```
输入命令：/mes-init-project
```

### 2.4 执行过程

```
/mes-init-project 编排的11个Skill：

Phase 1（可并行）：
  ├── mes-init-scan-backend      扫描后端目录，识别所有微服务
  ├── mes-init-scan-frontend     扫描前端目录，识别所有模块
  └── mes-init-index-database    索引数据库脚本

Phase 2（依赖Phase 1）：
  ├── mes-init-analyze-service   分析每个微服务架构
  ├── mes-init-analyze-config    分析配置和中间件
  ├── mes-init-extract-api       提取所有API端点
  └── mes-init-analyze-routes    分析前端路由和API调用

Phase 3（汇总）：
  ├── mes-init-build-code-map         生成代码地图
  ├── mes-init-build-dependency-graph 生成依赖关系图
  └── mes-init-verify-knowledge     校验完整性+覆盖率+基线

Phase 4（参考知识提取）：
  └── mes-init-extract-reference      提取业务术语、领域模型、数据字典、枚举、错误码、API约定、编码规范
```

### 2.5 输入与输出

| 输入 | 说明 |
|------|------|
| `jalor/` 目录 | 后端代码仓 |
| `web/` 目录 | 前端代码仓 |
| `dbscript/` 目录 | 数据库脚本 |

| 输出 | 说明 |
|------|------|
| `mes-ai-dev/knowledge/code-map/backend-overview.md` | 后端总览（所有服务列表、用途、规模） |
| `mes-ai-dev/knowledge/code-map/frontend-overview.md` | 前端总览（所有模块列表、用途、规模） |
| `mes-ai-dev/knowledge/code-map/services/service-xxx/index.md` | 各服务精简索引 |
| `mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md` | 各服务完整详情 |
| `mes-ai-dev/knowledge/code-map/services/service-xxx/file-summaries.md` | 各服务文件摘要 |
| `mes-ai-dev/knowledge/code-map/modules/module-xxx/index.md` | 各模块精简索引 |
| `mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md` | 各模块完整详情 |
| `mes-ai-dev/knowledge/code-map/modules/module-xxx/file-summaries.md` | 各模块文件摘要 |
| `mes-ai-dev/knowledge/dependency-graph/api-registry.md` | API注册表（5000+ API清单） |
| `mes-ai-dev/knowledge/dependency-graph/service-dependencies.md` | 服务间调用关系 |
| `mes-ai-dev/knowledge/dependency-graph/database-registry.md` | 数据库归属映射 |
| `mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md` | 前后端映射 |
| `mes-ai-dev/knowledge/database-index/schema-xxx/` | 数据库表结构索引 |
| `mes-ai-dev/knowledge/reference/terminology-glossary.md` | 业务术语表（完整版） |
| `mes-ai-dev/knowledge/reference/domain-model.md` | 领域模型（实体关系图） |
| `mes-ai-dev/knowledge/reference/data-dictionary.md` | 数据字典（字段含义） |
| `mes-ai-dev/knowledge/reference/enum-registry.md` | 枚举/状态注册表 |
| `mes-ai-dev/knowledge/reference/error-code-registry.md` | 错误码注册表 |
| `mes-ai-dev/knowledge/rules/api-conventions.md` | API规范约定（硬性规则） |
| `mes-ai-dev/knowledge/rules/coding-standards.md` | 编码规范（硬性规则） |

### 2.6 人工评审要点

- [ ] 微服务识别是否完整（是否遗漏了某些项目）
- [ ] API总数是否与预期大致匹配
- [ ] 服务间调用关系是否合理
- [ ] 数据库Schema归属是否正确
- [ ] 前后端映射是否准确
- [ ] 业务术语是否完整提取
- [ ] 枚举值和状态码是否准确
- [ ] 错误码体系是否完整

### 2.7 注意事项

- 初始化耗时取决于代码仓规模，大型项目可能需要多轮执行
- 每个 Skill 执行前 AI 会先输出计划，确认后才执行
- 如果中途中断，可以从断点继续（知识库是增量写入的）

---

## 三、阶段二：需求分析

### 3.1 做什么

将业务人员提供的自然语言需求，转换为结构化的需求规格文档。

### 3.2 谁来做

**需求分析师**提供原始需求，**AI**执行分析，**项目经理**评审。

### 3.3 怎么做

```
输入命令：/mes-analyze-requirement
然后粘贴或上传原始需求文本
```

### 3.4 执行过程

```
/mes-analyze-requirement 编排的6个Skill：

Step 1: mes-analyze-parse-requirement
  输入：业务自然语言需求
  输出：raw-requirement.md（结构化需求要素）
  做什么：解析需求背景、功能、规则、角色、流程、非功能需求

Step 2: mes-analyze-impact-scope
  输入：raw-requirement.md + 代码地图
  输出：影响范围报告
  做什么：定位涉及哪些服务/模块/数据库表
  关键：先读第0层(总览)，按需读第1层(服务详情)，不读全部代码

Step 3: mes-analyze-trace-flow
  输入：raw-requirement.md + 影响范围 + 依赖图
  输出：业务流程追踪报告
  做什么：追踪 前端页面→API→Controller→Service→DAO→数据库 的完整链路

Step 4: mes-analyze-identify-repos
  输入：raw-requirement.md + 影响范围 + 流程追踪
  输出：仓库影响清单
  做什么：精确到具体的包/类/表/字段，评估修改风险

Step 5: mes-analyze-generate-spec
  输入：以上所有产出 + requirement-spec-template.md
  输出：spec.md
  做什么：按模板生成完整需求规格文档

Step 6: mes-analyze-review-spec
  输入：spec.md
  输出：spec-review-report.md
  做什么：交叉审核完整性/一致性/可测性/可行性
```

### 3.5 输入与输出

| 输入 | 说明 |
|------|------|
| 原始需求文本 | 业务自然语言描述 |

| 输出（写入 `mes-ai-dev/workspace/requirements/{REQ-ID}/`） | 说明 |
|------|------|
| `raw-requirement.md` | 结构化需求要素 + 影响范围 + 流程追踪 + 仓库影响 |
| `spec.md` | 完整需求规格文档 |
| `spec-review-report.md` | 需求规格评审报告 |

### 3.6 人工评审要点

- [ ] 需求要素是否完整（背景、功能、规则、角色、流程）
- [ ] 影响范围是否遗漏了某些服务或模块
- [ ] 业务流程追踪是否准确
- [ ] 验收标准是否可测试
- [ ] 模糊点是否已全部澄清

### 3.7 迭代需求特殊处理

当需求是存量功能的迭代时：
- AI 会自动检测 `mes-ai-dev/workspace/requirements/` 下是否有相关历史需求
- 如果有 → 标记为"迭代需求"，对比新旧差异
- 需求规格文档中会额外包含"存量功能变更说明"章节
- 标注：哪些是新增 / 哪些是修改 / 哪些保持不变

---

## 四、阶段三：详细设计

### 4.1 做什么

根据需求规格文档，设计完整的技术方案（数据库、接口、前端、服务调用链）。

### 4.2 谁来做

**架构师**评审技术方案，**AI**执行设计。

### 4.3 怎么做

```
输入命令：/mes-design-detail
```

### 4.4 执行过程

```
/mes-design-detail 编排的7个Skill：

Step 1: mes-design-approach
  输入：spec.md + 代码地图
  输出：技术方案概要
  做什么：提出技术方案（多方案对比）、评估风险、确定架构选型

Step 2-4（可并行）：
  ├── mes-design-database     数据库设计（表变更、索引、迁移方案）
  ├── mes-design-api          接口设计（API规范、请求响应、错误码）
  └── mes-design-frontend     前端设计（页面、组件、路由、数据流）

Step 5: mes-design-service-chain
  输入：技术方案 + API设计 + 服务依赖图
  输出：服务调用链设计
  做什么：设计微服务间调用顺序、数据流转、事务边界、异常处理

Step 6: mes-design-generate-doc
  输入：以上所有设计产出 + design-doc-template.md
  输出：design.md（完整设计文档）

Step 7: mes-design-review-approach
  输入：design.md + 知识库
  输出：design-review-report.md（评审意见）
  做什么：从可行性/一致性/完整性/性能/安全/可维护性 六个维度评审
```

### 4.5 输入与输出

| 输入 | 说明 |
|------|------|
| `spec.md` | 需求规格文档（上一阶段产出） |

| 输出（写入 `mes-ai-dev/workspace/designs/{REQ-ID}/`） | 说明 |
|------|------|
| `database-design.md` | 数据库设计方案 |
| `api-design.md` | 接口设计方案 |
| `design.md` | 完整详细设计文档 |
| `design-review-report.md` | 设计评审报告 |

### 4.6 人工评审要点

- [ ] 技术方案是否可行
- [ ] 数据库设计是否合理（表命名、字段类型、索引）
- [ ] API设计是否符合RESTful规范（与现有风格一致）
- [ ] 服务调用链是否有循环依赖
- [ ] 事务边界是否清晰
- [ ] 异常处理是否完备

---

## 五、阶段四：代码开发

### 5.1 做什么

根据设计文档，自动生成代码（后端Java + 前端Vue + 数据库脚本）。

### 5.2 谁来做

**开发工程师**审核代码，**AI**执行编码。

### 5.3 怎么做

```
输入命令：/mes-develop-code
```

### 5.4 执行过程

```
/mes-develop-code 编排的11个Skill（严格按顺序）：

Step 1:  mes-develop-plan-tasks        拆分开发任务，标注依赖关系和并行组

Step 2:  mes-develop-database-script   编写DDL/DML脚本

--- 后端开发（严格分层顺序） ---

Step 3:  mes-develop-backend-model     Entity/DTO/VO 数据模型
Step 4:  mes-develop-backend-dao       Mapper/Repository 数据访问层
Step 5:  mes-develop-backend-service   Service 业务逻辑层
Step 6:  mes-develop-backend-controller Controller 控制器层
Step 7:  mes-develop-backend-config    配置文件变更

--- 前端开发（接口设计确定后可与后端并行） ---

Step 8:  mes-develop-frontend-api      API调用方法
Step 9:  mes-develop-frontend-component Vue组件
Step 10: mes-develop-frontend-page     Vue页面 + 路由

--- 代码审查 ---

Step 11: mes-develop-self-review       代码自审
```

### 5.5 输入与输出

| 输入 | 说明 |
|------|------|
| `design.md` | 设计文档 |
| `api-design.md` | 接口设计 |
| `database-design.md` | 数据库设计 |

| 输出（写入 `mes-ai-dev/workspace/development/{REQ-ID}/`） | 说明 |
|------|------|
| `task-plan.md` | 任务拆分计划 |
| 代码文件 | 后端Java + 前端Vue + SQL脚本 |
| `self-review-report.md` | 代码自审报告 |

### 5.6 人工评审要点

- [ ] 代码风格是否与现有代码一致
- [ ] 业务逻辑是否正确实现
- [ ] 数据库脚本是否安全（DDL/DML）
- [ ] API是否与接口设计文档一致
- [ ] 前端组件是否复用了公共组件
- [ ] 异常处理是否完备
- [ ] 命名规范是否统一

### 5.7 多仓协同

当一个需求涉及多个代码仓时：
- AI 按服务边界拆分为独立工作单元
- 不同工作单元可并行开发（每个由独立的Agent执行）
- 通过 `mes-ai-dev/workspace/` 下的文件进行交接
- 前后端开发在接口设计确定后可并行

### 5.8 多Agent并行开发

代码开发阶段是多Agent并行最密集的阶段：

```
主控Agent（Sisyphus）
  ├── Phase 3: 并行启动多个 mes-backend-developer Agent
  │   ├── Agent A: 开发 service-a（Model→DAO→Service→Controller）
  │   ├── Agent B: 开发 service-b（Model→DAO→Service→Controller）
  │   └── Agent C: 开发 service-c（Model→DAO→Service→Controller）
  │
  ├── Phase 4: 并行启动 mes-frontend-developer Agent（与Phase 3同时）
  │   └── Agent D: 开发前端（API层→组件→页面）
  │
  └── Phase 5: 并行启动多个 mes-review-auditor Agent
      ├── Agent E: 代码质量审核
      └── Agent F: 安全审核

锁机制保护：每个 mes-backend-developer Agent 开发前检查锁文件
文件交接：每个Agent完成后写入 *-completion.md
```

---

## 六、阶段五：测试验证

### 6.1 做什么

根据需求和设计，生成测试用例、单元测试代码、集成测试方案、测试报告。

### 6.2 谁来做

**测试工程师**评审测试方案，**AI**生成测试代码。

### 6.3 怎么做

```
输入命令：/mes-test-verify
```

### 6.4 执行过程

```
/mes-test-verify 编排的4个Skill：

Step 1: mes-test-plan-cases
  输入：spec.md + design.md + task-plan.md
  输出：test-cases.md
  做什么：按维度（功能/接口/集成/数据/前端）规划测试用例

Step 2-3（可并行）：
  ├── mes-test-generate-unit         生成JUnit单元测试代码
  └── mes-test-generate-integration  生成集成测试方案

Step 4: mes-test-generate-report
  输入：所有测试产出 + test-report-template.md
  输出：test-report.md
  做什么：汇总测试结果、覆盖率、缺陷、遗留风险
```

### 6.5 输入与输出

| 输入 | 说明 |
|------|------|
| 所有开发产出 | 代码文件 |
| 需求规格 + 设计文档 | 验收标准 |

| 输出（写入 `mes-ai-dev/workspace/testing/{REQ-ID}/`） | 说明 |
|------|------|
| `test-cases.md` | 测试用例 |
| 单元测试代码 | JUnit测试类 |
| `test-report.md` | 测试报告 |

### 6.6 人工评审要点

- [ ] 测试用例是否覆盖所有功能点
- [ ] 边界条件和异常场景是否覆盖
- [ ] 测试数据是否充分
- [ ] 遗留风险是否可接受

---

## 七、阶段六：刷新知识库

### 7.1 做什么

当代码仓有更新时（手动修改、版本迭代），刷新知识库保持同步。

### 7.2 谁来做

**开发工程师**代码更新后触发。

### 7.3 怎么做

```
输入命令：/mes-refresh-knowledge
```

### 7.4 执行过程

```
/mes-refresh-knowledge 编排的4个Skill：

Step 1: mes-refresh-detect-changes
  做什么：检测代码变更，生成变更清单

Step 2-4（可并行）：
  ├── mes-refresh-update-code-map       更新代码地图
  ├── mes-refresh-update-dependency     更新依赖关系图
  └── mes-refresh-update-api-registry   更新API注册表
```

### 7.5 何时执行

- 手动修改了代码仓中的文件后
- 新增了微服务或模块后
- API发生了变更后
- 数据库结构发生了变更后

---

## 八、上下文管理（简要说明）

> **详细规则详见 AGENTS.md §四**。本节仅提供人类视角的核心理念。

### 8.1 为什么需要上下文管理

250万行后端 + 80万行前端，AI不可能一次性读取全部代码。框架通过"四层索引"让AI只读相关部分。

### 8.2 人类角色需要做什么

- **信任知识库**：初始化后，AI已建立索引，无需手动指定读取哪些代码
- **确认知识库新鲜度**：代码手动修改后，执行 `/mes-refresh-knowledge` 刷新
- **理解分批处理**：涉及5个以上服务时，AI会自动分批，不会一次性加载全部

### 8.3 知识库更新时机

| 时机 | 操作 |
|------|------|
| 手动修改代码后 | 执行 `/mes-refresh-knowledge` |
| 新增微服务或模块后 | 执行 `/mes-refresh-knowledge` 或 `/mes-init-enrich` |
| API 发生变更后 | 执行 `/mes-refresh-knowledge` |
| 数据库结构变更后 | 执行 `/mes-refresh-knowledge` |

---

## 九、一键复用到新项目

### 9.1 复用步骤

```
Step 1：复制骨架
  复制以下内容到新项目根目录：
  - .opencode/           （46个Skill + 6个Command + 6个Agent）
  - .opencode/references/mes-ai-reference/templates/ （20个模板）
  - AGENTS.md            （项目规则）

Step 2：修改项目配置
  编辑 AGENTS.md 中的"移植配置"章节：
  - project.name：新项目名称
  - project.description：新项目描述
  - paths.backend：后端代码仓路径
  - paths.frontend：前端代码仓路径
  - paths.database：数据库脚本路径
  - tech_stack.*：技术栈信息

Step 3：初始化
  执行 /mes-init-project
  AI会自动扫描新的代码仓并生成知识库

Step 4：开始使用
  初始化完成后即可执行 /mes-analyze-requirement 开始新需求
```

### 9.2 可复用的内容（无需修改）

- ✅ 全部46个Skill（通用逻辑，路径从AGENTS.md读取）
- ✅ 全部6个Command（编排逻辑通用，含并行策略）
- ✅ 全部6个Agent角色定义（并行协作通用）
- ✅ 全部模板与代码骨架（交付件格式通用）
- ✅ 上下文管理规则（通用）

### 9.3 需要修改的内容

- ❗ AGENTS.md 中的项目配置（名称、路径、技术栈）
- ❗ 代码规范约定（如有差异）

---

## 十、常见场景操作指南

### 场景1：新需求来了

```
操作步骤：
1. 执行 /mes-analyze-requirement，粘贴需求文本
2. 审核需求规格文档，确认后继续
3. 执行 /mes-design-detail
4. 审核设计文档，确认后继续
5. 执行 /mes-develop-code
6. 审核代码，确认后继续
7. 执行 /mes-test-verify
8. 审核测试报告
```

### 场景2：迭代需求（存量功能修改）

```
操作步骤：
1. 执行 /mes-analyze-requirement
2. AI 自动检测历史需求，标记为"迭代需求"
3. 需求规格文档中自动包含"存量变更说明"
4. 后续阶段同场景1
```

### 场景3：多仓协同需求

```
操作步骤：
1. 需求分析阶段，AI自动识别涉及的多个代码仓
2. 设计阶段完成后，按服务边界拆分任务
3. 不同服务的代码开发可并行
4. 前后端开发在接口设计确定后可并行
5. 通过 workspace/ 文件交接
```

### 场景4：代码更新后刷新

```
操作步骤：
1. 手动修改代码后，执行 /mes-refresh-knowledge
2. AI 自动检测变更并更新知识库
3. 刷新完成后可继续新需求分析
```

### 场景5：多需求并行开发

```
操作步骤：
1. 需求A和需求B分别执行各自的分析/设计/开发流程
2. 开发阶段开始前，AI自动检查 workspace/locks/ 下的锁文件
3. 若两个需求涉及同一服务 → AI提示冲突，建议排队或拆分
4. 若涉及不同服务 → 可并行开发，互不干扰

锁机制说明：
- 每个服务在开发时自动创建锁文件（workspace/locks/service-xxx.lock）
- 锁文件记录占用需求ID、阶段、时间
- 开发完成后自动释放
- 检测到锁时，用户可选择：等待/强制获取/切换服务
```

### 场景5：只执行某个Skill

```
操作方式：
直接在对话中引用Skill名称即可，例如：
"请执行 mes-analyze-impact-scope，分析这个需求的影响范围"
AI会自动加载对应Skill并执行
```

---

## 十一、Agent快速参考表

> **命名规则**：所有骨架 Agent 必须以 `mes-` 为前缀，格式为 `mes-{动词}-{名词}`。

### Agent角色

| Agent | 用途 | 调用方式 | 典型阶段 |
|-------|------|---------|---------|
| `mes-service-analyzer` | 分析服务生成索引 | `task(category="deep", load_skills=["init-*"])` | init, refresh |
| `mes-backend-developer` | 开发单个服务代码 | `task(category="deep", load_skills=["develop-*"])` | develop |
| `mes-frontend-developer` | 开发前端模块 | `task(category="visual-engineering", load_skills=["develop-fe-*"])` | develop |
| `mes-test-executor` | 执行特定类型测试 | `task(category="deep", load_skills=["test-*"])` | test |
| `mes-knowledge-refresh` | 增量更新知识库 | `task(category="deep", load_skills=["refresh-*"])` | refresh |
| `mes-review-auditor` | 多维度审核产出 | `task(category="deep", load_skills=["*-review"])` | 各阶段 |

### 各Command并行机会

| Command | 最大并行Agent数 | 关键并行点 |
|---------|---------------|-----------|
| `/mes-init-project` | 5 | Phase 2服务分析（按组分批） |
| `/mes-analyze-requirement` | 2 | Phase 3+4 追溯+类型识别 |
| `/mes-design-detail` | 3 | Phase 2 DB+API+前端 |
| `/mes-develop-code` | 5 | Phase 3多服务 + Phase 4前端 |
| `/mes-test-verify` | 3 | Phase 2 单元+集成+性能 |
| `/mes-refresh-knowledge` | 3 | Phase 2 code-map+dep+api |

---

## 十二、Skill快速参考表

> **命名规则**：所有骨架 Skill 必须以 `mes-` 为前缀，格式为 `mes-{动词}-{名词}`。

### 初始化阶段（10个）

| Skill | 做什么 | 输入 | 输出 |
|-------|--------|------|------|
| `mes-init-scan-backend` | 扫描后端识别微服务 | jalor/路径 | backend-overview.md |
| `mes-init-analyze-service` | 分析服务架构 | backend-overview.md | service-xxx/（index.md + detail.md + file-summaries.md） |
| `mes-init-extract-api` | 提取API端点 | 服务列表 | api-registry.md |
| `mes-init-analyze-config` | 分析配置和依赖 | 服务列表 | service-dependencies.md |
| `mes-init-index-database` | 索引数据库脚本 | dbscript/路径 | mes-ai-dev/knowledge/database-index/ |
| `mes-init-scan-frontend` | 扫描前端识别模块 | web/路径 | frontend-overview.md |
| `mes-init-analyze-routes` | 分析路由和API调用 | frontend-overview.md | module-xxx/（index.md + detail.md + file-summaries.md） |
| `mes-init-build-code-map` | 汇总生成代码地图 | 以上全部 | 更新的overview文件 |
| `mes-init-build-dependency-graph` | 生成依赖关系图 | 以上全部 | mes-ai-dev/knowledge/dependency-graph/ |
| `mes-init-verify-knowledge` | 校验完整性+覆盖率+基线 | 知识库全部 | baseline.md + 校验报告 |

### 需求分析阶段（7个）

| Skill | 做什么 | 输入 | 输出 |
|-------|--------|------|------|
| `mes-analyze-parse-requirement` | 解析需求 | 原始需求文本 | raw-requirement.md |
| `mes-analyze-impact-scope` | 分析影响范围 | raw-requirement.md | 影响范围报告 |
| `mes-analyze-trace-flow` | 追踪业务流程 | raw-requirement.md | 流程追踪报告 |
| `mes-analyze-identify-repos` | 识别仓库影响 | raw-requirement.md | 仓库影响清单 |
| `mes-analyze-generate-spec` | 生成需求规格 | 以上全部 | spec.md |
| `mes-analyze-review-spec` | 评审需求规格 | spec.md | spec-review-report.md |
| `mes-analyze-requirement-diff` | 迭代需求差异分析 | 新旧需求文档 | 差异分析报告 |

### 详细设计阶段（7个）

| Skill | 做什么 | 输入 | 输出 |
|-------|--------|------|------|
| `mes-design-approach` | 设计技术方案 | spec.md | 技术方案 |
| `mes-design-database` | 设计数据库 | 需求规格 + 数据库索引 | database-design.md |
| `mes-design-api` | 设计接口 | 需求规格 + API注册表 | api-design.md |
| `mes-design-frontend` | 设计前端 | 需求规格 + 前端知识库 | 前端设计 |
| `mes-design-service-chain` | 设计调用链 | 方案 + 依赖图 | 调用链设计 |
| `mes-design-generate-doc` | 生成设计文档 | 以上全部 | design.md |
| `mes-design-review-approach` | 评审设计 | design.md | design-review-report.md |

### 代码开发阶段（13个）

| Skill | 做什么 | 输入 | 输出 |
|-------|--------|------|------|
| `mes-develop-plan-tasks` | 拆分任务 | 设计文档 | task-plan.md |
| `mes-develop-database-script` | 编写SQL | 数据库设计 | SQL脚本 |
| `mes-develop-backend-model` | 编写模型 | 数据库+接口设计 | Entity/DTO/VO |
| `mes-develop-backend-dao` | 编写DAO | 模型 + 现有风格 | Mapper/Repository |
| `mes-develop-backend-service` | 编写Service | DAO + 接口设计 | Service |
| `mes-develop-backend-controller` | 编写Controller | Service + 接口设计 | Controller |
| `mes-develop-backend-config` | 编写配置 | 设计文档 | 配置变更 |
| `mes-develop-frontend-api` | 编写前端API | 接口设计 | API调用方法 |
| `mes-develop-frontend-component` | 编写组件 | 前端设计 | Vue组件 |
| `mes-develop-frontend-page` | 编写页面 | 组件 + 路由 | Vue页面 |
| `mes-develop-self-review` | 代码自审 | 所有代码 | self-review-report.md |

### 测试阶段（5个）

| Skill | 做什么 | 输入 | 输出 |
|-------|--------|------|------|
| `mes-test-plan-cases` | 规划测试用例 | 需求 + 设计 | test-cases.md |
| `mes-test-generate-unit` | 生成单元测试 | 代码 + 测试计划 | 测试代码 |
| `mes-test-generate-integration` | 生成集成测试 | 设计 + 依赖图 | 集成测试方案 |
| `mes-test-generate-report` | 生成测试报告 | 所有测试产出 | test-report.md |

### 刷新阶段（4个）

| Skill | 做什么 | 输入 | 输出 |
|-------|--------|------|------|
| `mes-refresh-detect-changes` | 检测变更 | 代码仓 + 知识库 | 变更清单 |
| `mes-refresh-update-code-map` | 更新代码地图 | 变更清单 | 更新的索引 |
| `mes-refresh-update-dependency` | 更新依赖图 | 变更清单 | 更新的依赖 |
| `mes-refresh-update-api-registry` | 更新API表 | 变更清单 | 更新的API表 |

---

## 十三、Command快速参考表

> **命名规则**：所有骨架 Command 必须以 `mes-` 为前缀，格式为 `mes-{动词}-{名词}`。

| Command | 用途 | 编排Skill数 | 最大并行Agent | 适用场景 |
|---------|------|------------|--------------|---------|
| `/mes-init-project` | 初始化知识库 | 11个 | 5 | 首次使用/代码仓大改 |
| `/mes-analyze-requirement` | 需求分析 | 7个 | 2 | 每个新需求 |
| `/mes-design-detail` | 详细设计 | 7个 | 3 | 需求确认后 |
| `/mes-develop-code` | 代码开发 | 13个 | 5 | 设计确认后 |
| `/mes-test-verify` | 测试验证 | 5个 | 3 | 开发完成后 |
| `/mes-refresh-knowledge` | 刷新知识库 | 4个 | 3 | 代码更新后 |

---

## 十四、注意事项与常见问题

### Q1: 每个Skill执行前AI都会输出计划吗？
**是的。**这是铁律。AI在执行任何Skill前都会先输出计划（目标、步骤、预期产出、风险），用户确认后才执行。

### Q2: 中途可以暂停吗？
**可以。**所有产出都写入文件，不会丢失。下次会话时AI会自动读取上一阶段的产出文件继续。

### Q3: 可以只执行某一个Skill吗？
**可以。**直接在对话中引用Skill名称，AI会加载并执行。不必须通过Command编排。

### Q4: 知识库会过时吗？
**会。**代码仓手动修改后需要执行 `/mes-refresh-knowledge` 刷新。建议每次代码更新后都刷新。

### Q5: 大需求怎么处理？
AI会自动按服务边界拆分为独立工作单元，每个工作单元的上下文独立控制，不会爆掉。

### Q6: 如何移植到其他项目？

**方式一（推荐）**：使用 `mes-skeleton-reset` Skill 清理现有骨架产物后迁移
1. 执行 `mes-skeleton-reset` Skill，清理知识库索引、状态文件、阶段产物
2. 复制 `.opencode/`、`.opencode/references/mes-ai-reference/templates/`、`AGENTS.md` 到新项目
3. 修改 `AGENTS.md` 中的配置（后端/前端/数据库路径）
4. 执行 `/mes-init-project` 开始新项目初始化

**方式二（手动）**：直接复制骨架文件
1. 复制 `.opencode/`、`.opencode/references/mes-ai-reference/templates/`、`AGENTS.md` 到新项目
2. 手动清理 `mes-ai-dev/knowledge/code-map/`、`mes-ai-dev/knowledge/state/`、`mes-ai-dev/workspace/各阶段目录`
3. 修改 `AGENTS.md` 中的配置
4. 执行 `/mes-init-project`

> 推荐**方式一**，因为 `mes-skeleton-reset` 会自动处理清理范围、保留必要文件、生成清理报告，避免遗漏。

### Q7: 迭代需求怎么处理？
AI会自动检测历史需求文档，对比差异，标注新增/修改/不变。

---

## 十五、文件产出关系图

```
需求进来
    │
    ▼
┌─────────────────────────────────────────┐
│ /mes-analyze-requirement                     │
│                                          │
│ raw-requirement.md                       │
│ spec.md ← requirement-spec-  │
│ spec-review-report.md template.md        │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│ /mes-design-detail                           │
│                                          │
│ database-design.md ← database-design-    │
│ api-design.md        template.md         │
│ design.md ← design-doc-template.md   │
│ design-review-report.md                  │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│ /mes-develop-code                            │
│                                          │
│ task-plan.md ← task-plan-template.md     │
│ SQL脚本 / Java代码 / Vue代码              │
│ self-review-report.md                    │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│ /mes-test-verify                             │
│                                          │
│ test-cases.md ← test-case-template.md    │
│ 单元测试代码                              │
│ test-report.md ← test-report-template.md │
└─────────────────────────────────────────┘
```

---

*文档版本：v2.0（多Agent并行协作） | 最后更新：2026-04-10*
