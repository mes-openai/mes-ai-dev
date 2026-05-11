# 约束规则

## 约束规则

### 必须遵守
1. **执行前输出计划**：在任何操作前必须输出执行计划
2. **结果审核**：输出前必须审核影响范围的准确性
3. **按需加载知识库**：严格遵循第0层→第1层的加载顺序
4. **不硬编码服务名**：基于关键词匹配，不预设服务名
5. **上下文预算控制**：单次加载知识库不超过20K token
6. **文件交接**：通过 raw-requirement.md 文件获取输入，不依赖对话历史

### 禁止行为
1. ❌ 不一次性加载所有知识库文件
2. ❌ 不读取代码文件（jalor/、web/）
3. ❌ 不猜测未在知识库中记录的服务
4. ❌ 不跳过第0层直接读第1层
5. ❌ 不省略风险评估

### 加载顺序强制要求
```
Step 0: 读取 `state/state.yaml` 获取仓规模标签；若缺失则兼容回退读取 `baseline.md`
Step 0.5: [大仓/超大仓] hot-services + hot-apis + hot-tables（强制，先于第0层）
Step 1: raw-requirement.md（获取需求要素）
Step 2: backend-overview.md + frontend-overview.md（第0层，大仓/超大仓只读summary）
Step 3: 初步定位（基于关键词匹配 + hot层优先级）
Step 4: `service-xxx/index.md` + `module-xxx/index.md`（第1层精简版，按需）→ 必要时再读 `detail.md`
Step 5: service-dependencies.md（依赖关系）
Step 6: database-registry.md（数据库影响）
```
