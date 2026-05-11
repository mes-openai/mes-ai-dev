# 校验维度

## 校验维度

基于 `migration-checklist.md` 的五维度校验：

### 维度一：写入协议检查
验证核心写入链路是否已切换到 `state.yaml` 主写入。

重点检查：
- mes-init-project / mes-init-enrich / mes-init-converge / mes-refresh-knowledge 的写入顺序
- mes-init-verify-knowledge 的写入职责
- 是否仍存在旧主路径残留

### 维度二：读取协议检查
验证核心读取链路是否已切换到“新状态源优先”。

重点检查：
- mes-guard-context-budget / mes-analyze-impact-scope / mes-refresh-detect-changes / mes-refresh-validate-quality 的读取口径
- mes-verify-phase-gate 的状态门禁绑定
- 依赖全仓视角结果的命令是否已显式声明 convergence 依赖
- 新鲜度预检是否优先读取 summary.md

### 维度三：规则闭环检查
验证关键规则文件是否已标注统一状态源、历史遗留与 convergence 规则。

重点检查：
- AGENTS 是否声明唯一事实源
- phase-gates / state-rendering-spec 是否纳入 convergence
- baseline / summary / state.yaml 是否引用渲染规范
- budget / repository-scale 是否已切换新口径

### 维度四：冲突与一致性排查
验证 `state.yaml` 与摘要/兼容视图字段一致性，并确认历史遗留文件仅保留专项核查语义。

重点检查：
- initialization / convergence / checkpoint / sync 节点
- baseline / init-coverage 的兼容视图定位
- `.init-checkpoint.yaml` / `.sync-record.json` 的历史遗留定位
- 值对比与字段一致性

### 维度五：迁移完成判定
综合评估迁移是否进入稳定期。

重点检查：
- 三件套是否存在
- convergence 是否已接入
- 核心写入链路是否全量切换到 state.yaml
- 核心读取链路是否新状态源优先
- 全仓是否无活跃残留
