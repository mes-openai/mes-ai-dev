# 执行步骤

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发Vue UI组件
步骤：
  1. 读取前端设计和公共组件列表
  2. 定位目标前端模块和组件路径
  3. 分析现有组件风格
  4. 选择组件模板并开发组件文件
  5. 如需要，选择子组件模板并开发子组件
预期产出：Vue组件文件、样式文件
风险：组件职责不清、公共组件未复用、模板选型与现有组件风格不匹配
```

### 2. 读取设计文档和现有代码
按顺序读取：
1. `mes-ai-dev/workspace/designs/{REQ-ID}/design.md` - OpenSpec 详细设计主文档（前端 UI 部分）
2. `mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md` - API设计
3. `mes-ai-dev/knowledge/code-map/frontend-overview.md` - 前端总览（公共组件列表）
4. `mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md` - 模块详情
5. `mes-ai-dev/knowledge/code-map/modules/module-xxx/file-summaries.md` - 模块文件摘要（用于定位组件文件）

### 3. 定位组件文件路径
1. 从前端总览确定公共组件：`web/common/src/components/`
2. 从模块详情和文件摘要确定业务组件：`web/module-xxx/src/components/`
3. 确定组件样式位置：与组件同目录或 `src/styles/`

**Step Gate A**：设计输入、组件路径或公共组件基线识别不完整 → 打回步骤2-3重做，不得进入现有组件风格分析。

### 4. 分析现有组件风格
读取现有的组件文件（至少 5 个），分析：
- **组件结构风格**：组件命名规范、props 定义方式、data/computed 定义、methods 组织方式
- **模板风格**：HTML 结构规范、类名命名规范、指令使用方式、组件引用方式
- **样式风格**：CSS/SCSS 使用、scoped、类名命名（BEM 或其他）、样式变量使用
- **公共组件使用**：常用公共组件、公共组件的 props 和事件、公共组件的扩展方式

### 5. 识别可复用的公共组件
根据公共组件列表，识别可复用的组件：
- **表单组件**：Input、Select、DatePicker、Upload 等
- **数据展示**：Table、Tree、Pagination、Card 等
- **交互组件**：Dialog、Message、Notification、Tooltip 等
- **布局组件**：Layout、Container、Header、Footer 等

### 6. 选择组件模板并开发主组件
创建文件：`web/module-xxx/src/components/XxxComponent.vue`

#### 组件模板选择规则
- 若目标模块沿用 **Vue2 / Options API** 风格，优先使用：
  - `.opencode/references/mes-ai-reference/templates/code/vue-component-options-api.vue`
- 若目标模块沿用 **Vue3 / Composition API / TypeScript** 风格，优先使用：
  - `.opencode/references/mes-ai-reference/templates/code/vue-component-composition-api.vue`

> **使用要求**：
> - 模板只提供组件骨架，不可原样提交占位命名（如 `XxxComponent`、`xxx-detail`）
> - 必须将 props、emit、API 引用、表格列、事件和业务字段替换为真实实现
> - 必须优先复用项目现有公共组件，而不是机械照搬模板中的占位组件

### 7. 开发子组件（如需要）
创建文件：`web/module-xxx/src/components/XxxDetail.vue`

#### 子组件模板
- 需要详情展示或纯展示型子组件时，参考：
  - `.opencode/references/mes-ai-reference/templates/code/vue-detail-subcomponent.vue`

### 8. 组件开发检查
完成组件开发后，至少检查：
1. 是否优先复用公共组件
2. props / emits / ref 使用是否符合现有模块风格
3. 组件职责是否单一
4. 样式是否符合现有命名和作用域规范

**Step Gate B**：组件文件、子组件或样式/事件/复用策略存在缺口 → 打回步骤4-8重做，不得交付页面集成阶段。
