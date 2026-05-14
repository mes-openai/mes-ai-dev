---
title: 骨架修改治理规则
doc_type: governance
load_strategy: explicit-only
phase_scope: []
trigger:
  - skeleton-change
cost_level: high
summary_first: true
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/skeleton-change-governance-summary.md
  - mes-ai-dev/workspace/refresh/skeleton-change-log.md
---

# 骨架修改治理规则

> 对应摘要：`.opencode/references/mes-ai-reference/rules/skeleton-change-governance-summary.md`
> 若当前任务不涉及骨架自身修改，或摘要已足够支撑判断，禁止直接把本正文作为默认常驻输入。
> **硬性规则**：本文件仅对**骨架修改**生效。违反任一约束 = 本次骨架修改不成立，必须打回重做，禁止宣告完成。
> 本文件用于收敛当前骨架已存在的约束条件，并规定后续新增、修改、删除约束条件时的强制治理要求。

---

## 一、适用范围

以下对象属于“骨架”，修改时必须遵守本规则：

- `AGENTS.md`
- `.opencode/commands/` 下的骨架命令文档
- `.opencode/skills/` 下的骨架 Skill 文档
- `mes-ai-dev/knowledge/` 下的规则、参考、状态、索引、示例、消费矩阵、门禁、知识结构说明
- `.opencode/references/mes-ai-reference/templates/` 下的模板与模板索引
- `mes-ai-dev/workspace/examples/` 下的骨架示例
- `mes-ai-dev/workspace/refresh/` 下的骨架治理说明、审计、复盘、修改日志

以下内容**不适用**本规则：

- 业务需求开发产物
- 业务代码实现本身
- 普通需求交付文档

---

## 二、骨架修改总原则

1. 骨架修改必须先识别受影响的规则、模板、索引、示例、日志与治理入口，不得只改单点文件。
2. 骨架修改必须与现有主规则保持一致；若发现冲突，必须统一收敛，不得留下双重口径。
3. 骨架修改只要触发任一硬性约束不满足，即视为**未完成**，必须打回重做。
4. 历史审计、复盘、说明类文档默认不得作为当前骨架规则的唯一依据；若与最新主规则冲突，以最新主规则为准。
5. 所有 `.md` 文件必须使用中文输出；代码注释使用中文。
6. 骨架修改必须同步留痕到 `mes-ai-dev/workspace/refresh/skeleton-change-log.md`；未留痕不得宣告完成。
7. 骨架修改必须同步更新 `AGENTS.md` 中的“骨架版本信息”，至少包括“当前骨架版本”和“最近修改时间”；未更新不得宣告完成。
8. “最近修改时间”必须精确到秒，格式为 `YYYY-MM-DD HH:mm:ss`，时区固定为 `Asia/Shanghai`。
9. 骨架版本号必须采用 `vMAJOR.MINOR.PATCH` 格式：重大规则体系、状态模型或目录结构变更递增 MAJOR；新增治理约束、流程能力或标准产物递增 MINOR；文案修正、说明补充等非行为性调整递增 PATCH。
10. 骨架应在满足治理完整性的前提下尽可能简洁；新增规则、模板、说明、示例时，应优先复用现有机制，避免无必要膨胀。
11. 骨架必须适配大需求场景下的上下文控制，设计时应优先保证 AI 知道“该读什么、不该读什么”，避免无边界读取导致上下文爆掉。
12. 骨架必须支持复用到其它项目；新增骨架能力时，应优先考虑是否能沉淀为可迁移、可参数化、可编排的标准能力，而非仅对当前项目有效。
13. 骨架工作目录必须与业务代码仓目录隔离，骨架治理规则不得弱化这一边界。

---

## 三、当前骨架约束清单（仅整理骨架相关）

本节用于归并当前骨架中已经存在且对骨架修改有约束力的条件。后续新增约束时，必须同步补入本节或本文件引用的下沉规则。

### 3.1 计划与审核约束

