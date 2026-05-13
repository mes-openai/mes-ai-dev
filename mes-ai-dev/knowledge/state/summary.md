# 知识库状态摘要

> 本文件是 `mes-ai-dev/knowledge/state/state.yaml` 的人工阅读版摘要。
> **核心原则**：`mes-ai-dev/knowledge/state/state.yaml` 是唯一已合并机器事实源；初始化运行中状态先写入 `mes-ai-dev/knowledge/state/fragments/*.yaml`，收拢后再合并到 `mes-ai-dev/knowledge/state/state.yaml`。
> **历史遗留**：.init-checkpoint.yaml / .sync-record.json 已标记为历史，仅专项核查时引用。
> **双写兼容说明**：若未来启用 `mes-ai-dev/knowledge/state/state-detail/sync.yaml`，`.sync-record.json` 允许按“state.yaml.sync 摘要 + `mes-ai-dev/knowledge/state/state-detail/sync.yaml` 明细（若存在）”联合渲染，但不改变其历史遗留定位。
> **字段说明参考**：详见 `mes-ai-dev/knowledge/state/state-schema-reference.md`。

---

## 一、摘要元信息

| 字段 | 值 |
|------|-----|
| 状态源版本 | [schema_version] |
| 最近更新时间 | [last_updated] |
| 最近写入命令 | [last_command] |

---

## 二、初始化状态

| 项目 | 内容 |
|------|------|
| 扫描状态 | [pending/running/paused/failed/completed] |
| 扫描时间 | [时间] |
| 扫描范围 | [repos/modules/schemas 摘要] |
| 仓规模标签 | [small/medium/large/mega] |
| 服务覆盖率 | [百分比] |
| API覆盖率 | [百分比] |
| 可信度下限 | [A/B/C/D] |
| 收敛状态 | [pending/running/failed/completed] |

---

## 三、最近执行

| 项目 | 内容 |
|------|------|
| 执行模式 | [full/targeted/resume] |
| 执行命令 | [/mes-init-project / /mes-init-enrich / /mes-init-converge / /mes-refresh-knowledge] |
| checkpoint状态 | [pending/running/paused/failed/completed] |

---

## 四、初始化收敛

| 项目 | 内容 |
|------|------|
| 收敛状态 | [pending/running/failed/completed] |
| 最近收敛时间 | [时间] |
| 是否接受为全局基线 | [true/false] |
| 偏差说明 | [列表摘要] |
| 待收口 reference/rules 片段 | [已清空/数量/摘要] |
| 待收口 code-map 片段 | [已清空/数量/摘要] |
| 最近收口片段批次 | [批次标识/范围/时间] |

---

## 五、门禁校验

| 项目 | 内容 |
|------|------|
| 校验结论 | [✅合格 / ⚠️执行范围合格 / ❌不合格] |
| 校验时间 | [时间] |
| 缺失项 | [缺失项列表] |

---

## 六、相关文件

- **统一状态源**：`mes-ai-dev/knowledge/state/state.yaml`
- **状态片段目录**：`mes-ai-dev/knowledge/state/fragments/`
- **状态规则索引**：`mes-ai-dev/knowledge/rules/state/state-rendering-index.md`
- **字段参考**：`mes-ai-dev/knowledge/state/state-schema-reference.md`
- **门禁索引**：`mes-ai-dev/knowledge/reference/phase-gates/index.md`
- **迁移核查**：`mes-ai-dev/knowledge/state/migration-checklist.md`
- **消费矩阵索引**：`mes-ai-dev/knowledge/reference/knowledge-consumption/index.md`

> **历史遗留文件**（仅专项核查时引用）：
> - `.init-checkpoint.yaml` — 断点进度历史遗留文件
> - `.sync-record.json` — 同步记录历史遗留文件
