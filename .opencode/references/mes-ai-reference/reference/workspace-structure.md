# 工作区结构说明

## 一、阶段目录
- `requirements/`
- `designs/`
- `development/`
- `testing/`
- `delivery/`
- `emergency/`
- `mes-ai-dev/workspace/refresh/`
- `examples/`
- `locks/`

## 二、REQ 目录分类
每个阶段目录下默认采用：
- `deliverable/`
- `mes-ai-dev/workspace/report/`
- `evidence/`
- `handoff/`
- `mes-ai-dev/workspace/memory/`
- `working/`

## 三、固定文件
- `mes-ai-dev/workspace/report/stage-output-report.md`
- `mes-ai-dev/workspace/memory/pitfall-ledger.md`
- `mes-ai-dev/workspace/memory/decision-log.md`
- `mes-ai-dev/workspace/memory/blocker-log.md`

## 三点五、OpenSpec 主交接文档
- `requirements/{REQ-ID}/spec.md`
- `designs/{REQ-ID}/design.md`
- `development/{REQ-ID}/tasks.md`
- `testing/{REQ-ID}/test-report.md`
- `delivery/{REQ-ID}/handover-doc.md`

`{REQ-ID}` 解析规则统一遵循 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`。

## 四、人工阅读优先级

| 优先级 | 建议优先阅读 | 说明 |
|---|---|---|
| 高 | `mes-ai-dev/workspace/report/stage-output-report.md`、`deliverable/` 主交付物、当前阶段 OpenSpec 主交接文档 | 决定是否能进入下一阶段 |
| 中 | `mes-ai-dev/workspace/memory/` 台账、`evidence/` 核心验证材料 | 用于风险判断与问题回溯 |
| 低 | `working/` 草稿和中间推导 | 一般仅在排错时需要下钻 |

## 五、补充说明

1. `deliverable/` 偏最终产物，`working/` 偏过程产物，`mes-ai-dev/workspace/report/` 是阶段门禁和汇总结论的重要承载目录。
2. 若需要系统理解“哪些产物是过程产物、哪些是最终产物、人要重点看哪些”，优先查：`.opencode/references/mes-ai-reference/reference/stage-artifact-guide.md`。
3. 若骨架修改涉及新增、修改、删除标准产物、固定文件名或目录职责，必须同步刷新本文件与相关入口索引。
