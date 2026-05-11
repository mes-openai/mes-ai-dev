# 执行步骤（2/3）

### Step 3: 执行状态文件清理

#### 3.1 重置 state.yaml

将 `knowledge/state/state.yaml` 重置为初始模板：

```yaml
# 知识库统一状态源（唯一已合并机器事实源）
schema_version: "1.0"
state_mode: primary
last_updated: ""
last_command: ""
state_fragments_dir: "mes-ai-dev/knowledge/state/fragments/"

merge_control:
  pending_fragments: []
  last_merged_fragment: ""
  last_merged_at: ""
  merge_status: pending

knowledge:
  trust:
    level: unknown
    last_refresh_time: ""

initialization:
  scan:
    status: pending
    time: ""
  repository_scale:
    backend_lines: 0
    service_count: 0
    scale_label: ""
  coverage_summary:
    backend_coverage_rate: ""
    frontend_coverage_rate: ""

checkpoint:
  command: ""
  mode: ""
  status: pending
  started_at: ""
  updated_at: ""

sync:
  last_sync: ""
  status: pending
```

#### 3.2 清空 state-detail/

```bash
rm -rf knowledge/state/state-detail/*.yaml
```

#### 3.3 清空 fragments/

```bash
rm -rf knowledge/state/fragments/*
```

#### 3.4 删除历史遗留文件

```bash
rm -f knowledge/.sync-record.json
rm -f knowledge/.init-checkpoint.yaml
```

**Step Gate C**：状态文件清理或重置不完整 → 打回步骤3重做，不得进入阶段产物清理。

### Step 4: 执行阶段产物清理

#### 4.1 清空各阶段目录

```bash
rm -rf workspace/requirements/*
rm -rf workspace/designs/*
rm -rf workspace/development/*
rm -rf workspace/testing/*
rm -rf workspace/delivery/*
rm -rf workspace/emergency/*
```

#### 4.2 保留必要文件

确保以下文件保留：
- `workspace/delivery/README.md`（如有）
- `workspace/locks/` 目录（如有）
- `workspace/examples/` 目录（完整保留）

**Step Gate D**：阶段产物清理不完整或保留文件被误删 → 打回步骤4重做，不得进入刷新记录清理。
