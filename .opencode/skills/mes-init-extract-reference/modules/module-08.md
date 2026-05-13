# 输出

## 输出

模板来源（SDK 静态区）：
- `.opencode/references/mes-ai-reference/templates/reference/terminology-glossary-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/domain-model-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/data-dictionary-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/enum-registry-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/error-code-registry-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/permission-matrix-template.md`
- `.opencode/references/mes-ai-reference/templates/rules/api-conventions-template.md`
- `.opencode/references/mes-ai-reference/templates/rules/coding-standards-template.md`

项目侧输出目标（不得写入 SDK 静态区）：
- `mes-ai-dev/knowledge/reference/terminology-glossary.md`
- `mes-ai-dev/knowledge/reference/domain-model.md`
- `mes-ai-dev/knowledge/reference/data-dictionary.md`
- `mes-ai-dev/knowledge/reference/enum-registry.md`
- `mes-ai-dev/knowledge/reference/error-code-registry.md`
- `mes-ai-dev/knowledge/rules/api-conventions.md`
- `mes-ai-dev/knowledge/rules/coding-standards.md`
- `mes-ai-dev/knowledge/reference/permission-matrix.md`（新增）

> 若处于单仓/分批/多 session 初始化场景，上述文件应先产出为局部结果或待汇总片段，再由主控Agent统一写入最终共享文件。

片段目录与命名约定：
- `mes-ai-dev/knowledge/fragments/reference/terminology/service-<service>.md`
- `mes-ai-dev/knowledge/fragments/reference/domain-model/service-<service>.md`
- `mes-ai-dev/knowledge/fragments/reference/data-dictionary/schema-<schema>.md`
- `mes-ai-dev/knowledge/fragments/reference/enum-registry/service-<service>.md`
- `mes-ai-dev/knowledge/fragments/reference/error-code/service-<service>.md`
- `mes-ai-dev/knowledge/fragments/reference/permission-matrix/repo-<repo>.md`
- `mes-ai-dev/knowledge/fragments/rules/api-conventions/repo-<repo>.md`
- `mes-ai-dev/knowledge/fragments/rules/coding-standards/repo-<repo>.md`
