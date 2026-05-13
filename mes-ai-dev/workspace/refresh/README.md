# 刷新工作空间

本目录用于存放知识库刷新阶段的中间产出。

> 历史审计/复盘类报告的归档规则见：`workspace/refresh/archive/README.md`

## 文件说明
- `detected-changes.json` — 检测到的代码变更清单
- `update-plan.md` — 刷新执行计划
- `update-results.md` — 刷新执行结果
- `semantic-drift-report.md` — 语义漂移检测报告（如有）
- `state-migration-report-{YYYYMMDD}.md` — 统一状态源迁移校验报告（如执行 `mes-verify-state-migration` Skill）
- `skeleton-reset-report-{YYYYMMDD}.md` — 骨架清理报告（如执行 `mes-skeleton-reset` Skill，用于骨架迁移到新项目）
- `skeleton-change-review-{YYYYMMDD}-{主题}.md` — 骨架修改正式审查结果（如已形成骨架修改审查结论）

## 生命周期
- 刷新开始时创建临时文件
- 刷新完成后归档到 `workspace/refresh/archive/` 或删除
- `state-migration-report-{YYYYMMDD}.md` 可作为治理审计产物保留，不建议与普通刷新临时文件一并删除
- `skeleton-change-review-{YYYYMMDD}-{主题}.md` 属于骨架治理审查产物，可长期保留，不应按普通刷新临时文件处理
- 不作为跨阶段交接的正式产出

## 骨架修改审查结果落盘规则

1. 骨架修改形成正式审查结论时，默认落盘到 `workspace/refresh/`。
2. 推荐命名：`skeleton-change-review-{YYYYMMDD}-{主题}.md`。
3. 同一主题多轮复审：`skeleton-change-review-{YYYYMMDD}-{主题}-r{轮次}.md`。
4. 审查结果应与 `skeleton-change-log.md` 互相可追溯。
5. 仅用于示例演示的文件应写入 `workspace/examples/`，不得与真实审查结果混放。

## 历史报告阅读边界

- `workspace/refresh/` 下的历史审计/复盘/说明类文档反映的是生成当时的骨架状态。
- 若历史报告中的路径、命名、收口或并发治理口径与当前规则不一致，以最新 `AGENTS.md`、`phase-gates/index.md`、`mes-ai-dev/knowledge/state/state-rendering-index.md`、`knowledge-consumption/index.md` 为准。
- 历史报告默认不得作为当前 canonical 命名与路径规则的唯一依据。
