# 阶段门禁标准（兼容入口）

> 本文件已从重型单文件结构拆分为“总索引 + 通用规则 + 各阶段分片”。
> 默认请改读：
>
> - `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
> - `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
> - `.opencode/references/mes-ai-reference/reference/phase-gates/<当前阶段>.md`
> - 命中 GSD 时再读：`.opencode/references/mes-ai-reference/reference/phase-gates/gsd-continue-exit.md`

---

## 一、迁移说明

原 `phase-gates.md` 曾同时承载：

- 通用门禁模型
- 标准化评审要求
- GSD Continue Exit 通用规则
- 初始化、分析、设计、开发、测试、交付、刷新、紧急修复等阶段门禁
- 初始化收敛状态消费门禁

该结构容易导致非当前阶段规则被整份加载，增加上下文负担。

当前已改为分片结构，目标是：

1. 先读索引
2. 再读通用门禁规则
3. 只读当前阶段分片
4. 只在命中时读取 GSD 分片

---

## 二、新结构导航

### 2.1 总索引
- `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`

### 2.2 通用规则
- `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/gsd-continue-exit.md`

### 2.3 阶段分片
- 初始化：`.opencode/references/mes-ai-reference/reference/phase-gates/init.md`
- 需求分析：`.opencode/references/mes-ai-reference/reference/phase-gates/analyze.md`
- 详细设计：`.opencode/references/mes-ai-reference/reference/phase-gates/design.md`
- 代码开发：`.opencode/references/mes-ai-reference/reference/phase-gates/develop.md`
- 测试验证：`.opencode/references/mes-ai-reference/reference/phase-gates/test.md`
- 发布交付：`.opencode/references/mes-ai-reference/reference/phase-gates/deliver.md`
- 知识刷新：`.opencode/references/mes-ai-reference/reference/phase-gates/refresh.md`
- 紧急修复：`.opencode/references/mes-ai-reference/reference/phase-gates/emergency.md`

---

## 三、兼容边界

1. 本文件保留为兼容导航入口，避免旧引用立即失效。
2. 本文件不再作为默认主事实源。
3. 若当前任务仍整份读取本文件，视为未遵循新的按需加载口径。
4. 后续若继续扩展门禁内容，应优先补到对应分片，而不是重新膨胀本兼容入口。