1. 除初始化阶段外，各阶段或 Skill 执行前应先输出计划；计划至少包含：目标、步骤、预期产出、风险评估。
2. 用户可对计划进行补充、修正或确认；未获得用户同意前，不得继续执行后续正式步骤。
3. 初始化阶段可作为例外自动继续执行，但该例外仅限初始化与初始化深化/收敛场景，不得扩张到其他阶段。
4. 初始化阶段即使允许自动继续，也必须记录执行计划、风险与关键边界；若出现锁冲突、重置/覆盖、范围越界、共享文件收口异常等高风险动作，仍应显式留痕并遵守门禁要求。
5. 所有结果输出前必须审核正确性，审核维度至少包含：逻辑正确性、与现有代码一致性、完整性。
6. 步骤级输出进入下一步骤前必须先通过门禁审查；审查不通过时，当前步骤必须打回重做。
7. 所有评审、审核、门禁、验收、审计、校验类结果，必须形成详细审查报告或引用满足同等最小字段集的报告。
8. 详细审查报告不得只保留轻量结论，至少包含：审查目标与范围、审查对象与输入、审查依据、检查项与结果、问题清单、风险评估、整改要求或建议、审查结论、证据路径、复审或闭环状态。
9. 所有审查结论必须具备完整证据链，不得基于猜测性判断给出“通过”或等价结论。
10. 所有阶段退出前，必须同时具备：
   - 阶段完成产物报告（用于说明标准产物、已生成文件、未生成文件及原因）
   - 阶段详细审查报告（用于说明审查依据、检查结果、证据链与审查时间）
11. 任何阶段详细审查报告若缺少审查时间、关键证据链或正式结论，不得视为有效审查产物。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/reference/phase-gates/index.md`、`.opencode/references/mes-ai-reference/reference/phase-gates/common.md`、`.opencode/references/mes-ai-reference/rules/artifact-standards.md`

### 3.1.1 骨架版本与修改时间约束

1. 后续任何骨架修改，必须同步更新 `AGENTS.md` 顶部“骨架版本信息”。
2. “骨架版本信息”至少包含：当前骨架版本、最近修改时间、时间精度、时区。
3. “最近修改时间”必须精确到秒，格式为 `YYYY-MM-DD HH:mm:ss`，时区固定为 `Asia/Shanghai`。
4. 骨架版本号必须采用 `vMAJOR.MINOR.PATCH` 格式，并按以下规则递增：
   - 重大规则体系、状态模型或目录结构变更：递增 MAJOR。
   - 新增治理约束、流程能力或标准产物：递增 MINOR。
   - 文案修正、说明补充等非行为性调整：递增 PATCH。
5. 更新骨架版本信息后，必须同步在 `mes-ai-dev/workspace/refresh/skeleton-change-log.md` 追加本次修改记录，确保版本信息、修改时间与日志记录可追溯。

主要来源：`AGENTS.md`、`mes-ai-dev/workspace/refresh/skeleton-change-log.md`

### 3.2 命名与中文输出约束

1. Skill、Command、Agent 命名必须以 `mes-` 为前缀，格式为 `mes-{动词}-{名词}`，并符合 `^mes-[a-z0-9]+(-[a-z0-9]+)*$` 模式。
2. 前缀 `mes-` 用于区分项目骨架工具与 OpenCode 内置工具，避免命名冲突。
3. 所有 `.md` 文件均使用中文输出。
4. 代码注释必须使用中文。
5. 新创建的 Skill、Command、Agent 等骨架能力，不得停留在临时文件层面，应能被骨架以标准项目级工具方式直接消费。
6. 若新增项目级骨架工具能力，应同步补齐其入口、说明、模板或索引引用，确保可以"拿来即用"，而不是依赖隐式上下文或人工记忆。
7. 工具标准化接入必须具备可执行注册动作，不得仅写入实体文件而遗漏注册清单、导航入口或使用说明。
8. 后续新增骨架工具时，命名必须遵守 `mes-` 前缀规则，否则视为违规命名不得注册。

主要来源：`AGENTS.md`

### 3.2.1 工具标准化接入注册矩阵

新增骨架工具能力时，至少必须满足以下注册要求：

#### A. 新增 Skill

1. Skill 实体文件必须落到 `.opencode/skills/<skill-name>/SKILL.md`。
2. Skill 名称必须以 `mes-` 为前缀，符合 `mes-{动词}-{名词}` 命名规范。
3. Skill 必须使用目录化结构，根目录固定为 `.opencode/skills/<skill-name>/`。
4. Skill 根目录下必须至少包含：`SKILL.md`、`INDEX.md`、`modules/`、`evals/`。
5. `SKILL.md` 只承载元数据与核心指令，正文应控制在 200 行以内；详细执行说明必须下沉到 `INDEX.md` 与 `modules/`。
6. `INDEX.md` 只负责导航，不替代模块正文；执行时必须遵循 `SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` 的读取顺序。
7. `modules/` 用于承载第二层模块文档；每个模块文件应控制在 100 行以内，不得在重构时改变原 Skill 原意。
8. `evals/` 为必需目录，至少包含：`trigger/evals.json`、`capability/dataset.json`、`capability/{eval-name}/evals.json`；`compare.json` 可按需提供。
9. `references/`、`scripts/`、`assets/`、`examples/`、`configuration/` 为可选目录，仅在确有内容时创建，不得为了形式制造空壳目录。
10. Skill 不得回退为单文件说明结构；后续修改时必须优先保持目录化结构稳定。
11. 若 Skill 会被阶段流程正式消费，必须在以下至少一处完成注册或引用：
   - `AGENTS.md` 的阶段使用说明、治理入口或相关规则章节
   - `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`（若其消费对象是知识文件/规则文件）
   - `mes-ai-dev/操作地图-飞行员手册.md` 的 Skill 速查、流程说明或一键复用说明
   - 相关 Command 文档（若该 Skill 被某个 Command 编排调用）
12. 若 Skill 会产出标准文档或依赖固定模板，必须补齐模板引用、模板导航或说明入口。
13. 若 Skill 被定义为项目级标准能力，但无法从规则、导航、手册、Command 或消费矩阵中发现，则视为**未完成注册**。

#### B. 新增 Command

1. Command 实体文件必须落到 `.opencode/commands/`。
2. Command 名称必须以 `mes-` 为前缀，符合 `mes-{动词}-{名词}` 命名规范。
3. 必须在以下位置同步至少一处可发现入口：
   - `AGENTS.md` 阶段使用说明或治理入口
   - `.opencode/references/mes-ai-reference/reference/team-onboarding-guide.md` 的 Command 速查表或使用流程
   - `mes-ai-dev/操作地图-飞行员手册.md` 的命令说明、流程图或速查表
4. 若 Command 编排多个 Skill，必须明确其前置条件、主要产物、使用场景和关键门禁。
5. 新增 Command 若只存在于实体文件但未进入任一正式说明入口，则视为**未完成注册**。

#### C. 新增 Agent

1. Agent 实体文件必须落到 `.opencode/agents/`。
2. Agent 名称必须以 `mes-` 为前缀，符合 `mes-{动词}-{名词}` 命名规范。
3. 必须在以下位置至少补齐一处正式说明：
   - `AGENTS.md` 多 Agent 角色定义或并行编排规则
   - `mes-ai-dev/操作地图-飞行员手册.md` 的 Agent 角色说明、并行协作说明或编排示例
4. 若 Agent 有专属职责边界、输入输出、并行上限或锁冲突约束，应同步补到相应规则或手册说明中。
5. 新增 Agent 若无法从角色表、手册或编排说明中被发现，则视为**未完成注册**。

#### D. 共通检查项

1. 新增工具能力后，必须检查是否需要同步更新：
   - `skeleton-change-governance.md`
   - `skeleton-constraint-summary.md`
   - `team-onboarding-guide.md`
   - `操作地图-飞行员手册.md`
   - `knowledge-consumption/index.md`
   - `template-index.md`
   - `skeleton-change-log.md`
2. 若工具能力影响门禁、产物、目录说明、示例、工作区落盘规则，也必须同步补齐对应文件。
3. 新增工具若未完成注册矩阵要求，不得宣告“已成为标准项目级工具”。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/reference/team-onboarding-guide.md`、`操作地图-飞行员手册.md`

