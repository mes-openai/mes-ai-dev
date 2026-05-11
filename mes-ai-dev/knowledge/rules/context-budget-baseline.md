---
title: 骨架上下文预算基线
doc_type: rule
load_strategy: explicit-only
phase_scope: []  # 所有阶段共用，不限定特定阶段
trigger:
  - budget
  - context-budget
  - token-limit
cost_level: medium
summary_first: false
default_allowed: false  # 不默认常驻，按需加载
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - mes-ai-dev/knowledge/rules/core/runtime-entry.md
  - mes-ai-dev/knowledge/rules/budget-audit-rules.md
  - mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md
  - mes-ai-dev/knowledge/rules/repository-scale-rules.md
---

# 骨架上下文预算基线

## 1. 文档目的

本文档定义 MES-AI-DEV 骨架运行时的上下文预算基线，用于统一以下事项：

- 常驻层预算控制
- 阶段加载预算控制
- scenario 预算控制
- heavy 文档进入控制
- 超预算回退顺序
- 仓规模对预算的调整口径

本文档是骨架上下文预算的**长期治理基线**，供运行时入口、预算审计、评审与新增文档接入使用。

---

## 2. 适用范围

本基线适用于以下骨架资产：

1. Core 常驻规则
2. Phase 最小包
3. Phase gate 分片
4. Knowledge consumption 分片
5. Scenario 文档
6. Governance 文档
7. Reference / Guide 文档
8. State 规则与状态文件
9. Summary / Index / Stub 类型入口

本基线不用于约束具体业务代码文件的源码阅读成本，但可作为业务阶段预算管理的参考起点。

---

## 3. 预算分层模型

骨架上下文预算按四层管理：

### 层 0：Bootstrap 常驻层
包含：
- 根入口最小包
- 核心红线
- 运行时最小入口
- 轻量状态主文件

### 层 1：Phase 最小包
包含：
- 当前阶段最小 phase 文档
- 当前阶段 gate 分片
- 当前阶段 relevant consumption 分片

### 层 2：Scenario 触发层
包含：
- 命中特殊场景时的 summary / 分片 / 正文

### 层 3：Heavy Detail 层
包含：
- heavy governance / reference / guide / state detail 正文

---

## 4. 预算基线表

## 4.1 推荐预算

| 资产类型 | 推荐预算 | 上限 | 默认进入方式 |
|---|---:|---:|---|
| 常驻核心 | 4K | 6K | always |
| 单阶段最小包 | 2K | 4K | phase |
| gate 分片 | 1K | 2K | phase |
| consumption 分片 | 1K | 2K | phase |
| scenario summary | 0.5K | 1K | trigger-only |
| scenario detail | 0 | 2K | trigger-only |
| governance summary | 0.5K | 1.5K | summary-first |
| heavy detail | 0 | 3K | explicit-only |
| 轻量 state 主文件 | 0.5K | 1.5K | always |
| state detail | 0 | 2K | explicit-only |

## 4.2 组合预算目标

| 运行形态 | 目标值 | 上限 |
|---|---:|---:|
| 常驻基础 | 4K–6K | 6K |
| 普通阶段骨架自加载 | 6K–10K | 10K |
| 复杂阶段骨架自加载 | 9K–13K | 13K |
| 临时高复杂任务 | 13K–16K | 16K |
| 风险警戒线 | 16K+ | 需要回退 |
| 强阻断线 | 20K+ | 不得继续扩张 |

---

## 5. 各类资产预算口径

## 5.1 常驻层预算口径
常驻层必须尽量稳定，不得随任务类型而频繁膨胀。

### 常驻层允许包含
- 根入口最小摘要
- 安全红线
- runtime-entry 最小规则
- 必要状态摘要

### 常驻层不得包含
- 长篇阶段规则正文
- scenario 正文
- heavy governance 正文
- 无关 guide
- 兼容旧总表正文

### 预算要求
- 目标 ≤ 6K
- 超过 6K 即视为常驻过重，应优先裁剪入口与重复语义

## 5.2 Phase 最小包预算口径
进入某阶段时，仅允许引入最小必要阶段资产。

### 默认允许
- 当前 phase 最小包
- 当前 gate 分片
- 当前 consumption 分片
- 必要 completion/execution baseline

### 默认禁止
- 非当前阶段 detail
- 无关 scenario 正文
- heavy guide 正文
- 跨阶段 detail

### 预算要求
- 当前阶段附加成本目标 ≤ 4K
- gate + consumption 额外目标 ≤ 4K
- 单阶段总附加预算理想值 ≤ 8K

## 5.3 Scenario 预算口径
Scenario 资产默认不进入上下文。

### 规则
- 未命中 trigger：不读正文
- 命中 trigger：优先 summary / 索引
- 仅在 summary 不足时进入 detail

### 预算要求
- 单个 scenario summary ≤ 1K
- 单次 scenario detail 尽量 ≤ 2K
- 多 scenario 并发时优先分批，不叠加整读

