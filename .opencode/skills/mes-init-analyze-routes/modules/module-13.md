# API列表

## API列表

| 前端方法 | 请求方法 | URL | 后端接口 | 说明 |
|---------|---------|-----|---------|------|
| getUserList | GET | /api/v1/users | UserController.getUserList | 获取用户列表 |
| getUserById | GET | /api/v1/users/{id} | UserController.getUserById | 获取用户详情 |
| createUser | POST | /api/v1/users | UserController.createUser | 创建用户 |
| updateUser | PUT | /api/v1/users/{id} | UserController.updateUser | 更新用户 |
| deleteUser | DELETE | /api/v1/users/{id} | UserController.deleteUser | 删除用户 |
