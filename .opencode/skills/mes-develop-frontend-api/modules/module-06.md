# 执行步骤

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发前端API调用层
步骤：
  1. 读取API设计和现有API封装风格
  2. 定位目标前端模块和API路径
  3. 分析现有API封装风格
  4. 选择API模板并开发请求文件
  5. 如使用TS，选择类型模板并开发类型定义文件
预期产出：API请求文件、类型定义文件
风险：API路径不一致、响应处理错误、模板选型与现有封装风格不一致
```

### 2. 读取设计文档和现有代码
按顺序读取：
1. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/api-design.md` - API设计（核心）
2. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/design.md` - OpenSpec 详细设计主文档（前端部分）
3. `mes-ai-dev/knowledge/code-map/frontend-overview.md` - 前端总览
4. `mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md` - 前后端映射

### 3. 定位 API 文件路径
1. 从前端总览、模块详情和文件摘要确定前端模块：
   - `mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md`
   - `mes-ai-dev/knowledge/code-map/modules/module-xxx/file-summaries.md`
2. 确定 API 文件位置：`web/module-xxx/src/api/`
3. 确定请求封装位置：`web/module-xxx/src/utils/request.js`（或查看公共封装）

**Step Gate A**：API设计、模块定位或请求封装基线读取不完整 → 打回步骤2-3重做，不得进入现有 API 风格分析。

### 4. 分析现有 API 封装风格
读取现有的 API 文件（至少 3 个），分析：
- **请求封装风格**：axios 实例配置、请求拦截器、响应拦截器、异常处理方式
- **API 文件风格**：文件命名规范、函数命名规范、参数传递方式、返回值类型
- **类型定义风格**（如使用 TS）：接口定义方式、类型命名规范、泛型使用方式

### 5. 选择 API 模板并开发请求文件
创建文件：`web/module-xxx/src/api/xxx.js`（或 `xxx.ts`）

#### API 模板选择规则
- 若目标模块沿用 **JavaScript API 文件** 风格，优先使用：
  - `mes-ai-dev/templates/code/frontend-api-js.js`
- 若目标模块沿用 **TypeScript API 文件** 风格，优先使用：
  - `mes-ai-dev/templates/code/frontend-api-ts.ts`

> **使用要求**：
> - 模板只提供请求层骨架，不可原样提交占位路径、函数名和类型名
> - 必须将 URL、函数命名、参数、返回值和类型引用替换为真实设计内容
> - 必须严格按现有模块请求封装风格实现，不得机械照搬模板

### 6. 开发类型定义文件（如使用 TS）
创建文件：`web/module-xxx/src/types/xxx.ts`

#### 类型模板
- 若项目使用 TypeScript API / VO / DTO 定义，参考：
  - `mes-ai-dev/templates/code/frontend-api-types.ts`

### 7. 验证 API 路径映射
对照 API 设计文档，验证每个 API 函数的路径是否与后端 Controller 一致。

**Step Gate B**：API请求文件、类型定义或路径映射验证存在缺口 → 打回步骤4-7重做，不得交付下游组件/页面开发。
