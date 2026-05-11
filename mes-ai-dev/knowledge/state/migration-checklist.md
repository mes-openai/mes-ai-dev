# 统一状态源迁移检查清单

> 本清单用于核查 `state/state.yaml` 迁移是否真正落地。
> 目标不是解释规则，而是帮助维护者快速发现残留旧口径、断链引用和未迁移消费者。
> 如需执行一次完整专项核查，先读 `.opencode/skills/mes-verify-state-migration/SKILL.md`，再按目录化结构进入 `.opencode/skills/mes-verify-state-migration/INDEX.md` 与命中的 `modules/*.md`。

---

## 一、检查目标

| 目标 | 通过标准 |
|------|---------|
| 单一事实源已建立 | `state/state.yaml` 被定义为唯一已合并机器事实源 |
| 收敛状态已建模 | `state.yaml.initialization.convergence` 已纳入统一状态模型 |
| 共享知识片段状态已建模 | `pending_reference_fragments` / `pending_code_map_fragments` / `last_converged_fragment_batch` 已纳入统一状态模型 |
| 兼容视图定位明确 | `baseline.md` / `init-coverage.md` 标注为兼容视图 |
| **历史遗留已标记** | `.init-checkpoint.yaml` / `.sync-record.json` 标注为历史遗留，仅专项核查引用 |
| 写入协议已收口 | 初始化链路描述为先写 `state/fragments/*.yaml` 再合并到 `state.yaml`；刷新链路仍先写 `state.yaml` |
| 读取协议已收口 | 核心消费者均优先读取 `state.yaml` 或 `state/summary.md` |
| 渲染规则已成文 | `rules/state/state-rendering-index.md` 已存在且被关键文档引用 |

---

## 二、必查文件

| 类别 | 文件 |
|------|------|
| 统一状态源 | `mes-ai-dev/knowledge/state/state.yaml` |
| 人工摘要 | `mes-ai-dev/knowledge/state/summary.md` |
| 字段参考 | `mes-ai-dev/knowledge/state/state-schema-reference.md` |
| 状态规则索引 | `mes-ai-dev/knowledge/rules/state/state-rendering-index.md` |
| 兼容视图 | `mes-ai-dev/knowledge/baseline.md` |
| 兼容视图 | `mes-ai-dev/knowledge/init-coverage.md` |
| **历史遗留** | `mes-ai-dev/knowledge/.init-checkpoint.yaml` |
| **历史遗留** | `mes-ai-dev/knowledge/.sync-record.json` |
| 总规则 | `AGENTS.md` |
| 门禁规则索引 | `mes-ai-dev/knowledge/reference/phase-gates/index.md` |

---

## 三、写入协议检查

- [ ] `mes-init-project` 相关文档明确写入顺序：先写 `state/fragments/*.yaml`，再在收拢阶段合并到 `state.yaml`
- [ ] `mes-init-enrich` 相关文档明确写入顺序：先写 `state/fragments/*.yaml`，再在收拢阶段合并到 `state.yaml` 的 coverage 摘要字段，并默认双写 `state-detail/coverage.yaml`；主文件不再长期保留 coverage 对象级明细
- [ ] `mes-init-verify-knowledge` 相关文档明确 recent_execution 写入顺序：主文件写 recent_execution 摘要字段，并默认双写 `state-detail/recent-execution.yaml`；主文件不再长期保留 recent_execution 过程态明细
- [ ] `mes-init-converge` 相关文档明确写入顺序：先写 `state.yaml.initialization.convergence` 摘要字段，并默认双写 `state-detail/convergence.yaml`
- [ ] `mes-init-project` / `mes-init-enrich` / `mes-init-converge` 已说明共享知识片段待收口状态如何写入 `state.yaml`
- [ ] `mes-refresh-knowledge` 相关文档明确写入顺序：先写 `state.yaml.sync` 摘要字段，再同步写 `state-detail/sync.yaml`
- [ ] `mes-init-verify-knowledge` 明确负责写入统一状态源与渲染兼容视图
- [ ] 未出现"直接写 baseline.md / init-coverage.md"作为主路径的描述
- [ ] **历史遗留**：`.init-checkpoint.yaml` / `.sync-record.json` 仅 mes-verify-state-migration 引用

