# refresh 历史报告归档说明

> 本目录用于归档 `workspace/refresh/` 下已完成、主要用于审计留痕的历史报告。

---

## 一、归档目标

将“当前仍需直接消费的说明文档”与“仅供追溯的历史报告”分离，降低工作区噪音。

---

## 二、保留在 `refresh/` 根目录的文件

以下文件允许保留在 `workspace/refresh/` 根目录：

| 文件 | 用途 |
|------|------|
| `README.md` | 当前 refresh 工作区说明 |
| `skeleton-refactor-final-report-YYYYMMDD.md` | 最新骨架重构结论与当前维护入口 |

---

## 三、应归档到 `archive/` 的文件类型

以下文件默认归档到本目录：

| 文件类型 | 示例 | 用途 |
|----------|------|------|
| 历史迁移校验报告 | `state-migration-report-20260413.md` | 统一状态源迁移审计留痕 |
| 历史治理复盘报告 | `skeleton-governance-retrospective-20260413.md` | 治理阶段性复盘 |
| 已过时的 refresh 中间审计报告 | `*-audit-*.md`、`*-retrospective-*.md` | 历史追溯 |

---

## 四、归档原则

1. **当前主结论文档留根目录**，历史过程文档归档。
2. **归档文件不删除**，仅降低主工作区干扰。
3. **归档文件保留原文件名**，不重命名，便于引用和追溯。
4. 若历史报告中的规则口径与当前规则不一致，以最新的：
   - `AGENTS.md`
   - `mes-ai-dev/knowledge/rules/state/state-rendering-index.md`
   - `mes-ai-dev/knowledge/reference/knowledge-consumption/index.md`
   - `mes-ai-dev/knowledge/reference/phase-gates/index.md`
   为准。

---

## 五、当前归档建议

建议迁移到本目录的文件：

- `state-migration-report-20260413.md`
- `skeleton-governance-retrospective-20260413.md`

保留在 `refresh/` 根目录的文件：

- `README.md`
- `skeleton-refactor-final-report-20260414.md`
