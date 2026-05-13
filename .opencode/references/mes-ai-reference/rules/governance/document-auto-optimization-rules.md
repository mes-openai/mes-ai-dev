---
title: 骨架文档自动调优规则
doc_type: governance
load_strategy: explicit-only
phase_scope: []
trigger:
  - auto-optimization
  - document-overload
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/document-auto-optimization-matrix.md
  - .opencode/references/mes-ai-reference/reference/document-auto-optimization-flow.md
  - .opencode/references/mes-ai-reference/reference/document-auto-optimization-state-model.md
  - templates/governance/document-auto-optimization-audit-template.md
  - .opencode/references/mes-ai-reference/rules/governance/document-load-metadata-standard.md
---

# 骨架文档自动调优规则

> 本文件定义骨架文档在命中过载、误读、高成本、结构膨胀等风险时的自动治理规则，用于支持自动检测、自动建议、半自动重构与低风险自动落盘。

---

## 一、适用范围

本规则适用于以下文档类型：

- `.opencode/references/mes-ai-reference/rules/**/*.md`
- `.opencode/references/mes-ai-reference/reference/**/*.md`
- `.opencode/references/mes-ai-reference/templates/**/*.md`
- `mes-ai-dev/knowledge/**/index.md`
- `*-summary.md`

不适用于：

- 业务代码文件
- 临时工作草稿
- 单次需求交付文档
- 非骨架治理产物

---

## 二、核心原则

### 2.1 自动检测优先，自动改写从严

系统应优先自动发现问题、给出建议，而不是直接自动重写正文。

### 2.2 只对真正高成本对象做自动调优

超阈值不等于必须拆解。必须结合文档类型、使用频率、结构清晰度、引用路径共同判断。

### 2.3 先摘要后正文

对于高成本正文，优先生成或完善 summary，再决定是否需要正文分片或索引化。

### 2.4 索引与正文分治

索引页负责导航，正文负责承载规则细节。禁止把索引页持续膨胀为半正文、半手册混合物。

### 2.5 自动化必须可审计

任何自动检测、自动建议、自动生成草稿、自动落盘，都必须具备可追溯依据与留痕。

### 2.6 自动调优不得破坏现有主链

运行入口、加载矩阵、索引、摘要、正文之间的主链不得因自动调优被打断。

---

## 三、自动调优分层模型

自动调优采用四层机制：

1. 自动检测
2. 自动判定
3. 半自动重构
4. 低风险自动落盘

---

## 四、检测对象与检测指标

### 4.1 基础体量指标

至少检测：

- 行数
- 估计 token
- 标题层级数
- 表格数量
- 超长段落数
- 超长列表数

### 4.2 结构指标

至少检测：

- 是否已有 front matter
- 是否已有 summary
- 是否已有 index
- 是否存在头部互链
- 是否已声明 `summary_first`
- 是否已声明 `load_strategy`

### 4.3 使用指标

至少检测：

- 是否被 `AGENTS.md`、`runtime-entry.md`、`skeleton-loading-matrix.md` 间接引用
- 是否属于高频入口
- 是否被多个 phase 共用
- 是否处于索引层 / 正文层 / 摘要层

### 4.4 风险指标

至少检测：

- 是否容易被误当作默认常驻输入
- 是否属于长正文但无摘要
- 是否属于索引页但信息膨胀明显
- 是否正文与摘要可能已失同步

---

## 五、成本等级判定建议

### 5.1 low

通常 < 80 行，或 < 1K token，结构简单，适合作为直接规则入口。

### 5.2 medium

通常 80–150 行，或 1K–2K token，有一定结构复杂度，可能需要 front matter 或边界说明，但未必需要 summary。

### 5.3 high

满足以下任一特征：

- 通常 > 150 行
- 估计 > 2K token
- 内容低频但关键
- 容易被误读为默认常驻正文
- 适合先摘要再决定是否进入正文

---

## 六、自动动作分级

### 6.1 允许自动执行的低风险动作

系统可自动执行：

- 补 front matter
- 补头部边界说明
- 补 summary 路径互链
- 新增 summary 草稿
- 为索引页补 `index-only`
- 更新自动治理日志

### 6.2 仅建议、不自动执行的中风险动作

系统只应生成建议或草稿：

- 抽章节为分片
- 重组正文结构
- 新增二级索引
- 批量改跨文件引用
- 将长正文改写为“总览 + 分片正文”结构

### 6.3 禁止自动执行的高风险动作

以下动作默认禁止自动直接落盘：

- 重写主规则文件的核心逻辑结构
- 改变章节顺序且影响引用语义
- 无确认地删除原正文内容
- 大规模跨目录迁移文档
- 自动替换现有治理口径

---

## 七、自动调优触发条件

### 7.1 硬触发

满足以下任一条件时，必须触发自动检测：

- 文档行数 > 150
- 估计 token > 2K
- 文档被标记为 `high`
- 文档被高频入口直接或间接引用
- 同一文件连续两轮以上被扩写

### 7.2 软触发

满足以下任一条件时，建议触发自动检测：

- 索引页持续增长
- 正文已有 summary 但无互链
- 文档无 front matter
- 文档角色模糊：既像索引，又像正文
- 已出现运行期误读或过量加载迹象

---

## 八、与现有骨架机制的关系

### 8.1 与 `runtime-entry.md`

自动调优不得让运行入口膨胀。若入口文件变大，应优先做压缩与指向，而不是塞更多细节。

### 8.2 与 `skeleton-loading-matrix.md`

自动调优结果必须与加载矩阵一致。若文档被提升为高成本正文，应同步符合黑白灰名单逻辑。

### 8.3 与 `document-load-metadata-standard.md`

自动调优涉及 front matter 时，必须遵循元信息标准，不得自行发明字段。

### 8.4 与 `skeleton-change-governance.md`

若自动调优修改骨架主规则、索引、模板、摘要或参考入口，必须纳入骨架修改留痕与必要审查。

---

## 九、禁止事项

1. 禁止只看行数就自动拆正文。
2. 禁止把所有文档都纳入高成本机制。
3. 禁止让 summary 膨胀成第二份正文。
4. 禁止自动调优破坏入口链。
5. 禁止无留痕自动落盘。

---

## 十、收口结论

骨架文档自动调优应被定义为一种治理辅助机制，而不是自动重写器。

其推荐目标是：

- 自动发现高成本问题
- 自动给出治理建议
- 半自动生成重构草稿
- 在低风险场景下自动落盘标准化增强
- 保持主规则、索引、摘要和正文之间的清晰边界
