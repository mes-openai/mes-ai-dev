# 执行步骤（2/2）

### 7. 使用模板输出迁移校验报告
写入报告到：
- `mes-ai-dev/workspace/refresh/state-migration-report-{YYYYMMDD}.md`

统一使用：
- `.opencode/references/mes-ai-reference/templates/governance/state-migration-report-template.md`
- `.opencode/references/mes-ai-reference/templates/governance/detailed-review-report-template.md`（落盘模板）
- `.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`（统一最小字段集约束）

> **模板使用要求**：
> - 模板只提供迁移校验报告骨架，不可保留占位文本
> - 必须将五维度检查结果、残留清单、差异字段和修复建议替换为真实校验结果
> - 迁移校验报告必须补齐风险评估、证据路径、复审/闭环状态，不得仅保留检查表和结论

**Step Gate C**：迁移校验报告缺少五维度结果、残留清单、修复建议、风险评估、证据路径或闭环状态 → 打回步骤7重做，不得交付治理验收使用。
