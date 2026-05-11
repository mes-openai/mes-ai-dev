# 执行步骤（1/2）

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何扫描操作前，必须先向用户输出本次执行计划，包含：
- 扫描目标：前端代码目录
- 预期产出：前端模块清单与后续模块级产物输入
- 风险评估：大型前端项目扫描可能耗时
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 读取package.json识别技术栈
```
工具：Read
路径：web/package.json

提取信息：
- name（项目名称）
- version（版本）
- dependencies（运行时依赖）
  - vue版本
  - vue-router版本
  - vuex/pinia版本
  - UI框架（element-ui, ant-design-vue等）
  - HTTP库（axios等）
- devDependencies（开发依赖）
  - 构建工具（webpack, vite等）
  - 代码规范（eslint, prettier等）
```

**Step Gate A**：package.json 读取不完整或技术栈识别错误 → 打回步骤2重做，不得进入目录扫描。

### Step 3: 扫描src目录结构
```
工具：Glob
路径：web/src/
模式：*

识别目录：
- api/ → API调用层
- assets/ → 静态资源
- components/ → 公共组件
- directives/ → 自定义指令
- filters/ → 过滤器
- icons/ → 图标资源
- layout/ → 布局组件
- router/ → 路由配置
- store/ → 状态管理
- styles/ → 全局样式
- utils/ → 工具函数
- views/ → 页面组件
```

### Step 4: 扫描路由配置
```
工具：Glob
路径：web/src/router/
模式：**/*.js

目的：识别前端模块划分
```

### Step 5: 扫描公共组件
```
工具：Glob
路径：web/src/components/
模式：**/*.vue

目的：识别公共组件库
```

### Step 6: 扫描API层
```
工具：Glob
路径：web/src/api/
模式：**/*.js

目的：识别API调用模块
```

### Step 7: 扫描页面组件
```
工具：Glob
路径：web/src/views/
模式：**/*.vue

目的：识别业务页面模块
```
