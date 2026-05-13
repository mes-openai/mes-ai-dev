---
name: mes-refresh-detect-changes
description: "Detect code changes since last knowledge base update. Trigger: detect changes, code changes, repository changes, scan changes"
---

# 代码变更检测

## 核心说明
- 本文件仅保留 Skill 元数据、适用边界与最小读取入口。
- 详细导航统一以下层 `INDEX.md` 为准；执行说明以下层 `modules/` 正文为准。
- `evals/` 属于 Skill 的正式组成部分，用于触发验证与能力回归。
- GitNexus 类代码知识图谱能力可用于辅助识别变更映射、依赖影响面和需要刷新的对象，但不得替代 diff、状态源或事实校验。
- graphify 类知识图谱能力可用于刷新结果导读，但不得替代刷新产物正文、状态源或人工复核结论。

## 适用场景
- Detect code changes since last knowledge base update. Trigger: detect changes, code changes, repository changes, scan changes

## 读取约束
- 读取顺序固定为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 与其他可选目录。
- 不得把 `SKILL.md` 当作完整正文；`INDEX.md` 才是详细导航入口。
- 重构后的模块内容保持原意，不得擅自扩义或缩义。