> 人工核查时只需确认“初始化运行中主写入路径 = state/fragments/*.yaml，已合并主写入路径 = state.yaml，历史遗留仅专项核查”。
> 具体 grep 关键词、排除规则和残留判定逻辑统一由 `mes-verify-state-migration` Skill 执行。

---

## 四、读取协议检查

- [ ] `mes-guard-context-budget` 优先读取 `state.yaml.initialization.repository_scale`
- [ ] `mes-analyze-impact-scope` 优先读取 `state.yaml`
- [ ] `mes-refresh-detect-changes` 优先读取 `state.yaml.sync` 摘要字段，并默认双写 `state-detail/sync.yaml`
- [ ] `mes-refresh-validate-quality` 优先读取 `state.yaml.sync`
- [ ] `mes-verify-phase-gate` 已将状态门禁解释绑定到 `state/state-rendering-index.md` 或对应状态分片
- [ ] 依赖全仓视角结果的命令已显式说明 convergence 依赖
- [ ] 命令层新鲜度预检优先读取 `state/summary.md`
- [ ] **历史遗留**：新代码不读取 `.init-checkpoint.yaml` / `.sync-record.json`

---

## 五、规则闭环检查

- [ ] `AGENTS.md` 已列出 `state/state-rendering-index.md`
- [ ] `AGENTS.md` 已声明 `state.yaml` 为唯一已合并机器事实源
- [ ] `AGENTS.md` 已标记 `.init-checkpoint.yaml` / `.sync-record.json` 为历史遗留
- [ ] `phase-gates/index.md` 与相关分片已移除对历史遗留文件的直接门禁校验
- [ ] `phase-gates/` 与 `state/` 分片已纳入 convergence 规则
- [ ] `state/state-init-fragments.md` 已定义共享知识片段追踪字段与示例结构
- [ ] `baseline.md` / `summary.md` / `state.yaml` 已引用渲染规范
- [ ] `budget-audit-rules.md` 已移除对 `.sync-record.json` 的 fallback

---

## 六、历史遗留文件引用规则

| 文件 | 允许引用者 | 用途 |
|------|-----------|------|
| `.init-checkpoint.yaml` | mes-verify-state-migration Skill | 专项核查 |
| `.sync-record.json` | mes-verify-state-migration Skill | 专项核查；若启用双写兼容，可按 `state.yaml.sync` 摘要 + `state-detail/sync.yaml` 明细联合渲染 |

> **禁止行为**：
> - ❌ 新代码直接读取历史遗留文件
> - ❌ 将历史遗留文件作为主读取路径
> - ❌ 在文档中将历史遗留文件描述为"兼容视图"而非"历史遗留"

---

## 七、迁移完成判定

满足以下全部条件，才可视为迁移进入稳定期：

- [ ] 统一状态源、人工摘要、渲染规范三件套均已存在
- [ ] convergence 状态模型已纳入统一状态源并被规则引用
- [ ] 共享知识片段待收口状态已纳入统一状态源并被规则引用
- [ ] 初始化写入链路已使用 `state/fragments/*.yaml` + 合并到 `state.yaml` 的模型
- [ ] 核心读取链路全部采用"新状态源优先"
- [ ] 历史遗留文件仅 mes-verify-state-migration 引用
- [ ] 全仓 grep 未发现活跃引用历史遗留文件

---

## 八、维护建议

1. 每次新增初始化状态字段时，先更新 `state/fragments` 片段约定、`state.yaml` 合并模型与 `state/state-rendering-index.md` 及对应分片
2. 每次新增共享知识片段追踪字段时，同步更新 `state.yaml` 示例、`summary.md` 展示位与相关命令写入说明
3. 历史遗留文件保持现状，不删除，但不在新流程中引用
4. 每次修改门禁或预算规则时，检查是否影响状态摘要
5. 每轮骨架治理结束后，执行一次本清单复核
