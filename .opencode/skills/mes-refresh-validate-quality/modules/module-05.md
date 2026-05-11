# 执行步骤

## 执行步骤

### 1. 输出执行计划

```
本次执行计划：
目标：校验知识库一致性和完整性
步骤：
  1. 检查文件完整性（所有必要文件是否存在）
  2. 检查交叉引用一致性（overview ↔ index ↔ detail ↔ file-summaries）
  3. 检查依赖图一致性（依赖图 ↔ 各服务index中的依赖声明）
  4. 检查同步记录完整性
  5. 检查内容格式合规性
  6. 生成质量报告
预期产出：quality-report.md
风险：发现不一致项需要标记和修复
```

### 2. 文件完整性检查

逐项检查所有必要文件是否存在：

**Layer 0**：
- [ ] `code-map/backend-overview.md`
- [ ] `code-map/frontend-overview.md`

**Layer 1（每个服务）**：
- [ ] `code-map/services/<service-name>/index.md`
- [ ] `code-map/services/<service-name>/detail.md`
- [ ] `code-map/services/<service-name>/file-summaries.md`

**依赖图**：
- [ ] `dependency-graph/service-dependencies.md`
- [ ] `dependency-graph/api-registry.md`

**同步记录**：
- [ ] `state/state.yaml` 的 sync 摘要字段有效
- [ ] `state/state.yaml` 的 sync 摘要字段存在且可解释当前同步状态

**Step Gate A**：文件完整性检查不完整或 sync 节点状态不明确 → 打回步骤2重做，不得进入交叉引用一致性检查。

### 3. 交叉引用一致性检查

| 检查项 | 规则 | 失败条件 |
|--------|------|---------|
| overview ↔ index | overview中列出的服务，index.md必须存在 | overview有但index缺失 |
| index ↔ detail | 同一服务目录下index和detail必须同时存在 | 只有一个 |
| detail ↔ file-summaries | 同一服务目录下detail和file-summaries必须同时存在 | 只有一个 |
| overview ↔ dependency | overview中的每个服务，dependency-graph中必须有记录 | 服务遗漏 |
| API registry ↔ detail | API registry中的端点数应与detail中Controller方法数基本一致 | 差异>10% |

### 4. 依赖图一致性检查

1. 读取 `service-dependencies.md`，提取所有依赖关系
2. 对每个服务，读取其 `index.md` 中的"依赖服务"章节
3. 对比两处记录是否一致：
   - 依赖方向是否匹配
   - 调用方式是否一致
4. 不一致的项标记为"待修正"

### 5. 同步状态检查

1. 读取 `mes-ai-dev/knowledge/state/state.yaml` 的 `sync` 摘要字段
2. 按 `state-rendering-spec.md` 检查摘要/兼容视图是否能解释当前状态
3. 重点检查以下摘要字段：
   - `last_sync`
   - `last_command`
   - `status`
   - `backend_status / frontend_status / database_status`
4. 检查 sync 状态字段：
    - `synced` → 正常
    - `outdated` → 标记警告
    - `error` → 标记错误
5. 检查 `last_sync` 时间是否在合理范围内（不超过7天）

> 若未来存在 `state-detail/sync.yaml`，默认不将其作为本 Skill 的前置输入；
> 只有在摘要状态异常、但主文件不足以解释原因时，才允许作为诊断补充读取。

**Step Gate B**：交叉引用、依赖图或同步状态检查存在未解释差异 → 打回步骤3-5重做，不得进入内容格式校验与质量报告生成。
