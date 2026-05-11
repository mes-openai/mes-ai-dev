# 执行步骤

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发Vue页面组件和配置路由
步骤：
  1. 读取前端设计和路由结构
  2. 定位目标前端模块和页面路径
  3. 分析现有页面风格和路由配置
  4. 选择页面模板并开发页面组件
  5. 选择路由模板并配置路由
预期产出：页面组件文件、路由配置变更、路由变更清单
风险：路由冲突、页面布局不一致、模板选型与现有代码风格不匹配
```

### 2. 读取设计文档和现有代码
按顺序读取：
1. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/design.md` - OpenSpec 详细设计主文档（前端页面部分）
2. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/api-design.md` - API设计
3. `mes-ai-dev/knowledge/code-map/frontend-overview.md` - 前端总览（路由结构）
4. `mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md` - 模块详情
5. `mes-ai-dev/knowledge/code-map/modules/module-xxx/file-summaries.md` - 模块文件摘要（用于定位页面与路由文件）

### 3. 定位页面文件路径
1. 从模块详情和文件摘要确定页面位置：`web/module-xxx/src/views/` 或 `web/module-xxx/src/pages/`
2. 从前端总览确定路由配置：`web/module-xxx/src/router/`

**Step Gate A**：页面路径、路由配置或设计输入定位不完整 → 打回步骤2-3重做，不得进入现有页面风格分析。

### 4. 分析现有页面风格
读取现有的页面文件（至少 3 个），分析：
- **页面结构风格**：页面布局结构、页面容器使用、区域划分方式
- **路由配置风格**：路由定义方式、路由命名规范、路由参数传递、路由守卫使用
- **页面逻辑风格**：数据初始化方式、组件引用方式、事件处理方式、状态管理使用

### 5. 选择页面模板并开发页面组件
创建文件：`web/module-xxx/src/views/XxxPage.vue`

#### 页面模板选择规则
- 若目标模块沿用 **Vue2 / Options API** 风格，优先使用：
  - `mes-ai-dev/templates/code/vue-page-options-api.vue`
- 若目标模块沿用 **Vue3 / Composition API / TypeScript** 风格，优先使用：
  - `mes-ai-dev/templates/code/vue-page-composition-api.vue`

> **使用要求**：
> - 模板只提供页面骨架，不可原样提交占位命名（如 `XxxPage`、`xxx-component`）
> - 必须将页面标题、组件引用、API 引用、类型定义、路由参数和业务交互替换为真实模块实现
> - 必须以目标模块现有页面风格为准，而不是机械照搬模板

### 6. 选择路由模板并配置路由
创建或修改路由配置文件：`web/module-xxx/src/router/index.js`

#### 路由模板
- 新增页面路由时，参考：
  - `mes-ai-dev/templates/code/vue-route-config.js`

> **使用要求**：
> - 路由 path / name / meta 必须按现有模块规范替换
> - 若项目实际使用 TypeScript 路由、分模块路由或异步路由注册，必须优先遵循现有写法

### 7. 创建路由变更清单
创建文件：`mes-ai-dev/workspace/development/REQ-YYYYMMDD-XXX/frontend/route-change-list.md`

路由变更清单必须至少包含：
- 新增路由 / 修改路由的路径、名称、组件文件
- 关键 meta 信息（title / requiresAuth / hidden 等）
- 路由树结构
- 验证步骤：
  1. 路径冲突检查
  2. 权限检查
  3. 面包屑检查
  4. 页面访问测试

**Step Gate B**：页面组件、路由配置或路由变更清单存在缺口 → 打回步骤4-7重做，不得交付下游测试阶段。