### 3.3 骨架修改留痕约束

1. 凡修改骨架文件，必须同步刷新 `mes-ai-dev/workspace/refresh/skeleton-change-log.md`。
2. 日志必须列清：受影响文件、变更摘要、影响说明、后续动作。
3. 若变更影响既有规则或路径标准，必须在影响说明中明确是否存在迁移要求。
4. 若新增强制规则，必须在后续动作中明确需要同步检查的文件或流程。
5. 若本次骨架修改涉及**新增、修改、删除标准产物、目录职责、标准文件名、模板对应产物或产物分类**，必须同步刷新：
   - `.opencode/references/mes-ai-reference/reference/stage-artifact-guide.md`
   - `.opencode/references/mes-ai-reference/reference/skeleton-artifact-ownership-guide.md`
   - `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`（若命中命名或映射变更）
   - 相关入口索引、模板索引与结构说明文件
6. 若上述同步刷新未完成，则本次骨架修改不得判定为完成。

主要来源：`AGENTS.md`、`mes-ai-dev/workspace/refresh/skeleton-change-log.md`

### 3.4 统一状态源与兼容视图约束

1. `mes-ai-dev/knowledge/state/state.yaml` 是唯一已合并机器事实源。
2. `mes-ai-dev/knowledge/state/fragments/*.yaml`、`mes-ai-dev/knowledge/fragments/**/*.md` 仅是待收口片段，不得作为下游正式事实源。
3. `summary.md`、`baseline.md`、`init-coverage.md` 必须以统一状态源为准，不得绕过事实源直接维护；若启用双写兼容，可按主文件摘要 + 对应 `state-detail/` 明细联合渲染。
4. 禁止直接编辑兼容视图、禁止新代码依赖历史遗留状态文件、禁止并行直接覆盖 `state.yaml`。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/rules/state-rendering-spec.md`、`.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`

### 3.5 路径 canonical 与知识结构约束

1. 骨架根目录必须固定为 `mes-ai-dev/`。
2. 服务目录、模块目录、Schema 目录、状态片段、知识片段必须遵守 canonical 命名规则，不得混用多种风格。
3. 索引、示例、模板、门禁审查中引用的路径必须与实际 canonical 路径一致。
4. 历史文档若保留旧路径口径，必须显式标注“历史口径说明”。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/rules/path-canonicalization-rules.md`、`.opencode/references/mes-ai-reference/rules/state-rendering-spec.md`

