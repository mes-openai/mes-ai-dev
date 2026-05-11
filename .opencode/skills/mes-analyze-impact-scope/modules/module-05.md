# 执行步骤（3/3）

### 7. 识别数据库影响
读取文件：`mes-ai-dev/knowledge/dependency-graph/database-registry.md`

提取信息：
- 涉及的数据库 Schema
- 相关数据表列表
- 表之间的关联关系
- 数据库类型（MySQL/Oracle等）

#### 7.1 Schema风险画像（新增）
读取文件：`mes-ai-dev/knowledge/database-index/schema-xxx/index.md`（按需）

提取信息：
- **Schema风险等级**：低/中/高，影响变更审批要求
- **热表清单**：高频访问表，变更需重点关注性能影响
- **共享表清单**：多服务访问表，变更需协调所有调用方
- **大表清单**：数据量>100万行，变更需评估执行时间

用途：
- 在影响范围报告中标注Schema风险等级
- 为风险评估提供数据库变更风险热点

**Step Gate C**：服务/模块/调用链/数据库影响分析存在缺口或风险等级未标注 → 打回步骤5-7重做，不得生成交付文件。

### 8. 生成交付文件
将影响范围分析结果追加到：
`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/raw-requirement.md`

**Step Gate D**：影响范围报告缺少服务/模块/表范围、调用链或风险说明 → 打回步骤8重做，不得交付设计阶段使用。
