# 输出

## 输出
- 文件路径：`mes-ai-dev/knowledge/code-map/services/service-<artifact-id>/api-registry.md`
- 全局 `mes-ai-dev/knowledge/dependency-graph/api-registry.md` 由 `/mes-init-project` 全仓最终收拢或 `/mes-init-converge` 统一生成
- 内容格式：
  ```markdown
  # API注册表
  
  ## 概览
  - 服务数量：XX个
  - API总数：XXX个
  - 统计时间：YYYY-MM-DD HH:mm:ss
  
  ## API列表
  
  ### user-service（用户服务）
  
  | 方法 | 路径 | Controller | 方法名 | 参数 | 返回类型 | 说明 |
  |------|------|-----------|-------|------|---------|------|
  | GET | /api/v1/users | UserController | getUserList | page, size | Result<List<UserVO>> | 获取用户列表 |
  | POST | /api/v1/users | UserController | createUser | @RequestBody UserDTO | Result<UserVO> | 创建用户 |
  | GET | /api/v1/users/{id} | UserController | getUserById | @PathVariable id | Result<UserVO> | 获取用户详情 |
  
  ### order-service（订单服务）
  
  | 方法 | 路径 | Controller | 方法名 | 参数 | 返回类型 | 说明 |
  |------|------|-----------|-------|------|---------|------|
  | GET | /api/v1/orders | OrderController | getOrderList | page, size, status | Result<List<OrderVO>> | 获取订单列表 |
  
  ## 按HTTP方法统计
  - GET：XX个
  - POST：XX个
  - PUT：XX个
  - DELETE：XX个
  - PATCH：XX个
  
  ## API命名规范检查
  - 符合REST规范：XXX个
  - 不符合规范：XX个（需人工审核）
  
  ## 异常列表
  - 解析失败的Controller：XXX
  - 缺少注释的API：XXX
  ```