### 3.6 共享知识文件与串行收口约束

1. 共享知识文件不得由并行 Agent 或多个 session 直接覆盖，必须先写局部结果，再由主控串行收口。
2. `state.yaml`、共享 reference 文件、共享 rules 文件、全局 code-map 文件、dependency-graph 全局文件等均属于共享收口对象。
3. 无论单仓初始化还是全仓初始化，每个仓都必须保留独立的过程产物、状态片段或知识片段，不得跳过局部过程直接写最终共享文件。
4. 初始化阶段局部产物、状态片段、知识片段必须先落局部文件，再统一由 `/mes-init-converge` 或主控汇总。
5. 最终与骨架接轨的共享产物，必须优先采用防爆上下文的预见性设计；对于 API 清单、术语表、领域模型等高风险汇总对象，应优先使用索引化、分片正文、摘要优先消费等结构，禁止无边界膨胀为单一大文件。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/rules/state-rendering-spec.md`

### 3.7 模板、索引与消费入口一致性约束

1. 骨架新增规则、模板、治理说明后，必须判断是否需要同步接入治理入口、消费矩阵、模板导航或其他索引入口。
2. 模板导航必须保持单一入口原则，不得制造分散且相互冲突的索引口径。
3. 知识消费矩阵、治理入口、规则文件之间的引用必须保持一致，不得一处新增、多处失联。
4. 各阶段交付件模板应统一管理，并优先通过阶段化 Skill / Command 编排消费，不得在多个位置维护互相冲突的交付模板口径。
5. 若骨架修改涉及 `.opencode/commands/`、`.opencode/skills/`、阶段标准产物文件名或阶段评审报告命名，必须同步检查并按需更新 `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`。
6. 若 `command-skill-artifact-map.md` 已更新，必须同步检查 README、模板索引、团队接入规范、飞行员手册等入口文件是否仍与最新映射一致。
7. 若骨架修改涉及“哪些产物由 AI 生成 / 人补充 / 人主导”的边界变化，必须同步更新 `.opencode/references/mes-ai-reference/reference/skeleton-artifact-ownership-guide.md`。
8. 若骨架修改涉及“阶段产物种类、分类、优先级、阅读方式”的变化，必须同步更新 `.opencode/references/mes-ai-reference/reference/stage-artifact-guide.md`。
9. 若新增文档属于面向人阅读的长期入口文档，必须至少同步检查：
   - `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
   - `.opencode/references/mes-ai-reference/reference/team-onboarding-guide.md`
   - `.opencode/references/mes-ai-reference/reference/knowledge-structure.md`
   - `.opencode/references/mes-ai-reference/reference/workspace-structure.md`
   - `.opencode/references/mes-ai-reference/templates/template-index.md`
10. 若骨架修改涉及 Skill 目录结构、Skill 读取顺序、模块拆分规则或 evals 结构，必须同步检查并按需更新：
   - `AGENTS.md`
   - `.opencode/references/mes-ai-reference/reference/phase-skill-index.md`
   - `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
   - `.opencode/references/mes-ai-reference/reference/team-onboarding-guide.md`
   - `.opencode/references/mes-ai-reference/reference/knowledge-structure.md`
   - `.opencode/references/mes-ai-reference/reference/skeleton-constraint-summary.md`
11. 若 Skill 从单文件重构为目录化结构，必须保证原意不变，不得借目录重构之名修改触发条件、职责边界、执行步骤或审核结论。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/templates/template-index.md`、`.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`

