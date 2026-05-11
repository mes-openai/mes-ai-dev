---
title: 超阈值自动重构判定矩阵
doc_type: reference
load_strategy: explicit-only
phase_scope: []
trigger:
  - auto-optimization
  - threshold-evaluation
cost_level: medium
summary_first: false
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/governance/document-auto-optimization-rules.md
  - knowledge/reference/document-auto-optimization-flow.md
---

# 超阈值自动重构判定矩阵

> 本矩阵用于在骨架文档命中体量、结构或引用风险阈值时，快速判定最合适的治理动作。

---

## 一、判定总原则

1. 先类型，再看大小。
2. 先判断频率，再判断拆解价值。
3. 自动落盘只限低风险动作。

---

## 二、一级判定：按文档类型分类

| 文档类型 | 典型例子 | 默认策略 |
|---|---|---|
| runtime 入口 | `runtime-entry.md` | 极度克制，优先压缩，不拆正文 |
| 总入口/总则 | `AGENTS.md` | 只做摘要化/指向化，不自动拆主结构 |
| loading matrix | `skeleton-loading-matrix.md` | 保持策略总表角色，必要时拆专题索引 |
| index 文件 | `template-index.md` | 保持索引角色，正文按需，不变成手册 |
| summary 文件 | `*-summary.md` | 必须保持短，不得膨胀 |
| phase 规则 | `phase-develop.md` | 保持阶段执行边界，谨慎加内容 |
| scenario 规则 | `scenario-*.md` | 保持轻量，通常不需要摘要化 |
| governance 正文 | `artifact-standards.md` | 高频误读时走摘要优先 |
| reference 手册 | `exception-handbook.md` | 高成本时优先摘要化、可局部分片 |
| 轻量标准规则 | `review-report-standard.md` | 保持轻量，不强行高成本化 |

---

## 三、二级判定：按体量区间

### 3.1 行数区间

| 行数 | 默认判断 |
|---:|---|
| `< 80` | 通常保持原样 |
| `80–150` | 评估是否需 front matter / 边界说明 |
| `150–220` | 评估是否需 summary |
| `220–300` | 高优先评估摘要优先 |
| `300–400` | 生成 summary 草稿，评估分片 |
| `> 400` | 默认进入结构重构评估 |

### 3.2 token 区间

| token估计 | 默认判断 |
|---:|---|
| `< 1K` | 低风险 |
| `1K–2K` | 中风险 |
| `2K–4K` | 高风险，建议摘要化 |
| `4K–8K` | 高风险，建议摘要 + 分片评估 |
| `> 8K` | 极高风险，默认触发结构重构建议 |

---

## 四、动作矩阵

### 4.1 索引文件超阈值

若索引文件体量过大，应优先考虑：

1. 保持索引角色不变
2. 拆出专题索引
3. 补充“正文按需进入”说明
4. 禁止把细节正文继续塞入索引页

### 4.2 正文文件超阈值且章节独立

若正文结构清晰、章节天然独立，应优先考虑：

1. 生成 summary
2. 补 `summary_first: true`
3. 补正文到 summary 互链
4. 必要时生成分片建议
5. 正文保留总览与跳转，细节下沉分片

### 4.3 正文文件超阈值但逻辑连续

若正文虽大，但逻辑高度一体化，应优先考虑：

1. 补 front matter
2. 补头部边界说明
3. 生成 summary
4. 不自动拆正文主结构

### 4.4 高频引用但未超大

若某文件体量不算特别大，但被高频入口反复引用，应优先考虑：

1. 明确 `load_strategy`
2. 明确是否默认允许进入上下文
3. 补“何时应读 / 何时不应读”说明
4. 必要时补 summary

---

## 五、是否自动落盘

### 5.1 可自动落盘

| 动作 | 是否可自动落盘 |
|---|---|
| 补 front matter | 是 |
| 补头部互链说明 | 是 |
| 补 `summary_first` | 是 |
| 索引页补 `index-only` | 是 |
| 新增 summary 草稿 | 是 |
| 日志留痕 | 是 |

### 5.2 仅生成草稿

| 动作 | 是否自动落盘 |
|---|---|
| 正文分片 | 否 |
| 专题索引拆分 | 否 |
| 章节重排 | 否 |
| 大规模跨文件引用更新 | 否 |
| 删除原正文大段内容 | 否 |

---

## 六、典型判定案例

### 6.1 `exception-handbook.md`

- 类型：reference 手册
- 行数：226
- 低频：是
- 易误读：是
- 结构可分：是

判定：高成本正文，应补 `summary_first`、应新增 summary、正文应补互链。

### 6.2 `phase-gates/index.md`

- 类型：index
- 行数：83
- 角色清晰：是

判定：不是高成本正文，只需 `index-only`，正文分片按需进入，不需要 summary。

### 6.3 `review-report-standard.md`

- 类型：轻量标准规则
- 行数：37
- 高频引用：是
- 逻辑连续：是

判定：保持原样，可补 front matter，不需要 summary，不应高成本化。
