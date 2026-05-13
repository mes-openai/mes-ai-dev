# 状态文件消费分片

## 一、角色定义

| 文件 | 角色 | 消费场景 |
|---|---|---|
| `state/state.yaml` | 唯一已合并机器事实源 | 初始化、深化、收敛、刷新、后续消费类阶段 |
| `state/state-index.md` | 状态结构导航入口 | 判断主文件与 detail 文件的消费边界 |
| `state/state-detail/*.yaml` | 状态细节文件（迁移目标结构） | 主文件不足时按需下钻 |
| `state/fragments/*.yaml` | 初始化运行中状态片段 | 初始化、深化、断点续传 |
| `state/summary.md` | 人工摘要入口 | 快速查看状态结论 |
| `baseline.md` | 兼容摘要视图 | 回退摘要消费 |
| `init-coverage.md` | 兼容清单视图 | 对象清单回退 |

---

## 二、消费规则

1. 正式事实判断默认读取 `state/state.yaml`
2. 若 `state.yaml` 未来完成轻量化，状态细节应迁移到 `state/state-detail/*.yaml`，消费顺序为“先主文件，再按需下钻 detail”
3. `state-index.md` 只负责导航主文件与 detail 文件结构，不替代 `state.yaml`
4. `state/fragments/*.yaml` 仅作为初始化/深化阶段的待合并片段，不得作为下游正式事实源
5. `summary.md`、`baseline.md`、`init-coverage.md` 仅作为兼容视图或人工摘要入口，不替代 `state.yaml`
6. 若 `state.yaml` 缺失或不可信，应先阻断并修复统一状态源，而不是回退到历史遗留文件

---

## 三、主要消费者

- 初始化相关命令：读取/写入 `state.yaml` 与 `fragments`
- `mes-guard-context-budget`：读取仓规模与 convergence 状态
- analyze / design / test / deliver：读取 convergence、trust、coverage 等状态判断消费边界
- refresh：写入 sync 与 knowledge trust 相关字段

若未来引入 `state-detail/` 结构：
- 运行时优先读取主文件中的高频判断字段
- 仅在覆盖明细、收口批次、recent execution、sync 细节不足时再下钻 detail 文件

---

## 四、默认不加载

- 历史遗留状态文件正文
- 片段文件的全部正文（除非当前任务就是初始化收口或 state 校验）

---

## 五、相关入口

- 状态文件索引：`mes-ai-dev/knowledge/state/state-index.md`
- 状态规则索引：`.opencode/references/mes-ai-reference/rules/state/state-rendering-index.md`
- 轻量化迁移方案：`.opencode/references/mes-ai-reference/rules/governance/state-yaml-lightweight-migration-plan.md`
