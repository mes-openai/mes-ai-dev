---
title: 阶段记忆持久化治理规范
doc_type: governance
load_strategy: explicit-only
phase_scope: []
trigger:
  - stage-memory
  - handoff
cost_level: high
summary_first: true
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/stage-memory-governance-summary.md
  - spec.md
---

# 阶段记忆持久化治理规范

> 对应摘要：`.opencode/references/mes-ai-reference/reference/stage-memory-governance-summary.md`
> 若当前不涉及阶段记忆写入、消费、压缩或交接，优先读取摘要并禁止默认整篇读取正文。
> 本规范定义阶段记忆的定位、分类、路径、升级规则与消费方式。
> 目标不是保存更多文档，而是将阶段执行中的关键经验、坑点、阻塞与交接信息沉淀为后续阶段可直接消费的治理资产。

---

## 一、定位

阶段记忆持久化用于解决以下问题：

1. 阶段中断后缺少稳定恢复入口
2. 上一阶段识别出的风险、坑点、阻塞在下一阶段丢失
3. 经验停留在对话、个人记忆或临时草稿中，无法跨需求复用
4. 历史上已经踩过的坑，在后续阶段重复发生

阶段记忆不是正式交付物的替代品，而是阶段治理、交接与避坑能力的补充层。

---

## 二、适用范围

本规范适用于：

- 需求分析阶段
- 详细设计阶段
- 代码开发阶段
- 测试验证阶段
- 发布交付阶段
- 紧急修复阶段
- 知识刷新阶段（按需）

---

## 三、双层模型

### 3.1 局部阶段记忆

局部阶段记忆保存在具体 `REQ-YYYYMMDD-XXX` 阶段目录下，保留完整上下文。

主要作用：

- 作为当前需求当前阶段的恢复入口
- 为下一阶段提供直接交接
- 沉淀该需求下的真实决策、坑点、阻塞与模式

### 3.2 全局阶段记忆

全局阶段记忆保存在 `.opencode/references/mes-ai-reference/reference/stage-memory/` 下，用于沉淀具有跨需求、跨阶段、跨仓复用价值的经验。

主要作用：

- 作为阶段默认消费输入
- 将重复坑点升级为稳定约束
- 为 skill、门禁、审查与模板提供高价值参考

---

## 四、标准产物与固定路径

每个阶段至少必须维护以下文件：

- 符合 OpenSpec 的阶段主交接文档（如 `spec.md`、`design.md`、`tasks.md`、`test-report.md`、`handover-doc.md`）
- `mes-ai-dev/workspace/memory/pitfall-ledger.md`
- `mes-ai-dev/workspace/memory/decision-log.md`
- `mes-ai-dev/workspace/memory/blocker-log.md`

若阶段形成可复用模式，建议补充：

- `mes-ai-dev/workspace/memory/pattern-notes.md`

### 4.1 阶段 OpenSpec 主交接文档

用于记录：

- 阶段目标
- 输入材料
- 已确认约束
- 关键决策摘要
- blocker 状态与代偿动作
- 风险与 active pitfall
- 核心结论
- 下一阶段建议
- 下一阶段必读文件
- 证据路径

### 4.2 `mes-ai-dev/workspace/memory/pitfall-ledger.md`

用于记录本阶段已识别或已发生的高风险坑点，必须包含：

- 触发条件
- 问题表现
- 根因
- 规避要求
- 必检项
- 适用范围
- 来源 REQ
- 证据路径
- 当前状态

### 4.3 `mes-ai-dev/workspace/memory/decision-log.md`

用于记录本阶段的关键决策、备选方案、选定原因与影响范围，并作为 ADR 候选来源。

### 4.4 `mes-ai-dev/workspace/memory/blocker-log.md`

用于记录 blocker 分类、影响、代偿推进、后补动作与当前状态。

---

## 五、记忆对象类型

阶段记忆对象至少分为以下六类：

1. `decision`：关键决策与取舍
2. `pitfall`：高概率误区、已踩过的坑与规避方式
3. `blocker`：阻塞、代偿动作、后补动作
4. `pattern`：可复用模式与成功做法
5. `constraint`：稳定约束、禁止事项、证据要求
6. `handoff`：阶段交接摘要、必读文件、下一阶段注意事项

---

## 六、消费机制

每个消费类阶段在进入正式执行前，必须按知识消费矩阵至少读取：

1. 上一阶段 OpenSpec 主交接文档
2. 当前阶段适用的全局 `pitfalls.md`
3. 当前阶段适用的全局 `constraints.md`（若已建立）
4. 必要时读取 `cross-stage/` 下的相关记忆
5. 对于迭代需求或历史关联需求，按需读取相关历史 REQ 的阶段记忆

如存在 `active` 且高风险的 pitfall，必须在本阶段执行中显式说明规避动作。

---

## 七、升级规则

局部阶段记忆满足以下任一条件时，应评估升级为全局阶段记忆：

1. 同类问题重复出现 2 次及以上
2. 风险等级高
3. 对多个需求或多个仓有复用价值
4. 可抽象为明确的检查项、禁止项或证据要求
5. 有完整证据链支持

升级后的全局记忆必须保留：

- 来源需求
- 来源阶段
- 触发条件
- 规避要求或模式摘要
- 证据路径
- 当前状态

---

## 八、生命周期

全局阶段记忆条目至少应包含以下状态：

- `active`：当前有效，默认消费
- `watch`：观察中，待更多案例验证
- `superseded`：已被新规则或新模式替代
- `archived`：历史归档，不再默认消费

---

## 九、与其他治理产物的关系

- `stage-output-report.md`：说明本阶段产出了什么
- 详细审查报告：说明本阶段是否达标
- ADR：记录长期设计/架构决策
- OpenSpec 主交接文档：记录本阶段发生了什么、下一阶段该注意什么
- `state.yaml`：只保存阶段记忆路径与状态索引，不保存大段正文
- `governance-memory.md`：沉淀骨架治理层面的经验，不替代具体阶段记忆

---

## 十、禁止事项

1. 不得以审查报告替代阶段记忆
2. 不得只记录结论，不记录触发条件、根因与规避方式
3. 不得将大量正文直接写入 `state.yaml`
4. 不得只在本 REQ 下沉淀局部经验而从不评估全局升级
5. 不得将阶段记忆视为可选附录
