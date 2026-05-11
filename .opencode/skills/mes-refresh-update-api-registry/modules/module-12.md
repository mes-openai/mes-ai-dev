# API信息提取规则

## API信息提取规则

### 从注解提取

```java
// 提取路径
@RequestMapping("/api/v1/users")
@GetMapping("/{id}")
// → 路径: /api/v1/users/{id}

// 提取方法
@GetMapping  // → GET
@PostMapping // → POST
@PutMapping  // → PUT
@DeleteMapping // → DELETE

// 提取参数
@RequestParam(required = false) String name
// → name: string, 非必填

@PathVariable Long id
// → id: long, 必填

@RequestBody @Valid UserDTO userDTO
// → 请求体: UserDTO

// 提取权限
@PreAuthorize("hasPermission('user', 'list')")
// → 权限: user:list
```

### 从方法签名提取

```java
public Result<List<UserVO>> listUsers(...)
// → 响应体: Result<List<UserVO>>
```

### 从文档注释提取

```java
/**
 * 获取用户列表
 * @param name 用户名筛选
 * @param page 页码
 * @param size 每页数量
 * @return 用户列表
 */
// → 描述: 获取用户列表
// → 参数说明更详细
```
