# GSD 执行增强模式规则（兼容入口）

> **说明**：本文件保留为历史兼容入口。
>
> 当前 GSD 主规则已下沉到：
> `mes-ai-dev/knowledge/rules/scenarios/scenario-gsd.md`
>
> 若当前任务需要判断：
> - 何时可进入 GSD
> - 何时必须使用 Strict
> - blocker 如何分类
> - 最小可交付如何定义
> - GSD DoD 与退出判断如何写
>
> 统一以下沉文件为准，不再以本文件正文为主事实源：
> `mes-ai-dev/knowledge/rules/scenarios/scenario-gsd.md`
>
> 同时建议配套阅读：
> - `mes-ai-dev/knowledge/rules/governance/phase-gate-usage-standard.md`
> - `mes-ai-dev/knowledge/rules/governance/completion-sweep-standard.md`
> - `mes-ai-dev/knowledge/reference/skeleton-loading-matrix.md`

---

## 一、迁移后的定位

当前骨架采用：
- `AGENTS.md`：最小常驻总则
- `rules/scenarios/scenario-gsd.md`：GSD 场景主规则
- `rules/governance/phase-gate-usage-standard.md`：门禁标准
- `rules/governance/completion-sweep-standard.md`：收尾扫描标准

本文件仅用于：
1. 兼容历史入口
2. 提醒读者主规则已迁移
3. 避免旧文档继续被误用为当前主规则源

---

## 二、统一引用写法

若其他文件需要说明 GSD 规则，应统一写为：

“当前工作采用 GSD 模式时，目标驱动、blocker 分类、最小可交付、GSD DoD 与退出判断，必须符合 `knowledge/rules/scenarios/scenario-gsd.md`。”
