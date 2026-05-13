---
title: 知识消费矩阵索引
doc_type: index
load_strategy: index-only
phase_scope: []
trigger:
  - knowledge-consumption
cost_level: medium
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/rules/core/runtime-entry.md
  - .opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md
---

# 知识消费矩阵索引

> 本索引可默认读取；具体主题分片应按当前阶段与当前问题范围进入，禁止把全部主题分片一起常驻。
> 本目录用于替代原 `.opencode/references/mes-ai-reference/reference/knowledge-consumption-matrix.md` 的单文件重型结构。
> 默认先读本索引，再按当前阶段与当前问题范围读取主题分片。

---

## 一、核心原则

1. `state/state.yaml` 是唯一已合并机器事实源。
2. 默认按 **总览 → 索引 → 详情 → 文件摘要 → 精准源码** 的顺序消费。
3. 非当前问题范围的知识分片默认不加载。
4. 大文件必须优先按索引或分片消费，禁止无边界整份读取。
5. 若 convergence 状态不足以支撑全局结论，只允许局部或降级口径输出。
6. 设计阶段不得跳过总览与索引层直接生成设计文档。

---

## 二、主题分片导航

### 2.1 状态与可信度
- `state.md`：状态文件、兼容视图、片段文件、写入/读取边界
- `convergence.md`：按 convergence 状态决定全局/局部/降级消费边界

### 2.2 代码与结构知识
- `code-map.md`：overview、services/modules、business-flows、hot-*、runtime 等资产消费
- `dependency-graph.md`：service-dependencies、api-registry、database-registry、frontend-backend-map
- `database-index.md`：Schema 索引、表明细、关系明细消费
- `init-output-consumer-matrix.md`：初始化最小知识面与下游阶段消费映射

### 2.3 规则与参考知识
- `rules.md`：core / phase / scenario / governance / rules 文件如何消费
- `reference.md`：glossary、domain-model、data-dictionary、enum-registry、exception-handbook 等参考资产
- `parameter-switch-patterns.md`：参数开关三种模式、复用优先级、取值来源与违规判定
- `contracts.md`：统一响应、错误码、SDK 模型、认证/MQ 等契约级知识消费
- `document-auto-optimization-matrix.md`：文档超阈值后如何判定应补 summary、补 metadata、补互链还是仅给草稿建议
- `document-auto-optimization-flow.md`：自动调优从触发、检测、判定、执行到留痕的完整流程
- `document-auto-optimization-state-model.md`：自动调优字段、状态、动作与运行记录模型

### 2.4 阶段记忆与边界
- `stage-memory.md`：阶段记忆输入/输出与必读关系的消费分片名称；该名称是知识分片文件名，不是阶段交接产物文件名。阶段交接产物应符合 OpenSpec 主文档命名，如 `spec.md`、`design.md`、`tasks.md`、`test-report.md`
- `large-file-rules.md`：大文件强制消费规则
- `legacy-files.md`：历史遗留文件引用边界

---

## 三、按阶段默认消费建议

| 阶段 | 默认优先分片 |
|---|---|
| init | `state.md`、`rules.md`、`init-output-consumer-matrix.md` |
| analyze | `state.md`、`reference.md`、`contracts.md`、`convergence.md`、`init-output-consumer-matrix.md` |
| design | `rules.md`、`reference.md`、`parameter-switch-patterns.md`、`contracts.md`、`dependency-graph.md`、`init-output-consumer-matrix.md` |
| develop | `rules.md`、`stage-memory.md`、`init-output-consumer-matrix.md` |
| test | `stage-memory.md`、`code-map.md`、`convergence.md`、`init-output-consumer-matrix.md` |
| deliver | `state.md`、`convergence.md`、`stage-memory.md`、`init-output-consumer-matrix.md` |
| refresh | `state.md`、`code-map.md`、`dependency-graph.md` |
| emergency | `state.md`、`stage-memory.md` |
| auto-optimization | `rules.md`、`document-auto-optimization-matrix.md`、`document-auto-optimization-flow.md` |

补充说明：上表中的 `stage-memory.md` 指 `.opencode/references/mes-ai-reference/reference/knowledge-consumption/stage-memory.md` 这一消费分片，不得与阶段目录下的 OpenSpec 主交接文档混淆。

### 设计阶段强制消费顺序

详细设计阶段至少应遵循以下顺序：

1. overview：`knowledge/code-map/backend-overview.md`、`knowledge/code-map/frontend-overview.md`
2. index：`.opencode/references/mes-ai-reference/reference/parameter-switch-patterns.md`、`mes-ai-dev/knowledge/reference/terminology-glossary.md` 与当前主题索引
3. detail / file-summaries：命中的服务 `index.md`、模块 `index.md`、Schema `index.md`
4. 精准源码：仅在第 1～3 步不能支撑结论时进入

设计文档必须显式标注消费过的知识文件；未标注时，不得视为完整设计输入。

---

## 四、默认不加载原则

- 非当前阶段默认不需要的主题分片
- 历史遗留文件说明正文
- 与当前问题无关的 database-index 细节
- 与当前任务无关的全局大文件正文

---

## 五、兼容说明

原 `.opencode/references/mes-ai-reference/reference/knowledge-consumption-matrix.md` 仍保留为兼容导航入口。
如需最小上下文加载，应优先使用本目录分片，而不是整份读取旧总表。

---

## 六、相关约束说明

- 运行时入口见：`.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`
- 阶段加载矩阵见：`.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
- 预算基线见：`.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`
- 规则主定义边界见：`.opencode/references/mes-ai-reference/reference/rule-authority-matrix.md`

说明：
- 本索引负责知识消费导航与按主题分片入口，不负责定义预算阈值。
- 具体读取深度、是否进入 detail、是否需要回退到 summary / index，应结合运行时入口、预算基线与规则主定义边界判断。
