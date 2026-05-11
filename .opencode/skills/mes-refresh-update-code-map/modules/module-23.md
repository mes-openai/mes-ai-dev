# 索引内容规范

## 索引内容规范

### API端点格式

```markdown
| 方法 | 路径 | 描述 | Controller | 权限 |
|------|------|------|------------|------|
| GET | /api/v1/users | 获取用户列表 | UserController | user:list |
| POST | /api/v1/users | 创建用户 | UserController | user:create |
| PUT | /api/v1/users/{id} | 更新用户 | UserController | user:update |
| DELETE | /api/v1/users/{id} | 删除用户 | UserController | user:delete |
```

### 数据实体格式

```markdown
| 实体类 | 表名 | 用途 | 主要字段 |
|--------|------|------|----------|
| UserEntity | sys_user | 用户信息 | id, username, email |
```

### 服务依赖格式

```markdown
| 依赖服务 | 用途 | 调用方式 | 调用接口 |
|----------|------|----------|----------|
| auth-service | 认证授权 | REST | /api/v1/auth/* |
```