### 3.8 历史文档阅读边界约束

1. `mes-ai-dev/workspace/refresh/` 下历史审计、复盘、说明文档反映的是生成当时的骨架状态。
2. 历史文档不得作为当前骨架规则的唯一依据。
3. 历史口径与现行规则冲突时，以最新 `AGENTS.md`、主规则文件、消费矩阵、门禁标准为准。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/reference/sdk-project-path-boundary.md`、`.opencode/references/mes-ai-reference/reference/operator-flight-manual.md`

### 3.8.1 骨架修改后的整链路审查约束

1. 骨架修改完成后，必须审查修改后的骨架在整套流程中是否存在设计遗漏、设计断层或流程断链。
2. 该审查不能只检查改动文件本身，还必须检查其对规则入口、门禁、模板、示例、工作区落盘规则、刷新流程和下游消费路径的影响。
3. 若发现“规则已改但门禁未改”“模板已改但示例未改”“局部产物已改但收口规则未改”“最终共享产物仍可能爆上下文”等设计断层，则本次骨架修改不得判定完成。
4. 该审查应优先通过正式骨架修改审查结果文件或等价详细审查报告留痕。

### 3.8.2 骨架约束变更后的全局复盘约束

1. 若本次骨架修改涉及新增、调整或删除骨架级约束，完成主变更后必须执行一次**全局复盘**。
2. 全局复盘必须至少检查：
   - 当前骨架治理文件中是否存在类似漏同步、规则失联、模板失联、状态未迁移、说明入口滞后等同类问题
   - 阶段处理链路中是否存在“规则已要求，但执行未落地”的同类问题
   - 本次约束变更是否引发新的流程断层、审查盲区或历史文档误读风险
3. 全局复盘结果必须给出明确建议方案，至少包含：发现的问题、影响范围、优先级、建议动作、是否阻断当前骨架修改完成结论。
4. 若全局复盘发现可复发的治理问题，必须同步评估是否更新 `.opencode/references/mes-ai-reference/reference/governance-memory.md`。
5. 未完成全局复盘或未给出建议方案，不得判定本次骨架约束变更已完成。

主要来源：`.opencode/references/mes-ai-reference/reference/phase-gates/index.md`、`.opencode/references/mes-ai-reference/reference/phase-gates/common.md`、`.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`

### 3.9 上下文预算与大需求适配约束

1. 骨架必须适配大需求上下文控制，单次 Session 预算应以 200K 以内为硬边界设计，常规预算目标应控制在 190K 以内。
2. 骨架必须通过总览 → 精简索引 → 详情 → 文件摘要 → 精准代码的分层读取方式，控制 AI 的读取范围。
3. 禁止无边界读取整个代码仓；必须先通过概览、索引、摘要与消费矩阵判断应读与不应读的内容。
4. 若新增骨架能力会增加上下文消耗，必须同时评估其对 `mes-guard-context-budget`、消费矩阵、模板体积与交接产物大小的影响。
5. 骨架针对大需求应优先支持分阶段压缩、跨阶段摘要交接、多 Agent 并行拆分与按范围加载，防止单轮上下文爆掉。

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/rules/budget-audit-rules.md`、`.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`

### 3.10 复用与 Skill 集体系约束

1. 骨架必须支持一键复用到其它项目；新增骨架能力时，优先设计为可配置、可移植、可参数化的通用能力。
2. 初始化能力必须形成可分步骤执行的 Skill 集，不得只保留散乱说明；重点仓与非重点仓的初始化提示词、模板和流程应能按范围参数化执行。
3. 各阶段交付过程应形成分步骤 Skill 集或等价的标准编排能力，使需求分析、设计、开发、测试、交付、刷新等阶段都具备结构化执行入口。
4. 后续仓库代码更新、依赖刷新、关联文件补录等动作，也应沉淀为标准 Skill 集或等价的标准化编排能力。
5. 复用能力若只存在于手册说明、历史报告或口头约定中，而未落到 Skill / Command / 模板 / 规则中，不视为完成。

主要来源：`AGENTS.md`、`操作地图-飞行员手册.md`

### 3.11 性能与多 Agent 协同约束

