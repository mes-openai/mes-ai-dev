# 骨架约束清单摘要

> 本文件用于**人工快速查阅**当前骨架修改必须关注的约束总览。
> 若需要阻断规则、强制动作与判定标准，以 `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md` 为准。

---

## 一、用途说明

本摘要文件回答两个问题：

1. 当前骨架修改时，必须满足哪些约束类别。
2. 每类约束的主规则入口在哪里。
3. 进入维护期后，哪些动作会让骨架结构退化。

适用场景：

- 修改骨架前快速自查
- 审核骨架修改时快速核对
- 新成员理解骨架治理边界
- 维护期快速提醒，避免把新结构改回旧总表口径

不适用场景：

- 替代正式规则文件
- 替代门禁标准
- 作为删除/放宽约束的依据

---

## 二、当前骨架修改必须关注的约束

| 约束类别 | 约束摘要 | 主规则入口 |
|---|---|---|
| 计划与审核 | 结果输出前必须审核；步骤级输出未经门禁不得进入下一步骤；审查结果必须形成详细审查报告；所有审查必须具备完整证据链且禁止猜测性结论；阶段审查报告必须记录审查时间 | `AGENTS.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`; `.opencode/references/mes-ai-reference/rules/artifact-standards.md` |
| 阶段完成产物报告 | 每个阶段退出前必须生成阶段完成产物报告，说明标准产物、已生成文件、未生成文件及原因；未生成或内容不达标不得退出阶段 | `AGENTS.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`; `.opencode/references/mes-ai-reference/rules/artifact-standards.md`; `templates/governance/stage-output-report-template.md` |
| 阶段详细审查报告 | 每个阶段退出前必须生成完整、详细的阶段审查报告，并记录审查时间；缺失证据链、缺少时间或内容不达标不得退出阶段 | `AGENTS.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`; `.opencode/references/mes-ai-reference/rules/artifact-standards.md`; `templates/governance/detailed-review-report-template.md` |
| 命名与中文输出 | Skill/Command/Agent 命名必须以 `mes-` 为前缀，符合 `mes-{动词}-{名词}` 规范；所有 `.md` 文件必须中文输出；代码注释使用中文 | `AGENTS.md`; `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md` |
| Skill 目录结构 | Skill 必须采用目录化结构，至少包含 `SKILL.md`、`INDEX.md`、`modules/`、`evals/`；`SKILL.md` 仅承载核心指令，详细说明必须下沉且保持原意 | `AGENTS.md`; `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/reference/phase-skill-index.md` |
| 按需加载与运行时入口 | 日常执行应优先通过 `runtime-entry.md`、`skeleton-loading-matrix.md` 与文档级加载元信息判断最小加载包；高成本文档应优先读 summary，禁止默认全文常驻 | `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`; `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`; `.opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md` |
| 工具标准化接入 | 新建 Skill/Command/Agent 不能只是临时产物，应能被骨架作为标准项目级工具直接消费，并按注册矩阵补齐入口、说明、导航或模板引用 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/reference/team-onboarding-guide.md`; `操作地图-飞行员手册.md` |
| 骨架修改留痕 | 任何骨架修改都必须同步更新 `skeleton-change-log.md`，未更新不得宣告完成 | `AGENTS.md`; `mes-ai-dev/workspace/refresh/skeleton-change-log.md` |
| 统一状态源 | `mes-ai-dev/knowledge/state/state.yaml` 是唯一已合并机器事实源；片段与兼容视图不得替代事实源 | `.opencode/references/mes-ai-reference/rules/state/state-core.md`; `.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md` |
| 路径 canonical | 根目录、服务目录、模块目录、Schema 目录、状态片段、知识片段都必须符合 canonical 命名规则 | `.opencode/references/mes-ai-reference/rules/path-canonicalization-rules.md`; `.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md` |
| 共享知识串行收口 | 共享知识文件不得由并行会话直接覆盖，必须先写局部结果，再由主控串行收口 | `AGENTS.md`; `.opencode/references/mes-ai-reference/rules/governance/shared-knowledge-write-policy.md`; `.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md` |
| 初始化局部产物与 converge 收口 | 无论单仓还是全仓初始化，每个仓都必须有独立过程产物；最终接轨骨架的共享产物必须由 `mes-init-converge` 或等价主控收口完成 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md` |
| 上下文控制 | 大需求场景下必须控制上下文在 200K 内，常规目标 190K 内，并通过分层读取、摘要交接、范围加载与预算守卫防止爆上下文 | `AGENTS.md`; `.opencode/references/mes-ai-reference/rules/budget-audit-rules.md`; `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md` |
| 最终接轨产物的预见性设计 | API清单、术语、领域模型等最终共享产物必须优先采用索引化、分片正文、摘要优先消费等结构，防止爆上下文 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/rules/artifact-standards.md` |
| 复用与 Skill 集 | 骨架必须支持复用到其它项目；初始化、阶段交付、依赖刷新等能力应沉淀为可编排的 Skill 集或标准能力 | `AGENTS.md`; `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `操作地图-飞行员手册.md` |
| 性能与多 Agent 协同 | 骨架应充分利用多 Agent 并行协作和按范围拆分提升分析处理性能，但不得破坏锁、预算和收口规则 | `AGENTS.md`; `操作地图-飞行员手册.md` |
| 骨架简洁与说明完整 | 骨架应尽可能简洁，但关键目录、文件与规则必须有说明；新增内容优先复用现有机制，避免无必要膨胀 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `mes-ai-dev/workspace/refresh/README.md`; `templates/template-index.md` |
| 骨架修改后的整链路审查 | 骨架修改完成后，必须检查整套流程是否存在设计遗漏、设计断层或规则/模板/门禁/收口之间的断链 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/common.md` |
| 骨架约束变更后全局复盘 | 若新增、调整或删除骨架级约束，必须全局排查骨架治理与阶段处理里是否存在同类问题，并产出建议方案；必要时沉淀到治理经验记忆库 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`; `.opencode/references/mes-ai-reference/reference/governance-memory.md` |
| step-gate 标准命名与目录 | 强制落盘的步骤级门禁审查记录必须遵循统一目录与命名规则，优先使用 `step-gate-{阶段名}-step-{步骤编号}.md`；消费门禁 Skill 时应按目录化结构读取 `SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` | `.opencode/references/mes-ai-reference/reference/status-tracker-governance.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`; `.opencode/skills/mes-verify-phase-gate/SKILL.md`; `.opencode/skills/mes-verify-phase-gate/INDEX.md` |
| 模板与入口一致性 | 新增/调整规则后，必须同步检查治理入口、消费矩阵、模板导航、示例与说明文件是否需要更新 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `templates/template-index.md`; `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md` |
| Command/Skill/产物映射一致性 | 若修改涉及 command、skill、阶段标准产物文件名或评审报告命名，必须同步检查 `command-skill-artifact-map.md`，并确认 README、模板索引、团队接入规范、飞行员手册等入口仍与最新映射一致 | `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`; `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md` |
| 历史文档阅读边界 | 历史审计/复盘文档不得作为当前规则唯一依据；旧口径需服从最新主规则 | `mes-ai-dev/workspace/refresh/README.md`; `.opencode/references/mes-ai-reference/rules/path-canonicalization-rules.md` |
| 规则冲突的人为确认 | 若拟修改骨架规则与现有规则存在冲突，必须先获得人工确认同意，再继续刷新相关骨架文件 | `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md` |
| 产物大小限制 | 文档、知识文件、交接文件必须遵守大小限制，超限必须压缩或拆分 | `.opencode/references/mes-ai-reference/rules/artifact-standards.md` |
| 仓规模与预算 | 大仓/超大仓必须遵守热点优先、detail 限制与上下文预算规则 | `.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`; `.opencode/references/mes-ai-reference/rules/budget-audit-rules.md` |

