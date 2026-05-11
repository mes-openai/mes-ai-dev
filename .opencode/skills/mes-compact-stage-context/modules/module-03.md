# 执行步骤

## 执行步骤

### 1. 输出执行计划

```
本次执行计划：
目标：将 [阶段名] 的产出压缩为固定摘要
步骤：
  1. 读取阶段全部产出文件
  2. 提取四要素（结论/风险/下一步/证据路径）
  3. 生成固定格式摘要
  4. 写入 stage-summary.md
  5. 验证摘要行数 ≤ 200 行
预期产出：stage-summary.md
风险：信息丢失、关键细节被过度压缩
```

### 2. 读取阶段产出

读取当前阶段的全部产出文件，按阶段类型不同：

| 阶段 | 需压缩的产出 | 压缩后目标 |
|------|-------------|-----------|
| 需求分析 | spec.md + impact-scope.md + ambiguity-checklist.md + acceptance-criteria-graded.md | ≤150行 |
| 详细设计 | design.md + api-design.md + database-design.md + compatibility-design.md + cross-service-consistency.md | ≤200行 |
| 代码开发 | tasks.md + change-list.md + self-review-report.md + code-pattern-consistency.md | ≤150行 |
| 测试验证 | test-cases.md + test-report.md + defect-tracking.md + regression-testdata.md | ≤150行 |
| 发布交付 | deploy-plan.md + acceptance-report.md + release-note.md + handover-doc.md + go-nogo.md | ≤150行 |

**Step Gate A**：阶段产出读取不完整或输入范围错误 → 打回步骤2重做，不得进入四要素提取。

### 3. 提取四要素

每个摘要必须包含以下四个核心章节：

#### 3.1 结论

> 本阶段的核心输出结论，让下一阶段无需读原文即可理解"做了什么决定"。

- 需求分析：功能点清单 + 验收标准 + 影响范围
- 详细设计：技术方案摘要 + API清单 + 表结构摘要 + 关键决策
- 代码开发：变更文件清单 + 编译状态 + 自审结论
- 测试验证：通过率 + 缺陷清单 + 回归结论
- 发布交付：部署结果 + 验收结论 + 版本号

#### 3.2 风险

> 本阶段发现的、需要下一阶段关注的风险项。

| 风险编号 | 风险描述 | 影响程度 | 影响范围 | 建议处理方式 |
|---------|---------|---------|---------|-------------|
| R-001 | [描述] | 高/中/低 | [影响范围] | [处理建议] |

#### 3.3 下一步

> 下一阶段需要执行的关键动作，包括前置条件和待确认项。

| 序号 | 动作 | 负责角色 | 前置条件 | 备注 |
|------|------|---------|---------|------|
| 1 | [动作描述] | [角色] | [前置条件] | |

#### 3.4 证据路径

> 完整产出文件的存放路径，供需要深入细节时按需读取。

| 文件名 | 文件路径 | 核心内容概述 | 行数 |
|--------|---------|-------------|------|
| [文件名] | workspace/xxx/REQ-XXX/xxx.md | [一句话概述] | [行数] |

**Step Gate B**：四要素缺项、信息失真或证据路径不完整 → 打回步骤3重做，不得生成摘要文件。

### 4. 生成摘要文件

写入 `workspace/{阶段目录}/REQ-YYYYMMDD-XXX/stage-summary.md`：

```markdown
# [阶段名] 阶段摘要

> 本摘要由 mes-compact-stage-context Skill 生成。
> 原始产出文件路径见「四、证据路径」。
