# 执行步骤

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何提取操作前，必须先向用户输出本次执行计划，包含：
- 提取目标：所有微服务的Controller
- 预期产出：按服务命名的 API 片段
- 风险评估：需解析大量Java文件，可能耗时
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 读取服务列表
```
工具：Read
路径：mes-ai-dev/knowledge/state/state.yaml 或 `mes-ai-dev/knowledge/code-map/services/*/index.md`
目的：获取需要分析的服务列表，避免依赖尚未收拢的共享总览
```

**Step Gate A**：服务列表读取不完整或服务范围识别错误 → 打回步骤2重做，不得进入 Controller 扫描。

### Step 3: 扫描Controller文件
对每个服务执行：
```
工具：Glob
路径：jalor/<service>/src/main/java/
模式：**/*Controller.java
目的：定位所有Controller类文件
```

### Step 4: 解析Controller类
对每个Controller文件：
```
工具：Read
路径：jalor/<service>/src/main/java/.../XXXController.java

解析内容：
1. 类级别注解：
   - @RequestMapping(value="/api/v1") → 基础路径
   - @RestController → 标记为REST控制器

2. 方法级别注解：
   - @GetMapping("/users") → GET /api/v1/users
   - @PostMapping("/users") → POST /api/v1/users
   - @PutMapping("/users/{id}") → PUT /api/v1/users/{id}
   - @DeleteMapping("/users/{id}") → DELETE /api/v1/users/{id}
   - @PatchMapping("/users/{id}") → PATCH /api/v1/users/{id}

3. 方法参数：
   - @PathVariable → 路径参数
   - @RequestParam → 查询参数
   - @RequestBody → 请求体
   - @RequestHeader → 请求头
```

### Step 5: 提取API元数据
对每个API端点提取：
```
- 所属服务：service-name
- Controller类：UserController
- HTTP方法：GET/POST/PUT/DELETE/PATCH
- 完整路径：/api/v1/users
- 方法名：getUserList
- 参数列表：page, size, name
- 返回类型：Result<List<UserVO>>
- 注释说明：获取用户列表
```

**Step Gate B**：Controller解析、路径拼接或 API 元数据提取存在缺口 → 打回步骤3-5重做，不得生成 API 片段。

### Step 6: 汇总生成API注册表
```
工具：Write
路径：mes-ai-dev/knowledge/code-map/services/service-<artifact-id>/api-registry.md
```

**Step Gate C**：API 片段缺少方法、路径、参数、返回类型或异常列表 → 打回步骤6重做，不得交付下游初始化步骤。
