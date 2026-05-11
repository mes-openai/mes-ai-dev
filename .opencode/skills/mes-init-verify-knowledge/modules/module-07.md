# 执行步骤（4/4）

### 8. 更新同步状态

> **默认双写口径**：优先更新 `state.yaml` 的 sync 摘要字段，并同步写入 `state-detail/sync.yaml` 的 sync 明细。

写入 `state.yaml` 的 `sync` 摘要字段：
- `last_sync`：最近同步时间
- `last_command`：本次命令
- `status`：全局同步状态（流程状态英文值）
- `backend_status` / `frontend_status` / `database_status`

同步写入 `state-detail/sync.yaml` 的 sync 明细：
- backend / frontend / database 的细项状态
- `last_commit`
- changes 明细（若当前流程需要记录）

> **历史遗留**：`.sync-record.json` 仅 `mes-verify-state-migration` 专项核查时引用。

**Step Gate D**：可信度抽检、人工验真或 sync 摘要/明细更新未闭环 → 打回步骤6-8重做，不得交付知识库校验结论。
