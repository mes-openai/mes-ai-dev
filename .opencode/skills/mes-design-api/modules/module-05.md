# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划

在开始设计前，必须先输出本次执行计划：
- **目标**：明确本次API设计的范围和目标
- **步骤**：列出将要执行的详细步骤
- **预期产出**：明确将生成的API设计文档
- **风险评估**：识别可能的接口兼容性风险

### 2. 读取前置输入

按以下顺序读取必要的输入文件：

1. **需求规格文档**
   - 路径：`mes-ai-dev/workspace/requirements/{REQ-ID}/spec.md`
   - 重点提取：功能需求、接口需求、数据交互需求

2. **技术方案文档**
   - 路径：`mes-ai-dev/workspace/designs/{REQ-ID}/tech-approach.md`
   - 重点提取：涉及的服务、技术选型

3. **API注册表**
   - 路径：`mes-ai-dev/knowledge/dependency-graph/api-registry.md`
   - 用途：了解现有API规范和风格

4. **服务详情索引**
    - 路径：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`
    - 根据技术方案中涉及的服务，读取对应服务目录下的详细索引

**Step Gate A**：前置输入不完整、现有 API 基线读取不足或服务范围不清 → 打回步骤2重做，不得进入风格分析。

### 3. 现有API风格分析

基于API注册表和服务详情：
- 分析现有Controller的命名规范
- 提取URL路径设计模式
- 了解请求/响应格式规范
- 统一错误码设计风格
- 确认分页、排序、过滤等通用参数规范

### 4. API接口设计

#### 4.1 设计原则

遵循RESTful API设计原则：
- **资源命名**：使用名词复数形式，如 `/users`, `/orders`
- **HTTP方法**：GET查询、POST创建、PUT更新、DELETE删除
- **版本控制**：URL路径版本控制，如 `/api/v1/users`
- **统一响应**：统一的响应格式和错误处理

#### 4.2 接口列表设计

为每个功能模块设计接口：

**接口基本信息**
- 接口名称
- 接口描述
- 服务归属（哪个微服务提供）
- Controller类名
- 请求方法（GET/POST/PUT/DELETE）
- URL路径

**请求设计**
- 路径参数（Path Parameters）
- 查询参数（Query Parameters）
- 请求体（Request Body）
- 请求头（Headers）

**响应设计**
- 响应体结构（Response Body）
- 响应字段说明
- 响应码说明

**Step Gate B**：现有 API 风格分析不完整或接口基本设计缺少关键信息 → 打回步骤3-4重做，不得进入统一响应与错误码设计。

### 5. 统一响应格式

定义统一的API响应格式：

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {},
  "timestamp": 1234567890
}
```
