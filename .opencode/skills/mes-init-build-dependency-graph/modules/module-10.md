# 二、API映射关系图

## 二、API映射关系图

### 2.1 前端模块 → 后端服务

| 前端模块 | 后端服务 | API数量 | 主要功能 |
|---------|---------|--------|---------|
| 用户管理 | user-service | 12 | 用户CRUD、角色分配 |
| 订单管理 | order-service | 18 | 订单查询、创建、审批 |
| 库存管理 | inventory-service | 10 | 库存查询、入库、出库 |

### 2.2 API调用链路

#### 用户列表查询
```
前端页面：views/user/List.vue
    ↓ getUserList()
API层：api/user.js
    ↓ GET /api/v1/users
后端Controller：UserController.getUserList()
    ↓
Service层：UserService.getUserList()
    ↓
DAO层：UserMapper.selectList()
    ↓
数据库：mes_user.t_user
```

### 2.3 API使用统计

- 高频API（调用 > 100次/天）：XXX
- 低频API（调用 < 10次/天）：XXX
- 未使用API（前端未调用）：XXX
