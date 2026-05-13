# 输出产物

## 输出产物

| 输出项 | 路径 | 说明 |
|--------|------|------|
| gate-report | 输出到对话或按规则落盘 | ✅ 通过 / ❌ 阻止 |
| stage-output-report-check | 命中阶段退出时纳入 gate-report 或对应报告文件 | 校验阶段完成产物报告是否存在且内容达标 |
| openspec-handoff-check | 命中阶段退出时纳入 gate-report 或对应报告文件 | 校验当前阶段 OpenSpec 主交接文档是否存在且内容达标 |

> 步骤级门禁结果需要落盘时，统一使用 `.opencode/references/mes-ai-reference/templates/governance/step-gate-review-template.md`。
> 所有门禁留痕结果必须符合 `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`；需要落盘模板时再使用 `.opencode/references/mes-ai-reference/templates/governance/detailed-review-report-template.md`。
