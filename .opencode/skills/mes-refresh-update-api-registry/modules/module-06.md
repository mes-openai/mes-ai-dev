# API变更识别

## API变更识别

### 新增API

| 服务 | Controller | 文件路径 |
|------|------------|----------|
| xxx-service | XxxController | jalor/xxx-service/.../XxxController.java |
| yyy-service | YyyController | jalor/yyy-service/.../YyyController.java |

### 修改API

| 服务 | Controller | 变更类型 |
|------|------------|----------|
| xxx-service | XxxController | 参数变更 |
| xxx-service | XxxController | 响应变更 |

### 删除API

| 服务 | Controller | 删除接口 |
|------|------------|----------|
| xxx-service | XxxController | DELETE /api/v1/old |
```

**Step Gate A**：API变更识别不完整或 Controller 范围识别错误 → 打回步骤1重做，不得进入 API 信息提取。

### 步骤2：提取API信息

#### 从Controller提取API

读取Controller文件，提取API端点信息：

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping
    public Result<List<UserVO>> listUsers(@RequestParam(required = false) String name) {
        // ...
    }

    @GetMapping("/{id}")
    public Result<UserVO> getUserById(@PathVariable Long id) {
        // ...
    }

    @PostMapping
    public Result<UserVO> createUser(@RequestBody @Valid UserDTO userDTO) {
        // ...
    }
}
```

提取信息：

| 属性 | 值 |
|------|-----|
| 方法 | GET |
| 路径 | /api/v1/users |
| 描述 | 获取用户列表 |
| 请求参数 | name: string (可选) |
| 响应体 | Result<List<UserVO>> |
| 权限 | [从@PreAuthorize或类似注解提取] |

### 步骤3：更新API注册表

#### API注册表格式

```markdown
# API注册表