1. 骨架搭建完成后的分析处理应优先利用多 Agent 并行协作、按服务边界拆分和按范围加载，以提升速度与吞吐。
2. 新增骨架能力时，应优先评估是否支持并行编排，而不是默认串行扩张。
3. 多 Agent 协同必须与锁机制、共享文件串行收口规则、上下文预算规则共同成立，不能为追求速度而破坏一致性。

主要来源：`AGENTS.md`、`操作地图-飞行员手册.md`

### 3.12 目录说明、仓隔离与无文档代码理解约束

1. 骨架中的关键目录、关键工作区和关键规则文件应有用途说明，避免目录存在但使用意图不清。
2. 骨架工作目录 `mes-ai-dev/` 必须与 `jalor/`、`web/`、`dbscript/` 等业务代码仓目录平级隔离，不得混写。
3. 骨架必须假设业务代码仓缺乏 `.md` 说明文档，并通过索引化、依赖图、文件摘要、初始化产物、参考知识与映射关系来建立代码理解能力。
4. 若新增骨架目录、文件或示例，会影响使用者理解成本，应同步补齐说明文件、索引入口或示例引用。

主要来源：`AGENTS.md`、`mes-ai-dev/workspace/refresh/README.md`、`.opencode/references/mes-ai-reference/templates/template-index.md`

### 3.13 GSD 执行能力一致性约束

1. 骨架修改除满足治理、门禁、路径、状态、收口与日志留痕要求外，还必须评估其是否影响 AI 的推进能力。
2. 若骨架修改命中阶段命令、门禁标准、状态追踪模型、模板导航、阶段产物规则、共享知识消费方式或骨架主规则变更，必须执行 GSD 一致性检查。
3. 命中本节范围的骨架修改，必须明确说明以下影响：
   - 目标驱动推进能力是否增强、保持或倒退
   - blocker 是否有明确处理路径
   - 最小可交付是否仍可形成
   - 是否定义了 GSD DoD
   - 是否定义了 Completion Sweep 收尾要求
   - 是否增加了用户项目管理负担
4. 以下骨架修改方式视为治理缺陷：
   - 只增加阻断条件，不增加处理路径
   - 只增加文档要求，不说明最小可交付形态
   - 只增加审查要求，不定义完成标准
   - 只增加例外说明，不定义后补动作
   - 让阶段必须等待所有非关键文档齐备后才能继续
   - 把 AI 原可自动推进的事项重新变成用户手工项目管理职责
5. 若本次修改影响 GSD 推进能力，`skeleton-change-log.md` 中必须记录：
   - 本次对推进能力的影响
   - 是否改变了 blocker 处理方式
   - 是否改变了最小可交付边界
   - 是否改变了 DoD 或 Completion Sweep 要求
   - 是否增加了新的 Strict / GSD 模式边界

主要来源：`AGENTS.md`、`.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`、`.opencode/references/mes-ai-reference/reference/blocker-handling-guide.md`、`.opencode/references/mes-ai-reference/reference/dod-definition-guide.md`

### 3.14 自动调优治理约束

1. 自动调优属于骨架治理辅助机制，不得绕过骨架修改主规则、门禁、留痕与正式审查要求。
2. 自动调优默认只允许执行低风险标准化增强，例如：
   - 补 front matter
   - 补 `summary_first`
   - 补正文到摘要的互链
   - 为索引页补 `index-only`
   - 新增 summary 草稿
3. 自动调优不得无确认执行高风险结构动作，例如：
   - 大规模拆正文
   - 重排主规则结构
   - 重组索引主链
   - 批量修改跨文件引用关系
   - 删除原正文主体内容
4. 自动调优必须遵守“确属高成本才纳入”的原则，不得为了形式统一而把轻量规则、短标准文件或阶段主规则机械纳入高成本正文治理机制。
5. 自动调优不得让 summary 膨胀为第二份正文；summary 只负责快速判断与最小摘要，不替代正式正文。
6. 自动调优若修改了骨架文件，必须同步更新 `mes-ai-dev/workspace/refresh/skeleton-change-log.md`。
7. 自动调优若影响以下任一对象，必须升级为正式骨架修改审查：
   - `AGENTS.md`
   - `runtime-entry.md`
   - `skeleton-loading-matrix.md`
   - 主规则文件
   - 大范围索引主链
   - 多文件结构性重构
