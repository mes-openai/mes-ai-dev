# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发后端DAO层（Mapper接口和XML）
步骤：
  1. 读取Model层和设计文档
  2. 定位目标服务和DAO路径
  3. 分析现有DAO风格
  4. 开发Mapper接口
  5. 开发Mapper XML文件
  6. 验证SQL正确性
预期产出：Mapper接口、Mapper XML
风险：SQL性能问题、映射错误
```

### 2. 读取设计文档和Model层
按顺序读取：
1. `mes-ai-dev/workspace/designs/{REQ-ID}/design.md` - OpenSpec 详细设计主文档
2. `mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md` - API设计
3. `jalor/service-xxx/src/main/java/com/jalor/xxx/entity/XxxEntity.java` - Entity类
4. `mes-ai-dev/workspace/development/{REQ-ID}/database/ddl-xxx.sql` - DDL脚本

### 3. 定位DAO路径
1. 从服务详情索引确定DAO包路径：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`
2. 确定Mapper接口位置：`com.jalor.xxx.mapper`
3. 确定XML映射文件位置：`resources/mapper/`

### 3.5 Mapper/XML 映射真实性核验
在进入 Mapper 接口和 XML 编码前，必须逐项核验：
- **接口真实性**：Mapper 接口真实包路径、类名、方法签名、参数注解。
- **XML 真实性**：目标资源目录、现有 XML 风格、`namespace` 写法、SQL 片段命名习惯。
- **映射真实性**：`namespace` 必须等于 Mapper 接口全限定名；每个 SQL `id` 必须与接口方法名一一对应。
- **对象真实性**：`parameterType` / `resultType` / `resultMap` 引用的类或映射必须真实存在。
- **数据库对象真实性**：表名、字段名、Schema 必须能在真实 DDL、数据库索引或现有 SQL 中找到依据。

**Step Gate A**：设计输入、Model层输入、DAO 路径定位或 Mapper/XML 映射真实性核验不完整 → 打回步骤2-3重做，不得进入现有风格分析。

### 4. 分析现有DAO风格
先读取 `mes-ai-dev/knowledge/code-map/services/service-xxx/file-summaries.md` 定位相关文件，再读取目标服务现有的Mapper文件（至少3个），分析：
- **Mapper接口风格**：
  - 命名规范
  - 方法签名定义
  - 注解使用
  - 泛型处理
- **XML映射风格**：
  - SQL格式化方式
  - ResultMap定义
  - 动态SQL使用
  - 分页处理方式
- **常用操作模式**：
  - 单表CRUD操作
  - 关联查询处理
  - 批量操作处理
  - 条件查询封装

### 5. 开发Mapper接口
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/mapper/XxxMapper.java`

参考代码模板：`.opencode/references/mes-ai-reference/templates/backend-dao-template.java`

执行步骤：
1. 读取模板文件
2. 读取目标服务现有Mapper接口（至少2个同类文件）
3. 根据Entity类和业务需求填充模板
4. 校验方法签名和参数注解的正确性
5. 校验接口包名与后续 XML `namespace` 的全限定名完全一致

### 6. 开发Mapper XML文件
创建文件：`jalor/service-xxx/src/main/resources/mapper/XxxMapper.xml`

参考代码模板：`.opencode/references/mes-ai-reference/templates/code/backend-mybatis-xml-template.xml`

执行步骤：
1. 读取目标服务现有Mapper XML文件（至少2个同类文件）
2. 根据Mapper接口和Entity类编写SQL映射
3. 必须包含：
   - ResultMap定义（字段映射）
   - Base_Column_List（列片段）
   - Query_Where_Clause（条件片段）
   - 各方法对应的SQL语句
4. 校验SQL语法和参数映射的正确性
5. 确保表名带Schema前缀、使用参数化查询
6. 必须显式校验：
   - `namespace == Mapper接口全限定名`
   - 每个 SQL `id` 都能映射到真实接口方法
   - `parameterType` / `resultType` / `resultMap` 都能解析到真实对象
   - 表名、字段名都存在于真实数据库对象中
