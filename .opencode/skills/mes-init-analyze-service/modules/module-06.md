# 执行步骤（2/2）

### Step 7: 生成服务详情文档
对每个服务生成分层文档：
```
路径：mes-ai-dev/knowledge/code-map/services/service-<artifact-id>/
  ├── index.md           # 精简索引（~2K token，包路径+API数量+依赖摘要）
  ├── detail.md          # 完整详情（~8K token，完整的服务架构分析）
  ├── file-summaries.md  # 文件摘要（每个Java文件一行摘要，~100 token/文件）
  └── repo-profile.md    # 仓库画像（一致性评分+风险热力图+AI开发建议）
  ├── api-registry.md    # 服务级 API 片段，供最终收拢使用
  └── service-dependencies.md # 服务级依赖片段，供最终收拢使用
```

**index.md 格式**（精简版，用于快速确认相关性）：
```markdown
# 服务索引：<服务名称>

- **服务标识**：xxx-service
- **端口**：8080
- **包路径**：com.xxx
- **分层**：controller(15) / service(20) / dao(12) / model(16) / config(3)
- **技术栈**：MySQL + Redis + RabbitMQ
- **依赖服务**：user-service, order-service
- **使用的Schema**：mes_xxx
- **API数量**：45个
- **Java文件总数**：78个
```

**detail.md 格式**（完整版，按需加载）：
```markdown
# 服务详情：<服务名称>