## 5.4 Heavy 文档预算口径
所有 high-cost 文档一律受 heavy 规则管理。

### 定义范围
- 大型治理文档
- 参考指南
- 仓规模规则正文
- 预算审计正文
- 大型 state detail
- 未拆分的长篇设计/规则正文

### 规则
1. 必须先读 summary / index
2. 不得直接全文裸读
3. 进入正文前必须判断是否真正需要
4. 多份 heavy 文档不得并发整读

### 预算要求
- 单份 heavy 正文进入预算 ≤ 3K
- 当已有复杂阶段上下文时，heavy detail 应极慎进入
- 一次任务中 heavy detail 总预算建议 ≤ 4K–5K

---

## 6. 仓规模调整口径

仓规模会影响允许读取的 detail 数量与每次下钻深度。

## 6.1 small / medium
### 策略
- 可按正常预算基线执行
- phase + gate + consumption 模式为主
- detail 可适度进入

### 建议
- 单次 detail 读取保持克制
- 仍以最小阶段包优先

## 6.2 large
### 策略
- 严格限制 detail 数量
- 单次只处理有限分片
- 多服务任务必须分批

### 建议
- 单次 heavy/detail 读取应明显收紧
- 优先使用 summary / index
- 单轮只允许极少量深挖

## 6.3 mega
### 策略
- 强制以索引和摘要驱动
- detail 只允许为当前最关键主题进入
- 强制分批、强制收缩

### 建议
- 一次只解决一个重点问题
- 禁止“顺手多读几份”
- 不得多服务、多主题、多 heavy 文档同时展开

---

## 7. 超预算回退顺序

当估算接近或超过预算时，必须按如下顺序回退：

### 第一步：回退 detail
优先撤出：
- phase detail
- state detail
- governance 正文
- reference 正文

### 第二步：回退跨阶段资产
移除：
- 当前阶段无关的 phase 资产
- 跨阶段 gate / consumption 分片
- 不必要的辅助说明

### 第三步：仅保留 index / summary
对于 heavy 文档、reference 文档、guide 文档，只保留：
- summary
- index
- stub

### 第四步：分批处理
若仍超预算，则拆分问题，按主题/阶段/服务分批进入。

---

## 8. 预算状态分级

| 状态 | 区间 | 含义 | 动作 |
|---|---:|---|---|
| 绿色 | ≤ 80% | 正常 | 可继续按规则推进 |
| 黄色 | 80%–100% | 接近上限 | 应避免新增 heavy 正文 |
| 橙色 | 100%–120% | 已超目标 | 必须执行回退动作 |
| 红色 | >120% | 高风险 | 应停止扩张并分批 |
| 阻断 | 接近或超过 20K | 不可接受 | 禁止继续扩张 |

---

## 9. Summary / Index / Stub 的预算要求

## 9.1 Summary
- 应能支持大部分普通判断
- 应比正文显著更轻
- 不应重新复制大段正文

## 9.2 Index
- 只用于导航和适用性判断
- 不应演化成半正文
- 不得大量重复规则解释

## 9.3 Stub
- 只保留兼容说明与跳转
- 不得承载事实正文
- 应明确禁止整份读取

---

## 10. 与其他文档的关系

## 10.1 与 `runtime-entry.md`
`runtime-entry.md` 负责定义运行时加载顺序；本文件负责给出预算上限与回退基线。

## 10.2 与 `budget-audit-rules.md`
`budget-audit-rules.md` 负责预算审计流程与风险状态；本文件负责预算分层与基线数值。

## 10.3 与 `skeleton-loading-matrix.md`
`skeleton-loading-matrix.md` 负责阶段白名单；本文件负责这些白名单在预算上的边界。

## 10.4 与 `repository-scale-rules.md`
`repository-scale-rules.md` 负责仓规模分类；本文件负责仓规模对预算策略的调整口径。

---

## 11. 使用要求

1. 新增 high-cost 文档前，应先判断是否必须为正文
2. 新增治理/参考文档时，应同步声明成本分级
3. 若文档可能频繁被引用，应优先提供 summary
4. 索引文件不得重新膨胀为正文
5. 常驻层不得吸收阶段正文与治理正文
6. 任何超预算场景都必须执行回退顺序

---

## 12. 验收口径

本基线生效后，应满足以下条件：

1. 常驻基础稳定在 6K 以内
2. 普通阶段骨架自加载稳定在 10K 以内
3. 复杂阶段骨架自加载稳定在 13K 以内
4. heavy 文档默认先走 summary
5. 超预算时存在固定回退动作
6. large / mega 仓不再允许粗放式深挖

---

## 13. 结论

本基线的目的不是追求“绝对最少 token”，而是建立**稳定、可预期、可执行的预算纪律**。

预算控制的关键不在于一次性压缩，而在于：
- 常驻层稳定
- 阶段层克制
- scenario 层严格触发
- heavy 层强制两跳
- 超预算后有明确回退
