# 详细映射关系

## 详细映射关系

### user-module → user-service

| 前端页面 | 前端API | 后端接口 | 用途 |
|----------|---------|----------|------|
| UserList.vue | getUserList | GET /api/v1/users | 获取用户列表 |
| UserDetail.vue | getUserById | GET /api/v1/users/{id} | 获取用户详情 |
| UserForm.vue | createUser | POST /api/v1/users | 创建用户 |
| UserForm.vue | updateUser | PUT /api/v1/users/{id} | 更新用户 |

---

### order-module → order-service

| 前端页面 | 前端API | 后端接口 | 用途 |
|----------|---------|----------|------|
| OrderList.vue | getOrderList | GET /api/v1/orders | 获取订单列表 |
| OrderDetail.vue | getOrderById | GET /api/v1/orders/{id} | 获取订单详情 |

---

### 跨服务调用

| 前端模块 | 主服务 | 辅助服务 | 说明 |
|----------|--------|----------|------|
| order-module | order-service | user-service | 订单页面需要用户信息 |
```

### 步骤4：更新数据库注册表

#### 分析数据库配置

读取服务的 `application.yml` 或 `bootstrap.yml`：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/xxx_db
    username: root
    password: root
```

#### 分析实体类与表的映射

```java
@Entity
@Table(name = "sys_user")
public class UserEntity {
    @Id
    private Long id;
    private String username;
    // ...
}
```

#### 更新数据库注册表

**Step Gate B**：服务依赖、前后端映射或数据库依赖更新存在缺口 → 打回步骤2-4重做，不得交付刷新结果。

更新 `database-registry.md`：

```markdown
# 数据库注册表
