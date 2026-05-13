# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发后端Controller层（REST端点）
步骤：
  1. 读取Service层和API设计
  2. 定位目标服务和Controller路径
  3. 分析现有Controller风格
  4. 开发Controller类
  5. 开发响应封装类
  6. 验证API设计一致性
预期产出：Controller类、响应封装类
风险：API路径冲突、参数校验遗漏
```

### 2. 读取设计文档和现有代码
按顺序读取：
1. `mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md` - API设计（核心）
2. `mes-ai-dev/workspace/designs/{REQ-ID}/design.md` - OpenSpec 详细设计主文档（API相关部分）
3. `jalor/service-xxx/src/main/java/com/jalor/xxx/service/XxxService.java` - Service接口
4. `jalor/service-xxx/src/main/java/com/jalor/xxx/dto/XxxDTO.java` - DTO类
5. `jalor/service-xxx/src/main/java/com/jalor/xxx/vo/XxxVO.java` - VO类

### 3. 定位Controller路径
1. 从服务详情索引确定Controller包路径：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`
2. 确定Controller类位置：`com.jalor.xxx.controller`

**Step Gate A**：API设计、Service输入或 Controller 路径定位不完整 → 打回步骤2-3重做，不得进入现有风格分析。

### 4. 分析现有Controller风格
先读取 `mes-ai-dev/knowledge/code-map/services/service-xxx/file-summaries.md` 定位相关文件，再读取目标服务现有的Controller文件（至少3个），分析：
- **Controller风格**：
  - 注解使用（@RestController、@RequestMapping）
  - 路径命名规范
  - HTTP方法使用
  - 参数接收方式（@RequestBody、@RequestParam、@PathVariable）
- **响应封装风格**：
  - 统一响应格式
  - 成功/失败响应处理
  - 异常处理方式
  - HTTP状态码使用
- **校验风格**：
  - 参数校验注解使用
  - 校验失败处理
  - 自定义校验

### 5. 开发响应封装类（如不存在）
先检查是否存在统一响应类，如不存在则创建：`jalor/service-xxx/src/main/java/com/jalor/xxx/common/Result.java`

执行步骤：
1. 检查目标服务是否已有Result类
2. 如不存在，参考现有服务的Result类风格创建
3. 必须包含：
   - 成功响应（success）
   - 失败响应（fail）
   - 参数错误响应（paramError）
   - 未授权响应（unauthorized）
   - 资源不存在响应（notFound）

### 6. 开发Controller类
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/controller/XxxController.java`

参考代码模板：`.opencode/references/mes-ai-reference/templates/backend-controller-template.java`

执行步骤：
1. 读取模板文件
2. 读取目标服务现有Controller类（至少2个同类文件）
3. 根据API设计和现有代码风格填充模板
4. 实现关键逻辑：
   - REST端点定义（@PostMapping、@GetMapping等）
   - 参数接收（@RequestBody、@PathVariable、@RequestParam）
   - 参数校验（@Valid、@NotNull）
   - 响应封装（Result.success、Result.fail）
   - 异常处理（try-catch）
   - 日志记录（log.info）
5. 校验API路径与设计文档的一致性
