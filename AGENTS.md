# MES-AI-DEV 项目规则（精简总则）

> 本文件为 MES-AI-DEV 的常驻总则。只保留必须常驻的治理约束、执行模型与规则入口。各阶段细则、特殊场景细则、审查结构、目录布局、共享知识写入等详细规则，统一以下沉文件为准。

## 骨架版本信息

- **当前骨架版本**：v0.1.8
- **最近修改时间**：2026-05-13 11:47:22
- **时间精度**：秒
- **时区**：Asia/Shanghai

---

## 一、项目概况

- **项目名称**：MES-AI-DEV（AI驱动的MES系统开发框架）
- **架构类型**：前后端分离
- **后端代码仓**：`jalor/`
- **前端代码仓**：`web/`
- **数据库脚本仓**：`dbscript/`
- **骨架工作目录**：`mes-ai-dev/`
- **SDK 静态引用目录**：`.opencode/references/mes-ai-reference/`

---

## 二、核心铁律（不可违反）

### 2.1 计划先行
- 初始化阶段（`/mes-init-project`、`/mes-init-enrich`、`/mes-init-converge` 及相关 `mes-init-*` Skill）可在输出计划后自动继续执行。
- 除初始化阶段外，所有阶段均须先输出计划，待用户确认后继续执行。
- 计划至少包含：目标、步骤、预期产出、风险评估。

### 2.2 结果审核
- 所有结果输出前必须审核逻辑正确性、与现有代码一致性、完整性。
- 所有步骤级输出在进入下一步骤前必须通过适用门禁审查。
- 审查不通过时必须返工，不得将未通过结果注入下游。
- 详细审查与门禁规则见：`.opencode/references/mes-ai-reference/rules/governance/index.md`。

### 2.3 中文输出
- 所有 `.md` 文件均使用中文输出。
- 代码注释使用中文。
- Skill/Command 的 description 可使用英文。

### 2.4 命名规范
- 所有骨架 skill、command、agent 必须使用 `mes-` 前缀。
- 命名格式：`mes-{动词}-{名词}`。
- 命名模式：`^mes-[a-z0-9]+(-[a-z0-9]+)*$`。

### 2.4.1 Skill 目录化原则
- 所有骨架 Skill 必须保持目录化结构，不得回退为单文件 Skill。
- Skill 详细结构见：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`。
- Skill 消费规范见：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`。

### 2.5 骨架修改留痕
- 修改骨架文件（规则、模板、命令、知识结构、状态规范、示例文件等）时，必须同步更新：`mes-ai-dev/workspace/refresh/skeleton-change-log.md`。
- 后续任何骨架修改，必须同步更新本文件“骨架版本信息”中的“当前骨架版本”和“最近修改时间”，最近修改时间精确到秒。
- 若变更涉及标准产物、目录职责、标准文件名或产物说明，需同步刷新相关入口与说明文档。
- 版本号递增规则与骨架修改详细治理要求见：`.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`。

### 2.5.1 SDK 引用与项目产物解耦
- `.opencode/references/mes-ai-reference/` 仅存放随 SDK 发布和覆盖升级的静态规则、参考、模板与治理文档。
- 项目过程产物仍写入 `mes-ai-dev/workspace/` 及现有阶段产物目录，不得写入 SDK 静态引用目录。
- 初始化/刷新代码仓生成的项目知识库仍写入 `mes-ai-dev/knowledge/` 既有路径，不得迁移到 SDK 静态引用目录。
- 由初始化/刷新维护的知识文件（如术语表、领域模型、数据字典、枚举注册表、错误码注册表、API 规范、编码规范、权限矩阵等）即使被 Skill 或规则引用，也必须保持项目侧路径。
- 骨架文档迁移或新增时，必须区分“读取 SDK 静态引用”和“写入/读取项目产物、刷新型知识库”，避免相对路径因文档位置变化而落入 `.opencode/references/mes-ai-reference/`。

### 2.6 执行模式
骨架支持两种执行模式：
- **Strict**：完整治理优先。
- **GSD**：目标驱动、效率优先，但治理不失真。

以下场景必须使用 Strict，不得擅自降级为 GSD：
- 数据库结构破坏性变更
- `state.yaml` 主状态模型变更
- `/mes-init-converge` 或共享收口规则变更
- 高风险安全变更
- 关键发布路径
- 骨架主规则新增/删除/重构
- 用户明确要求严格按阶段执行

GSD 详细规则见：`.opencode/references/mes-ai-reference/rules/scenarios/index.md`。

---

## 三、默认执行模型

### 3.1 意图判定
收到请求后，优先判定当前意图属于以下哪类：
- 解释/说明
- 调查/研究
- 评估/方案判断
- 设计
- 实现/修改
- 修复
- 重构/开放式改进

规则：
- 若当前请求是解释、调查、评估、方案讨论，则默认只分析，不进入实现。
- 若当前请求明确要求实现、修改、修复，且范围足够清晰，方可进入实现前检查。
- 若范围不清、存在关键歧义或显著工作量分歧，必须先澄清。
- 若用户方案明显违背现有模式或存在高风险，应先提出 concern，再等确认。

