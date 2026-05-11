# 路由配置

## 路由配置

| 路由路径 | 路由名称 | 页面组件 | 权限 | 缓存 |
|---------|---------|---------|------|------|
| /user/list | UserList | views/user/List.vue | user:list | ✓ |
| /user/detail/:id | UserDetail | views/user/Detail.vue | user:detail | ✗ |
| /user/create | UserCreate | views/user/Form.vue | user:create | ✗ |
