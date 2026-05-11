# 执行步骤（2/4）

### 3.5 数据库索引内容质量校验

对本次执行范围内所有 `knowledge/database-index/schema-<schema-name>/index.md` 逐个执行以下检查：

1. **章节完整性检查**
   - 是否包含 Schema 概览
   - 是否包含风险画像或语义等价章节
   - 是否包含关键表/关键对象摘要

2. **占位内容检查**
   - 禁止仅保留模板标题无正文
   - 禁止出现 `TODO`、`[待补充]`、`[请填写]`、`待完善` 等占位词作为正式结论
   - 禁止整章为空，或只有列表标题没有实际内容

3. **最小画像完整性检查**
   - 是否存在风险等级结论
   - 是否存在风险判断依据
   - 是否存在关键对象说明
   - 是否对热表/共享表/大表/回滚敏感对象给出识别结果；未识别时必须明确说明“本次未识别”

4. **明细文件联动检查**
   - 若状态、步骤或命令声明本次应生成 `tables.md`，则检查 `tables.md` 是否存在且非空壳
   - 若状态、步骤或命令声明本次应生成 `relations.md`，则检查 `relations.md` 是否存在且非空壳

输出时必须形成数据库专项审查摘要，至少包含：纳入校验的 Schema 数量、`index.md` 已生成数量、风险画像达标数量、占位内容 Schema 清单、关键结论缺失 Schema 清单，以及 `tables.md` / `relations.md` 的达标统计（如适用）。

### 4. 交叉引用一致性
- backend-overview 服务数 = services/ 目录数
- frontend-overview 模块数 = modules/ 目录数
- api-registry 服务数 = backend-overview 服务数
- 服务调用关系双向一致

**Step Gate B**：覆盖率、数据库索引内容质量或交叉引用存在未解释差异 → 打回步骤3-4重做，不得进入状态写入。

### 5. 写入统一状态源

> **写入路径（双写兼容总原则）**：初始化运行中先写 `state/fragments/*.yaml`；收拢完成后优先写 `state/state.yaml` 的摘要与高频判断字段；若已启用 `state-detail/` 双写兼容，则同步写入 detail 明细文件；最后再按规范渲染兼容视图。
> **状态分层原则**：主文件承载唯一已合并机器事实源中的高频判断字段与摘要字段；`state-detail/` 承载 coverage、recent_execution、convergence、sync、checkpoint 等低频明细字段；兼容视图按“主文件摘要 + detail 明细（若存在）”统一渲染。
> **渲染规范**：字段映射、更新顺序与冲突处理按 `state-rendering-spec.md` 执行。

#### 5.1 初始化阶段写入 state/fragments/*.yaml（运行中主写入）

初始化进行中时，先写入 `mes-ai-dev/knowledge/state/fragments/*.yaml`：
- scope 标识（repo/module/schema）
- coverage 增量
- checkpoint 状态
- pending_shared_files
- pending_state_fragments / merge hints

#### 5.2 收拢后写入 state/state.yaml（最终主写入）

收拢后应优先写入 `mes-ai-dev/knowledge/state/state.yaml` 的摘要与高频判断节点；
coverage / recent_execution / convergence / sync / checkpoint 的长字段，在双写兼容阶段允许同步写入 `state-detail/`，而不再默认要求全部长期保留在主文件。

当前阶段至少应确保主文件可承载以下高频节点：
- `initialization.scan`：扫描时间、范围、状态
- `initialization.repository_scale`：仓规模统计与 scale_label
- `initialization.coverage_summary`：后端/前端/Schema 覆盖率摘要与最小可消费统计
- `initialization.recent_execution_summary`：最近执行模式、命令、checkpoint 状态与必要摘要计数
- `initialization.convergence`：收敛状态摘要（status / last_run / accepted_as_global_baseline / 必要计数）
- `initialization.global_summary`：覆盖率、可信度下限、门禁校验结论

若已启用双写兼容，则以下长字段应逐步迁入 `state-detail/`：
- coverage 明细（backend_services / frontend_modules / schemas）
- recent_execution 明细（deferred_shared_files / pending_reference_fragments / pending_code_map_fragments / scope summary）
- convergence 明细（pending_shared_files / pending_reference_fragments / pending_code_map_fragments / last_converged_fragment_batch / deviations 等）
- sync 明细
- checkpoint 明细

#### 5.3 渲染兼容视图（次要）

兼容视图仍以统一状态源为准，但在双写兼容阶段应允许按“主文件摘要 + detail 明细（若存在）”联合渲染：
- `mes-ai-dev/knowledge/baseline.md`：人工阅读版基线摘要
- `mes-ai-dev/knowledge/init-coverage.md`：覆盖清单兼容视图；默认按主文件 coverage 摘要 + `state-detail/coverage.yaml` 联合渲染
- `mes-ai-dev/knowledge/state/summary.md`：人工阅读版状态摘要（需展示待收口片段是否清空）

**Step Gate C**：状态写入或兼容视图渲染不符合规范 → 打回步骤5重做，不得进入可信度抽检。

> **历史遗留**：`.init-checkpoint.yaml` / `.sync-record.json` 已标记为历史遗留，
> 仅 `mes-verify-state-migration` 专项核查时引用，不在新渲染流程中。
