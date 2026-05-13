---
title: 骨架上下文预算优化方案
load_strategy: explicit-only
cost_level: medium
summary_first: false
default_allowed: false
related_files:
  - .opencode/references/mes-ai-reference/rules/core/runtime-entry.md
  - .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
  - .opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md
  - .opencode/references/mes-ai-reference/rules/budget-audit-rules.md
  - .opencode/references/mes-ai-reference/rules/repository-scale-rules.md
---

# 骨架上下文预算优化方案

## 1. 文档目的

本文档用于定义 MES-AI-DEV 骨架的上下文预算优化目标、范围、设计原则、实施方案、验收标准与推进计划，作为后续骨架调整、评审与实施的统一依据。

本文档聚焦**骨架自身**的上下文开销控制，不涉及业务代码实现优化。

---

## 2. 背景

MES-AI-DEV 骨架已经具备以下能力：

- Core / Phase / Scenario / Governance / Reference 分层
- 阶段门禁与知识消费入口分片
- 状态规则拆分
- 仓规模与预算审计规则
- 索引优先、部分摘要优先

当前总体方向正确，但随着骨架规则、索引、治理文档与状态信息持续增长，运行时仍存在以下问题：

1. 根入口偏重，常驻成本偏高
2. 兼容旧入口仍存在误读取风险
3. 按需加载规则尚未完全硬化
4. 阶段文档最小包不够薄
5. heavy 文档未完全统一为两跳读取
6. 同类规则存在重复语义与多点展开
7. 长期缺少防回胖治理基线

如果不进行结构优化，骨架会逐渐从“可按需加载”退化为“理论可按需、实践偏重”的状态，影响运行时稳定性、阶段切换效率与复杂任务的预算控制能力。

---

## 3. 问题定义

### 3.1 当前问题

#### 3.1.1 常驻入口偏重
根入口承载过多运行时非必要信息，导致基础上下文负担偏高。

#### 3.1.2 兼容入口未完全导航化
部分历史总表虽已降级，但正文仍可能被整份读取进入上下文。

#### 3.1.3 运行时加载仍偏“建议式”
许多加载判断依赖主控临场理解，而不是依赖明确的 metadata、阶段白名单与预算回退机制。

#### 3.1.4 阶段文件未充分最小化
阶段文件仍混入细则、例外、示例与说明性内容，造成默认阶段成本偏高。

#### 3.1.5 状态与治理文档存在未来膨胀风险
`state.yaml`、治理规则、索引文件和各类 guide 存在持续增重的趋势。

---

## 4. 优化目标

## 4.1 总体目标

将骨架从“具备按需加载能力”优化为“**强约束按需加载体系**”，在不削弱治理能力的前提下：

- 降低常驻成本
- 降低阶段切换负担
- 降低误加载 heavy 正文概率
- 提升路由稳定性
- 提升长期可维护性

## 4.2 定量目标

| 指标 | 当前估算 | 目标值 |
|---|---:|---:|
| 常驻基础成本 | 6K–8K | 4K–6K |
| 普通阶段骨架自加载 | 8K–12K | 6K–10K |
| 复杂阶段骨架自加载 | 12K–16K | 9K–13K |
| heavy 文档误加载风险 | 中 | 低 |
| metadata 有效覆盖率 | 中 | 高 |

## 4.3 定性目标

- 常驻层最小化
- 阶段层白名单化
- 场景层强触发化
- heavy 文档两跳化
- 兼容入口导航化
- 规则主定义唯一化
- 预算审计标准化
- 新增文档防回胖化

---

## 5. 范围

## 5.1 范围内

### 5.1.1 Core / 运行时入口
- `AGENTS.md`
- `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`

### 5.1.2 加载矩阵与索引
- `.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`

补充说明：`phase-gates.md` 与 `knowledge-consumption-matrix.md` 为兼容入口，不再作为主清单中的默认优先加载对象；若需保留历史兼容说明，应放入迁移或 stub 语境，不得与当前索引化主入口并列。

### 5.1.3 阶段规则
- `.opencode/references/mes-ai-reference/rules/phases/phase-init.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-analyze.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-design.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-develop.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-test.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-deliver.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-refresh.md`
- `.opencode/references/mes-ai-reference/rules/phases/phase-emergency.md`

