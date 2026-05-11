# 页面详情

## 页面详情

### 用户列表页面（List.vue）

**路由**：/user/list  
**权限**：user:list  
**API调用**：
- getUserList() → GET /api/v1/users
- deleteUser(id) → DELETE /api/v1/users/{id}

**使用组件**：
- Pagination（公共分页组件）
- SearchForm（搜索表单组件）

**数据流**：
1. mounted() → 加载用户列表
2. 搜索 → 调用getUserList()
3. 删除 → 确认后调用deleteUser()

### 用户详情页面（Detail.vue）

**路由**：/user/detail/:id  
**权限**：user:detail  
**API调用**：
- getUserById(id) → GET /api/v1/users/{id}

**路由参数**：
- id（用户ID）
