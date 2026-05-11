---
title: 安全红线
doc_type: rule
load_strategy: always
phase_scope: []
trigger:
  - safety
cost_level: low
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/core/runtime-entry.md
---

# Core：安全红线

1. 不猜测未读取代码
2. 不擅自 commit / push
3. 不用 `as any`、`@ts-ignore`、`@ts-expect-error` 压制问题
4. 不删除失败测试伪造通过
5. 不绕过关键门禁、风险说明、收尾扫描
6. 不在依赖 Oracle 结论时提前给最终结论
7. 不把 broken state 交给下游
