# 三、数据库归属关系图

## 三、数据库归属关系图

### 3.1 Schema归属

| Schema | 归属服务 | 表数量 | 主要表 |
|--------|---------|-------|--------|
| mes_user | user-service | 15 | t_user, t_role, t_permission |
| mes_order | order-service | 23 | t_order, t_order_item, t_order_payment |
| mes_inventory | inventory-service | 18 | t_inventory, t_inbound, t_outbound |

### 3.2 表访问路径

#### t_user表
- 写入服务：user-service
- 读取服务：user-service, order-service
- 访问API：/api/v1/users/*

### 3.3 跨Schema关联

- 无跨Schema外键
- 数据共享通过API调用实现
