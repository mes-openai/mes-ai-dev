---
name: mes-analyze-impact-scope
description: "Analyze impact scope identifying affected services, modules, tables. Trigger: impact analysis, scope"
---

# 影响范围分析

## 核心说明
- 本文件仅保留 Skill 元数据、适用边界与最小读取入口。
- 详细导航统一以下层 `INDEX.md` 为准；执行说明以下层 `modules/` 正文为准。
- `evals/` 属于 Skill 的正式组成部分，用于触发验证与能力回归。
- GitNexus 类代码知识图谱能力可作为影响范围、调用链、依赖链和现有能力复用的辅助证据导航，但不得替代项目事实源。
- graphify 类知识图谱能力可作为结果导读与关系可视化补充，但不得替代 `INDEX.md`、`modules/` 或阶段门禁结论。

## 适用场景
- Analyze impact scope identifying affected services, modules, tables. Trigger: impact analysis, scope

## 读取约束
- 读取顺序固定为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 与其他可选目录。
- 不得把 `SKILL.md` 当作完整正文；`INDEX.md` 才是详细导航入口。
- 重构后的模块内容保持原意，不得擅自扩义或缩义。
