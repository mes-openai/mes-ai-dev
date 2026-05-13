---
title: 状态核心规则
doc_type: state
load_strategy: explicit-only
phase_scope: []
trigger:
  - state-core
  - state
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/rules/state/state-rendering-index.md
related_files:
  - .opencode/references/mes-ai-reference/rules/state/state-init-fragments.md
  - .opencode/references/mes-ai-reference/rules/state/state-convergence.md
  - .opencode/references/mes-ai-reference/rules/state/state-trust.md
  - .opencode/references/mes-ai-reference/rules/context-budget-baseline.md
  - .opencode/references/mes-ai-reference/reference/rule-authority-matrix.md
---

# 状态核心规则

> **硬性规则**：违反本规范 = 缺陷。
> 本文件定义状态体系的主规则与单一事实源边界，不应作为普通阶段默认常驻输入；仅在需要判断状态主模型、兼容视图边界与禁止行为时进入。

## 一、单一事实源

| 文件 | 角色 | 约束 |
|------|------|------|
| `mes-ai-dev/knowledge/state/state.yaml` | **唯一已合并机器事实源** | 只接受主控串行合并后的状态 |
| `mes-ai-dev/knowledge/state/fragments/*.yaml` | 初始化暂存片段 | 仅初始化阶段写入；不可作为下游消费事实源 |
| `mes-ai-dev/knowledge/fragments/**/*.md` | 共享知识暂存片段 | 仅初始化/深化阶段写入；不可作为下游消费事实源 |
| `mes-ai-dev/knowledge/state/summary.md` | 人工阅读摘要 | 从 state.yaml 渲染 |
| `baseline.md` | 兼容摘要视图 | 从 state.yaml 渲染 |
| `init-coverage.md` | 兼容清单视图 | 以统一状态源为准；若启用双写兼容，可按主文件 coverage 摘要 + `state-detail/coverage.yaml` 明细联合渲染 |
| `state-detail/recent-execution.yaml` | 双写兼容明细 | 默认承接 recent_execution 过程态明细；主文件保留摘要字段 |
| `state-detail/convergence.yaml` | 双写兼容明细 | 若启用双写兼容，承接 convergence 明细；主文件保留摘要用于全局/局部判断 |
| `.init-checkpoint.yaml` | 历史遗留 | 仅 mes-verify-state-migration 引用 |
| `.sync-record.json` | 历史遗留 | 仅 mes-verify-state-migration 引用 |

---

## 二、禁止行为

- ❌ 直接编辑兼容视图文件
- ❌ 绕过 state.yaml 更新状态
- ❌ 兼容视图间互相引用
- ❌ 新代码依赖历史遗留文件
- ❌ 并行初始化直接覆盖 `mes-ai-dev/knowledge/state/state.yaml`
- ❌ 绕过收口流程直接消费 `mes-ai-dev/knowledge/fragments/**/*.md`

---

## 三、渲染顺序

```text
mes-ai-dev/knowledge/state/fragments/*.yaml（初始化暂存片段）
    ↓ 主控串行合并
state.yaml（唯一已合并事实源）
    ↓ 再渲染兼容视图
1. baseline.md
2. init-coverage.md
3. summary.md
```

> `.init-checkpoint.yaml` / `.sync-record.json` 不在新渲染流程中，仅专项核查时才读取。

---

## 四、渲染时机

| 触发事件 | 渲染范围 |
|---------|---------|
| `/mes-init-project` 完成 | 全仓模式：合并状态片段并收拢完成后渲染 baseline + init-coverage + summary；单仓/定向模式只写状态片段 |
| `/mes-init-enrich` 完成 | baseline + init-coverage + summary |
| `/mes-init-converge` 完成 | baseline + init-coverage + summary |
| `/mes-refresh-knowledge` 完成 | baseline + init-coverage + summary |
| 门禁校验完成 | summary（校验结论） |

---

## 五、冲突解决

| 场景 | 解决规则 |
|------|---------|
| 兼容视图与 state.yaml 不一致 | 以 state.yaml 为准，重新渲染 |
| baseline 与 coverage 统计不一致 | 从 state.yaml.coverage 聚合重算 |
| 时间戳不一致 | 以 state.yaml 为准 |
| 多个初始化 session 并行写状态 | 以 `mes-ai-dev/knowledge/state/fragments/*.yaml` 暂存，禁止直接并行写 state.yaml |
| 共享知识片段未收口 | 以 `state.yaml.initialization.convergence` 的 pending 字段为准 |

---

## 六、执行者职责

| 执行者 | 职责 |
|--------|------|
| 主控 Agent | 合并 `mes-ai-dev/knowledge/state/fragments/*.yaml` 到 state.yaml + 渲染兼容视图 |
| Skill | 只写局部产物、状态片段与知识片段，不直接写共享文件 |
| 并行 Agent | 禁止直接写 baseline / init-coverage |
