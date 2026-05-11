# 上下文预算控制指南

> 本文档定义骨架各阶段的上下文预算估算、阈值判定与优化策略

---

## 一、估算基准

> 说明：以下估算为**草案**，基于骨架规则文件的字数统计估算，实际执行时可能因具体任务而波动。建议在真实项目中实测验证。

| 规则层级 | 平均大小 | 说明 |
|---------|---------|------|
| Core 规则（单文件） | ~0.5K token | agent-core, intent-gate, safety-redlines 等 |
| Phase 规则（单文件） | ~1-1.5K token | phase-init, phase-analyze 等 |
| Phase Detail 文件 | ~1K token | phase-design-detail 等（按需加载） |
| Gate Index | ~1K token | phase-gates/index.md + common.md |
| Gate 分片（单阶段） | ~0.5K token | phase-gates/init.md 等 |
| Consumption Index | ~0.5K token | knowledge-consumption/index.md |
| Consumption 分片 | ~0.5K token | knowledge-consumption/state.md 等 |
| Governance 规则（单文件） | ~0.5K token | review-report-standard 等（按需加载） |

---

## 二、各阶段默认加载估算

| 阶段 | Core | Phase | Gate Index | Gate 分片 | Consumption Index | Consumption 分片 | 按需加载 | **总估算** |
|------|------|-------|-----------|----------|------------------|-----------------|---------|-----------|
| **init** | ~2.5K | ~1.5K | ~1K | ~0.5K | ~0.5K | state+rules ~1K | 按需 ~1-2K | **6-8K** |
| **analyze** | ~2.5K | ~1.5K | ~1K | ~0.5K | ~0.5K | state+reference+convergence ~1.5K | governance ~1K | **7-9K** |
| **design** | ~2.5K | ~1.5K | ~1K | ~0.5K | ~0.5K | rules+reference ~1K | governance ~1.5K | **7-10K** |
| **develop** | ~2.5K | ~1.5K | 按需 ~0.5K | - | ~0.5K | rules+stage-memory ~1K | 按需 ~1K | **5-7K** |
| **test** | ~2.5K | ~1.5K | ~1K | ~0.5K | ~0.5K | index+stage-memory ~1K | 按需 ~1K | **6-8K** |
| **deliver** | ~2.5K | ~1.5K | ~1K | ~0.5K | ~0.5K | state+convergence+stage-memory ~1.5K | governance ~1K | **7-9K** |
| **refresh** | ~2.5K | ~1.5K | 按需 ~0.5K | - | ~0.5K | state+code-map+dependency ~1.5K | 按需 ~1K | **6-7K** |
| **emergency** | ~2.5K | ~1.5K | 按需 ~0.5K | - | ~0.5K | state+stage-memory ~1K | 按需 ~1K | **5-7K** |

---

## 三、预算阈值判定

| 状态 | Token 范围 | 判定动作 |
|------|-----------|----------|
| **正常** | 8K-12K | 普通阶段默认加载范围，无需干预 |
| **复杂** | 12K-16K | 需要额外加载 Scenario/Governance/Detail，应说明原因 |
| **过载预警** | >16K | 必须说明原因并裁剪加载范围，启用摘要优先 |
| **强制回退** | >20K | 视为过载，必须回退到索引+分片模式，禁止全量加载 |

---

## 四、优化策略

### 4.1 索引优先

先读索引文件（index.md），再按需进入分片。

```
knowledge-consumption/index.md → knowledge-consumption/state.md（按需）
phase-gates/index.md → phase-gates/init.md（按需）
```

### 4.2 摘要优先

超过 150 行的文档优先读 summary 版或 index 版。

- `overview.md` → 优先读摘要段落
- `file-summaries.md` → 优先读方法签名，再按需进入具体实现

### 4.3 分片化消费

phase-gates 和 knowledge-consumption 已分片化，按阶段/主题加载：

| 场景 | 加载策略 |
|------|----------|
| 进入 init 阶段 | phase-gates/index.md + phase-gates/init.md |
| 进入 design 阶段 | phase-gates/index.md + phase-gates/design.md |
| 需要状态知识 | knowledge-consumption/index.md + knowledge-consumption/state.md |
| 需要参考知识 | knowledge-consumption/index.md + knowledge-consumption/reference.md |

### 4.4 黑名单保护

非当前阶段门禁、无关消费分片默认不加载：

- 开发阶段不加载 phase-gates/design.md
- 测试阶段不加载 phase-gates/init.md
- 无数据库变更时不加载 knowledge-consumption/database.md

### 4.5 局部结果 + 主控收口

并行 Agent 只写各自局部结果，不直接写共享知识文件。共享知识文件统一由主控串行收口。

这避免了多 Agent 同时写入导致的冲突和重复消费。

---

## 五、预算守卫机制

骨架提供专门的预算守卫 Skill：

> 先读 [`mes-guard-context-budget/SKILL.md`](../../../.opencode/skills/mes-guard-context-budget/SKILL.md)，再按目录化结构进入 [`mes-guard-context-budget/INDEX.md`](../../../.opencode/skills/mes-guard-context-budget/INDEX.md) 与命中的 `modules/*.md`

触发时机：

- 阶段进入前预算检查
- 步骤执行中预算监控
- 过载预警触发时裁剪建议

---

## 六、实测建议

上述估算为草案，建议在真实项目中实测验证：

1. 记录各阶段实际加载的文件列表
2. 统计实际 token 消费
3. 根据实测数据调整估算表
4. 建立项目级预算基准

---

## 相关文档

- [`budget-audit-rules.md`](../rules/budget-audit-rules.md) - 预算审计规则
- [`context-budget-optimization-plan.md`](../rules/governance/context-budget-optimization-plan.md) - 上下文预算优化方案
- [`mes-guard-context-budget/SKILL.md`](../../../.opencode/skills/mes-guard-context-budget/SKILL.md) + [`mes-guard-context-budget/INDEX.md`](../../../.opencode/skills/mes-guard-context-budget/INDEX.md) - 预算守卫 Skill
