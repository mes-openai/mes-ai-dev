# 交叉引用

## 交叉引用

### 服务依赖关系摘要
- user-service → 调用 → order-service, auth-service
- order-service → 调用 → inventory-service, payment-service
- 依赖层级：gateway → user/order/inventory → auth/payment

### 数据库归属
- mes_user → user-service
- mes_order → order-service
- mes_inventory → inventory-service

### API统计
- 总API数量：XXX个
- 按服务分布：user-service(45), order-service(67), ...

### 前端模块映射
- 用户管理 → user-service
- 订单管理 → order-service
- 库存管理 → inventory-service
```

**frontend-overview.md补充内容**：
```markdown
