# 执行步骤（2/2）

### 6. 错误码设计

设计统一的错误码体系：

**错误码规范**
- 2xxxx：成功
- 4xxxx：客户端错误
  - 40001：参数错误
  - 40002：认证失败
  - 40003：权限不足
  - 40004：资源不存在
- 5xxxx：服务端错误
  - 50001：系统异常
  - 50002：服务不可用
  - 50003：数据库异常

**错误响应格式**
```json
{
  "code": 40001,
  "message": "参数校验失败",
  "data": {
    "errors": [
      {"field": "username", "message": "用户名不能为空"}
    ]
  },
  "timestamp": 1234567890
}
```

### 7. 分页与排序规范

定义统一的分页和排序参数：

**分页参数**
- `pageNum`：页码，从1开始
- `pageSize`：每页条数，默认20

**排序参数**
- `orderBy`：排序字段
- `orderType`：排序方式，ASC/DESC

**分页响应格式**
```json
{
  "code": 200,
  "message": "查询成功",
  "data": {
    "list": [],
    "total": 100,
    "pageNum": 1,
    "pageSize": 20,
    "pages": 5
  },
  "timestamp": 1234567890
}
```

**Step Gate C**：统一响应、错误码、分页排序规范未闭环或与现有规范冲突 → 打回步骤5-7重做，不得输出 API 设计文档。

### 8. 输出API设计文档

输出设计文档至：
- 路径：`mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/api-design.md`

文档结构：
```markdown
# API接口设计文档
