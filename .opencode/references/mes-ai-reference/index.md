# MES-AI Reference SDK 静态引用区

> 本目录用于存放 MES-AI-DEV 骨架随 SDK 发布、覆盖升级的静态引用文档。

---

## 一、目录职责

本目录只承载骨架自身运行需要的静态资料：

- `.opencode/references/mes-ai-reference/rules/`：核心规则、阶段规则、场景规则、治理规则等静态规则文档。
- `.opencode/references/mes-ai-reference/reference/`：知识消费、阶段门禁、骨架加载矩阵、异常手册、维护指南等静态参考文档。
- `.opencode/references/mes-ai-reference/templates/`：阶段产物、治理审查、测试交付等模板文件。

---

## 二、不得存放的内容

以下内容不得写入本目录：

- 项目过程产物，例如 `spec.md`、`design.md`、`tasks.md`、`test-report.md`、`handover-doc.md`、阶段报告、审查报告、memory 台账。
- `mes-ai-dev/workspace/` 下的任意运行态文件。
- 初始化或刷新代码仓生成的项目知识库，例如 code-map、dependency-graph、database-index、api-registry、business-flows 等。
- 初始化/刷新维护的业务参考与规范文件，例如：
  - `mes-ai-dev/knowledge/reference/terminology-glossary.md`
  - `mes-ai-dev/knowledge/reference/domain-model.md`
  - `mes-ai-dev/knowledge/reference/data-dictionary.md`
  - `mes-ai-dev/knowledge/reference/enum-registry.md`
  - `mes-ai-dev/knowledge/reference/error-code-registry.md`
  - `mes-ai-dev/knowledge/rules/api-conventions.md`
  - `mes-ai-dev/knowledge/rules/coding-standards.md`
  - `mes-ai-dev/knowledge/reference/permission-matrix.md`

---

## 三、路径使用原则

- 读取骨架静态规则、参考、模板时，使用 `.opencode/references/mes-ai-reference/...`。
- 读取或写入项目过程产物时，使用 `mes-ai-dev/workspace/...` 或既有阶段产物目录。
- 读取或写入初始化/刷新型项目知识库时，使用 `mes-ai-dev/knowledge/...` 既有路径。
- 新增或迁移骨架文档时，不得把相对路径 `mes-ai-dev/workspace/`、`mes-ai-dev/workspace/report/`、`mes-ai-dev/workspace/memory/`、`mes-ai-dev/workspace/refresh/` 解析到本目录下。

---

## 四、主要入口

- Rules 总入口：`.opencode/references/mes-ai-reference/rules/index.md`
- Reference 总入口：`.opencode/references/mes-ai-reference/reference/index.md`
- 知识消费入口：`.opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md`
- 阶段门禁入口：`.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- 模板入口：`.opencode/references/mes-ai-reference/templates/template-index.md`
- SDK 与项目侧路径边界矩阵：`.opencode/references/mes-ai-reference/reference/sdk-project-path-boundary.md`
- 操作手册：`.opencode/references/mes-ai-reference/reference/operator-flight-manual.md`
- 落地指南：`.opencode/references/mes-ai-reference/reference/adoption-guide.md`
- 阶段流程培训：`.opencode/references/mes-ai-reference/reference/training/phase-flows/`
