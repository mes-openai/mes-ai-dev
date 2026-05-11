---
title: 治理经验记忆库
doc_type: reference
load_strategy: explicit-only
phase_scope: []
trigger:
  - governance-memory
  - skeleton-review
  - retrospective
cost_level: high
summary_first: true
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/governance-memory-summary.md
  - knowledge/rules/skeleton-change-governance.md
---

# 治理经验记忆库

> 对应摘要：`knowledge/reference/governance-memory-summary.md`
> 若当前只是一般执行问题或摘要已足够判断是否存在同类治理经验，禁止默认整篇读取正文。
> 本文件用于沉淀骨架治理过程中的问题、根因、补救动作与防复发规则。
> 目标不是替代正式规则，而是将“曾经犯过的错、为什么错、以后如何避免”结构化持久化，供后续骨架修改、阶段治理和审查复盘复用。

---

## 一、适用范围

本记忆库适用于以下场景：

1. 骨架约束新增、修改、删除后的复盘
2. 骨架治理中发现的同步漏项、审查误判、规则断链、模板失联、状态口径漂移
3. 阶段处理链路中“规则已要求，但执行未落地”的同类问题
4. 需要将一次性审查结果沉淀为长期防复发规则时

不适用于：

1. 普通业务需求中的临时讨论
2. 仅影响单个需求、且不具有复发价值的偶发问题
3. 未经正式审查或未形成事实证据链的猜测性问题

---

## 二、使用原则

1. 本文件只记录**已确认的问题与经验**，不得写入未经证据支持的猜测性结论。
2. 每条记忆至少应包含：问题、触发场景、根因、影响范围、补救动作、防复发规则、证据路径。
3. 本文件是**治理经验记忆层**，不替代 `AGENTS.md`、`phase-gates/index.md`、`artifact-standards.md` 等正式规则文件。
4. 若某条经验已经上升为正式规则，必须在“防复发规则/正式落点”中明确指向正式文件。
5. 若本次骨架约束变更后执行了全局排查，且发现了可复用的同类问题，必须同步更新本文件。
6. 本文件不替代具体阶段的 OpenSpec 主交接文档、`memory/pitfall-ledger.md`、`memory/decision-log.md`、`memory/blocker-log.md`；阶段记忆优先承载需求执行层经验，本文件只沉淀治理层经验。

---

## 三、何时必须更新

出现以下任一情况时，必须评估是否更新本文件：

1. 新增/调整骨架级约束后，执行了全局排查并发现同类问题
2. 骨架修改正式审查结果中出现了“入口漏同步”“规则失联”“设计断层”“模板口径漂移”“状态字段未迁移”等可复发问题
3. 阶段处理链路中出现“规则已要求，但执行未落地”的模式化问题
4. 某个问题虽已修复，但后续仍可能再次发生，需要沉淀防复发规则

---

## 四、记忆条目模板

| 字段 | 内容要求 |
|------|----------|
| 记忆编号 | `GM-YYYYMMDD-XXX` |
| 问题标题 | 简短描述问题本质 |
| 触发场景 | 骨架修改 / 阶段处理 / 刷新 / 审查 / 交接 |
| 事实描述 | 发生了什么，禁止模糊描述 |
| 根因分析 | 为什么会发生 |
| 影响范围 | 影响哪些入口、规则、阶段、模板 |
| 补救动作 | 当次是如何修复的 |
| 防复发规则 | 以后必须如何避免 |
| 正式落点 | 已落到哪些正式规则/模板/命令 |
| 证据路径 | 审查文件、日志、规则文件路径 |
| 当前状态 | 观察中 / 已固化 / 已关闭 |

---

## 五、治理经验记忆条目

### GM-20260416-001：骨架级约束落地后总入口漏同步

| 字段 | 内容 |
|------|------|
| 触发场景 | 骨架约束变更 |
| 事实描述 | 阶段完成产物报告、阶段详细审查报告、审查时间、证据链等约束已先后落入下沉规则、模板、命令和日志，但 `AGENTS.md`、`skeleton-change-governance.md`、`skeleton-constraint-summary.md` 在初期未同步更新 |
| 根因分析 | 执行时将“下沉规则已落地”误判为“骨架总入口已同步”，且骨架审查模板在当时缺少总入口逐项核对，导致审查结论过于乐观 |
| 影响范围 | 骨架总入口、摘要入口、主规则、审查结论可信度 |
| 补救动作 | 补齐总入口三件套；强化骨架审查模板的总入口逐项核对；追加全量复核审查结果 |
| 防复发规则 | 若新增/调整骨架级共通约束，必须同步核对 `AGENTS.md`、`skeleton-change-governance.md`、`skeleton-constraint-summary.md`，不得只改下沉规则 |
| 正式落点 | `AGENTS.md`、`knowledge/rules/skeleton-change-governance.md`、`knowledge/reference/skeleton-constraint-summary.md`、`templates/governance/skeleton-change-review-template.md` |
| 证据路径 | `workspace/refresh/skeleton-change-review-20260416-骨架约束全量复核.md`；`workspace/refresh/skeleton-change-log.md` |
| 当前状态 | 已固化 |

### GM-20260416-002：规则写进模板/模板升级后，真实执行承载文件可能未迁移

