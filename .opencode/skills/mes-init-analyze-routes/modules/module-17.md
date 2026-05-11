# API映射明细

## API映射明细

### 用户管理模块 → user-service

| 前端页面 | 前端方法 | 后端接口 | Controller | HTTP方法 |
|---------|---------|---------|-----------|---------|
| List.vue | getUserList | /api/v1/users | UserController | GET |
| List.vue | deleteUser | /api/v1/users/{id} | UserController | DELETE |
| Detail.vue | getUserById | /api/v1/users/{id} | UserController | GET |
| Form.vue | createUser | /api/v1/users | UserController | POST |

### 订单管理模块 → order-service

| 前端页面 | 前端方法 | 后端接口 | Controller | HTTP方法 |
|---------|---------|---------|-----------|---------|
| List.vue | getOrderList | /api/v1/orders | OrderController | GET |
| Detail.vue | getOrderById | /api/v1/orders/{id} | OrderController | GET |
