# 约束规则

## 约束规则
1. **执行前必须先输出计划**，等待用户确认后再继续
2. 依赖backend-overview.md的存在，若不存在则先执行init-scan-backend
3. 不读取Java文件的具体实现代码，仅分析结构
4. 配置文件若不存在则标记"未找到"
5. restService.properties若不存在则标记"无服务调用配置"
6. 所有输出使用中文
7. 文件命名使用服务的artifact-id