| 字段 | 内容 |
|------|------|
| 触发场景 | 阶段处理 / 状态治理 |
| 事实描述 | 后台排查发现 `status-tracker-template.md` 已引入新字段，但真实 `workspace/status-tracker.md` 可能仍沿用旧字段结构，存在“模板已升级、实际承载文件未迁移”的风险 |
| 根因分析 | 修改时优先更新模板与规则，但未同步核查真实示例/实际承载文件 |
| 影响范围 | 状态追踪口径、实际执行一致性、人工查阅体验 |
| 补救动作 | 已将 `workspace/status-tracker.md` 迁移到最新模板字段；同时对 step-gate 实际落盘执行链发起专项审计 |
| 防复发规则 | 模板、状态规范、阶段报告命名发生变化时，必须同步检查实际承载文件/示例文件是否已迁移 |
| 正式落点 | `workspace/status-tracker.md`；`templates/governance/status-tracker-template.md`；专项审计结果文件 |
| 证据路径 | 本次会话中的同类问题排查结论；`workspace/status-tracker.md`；`templates/governance/status-tracker-template.md` |
| 当前状态 | 已部分整改 |

### GM-20260416-003：步骤级 gate 规则已存在，但真实落盘证据仍需专项核查

| 字段 | 内容 |
|------|------|
| 触发场景 | 阶段处理 / 门禁执行 |
| 事实描述 | `phase-gates/`、`status-tracker-governance.md`、`mes-verify-phase-gate/SKILL.md` 均要求步骤级 gate 审查记录落盘，但当前 `workspace/requirements/`、`designs/`、`development/`、`testing/` 目录未发现实际 `step-gate-*.md` 记录 |
| 根因分析 | 规则与模板已落地，但真实工作区示例/执行链尚未形成稳定、可见的落盘证据 |
| 影响范围 | 步骤级门禁可追溯性、执行一致性、审计完整性 |
| 补救动作 | 已发起专项审计，并要求后续根据审计结果决定是否补样例、补执行说明或补真实落盘链 |
| 防复发规则 | 当门禁规则新增实际落盘要求时，必须同步检查工作区真实承载文件、示例文件和执行链是否已形成证据 |
| 正式落点 | `phase-gates/index.md` + `common.md`；`status-tracker-governance.md`；`mes-verify-phase-gate/SKILL.md`；专项审计结果文件 |
| 证据路径 | `workspace/refresh/stage-gate-execution-audit-20260416.md`（待生成）；相关规则文件 |
| 当前状态 | 观察中 |

### GM-20260416-004：Command / Skill / Artifact 命名与映射漂移会在骨架多入口中重复扩散

| 字段 | 内容 |
|------|------|
| 触发场景 | 骨架修改 / 阶段命令编排 / 审查收口 |
| 事实描述 | 在对 `mes-analyze-requirement` 进行单点审查时，发现其 Phase 与 skill 语义错配、示例 `load_skills` 使用非 canonical 名称、命令文档中的产物文件名与 skill 实际输出不一致。继续全量排查后，又在多个 command、skill、入口文件中发现同类问题：同一阶段的评审报告命名、design 链中间产物命名、command → skill → artifact 映射口径分散漂移，导致维护者需要在多个文件之间反复猜测真实标准。 |
| 根因分析 | 骨架长期按“命令文档、skill 文档、入口手册、模板索引、规则文件”分层演进，但缺少一份被正式治理约束的统一映射基线；修改时容易只修某一层，而未同步更新其他层，最终形成命名漂移、语义错位和入口失联。 |
| 影响范围 | `.opencode/commands/`、`.opencode/skills/`、README、模板索引、团队接入规范、飞行员手册、消费矩阵、骨架摘要、门禁、骨架审查模板 |
| 补救动作 | 本轮先全量排查并修复 command 层的非 canonical skill 名、phase 语义错配与产物命名不一致问题；随后统一 review 报告命名和 design 链中间产物边界；新增 `knowledge/reference/command-skill-artifact-map.md` 作为长期基线，并将其接入 README、模板索引、团队接入规范、飞行员手册、主规则、phase-gates、骨架审查模板、消费矩阵与骨架摘要。 |
| 防复发规则 | 若修改涉及 command、skill、阶段标准产物文件名或阶段评审报告命名，必须同步检查并按需更新 `command-skill-artifact-map.md`；若该总表发生变化，还必须同步检查 README、模板索引、团队接入规范、飞行员手册、消费矩阵与骨架摘要等入口文件是否仍一致。 |
| 正式落点 | `knowledge/reference/command-skill-artifact-map.md`；`knowledge/rules/skeleton-change-governance.md`；`knowledge/reference/phase-gates/index.md`；`templates/governance/skeleton-change-review-template.md`；`knowledge/reference/knowledge-consumption/index.md`；`knowledge/reference/skeleton-constraint-summary.md` |
| 证据路径 | 本轮 command/skill/artifact 全量修复相关文件；`workspace/refresh/skeleton-change-log.md` 中 2026-04-16 当日多条“映射总表接入”与“命名/产物链收口”记录 |
| 当前状态 | 已固化 |

---

## 六、维护要求

1. 本文件更新后，必须同步更新 `skeleton-change-log.md`。
2. 若新增了高价值治理经验，建议在骨架修改正式审查结果中引用对应记忆编号。
3. 若经验已过时或被正式规则吸收，允许保留条目，但应在“当前状态”中标注为“已固化”或“已关闭”。
