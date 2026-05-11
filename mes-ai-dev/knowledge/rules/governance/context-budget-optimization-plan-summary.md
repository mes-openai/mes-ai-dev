---
title: 骨架上下文预算优化方案摘要
load_strategy: explicit-only
cost_level: low
summary_first: false
default_allowed: false
parent_index: mes-ai-dev/knowledge/rules/governance/context-budget-optimization-plan.md
related_files:
  - mes-ai-dev/knowledge/rules/governance/context-budget-optimization-plan.md
  - mes-ai-dev/knowledge/rules/context-budget-baseline.md
  - mes-ai-dev/knowledge/reference/rule-authority-matrix.md
---

# 骨架上下文预算优化方案摘要

## 1. 文档目的

本文档为《骨架上下文预算优化方案》的摘要版，用于快速说明本次骨架优化的目标、问题、核心方案、分期计划与验收口径。

默认优先阅读本摘要；仅在需要查看完整背景、详细方案或风险分析时，再进入正式正文。

---

## 2. 当前问题

当前骨架虽然已经具备分层加载与按需消费能力，但仍存在以下问题：

1. 根入口偏重，常驻成本偏高
2. 兼容旧入口仍有误读取风险
3. 按需加载规则偏“建议式”，不够刚性
4. 阶段文档最小包不够薄
5. heavy 文档未统一采用两跳读取
6. 同类规则在多个文件重复展开
7. 缺少长期防回胖机制

---

## 3. 优化目标

## 3.1 定量目标

| 指标 | 当前估算 | 目标值 |
|---|---:|---:|
| 常驻基础成本 | 6K–8K | 4K–6K |
| 普通阶段骨架自加载 | 8K–12K | 6K–10K |
| 复杂阶段骨架自加载 | 12K–16K | 9K–13K |
| heavy 文档误加载风险 | 中 | 低 |

## 3.2 定性目标
- 常驻层最小化
- 阶段白名单化
- 场景强触发化
- heavy 文档两跳化
- 兼容入口导航化
- 规则主定义唯一化
- 预算治理标准化

---

## 4. 核心优化方向

## 4.1 入口减重
- 精简 `AGENTS.md`
- 将旧总表改为导航 stub
- 为 heavy 文档补 summary

## 4.2 加载规则硬化
- 强化 `runtime-entry.md`
- 强化 `skeleton-loading-matrix.md`
- 强化 metadata 标准
- 固化预算回退机制

## 4.3 阶段与状态分层
- `phase-*.md` 拆为最小包 + detail
- index 文件去正文化
- state 规则按场景收敛
- `state.yaml` 轻量化

## 4.4 治理收口与防回胖
- 治理文档统一 summary-first
- 建立预算基线
- 建立规则主定义矩阵
- 导航文件保持轻量

---

## 5. 分期计划

## 5.1 第一期：入口减重 + 加载规则硬化
重点：
- 精简根入口
- stub 化旧入口
- summary-first 起步
- metadata 强化
- 预算回退固化

目标：
- 快速降低常驻负担
- 快速降低误加载概率

## 5.2 第二期：阶段与状态结构改造
重点：
- phase 双层化
- index 去正文化
- state 主文件轻量化

目标：
- 将按需加载落实到结构层

## 5.3 第三期：治理收口与防回胖
重点：
- 预算基线
- 权威矩阵
- 治理文档轻重分层
- 新增文档接入约束

目标：
- 防止后续再次膨胀

---

## 6. 关键文件优先级

## 第一优先级
- `AGENTS.md`
- `runtime-entry.md`
- `skeleton-loading-matrix.md`
- `document-load-metadata-standard.md`
- `phase-gates.md`
- `knowledge-consumption-matrix.md`

## 第二优先级
- `budget-audit-rules.md`
- `repository-scale-rules.md`
- 重点治理文档 summary

## 第三优先级
- 全部 `phase-*.md`
- 全部 `state-*.md`
- `state.yaml`
- 纯导航类索引文件

---

## 7. 验收口径

优化完成后，应满足以下条件：

### 结构验收
- `AGENTS.md` 已瘦身为常驻最小入口
- 旧总表已 stub 化
- phase 文档已双层化
- index 文件只导航不正文化
- `state.yaml` 保持轻量

### 行为验收
- 当前阶段存在明确白名单
- 未命中 trigger 不读 scenario 正文
- heavy 文档默认先读 summary
- metadata 可直接驱动读取裁决

### 预算验收
- 常驻基础 ≤ 6K
- 普通阶段骨架自加载 ≤ 10K
- 复杂阶段骨架自加载 ≤ 13K
- 超预算回退顺序明确

### 治理验收
- 已建立预算基线文档
- 已建立规则主定义矩阵
- 新增文档具备 metadata 与成本分级
- 导航文件不再回胖

---

## 8. 结论

本次优化的核心不是“把文档写短”，而是建立一套稳定的**强约束按需加载体系**。

只有同时满足以下三项，才视为优化成功：

1. 骨架结构变轻
2. 加载决策变硬
3. 预算上限能够被稳定守住
