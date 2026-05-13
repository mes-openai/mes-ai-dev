# 状态渲染规范（兼容入口）

> 本文件已从单文件重型结构拆分为状态规则目录。
> 默认请改读：
>
> - `.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`
> - `.opencode/references/mes-ai-reference/rules/state/state-core.md`
> - `.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md`
> - `.opencode/references/mes-ai-reference/rules/state/state-convergence.md`
> - `.opencode/references/mes-ai-reference/rules/state/state-trust.md`

---

## 一、迁移说明

原 `state-rendering-spec.md` 同时承载：

- 单一事实源与兼容视图规则
- 初始化片段与收口规则
- convergence 收敛状态消费边界
- knowledge trust / dirty 脏化与可信度传播规则

该结构在初始化、刷新、交付、骨架修改等多种场景下都容易被整份读取。

当前已拆成状态规则目录，目标是：

1. 先读索引
2. 默认只读 `state-core.md`
3. 只有命中初始化、收敛、refresh 场景时再读对应分片

---

## 二、新结构导航

- 总索引：`.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`
- 核心规则：`.opencode/references/mes-ai-reference/rules/state/state-core.md`
- 初始化片段：`.opencode/references/mes-ai-reference/rules/state/state-init-fragments.md`
- 收敛边界：`.opencode/references/mes-ai-reference/rules/state/state-convergence.md`
- 可信度与脏化：`.opencode/references/mes-ai-reference/rules/state/state-trust.md`

---

## 三、兼容边界

1. 本文件保留为兼容导航入口，避免旧引用立即失效。
2. 本文件不再作为默认主事实源。
3. 若当前任务仍整份读取本文件，视为未遵循新的按需加载口径。
4. 若当前任务涉及 sync 双写兼容，主文件应优先使用 `state.yaml.sync` 摘要字段；`state-detail/sync.yaml` 仅承接明细；`.sync-record.json` 保持历史遗留定位，但可按主文件摘要 + detail 明细联合渲染。
