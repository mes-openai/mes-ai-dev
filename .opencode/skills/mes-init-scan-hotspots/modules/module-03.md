# 执行步骤（1/2）

## 执行步骤

### Step 1: 输出执行计划（必须）

```
【执行计划】
目标：生成高频服务/API/数据表排行
步骤：
  1. 读取 service-dependencies.md 获取调用关系
  2. 读取 api-registry.md 获取API注册表
  3. 读取 database-registry.md 获取数据库注册表
  4. 读取 frontend-backend-map.md 获取前后端映射
  5. 计算服务入度排行 → hot-services.md
  6. 计算API被依赖排行 → hot-apis.md
  7. 计算表被引用排行 → hot-tables.md
  8. 审核排行结果准确性
预期产出：hot-services.md + hot-apis.md + hot-tables.md
上下文预算：~8K token（4个注册表文件 + 排行计算）
```

### Step 2: 读取依赖数据

依次读取以下文件：

1. `mes-ai-dev/knowledge/dependency-graph/service-dependencies.md` — 服务调用关系
2. `mes-ai-dev/knowledge/dependency-graph/api-registry.md` — API注册表
3. `mes-ai-dev/knowledge/dependency-graph/database-registry.md` — 数据库注册表
4. `mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md` — 前后端映射

**Step Gate A**：依赖数据读取不完整或数据源范围错误 → 打回步骤2重做，不得进入热点排行计算。

### Step 3: 计算高频服务排行

**排序算法**：
- **主要指标**：被其他服务调用次数（入度）
- **辅助指标**：API数量（权重×0.3）+ 前端页面映射数（权重×0.2）
- **综合得分** = 入度 × 0.5 + API数量归一化 × 0.3 + 前端映射归一化 × 0.2

输出 Top10 服务，填写到 `hot-services.md`。

每个服务标注：
- 业务域
- 被调用次数
- API数量
- 变更频率（从repo-profile.md读取或标注"待评估"）
- 风险等级（从repo-profile.md读取或标注"待评估"）

### Step 4: 计算高频API排行

**排序算法**：
- **主要指标**：被前端页面调用次数 + 被其他服务调用次数
- **辅助指标**：业务链路中出现频率
- **综合得分** = 前端调用 × 0.4 + 服务调用 × 0.4 + 链路频率 × 0.2

输出 Top20 API，填写到 `hot-apis.md`。

每个API标注：
- HTTP方法
- 所属服务
- 被调用次数
- 稳定性等级（从api-registry.md稳定性画像读取）
- 变更频率

### Step 5: 计算高频表排行

**排序算法**：
- **主要指标**：被DAO/Mapper引用数量
- **辅助指标**：API链路出现频率 + 业务链路重要度
- **综合得分** = DAO引用 × 0.5 + API链路 × 0.3 + 业务重要度 × 0.2

输出 Top10 表，填写到 `hot-tables.md`。

每个表标注：
- 所属Schema
- 主责服务
- 访问服务数
- 数据量级（从database-registry.md读取）
- 是否共享表（被2+服务直接访问）
- 是否热表（高频读写）

### Step 6: 审核排行结果

审核要点：
- [ ] 排名是否符合业务直觉（核心业务服务应在前排）
- [ ] 数据来源是否可追溯（每个排行项有明确来源）
- [ ] 标注信息是否完整（变更频率、风险等级、稳定性等）
- [ ] 未评估项是否标注"待评估"

**Step Gate B**：服务/API/表排行计算或审核结果存在缺口 → 打回步骤3-6重做，不得输出热点文件。
