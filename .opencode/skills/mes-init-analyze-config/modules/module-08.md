# 输出

## 输出
- 文件路径：`mes-ai-dev/knowledge/code-map/services/service-<artifact-id>/service-dependencies.md`
- 全局 `mes-ai-dev/knowledge/dependency-graph/service-dependencies.md` 由 `/mes-init-project` 全仓最终收拢或 `/mes-init-converge` 统一生成
- 内容格式：
  ```markdown
  # 服务依赖关系图
  
  ## 概览
  - 服务总数：XX个
  - 有外部调用的服务：XX个
  - 分析时间：YYYY-MM-DD HH:mm:ss
  
  ## 服务依赖矩阵
  
  | 服务 | 调用服务 | 数据库 | Redis | MQ | 注册中心 |
  |------|---------|-------|-------|----|----|
  | user-service | order-service | MySQL | ✓ | RabbitMQ | Nacos |
  | order-service | inventory-service | MySQL | ✓ | RabbitMQ | Nacos |
  
  ## 详细依赖关系
  
  ### user-service（用户服务）
  
  #### 服务调用
  - **调用方**：gateway-service
  - **被调用方**：order-service, auth-service
  
  #### 数据库依赖
  - 数据库：mes_user
  - 类型：MySQL
  - 连接池：HikariCP
  
  #### 中间件依赖
  - 缓存：Redis（192.168.1.100:6379）
  - 消息队列：无
  - 注册中心：Nacos
  
  #### 第三方库依赖
  - Spring Boot：2.3.12.RELEASE
  - MyBatis：3.5.6
  - Jalor Framework：2.0.0
  
  ### order-service（订单服务）
  
  #### 服务调用
  - **调用方**：gateway-service, user-service
  - **被调用方**：inventory-service, payment-service
  
  #### 数据库依赖
  - 数据库：mes_order
  - 类型：MySQL
  - 连接池：HikariCP
  
  #### 中间件依赖
  - 缓存：Redis
  - 消息队列：RabbitMQ
  - 注册中心：Nacos
  
  ## 依赖统计
  
  ### 数据库Schema分布
  - mes_user：user-service
  - mes_order：order-service
  - mes_inventory：inventory-service
  
  ### 中间件使用统计
  - Redis使用服务：5个
  - RabbitMQ使用服务：3个
  - Kafka使用服务：1个
  
  ## 异常列表
  - 缺少application.yml：XXX
  - 缺少restService.properties：XXX
  ```
