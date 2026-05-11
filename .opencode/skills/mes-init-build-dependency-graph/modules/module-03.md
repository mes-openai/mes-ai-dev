# 执行步骤

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何构建操作前，必须先向用户输出本次执行计划，包含：
- 构建目标：服务调用关系、API映射、数据库归属
- 预期产出：完整的关系图文件
- 风险评估：需整合多个数据源
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 读取数据源
```
工具：Read
读取以下文件：
1. mes-ai-dev/knowledge/code-map/services/service-*/api-registry.md
2. mes-ai-dev/knowledge/code-map/services/service-*/service-dependencies.md
3. mes-ai-dev/knowledge/database-index/schema-*/registry-fragment.md
4. mes-ai-dev/knowledge/code-map/modules/module-*/frontend-backend-map.md
5. mes-ai-dev/knowledge/code-map/services/service-*/index.md
```

**Step Gate A**：依赖图数据源读取不完整或局部片段范围错误 → 打回步骤2重做，不得进入依赖关系构建。

### Step 3: 构建服务调用关系图
基于restService.properties和API注册表：
```
分析维度：
1. 同步调用关系
   - 服务A → 服务B（通过restService调用）
   - 调用频率统计（基于API数量）
   
2. 调用链路分析
   - 入口服务（gateway）
   - 中间层服务
   - 底层服务
   
3. 循环依赖检测
   - A → B → A（循环调用）
   - 标注风险等级

4. 共享服务分析
   - 统计每个服务的被调用次数
   - 识别被多个服务调用的"共享服务"
   - 标注影响等级和变更通知要求
```

#### 3.1 统计服务被依赖度

```markdown
