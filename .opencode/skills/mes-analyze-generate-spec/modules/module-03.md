# 执行步骤（1/2）

## 执行步骤

### 1. 执行前输出计划（必须）
在执行任何操作前，先输出本次执行计划：
```
【执行计划】
目标：按模板生成完整的需求规格文档
步骤：
  1. 读取 raw-requirement.md 整合需求要素和分析结果
  2. 读取 business-flow-trace.md 整合流程追踪信息
  3. 按需读取 exploration.md / proposal.md 并吸收已确认结论
  4. 读取 requirement-spec-template.md 模板
  5. 按模板结构组织文档内容
  6. 判断迭代需求/新需求，增加相应章节
  7. 生成需求规格文档与 NFR 清单
预期产出：spec.md、nfr-checklist.md
风险：文档内容整合可能出现遗漏
上下文预算控制：约10-15K token（读取已有分析文件）
```

### 2. 读取所有分析结果
整合之前的所有分析输出：

#### 2.1 需求解析和影响分析
读取文件：`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/raw-requirement.md`

整合内容：
- 需求编号和类型
- 业务背景、功能描述、业务规则
- 用户角色、业务流程、非功能需求
- 模糊点与待确认事项
- 影响范围分析
- 仓库影响清单

#### 2.2 业务流程追踪
读取文件：`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/business-flow-trace.md`

整合内容：
- 前端调用链路
- 后端调用链路
- 数据库操作链路
- 完整调用链路图
- 关键代码位置

#### 2.3 条件 OpenSpec 产物
按需读取：
- `mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/exploration.md`
- `mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/proposal.md`

整合内容：
- 已澄清的歧义与边界
- 已比较的候选方案与淘汰理由
- 用户确认的推荐方案、仓落点、provider 或复用路径

未被用户确认的探索假设不得写入 `spec.md` 的既定结论。

**Step Gate A**：分析结果读取不完整、上游文件缺失或整合范围不清 → 打回步骤2重做，不得进入模板整合。

### 3. 读取模板文件
需求规格文档统一使用：
- `mes-ai-dev/templates/analyze/requirement-spec-template.md`

NFR 清单统一使用：
- `mes-ai-dev/templates/test/nfr-checklist-template.md`

> **模板使用要求**：
> - 模板只提供章节结构与字段骨架，不可原样保留占位文本
> - 必须将模板中的 `[请填写xxx]`、示例项、占位表格替换为真实需求信息
> - 若为迭代需求，必须补充存量功能变更说明，不可遗漏

### 4. 判断需求类型
从 `raw-requirement.md` 提取需求类型：
- **新需求**：全新功能开发
- **迭代需求**：对已有功能增强/修改

若为迭代需求，需增加“存量功能变更说明”章节。

**Step Gate B**：模板读取、需求类型判断或迭代需求分支处理不准确 → 打回步骤3-4重做，不得进入文档组织。
