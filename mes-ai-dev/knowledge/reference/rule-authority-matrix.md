---
title: 规则主定义矩阵
load_strategy: index-only
cost_level: low
summary_first: false
default_allowed: true
related_files:
  - mes-ai-dev/knowledge/rules/core/runtime-entry.md
  - mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md
  - mes-ai-dev/knowledge/rules/context-budget-baseline.md
  - mes-ai-dev/knowledge/rules/governance/document-load-metadata-standard.md
---

# 规则主定义矩阵

## 1. 文档目的

本文档用于明确 MES-AI-DEV 骨架中“哪类规则由哪个文件主定义”，以减少多点展开、语义重复、维护冲突和上下文噪音。

本文档不是规则正文，不负责详细解释规则内容，只负责回答以下问题：

1. 某类规则应该以哪个文件为准
2. 哪些文件只能引用，不应重复展开
3. 哪些文件只能导航，不应承载正文
4. 发生冲突时应该以哪个定义为权威

---

## 2. 使用原则

### 2.1 主定义唯一原则
每类规则原则上只允许一个主定义位置。

### 2.2 引用不重述原则
非主定义文件可以摘要、跳转、引用，但不应长篇重复正文。

### 2.3 索引不正文化原则
Index、summary、stub 文件不应重新演化为规则正文。

### 2.4 冲突服从主定义原则
若多个文件对同一主题表述不一致，应以主定义文件为准，并修正其他文件。

---

## 3. 主定义矩阵

| 主题 | 主定义文件 | 允许引用文件 | 禁止行为 |
|---|---|---|---|
| 身份与总红线 | `AGENTS.md` / core 红线文档 | phase、summary、guide | 在多个索引文件重复展开完整红线正文 |
| 运行时加载顺序 | `knowledge/rules/core/runtime-entry.md` | `AGENTS.md`、`skeleton-loading-matrix.md` | 在多个 phase / guide 文档各自定义不同加载顺序 |
| 阶段白名单口径 | `knowledge/reference/skeleton-loading-matrix.md` | `runtime-entry.md`、phase 最小包 | 在其他地方定义与矩阵冲突的默认允许/禁止规则 |
| 阶段规则 | `knowledge/rules/phases/phase-*.md` | phase summary、gate 分片 | 在 index 或 guide 中重写完整阶段正文 |
| 阶段门禁模型 | `knowledge/reference/phase-gates/common.md` | 各阶段 gate 分片 | 在非 gate 文档中重新定义 must-pass / should-check / advisory 模型 |
| 各阶段门禁细则 | `knowledge/reference/phase-gates/*.md` | phase 最小包、summary | 在 index 或 phase 正文重复展开完整门禁细则 |
| 知识消费边界 | `knowledge/reference/knowledge-consumption/*.md` | phase 最小包、runtime-entry | 在其他文档里平铺式复制消费边界 |
| 契约级知识消费边界 | `knowledge/reference/knowledge-consumption/contracts.md` | phase-init / phase-analyze / phase-design、契约模板、SDK 相关场景规则 | 在 phase / gate / template 中另行定义不同来源优先级或契约消费顺序 |
| 契约级知识编制标准 | `knowledge/rules/governance/contract-knowledge-standard.md` | 契约模板、review 文档、knowledge-consumption/contracts.md | 在模板或 skill 中各自定义不同的来源类型、置信度与版本一致性口径 |
| metadata 规范 | `knowledge/rules/governance/document-load-metadata-standard.md` | governance 文档、方案摘要 | 在各文档自行定义不同 metadata 口径 |
| 预算基线 | `knowledge/rules/context-budget-baseline.md` | `runtime-entry.md`、`budget-audit-rules.md` | 在多个文件定义不同预算目标值 |
| 预算审计流程 | `knowledge/rules/budget-audit-rules.md` | review / runtime 相关文档 | 用其他文档替代预算审计主流程 |
| 仓规模分类 | `knowledge/rules/repository-scale-rules.md` | `context-budget-baseline.md`、runtime 相关文档 | 在 phase 或 guide 中另行定义仓规模口径 |
| 状态主模型原则 | `knowledge/rules/state/state-core.md` | state summary、state index | 在其他 state 文件重复定义状态主模型原则 |
| 初始化状态片段规则 | `knowledge/rules/state/state-init-fragments.md` | init 阶段文档 | 在其他阶段文档中重写完整片段规则 |
| 状态收敛规则 | `knowledge/rules/state/state-convergence.md` | converge / init 相关文档 | 在其他文档中重复定义收敛机制 |
| 状态可信度规则 | `knowledge/rules/state/state-trust.md` | state index、summary | 在其他 state 文档中各自定义可信度口径 |
| 详细审查结构 | `knowledge/rules/governance/review-report-standard.md` | review summary、阶段说明 | 在其他文档中形成不同版审查结构 |
| 阶段产物布局 | `knowledge/rules/governance/stage-artifact-layout.md` | deliver / handoff / summary | 在多个阶段文档中各自规定不同产物目录 |
| Completion Sweep | `knowledge/rules/governance/completion-sweep-standard.md` | deliver / review 相关文档 | 在其他地方定义另一套收尾口径 |
| 共享知识写入策略 | `knowledge/rules/governance/shared-knowledge-write-policy.md` | converge / multi-agent 相关文档 | 在其他文档中分散定义共享写入规则 |
| phase gate 使用标准 | `knowledge/rules/governance/phase-gate-usage-standard.md` | phase / gate 相关摘要 | 在其他文档中重复定义门禁使用方法 |
| 外部契约源获取顺序 | `knowledge/rules/phases/phase-init.md` + `knowledge/reference/knowledge-consumption/contracts.md` | init gate、contract standard、SDK 相关技能与场景规则 | 在 skill、模板或 analyze/design 文档中各自定义冲突的 SDK/source-jar/decompiled-jar 优先级 |

