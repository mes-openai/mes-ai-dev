# 阶段产物目录标准（stage-artifact-layout）

## 一、标准目录
阶段需求编号与阶段根目录命名必须先遵循 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`。解析出 `{REQ-ID}` 后，每个阶段 `{REQ-ID}` 目录下默认采用：

```text
<phase>/{REQ-ID}/
  deliverable/
  report/
  evidence/
  handoff/
  memory/
  working/
```

## 二、固定文件位置
- `mes-ai-dev/workspace/report/stage-output-report.md`
- `mes-ai-dev/workspace/memory/pitfall-ledger.md`
- `mes-ai-dev/workspace/memory/decision-log.md`
- `mes-ai-dev/workspace/memory/blocker-log.md`

补充说明：阶段主交接文档不再统一为单一 `handoff` 文件名，而应符合 OpenSpec 命名体系，由各阶段主文档承担交接职责。

### 2.1 OpenSpec 主交接文档命名

| 阶段 | 主交接文档 | 说明 |
|---|---|---|
| 需求分析 | `spec.md` | 正式需求规格主文档；若命中前置探索/提案，可补 `exploration.md`、`proposal.md` |
| 详细设计 | `design.md` | 详细设计主文档 |
| 代码开发 | `tasks.md` | 开发任务与执行闭环主文档 |
| 测试验证 | `test-report.md` | 测试结论与覆盖率闭环主文档 |
| 发布交付 | `handover-doc.md` | 交付交接主文档 |
| 知识刷新 | `refresh-report.md` 或等价刷新主文档 | 按阶段刷新结果确定 |
| 紧急修复 | `emergency-report.md` 或等价紧急修复主文档 | 按紧急修复结果确定 |

## 三、目录职责
- `deliverable/`：正式交付物
- `mes-ai-dev/workspace/report/`：阶段输出报告、审查报告、门禁报告
- `evidence/`：日志、截图、命令输出、验证摘要
- `handoff/`：交接与恢复入口
- `mes-ai-dev/workspace/memory/`：坑点、决策、阻塞沉淀
- `working/`：草稿与过程材料

## 四、阶段最小产物
除阶段特殊说明外，退出前至少应具备：
- 全部标准目录
- `stage-output-report.md`
- 至少一份详细审查报告
- 符合 OpenSpec 的阶段主交接文档
- 三类 memory 台账

## 五、不合格情形
- 正式产物长期放在 `working/`
- 审查报告散落根目录
- 固定文件未落在固定位置

## 六、统一引用写法
“阶段目录命名必须符合 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md`；阶段目录结构与固定文件位置必须符合 `.opencode/references/mes-ai-reference/rules/governance/stage-artifact-layout.md`。”

## 七、产物分类与阅读优先级

| 目录 | 主要属性 | 推荐归类 | 人工阅读优先级 |
|---|---|---|---|
| `deliverable/` | 正式输出 | 最终产物 | 高 |
| `mes-ai-dev/workspace/report/` | 审查、汇总、门禁 | 最终产物为主 | 高 |
| `evidence/` | 日志、截图、验证材料 | 过程产物为主 | 中 |
| `handoff/` | 阶段交接入口 | 最终产物 | 高 |
| `mes-ai-dev/workspace/memory/` | 决策、坑点、阻塞沉淀 | 过程沉淀 | 中 |
| `working/` | 草稿、推导、中间稿 | 过程产物 | 低 |

阅读建议：

1. 先看 `mes-ai-dev/workspace/report/stage-output-report.md`。
2. 再看 `deliverable/` 中的主交付物。
3. 再看详细审查报告与当前阶段的 OpenSpec 主交接文档。
4. 只有在需要追证或排查问题时，再下钻 `evidence/`、`mes-ai-dev/workspace/memory/`、`working/`。

## 八、产物体系变更后的同步刷新要求

若骨架修改涉及新增、修改、删除阶段产物、目录职责、标准文件名或分类方式，必须同步检查并按需更新：

- `.opencode/references/mes-ai-reference/reference/stage-artifact-guide.md`
- `.opencode/references/mes-ai-reference/reference/workspace-structure.md`
- `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`
- `.opencode/references/mes-ai-reference/templates/template-index.md`
- `mes-ai-dev/workspace/refresh/skeleton-change-log.md`

未完成同步刷新，不得判定相关骨架修改已完成。
