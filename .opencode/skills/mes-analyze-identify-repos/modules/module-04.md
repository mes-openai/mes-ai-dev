# 执行步骤（2/2）

### 5. 识别数据库Schema
基于影响范围和业务流程追踪，识别数据库影响：

#### 5.1 Schema识别
从后端仓库配置文件提取Schema信息：
- 读取：`jalor/[service]/src/main/resources/application.yml`
- 读取：`jalor/[service]/src/main/resources/bootstrap.yml`
- 提取数据库连接配置：`spring.datasource.url`

#### 5.2 数据表详情
对每张数据表记录：
- Schema名称：[schema_name]
- 表名称：[table_name]
- 所属服务：[service_name]
- 操作类型：INSERT/UPDATE/SELECT/DELETE
- 修改类型：新增表/新增字段/修改字段/仅使用
- 表结构文件：`dbscript/[schema]/[table].sql`

#### 5.3 数据库脚本位置
从 database-registry.md 获取：
```
mes-ai-dev/knowledge/database-index/schema-xxx/
```

### 6. 识别配置项
识别涉及的配置文件和配置项：

#### 6.1 后端配置文件
- `application.yml` - 应用配置
- `application-dev.yml` - 开发环境配置
- `application-prod.yml` - 生产环境配置
- `bootstrap.yml` - 启动配置
- `restService.properties` - 服务调用配置

#### 6.2 前端配置文件
- `.env` - 环境变量
- `.env.development` - 开发环境变量
- `.env.production` - 生产环境变量
- `vue.config.js` - Vue配置
- `src/config/index.js` - 应用配置

#### 6.3 配置项详情
对每个配置文件记录：
- 配置文件路径：[file_path]
- 配置项名称：[config_key]
- 当前值：[current_value]（脱敏）
- 需修改值：[new_value]（脱敏）
- 修改原因：[reason]

**Step Gate B**：前端/后端仓库、Schema或配置项识别存在缺口 → 打回步骤3-6重做，不得进入风险评估。

### 7. 评估修改风险等级
对每个仓库、Schema、配置项评估风险等级：

#### 7.1 风险等级定义
- **高风险**：核心业务逻辑修改、跨服务调用、分布式事务、数据库表结构变更
- **中风险**：业务逻辑新增、接口新增、配置变更
- **低风险**：页面展示修改、查询功能新增、非核心功能修改

#### 7.2 风险评估维度
- **业务影响度**：核心业务 vs 非核心业务
- **修改范围**：单文件 vs 多文件 vs 跨仓库
- **技术复杂度**：简单CRUD vs 复杂逻辑 vs 分布式事务
- **测试难度**：单元测试 vs 集成测试 vs 全链路测试
- **回滚难度**：易回滚 vs 难回滚

### 8. 生成交付文件
将仓库影响清单追加到：
`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/raw-requirement.md`

**Step Gate C**：仓库影响清单缺少仓库范围、Schema、配置项或风险等级 → 打回步骤7-8重做，不得交付开发规划阶段。