### 预算优化与主定义快速入口

若当前骨架修改涉及上下文预算、重文档误加载、索引越界、规则多点展开或谁是主定义等问题，优先查阅：

- `.opencode/references/mes-ai-reference/rules/governance/context-budget-optimization-plan-summary.md`
- `.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`
- `.opencode/references/mes-ai-reference/reference/rule-authority-matrix.md`

---

## 三、后续新增约束时必须做什么

1. 新约束必须写入明确文件，不能只留在对话或临时说明里。
2. 新约束必须同步纳入规则体系：
   - 要么纳入 `skeleton-change-governance.md`
   - 要么纳入其引用的下沉规则文件
   - 若为骨架级共通约束，还必须同步纳入 `AGENTS.md` 与本摘要文件
3. 若新约束影响入口、消费、示例或模板，必须同步更新相关文件。
4. 若新约束属于骨架级共通约束，还必须执行一次全局复盘，排查骨架治理与阶段处理中的同类问题，并给出建议方案。
5. 若未纳入规则体系，则该新增动作视为未完成，应打回补齐。

主规则入口：`.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`

---

## 四、修改或删除约束时必须做什么

1. **必须先取得人工确认**。
2. 人工确认至少应覆盖：
   - 要修改/删除的约束项
   - 修改原因
   - 影响范围
   - 是否涉及迁移或补录
