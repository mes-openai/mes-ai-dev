# 骨架加载矩阵

## 一、加载层级

1. **Core**：默认常驻
2. **Phase**：按当前阶段加载
3. **Phase Gate / Consumption 分片**：按当前阶段与当前问题范围加载
4. **Scenario**：命中特殊条件才加载
5. **Skill / Template / Detailed Rule**：执行时再加载

---

## 二、摘要优先与分片优先原则

1. 规则存在“总索引 + 分片”结构时，默认先加载总索引，再加载当前阶段分片。
2. 不再把 `phase-gates.md`、`knowledge-consumption-matrix.md` 作为默认整份必读入口；应优先使用：
   - `.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
   - `.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
   - `.opencode/references/mes-ai-reference/reference/phase-gates/<当前阶段>.md`
   - `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
   - `.opencode/references/mes-ai-reference/reference/knowledge-consumption/<当前主题>.md`
3. 非当前阶段门禁分片默认不加载。
4. 非当前问题范围的消费矩阵主题分片默认不加载。
5. 场景规则只在命中特殊条件时加载，不得因为“保险起见”默认全文常驻。
6. 骨架文档若嵌入加载元信息，优先读取元信息块判断是否需加载正文；元信息格式见 `.opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md`。
7. 若关键定义位于 SDK / common / shared / integration / 外部依赖中，应优先加载 `.opencode/references/mes-ai-reference/reference/knowledge-consumption/contracts.md`，再按需进入 `.opencode/references/mes-ai-reference/rules/scenarios/scenario-external-contract-source.md`，不得直接从业务接口表象反推契约。
8. 设计阶段若需生成设计文档，必须先完成 overview → index → detail/file-summaries → 精准源码 的知识消费顺序；不得跳过 overview 与 index 直接产出设计。
9. Skill 采用目录化结构时，默认读取顺序必须为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 或其他可选目录。
10. 不得因为 Skill 已拆分为目录结构，就把整组 `modules/` 正文默认常驻；仍应按当前任务范围精确加载。

---

## 三、阶段加载矩阵

| 阶段 | 必载 Core | 必载 Phase | 必载门禁分片 | 默认消费分片 | 条件加载 | 默认不加载 |
|---|---|---|---|---|---|---|
| init | agent-core, safety-redlines, execution-baseline | phase-init | index, common, init | index, state, rules | state-migration, shared-knowledge-converge, lock-conflict, gsd | deliver/test 门禁、无关 reference 分片 |
| analyze | agent-core, intent-gate, execution-baseline | phase-analyze | index, common, analyze | index, state, reference, contracts, convergence | multi-repo, external-contract-source, gsd, cross-stage-change | init 收敛细则、high-risk-release、无关 database-index |
| design | agent-core, intent-gate, execution-baseline | phase-design | index, common, design | index, rules, reference, parameter-switch-patterns, contracts, dependency-graph | multi-repo, external-contract-source, db-migration, gsd, cross-stage-change, high-risk-release | init 收敛细则、无关 stage-memory |
| develop | agent-core, safety-redlines, completion-baseline | phase-develop | develop（按需）, common | rules, stage-memory | multi-repo, db-migration, lock-conflict, gsd, cross-stage-change | 非当前阶段 gate、无关 consumption 分片 |
| test | agent-core, completion-baseline | phase-test | index, common, test | index, stage-memory, code-map, convergence | db-migration, multi-repo, gsd, high-risk-release | init 收口细则、无关 database-index |
| deliver | agent-core, completion-baseline | phase-deliver | index, common, deliver | index, state, convergence, stage-memory | db-migration, multi-repo, gsd, high-risk-release | 无关 analyze/design gate、无关 code-map detail |
| refresh | agent-core, execution-baseline | phase-refresh | refresh（按需）, common | state, code-map, dependency-graph | shared-knowledge-converge, lock-conflict, gsd | deliver/test 全阶段正文 |
| emergency | agent-core, safety-redlines, completion-baseline | phase-emergency | emergency（按需）, common | state, stage-memory | db-migration, high-risk-release, gsd | init 收口细则、无关全局消费分片 |

说明：

- `index` / `common` 指 `.opencode/references/mes-ai-reference/reference/phase-gates/` 目录下的总索引与通用门禁分片
- `state` / `rules` / `reference` 等指 `.opencode/references/mes-ai-reference/reference/knowledge-consumption/` 目录下的主题分片
- `parameter-switch-patterns` 指 `.opencode/references/mes-ai-reference/reference/parameter-switch-patterns.md`，用于参数开关三种模式、复用优先级与取值来源判断
- `contracts` 指 `.opencode/references/mes-ai-reference/reference/knowledge-consumption/contracts.md`，用于统一响应、错误码、SDK 模型、认证/MQ 等契约级知识消费
- develop / refresh / emergency 阶段的门禁分片可按具体任务判断是否必须单独加载，但默认仍不得整份读取旧总表

---

## 四、禁止常驻原则

以下内容默认不得常驻，除非明确命中场景或当前阶段直接需要：

- GSD 细则全文
- 初始化收口细则
- 状态迁移全文
- 高风险发布全文
- 锁冲突恢复细则
- 共享知识写入细则全文
- 非当前阶段门禁分片
- 非当前问题范围的消费矩阵分片
- 模板正文
- Skill 详细说明与 `modules/` 全量正文

---

## 五、阶段默认白名单与黑名单

### 5.1 白名单优先原则

任一阶段默认只允许加载以下内容：

1. 运行入口文件（`.opencode/references/mes-ai-reference/rules/core/runtime-entry.md`）
2. Core 常驻规则
3. 当前阶段规则
4. 当前阶段门禁索引、通用门禁、当前阶段门禁分片
5. 知识消费索引与当前问题范围命中的消费分片
6. 明确命中的 Scenario 规则
7. 当前任务明确需要的 Skill / Template / Reference 分片

设计阶段补充要求：

- 生成设计文档前必须先读取 `knowledge/code-map/backend-overview.md` 与 `knowledge/code-map/frontend-overview.md`
- 命中参数开关场景时必须读取 `.opencode/references/mes-ai-reference/reference/parameter-switch-patterns.md`
- 必须先完成服务/模块/Schema/路由定位，再进入 detail、file-summaries 或精准源码

除白名单外，其余文档默认不得进入上下文。

### 5.2 默认黑名单

以下内容默认禁止全文进入上下文，除非明确命中触发条件：

- `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`
- `.opencode/references/mes-ai-reference/rules/artifact-standards.md`
- `.opencode/references/mes-ai-reference/reference/dod-definition-guide.md`
- `.opencode/references/mes-ai-reference/reference/blocker-handling-guide.md`
- `.opencode/references/mes-ai-reference/reference/team-onboarding-guide.md`
- `.opencode/references/mes-ai-reference/reference/stage-memory-governance.md`
- `.opencode/references/mes-ai-reference/reference/status-tracker-governance.md`
- `templates/**/*.md` 正文
- 非当前阶段门禁分片
- 非当前问题范围的知识消费分片
- `knowledge/code-map/` 整目录
- `knowledge/dependency-graph/` 整目录
- `knowledge/state/` 整目录

### 5.3 灰名单（索引可见，正文按需）

以下内容允许以索引 / 导航形式进入上下文，但正文不得默认加载：

- `.opencode/references/mes-ai-reference/reference/phase-skill-index.md`
- `templates/template-index.md`
- `.opencode/references/mes-ai-reference/reference/exception-handbook.md`
- `.opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md`
- `.opencode/references/mes-ai-reference/reference/skeleton-maintainer-quick-reference.md`
- `.opencode/references/mes-ai-reference/reference/skeleton-artifact-ownership-guide.md`
- `.opencode/references/mes-ai-reference/reference/stage-artifact-guide.md`

### 5.4 高成本文档的摘要优先规则

若文档满足以下任一条件，应优先读取摘要版而非正文：

- 行数超过 150 行
- 估算 token 超过 2K
- 属于低频治理 / 参考文档
- 容易在执行中被误加载

推荐配套：

- `xxx-summary.md`
- `xxx-load-policy.md`

执行顺序：
1. 先读 summary
2. 若 summary 足够，停止
3. 若 summary 不足，再读正文分片
4. 禁止无条件整篇读取高成本文档

### 5.5 阶段最小加载包

每个阶段应维护自己的最小加载包，作为默认执行基线。
最小加载包必须包含：

- 当前阶段所需的最少 Core 规则
- 当前阶段规则
- 当前阶段门禁
- 当前问题范围最低限度的消费索引

除命中 Scenario 或明确产物任务外，不得突破最小加载包。

### 5.6 预算阈值

- 普通阶段：8K–12K token
- 复杂阶段：12K–16K token
- 超过 16K：必须说明原因并先裁剪加载范围
- 超过 20K：视为过载，必须回退到索引 + 分片模式

### 5.7 文档过载与自动调优接入

当某个骨架文档满足以下任一条件时，应评估是否进入自动调优流程：

- 正文行数、token 或结构复杂度明显超过推荐阈值
- 索引页持续膨胀并承担正文说明职责
- 高成本正文尚未建立摘要优先机制
- 文档元信息缺失，导致加载策略不可判定
- 文档被高频入口引用，且易被误读为默认常驻输入

自动调优与加载矩阵的关系如下：

1. 自动调优不是独立治理体系，而是加载治理的扩展能力
2. 自动调优必须服从本矩阵的白名单 / 黑名单 / 灰名单原则
3. 自动调优优先做“摘要优先、索引化、边界说明、元信息补全”，不优先做正文重写
4. 只有真正高成本、低频、易误读且适合摘要化的正文，才应纳入高成本正文治理
5. 轻量规则、短标准文件、阶段主规则不得因“统一风格”被机械纳入高成本治理机制

自动调优具体判定与动作分级见：
- `.opencode/references/mes-ai-reference/rules/governance/document-auto-optimization-rules.md`
- `.opencode/references/mes-ai-reference/reference/document-auto-optimization-matrix.md`
- `.opencode/references/mes-ai-reference/reference/document-auto-optimization-flow.md`

自动调优若修改骨架文件，仍必须遵守：
- `.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`
- `mes-ai-dev/workspace/refresh/skeleton-change-log.md` 留痕要求

---

## 六、兼容说明

原：

- `.opencode/references/mes-ai-reference/reference/phase-gates.md`
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption-matrix.md`

