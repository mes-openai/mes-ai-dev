# 输出

## 输出
- 文件路径：`mes-ai-dev/knowledge/state/fragments/*.yaml` 中的 coverage 片段与后续 `services/service-xxx/*` 的输入清单
- 内容格式：
  ```markdown
  # 后端服务总览
  
  ## 服务列表
  
  | 序号 | 服务标识 | 服务名称 | 类型 | Java文件数 | 配置文件 | 状态 |
  |------|---------|---------|------|-----------|---------|------|
  | 1 | xxx-service | XXX服务 | 微服务 | 234 | application.yml | 已识别 |
  
  ## 技术栈
  - 框架：Jalor
  - 语言：Java
  - 构建工具：Maven
  
  ## 统计信息
  - 微服务数量：XX个
  - 总代码文件：XXXX个
  - 扫描时间：YYYY-MM-DD HH:mm:ss
  ```
