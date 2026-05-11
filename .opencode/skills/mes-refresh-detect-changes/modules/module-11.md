# 语义变更检测结果

## 语义变更检测结果

### Controller: UserController.java

| API签名 | 变更类型 | 变更等级 | 影响评估 |
|---------|---------|---------|---------|
| getUserList() | 返回类型变更：List→PageResult | 高 | 破坏性变更，需通知所有调用方 |
| deleteUser(id) | 方法删除 | 高 | 破坏性变更，需检查前端调用 |
| updateUser() | 新增参数：version | 低 | 向后兼容，需更新文档 |
| GET /users → /v1/users | 路径变更 | 中 | 需更新前端API调用路径 |

### 破坏性变更通知列表

| 服务 | API | 变更内容 | 需通知模块 |
|-----|-----|---------|-----------|
| user-service | getUserList | 返回类型变更 | [用户管理, 订单管理, 报表中心] |
```

### 步骤8：类结构对比

对涉及Entity/DTO变更的文件：

1. 读取知识库中对应服务的 `file-summaries.md` 获取类摘要
2. 对比字段列表：
   - 字段新增/删除/类型变更
3. 评估对数据库映射的影响

```markdown