### 5.1.4 状态规则与状态文件
- `.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`
- `.opencode/references/mes-ai-reference/rules/state/state-core.md`
- `.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md`
- `.opencode/references/mes-ai-reference/rules/state/state-convergence.md`
- `.opencode/references/mes-ai-reference/rules/state/state-trust.md`
- `mes-ai-dev/knowledge/state/state.yaml`

### 5.1.5 治理与预算规则
- `.opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md`
- `.opencode/references/mes-ai-reference/rules/budget-audit-rules.md`
- `.opencode/references/mes-ai-reference/rules/repository-scale-rules.md`
- 重点 governance 大文件

### 5.1.6 新增支撑文档
- `.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`
- `.opencode/references/mes-ai-reference/reference/rule-authority-matrix.md`
- 各类 summary 文件

---

## 5.2 范围外

本方案不处理以下事项：

1. 业务代码性能或结构优化
2. 前后端业务仓库重构
3. Skill 业务能力本身优化
4. 与上下文预算无关的规则内容修订
5. 非骨架类模板的大范围内容改写

---

## 6. 现状估算

## 6.1 常驻基础成本估算

| 组成 | 估算 |
|---|---:|
| 根入口与常驻行为约束 | 约 3K |
| Core 最小包 | 约 2K–3K |
| 轻量状态/索引 | 约 1K–2K |

**合计：约 6K–8K**

## 6.2 单阶段附加成本估算

| 组成 | 估算 |
|---|---:|
| 当前阶段 Phase 规则 | 约 2K–4K |
| gate 索引 + 当前阶段分片 | 约 2K–3K |
| knowledge-consumption 索引 + 当前分片 | 约 1K–2K |

**附加合计：约 5K–9K**

## 6.3 当前总量判断

| 场景 | 估算 |
|---|---:|
| 普通阶段 | 约 8K–12K |
| 复杂阶段 | 约 12K–16K |
| 误读 heavy 正文时 | 16K+，接近或突破 20K |

---

## 7. 设计原则

### 7.1 常驻最小化原则
常驻层只允许保留运行时真正必需的事实、红线与最小加载逻辑。

### 7.2 阶段白名单原则
进入某一阶段后，只默认加载该阶段最小必要资产，非白名单资产默认不加载。

### 7.3 场景强触发原则
Scenario 文档仅在明确命中触发条件时才允许读取正文。

### 7.4 heavy 文档两跳原则
任何 high-cost 文档必须遵循：

1. 先读 index / summary
2. 命中后读 detail

### 7.5 兼容入口导航化原则
旧总表和兼容入口只保留导航功能，不得继续承担主事实源角色。

### 7.6 主定义唯一原则
每类规则应有唯一主定义位置，其他文档仅做引用、跳转或摘要。

### 7.7 防回胖原则
所有新增或重构文档必须符合 metadata、成本分级与摘要优先规则，避免后续再次膨胀。

---

## 8. 目标架构

## 8.1 四层加载模型

### 层 0：Bootstrap 常驻层
职责：提供最小运行能力。

允许常驻：
- 根入口最小包
- 核心红线
- 最小运行时加载逻辑
- 轻量 state 主文件

### 层 1：Phase 最小包
职责：为当前阶段提供最小规则。

允许默认加载：
- 当前阶段最小 phase 文档
- 当前阶段 gate 分片
- 当前阶段相关 consumption 分片
- 必要 completion / execution baseline

### 层 2：Scenario 触发包
职责：处理特殊场景。

仅在命中时允许读取：
- multi-repo
- db-migration
- state-migration
- cross-stage-change
- high-risk-release
- lock-conflict
- shared-knowledge-converge

### 层 3：Heavy Detail 包
职责：承载高成本正文。

限制：
- 必须先读 summary/index
- 未命中不得直接全文进入上下文

## 8.2 两跳读取机制

### 第一步：索引判定
依据以下信息进行初判：

- `load_strategy`
- `cost_level`
- `default_allowed`
- `summary_first`
- `phase_scope`
- `trigger`

### 第二步：正文进入
仅在满足以下条件之一时进入 detail：

1. 当前阶段强依赖该正文
2. 场景 trigger 已命中
3. summary/index 无法支持当前判断
4. 用户明确要求深入正文级分析

---

## 9. 详细优化方案

## 9.1 方案 A：入口减重

### 9.1.1 精简 `AGENTS.md`
将其收敛为常驻最小入口，仅保留：

- 项目概况摘要
- 核心铁律摘要
- intent gate 摘要
- 最小安全红线
- 规则入口索引
- 极简执行模型摘要

