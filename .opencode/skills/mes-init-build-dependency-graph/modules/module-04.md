# 服务被依赖度统计

## 服务被依赖度统计

| 服务名 | 消费者数量 | 依赖服务列表 | 影响等级 |
|--------|-----------|-------------|---------|
| auth-service | 15 | [gateway, user, order, inventory, report, ...] | 高 |
| user-service | 12 | [order, report, workflow, notification, ...] | 高 |
| notification-service | 8 | [order, user, workflow, ...] | 中 |
| order-service | 5 | [report, workflow, payment, ...] | 中 |
| report-service | 2 | [gateway, admin] | 低 |
```

#### 3.2 标注共享服务

```
定义：
- 高影响服务：被 ≥10 个服务调用
- 中影响服务：被 5-9 个服务调用
- 低影响服务：被 <5 个服务调用

标注规则：
1. 高影响服务 → 标记为"共享服务"，变更必须评估下游影响
2. 中影响服务 → 标记为"重要服务"，变更需要通知下游
3. 低影响服务 → 常规变更流程
```

#### 3.3 生成影响传导关系

```markdown