---

## 4. 文件角色分类

为避免文档越界，骨架文档按角色分为四类。

## 4.1 主定义文件
职责：
- 定义某主题的权威正文
- 给出完整规则口径
- 作为冲突裁决依据

示例：
- `runtime-entry.md`
- `phase-*.md`
- `document-load-metadata-standard.md`
- `context-budget-baseline.md`

## 4.2 引用文件
职责：
- 简要引用
- 提供阶段性上下文
- 给出局部适用口径

示例：
- phase summary
- runtime 补充说明
- 各类摘要文档

要求：
- 不得重写主定义正文
- 不得形成冲突版本

## 4.3 索引文件
职责：
- 导航
- 分类
- 适用性判断

示例：
- `phase-gates/index.md`
- `knowledge-consumption/index.md`
- `phase-skill-index.md`

要求：
- 不得膨胀为半正文
- 不得大段复述规则

## 4.4 Stub / 兼容入口
职责：
- 历史兼容
- 提示迁移路径
- 指向正确入口

示例：
- `phase-gates.md`
- `knowledge-consumption-matrix.md`

要求：
- 不得承载事实正文
- 应明确禁止整份读取

---

## 5. 冲突处理规则

当发现不同文件对同一主题存在不一致表述时，应按以下顺序处理：

1. 确认该主题的主定义文件
2. 以主定义文件为准
3. 修正引用文件
4. 修正 index / summary / stub 中的过时描述
5. 必要时补充主定义矩阵或 metadata 说明

不得采取“多个版本同时保留”的方式回避冲突。

---

## 6. 新增文档接入要求

新增文档时必须先判断其角色：

### 若为主定义文件
必须：
- 说明其主题范围
- 明确与现有主定义的边界
- 避免与已有主定义冲突

### 若为引用文件
必须：
- 标明主定义来源
- 仅做局部适配和摘要
- 不得扩写为另一版正文

### 若为索引文件
必须：
- 只做导航
- 不做长篇解释
- 不做正文替代

### 若为兼容入口
必须：
- 声明已降级
- 提示正确入口
- 禁止整份读取

---

## 7. 常见违规模式

以下行为属于应避免的规则漂移：

1. 在多个文件定义不同版本的预算目标
2. 在多个 phase 或 guide 文件中重复定义运行时加载顺序
3. 让 index 文件承载大量正文
4. 让 stub 文件继续承担事实源角色
5. 在 summary 中复制大段正文
6. 在 phase 文档中重写 gate 规则
7. 在 runtime 文档中重新定义 metadata 标准

---

## 8. 维护建议

1. 修改规则前，先查主定义矩阵
2. 若主题已存在主定义，优先改主定义文件
3. 若只是运行时引用，优先改引用文件，不动主定义
4. 若发现 index 越来越长，应评估是否已正文化
5. 每次大范围规则调整后，应复核本矩阵是否仍准确

---

## 9. 结论

规则主定义矩阵的核心价值不在于“增加一份文档”，而在于防止以下问题反复出现：

- 同一规则到处讲一遍
- 入口越来越重
- 索引越来越像正文
- 维护者不知道该改哪份
- 多处规则轻微漂移，最终互相冲突

骨架要长期保持轻量、稳定、可维护，必须做到：

- 主定义唯一
- 引用不重述
- 索引不正文化
- stub 不承载正文
