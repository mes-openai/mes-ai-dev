# 知识消费矩阵（兼容入口）

> 本文件已从重型单文件结构拆分为“总索引 + 主题分片”。
> 默认请改读：
>
> - `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
> - `.opencode/references/mes-ai-reference/reference/knowledge-consumption/<当前主题>.md`

---

## 一、迁移说明

原 `knowledge-consumption-matrix.md` 曾同时承载：

- 状态文件消费矩阵
- code-map 消费矩阵
- dependency-graph 消费矩阵
- database-index 消费矩阵
- rules 消费矩阵
- reference 消费矩阵
- 阶段记忆消费矩阵
- convergence 状态消费矩阵
- 大文件强制消费规则
- 历史遗留文件引用规则

该结构虽然完整，但对多数阶段来说过重，容易把无关主题一并加载。

当前已改为分片结构，目标是：

1. 先读索引，确认当前该读哪些主题
2. 再只读当前阶段需要的主题分片
3. 大文件、历史遗留、收敛状态判断均按需加载

---

## 二、新结构导航

### 2.1 总索引
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`

### 2.2 主题分片
- 状态文件：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md`
- code-map：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/code-map.md`
- dependency-graph：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/dependency-graph.md`
- database-index：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/database-index.md`
- rules：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/rules.md`
- reference：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/reference.md`
- 阶段记忆：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/stage-memory.md`
- 收敛状态：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/convergence.md`
- 大文件规则：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/large-file-rules.md`
- 历史遗留文件：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/legacy-files.md`

---

## 三、兼容边界

1. 本文件保留为兼容导航入口，避免旧引用立即失效。
2. 本文件不再作为默认主事实源。
3. 若当前任务继续整份读取本文件，视为未遵循新的按需加载口径。
4. 后续若继续扩展消费规则，应优先补到对应主题分片，而不是重新膨胀本兼容入口。
