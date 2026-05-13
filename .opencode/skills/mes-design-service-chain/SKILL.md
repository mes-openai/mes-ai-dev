---
name: mes-design-service-chain
description: "Design microservice call chain and data flow. Trigger: service chain, call chain, orchestration"
---

# 服务调用链设计 Skill

## 核心说明
- 本文件仅保留 Skill 元数据、适用边界与最小读取入口。
- 详细导航统一以下层 `INDEX.md` 为准；执行说明以下层 `modules/` 正文为准。
- `evals/` 属于 Skill 的正式组成部分，用于触发验证与能力回归。
- GitNexus 类代码知识图谱能力可用于校验服务链、调用链、Provider 路径与依赖闭环，但不得替代设计阶段的事实源与服务链冻结结论。
- graphify 类知识图谱能力可用于输出关系导读或调用链摘要，但不得替代 `INDEX.md`、`modules/` 或设计主文档。

## 适用场景
- Design microservice call chain and data flow. Trigger: service chain, call chain, orchestration

## 读取约束
- 读取顺序固定为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 与其他可选目录。
- 不得把 `SKILL.md` 当作完整正文；`INDEX.md` 才是详细导航入口。
- 重构后的模块内容保持原意，不得擅自扩义或缩义。
