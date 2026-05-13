---
title: 运行时入口规则
doc_type: rule
load_strategy: always
phase_scope: []
trigger:
  - runtime-entry
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/core/agent-core.md
  - .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
  - .opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md
---

# 运行时入口规则（runtime-entry）

> 本文件是骨架日常执行的最小运行入口。
> 目标：用最小充分上下文完成意图判定、阶段路由、按需加载与风险约束。

## 一、运行目标

默认先判断“当前任务需要什么”，再决定“应该加载什么”。

- 不因“可能有用”而预读无关重型文档
- 不把旧总表、模板正文、低频治理全文默认带入上下文
- 不跳过阶段、场景、门禁与消费边界判断

## 二、默认加载顺序

1. 本文件 `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`
2. Core 常驻规则
3. 当前阶段规则
4. 当前阶段门禁索引 / 通用门禁 / 当前阶段分片
5. 当前问题范围命中的消费索引与消费分片
6. 命中的 Scenario 规则
7. 当前执行确实需要的 Skill / Template / Heavy Reference

## 三、默认最小加载包

### 3.1 常驻最小包
- `.opencode/references/mes-ai-reference/rules/core/agent-core.md`
- `.opencode/references/mes-ai-reference/rules/core/safety-redlines.md`

### 3.2 按阶段补充
- analyze / design：补 `intent-gate.md`、`execution-baseline.md`
- develop / test / deliver / emergency：补 `completion-baseline.md`
- init / refresh：补 `execution-baseline.md`

### 3.3 当前阶段补充
- 只加载当前阶段的 `.opencode/references/mes-ai-reference/rules/phases/phase-{stage}.md`
- 只加载 `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`、`common.md` 与当前阶段门禁分片
- 只加载 `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md` 与当前问题命中的消费分片

## 三点五、知识消费顺序强制规则

除非当前阶段规则另有更严格要求，默认必须按以下顺序消费：

1. overview
2. index
3. detail / file-summaries
4. 精准源码

适用说明：

- overview：如 `mes-ai-dev/knowledge/code-map/backend-overview.md`、`mes-ai-dev/knowledge/code-map/frontend-overview.md`
- index：如 `.opencode/references/mes-ai-reference/reference/parameter-switch-patterns.md`、`mes-ai-dev/knowledge/reference/terminology-glossary.md`、服务/模块索引
- detail / file-summaries：当前问题命中的服务、模块或 Schema 细化文档
- 精准源码：仅在前三层无法支撑结论时进入

禁止跳过 overview 和 index 直接产出设计、方案或跨仓落点结论。

### 设计阶段专项硬约束

设计阶段在生成 `design.md` 或任何设计性结论前，必须完成：

- 后端服务定位
- 前端模块定位
- 命中参数开关场景时对 `.opencode/references/mes-ai-reference/reference/parameter-switch-patterns.md` 的消费
- 知识来源显式标注

若未满足，自动拒绝进入设计产出。

## 四、按需加载规则

以下内容默认不得进入上下文，除非明确命中触发条件：

### 4.1 Scenario
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-db-migration.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-multi-repo.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-high-risk-release.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-lock-conflict.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-state-migration.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-cross-stage-change.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-shared-knowledge-converge.md`

### 4.2 重型参考
- `.opencode/references/mes-ai-reference/reference/dod-definition-guide.md`
- `.opencode/references/mes-ai-reference/reference/blocker-handling-guide.md`
- `.opencode/references/mes-ai-reference/reference/team-onboarding-guide.md`
- `.opencode/references/mes-ai-reference/reference/stage-memory-governance.md`
- `.opencode/references/mes-ai-reference/reference/status-tracker-governance.md`

### 4.3 模板正文与骨架维护正文
- `templates/**/*.md` 正文
- `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`
- `.opencode/references/mes-ai-reference/rules/artifact-standards.md`

## 四点五、文档过载与自动调优

当运行中发现骨架文档存在以下任一情况时，可触发自动调优机制：

- 文档体量明显超阈值
- 索引页持续膨胀并混入正文说明
- 高成本正文缺少 summary 或缺少摘要互链
- front matter 缺失，导致加载边界不清
- 文档已出现明显“该读什么 / 不该读什么”误判风险

自动调优默认遵循以下顺序：

1. 先自动检测
2. 再自动判定
3. 再执行低风险标准化增强
4. 高风险结构调整必须等待人工确认

自动调优的默认目标不是自动重写正文，而是优先完成以下动作：

- 补 front matter
- 补 `summary_first`
- 补正文到摘要的互链
- 为索引页补 `index-only`
- 为高成本正文生成 summary 草稿
- 为结构混杂文档生成拆解建议

若自动调优涉及主入口、加载矩阵、大规模正文拆解、跨文件结构迁移或大范围引用调整，不得直接自动落盘，必须升级为正式骨架修改审查。

具体规则见：
- `.opencode/references/mes-ai-reference/rules/governance/document-auto-optimization-rules.md`
- `.opencode/references/mes-ai-reference/reference/document-auto-optimization-flow.md`
- `.opencode/references/mes-ai-reference/reference/document-auto-optimization-matrix.md`

## 五、先摘要后正文

若文档被标记为高成本，或其元信息中 `summary_first: true`：

1. 先读 `*-summary.md`
2. 摘要足够时停止，不进入正文
3. 摘要不足时，只进入正文局部分片
4. 禁止无理由整篇读取高成本文档

元信息标准见：`.opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md`。

## 六、预算约束

- 常规阶段：优先控制在 8K–12K token
- 复杂阶段：优先控制在 12K–16K token
- 超过 16K：必须先说明原因并裁剪
- 超过 20K：禁止继续扩张，必须回退到索引 + 分片模式

## 六点五、相关预算与优化入口

涉及骨架上下文预算控制时，优先参考以下文档：

- 预算基线：`.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`
- 优化方案摘要：`.opencode/references/mes-ai-reference/rules/governance/context-budget-optimization-plan-summary.md`

说明：
- 预算阈值、分层预算与超预算回退口径，以预算基线为准。
- 方案背景、目标与分期实施，以上下文预算优化方案正文与摘要为准。
- 运行时默认不加载方案正文；需要快速判断时优先读取摘要，涉及预算边界时优先读取预算基线。

## 七、完成前检查

- 是否只加载了当前阶段必需规则
- 是否误带入无关重型文档
- 是否存在可由 summary 替代正文的情况
- 是否需要补充当前命中的场景规则
- 是否在关键结论前完成必要验证与留痕
- 是否遵循了 overview → index → detail/file-summaries → 精准源码 的消费顺序
- 设计阶段是否完成仓/服务/模块/Schema 定位与知识来源标注