8. 自动调优若只涉及低风险标准化增强，可在留痕后视为普通骨架增量修改；若涉及中高风险结构调整，必须输出审计结果或正式审查结果。
9. 自动调优的规则、判定、流程、状态模型与审计载体，统一以下列文件为准：
   - `.opencode/references/mes-ai-reference/rules/governance/document-auto-optimization-rules.md`
   - `.opencode/references/mes-ai-reference/reference/document-auto-optimization-matrix.md`
   - `.opencode/references/mes-ai-reference/reference/document-auto-optimization-flow.md`
   - `.opencode/references/mes-ai-reference/reference/document-auto-optimization-state-model.md`
   - `.opencode/references/mes-ai-reference/templates/governance/document-auto-optimization-audit-template.md`
10. 自动调优不应作为独立任务默认频繁触发，而应主要服务于文档过载、误读风险和维护期收口场景。

---

## 四、骨架修改的强制检查项

每次修改骨架时，至少必须检查以下项目：

1. **范围识别**：本次变更是否属于骨架修改。
2. **规则对齐**：是否违反现有硬性规则、门禁标准、状态规范、路径规范、产物限制。
3. **引用闭环**：新增或调整规则后，是否同步更新相关治理入口、消费矩阵、模板导航、示例或说明文档。
3.1 **总入口同步**：若新增/调整的是骨架级约束，是否同步更新 `AGENTS.md`、`skeleton-change-governance.md`、`skeleton-constraint-summary.md` 等总入口文件。
4. **留痕闭环**：`skeleton-change-log.md` 是否已更新。
5. **历史去歧义**：若变更导致历史文档更易误导，是否补充历史口径说明或阅读边界说明。
6. **冲突消除**：是否存在新旧口径并存、文件间互相矛盾、示例与规则不一致的问题。
7. **全局复盘**：若命中骨架级约束变更，是否已完成全局排查同类问题并形成建议方案。
8. **GSD 一致性**：若本次修改影响阶段推进，是否已检查目标驱动、blocker、最小可交付、DoD、Completion Sweep 与用户决策负担。

任一检查项不通过 = 本次骨架修改必须打回重做。

---

## 五、新增约束条件的同步纳入规则

后续若新增骨架约束条件，必须同时满足：

1. 新约束必须落到明确文件中，不得只存在于口头说明、临时对话或零散备注。
2. 新约束必须同步纳入以下至少一项：
   - 本文件“当前骨架约束清单”
   - 本文件所引用的对应下沉规则文件
3. 若新约束影响治理入口或消费顺序，必须同步更新相关索引或入口文件。
4. 若新约束影响骨架使用方式、审查方式、命名路径或状态流转，必须同步更新示例、模板、日志或阅读边界说明。
5. 若新约束属于骨架级共通治理约束，必须同步更新：
   - `AGENTS.md`
   - `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`
   - `.opencode/references/mes-ai-reference/reference/skeleton-constraint-summary.md`
