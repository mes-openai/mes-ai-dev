# 影响传导关系

## 影响传导关系

### auth-service 变更影响链
```
auth-service变更
├── 高风险影响：所有需要鉴权的服务
│   ├── user-service（核心依赖）
│   ├── order-service（核心依赖）
│   ├── inventory-service（核心依赖）
│   └── ...（共15个服务）
└── 必须评估：API兼容性、鉴权逻辑变更
```

### user-service 变更影响链
```
user-service变更
├── 中风险影响：所有关联用户信息的服务
│   ├── order-service（用户查询）
│   ├── report-service（用户统计）
│   └── ...（共12个服务）
└── 必须通知：用户数据结构变更
```
```

### Step 4: 构建API映射关系图
基于API注册表和前后端映射：
```
分析维度：
1. 前端模块 → 后端服务
   - 哪些前端模块调用哪些服务
   - API调用频率统计
   
2. API链路追踪
   - 前端页面 → API → Controller → Service → DAO → 表
   - 完整调用链路
   
3. 未使用的API
   - 后端提供但前端未调用
   - 待废弃的API候选
```

### Step 5: 构建数据库归属关系图
基于数据库注册表和服务配置：
```
分析维度：
1. Schema归属
   - 服务 → Schema映射
   - 一对一 / 一对多关系
   
2. 表归属
   - 表 → 服务映射
   - 跨服务共享表检测
   
3. 数据流分析
   - API → 表访问路径
   - 读写分离配置
```

**Step Gate B**：服务调用、API映射或数据库归属关系构建存在缺口 → 打回步骤3-5重做，不得生成完整依赖图。

### Step 6: 构建完整依赖关系图
```
工具：Write
路径：mes-ai-dev/knowledge/dependency-graph/DEPENDENCY-GRAPH.md

生成内容：
1. 服务依赖关系图（文本描述 + Mermaid图）
2. API映射关系图
3. 数据库归属关系图
4. 依赖统计
5. 风险点分析
```

### Step 7: 更新各依赖文件
```
工具：Edit
更新以下文件，补充交叉引用：
1. api-registry.md → 基于服务级片段汇总后补充调用链路
2. service-dependencies.md → 基于服务级片段汇总后增加依赖统计
3. database-registry.md → 基于 Schema 片段汇总后增加API映射
4. frontend-backend-map.md → 基于模块级片段汇总后增加数据流
```

**Step Gate C**：完整依赖图或依赖文件更新缺少统计、链路或风险分析 → 打回步骤6-7重做，不得交付最终收拢结果。
