---
name: knowledge-baseline
description: "Knowledge base scan baseline and freshness tracking"
scan_time: ""
scan_duration: ""
code_baseline: ""
scan_scope: []
scan_status: "pending"
---

# 知识库基线与新鲜度追踪

> **核心原则**：`state/state.yaml` 是唯一已合并机器事实源；初始化运行中状态先写 `state/fragments/*.yaml`，本文件为兼容摘要视图。
> **历史遗留**：.init-checkpoint.yaml / .sync-record.json 已标记为历史。
> **双写兼容说明**：若未来启用 `state-detail/sync.yaml`，`.sync-record.json` 允许按“state.yaml.sync 摘要 + state-detail/sync.yaml 明细（若存在）”联合渲染，但其历史遗留定位不变。
> **渲染规范**：`rules/state-rendering-spec.md`

---

## 一、扫描元数据

| 字段 | 值 |
|------|-----|
| 扫描时间 | [待填写] |
| 扫描耗时 | [待填写] |
| 代码基线版本 | [Git commit] |
| 扫描范围 | [仓目录列表] |
| 扫描状态 | pending / running / completed / failed |

---

## 二、扫描结果摘要

| 产物路径 | 状态 | 备注 |
|---------|------|------|
| code-map/backend-overview.md | 成功/失败 | |
| code-map/frontend-overview.md | 成功/失败 | |
| code-map/services/ | 成功/失败 | |
| dependency-graph/api-registry.md | 成功/失败 | |
| dependency-graph/database-registry.md | 成功/失败 | |

---

## 三、覆盖率统计

| 维度 | 目标 | 实际 | 状态 |
|------|------|------|------|
| 服务覆盖率 | 100% | [%] | ✅/⚠️/❌ |
| 模块覆盖率 | 100% | [%] | ✅/⚠️/❌ |
| API覆盖率 | ≥95% | [%] | ✅/⚠️/❌ |
| 数据库覆盖率 | ≥90% | [%] | ✅/⚠️/❌ |
| 收敛完成度 | 100% | [%] | ✅/⚠️/❌ |

---

## 四、可信度标注

| 产物 | 解析深度 | 可信度 | 备注 |
|------|---------|--------|------|
| backend-overview.md | full/index/degraded | A/B/C/D | |
| api-registry.md | full/index/degraded | A/B/C/D | |

---

## 五、新鲜度基线

| 产物类别 | 过期阈值 | 检测方式 |
|---------|---------|---------|
| code-map（服务索引） | 7天 | Git commit |
| dependency-graph | 3天 | 配置变更 |
| rules/reference | 30天 | 人工确认 |

---

## 六、门禁校验结论

| 项目 | 内容 |
|------|------|
| 校验结论 | ✅合格 / ⚠️执行范围合格 / ❌不合格 |
| 校验时间 | [时间] |
| 缺失项 | [清单] |

---

## 七、初始化收敛状态

| 项目 | 内容 |
|------|------|
| 收敛状态 | pending / running / failed / completed |
| 最近收敛时间 | [时间] |
| 是否接受为全局基线 | true / false |
| 偏差数量 | [数量] |

---

## 八、状态文件职责

| 文件 | 职责 | 优先级 |
|------|------|--------|
| `state/state.yaml` | **唯一已合并机器事实源** | 主读取/收拢后主写入 |
| `state/fragments/*.yaml` | 初始化状态片段 | 初始化运行中主写入 |
| `state/summary.md` | 人工阅读摘要 | 主读取 |
| `baseline.md` | 兼容摘要视图 | 回退 |
| `init-coverage.md` | 兼容清单视图 | 回退 |
| `.init-checkpoint.yaml` | 历史遗留 | 仅专项核查 |
| `.sync-record.json` | 历史遗留 | 仅专项核查；若启用双写兼容，可由 state.yaml.sync 摘要 + state-detail/sync.yaml 明细联合渲染 |

---

## 九、更新记录

| 更新时间 | 更新类型 | 触发方式 |
|---------|---------|---------|
| [首次扫描时间] | 全量 | /mes-init-project |
| [增量更新时间] | 增量 | /mes-refresh-knowledge |
