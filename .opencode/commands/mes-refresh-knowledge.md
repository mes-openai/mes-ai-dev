---
description: "刷新知识库，检测变更并更新"
---
# mes-refresh-knowledge

## 功能说明

刷新知识库，检测代码仓库自上次同步以来的变更，并增量更新代码地图、依赖关系和API注册表。适用于日常代码更新后的知识库维护。

## 使用方式

```
/mes-refresh-knowledge
```

**适用场景**：
- 代码仓库有新提交需要同步知识库时
- 执行 `/mes-develop-code` 完成后需要更新知识库时
- 定期维护知识库时

**前置条件**：
- 知识库已初始化（执行过 `/mes-init-project`）
- 存在统一状态源（state.yaml）
- 代码仓库Git状态正常

> **对收敛状态的影响**：
> 若本次刷新影响 overview / registry / hot 层基础数据，则应重新评估 `state.yaml.initialization.convergence` 的有效性。
> 在未重新执行 `/mes-init-converge` 前，原“已接受为全局基线”的结论只能视为待确认状态。

**预期耗时**：约5-15分钟（取决于变更规模）

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

**图谱/TDD Skill 继承说明**：当本命令编排的 Skill 命中 GitNexus / graphify / TDD 单元测试场景时，默认继承 `.opencode/references/mes-ai-reference/rules/governance/skill-graph-tdd-consumption-standard.md`；图谱能力仅作为证据导航或导读，不替代事实证据、阶段结论或门禁判断；TDD/Mockito/路径兼容规则以该统一标准为准。

**阶段完成产物报告**：
- `/mes-refresh-knowledge` 完成后必须输出一份阶段完成产物报告
- 报告必须说明：知识刷新阶段标准产物、已生成文件、各文件作用、未生成文件及未生成原因
- 报告未生成或内容不达标，不得通过知识刷新阶段退出门禁

**阶段详细审查报告**：
- `/mes-refresh-knowledge` 完成后必须输出 `refresh-review-report.md`
- 落盘目录：`mes-ai-dev/workspace/refresh/`
- 报告必须满足详细审查报告最小字段集，并包含明确审查时间与完整证据链
- 报告未生成或内容不达标，不得通过知识刷新阶段退出门禁

## GSD 执行增强说明

当当前变更范围可识别、关键知识影响面可判定、最小必要刷新范围可定义时，`/mes-refresh-knowledge` 可采用 GSD 模式，优先完成“当前知识足以支撑后续阶段继续”的刷新目标。

### 一、何时必须维持 Strict

命中以下情况时必须维持 Strict：

- 当前受影响知识范围不明
- 当前知识仍不足以支撑后续阶段
- 当前刷新结论无法被消费
- 共享知识或全局视图已明显失真

### 二、最小必要刷新定义

最小必要刷新至少应覆盖：

- 当前改动直接影响的知识文件
- 会影响后续判断或执行的规则/索引/映射
- 会导致下游误判的高优先级知识项

### 三、刷新项分类规则

刷新阶段必须显式区分：

- 必刷项：不刷新会影响后续阶段正确判断
- 建议刷新项：刷新后更完整，但当前不阻断
- 可延后项：当前不影响继续推进，可后补

### 四、GSD Continue Exit 条件

刷新阶段进入 GSD Continue Exit 至少必须满足：

1. 必刷项已完成
2. 当前知识足以支撑后续阶段继续
3. 延后刷新项已记录
4. 风险与后补动作已说明
5. 已完成收尾扫描

### 五、Completion Sweep

刷新阶段结束前至少检查：

- 关键知识是否已同步
- 当前知识是否可继续消费
- 是否明确哪些内容仍待后补
- 是否已给出推荐下一步

### 六、输出要求

本命令的最终输出至少应包含：

- 当前模式
- 当前刷新目标
- 必刷项列表
- 延后刷新项列表
- 当前知识可用性结论
- 风险说明
- 后补动作
- 推荐下一步

### 七、模板绑定说明

