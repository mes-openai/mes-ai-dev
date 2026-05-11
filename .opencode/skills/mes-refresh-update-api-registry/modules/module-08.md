# 按服务分类

## 按服务分类

### xxx-service

| 编号 | 方法 | 路径 | 描述 | Controller | 权限 | 状态 |
|------|------|------|------|------------|------|------|
| API-001 | GET | /api/v1/users | 获取用户列表 | UserController | user:list | ✅ |
| API-002 | GET | /api/v1/users/{id} | 获取用户详情 | UserController | user:view | ✅ |
| API-003 | POST | /api/v1/users | 创建用户 | UserController | user:create | ✅ |
| API-004 | PUT | /api/v1/users/{id} | 更新用户 | UserController | user:update | ✅ |
| API-005 | DELETE | /api/v1/users/{id} | 删除用户 | UserController | user:delete | ✅ |

**API详情**：

#### API-001: 获取用户列表

| 属性 | 值 |
|------|-----|
| 编号 | API-001 |
| 名称 | 获取用户列表 |
| 方法 | GET |
| 路径 | /api/v1/users |
| Controller | UserController.listUsers() |
| 描述 | 分页获取用户列表 |

**请求参数**：

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| name | string | 否 | 用户名筛选 |
| page | int | 否 | 页码 |
| size | int | 否 | 每页数量 |

**响应体**：

\`\`\`json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  ]
}
\`\`\`

**错误码**：

| 错误码 | 描述 |
|--------|------|
| 401 | 未授权 |
| 403 | 无权限 |

---

#### API-002: 获取用户详情

[同上格式]

---

### yyy-service

[同上格式]

---
