# 执行步骤（2/3）

### 4. 初步定位影响范围
基于需求关键词匹配第0层索引：

#### 4.1 后端服务定位
从 raw-requirement.md 提取关键词：
- 功能关键词（如：订单、库存、质检）
- 业务实体关键词（如：工单、物料、设备）
- 操作关键词（如：创建、审批、查询）

匹配 backend-overview.md 中的服务：
- 服务名称包含关键词
- 服务职责描述包含关键词
- 服务所属业务域匹配

#### 4.2 前端模块定位
匹配 frontend-overview.md 中的模块：
- 模块名称包含关键词
- 模块功能描述包含关键词
- 模块路由路径匹配业务场景

#### 4.3 定位结果
输出初步定位结果：
```
初步定位：
- 后端服务：[服务1, 服务2, ...]（待确认）
- 前端模块：[模块1, 模块2, ...]（待确认）
- 定位依据：[关键词匹配说明]
```

**Step Gate B**：第0层索引读取不完整、热点层前置检查缺失或初步定位依据不足 → 打回步骤3-4重做，不得进入第1层按需加载。

### 5. 按需加载第1层索引
**重要：只加载初步定位涉及的服务/模块，不全部加载**

#### 5.1 后端服务详情
读取文件：`mes-ai-dev/knowledge/code-map/services/service-xxx/index.md`（快速确认相关性）
必要时继续读取：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`（只读涉及的）

提取信息：
- 服务包含的 API 列表
- Controller 层接口定义
- Service 层业务逻辑
- DAO/Mapper 层数据访问
- 依赖的其他服务

#### 5.2 前端模块详情
读取文件：`mes-ai-dev/knowledge/code-map/modules/module-xxx/index.md`（快速确认相关性）
必要时继续读取：`mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md`（只读涉及的）

提取信息：
- 模块包含的页面组件
- API 调用关系
- 路由配置
- 状态管理

#### 5.3 服务仓库画像（新增）
读取文件：`mes-ai-dev/knowledge/code-map/services/service-xxx/repo-profile.md`（按需）

提取信息：
- **一致性评分**：判断服务代码规范程度，影响开发复杂度预估
- **风险热力图**：识别服务内部高风险区域，标注影响等级
- **AI开发适配度**：判断是否适合AI自动开发，需人工辅助区域
- **推荐参考模块**：为后续设计/开发提供参考模块建议
- **不建议AI修改区域**：标注人工必须介入的区域

用途：
- 在影响范围报告中标注每个服务的AI开发适配度
- 为风险评估提供服务内部风险热点

### 6. 分析服务调用关系
读取文件：`mes-ai-dev/knowledge/dependency-graph/service-dependencies.md`

分析内容：
- 定位服务之间的调用链
- 识别上下游服务依赖
- 判断是否涉及跨服务调用
- 评估服务调用复杂度
