# 执行步骤

## 执行步骤

### 步骤1：读取上次同步记录

从 `state.yaml.sync` 获取上次同步状态：

```yaml
sync:
  last_sync: "2025-04-01T10:00:00Z"
  last_command: "mes-init-project"
  status: "completed"
  backend:
    status: "completed"
    last_commit: "abc123def456"
  frontend:
    status: "completed"
    last_commit: "xyz789uvw012"
```

若不存在同步记录或 `status` 为空，则标记为全量扫描模式。
若发现统一状态源与摘要视图冲突，以 `state.yaml.sync` 为准，并按 `state-rendering-spec.md` 重新渲染允许的视图。

**Step Gate A**：上次同步记录读取不完整或 sync 状态解释不清 → 打回步骤1重做，不得进入代码仓库变更获取。

### 步骤2：获取代码仓库变更

#### 后端代码变更检测

```bash
# 获取上次同步以来的提交
cd jalor/
git log --oneline --since="${lastSyncTime}" --pretty=format:"%H %s"

# 获取变更文件列表
git diff --name-status ${lastCommitId} HEAD
```

#### 前端代码变更检测

```bash
# 获取上次同步以来的提交
cd web/
git log --oneline --since="${lastSyncTime}" --pretty=format:"%H %s"

# 获取变更文件列表
git diff --name-status ${lastCommitId} HEAD
```

### 步骤3：分类变更文件

将变更文件按类型和影响范围分类：

```markdown
