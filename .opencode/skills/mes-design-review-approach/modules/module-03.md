# 执行步骤（1/4）

## 执行步骤

### 1. 输出执行计划

在开始评审前，必须先输出本次执行计划：
- **目标**：明确本次设计评审的目标和范围
- **步骤**：列出将要执行的详细评审步骤
- **预期产出**：明确将生成的评审报告和评审结论
- **风险评估**：识别可能的评审重点和关注领域

### 2. 读取前置输入

按以下顺序读取必要的设计产出文件：

1. **完整设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/design.md`
   - 用途：作为评审的主要对象

2. **需求规格文档**
   - 路径：`mes-ai-dev/workspace/requirements/{REQ-ID}/spec.md`
   - 用途：作为设计需求的验证基准

3. **技术方案文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/tech-approach.md`
   - 用途：验证技术方案的合理性

4. **数据库设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/database-design.md`
   - 用途：评审数据库设计

5. **API设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md`
   - 用途：评审API接口设计

6. **前端设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/frontend-design.md`
   - 用途：评审前端设计

7. **服务调用链设计文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/service-chain-design.md`
   - 用途：评审服务调用链设计

8. **相关知识库索引**
   - 后端总览：`mes-ai-dev/knowledge/code-map/backend-overview.md`
   - 前端总览：`mes-ai-dev/knowledge/code-map/frontend-overview.md`
   - API注册表：`mes-ai-dev/knowledge/dependency-graph/api-registry.md`
   - 数据库注册表：`mes-ai-dev/knowledge/dependency-graph/database-registry.md`
   - 用途：验证设计与现有系统的一致性

**Step Gate A**：设计输入读取不完整或评审基准缺失 → 打回步骤2重做，不得进入维度定义与分项评审。
