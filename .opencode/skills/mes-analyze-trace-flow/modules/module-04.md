# 执行步骤（2/2）

### 7. 绘制调用链路图
基于读取的信息，绘制完整的调用链路：
- 前端层：页面组件与用户交互
- API 调用层：前端 API 与后端接口映射
- 后端 Controller 层：参数校验与入口逻辑
- Service 层：业务处理、跨服务调用与事务边界
- DAO 层：DAO/Mapper 与 SQL 操作
- 数据库层：Schema / 表 / 操作类型
- 公共契约层：SDK/common/shared 中的统一响应、错误码、请求/响应模型（若存在）

同时补充：
- 主流程调用链
- 分支流程调用链
- 异常流程
- 风险点
- provider 选择点
- 待补证断点

**Step Gate C**：调用链路不完整、分支/异常流程遗漏或风险点未标注 → 打回步骤6-7重做，不得生成追踪报告。

### 8. 使用追踪报告模板生成交付文件
生成文件：`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/business-flow-trace.md`

统一使用：
- `mes-ai-dev/templates/analyze/business-flow-trace-report-template.md`

> **模板使用要求**：
> - 模板只提供结构化追踪报告骨架，不可保留占位文本
> - 必须将页面、接口、服务、DAO、数据库、风险点和代码位置替换为真实追踪结果
> - 若存在分支流程 / 跨服务调用 / 异常流程，不可遗漏

**Step Gate D**：`business-flow-trace.md` 缺少真实链路、代码位置或风险结论 → 打回步骤8重做，不得交付后续设计阶段。