### 3.2 最小安全红线
- 不得猜测未读取代码。
- 不得擅自 commit 或 push。
- 不得使用 `as any`、`@ts-ignore`、`@ts-expect-error` 压制问题。
- 不得删除失败测试来伪造通过。
- 不得在关键验证缺失时宣告完成。
- 不得在依赖 Oracle 结论时提前输出最终结论。
- 不得跳过关键风险说明、关键留痕与关键门禁。

### 3.3 分层加载顺序
默认按以下顺序加载规则与上下文：
1. **Core 常驻规则**
2. **当前阶段规则（Phase）**
3. **命中的场景规则（Scenario）**
4. **需要时加载具体 Skill / 模板 / 详细规则**
5. **再按知识消费矩阵读取知识库内容**

运行时最小入口与索引见：
- `.opencode/references/mes-ai-reference/rules/index.md`
- `.opencode/references/mes-ai-reference/reference/index.md`

### 3.4 上下文消费原则
- 永远不全量读取代码目录。
- 优先按知识分层消费：overview → index → detail/file-summaries → 精准源码。
- 涉及多个服务/模块时分批处理。
- 跨阶段或跨 Agent 交接通过 `workspace/` 文件完成，不依赖对话历史。
- 具体消费规则优先以 `.opencode/references/mes-ai-reference/reference/index.md` 与 `.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md` 为入口按需读取。

---

## 四、规则入口索引

- Rules 总入口：`.opencode/references/mes-ai-reference/rules/index.md`
- Core 规则索引：`.opencode/references/mes-ai-reference/rules/core/index.md`
- Phase 规则索引：`.opencode/references/mes-ai-reference/rules/phases/index.md`
- Scenario 规则索引：`.opencode/references/mes-ai-reference/rules/scenarios/index.md`
- Governance 规则索引：`.opencode/references/mes-ai-reference/rules/governance/index.md`

---

## 五、知识与规则参考入口

- Reference 总入口：`.opencode/references/mes-ai-reference/reference/index.md`
- 知识消费入口：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- 阶段门禁入口：`.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- 骨架加载矩阵：`.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
- SDK 与项目侧路径边界矩阵：`.opencode/references/mes-ai-reference/reference/sdk-project-path-boundary.md`

---

## 六、阶段共通底线

### 6.1 进入前
进入任一消费类阶段前，应确认：
- 前置输入基本齐备
- 当前阶段目标明确
- 已完成阶段计划
- 已通过适用的进入门禁

### 6.2 执行中
- 每个步骤输出进入下一步骤前，必须执行适用的门禁检查。
- 不通过时必须返工，不得继续推进。
- 阶段细则与场景细则按需加载，不得默认把所有规则常驻。

### 6.3 退出前
每个阶段退出前，至少应完成：
- `report/stage-output-report.md`
- 一份符合标准的详细审查报告
- 符合 OpenSpec 的阶段主交接文档（如 `spec.md`、`design.md`、`tasks.md`、`test-report.md`、`handover-doc.md`）
- 必要的 memory 台账更新

详细要求见：
- `.opencode/references/mes-ai-reference/rules/governance/index.md`

---

## 七、多 Agent 协作总原则

- 主控 Agent 负责拆分、并行编排、冲突仲裁与结果收口。
- 并行 Agent 只写各自局部结果，不直接写共享知识文件。
- 共享知识文件统一由主控串行收口。
- 并行机会、交接约束、共享写入与升级路径按下沉规则执行。

详细规则入口：
- `.opencode/references/mes-ai-reference/rules/governance/shared-knowledge-write-policy.md`
- `.opencode/references/mes-ai-reference/reference/exception-handbook.md`

---

## 八、后端与前端识别约定

### 8.1 后端约定
- 若仓库包含 `pom.xml` 且依赖 Jalor 框架，则视为后端微服务仓库。
- 微服务间调用关系优先在 `resource/restService.properties` 中识别。
- Jalor 默认分层：controller / service / dao / entity / dto / vo / config。

### 8.2 前端约定
- 若仓库包含 `package.json` 且使用 Vue，则视为前端仓库。
- 路由配置优先在 `src/router/`。
- 公共组件优先在 `src/components/`。
- API 调用层优先在 `src/api/`。

### 8.3 前后端映射入口
- `mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md`

---

## 八点五、Skill 消费原则

- Skill 作为目录化能力消费时，应按“先索引、后模块、按需深入”的原则读取。
- 不得把 Skill 细则全文常驻；应按当前任务范围精确加载命中模块。
- Skill 结构与消费细则按需参考对应治理文档：
  - `.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
  - `.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`

---

## 九、特殊场景按需加载

以下场景不应默认全文常驻，应命中条件后再加载对应规则：
- 迭代需求：按分析阶段规则与相关 Skill 处理。
- 多仓协同：`.opencode/references/mes-ai-reference/rules/scenarios/index.md`
- 跨阶段变更：`.opencode/references/mes-ai-reference/rules/scenarios/index.md`
- 数据库迁移与回滚：`.opencode/references/mes-ai-reference/rules/scenarios/index.md`
- 锁冲突与强制接管：`.opencode/references/mes-ai-reference/rules/scenarios/index.md`
- 初始化状态片段与统一收口：`.opencode/references/mes-ai-reference/rules/phases/index.md` 与 `.opencode/references/mes-ai-reference/rules/scenarios/index.md`

---

## 十、移植配置（可选保留）

- 项目画像与移植配置见：`mes-ai-dev/config/project-profile.yaml`