移出：
- 长篇阶段细则
- 长篇治理正文
- 过多示例型说明
- 可由下沉文档表达的重复内容

### 9.1.2 Stub 化兼容入口
对以下文件执行导航 stub 改造：

- `phase-gates.md`
- `knowledge-consumption-matrix.md`

要求：
- 文件保留
- 文件名不变
- 只保留降级说明、禁止整读说明、正确入口链接

### 9.1.3 heavy 文档摘要优先
为 high-cost 文档补齐 summary 文件，并在正文中声明：

- `summary_first: true`
- `default_allowed: false`

## 9.2 方案 B：加载规则硬化

### 9.2.1 强化 `runtime-entry.md`
明确其为唯一运行时加载主入口，统一定义：

- 最小常驻包
- 阶段加载顺序
- scenario 触发条件
- heavy 文档两跳机制
- 超预算回退顺序

### 9.2.2 强化 `skeleton-loading-matrix.md`
将其升级为阶段白名单总表，明确每阶段：

- 默认允许
- 默认禁止
- 条件允许
- heavy 文档进入策略

### 9.2.3 强化 metadata 标准
在 `document-load-metadata-standard.md` 中明确必填字段与行为规则。

#### 必填字段
- `load_strategy`
- `cost_level`
- `default_allowed`
- `summary_first`
- `parent_index`

#### 推荐字段
- `phase_scope`
- `trigger`
- `related_files`

#### 行为规则
- `default_allowed: false` → 不得默认加载正文
- `summary_first: true` → 必须先读 summary
- `cost_level: high` → 不得直接全文读取
- `load_strategy: scenario` → 仅命中 trigger 后允许进入正文

### 9.2.4 固化预算回退机制
超预算时必须按顺序回退：

1. 回退 detail
2. 回退跨阶段资产
3. 只保留 index / summary
4. 必要时分批处理

## 9.3 方案 C：阶段与状态分层

### 9.3.1 Phase 文档双层化
每个阶段文档拆分为：

- 最小包
- detail

#### 最小包固定结构
- 阶段目标
- 进入条件
- 默认应加载
- 默认不得加载
- 产物最低要求
- 退出条件
- 风险提醒
- 扩展入口

#### detail 承载内容
- 详细步骤
- 特殊场景
- 例外与扩展说明
- 示例

### 9.3.2 索引去正文化
对以下索引进行去正文化：

- `phase-gates/index.md`
- `phase-gates/common.md`
- `knowledge-consumption/index.md`

要求：
- 只保留导航、总览、适用阶段和进入条件
- 不再重新展开大量正文规则

### 9.3.3 状态规则按场景收敛
对 state 规则补 metadata，明确：

- 哪些阶段默认不读
- 哪些场景触发读取
- 哪些只能读索引/summary

### 9.3.4 `state.yaml` 轻量化
主文件只保留：

- 当前阶段
- 仓规模标签
- 新鲜度摘要
- 风险摘要
- 关键索引
- 收敛状态摘要

迁出：
- 历史明细
- 长台账
- 长解释
- 低频细节

## 9.4 方案 D：治理收口与防回胖

### 9.4.1 治理文档 summary-first 化
对重点治理文档统一补齐：

- summary 文件
- 成本分级
- 默认加载策略
- 触发条件
- 父索引关系

### 9.4.2 建立预算基线文档
新增 `context-budget-baseline.md`，统一定义：

- 常驻预算
- 单阶段预算
- scenario 预算
- governance summary 预算
- heavy detail 预算

### 9.4.3 建立规则权威矩阵
新增 `rule-authority-matrix.md`，明确：

- 谁是主定义
- 谁只能引用
- 谁只能导航

### 9.4.4 导航文件收尾治理
对 `phase-skill-index.md`、`template-index.md`、`exception-handbook.md` 等文件执行纯导航化收敛。

---

## 10. 关键文件改造列表

## 10.1 第一优先级
- `AGENTS.md`
- `runtime-entry.md`
- `skeleton-loading-matrix.md`
- `document-load-metadata-standard.md`
- `phase-gates.md`
- `knowledge-consumption-matrix.md`

## 10.2 第二优先级
- `budget-audit-rules.md`
- `repository-scale-rules.md`
- heavy 治理文档 summary 文件集

## 10.3 第三优先级
- 全部 `phase-*.md`
- 全部 `state-*.md`
- `state.yaml`
- 各索引与参考导航文件

---

## 11. 分期实施计划