- 命中 blocker 或关键刷新风险时，应使用 `.opencode/references/mes-ai-reference/templates/governance/blocker-record-template.md` 记录刷新阻塞与代偿动作
- 以 GSD Continue Exit 继续时，应使用 `.opencode/references/mes-ai-reference/templates/governance/minimum-deliverable-template.md` 说明最小必要刷新结果
- 刷新完成状态，应映射到 `.opencode/references/mes-ai-reference/templates/governance/definition-of-done-template.md` 的 GSD 完成定义
- 知识刷新结束前，应使用 `.opencode/references/mes-ai-reference/templates/governance/completion-sweep-template.md` 执行收尾扫描
- 若需独立输出下一步建议，应使用 `.opencode/references/mes-ai-reference/templates/governance/next-step-recommendation-template.md`

## 编排流程

```
┌─────────────────────────────────────────────────────────────┐
│                     知识库刷新流程                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 0: 预算与门禁预检（不可跳过）                            │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │mes-guard-context-│  │mes-verify-phase-gate │                 │
│  │    budget        │  │                  │                 │
│  │──评估上下文预算  │  │──检查进入条件    │                 │
│  │──超限→强制拆分  │  │──不通过→阻止进入 │                 │
│  └──────────────────┘  └──────────────────┘                 │
│  ⚠️ 任一检查不通过 = 暂停执行，输出原因和处理建议              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 1: 变更检测                                            │
│  ┌─────────────┐                                             │
│  │refresh-     │ ──优先读取 state.yaml.sync；缺失时视为需先修复统一状态源 │
│  │detect-      │ ──获取Git变更历史                           │
│  │ changes     │ ──分类变更文件：新增/修改/删除               │
│  │             │ ──识别影响范围                               │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate A: Phase 1 输出审查                               │
│  ──变更检测不完整/分类错误 → 打回 Phase 1 重做                  │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 2: 并行更新                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │refresh-     │  │refresh-     │  │refresh-     │          │
│  │update-      │  │update-      │  │update-      │          │
│  │ code-map    │  │ dependency  │  │ api-registry│          │
│  │             │  │             │  │             │          │
│  │ 更新代码地图│  │ 更新依赖关系│  │ 更新API注册│          │
│  │             │  │             │  │             │          │
│  │ -服务索引  │  │ -服务依赖  │  │ -API清单  │          │
│  │ -模块索引  │  │ -前后端映射│  │ -变更历史│          │
│  │ -总览文件  │  │ -数据库注册│  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate B: Phase 2 输出审查                               │
│  ──局部更新结果未通过 → 仅打回失败分支或当前阶段重做            │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Phase 3: 人工补录队列闭环检查（新增）                            │
│  ┌─────────────┐                                             │
│  │             │ ──读取 manual-review-queue.md               │
│  │             │ ──检查补录项状态                              │
│  │             │ ──统计待补录/已补录数量                       │
│  │             │ ──若待补录>10项 → 提示人工处理                 │
│  │             │ ──若待补录≤10项 → 自动标记为可继续              │
│  └─────────────┘                                             │
│                                                             │
│  ⚠️ 大量待补录项可能影响知识库质量，需人工介入                    │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Step Gate C: Phase 3 输出审查                               │
│  ──补录队列闭环未达标 → 打回 Phase 2/3 继续处理                 │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ✅ 知识库刷新完成
```

## 多Agent并行编排策略

| Phase | 可并行 | 说明 |
|-------|--------|------|
| Phase 1: 变更检测 | 否 | 必须先获取变更列表 |
| Phase 2: 并行更新 | ✅ 三路并行 | 代码地图、依赖关系、API注册表可并行更新 |

Agent分配:
- Phase 2: 3个 mes-knowledge-refresh Agent并行

task()调用示例:

```
task(category="deep", load_skills=["mes-refresh-update-code-map"], run_in_background=true,
     prompt="更新代码地图。\n变更列表: mes-ai-dev/workspace/refresh/change-list.md\n输出: mes-ai-dev/knowledge/code-map/")

task(category="deep", load_skills=["mes-refresh-update-dependency"], run_in_background=true,
     prompt="更新依赖关系。\n变更列表: mes-ai-dev/workspace/refresh/change-list.md\n输出: mes-ai-dev/knowledge/dependency-graph/")

task(category="deep", load_skills=["mes-refresh-update-api-registry"], run_in_background=true,
     prompt="更新API注册表。\n变更列表: mes-ai-dev/workspace/refresh/change-list.md\n输出: mes-ai-dev/knowledge/dependency-graph/api-registry.md")
```

