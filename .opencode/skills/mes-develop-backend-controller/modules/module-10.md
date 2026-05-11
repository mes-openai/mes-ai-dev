# 约束规则

## 约束规则

### 执行前必须输出计划
每次执行前必须输出执行计划，经用户确认后才可继续。

### 必须读取现有风格
在编写任何Controller前，必须：
1. 读取目标服务现有的Controller类（至少3个）
2. 分析注解使用、路径命名、响应格式、异常处理
3. 保持与现有代码风格一致

### API设计一致性
必须严格按照API设计文档定义：
- HTTP路径：`/api/xxx`
- HTTP方法：POST（创建）、PUT（更新）、DELETE（删除）、GET（查询）
- 请求参数：DTO、QueryDTO
- 响应格式：统一Result<T>封装

### RESTful规范
- 路径使用名词，避免动词：`/api/xxx`而非`/api/getXxx`
- 资源ID使用路径参数：`/api/xxx/{id}`
- 查询条件使用请求参数：`/api/xxx/list?param=value`
- 分页查询：`/api/xxx/page?pageNum=1&pageSize=20`

### 参数校验规范
- @RequestBody参数必须加@Valid
- @PathVariable参数必须加@NotNull
- @RequestParam参数必须加必要的校验注解
- 使用统一的校验注解（@NotNull、@NotBlank、@Size等）

### 响应封装规范
- 所有响应必须使用统一Result<T>封装
- 成功响应：Result.success(data)
- 失败响应：Result.fail(message)
- 参数错误：Result.paramError(message)
- 资源不存在：Result.notFound(message)

### 异常处理规范
- 业务异常：捕获并返回友好提示
- 系统异常：捕获并返回通用提示
- 参数校验异常：由全局异常处理器处理
- 所有异常必须记录日志

### 不硬编码API路径
API路径使用常量或从配置获取，不硬编码具体路径（除了Controller注解中的路径）。
