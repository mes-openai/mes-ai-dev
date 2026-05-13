# 输出

## 输出

- `mes-ai-dev/workspace/designs/{REQ-ID}/design.md` - OpenSpec 完整设计主文档
- `mes-ai-dev/workspace/designs/{REQ-ID}/template-source.md` - 当使用用户内联模板或项目级自定义模板时输出，记录模板来源、固定章节清单、缺失必要内容补齐方式；使用默认模板时可不生成，但需在执行计划中说明

输出目录必须按 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md` 重新计算。详细设计阶段禁止将 `design.md`、`design-review-report.md` 或任何设计分项产物写入 `mes-ai-dev/workspace/requirements/{REQ-ID}/`。
