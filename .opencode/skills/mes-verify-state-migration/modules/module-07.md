# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划

```
本次执行计划：
目标：验证统一状态源迁移完整性
步骤：
  1. 检查必查文件是否存在
  2. 执行写入协议检查（grep 检测残留）
  3. 执行读取协议检查（grep 检测残留）
  4. 执行规则闭环检查（文件内容校验）
  5. 执行冲突与一致性排查（值对比）
  6. 综合判定迁移完成状态
  7. 使用模板输出迁移校验报告
预期产出：state-migration-report-{YYYYMMDD}.md
风险：部分旧消费者可能未标注迁移状态
```

### 2. 必查文件存在性检查
检查以下文件是否存在且非空：

```
mes-ai-dev/knowledge/state/state.yaml
mes-ai-dev/knowledge/state/summary.md
mes-ai-dev/knowledge/rules/state-rendering-spec.md
mes-ai-dev/knowledge/baseline.md
mes-ai-dev/knowledge/init-coverage.md
mes-ai-dev/knowledge/.init-checkpoint.yaml
mes-ai-dev/knowledge/.sync-record.json
mes-ai-dev/knowledge/state/migration-checklist.md
```

**Step Gate A**：必查文件存在性检查不完整或检查范围遗漏 → 打回步骤2重做，不得进入写入/读取协议检查。

文件不存在 → 标记 ❌，建议先完成初始化。

### 3. 写入协议检查（grep 检测）
在命令文档与 Skill 全结构文档中搜索旧主路径关键词：

```
grep 路径：.opencode/commands/*.md + .opencode/skills/*/SKILL.md + .opencode/skills/*/INDEX.md + .opencode/skills/*/modules/*.md + AGENTS.md
关键词：
  - "写入 baseline.md"
  - "更新 init-coverage.md"
  - "写入 .init-checkpoint.yaml"
  - "更新 .sync-record.json"
```

对每个命中结果：
1. 检查上下文是否包含“兼容视图/渲染产物/历史遗留”表述
2. 无允许语境 → 判定为残留，记录文件名与行号

### 4. 读取协议检查（grep 检测）
在 Skill 核心入口、导航入口与模块正文中搜索旧读取关键词：

```
grep 路径：.opencode/skills/*/SKILL.md + .opencode/skills/*/INDEX.md + .opencode/skills/*/modules/*.md + AGENTS.md
关键词：
  - "读取 baseline.md"
  - "读取 .sync-record.json"
  - "读取 .init-checkpoint.yaml"
```

对每个命中结果：
1. 检查上下文是否包含“优先读取 state.yaml / summary.md”“兼容回退/fallback”表述
2. 无新状态源优先表述 → 判定为残留，记录文件名与行号

若命中 `INDEX.md` 或 `modules/*.md`，必须与对应 `SKILL.md` 的读取顺序和状态源优先口径一起交叉核对，不得只检查 `SKILL.md` 主入口。

### 5. 规则闭环检查（内容校验）
逐项检查关键规则文件的内容：
- AGENTS 是否列出渲染规范与唯一事实源
- phase-gates 是否允许新状态源 / convergence 门禁校验
- baseline / summary / state.yaml 是否引用渲染规范
- budget / repository-scale 是否已切换新口径

### 6. 冲突与一致性排查
按字段映射对比：
- `state.yaml` 的 initialization / convergence / checkpoint / sync
- `baseline.md` 覆盖率
- `init-coverage.md` 对象数
- `.init-checkpoint.yaml` 与 checkpoint 字段
- `.sync-record.json` 与 sync 字段

不一致 → 标记 ❌，记录差异字段、state.yaml 值、摘要/兼容视图值。

**Step Gate B**：写入协议、读取协议、规则闭环或一致性排查任一维度存在缺口 → 打回步骤3-6重做，不得输出迁移校验报告。