已降级为兼容导航入口。
若当前任务需要按需加载，应优先从新分片目录进入，而不是整份读取旧文件。

---

## 七、运行时决策入口

分层加载矩阵定义静态规则层级，运行时决策由 `.opencode/references/mes-ai-reference/rules/core/runtime-entry.md` 补充，用于判断：

1. 当前意图类型应扩展加载哪些文档
2. 哪些场景命中触发 Scenario 规则
3. 当前阶段应读取哪些门禁 / 消费分片
4. 是否应先读摘要、再决定是否进入正文

---

## 八、相关参考

- 上下文预算基线：`.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`
- 规则主定义矩阵：`.opencode/references/mes-ai-reference/reference/rule-authority-matrix.md`
- 骨架维护速查：`.opencode/references/mes-ai-reference/reference/skeleton-maintainer-quick-reference.md`
- 骨架产物责任清单：`.opencode/references/mes-ai-reference/reference/skeleton-artifact-ownership-guide.md`
- 阶段产物说明：`.opencode/references/mes-ai-reference/reference/stage-artifact-guide.md`

说明：
- 本文档负责阶段白名单与加载矩阵。
- 预算阈值、预算分层与超预算回退，以预算基线为准。
- 若规则来源发生冲突，以规则主定义矩阵所标识的主定义文件为准。