结果合并:
- 全部完成后由主控 Agent 串行汇总结果
- 同步状态写入、摘要视图刷新与共享文件串行更新规则，统一遵循 `AGENTS.md` §10、多 Agent 协作规则，以及 `mes-ai-dev/knowledge/rules/state-rendering-spec.md`
- 本命令特有约束只有两点：
  1. 仅刷新受影响部分，不做全量重建
  2. 单路更新失败可单独重试，成功分支结果必须保留
  3. 若刷新影响全局共享文件或热点层，应提示后续重新执行 `/mes-init-converge`

## 人工审核门禁

本命令在以下节点**必须等待用户确认**后才能继续。AI不得自动跳过任何门禁。

### 门禁点

| 节点 | 审核内容 | 必须确认的问题 |
|------|---------|--------------|
| Phase 1完成后 | 变更清单 | 变更检测是否完整？分类是否准确？ |
| Phase 2完成后 | 更新结果 | 知识库更新是否正确？有无遗漏？ |

### 门禁执行规则

1. 每个门禁点完成后，主控Agent必须**暂停并输出审核摘要**，等待用户明确回复"确认"或"继续"
2. 用户可以回复"确认"继续，或提出修改意见
3. 用户未确认时，不得进入下一阶段
4. 审核摘要应包含：本阶段产出清单、关键决策点、发现的问题

## 阶段完成产物报告要求

知识刷新阶段退出前，必须基于正式产物清单生成 `stage-output-report.md` 或等价阶段完成产物报告，至少覆盖：

- `change-list.md`
- `semantic-changes.md`（若命中语义变更检测）
- 更新后的 `backend-overview.md` / `frontend-overview.md`（若命中）
- 更新后的服务/模块索引（若命中）
- 更新后的 `service-dependencies.md`
- 更新后的 `frontend-backend-map.md`
- 更新后的 `database-registry.md`
- 更新后的 `api-registry.md`
- 更新后的 `state.yaml` / `summary.md`
- 与刷新相关的门禁记录 / 质量校验记录

报告中必须明确：
- 每个文件或产物组的作用
- 哪些文件已生成或已更新
- 哪些文件未生成或未更新
- 未生成/未更新是否因“不适用 / 本次未命中影响范围 / 由后续 mes-init-converge 承接 / 待人工补录 / 被门禁阻断”等原因
- 未生成/未更新是否影响知识刷新完成结论

## 执行计划模板

执行前需输出计划供用户确认：

```markdown
## 执行计划

**目标**：刷新知识库，增量更新代码地图和依赖关系

**步骤**：
1. 变更检测：检测代码变更，分类为新增/修改/删除
2. 并行更新：**三Agent并行**——代码地图、依赖关系、API注册表

**预期产出**：
- change-list.md（变更文件清单）
- 更新后的代码地图文件
- 更新后的依赖关系文件
- 更新后的API注册表
- 更新后的状态摘要
- refresh-review-report.md（阶段详细审查报告，强制）

**风险评估**：
- 大量变更可能耗时较长
- 需要确保Git状态正常
```

## 输出目录结构

```
mes-ai-dev/workspace/refresh/
├── change-list.md              # 变更文件清单
├── semantic-changes.md         # 语义变更检测结果
└── refresh-review-report.md    # 阶段详细审查报告（强制产物）

mes-ai-dev/knowledge/
├── state/
    └── state.yaml              # 主写入：更新 sync 节点
    └── summary.md              # 人工摘要
├── code-map/
│   ├── backend-overview.md     # 更新后的后端总览
│   ├── frontend-overview.md    # 更新后的前端总览
│   ├── services/               # 更新后的服务索引
│   └── modules/                # 更新后的模块索引
└── dependency-graph/
    ├── service-dependencies.md # 更新后的服务依赖
    ├── frontend-backend-map.md # 更新后的前后端映射
    ├── database-registry.md    # 更新后的数据库注册
    └── api-registry.md         # 更新后的API注册表
```

## 注意事项

1. **增量更新**：只处理变更部分，不执行全量重建
2. **并行执行**：Phase 2 三部分更新可并行执行
3. **首次同步**：若无 state.yaml，建议使用 `/mes-init-project` 而非刷新
4. **变更验证**：刷新后检查变更是否正确同步
5. **状态与摘要视图规则**：统一遵循 `mes-ai-dev/knowledge/rules/state-rendering-spec.md`，本命令不重复定义字段与渲染协议
