# Phase Rules Index

> 本文件用于导航各阶段规则。
> 阶段规则按当前所处阶段按需加载，不默认全量常驻。

---

## 一、使用原则

- 先确认当前任务所处阶段，再进入对应文档。
- 不得同时全量加载所有阶段规则。
- 若存在跨阶段变更，再额外加载对应 Scenario 文档。
- 所有阶段默认遵循“编码前思考、简洁优先、精准修改、目标驱动执行”四原则，并在阶段计划、步骤门禁、退出审查中按需显式检查。
- 命中代码分析、影响范围、调用链、依赖链、重构风险或架构文档生成时，可将 GitNexus 类代码知识图谱能力作为辅助证据来源，但不得替代项目事实源与阶段门禁。
- 命中复杂文档、跨阶段交接、多模态材料或知识关系导读时，可将 graphify 类知识图谱能力作为阶段文档图谱化、graph report 或 wiki 化导读手段，但不得把推断边当作确定事实。

---

## 二、阶段入口

### 1. 初始化阶段
- 适用：项目知识库初始化、单仓/多仓扫描、知识基线建立。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-init.md`

### 2. 需求分析阶段
- 适用：需求解析、影响范围识别、规格说明生成。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-analyze.md`
- 图谱增强：可按需使用 GitNexus 类能力辅助识别影响仓、调用链、依赖链与现有能力复用路径；可用 graphify 类能力辅助沉淀需求、业务链与影响范围关系图。

### 3. 详细设计阶段
- 适用：技术方案、API 设计、数据库设计、详细设计文档。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-design.md`
- 深化细则：`.opencode/references/mes-ai-reference/rules/phases/phase-design-detail.md`
- 图谱增强：可按需使用 GitNexus 类能力校验服务链、依赖关系、Provider 路径与设计影响面；可用 graphify 类能力生成设计文档的关系导读。

### 4. 开发阶段
- 适用：编码实现、改动落地、自检与开发期验证。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-develop.md`
- 深化细则：`.opencode/references/mes-ai-reference/rules/phases/phase-develop-detail.md`
- 图谱增强：可按需使用 GitNexus 类能力定位最小改动点、评估变更影响与回归范围；开发仍必须遵循精准修改，不得因图谱提示扩大无关编辑。

### 5. 测试阶段
- 适用：测试设计、测试执行、测试报告。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-test.md`
- 深化细则：`.opencode/references/mes-ai-reference/rules/phases/phase-test-detail.md`
- 图谱增强：可按需使用 GitNexus 类能力反推影响面与回归路径；可用 graphify 类能力表达需求项、测试对象、证据与风险之间的追溯关系。

### 6. 发布交付阶段
- 适用：发布计划、验收检查、交付资料。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-deliver.md`
- 深化细则：`.opencode/references/mes-ai-reference/rules/phases/phase-deliver-detail.md`

### 7. 知识刷新阶段
- 适用：检测知识过期、刷新 code map / API registry / dependency graph。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-refresh.md`

### 8. 紧急修复阶段
- 适用：生产问题、热修、回滚与快速止血。
- 入口：`.opencode/references/mes-ai-reference/rules/phases/phase-emergency.md`

---

## 三、阶段切换提醒

- 阶段切换前应确认前置产物是否齐备。
- 若任务从分析进入设计/开发，优先检查是否需要用户确认。
- 若任务跨多个阶段，按顺序逐段加载，不一次性全读。

---

## 四、相关入口

- 场景规则索引：`.opencode/references/mes-ai-reference/rules/scenarios/index.md`
- 门禁规则索引：`.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
- 技能索引：`.opencode/references/mes-ai-reference/reference/phase-skill-index.md`
