# 执行步骤（1/4）

## 执行步骤

### 1. 输出执行计划

在开始设计前，必须先输出本次执行计划：
- **目标**：明确本次服务调用链设计的范围和目标
- **步骤**：列出将要执行的详细步骤
- **预期产出**：明确将生成的设计文档
- **风险评估**：识别可能的服务调用风险和数据一致性风险

### 2. 读取前置输入

按以下顺序读取必要的输入文件：

1. **需求规格文档**
   - 路径：`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/spec.md`
   - 重点提取：跨服务功能需求、数据流转需求

2. **技术方案文档**
   - 路径：`mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/tech-approach.md`
   - 重点提取：涉及的服务列表、技术决策

3. **服务依赖关系**
   - 路径：`mes-ai-dev/knowledge/dependency-graph/service-dependencies.md`
   - 用途：了解现有服务间的调用关系

4. **API注册表**
   - 路径：`mes-ai-dev/knowledge/dependency-graph/api-registry.md`
   - 用途：了解服务提供的API接口

5. **服务详情索引**
   - 路径：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`
   - 根据技术方案中涉及的服务，读取对应服务目录下的详细索引

6. **API设计文档**
    - 路径：`mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/api-design.md`
    - 用途：了解新增或修改的API接口

**Step Gate A**：前置输入不完整、服务范围不清或调用基线不足 → 打回步骤2重做，不得进入服务调用关系分析。

### 3. 服务调用关系分析

基于服务依赖关系和服务详情：
- 分析现有服务间的调用关系
- 识别同步调用和异步调用
- 了解现有的服务发现机制
- 确认现有的负载均衡策略

#### 3.1 E2E链路参考（新增）
读取文件：`mes-ai-dev/knowledge/code-map/e2e-chains.md`

提取信息：
- **现有E2E测试链路**：了解系统已有的端到端测试链路，可作为参考
- **链路覆盖范围**：哪些业务流程已有E2E覆盖，哪些需要新增
- **链路稳定性**：现有E2E链路的稳定性评级（高/中/低）
- **关键验证点**：现有E2E链路的验证点，可借鉴到新链路设计

用途：
- 在服务调用链设计中参考现有E2E链路
- 确保新设计的调用链与现有E2E链路兼容
- 避免重复设计已有覆盖的链路
- 为后续集成测试提供E2E链路建议
