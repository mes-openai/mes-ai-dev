# 四、依赖统计

## 四、依赖统计

### 4.1 服务依赖度
- 依赖最多：order-service（调用3个服务）
- 被依赖最多：auth-service（被15个服务调用）
- 独立服务：report-service（无外部调用）

### 4.2 共享服务统计
- 高影响服务（被依赖≥10）：auth-service, user-service
- 中影响服务（被依赖5-9）：notification-service, config-service
- 低影响服务（被依赖<5）：report-service, admin-service
- **总计共享服务**：5个（需要重点维护和变更通知）

### 4.3 API热点
- 最热API：GET /api/v1/users（用户列表）
- 最热模块：用户管理（总调用量XX%）

### 4.4 数据库热点
- 最热Schema：mes_order（访问量XX%）
- 最热表：t_order（访问量XX%）
