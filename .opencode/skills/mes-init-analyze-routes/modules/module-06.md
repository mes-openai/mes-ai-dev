# 执行步骤（2/2）

### Step 8: 匹配后端API
```
工具：Read
路径：mes-ai-dev/knowledge/code-map/services/*/api-registry.md

目的：建立前后端API映射
- 前端API URL → 后端Controller路径
```

**Step Gate B**：路由树、页面/API调用或后端匹配分析存在缺口 → 打回步骤3-8重做，不得生成模块文档。

### Step 9: 生成模块文档
对每个前端模块生成分层文档：
```
路径：mes-ai-dev/knowledge/code-map/modules/module-<name>/
  ├── index.md           # 精简索引（~2K token）
  ├── detail.md          # 完整详情（~8K token）
  └── file-summaries.md  # 文件摘要（每个Vue/JS文件一行摘要）
```

### Step 10: 生成前后端映射图
```
工具：Write
路径：mes-ai-dev/knowledge/code-map/modules/module-<name>/frontend-backend-map.md
```

**Step Gate C**：模块文档或前后端映射片段缺少路由、API、数据流或匹配关系 → 打回步骤9-10重做，不得交付下游初始化步骤。
