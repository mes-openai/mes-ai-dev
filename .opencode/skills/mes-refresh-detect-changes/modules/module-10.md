# 刷新计划

## 刷新计划

### 需要执行的刷新任务

| 优先级 | 任务 | 输入 | 输出 |
|--------|------|------|------|
| 1 | 更新代码地图 | change-list | `service-xxx/` 或 `module-xxx/` 目录下相关文件 |
| 2 | 更新依赖关系 | change-list | service-dependencies.md |
| 3 | 更新API注册表 | change-list | api-registry.md |
| 4 | 更新数据库索引 | change-list | database-index |

### 预计工作量

| 刷新任务 | 文件数量 | 预计耗时 |
|----------|----------|----------|
| 代码地图更新 | [数量] | [时间] |
| 依赖关系更新 | [数量] | [时间] |
| API注册表更新 | [数量] | [时间] |
| 数据库索引更新 | [数量] | [时间] |
```

### 步骤6：更新同步状态

> **默认双写口径**：优先写 `state.yaml` 的 sync 摘要字段，并同步写入 `state-detail/sync.yaml` 的 sync 明细。
> **渲染口径**：`.sync-record.json` 应从主文件 sync 摘要 + `state-detail/sync.yaml`（若存在）联合渲染，而不是继续假定所有 sync 明细都长期保留在主文件。

写入 `state.yaml.sync` 摘要字段：

```yaml
sync:
  last_sync: "2025-04-10T15:00:00Z"
  last_command: "mes-refresh-detect-changes"
  status: "running"  # 检测阶段为 running，刷新完成后改为 completed
  backend_status: "pending"
  frontend_status: "pending"
  database_status: "pending"
```

同步写入 `mes-ai-dev/knowledge/state/state-detail/sync.yaml`：

```yaml
sync_detail:
  backend:
    status: "pending"
    last_commit: "newBackendCommit123"
    changes:
      added: 5
      modified: 10
      deleted: 2
  frontend:
    status: "pending"
    last_commit: "newFrontendCommit456"
    changes:
      added: 3
      modified: 8
      deleted: 1
  database:
    status: "pending"
```

渲染 `.sync-record.json`：默认从 `state.yaml.sync` 摘要字段渲染；若存在 `state-detail/sync.yaml`，则以其补足 last_commit / changes 等明细字段。

### 步骤7：接口签名校验（语义漂移检测）

对涉及Controller变更的文件，对比知识库中记录的API签名：

1. 读取 `mes-ai-dev/knowledge/dependency-graph/api-registry.md` 获取现有API签名
2. 对比变更后的Controller方法签名：
   - 方法名是否变更
   - 参数列表是否变更（新增/删除/修改参数）
   - 返回类型是否变更
   - HTTP路径是否变更
3. 标注语义变更等级：
   - **高**：方法删除、参数变更、返回类型变更（破坏性变更）
   - **中**：方法重命名、路径变更（需要下游适配）
   - **低**：新增方法、新增参数（向后兼容）

```markdown
