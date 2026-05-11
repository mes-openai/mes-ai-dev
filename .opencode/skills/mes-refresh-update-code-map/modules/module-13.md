# 配置项

## 配置项

| 配置项 | 值 | 说明 |
|--------|-----|------|
| server.port | [端口] | 服务端口 |
| spring.datasource.url | [URL] | 数据库连接 |
```

新增服务时，同时补充：

- `service-[服务名]/detail.md`：维护完整详情，包括 API、实体、依赖、配置等深度信息
- `service-[服务名]/file-summaries.md`：维护关键代码文件摘要，便于精准定位源码

#### 修改服务处理

若服务有变更，按变更内容更新对应目录中的文件：

1. **新增API**：更新 `detail.md` 中的 API 端点表格，必要时同步更新 `index.md` 摘要
2. **新增Entity**：更新 `detail.md` 中的数据实体表格，并在 `file-summaries.md` 增加对应文件摘要
3. **新增依赖**：更新 `detail.md` 中的服务依赖表格，必要时同步更新 `index.md` 摘要
4. **修改结构**：更新 `index.md` 的精简索引，并在 `detail.md` 中补充结构说明

#### 删除服务处理

若服务被删除，标记服务目录下相关文件为已删除：

```markdown
# service-[服务名]/index.md

> ⚠️ 此服务已删除
> 删除时间：[日期]
> 删除原因：[原因]
```

### 步骤3：更新前端模块索引

#### 新增模块处理

若变更清单中有新增模块，创建新的模块目录，并生成 `index.md`、`detail.md`、`file-summaries.md`：

```markdown
# module-[模块名]/index.md
