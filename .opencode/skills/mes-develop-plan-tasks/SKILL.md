---
name: mes-develop-plan-tasks
description: "Plan and decompose development tasks from design. Trigger: task plan, development plan, work breakdown"
---

# 开发任务规划 Skill

## 核心说明
- 本文件仅保留 Skill 元数据、适用边界与最小读取入口。
- 详细导航统一以下层 `INDEX.md` 为准；执行说明以下层 `modules/` 正文为准。
- `evals/` 属于 Skill 的正式组成部分，用于触发验证与能力回归。
- GitNexus 类代码知识图谱能力可用于缩小实现范围、确认最小改动集合和回归路径，但不得成为扩大无关修改的理由。
- 若任务涉及跨文件/跨模块依赖，可按需用 graphify 生成关系导读；导读不替代设计结论、任务拆解或 TDD 计划。

## 适用场景
- Plan and decompose development tasks from design. Trigger: task plan, development plan, work breakdown

## 读取约束
- 读取顺序固定为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 与其他可选目录。
- 不得把 `SKILL.md` 当作完整正文；`INDEX.md` 才是详细导航入口。
- 重构后的模块内容保持原意，不得擅自扩义或缩义。
