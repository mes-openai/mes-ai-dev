# 约束规则

## 约束规则

### 执行前必须输出计划
每次执行前必须输出执行计划，经用户确认后才可继续。

### 必须读取现有风格
在编写任何组件前，必须：
1. 读取目标模块现有的组件文件（至少 5 个）
2. 分析组件结构、模板风格、样式风格、公共组件使用
3. 保持与现有代码风格一致

### 公共组件复用
必须优先使用公共组件：
- 表单输入：使用公共 Input、Select、DatePicker 等
- 数据展示：使用公共 Table、Pagination 等
- 交互反馈：使用公共 Dialog、Message 等
- 不重复开发已存在的公共组件

### 组件命名规范
- 组件文件名：`XxxComponent.vue`、`XxxDetail.vue`
- 组件 name 属性：`XxxComponent`、`XxxDetail`
- 类名：BEM 规范 `.xxx-component__element--modifier`

### Props 定义规范
- 所有 props 必须定义 type
- 所有 props 必须有注释
- 使用 default 提供默认值
- 使用 required 标记必填 props

### 事件命名规范
- 事件名：动词开头，如 `create`、`update`、`delete`
- 事件参数：传递必要数据
- 使用 `$emit` 或 `defineEmits` 触发事件

### 样式规范
- 使用 scoped 限制样式作用域
- 使用 BEM 命名类名
- 遵循现有样式变量
- 不使用行内样式

### 不硬编码服务名
组件中引用 API 时，使用已封装的 API 函数，不硬编码 URL 或服务名。
