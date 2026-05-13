# 阶段记忆消费分片

## 一、阶段记忆输入/输出矩阵

| 阶段 | 正式输入 | 阶段记忆输入 | 阶段记忆输出 |
|---|---|---|---|
| analyze | 原始需求、历史需求、知识库索引 | 历史相关 REQ handoff、analyze/cross-stage pitfalls | `spec.md`、`mes-ai-dev/workspace/memory/*` |
| design | requirement deliverable、impact 分析结果 | requirements handoff、design/cross-stage pitfalls | `design.md`、`mes-ai-dev/workspace/memory/*` |
| develop | design deliverable、设计约束 | designs handoff、develop/cross-stage pitfalls | `tasks.md`、`mes-ai-dev/workspace/memory/*` |
| test | development deliverable、变更说明 | development handoff、test/cross-stage pitfalls | `test-report.md`、`mes-ai-dev/workspace/memory/*` |
| deliver | testing deliverable、验收结论 | testing handoff、deliver/cross-stage pitfalls | `handover-doc.md`、`mes-ai-dev/workspace/memory/*` |

---

## 二、强制规则

1. 若存在 active 高风险 pitfall，阶段执行前必须显式制定规避动作
2. 若阶段中新增高复用经验，退出前必须判断是否升级为全局阶段记忆
3. 未消费必读阶段记忆的阶段，不得视为完成上下文预检

---

## 三、默认不加载

- 与当前阶段无关的 stage-memory 目录
- 历史需求的全部 handoff 正文
