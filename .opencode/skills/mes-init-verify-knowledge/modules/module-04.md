# 执行步骤（1/4）

## 执行步骤

### 1. 输出执行计划
```
本次执行计划：
目标：校验知识库完整性、覆盖率和基线
步骤：
  1. 检查所有预期产物是否存在且非空
  2. 校验服务/模块/API/数据库覆盖率
  3. 检查交叉引用一致性
  4. 初始化阶段先写 state/fragments/*.yaml，收拢时再合并到 state/state.yaml
  5. 渲染兼容视图：baseline.md、init-coverage.md
  6. 输出校验摘要
预期产出：状态片段或 state.yaml（按阶段），兼容视图（渲染），必要时形成全仓收敛结论
风险：部分产物可能为空模板
```

### 2. 文件完整性检查
逐项检查以下产物：
- code-map/: backend-overview, frontend-overview, services/*, modules/*, business-flows.md, ownership.md, patterns.md, test-assets.md, runtime.md
- dependency-graph/: service-dependencies, api-registry, database-registry, frontend-backend-map
- rules/: api-conventions, coding-standards, artifact-standards, environment-governance, budget-audit-rules
- reference/: 全部参考文件
- baseline.md

其中 `reference/terminology-glossary.md` 需执行**真实填充校验**：
- 文件必须存在且非空
- 不得仅包含占位说明、空章节或“后续补充”描述
- 必须至少包含可消费的术语条目，以及来源依据或置信度信息

同类 reference/rules 关键文件也需执行真实填充校验：
- `reference/domain-model.md`
- `reference/data-dictionary.md`
- `reference/enum-registry.md`
- `reference/error-code-registry.md`
- `reference/permission-matrix.md`
- `rules/api-conventions.md`
- `rules/coding-standards.md`

契约类知识额外校验：
- 若知识来自业务仓外部定义源，必须记录来源类型
- 若来源类型为 `sources-jar` 或 `decompiled-jar`，必须包含版本一致性说明
- 若来源类型为 `decompiled-jar`，不得默认标为高可信
- 若来源类型为 `unknown`，不得写成全局确定性契约
- 关键契约字段必须能映射回声明的事实源

code-map 全局共享文件也需执行**收口完成性 + 真实内容校验**：
- `code-map/business-flows.md`
- `code-map/ownership.md`
- `code-map/patterns.md`
- `code-map/legacy-debt.md`
- `code-map/hot-services.md`
- `code-map/hot-apis.md`
- `code-map/hot-tables.md`

校验原则：
- 文件不得仅存在占位章节
- 必须具备最小可消费内容
- 必须标注来源依据、差异说明或置信度（适用时）
- 若来自 `knowledge/fragments/code-map/`，必须确认已完成收口，不得仍停留在候选结果状态

> 单仓/定向初始化允许共享 overview / registry / hot 文件缺失；此时应将其记录为“待收敛”，而不是直接判定初始化失败。

**Step Gate A**：文件完整性检查不完整、缺失项未明确记录，或 reference/rules/code-map 关键文件仍为占位骨架、未收口候选结果 → 打回步骤2重做，不得进入覆盖率校验。

### 3. 覆盖率校验（6维度）
1. **服务覆盖率**：jalor/ 下的 pom.xml 子目录 vs backend-overview 服务数 → 目标 100%
2. **模块覆盖率**：web/src/views/ 子目录 vs frontend-overview 模块数 → 目标 100%
3. **API覆盖率**：Controller 端点数 vs api-registry 记录数 → 目标 ≥95%
4. **数据库覆盖率**：Entity @Table 注解 vs database-index → 目标 ≥90%
5. **前后端映射覆盖率**：前端 API 调用 vs frontend-backend-map → 目标 ≥90%
6. **依赖图完整性**：restService.properties vs service-dependencies → 目标 100%

> **收敛模式说明**：在 `/mes-init-converge` 场景下，本 Skill 应按全仓视角校验 coverage、可信度与 overview/registry/hot 层的一致性，而非仅校验本次局部 scope。
