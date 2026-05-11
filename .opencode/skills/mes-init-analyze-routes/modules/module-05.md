# 执行步骤（1/2）

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何分析操作前，必须先向用户输出本次执行计划，包含：
- 分析目标：路由配置和页面组件
- 预期产出：每个模块目录（含index.md、detail.md、file-summaries.md）和模块级映射片段
- 风险评估：需解析路由文件和Vue组件
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 读取前端总览
```
工具：Read
路径：mes-ai-dev/knowledge/state/state.yaml 或 `mes-ai-dev/knowledge/code-map/modules/*/index.md`
目的：获取前端模块列表，避免依赖尚未收拢的共享总览
```

**Step Gate A**：模块列表读取不完整或范围判定错误 → 打回步骤2重做，不得进入路由与页面分析。

### Step 3: 读取路由配置
```
工具：Glob
路径：web/src/router/
模式：**/*.js

工具：Read
路径：web/src/router/index.js
目的：解析路由树结构
```

### Step 4: 解析路由树
对每个路由配置：
```
提取信息：
1. 路由路径（path）
2. 路由名称（name）
3. 页面组件（component）
4. 子路由（children）
5. 路由元信息（meta）
   - 标题（title）
   - 图标（icon）
   - 权限（roles/permissions）
   - 是否缓存（keepAlive）
```

### Step 5: 分析页面组件
对views目录下的每个模块：
```
工具：Glob
路径：web/src/views/<module>/
模式：**/*.vue

工具：Read
路径：web/src/views/<module>/<page>.vue

提取信息：
1. 组件名称
2. API调用（import from '@/api/xxx'）
3. 使用到的公共组件
4. 生命周期钩子中的数据加载
```

### Step 6: 提取API调用
对每个页面组件：
```
解析内容：
1. import语句中的API导入
   - import { getUserList } from '@/api/user'
   
2. methods中的API调用
   - getUserList().then(...)
   - this.$api.user.getList(...)
   
3. 请求URL提取
   - 从API文件中解析实际URL
```

### Step 7: 读取API定义文件
```
工具：Read
路径：web/src/api/<module>.js

提取信息：
- API方法名
- 请求URL
- 请求方法（GET/POST等）
- 请求参数
```