3. 未确认前，不得直接删改既有约束。
4. 确认后仍需同步更新：规则文件、治理入口、消费矩阵、模板、示例、日志。

主规则入口：`.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`

---

## 五、骨架修改的最小自查清单

- [ ] 本次变更确实属于骨架修改，范围已识别清楚
- [ ] 已核对主规则文件 `skeleton-change-governance.md`
- [ ] 已检查是否影响治理入口、消费矩阵、模板导航、示例或说明文档
- [ ] 若涉及 command / skill / 阶段标准产物 / 评审报告命名，已同步检查 `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`
- [ ] 若新增 Skill / Command / Agent，已按注册矩阵补齐实体路径、正式入口、说明与必要引用
- [ ] 若本次修改影响初始化规则，已检查单仓/全仓初始化的局部过程产物与 `mes-init-converge` 收口是否仍然闭环
- [ ] 已更新 `mes-ai-dev/workspace/refresh/skeleton-change-log.md`
- [ ] 若新增约束，已同步纳入规则体系
- [ ] 若修改或删除约束，已取得人工确认并留痕
- [ ] 若本次规则修改与现有规则存在冲突，已先取得人工确认同意，再继续刷新相关骨架文件
- [ ] 已检查本次骨架修改在整套流程中是否存在设计遗漏、设计断层或规则/模板/门禁/收口断链
- [ ] 若涉及历史口径变化，已补充去歧义说明
- [ ] 若已形成正式骨架审查结果，已按 `mes-ai-dev/workspace/refresh/skeleton-change-review-{YYYYMMDD}-{主题}.md` 规则落盘
- [ ] 若未落盘正式骨架审查结果，已确认本次变更属于允许不单独落盘的例外边界

---

## 六、GSD 执行增强摘要

### 6.1 模式摘要

| 项目 | 结论 | 说明 | 依据 |
|------|------|------|------|
| 双模式执行 | 支持 | 骨架支持 `strict / gsd` 双模式 | `AGENTS.md`; `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md` |
| Strict 模式 | 保留 | 高风险、跨仓、数据库/状态模型/收口规则/发布关键路径必须优先进入 Strict 模式 | `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/index.md` |
| GSD 模式 | 支持 | 目标明确、范围可控、风险中低、可定义最小可交付时允许进入 GSD 模式 | `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md` |

### 6.2 GSD 核心约束摘要

| 约束项 | 核心要求 | 依据 |
|--------|----------|------|
| 目标驱动 | 先识别当前目标与最短推进路径，再决定阶段压缩方式 | `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md` |
| blocker 治理 | blocker 必须分类为硬阻塞/软阻塞/外部依赖阻塞 | `.opencode/references/mes-ai-reference/reference/blocker-handling-guide.md` |
| 最小可交付 | GSD 模式允许以最小可继续结果推进，但不得伪装成完整完成 | `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`; `.opencode/references/mes-ai-reference/reference/phase-gates/gsd-continue-exit.md` |
| DoD | 所有阶段必须同时定义完整完成与 GSD 完成 | `.opencode/references/mes-ai-reference/reference/dod-definition-guide.md` |
| 收尾扫描 | 所有阶段或任务结束前必须执行 Completion Sweep | `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`; `.opencode/references/mes-ai-reference/rules/governance/completion-sweep-standard.md` |
| 下一步建议 | 所有 GSD Continue Exit 必须输出推荐下一步与后补动作 | `.opencode/references/mes-ai-reference/reference/phase-gates/gsd-continue-exit.md` |

