# 执行步骤

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发后端Entity/DTO/VO模型类
步骤：
  1. 读取数据库设计和API设计
  2. 定位目标服务
  3. 分析现有Model类风格
  4. 开发Entity类
  5. 开发DTO类
  6. 开发VO类
预期产出：Entity、DTO、VO类文件
风险：字段映射错误、命名不一致
```

### 2. 读取设计文档
按顺序读取：
1. `mes-ai-dev/workspace/designs/{REQ-ID}/database-design.md` - 数据库设计
2. `mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md` - API设计
3. `mes-ai-dev/workspace/development/{REQ-ID}/database/ddl-xxx.sql` - DDL脚本

### 3. 定位目标服务
1. 从设计文档确定涉及的微服务
2. 读取服务详情索引：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`
3. 确定Model类的包路径：`com.jalor.xxx.model`

**Step Gate A**：设计输入或目标服务定位不完整 → 打回步骤2-3重做，不得进入现有风格分析。

### 4. 分析现有Model风格
先读取 `mes-ai-dev/knowledge/code-map/services/service-xxx/file-summaries.md` 定位相关文件，再读取目标服务现有的Model类（至少3个），分析：
- **Entity风格**：
  - 注解使用（@Table、@Column等）
  - 字段命名规范
  - 主键生成策略
  - 审计字段处理
- **DTO风格**：
  - 校验注解使用（@NotNull、@Size等）
  - 字段映射方式
  - 序列化配置
- **VO风格**：
  - 返回字段筛选
  - 格式化配置
  - 嵌套对象处理

### 5. 开发Entity类
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/entity/XxxEntity.java`

参考代码模板：`.opencode/references/mes-ai-reference/templates/backend-entity-template.java`

执行步骤：
1. 读取模板文件
2. 读取目标服务现有Entity类（至少2个同类文件）
3. 根据数据库设计和现有代码风格填充模板
4. 校验命名规范和注解一致性

### 6. 开发DTO类
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/dto/XxxDTO.java`

参考代码模板：`.opencode/references/mes-ai-reference/templates/backend-dto-template.java`

执行步骤：
1. 读取模板文件
2. 读取目标服务现有DTO类（至少2个同类文件）
3. 根据API设计和现有代码风格填充模板
4. 校验校验注解的完整性和正确性

### 7. 开发VO类
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/vo/XxxVO.java`

参考代码模板：`.opencode/references/mes-ai-reference/templates/backend-vo-template.java`

执行步骤：
1. 读取模板文件
2. 读取目标服务现有VO类（至少2个同类文件）
3. 根据API设计和现有代码风格填充模板
4. 校验格式化注解的正确性

**Step Gate B**：Entity/DTO/VO 任一模型开发存在字段映射、命名或注解缺口 → 打回步骤4-7重做，不得进入转换工具开发。

### 8. 开发转换工具类（如需要）
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/converter/XxxConverter.java`

执行步骤：
1. 读取目标服务现有Converter类（如有）
2. 实现Entity与VO、DTO与Entity之间的转换方法
3. 使用BeanUtils.copyProperties简化转换逻辑
4. 提供批量转换方法（toVOList）

**Step Gate C**：模型类或转换工具缺少必要字段、注释或转换逻辑 → 打回步骤8或前序步骤重做，不得交付下游 DAO/Service 开发。
