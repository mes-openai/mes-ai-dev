# 校验规则（1/3）

## 校验规则

### 通用规则

1. 优先读取 `phase-gates/index.md`、`phase-gates/common.md` 与 `phase-gates/<当前阶段>.md`，加载当前阶段的 `must-pass / should-check / advisory` 条件
1A. 读取 `phase-gate-usage-standard.md`，确认当前属于进入门禁、退出门禁、步骤消费门禁还是汇总消费门禁
2. 若门禁项涉及状态文件，读取 `state-rendering-spec.md` 确认统一状态源与摘要/兼容视图的校验关系
3. 若当前阶段需要全仓视角知识结果，读取 `state.yaml.initialization.convergence` 判断是否已完成收敛
4. 读取 `status-tracker.md`，确认需求状态允许进入该阶段
5. 优先逐项执行 `must-pass` 检查，再输出 `should-check` 与 `advisory` 结果
6. **任一 must-pass 为 ❌ → 输出阻止报告并列出具体不满足项**
7. **步骤级校验未通过 → 当前步骤必须重做，下一步骤不得启动**
8. **must-pass 全部 ✅ → 允许通过，同时附带 should-check / advisory 提示**
9. **涉及数据库索引门禁时必须做内容级核验**：不得仅以 `index.md` 是否存在代替“Schema 风险画像已完成”
10. **若命令或步骤声明生成 `tables.md` / `relations.md`，必须联动检查其存在性、非空壳状态与边界说明**
11. **阶段退出时必须校验阶段完成产物报告**：不得只校验产物存在而不校验“哪些未生成、为什么未生成、是否允许缺失”
12. **所有审查不得猜测**：若结论无法通过输入、依据、检查结果和证据路径闭环证明，则必须判定为不通过
13. **所有阶段必须有完整详细审查报告**：缺少正式审查报告或缺少审查时间，不得通过阶段退出门禁
14. **涉及数据库设计时必须做表真实性核验**：不得把需求中的业务概念直接当作真实表
15. **涉及后端代码生成时必须做 Java 引用可解析性核验**：import、包路径、类型、方法、返回值都必须能追溯到真实代码
16. **涉及 MyBatis 生成时必须做 Mapper/XML 一致性核验**：`namespace`、`id`、`parameterType`、`resultType`、`resultMap` 必须真实可解析
17. **涉及内部接口调用时必须做 provider 契约一致性核验**：调用方接收返回值的方式必须与 provider 真实契约一致
18. **涉及 AI 代码生成时必须做 TDD 前置核验**：`test-cases.md` 必须先存在，且必须记录用户补充区与用户确认结论
19. **涉及 AI 代码生成时必须做测试全绿核验**：本轮新生成测试用例必须全部通过
20. **涉及 AI 代码生成时必须做覆盖率核验**：本轮生成/修改并纳入验证范围的行覆盖率、分支覆盖率、方法覆盖率必须全部达到 100%
21. **涉及覆盖率补强时不得通过删测达标**：若发现已生成且验证通过的测试用例被删除、降级或跳过，应直接判定 must-pass 失败
22. **阶段交接文档必须符合 OpenSpec 命名**：需求分析 `spec.md`、详细设计 `design.md`、代码开发 `tasks.md`、测试验证 `test-report.md`、发布交付 `handover-doc.md`

### 进入校验执行逻辑

```
对于 `phase-gates/<当前阶段>.md` 中当前阶段的进入条件：
  1. 读取 `must-pass` 小节条目并执行阻断校验
  1A. 若条目要求全仓视角结果，则校验 `state.yaml.initialization.convergence.status=completed`
  1B. 若条目涉及仓规模判定（repository_scale）：
      - 先检查 `state.yaml.repository_scale.scale_label` 是否为有效值（非空且非默认零值）
      - 若无效，检查 `mes-ai-dev/knowledge/state/fragments/*.yaml` 是否存在本次 scope 的状态片段
      - 若片段存在且 `checkpoint.status` 为 completed/partial，标记 `scale_source=fragment`
      - 输出报告中明确标注 scale_source 和 scale_label
  2. 读取 `should-check` 小节条目并执行提示性校验
  3. 读取 `advisory` 小节条目并执行建议性校验
  4. 输出三层结果，其中仅 must-pass 影响放行
```

**Step Gate A**：阶段进入条件读取不完整、must-pass 执行缺漏或权限状态未核实 → 打回进入校验步骤重做，不得放行进入阶段。

### 退出校验执行逻辑

```
对于 `phase-gates/<当前阶段>.md` 中当前阶段的退出条件：
  1. 优先执行 `must-pass` 小节中的校验
  2. 若涉及状态相关门禁，按 `state-rendering-spec.md` 同时确认对应 `state.yaml` 节点与允许视图解释关系
  2A. 若当前阶段本身为 `/mes-init-converge`，则校验 `state.yaml.initialization.convergence` 是否已更新
  2B. 检查阶段完成产物报告是否存在，并校验其中是否列出：标准产物、已生成文件、文件作用、未生成文件、未生成原因、是否影响下一阶段
  2C. 检查本阶段详细审查报告是否存在，且是否包含明确审查时间、审查依据、检查结果与证据路径
  2D. 检查当前阶段 OpenSpec 主交接文档是否存在，且是否覆盖下一阶段消费所需的范围、风险、验证结论与未决事项
  3. 再执行 `should-check` 与 `advisory` 小节中的校验并附加结果
  4. 标记 must-pass / should-check / advisory 各自状态
```

**Step Gate B**：阶段退出条件、状态渲染关系或收敛状态校验存在缺口 → 打回退出校验步骤重做，不得放行进入下一阶段。

### 步骤级校验执行逻辑

```
对于任一步骤输出进入下一步骤前：
  1. 校验当前步骤的输出是否完整、可消费、与既定目标一致
  2. 校验当前步骤是否引用了未通过 gate 的上一步产物
  3. 若当前步骤 gate 结论为 `⚠️有条件通过`，检查整改项是否已在本步骤内闭环
  4. 任一 must-pass 不满足 → 输出阻止报告，要求当前步骤重做
  5. 只有 gate 结论为 `✅通过` 时，才允许下一步骤启动
```

**Step Gate C**：步骤级校验未完整执行、上一步未通过结果仍被引用或整改项未闭环 → 打回当前步骤重做，不得进入下一步骤。

### 数据库索引专项执行逻辑

```
当当前阶段或步骤涉及 mes-ai-dev/knowledge/database-index/schema-<schema-name>/ 时：
  1. 检查 `index.md` 是否存在，且路径符合 canonical 规则
  2. 检查 `index.md` 是否包含：Schema 概览、风险画像、关键对象摘要
  3. 检查风险画像是否包含：风险等级结论、风险判断依据、关键对象说明
  4. 检查 `index.md` 是否仍为模板占位、空标题或空章节
  5. 若本次命令/步骤声明生成 `tables.md`：
     - 检查 `tables.md` 是否存在
     - 检查是否有实际表结构摘要，而非仅模板标题
  6. 若本次命令/步骤声明生成 `relations.md`：
     - 检查 `relations.md` 是否存在
     - 检查是否有实际关系分析，或明确声明“未识别关系”
  7. 任一 must-pass 不满足 → 输出阻止报告，当前步骤/阶段不得放行
```

数据库索引专项校验中的 must-pass 失败示例：
- `index.md` 不存在
- 风险画像章节缺失
- 风险等级结论或判断依据缺失
- `index.md` 仅为模板占位
- 已声明生成 `tables.md` / `relations.md` 但文件缺失、为空壳或无边界说明
