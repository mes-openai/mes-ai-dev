# MES-AI-DEV 核心能力详细说明

> 本文档为 README 中"核心能力速览"的详细展开版

---

## 1. SDD：规格驱动开发

骨架默认采用 **Spec-Driven Development**：

- 先需求、后设计、再开发、再测试、再交付
- 每个阶段都有明确输入、输出、门禁与审查
- 不允许"需求未清楚就直接写代码"的无约束推进

这使 AI 的工作不只是生成内容，而是进入可治理的阶段化研发流程。

---

## 2. Harness Engineering：把 AI 变成可控执行单元

骨架并不把 AI 当"自由发挥的黑盒助手"，而是通过：

- 命令 / Skill / 模板 / 门禁 / 状态 / 交接文件
- 局部产物 + 主控收口
- 审查结果 + 证据链 + 留痕

把 AI 约束在可检查、可复盘、可追责的工程支架内。

---

## 3. GSD（Get Shit Done）执行增强模式

骨架支持 **Strict 模式** 与 **GSD 模式** 双轨运行：

- 高风险场景走完整治理链
- 目标明确、范围可控时走 GSD 模式
- GSD 不是跳过治理，而是强调 blocker 分类、最小可交付、后补动作和收尾闭环

这让骨架既能做复杂项目的严格治理，也能做真实现场中的高效推进。

### 何时必须使用 Strict 模式

以下场景**不得擅自降级为 GSD**：

- 数据库结构破坏性变更
- `state.yaml` 主状态模型变更
- `/mes-init-converge` 或共享收口规则变更
- 高风险安全变更
- 关键发布路径
- 骨架主规则新增/删除/重构
- 用户明确要求严格按阶段执行

> GSD 详细规则：[`mes-ai-dev/knowledge/rules/scenarios/scenario-gsd.md`](../rules/scenarios/scenario-gsd.md)

---

## 4. ADR：决策可追溯

骨架要求关键设计决策、架构取舍和跨服务变更具备清晰决策记录。

不是只记录"最后选了什么"，而是记录：

- 为什么需要做决策
- 备选方案是什么
- 为什么选当前方案
- 对后续阶段和目标仓结构有什么影响

这使决策不会只存在于聊天或个人记忆里。

> ADR 记录 Skill：先读 [`mes-design-record-decisions/SKILL.md`](../../../.opencode/skills/mes-design-record-decisions/SKILL.md)，再按目录化结构进入 [`mes-design-record-decisions/INDEX.md`](../../../.opencode/skills/mes-design-record-decisions/INDEX.md) 与命中的 `modules/*.md`。

---

## 5. 长上下文管理

面对大仓 / 超大仓，骨架默认采用：

- **四层索引架构**：第 0 层总览 → 第 1 层索引 → 第 1.5 层文件摘要 → 第 2 层精准代码
- **热点优先**：高频率入口点优先消费
- **上下文预算守卫**：每阶段有预算阈值，超限强制裁剪
- **局部结果 + 主控收口**：并行 Agent 只写局部，主控串行收口

它不是暴力读全仓，而是围绕目标做受控消费。

> 知识消费规则：[`mes-ai-dev/knowledge/reference/knowledge-consumption/index.md`](knowledge-consumption/index.md)

---

## 6. 阶段记忆持久化

MES-AI-DEV 不只保存阶段产物，还将需求分析、详细设计、代码开发、测试验证、发布交付等阶段中的：

- 关键决策
- blocker 与代偿动作
- 历史坑点
- 可复用模式
- 下一阶段交接信息

结构化沉淀为**阶段记忆**。

这些阶段记忆不是静态归档，而是后续阶段的默认输入，用于：

- 恢复上下文
- 继承上一阶段已确认约束
- 识别历史坑点，避免重复犯错
- 将局部经验升级为全局可复用规则

这使骨架不是"做完一个需求再从头摸索"，而是**随着需求推进不断积累执行经验，越做越稳**。

> 阶段记忆治理：[`mes-ai-dev/knowledge/reference/stage-memory-governance.md`](stage-memory-governance.md)

---

## 7. 阶段产物分类管理

骨架不再把同一需求某阶段的大量文件平铺堆放，而是在原有 `REQ-XXXX` 目录下做分类管理：

| 目录 | 用途 |
|------|------|
| `deliverable/` | 正式交付物 |
| `report/` | 阶段完成产物报告、详细审查报告、步骤门禁报告 |
| `evidence/` | 证据链与验证材料 |
| `handoff/` | 阶段交接与恢复入口 |
| `memory/` | 坑点台账、决策日志、阻塞台账 |
| `working/` | 草稿与中间工作文件 |

**好处**：

- 阶段产物不混杂
- 交接入口稳定
- 记忆与证据可直接定位

> 产物布局标准：[`mes-ai-dev/knowledge/rules/governance/stage-artifact-layout.md`](../rules/governance/stage-artifact-layout.md)

---

## 8. 目标仓结构完全对齐

骨架只管理过程产物、治理规则和知识索引，**不替代目标仓真实结构**。

一旦进入涉及代码仓的分析、设计、开发、测试或交付阶段，必须以目标仓真实的：

- 服务边界
- 模块边界
- 包结构
- 目录结构
- Schema 结构

为唯一事实来源。

初始化阶段必须补齐后续阶段所需的结构化事实，而不是只生成一个粗略概览。

---

## 相关文档索引

| 能力 | 相关规则/文档 |
|------|---------------|
| SDD | [`phase-analyze.md`](../rules/phases/phase-analyze.md)、[`phase-design.md`](../rules/phases/phase-design.md) |
| Harness Engineering | [`agent-core.md`](../rules/core/agent-core.md)、[`execution-baseline.md`](../rules/core/execution-baseline.md) |
| GSD | [`scenario-gsd.md`](../rules/scenarios/scenario-gsd.md) |
| ADR | [`mes-design-record-decisions/SKILL.md`](../../../.opencode/skills/mes-design-record-decisions/SKILL.md) + [`mes-design-record-decisions/INDEX.md`](../../../.opencode/skills/mes-design-record-decisions/INDEX.md) |
| 长上下文管理 | [`knowledge-consumption/index.md`](knowledge-consumption/index.md)、[`budget-audit-rules.md`](../rules/budget-audit-rules.md) |
| 阶段记忆 | [`stage-memory-governance.md`](stage-memory-governance.md) |
| 产物分类 | [`stage-artifact-layout.md`](../rules/governance/stage-artifact-layout.md) |
| 目标仓对齐 | [`phase-init.md`](../rules/phases/phase-init.md) |