## 11.1 第一期：入口减重 + 加载规则硬化

### 目标
建立第一版“轻入口 + 硬规则”闭环。

### 主要任务
- 精简根入口
- stub 化旧总表
- 补 heavy 文档 summary
- 强化 runtime-entry
- 强化 loading-matrix
- 强化 metadata 标准
- 固化预算回退

### 退出标准
- 常驻成本下降
- 兼容入口不再可被误读
- heavy 文档默认先读 summary
- metadata 可直接驱动加载裁决

## 11.2 第二期：阶段与状态结构改造

### 目标
把按需加载落实到结构层。

### 主要任务
- phase 双层化
- index 去正文化
- state 规则按场景收敛
- state 主文件轻量化

### 退出标准
- 默认阶段可仅依赖最小包运行
- index 不再承担正文角色
- state 主文件保持轻量

## 11.3 第三期：治理收口与防回胖

### 目标
建立长期治理能力，防止后续文档再次膨胀。

### 主要任务
- 治理文档 summary-first 化
- 建立预算基线
- 建立主定义矩阵
- 导航文档收尾治理

### 退出标准
- 预算基线可用于审计
- 规则来源清晰
- 新增文档受统一约束

---

## 12. 风险与应对

| 风险 | 表现 | 应对 |
|---|---|---|
| 入口裁剪过度 | 根入口信息不够用 | 先做内容映射，再裁剪 |
| 历史链接受影响 | 旧路径仍被引用 | 保留原文件路径，仅改为 stub |
| summary 质量不足 | 仍频繁回退正文 | 为 summary 设固定模板 |
| metadata 补齐不一致 | 加载行为不统一 | 先统一规范，再分批补齐 |
| phase 拆分引起跳转断裂 | 入口链接失效 | 逐阶段改造并联动校验 |
| state 轻量化影响消费方 | 下游找不到旧字段 | 增加 state-index/detail 过渡层 |
| 后续再次膨胀 | 新增文档重新变重 | 建立预算基线与主定义矩阵 |

---

## 13. 验收标准

## 13.1 结构验收
- `AGENTS.md` 已瘦身为常驻最小入口
- 旧总表已 stub 化
- phase 文档已形成最小包 + detail
- index 文件只导航不正文化
- `state.yaml` 已轻量化

## 13.2 加载行为验收
- 当前阶段存在明确白名单
- 未命中 trigger 不读 scenario 正文
- heavy 文档默认先读 summary
- metadata 可直接驱动是否读取正文

## 13.3 预算验收
- 常驻基础 ≤ 6K
- 普通阶段骨架自加载 ≤ 10K
- 复杂阶段骨架自加载 ≤ 13K
- 超预算回退顺序明确且可执行

## 13.4 治理验收
- 已建立预算基线文档
- 已建立规则主定义矩阵
- 新增文档具备 metadata 与成本分级
- 导航类文件不再回胖

---

## 14. 成功判定口径

本方案只有在以下三项同时满足时，才视为优化成功：

1. 骨架结构明显变轻
2. 加载决策明显变硬
3. 预算上限能够被稳定守住

若仅实现文档减短，但仍存在误加载 heavy 正文、超预算无回退、规则主定义混乱等问题，则不视为优化成功。

---

## 15. 建议结论

建议立项并按三期推进：

1. 第一期：入口减重 + 加载规则硬化
2. 第二期：阶段与状态结构改造
3. 第三期：治理收口与防回胖

其中，建议优先启动第一期，以低风险方式先验证优化方向，并尽快获得常驻减负与误加载下降的直接收益。

---

## 16. 附录：建议新增文件

- `.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`
- `.opencode/references/mes-ai-reference/reference/rule-authority-matrix.md`
- `.opencode/references/mes-ai-reference/rules/budget-audit-rules-summary.md`
- `.opencode/references/mes-ai-reference/rules/repository-scale-rules-summary.md`
- 其他治理与参考大文件的 `*-summary.md`

---

## 17. 附录：建议优先实施顺序

1. 精简 `AGENTS.md`
2. 强化 `runtime-entry.md`
3. 强化 `skeleton-loading-matrix.md`
4. 强化 `document-load-metadata-standard.md`
5. stub 化 `phase-gates.md`
6. stub 化 `knowledge-consumption-matrix.md`
7. 为预算规则补 summary
8. 为仓规模规则补 summary
9. 固化超预算回退机制
10. 批量补齐重点文档 metadata
