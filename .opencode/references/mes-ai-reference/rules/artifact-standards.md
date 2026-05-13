---
title: 产物压缩规范
doc_type: governance
load_strategy: explicit-only
phase_scope: []
trigger:
  - artifact-generation
  - deliver
cost_level: high
summary_first: true
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/artifact-standards-summary.md
  - .opencode/references/mes-ai-reference/rules/governance/stage-artifact-layout.md
---

# 产物压缩规范

> 对应摘要：`.opencode/references/mes-ai-reference/rules/artifact-standards-summary.md`
> 若当前任务尚未进入正式产物生成、整理、归档或大小约束裁剪，本摘要通常已足够，禁止默认整篇读取正文。
> 本文件为硬性规则（违反=缺陷），限制各阶段产物的大小，防止文档无限膨胀导致 AI 上下文溢出。

---

## 一、产物大小限制

### 阶段目录内标准分类规范

各阶段 `{REQ-ID}` 目录必须采用以下标准分类目录组织产物；`{REQ-ID}` 的解析与阶段目录映射必须遵循 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`：

- `deliverable/`
- `mes-ai-dev/workspace/report/`
- `evidence/`
- `handoff/`
- `mes-ai-dev/workspace/memory/`
- `working/`

固定文件位置如下：

- 阶段完成产物报告：`mes-ai-dev/workspace/report/stage-output-report.md`
- 阶段主交接文档：符合 OpenSpec 的主文档
- 坑点台账：`mes-ai-dev/workspace/memory/pitfall-ledger.md`
- 决策日志：`mes-ai-dev/workspace/memory/decision-log.md`
- 阻塞台账：`mes-ai-dev/workspace/memory/blocker-log.md`

基本要求：

1. 正式交付物不得混放于 `working/`
2. 审查报告不得混放于 `deliverable/`
3. 证据链材料不得只在报告中口头引用而无落盘文件
4. 交接与恢复文件不得省略
5. 阶段记忆相关固定文件缺失时，不得判定阶段组织完整

### 阶段产出文档

| 文档类型 | 最大行数 | 最大估算 token | 说明 |
|---------|---------|---------------|------|
| spec.md | 200 行 | ~3K token | 需求规格 |
| impact-scope.md | 150 行 | ~2K token | 影响范围 |
| design.md | 500 行 | ~8K token | 详细设计 |
| task-plan.md | 200 行 | ~3K token | 任务计划 |
| test-cases.md | 300 行 | ~5K token | 测试用例 |
| test-report.md | 200 行 | ~3K token | 测试报告 |
| self-review-report.md | 200 行 | ~3K token | 自审报告 |
| review-report*.md / *-review-report.md | 200 行 | ~3K token | 各类详细审查报告主文件 |
| stage-output-report.md | 250 行 | ~4K token | 阶段完成产物报告 |
| deploy-plan.md | 200 行 | ~3K token | 部署计划 |
| acceptance-report.md | 150 行 | ~2K token | 验收报告 |
| release-note.md | 200 行 | ~3K token | 发布说明 |
| handover-doc.md | 300 行 | ~5K token | 交接文档 |
| spec.md / design.md / tasks.md / test-report.md / handover-doc.md | 220 行 | ~3.5K token | 阶段主交接文档 |
| memory/pitfall-ledger.md | 300 行 | ~5K token | 阶段坑点台账 |
| memory/decision-log.md | 300 行 | ~5K token | 阶段决策日志 |
| memory/blocker-log.md | 300 行 | ~5K token | 阶段阻塞台账 |

### 超限处理

1. **文档超过最大行数** → 必须压缩：
   - 将详细内容拆分到附录文件
   - 主文件只保留摘要 + 引用路径
   - 例如：design.md 超过 500 行 → 拆分为 design.md（摘要）+ mes-design-api-detail.md（API详情）

2. **压缩规则**：
   - 表格行超过 50 行 → 分表或只保留变更项
   - 列表超过 30 项 → 归类分组
   - 代码块超过 50 行 → 只保留关键片段，完整代码在源文件中

3. **详细审查报告特例**：
   - 审查报告主文件必须保留：结论、问题分级、关键风险、整改要求、证据路径、闭环状态
   - 明细证据、完整问题明细、长表格、长日志可拆分到附录，如：`review-report-appendix.md`、`review-evidence.md`
   - 禁止为了满足行数限制而删除关键问题、风险、整改要求或证据路径

---

## 二、知识库文件大小限制

| 文件类型 | 最大行数 | 最大估算 token |
|---------|---------|---------------|
| backend-overview.md / frontend-overview.md | 100 行 | ~2K token |
| service index.md | 100 行 | ~2K token |
| service detail.md | 400 行 | ~8K token |
| service file-summaries.md | 200 行 | ~4K token |
| module index.md | 100 行 | ~2K token |
| service-dependencies.md | 300 行 | ~5K token |
| api-registry.md | 500 行 | ~8K token |

> **索引化强制**：对于超大仓或高频共享文件，最终共享文件必须优先采用“索引文件 + 分片正文”结构，禁止将全量明细长期堆积在单个共享文件中。

### 超大服务处理

单个服务的 detail.md 超过 400 行时：
1. 按包路径拆分为多个子文件：`detail-controller.md`、`detail-service.md`、`detail-dao.md`
2. `detail.md` 保留架构总览 + 子文件引用

---

## 三、历史产物归档规则

### 归档时机

需求关闭后 7 天，自动归档：

```
workspace/requirements/REQ-XXX/ → workspace/archive/REQ-XXX/requirements/
workspace/designs/REQ-XXX/     → workspace/archive/REQ-XXX/designs/
workspace/development/REQ-XXX/ → workspace/archive/REQ-XXX/development/
workspace/testing/REQ-XXX/     → workspace/archive/REQ-XXX/testing/
workspace/delivery/REQ-XXX/    → workspace/archive/REQ-XXX/delivery/
```

### 归档后保留摘要

归档时在 `mes-ai-dev/workspace/archive/REQ-XXX/summary.md` 生成压缩摘要（≤500 token），包含：
- 需求名称和编号
- 涉及服务列表
- 关键变更摘要
- 交付结论

---

## 四、强制执行规则

1. **每个 Skill 生成产出后必须检查行数**：超过限制必须压缩
2. **归档由 mes-deliver-handover Skill 在交接完成 7 天后触发**
3. **status-tracker.md 中已 closed 的需求，其目录应在归档后清理**
4. **违反本规范的产物 = 缺陷**，必须在 review 阶段修正

---

## 五、详细审查报告统一标准

> 适用于评审、审核、门禁、验收、审计、校验等所有审查结果类产物。

### 适用产物

- `spec-review-report.md`
- `design-review-report.md`
- `development-review-report.md`
- `self-review-report.md`
- `spec-review-report.md`
- `step-gate-*.md`
- `acceptance-report.md`
- `delivery-audit-record.md`
- `stage-output-report.md`
- 其他承担审查结果职责的 `*review*.md` / `*audit*.md` / `*verification*.md`

### 必含章节

所有详细审查报告主文件必须至少包含以下内容：

1. **审查目标与范围**：本次审查要回答什么问题，覆盖哪些对象
2. **审查对象与输入**：被审查文件、版本、需求编号、输入材料
3. **审查依据**：规则、模板、规范、基线、命令或门禁项来源
4. **检查项与检查结果**：逐项记录检查项、结果、说明
5. **问题清单**：至少包含编号、级别、类别、位置、描述、影响
6. **风险评估**：说明当前遗留风险、影响范围、触发条件
7. **整改要求 / 建议**：说明必须整改项、建议整改项、闭环时点
8. **审查结论**：仅允许 `✅通过 / ⚠️有条件通过 / ❌不通过`
9. **证据路径**：命令、文件路径、日志、报告、截图或附录引用
10. **复审 / 闭环状态**：记录未闭环项、复审人、复审时间或后续计划
11. **审查时间**：主报告必须记录明确审查时间，禁止缺失时间戳
12. **证据链闭环**：每条关键结论必须可追溯到输入、审查依据、检查结果与证据路径；禁止无证据猜测性结论

### 兼容策略

1. 允许保留历史文件名，但内容必须升级为详细审查报告结构
2. 当已有场景模板更具体时，可在保持场景字段的同时补齐统一必含章节
3. 若主报告超限，必须采用“主报告 + 附录”方式，不得降级为简略记录
4. 不满足统一标准的审查产物，视为审查未完成，下游阶段不得消费

### 证据链强制要求

1. 审查报告中的关键结论必须能通过“输入材料 → 审查依据 → 检查结果 → 证据路径”形成完整证据链
2. 缺少证据链的审查结论，视为猜测性结论，必须判定为不通过或待补证，不得冒充“通过”
3. 阶段出口门禁若发现详细审查报告缺少审查时间、证据链或关键依据，必须阻断阶段退出

---

## 六、阶段完成产物报告统一标准

> 适用于每个阶段退出时生成的 `stage-output-report.md` 或等价阶段完成产物报告。

### 强制要求

1. 每个阶段完成后，必须生成一份阶段完成产物报告
2. 报告必须说明：
   - 当前阶段标准产物清单
   - 实际已生成文件
   - 每个已生成文件的作用
   - 未生成文件
   - 每个未生成文件的原因
   - 未生成是否允许、是否影响下一阶段
3. 报告必须纳入阶段退出门禁；未生成或内容不达标不得进入下一阶段
4. 后续任何阶段新增标准产物时，必须同步纳入阶段完成产物报告清单
5. 阶段完成产物报告必须引用阶段交接产物位置，至少包含当前阶段 OpenSpec 主交接文档与 `mes-ai-dev/workspace/memory/*` 的产出状态

### 推荐模板

- `.opencode/references/mes-ai-reference/templates/governance/stage-output-report-template.md`

### 允许的等价形式

- 若阶段已有更具体的结果报告模板，可在保持场景字段的同时补齐本节要求
- 不允许用口头说明、对话摘要或仅在状态表中简写替代正式阶段完成产物报告

---

## 七、Agent 交接文件限制

> 多 Agent 并行协作时，Agent 间通过 `*-completion.md` 和 `*-results.md` 交接。
> 这些文件如果过大，会导致主控 Agent 汇总时上下文溢出。

### 大小限制

| 文件类型 | 最大行数 | 最大估算 token | 说明 |
|---------|---------|---------------|------|
| *-completion.md | 150 行 | ~2.5K token | 单个 Agent 完成标记 |
| *-results.md | 200 行 | ~3K token | 单个 Agent 执行结果 |
| stage-summary.md | 200 行 | ~3K token | 阶段上下文摘要 |

### 必须包含的四要素

每个 Agent 交接文件必须包含以下四个章节，禁止长篇过程性复述：

| 章节 | 要求 | 行数建议 |
|------|------|---------|
| **结论** | 核心结论，可直接消费 | ≤30行 |
| **风险** | 发现的风险项，按高/中/低排序 | ≤30行 |
| **下一步** | 待执行的关键动作 | ≤20行 |
| **证据路径** | 完整产出文件路径列表 | ≤20行 |

### 标准模板（新增）

为避免不同 Agent 自由发挥导致格式漂移，交接文件必须优先使用以下模板：

| 文件类型 | 模板 | 用途 |
|---------|------|------|
| `*-completion.md` | `.opencode/references/mes-ai-reference/templates/develop/agent-handoff-template.md` | 单个 Agent 完成某任务单元后的交接 |
| `*-results.md` | `.opencode/references/mes-ai-reference/templates/develop/agent-handoff-template.md` | 单个 Agent 分析/测试/审核结果交接 |
| 步骤级门禁审查记录 | `.opencode/references/mes-ai-reference/templates/governance/step-gate-review-template.md` | 单步骤输出进入下一步骤前的门禁审查记录 |

规则：
1. 新建 completion/results 文件时，优先按模板填充
2. 若命令或 Agent 已定义更具体格式，不得缺少模板中的四要素
3. 缺少任一四要素 → 视为交接失败，主控 Agent 不得消费
4. 需要留痕步骤级门禁审查结果时，优先使用 `step-gate-review-template.md`
5. 以下场景的步骤级门禁**必须落盘**，不得仅停留在对话输出：
   - 任一门禁结论为 `❌不通过`
   - 任一门禁结论为 `⚠️有条件通过`
   - 任一跨阶段出口门禁
   - 初始化收拢、发布执行、知识刷新、状态迁移校验相关门禁
6. 需要落盘的门禁记录统一写入对应需求目录，文件名建议：`step-gate-{阶段或步骤标识}.md`
7. 未按要求落盘的强制留痕门禁结果，视为审查未完成，下游步骤不得消费

### 禁止内容

| 禁止项 | 原因 | 替代方式 |
|--------|------|---------|
| 长篇过程性复述 | 占用主控上下文 | 只写结论，过程详见证据路径 |
| 完整代码片段 | 代码已在源文件中 | 引用文件路径 + 行号范围 |
| 大段日志输出 | 无信息密度 | 提取关键错误信息 |
| 重复的设计内容 | 设计文档已有 | 引用设计文档路径 |

### 超限处理

1. 交接文件超过最大行数 → 主控 Agent 退回要求压缩
2. 压缩方式：删除过程描述、合并表格、低优先级项简化为"详见原文"
3. 仍然超限 → 只保留四要素 + 证据路径

---

## 八、Reference 文件拆分阈值

> 当实际数据填入后，以下 reference 文件可能变得非常大。
> 当文件行数超过阈值时，必须按指定维度拆分。

### 拆分阈值

| 原始文件 | 拆分阈值 | 拆分维度 | 拆分后命名规则 |
|---------|---------|---------|---------------|
| domain-model.md | > 300 行 | 按业务域拆分 | `domain-model-production.md`, `domain-model-quality.md`, `domain-model-inventory.md` 等 |
| terminology-glossary.md | > 500 行 | 按服务或术语组拆分 | `service-mes-production.md`, `group-quality.md` 等（收口索引引用这些分片） |
| data-dictionary.md | > 500 行 | 按 Schema 拆分 | `data-dictionary-schema-mes.md`, `data-dictionary-schema-sys.md` 等 |
| enum-registry.md | > 300 行 | 按服务拆分 | `enum-registry-service-production.md`, `enum-registry-service-quality.md` 等 |
| error-code-registry.md | > 300 行 | 按服务拆分 | `error-code-registry-service-production.md`, `error-code-registry-service-quality.md` 等 |

### 拆分规则

1. **拆分时保留索引文件**：原始文件变为索引，列出拆分后的子文件列表与消费建议
2. **索引文件格式**：

```markdown
# [原始文件名]（索引）

> 本文件已超过 [阈值] 行，按 [维度] 拆分为以下子文件。

| 子文件 | 覆盖范围 | 行数 | 最后更新 |
|--------|---------|------|---------|
| [子文件名] | [范围] | [行数] | [日期] |
```

3. **消费方按需加载**：根据需求涉及的业务域/Schema/服务，只读取对应的子文件
4. **不提前拆分**：文件未超过阈值时不拆分，避免过早引入复杂度
5. **拆分触发**：由 `/mes-refresh-knowledge` 或 `/mes-init-project` 在写入时检测行数并触发

---

## 九、全局高风险文件索引化规则

> 以下文件在大仓/超大仓场景下，必须优先采用“全局索引 + 局部正文/分片”的结构，避免突破 200k 上下文预算。

### 强制索引化文件

| 文件 | 问题 | 强制结构 |
|------|------|----------|
| `dependency-graph/api-registry.md` | 5000+ API 时全量正文不可消费 | 全局索引 + 服务级 API 片段/局部清单 |
| `reference/domain-model.md` | 领域模型可能跨域膨胀 | 全局索引 + 按业务域正文 |
| `reference/terminology-glossary.md` | 术语累计过大时不宜全量加载 | 全局索引 + 按服务/术语组正文 |

### 结构要求

1. **全局索引文件**只保留：
   - 范围摘要
   - 分片列表
   - 消费顺序
   - 高频/高风险分片提示
2. **分片正文文件**保留完整明细，不要求在单次消费中全量读取
3. **消费方优先读取索引文件**，再按需进入相关分片，禁止无边界全量加载
4. **`/mes-init-converge` 的收口目标**是生成可消费索引，而不是生成无限膨胀的单文件正文

### 索引文件最小内容

所有索引化后的全局文件主文件必须至少包含：

1. 文件定位与使用说明
2. 分片列表（名称 / 范围 / 大小提示）
3. 高频分片或优先阅读分片
4. 风险提示（是否仍存在未收口片段或大范围缺口）
5. 证据路径 / 来源说明
