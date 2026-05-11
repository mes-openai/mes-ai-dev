# 依赖关系更新报告

## 依赖关系更新报告

### 更新统计

| 类型 | 新增 | 修改 | 删除 | 合计 |
|------|------|------|------|------|
| 服务依赖 | [数量] | [数量] | [数量] | [数量] |
| 前后端映射 | [数量] | [数量] | [数量] | [数量] |
| 数据库注册 | [数量] | [数量] | [数量] | [数量] |

### 更新详情

#### 服务依赖更新
- xxx-service 新增对 user-service 的依赖
- yyy-service 移除对 zzz-service 的依赖

#### 前后端映射更新
- user-module 新增 API 调用：getUserById
- order-module 移除 API 调用：deleteOrder

#### 数据库注册更新
- xxx_db 新增表：sys_permission
- yyy_db 移除表：temp_table

### 依赖变更影响

| 变更 | 影响范围 | 建议 |
|------|----------|------|
| xxx-service 新增依赖 | 需要配置 restService | 检查配置文件 |
| xxx_db 新增表 | 需要执行DDL | 检查数据库脚本 |
```