6. 若新增约束涉及阶段治理、审查机制或状态追踪，还必须评估是否需要同步更新：
   - `.opencode/references/mes-ai-reference/reference/governance-memory.md`
   - `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
   - 对应说明入口或示例文件
7. 若新增约束未同步纳入本规则体系，则该新增动作视为**未完成**，必须打回补齐。

---

## 六、修改或删除约束条件的人工确认规则

### 6.1 总原则

1. **严厉禁止**在未获人工确认的前提下，直接修改或删除既有约束条件。
2. 任何会改变约束语义、降低约束强度、缩小适用范围、移除检查项、取消强制留痕、取消门禁、放宽命名/路径/状态规范的行为，均视为“修改或删除约束条件”。
3. 未获得人工确认前，只允许：
   - 梳理现状
   - 标记冲突
   - 提出修改建议
   - 起草待确认方案
   - 补充不改变原约束语义的引用、示例、说明

### 6.2 人工确认的最低要求

1. 必须由用户或明确授权的人类责任方给出显式确认。
2. 确认内容至少应覆盖：
   - 要修改或删除的约束项
   - 修改原因
   - 影响范围
   - 是否涉及迁移或补录
   - 是否允许据此继续刷新相关骨架规则、摘要、门禁或知识文件
3. 未出现明确确认语句时，一律按“未确认”处理。

### 6.3 确认后的强制动作

在获得人工确认后，仍必须执行以下动作：

1. 更新被影响的规则文件、入口文件、模板、示例、日志。
2. 在 `skeleton-change-log.md` 中明确记录：
   - 被修改/删除的约束
   - 人工确认事实
   - 影响说明
   - 后续补偿动作
3. 若删除约束会导致其他文件仍保留旧检查项，必须同步清理或改写，避免形成假规则。
4. 若修改约束会影响历史产物理解，必须补充阅读边界说明或历史口径说明。
5. 若本次存在“拟修改规则与现有规则冲突”的情形，在获得人工确认前，严禁继续刷新相关骨架规则、摘要、门禁或收口文件。

未完成以上动作 = 仍视为本次骨架修改不完整。

---

## 七、禁止行为

- ❌ 未更新 `skeleton-change-log.md` 就宣告骨架修改完成
- ❌ 只改规则正文，不改治理入口、消费矩阵、模板或示例，导致规则失联
- ❌ 将历史审计/复盘文档当作当前唯一规则源
- ❌ 未获人工确认直接删除或放松约束条件
- ❌ 以“减少维护成本”为由绕过门禁、留痕、状态源、canonical 路径等硬性规则
- ❌ 新增约束后不纳入本规则体系，导致后续修改无法感知

---

## 八、骨架审查结果落盘规则

### 8.1 落盘目录

骨架修改审查结果统一写入：

- `mes-ai-dev/workspace/refresh/`

原因：

1. 骨架修改不属于普通业务需求交付物。
2. 骨架治理、规则、审计、复盘、说明与日志已集中在 `mes-ai-dev/workspace/refresh/` 下。
3. 便于与骨架修改日志、历史审计、治理补强记录统一管理。

### 8.2 命名规则

骨架修改审查结果文件推荐命名如下：

- 标准审查文件：`skeleton-change-review-{YYYYMMDD}-{主题}.md`
- 同一主题复审文件：`skeleton-change-review-{YYYYMMDD}-{主题}-r{轮次}.md`

约束：

1. `{主题}` 应使用能表达本次骨架修改核心内容的中文或英文短语，避免使用无意义编号。
2. 若一次会话内审查多个独立骨架主题，应拆分为多个审查文件，不得将多个不相关主题混入一份文件。
3. 若仅用于演示模板成品形态，应写入 `mes-ai-dev/workspace/examples/`，不得冒充真实审查结果。

### 8.3 与日志的互链要求

1. 审查文件中必须引用 `mes-ai-dev/workspace/refresh/skeleton-change-log.md` 的对应记录。
2. `skeleton-change-log.md` 的“影响说明”或“后续动作”应能回指对应审查文件（如已形成正式审查结果）。
3. 若同一骨架修改经历多轮复审，日志中至少应说明最新有效审查文件或复审轮次。

### 8.4 与模板的关系

1. 骨架修改审查文件应优先使用：`.opencode/references/mes-ai-reference/templates/governance/skeleton-change-review-template.md`
2. 若采用其他更具体格式，仍不得缺少该模板中的关键骨架检查项与详细审查报告最小字段集。
3. 示例文件只用于参考，不替代真实落盘审查结果。

### 8.5 不落盘的例外边界

以下情况可不单独形成骨架审查结果文件，但仍必须满足主规则与日志要求：

1. 仅做不改变语义的微小文字修订，且未新增/修改/删除约束。
2. 仅做示例中的错别字修复，且不影响规则、入口、门禁、路径、状态或模板口径。

但若出现以下任一情况，建议或必须落盘审查结果：

1. 新增骨架约束。
2. 修改或删除既有骨架约束。
3. 调整治理入口、消费矩阵、门禁、模板或摘要口径。
4. 可能影响历史文档理解边界。

---

## 九、治理入口与证据路径

- 总入口：`AGENTS.md`
- 门禁标准：`.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- 知识消费：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- 状态规范：`.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`
- 路径规范：`.opencode/references/mes-ai-reference/rules/path-canonicalization-rules.md`
- 产物限制：`.opencode/references/mes-ai-reference/rules/artifact-standards.md`
- 模板导航：`.opencode/references/mes-ai-reference/templates/template-index.md`
- 骨架修改审查模板：`.opencode/references/mes-ai-reference/templates/governance/skeleton-change-review-template.md`
- 骨架约束摘要：`.opencode/references/mes-ai-reference/reference/skeleton-constraint-summary.md`
- 骨架修改工作区说明：`mes-ai-dev/workspace/refresh/README.md`
- 骨架修改日志：`mes-ai-dev/workspace/refresh/skeleton-change-log.md`

---

## 十、执行结论判定规则

骨架修改只有在以下条件全部满足时，才可判定为完成：

1. 本文件适用范围内的变更已识别完整。
2. 本次修改满足当前全部骨架约束条件。
3. 若新增约束，已同步纳入规则体系。
4. 若修改或删除约束，已取得人工确认并完成配套更新。
5. 相关入口、引用、示例、日志已完成同步。

任一条件不满足 = **打回重做**。
