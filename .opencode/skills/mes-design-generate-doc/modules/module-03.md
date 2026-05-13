# 执行步骤

## 执行步骤

### 1. 输出执行计划

在开始设计前，必须先输出本次执行计划：
- **目标**：明确本次设计文档生成的目标和范围
- **步骤**：列出将要执行的详细步骤
- **预期产出**：明确将生成的完整设计文档
- **风险评估**：识别可能的文档整合风险和内容冲突

### 2. 读取前置输入

按以下顺序读取所有设计阶段的产出文件：

1. **需求规格文档**
   - 路径：`mes-ai-dev/workspace/requirements/{REQ-ID}/spec.md`
   - 用途：作为设计文档的需求概述部分

2. **原始需求文档**
   - 路径：`mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md`
   - 用途：补充需求背景信息

3. **技术方案文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/tech-approach.md`
   - 用途：整合技术方案决策部分

4. **数据库设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/database-design.md`
   - 用途：整合数据库设计部分

5. **API设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md`
   - 用途：整合API接口设计部分

6. **前端设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/frontend-design.md`
   - 用途：整合前端设计部分

7. **服务调用链设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/service-chain-design.md`
   - 用途：整合服务调用链设计部分

8. **设计文档模板**
- 模板选择优先级：用户显式提供的模板路径或模板内容 → 项目级自定义模板 `.opencode/references/mes-ai-reference/templates/design/custom-design-doc-template.md` → 默认模板 `.opencode/references/mes-ai-reference/templates/design/design-doc-template.md`
- 用途：作为最终 `design.md` 主文档的结构模板
- 要求：使用用户模板时必须保留用户模板中的固定章节；若用户模板缺少骨架要求的必要设计内容，应以子章节、附录或补充表格方式补齐。
- 异常处理：若用户提供模板路径但文件不存在，必须暂停并要求用户更正路径；不得静默回退默认模板。若用户直接粘贴模板内容，应将其作为本次执行的内联模板依据，并在 `mes-ai-dev/workspace/designs/{REQ-ID}/template-source.md` 记录模板来源、接收时间和固定章节清单。若项目级自定义模板不存在且用户未提供模板，则自动回退默认模板并在执行计划中说明。

**Step Gate A**：设计输入不完整、模板缺失或整合范围不清 → 打回步骤2重做，不得进入内容整合策略。

**Step Gate A-1：目录与模板确认**：必须先按 `.opencode/references/mes-ai-reference/rules/governance/stage-workspace-directory-standard.md` 解析 `{REQ-ID}`，并声明需求输入目录 `mes-ai-dev/workspace/requirements/{REQ-ID}/`、设计输出目录 `mes-ai-dev/workspace/designs/{REQ-ID}/`、实际采用的模板来源。设计产物不得写入 `workspace/requirements/{REQ-ID}/`。若模板来源为用户内联内容或项目级自定义模板，必须生成或更新 `template-source.md` 记录来源与固定章节；若用户模板路径不存在，门禁不通过。

### 3. 内容整合策略

#### 3.1 整合原则
- **完整性**：确保所有设计产出内容都被整合
- **一致性**：消除不同文档间的冲突和重复
- **结构化**：按照模板结构组织内容
- **易读性**：保持文档的可读性和专业性

#### 3.2 内容冲突处理

识别并处理不同设计文档间可能存在的冲突：
- 技术方案与具体设计的不一致
- API设计与数据库设计的字段不匹配
- 前端设计与API设计的参数不一致
- 服务调用链与API设计的接口不一致

**冲突处理方式**
1. 标注冲突点
2. 分析冲突原因
3. 提出解决方案
4. 更新冲突内容

**Step Gate B**：整合原则不明确或内容冲突未识别/未处理 → 打回步骤3重做，不得进入设计文档结构整合。

### 4. 设计文档结构

根据设计文档模板，整合后的完整设计文档包含以下章节：

```markdown
# 详细设计文档 - [需求名称]
