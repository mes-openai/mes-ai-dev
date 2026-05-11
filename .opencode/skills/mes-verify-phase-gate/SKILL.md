---
name: mes-verify-phase-gate
description: "Automatically verify phase entry/exit criteria before proceeding. Trigger: gate check, phase verify, enter phase, exit phase"
---

# 阶段门禁自动校验 Skill

## 核心说明
- 本文件仅保留 Skill 元数据、适用边界与最小读取入口。
- 详细导航统一以下层 `INDEX.md` 为准；执行说明以下层 `modules/` 正文为准。
- `evals/` 属于 Skill 的正式组成部分，用于触发验证与能力回归。

## 适用场景
- Automatically verify phase entry/exit criteria before proceeding. Trigger: gate check, phase verify, enter phase, exit phase
- 用于校验 TDD 前置、测试全绿、覆盖率 100% 与 SDD 交接文档等强约束是否满足

## 读取约束
- 读取顺序固定为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 与其他可选目录。
- 不得把 `SKILL.md` 当作完整正文；`INDEX.md` 才是详细导航入口。
- 重构后的模块内容保持原意，不得擅自扩义或缩义。
