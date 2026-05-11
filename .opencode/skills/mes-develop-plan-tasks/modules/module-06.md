# 执行步骤

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：将设计文档拆分为可执行开发任务
步骤：
  1. 读取设计文档和API设计
  2. 分析技术实现路径
  3. 识别任务依赖关系
  4. 划分并行任务组
  5. 生成任务清单
预期产出：tasks.md
风险：设计文档不完整时需补充
```

### 2. 读取设计文档
按顺序读取以下文档：
1. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/design.md` - OpenSpec 详细设计主文档
2. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/api-design.md` - API设计
3. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/database-design.md` - 数据库设计

**Step Gate A**：设计输入读取不完整或关键设计基线缺失 → 打回步骤2重做，不得进入实现路径分析。

### 3. 分析实现路径
根据设计文档分析：
- 后端需要开发的服务模块（从 `mes-ai-dev/knowledge/code-map/backend-overview.md` 定位）
- 前端需要开发的页面组件（从 `mes-ai-dev/knowledge/code-map/frontend-overview.md` 定位）
- 数据库变更范围（从 `mes-ai-dev/knowledge/database-index/` 获取现有结构）

#### 3.1 服务仓库画像读取（新增）
读取文件：`mes-ai-dev/knowledge/code-map/services/service-xxx/repo-profile.md`

提取信息：
- **一致性评分**：判断服务代码规范程度，影响任务工时预估
- **AI开发适配度**：判断任务是否适合AI自动完成，需标注人工任务
- **推荐参考模块**：为任务描述提供参考模块，开发者可参考现有实现
- **需人工辅助区域**：标注哪些任务需人工介入，AI不可自动完成
- **不建议AI修改区域**：标注哪些任务必须人工完成，排除在AI任务外
- **演化状态**：判断服务是否适合激进改动，影响任务风险评估

用途：
- 在任务清单中标注AI开发适配度（高/中/低）
- 为任务描述提供参考模块建议
- 标注人工必须介入的任务

#### 3.2 测试可测性矩阵读取（新增）
读取文件：`mes-ai-dev/knowledge/code-map/testability-matrix.md`

提取信息：
- **服务测试可测性等级**：高/中/低，判断服务是否易于自动化测试
- **可测性评分维度**：数据可测性（测试数据是否容易准备）、接口可测性（接口是否容易Mock）
- **测试难点标注**：哪些功能点需要特殊测试策略或手工测试
- **建议测试类型比例**：单元测试/集成测试的建议比例

用途：
- 在任务清单中标注测试可测性等级
- 为测试任务分配提供依据（高可测性→自动化测试任务，低可测性→手工测试任务）
- 标注需特殊测试策略的功能点

**Step Gate B**：实现路径分析、仓库画像或测试可测性依据不足 → 打回步骤3重做，不得进入任务拆分。

### 4. 任务拆分原则
按照以下顺序拆分任务：
1. **数据库层** - DDL/DML脚本（无依赖，最优先）
2. **后端Model层** - Entity/DTO/VO（依赖数据库设计）
3. **后端DAO层** - Mapper/Repository（依赖Model）
4. **后端Service层** - 业务逻辑（依赖DAO）
5. **后端Controller层** - REST接口（依赖Service）
6. **后端配置** - 配置变更（独立任务）
7. **前端API层** - API调用封装（依赖后端API设计）
8. **前端组件** - UI组件开发（依赖API层）
9. **前端页面** - 页面整合（依赖组件）

### 5. 标注依赖关系
为每个任务标注：
- **前置任务**：必须完成才能开始的任务
- **后置任务**：依赖本任务的任务
- **并行任务**：可与本任务同时进行的任务

**Step Gate C**：任务拆分顺序、依赖关系或并行组划分不正确 → 打回步骤4-5重做，不得生成任务清单。

### 6. 生成任务清单
创建文件：`mes-ai-dev/workspace/development/REQ-YYYYMMDD-XXX/tasks.md`

**Step Gate D**：tasks 缺少任务分组、依赖、AI适配度或执行建议 → 打回步骤6重做，不得交付开发阶段使用。
