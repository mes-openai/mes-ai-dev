# SDK 与项目侧路径边界矩阵

> 本文件定义骨架 SDK 静态引用、项目过程产物、初始化/刷新型项目知识库之间的路径边界。后续新增或迁移骨架文档时，必须先按本矩阵判断路径归属。

---

## 一、核心原则

1. **SDK 静态引用可覆盖**：`.opencode/references/mes-ai-reference/**` 可随 SDK 发布直接覆盖升级，只存放静态规则、参考、模板和治理文档。
2. **项目产物不可覆盖**：`mes-ai-dev/workspace/**` 和阶段产物目录承载项目执行过程与交付结果，不得被 SDK 升级覆盖。
3. **刷新型知识不可固化进 SDK**：由 `/mes-init-project`、`/mes-refresh-knowledge` 或相关 `mes-init-*` / `mes-refresh-*` Skill 生成、刷新、收口的知识，必须保留在 `mes-ai-dev/knowledge/**` 项目侧路径。
4. **模板位置不等于输出位置**：模板可以位于 SDK 静态区，但模板实例输出必须写入项目侧路径。
5. **禁止位置相对解析**：在 SDK 静态区文档中出现的过程产物路径必须显式写为 `mes-ai-dev/workspace/...` 或既有项目侧目录，不得写裸 `workspace/...`、`report/...`、`memory/...`、`refresh/...`。

---

## 二、路径边界矩阵

| 类型 | 路径 | 是否可随 SDK 覆盖 | 是否运行时写入 | 说明 |
|---|---|---:|---:|---|
| SDK 静态规则 | `.opencode/references/mes-ai-reference/rules/**` | 是 | 否 | 核心、阶段、场景、治理等静态规则。 |
| SDK 静态参考 | `.opencode/references/mes-ai-reference/reference/**` | 是 | 否 | 加载矩阵、门禁、消费规则、维护指南等静态参考。 |
| SDK 静态模板 | `.opencode/references/mes-ai-reference/templates/**` | 是 | 否 | 模板源文件；模板实例不得写回本目录。 |
| SDK 项目知识结构模板 | `.opencode/references/mes-ai-reference/templates/reference/**`、`.opencode/references/mes-ai-reference/templates/rules/**` | 是 | 否 | 用于生成项目侧 reference/rules 知识产物的结构模板。 |
| 项目过程产物 | `mes-ai-dev/workspace/**` | 否 | 是 | 需求、设计、开发、测试、交付、审查、memory、refresh 日志等过程产物。 |
| 阶段主交接文档 | `mes-ai-dev/workspace/{phase}/{REQ-ID}/...` 或既有阶段目录 | 否 | 是 | `spec.md`、`design.md`、`tasks.md`、`test-report.md`、`handover-doc.md` 等。 |
| 初始化/刷新代码地图 | `mes-ai-dev/knowledge/code-map/**` | 否 | 是 | 初始化或刷新代码仓后形成的项目事实。 |
| 初始化/刷新依赖图谱 | `mes-ai-dev/knowledge/dependency-graph/**` | 否 | 是 | 服务依赖、API 注册、数据库归属、前后端映射等项目事实。 |
| 初始化/刷新数据库索引 | `mes-ai-dev/knowledge/database-index/**` | 否 | 是 | Schema、表、字段、关系等项目事实。 |
| 初始化/刷新知识片段 | `mes-ai-dev/knowledge/fragments/**` | 否 | 是 | 多仓/分批/多 session 初始化或刷新产生的待收口局部知识。 |
| 刷新型业务参考 | `mes-ai-dev/knowledge/reference/terminology-glossary.md` 等 | 否 | 是 | 由代码仓初始化/刷新维护，不得迁入 SDK。 |
| 刷新型规则知识 | `mes-ai-dev/knowledge/rules/api-conventions.md` 等 | 否 | 是 | 从项目真实代码风格与契约中沉淀，不得迁入 SDK。 |

---

## 三、刷新型知识白名单

以下文件即使被 SDK 静态规则、Skill 或 Command 引用，也必须保持项目侧路径：

- `mes-ai-dev/knowledge/reference/terminology-glossary.md`
- `mes-ai-dev/knowledge/reference/domain-model.md`
- `mes-ai-dev/knowledge/reference/data-dictionary.md`
- `mes-ai-dev/knowledge/reference/enum-registry.md`
- `mes-ai-dev/knowledge/reference/error-code-registry.md`
- `mes-ai-dev/knowledge/reference/permission-matrix.md`
- `mes-ai-dev/knowledge/rules/api-conventions.md`
- `mes-ai-dev/knowledge/rules/coding-standards.md`

上述文件的结构模板位于 SDK 静态区：

- `.opencode/references/mes-ai-reference/templates/reference/terminology-glossary-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/domain-model-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/data-dictionary-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/enum-registry-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/error-code-registry-template.md`
- `.opencode/references/mes-ai-reference/templates/reference/permission-matrix-template.md`
- `.opencode/references/mes-ai-reference/templates/rules/api-conventions-template.md`
- `.opencode/references/mes-ai-reference/templates/rules/coding-standards-template.md`

规则：**模板可随 SDK 覆盖升级；项目侧生成/刷新结果不得随 SDK 覆盖。**

---

## 四、禁止写入 SDK 静态区的路径形态

SDK 静态区下不得出现以下运行态目录或文件：

- `.opencode/references/mes-ai-reference/workspace/**`
- `.opencode/references/mes-ai-reference/report/**`
- `.opencode/references/mes-ai-reference/memory/**`
- `.opencode/references/mes-ai-reference/refresh/**`
- `.opencode/references/mes-ai-reference/requirements/**`
- `.opencode/references/mes-ai-reference/designs/**`
- `.opencode/references/mes-ai-reference/development/**`
- `.opencode/references/mes-ai-reference/testing/**`
- `.opencode/references/mes-ai-reference/delivery/**`
- `.opencode/references/mes-ai-reference/emergency/**`
- `.opencode/references/mes-ai-reference/spec.md`
- `.opencode/references/mes-ai-reference/design.md`
- `.opencode/references/mes-ai-reference/tasks.md`
- `.opencode/references/mes-ai-reference/test-report.md`
- `.opencode/references/mes-ai-reference/handover-doc.md`

> 例外：`reference/phase-gates/design.md`、`reference/knowledge-consumption/stage-memory.md` 这类文件名与阶段产物同名，但语义是静态规则分片，可保留在 SDK 静态区。

---

## 五、审查门禁

每次涉及骨架路径、模板、规则入口或知识结构调整时，至少检查：

1. 是否把静态 SDK 依赖放入 `.opencode/references/mes-ai-reference/**`。
2. 是否把项目过程产物继续写入 `mes-ai-dev/workspace/**` 或既有项目侧目录。
3. 是否把初始化/刷新型知识继续写入 `mes-ai-dev/knowledge/**`。
4. 是否存在裸 `workspace/`、`report/`、`memory/`、`refresh/` 导致按 SDK 文档位置误解析。
5. 是否存在将刷新型知识误迁入 SDK 静态区的情况。
6. 是否存在 Markdown 链接因文档迁移产生的相对路径断链。
