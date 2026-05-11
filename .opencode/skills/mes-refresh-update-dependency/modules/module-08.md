# 详细依赖关系

## 详细依赖关系

### xxx-service

**调用上游服务**：

| 被调用服务 | 调用接口 | 用途 | 调用方式 |
|------------|----------|------|----------|
| user-service | /api/v1/users | 获取用户信息 | REST |
| order-service | /api/v1/orders | 获取订单信息 | REST |

**被下游服务调用**：

| 调用方服务 | 调用接口 | 用途 |
|------------|----------|------|
| yyy-service | /api/v1/xxx | [用途] |

**依赖中间件**：

| 中间件 | 用途 | 配置位置 |
|--------|------|----------|
| MySQL | 数据存储 | application.yml |
| Redis | 缓存 | application.yml |
| RabbitMQ | 消息队列 | application.yml |

---

### yyy-service

[同上格式]
```

### 步骤3：更新前后端映射

#### 分析前端API调用

读取前端的 `api/` 目录和 `views/` 目录中的API调用：

```javascript
// api/xxx.js
export function getUserList(params) {
  return request({
    url: '/api/v1/users',
    method: 'get',
    params
  })
}
```

#### 更新前后端映射文件

更新 `frontend-backend-map.md`：

```markdown
# 前后端映射关系
