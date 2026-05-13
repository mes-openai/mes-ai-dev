---
name: mes-init-build-code-map
description: Aggregate all analysis results to build complete code map. Trigger keywords: build code map, code map overview, aggregate analysis, code structure.
---

# 代码地图构建

## 核心说明
- 本文件仅保留 Skill 元数据、适用边界与最小读取入口。
- 详细导航统一以下层 `INDEX.md` 为准；执行说明以下层 `modules/` 正文为准。
- `evals/` 属于 Skill 的正式组成部分，用于触发验证与能力回归。
- GitNexus 类代码知识图谱能力可作为代码结构、依赖、调用链、热点与知识面覆盖的辅助校验，不得替代初始化事实源或收口结果。
- graphify 类知识图谱能力可作为 code map 导读或 wiki 补充，不得替代 `INDEX.md`、`modules/` 或初始化门禁结论。

## 适用场景
- Aggregate all analysis results to build complete code map. Trigger keywords: build code map, code map overview, aggregate analysis, code structure.

## 读取约束
- 读取顺序固定为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 与其他可选目录。
- 不得把 `SKILL.md` 当作完整正文；`INDEX.md` 才是详细导航入口。
- 重构后的模块内容保持原意，不得擅自扩义或缩义。