### 6.3 blocker 核心判断摘要

| blocker 类型 | 是否允许继续 | 要求 |
|--------------|-------------|------|
| 硬阻塞 | 否 | 必须停止推进，并压缩为最小决策点 |
| 软阻塞 | 是 | 必须记录代偿动作、后补动作与风险等级 |
| 外部依赖阻塞 | 视情况 | 优先判断是否可重排路径、Mock 或局部推进 |

### 6.4 GSD Continue Exit 核心摘要

进入 `GSD Continue Exit` 至少必须满足：

1. 当前目标明确
2. 当前最小可交付明确
3. blocker 已分类
4. 未命中硬阻塞
5. 风险已说明
6. 后补动作已明确
7. 下一步建议已输出
8. 当前 GSD DoD 已满足

### 6.5 禁止事项摘要

以下情况不得用 GSD 模式继续推进：

- 核心方案未明确
- 核心数据/状态模型无法判断
- 关键发布条件未满足
- 命中高风险安全问题
- 必要收尾动作未执行
- 使用“可继续”掩盖“未完成”

### 6.6 人工快速核对清单

#### 当前任务是否适合 GSD 模式？
- [ ] 目标明确
- [ ] 范围可控
- [ ] 风险中低
- [ ] 可形成最小可交付
- [ ] 不涉及关键数据库/状态模型/发布阻断

#### 当前 blocker 是否治理到位？
- [ ] blocker 已分类
- [ ] 硬阻塞已阻断
- [ ] 软阻塞已写代偿动作
- [ ] 后补动作已明确
- [ ] 最小决策点已压缩清晰

#### 当前任务是否满足 GSD 完成？
- [ ] 当前目标已完成到可继续状态
- [ ] 最小可交付已形成
- [ ] 风险说明已记录
- [ ] 下一步建议已给出
- [ ] Completion Sweep 已执行

### 6.7 骨架治理快速提醒

后续新增骨架能力时，除评估规则完整性外，还必须同时评估：

- 是否增强或保持目标驱动推进能力
- 是否定义 blocker 处理方式
- 是否定义最小可交付
- 是否定义 DoD
- 是否定义 Completion Sweep
- 是否让用户承担了本可由 AI 自动处理的项目管理负担

---

## 七、GSD 红线提醒

以下情况必须优先按 Strict 模式处理，不得为了追求推进速度而降级治理：

1. 数据库结构破坏性变更
2. `state.yaml` 主状态模型变更
3. `/mes-init-converge` 或共享收口规则变更
4. 关键发布与回滚决策
5. 高风险安全问题
6. 用户明确要求严格按阶段执行

---

## 八、推荐阅读顺序

1. `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`
2. `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
3. `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
4. `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`
5. `.opencode/references/mes-ai-reference/rules/path-canonicalization-rules.md`
6. `.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`
7. `mes-ai-dev/workspace/refresh/skeleton-change-log.md`
8. `.opencode/references/mes-ai-reference/templates/governance/skeleton-change-review-template.md`
9. `mes-ai-dev/workspace/examples/example-skeleton-change-review.md`
10. `mes-ai-dev/workspace/refresh/README.md`

补充建议：

- 当需要确认“当前阶段该读哪类规则、哪些规则已从 AGENTS 下沉”时，优先查：
  - `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
  - `.opencode/references/mes-ai-reference/rules/phases/`
  - `.opencode/references/mes-ai-reference/rules/scenarios/`
  - `.opencode/references/mes-ai-reference/rules/governance/`
- 当需要确认“维护期最短应记住什么”，可直接阅读：`.opencode/references/mes-ai-reference/reference/skeleton-maintenance-ten-commandments.md`

---

## 九、边界说明

1. 本文件是摘要，不替代正式规则。
2. 本文件与主规则不一致时，以主规则为准。
3. 若后续新增骨架约束，本文件也必须同步更新，避免人工查阅口径过期。
