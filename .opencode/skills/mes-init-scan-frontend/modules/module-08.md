# 输出

## 输出
- 文件路径：`state/fragments/*.yaml` 中的 coverage 片段与后续 `modules/module-xxx/*` 的输入清单
- 内容格式：
  ```markdown
  # 前端架构总览
  
  ## 技术栈
  - 框架：Vue 2.6.14
  - UI库：Element-UI 2.15.6
  - 路由：Vue-Router 3.5.2
  - 状态管理：Vuex 3.6.2
  - HTTP库：Axios 0.21.1
  - 构建工具：Vue-CLI 4.5.13
  
  ## 项目结构
  
  ```
  web/
  ├── public/              # 静态资源
  ├── src/
  │   ├── api/            # API调用层（23个模块）
  │   ├── assets/         # 静态资源
  │   ├── components/     # 公共组件（45个组件）
  │   ├── directives/     # 自定义指令（5个）
  │   ├── filters/        # 过滤器（3个）
  │   ├── icons/          # 图标资源
  │   ├── layout/         # 布局组件（3个）
  │   ├── router/         # 路由配置
  │   ├── store/          # Vuex状态管理（8个模块）
  │   ├── styles/         # 全局样式
  │   ├── utils/          # 工具函数（15个）
  │   └── views/          # 页面组件（按业务模块组织）
  └── package.json
  ```
  
  ## 模块列表
  
  | 序号 | 模块名称 | 路由前缀 | 页面数 | 说明 |
  |------|---------|---------|-------|------|
  | 1 | 用户管理 | /user | 5 | 用户增删改查、角色分配 |
  | 2 | 订单管理 | /order | 8 | 订单查询、创建、审批 |
  | 3 | 库存管理 | /inventory | 6 | 库存查询、入库、出库 |
  | 4 | 系统设置 | /system | 4 | 参数配置、字典管理 |
  
  ## 公共组件库
  
  | 序号 | 组件名称 | 路径 | 说明 |
  |------|---------|------|------|
  | 1 | Pagination | components/Pagination | 分页组件 |
  | 2 | Upload | components/Upload | 文件上传组件 |
  | 3 | RichTextEditor | components/RichTextEditor | 富文本编辑器 |
  | 4 | TreeSelect | components/TreeSelect | 树形选择器 |
  
  ## API模块
  
  | 序号 | 模块名称 | 文件 | API数量 | 对应后端服务 |
  |------|---------|------|---------|-------------|
  | 1 | user | api/user.js | 12 | user-service |
  | 2 | order | api/order.js | 18 | order-service |
  | 3 | inventory | api/inventory.js | 10 | inventory-service |
  
  ## 代码统计
  - Vue组件总数：XXX个
  - JavaScript文件：XXX个
  - 总代码行数：约XXX行
  - 扫描时间：YYYY-MM-DD HH:mm:ss
  
  ## 构建配置
  - 构建工具：Vue-CLI
  - 开发端口：9527
  - 代理配置：/api → http://localhost:8080
  
  ## 异常列表
  - 未识别的模块：XXX
  - 缺少路由配置的页面：XXX
  ```
