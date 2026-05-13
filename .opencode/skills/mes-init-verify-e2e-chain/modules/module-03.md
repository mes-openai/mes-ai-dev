# 执行步骤

## 执行步骤

### 1. 输出执行计划

```
本次执行计划：
目标：验证核心业务链路的端到端可追踪性
步骤：
  1. 读取 business-flows.md 获取核心业务动作列表
  2. 对每个业务动作，追踪前端→API→服务→表/MQ 全链路
  3. 标记链路中的断层（无法追踪的环节）
  4. 标记链路中的黑盒（依赖但无法解析的调用）
  5. 生成 e2e-chains.md
预期产出：mes-ai-dev/knowledge/code-map/e2e-chains.md
风险：部分链路可能因代码仓不完整而无法追踪
```

### 2. 读取前置输入

- `mes-ai-dev/knowledge/code-map/business-flows.md` — 核心业务动作列表
- `mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md` — 前后端映射
- `mes-ai-dev/knowledge/dependency-graph/service-dependencies.md` — 服务调用关系
- `mes-ai-dev/knowledge/dependency-graph/api-registry.md` — API注册表
- `mes-ai-dev/knowledge/dependency-graph/database-registry.md` — 数据库注册表

**Step Gate A**：前置输入不完整或核心业务动作范围不清 → 打回步骤2重做，不得进入逐链路追踪。

### 3. 逐链路追踪

对 business-flows.md 中的每个核心业务动作，执行以下追踪：

```
业务动作：[如：工单报工]
  │
  ├─ 前端入口：哪个页面触发？（从前端路由+API调用推断）
  │   └─ 找到：✅ / 未找到：❌ 标记断层
  │
  ├─ API调用：前端调用哪个后端接口？
  │   └─ 找到：✅ / 未找到：❌ 标记断层
  │
  ├─ 后端Controller：哪个Controller接收？
  │   └─ 找到：✅ / 未找到：❌ 标记断层
  │
  ├─ Service处理：哪个Service处理业务逻辑？
  │   └─ 找到：✅ / 未找到：❌ 标记断层
  │
  ├─ 跨服务调用：是否调用其他服务？（从restService.properties推断）
  │   └─ 找到：✅ / 无需调用：N/A / 未找到：❌ 标记黑盒
  │
  ├─ 数据持久化：写入哪个表？
  │   └─ 找到：✅ / 未找到：❌ 标记断层
  │
  └─ 消息通知：是否发送MQ消息？
      └─ 找到：✅ / 无需通知：N/A / 未找到：❌ 标记黑盒
```

### 4. 生成验证件

写入 `mes-ai-dev/knowledge/code-map/e2e-chains.md`，格式如下：

```markdown
# 端到端业务链路验证件
