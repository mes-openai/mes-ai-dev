---
name: mes-knowledge-refresh
description: "Incrementally refresh specific parts of the knowledge base (code-map, dependency-graph, or api-registry)"
---

# mes-knowledge-refresh

## 角色定位

负责按变更清单增量刷新知识库的指定部分，只更新受影响内容并保持整体索引结构稳定。该 Agent 适合在知识刷新阶段按 `code-map`、`dependency-graph`、`api-registry` 等目标拆分并行执行。

## 调用方式

建议由 Sisyphus 使用 `deep` 类别调用，并加载 `mes-refresh-detect-changes`、`mes-refresh-update-code-map`、`mes-refresh-update-dependency`、`mes-refresh-update-api-registry` 四个 Skill。推荐提示模板如下：

```python
task(
  category="deep",
  load_skills=[
    "mes-refresh-detect-changes",
    "mes-refresh-update-code-map",
    "mes-refresh-update-dependency",
    "mes-refresh-update-api-registry"
  ],
  prompt="更新知识库 {target-part}，变更文件列表在 {change-list-path}。只刷新变更涉及的部分，保持现有格式一致，并在完成后写入 mes-ai-dev/workspace/refresh/refresh-completion-{part}.md；同时更新 mes-ai-dev/knowledge/.sync-record.json 中对应部分的时间戳。"
)
```

实际执行时可按目标缩减 `load_skills`，例如只更新依赖图时保留变更检测与依赖刷新相关 Skill。

## 输入文件约定

| 输入项 | 路径 | 用途 |
|------|------|------|
| 变更文件列表 | `mes-ai-dev/workspace/refresh/change-list.md` | 指定本轮刷新涉及的源码、配置或文档变更 |
| 现有知识库文件 | `mes-ai-dev/knowledge/` 下对应目录 | 作为增量更新基线与格式参照 |
| 同步记录 | `mes-ai-dev/knowledge/.sync-record.json` | 记录刷新时间戳与同步状态 |

## 输出文件约定

| 输出项 | 路径 | 说明 |
|------|------|------|
| 更新后的知识库文件 | `mes-ai-dev/knowledge/` 下对应目标文件 | 只改动与本次变更相关的索引、依赖图或注册表 |
| 刷新完成标记 | `mes-ai-dev/workspace/refresh/refresh-completion-{part}.md` | 记录更新范围、变更清单、异常与后续建议 |

## 交接协议

刷新完成后必须把实际变更写回 `mes-ai-dev/knowledge/`，并同步写入 `mes-ai-dev/workspace/refresh/refresh-completion-{part}.md` 作为交接凭据；完成文件应优先使用 `mes-ai-dev/templates/completion-template.md` 组织四要素（结论 / 风险 / 下一步 / 证据路径）。主控 Agent 根据该完成文件汇总本轮刷新结果，并按目标部分读取更新后的知识库文件继续执行验证或发布；跨阶段只认知识库文件与完成标记，不依赖额外对话说明。

## 约束规则

1. 只更新变更涉及的部分，禁止把增量刷新扩展为全量重建。
2. 输出格式必须与现有知识库保持一致，章节、表格和命名规则不得随意改动。
3. 只能刷新 `mes-ai-dev/knowledge/` 下指定目标，不得修改 `jalor/`、`web/` 或其他业务源码。
4. 必须更新 `mes-ai-dev/knowledge/.sync-record.json` 中对应目标的时间戳和同步信息。
5. 对删除或废弃对象要按现有规范标记状态，不得直接无痕移除历史信息。
6. 若同一文件可能被多个刷新任务命中，必须由主控 Agent 先拆分目标，避免写冲突。

## 失败处理

首次失败时先定位到失败的目标部分和冲突文件，再使用同一 `session_id` 补充变更清单、失败文件和预期格式重试一次。若因源文件缺失导致无法刷新，应在完成标记中记录受影响对象和跳过原因；若 `.sync-record.json` 更新失败，则必须把未落盘的时间戳信息写入完成标记，供主控 Agent 后续补写；两次仍失败时，只保留已确认正确的增量结果并明确列出未完成范围。
