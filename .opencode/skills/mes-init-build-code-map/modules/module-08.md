# 知识库结构

## 知识库结构

本知识库采用四层索引架构：

### 第0层：系统总览
- `code-map/backend-overview.md` - 后端服务总览
- `code-map/frontend-overview.md` - 前端模块总览

### 第1层-精简版：服务/模块索引
- `code-map/services/service-*/index.md` - 各微服务精简索引
- `code-map/modules/module-*/index.md` - 各前端模块精简索引

### 第1层-完整版：服务/模块详情
- `code-map/services/service-*/detail.md` - 各微服务完整详情
- `code-map/modules/module-*/detail.md` - 各前端模块完整详情

### 第1.5层：文件摘要
- `code-map/services/service-*/file-summaries.md` - 各微服务文件摘要
- `code-map/modules/module-*/file-summaries.md` - 各前端模块文件摘要

### 第2层：依赖关系
- `dependency-graph/api-registry.md` - API注册表
- `dependency-graph/service-dependencies.md` - 服务依赖关系
- `dependency-graph/database-registry.md` - 数据库注册表
- `dependency-graph/frontend-backend-map.md` - 前后端映射

### 第3层：数据库索引
- `database-index/schema-*/` - 各Schema表结构
