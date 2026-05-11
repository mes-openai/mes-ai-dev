---
title: 仓库规模分级规则
doc_type: rule
load_strategy: explicit-only
phase_scope: []
trigger:
  - repository-scale
  - large-repo
  - mega-repo
cost_level: high
summary_first: true
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/repository-scale-rules-summary.md
  - knowledge/rules/budget-audit-rules.md
---

# 仓库规模分级规则

> 对应摘要：`knowledge/rules/repository-scale-rules-summary.md`
> 若当前仓库未命中大仓 / 超大仓阈值，或摘要已足够判断规模约束，禁止默认整篇读取正文。
> 本文件定义仓库规模分级标准和对应的强制规则。
> 违反这些规则 = 缺陷，所有Agent在执行前必须遵守。
> 适用场景：代码仓规模为大仓（50万行+）或超大仓（150万行+）时强制执行。

---

## 一、仓规模阈值定义

| 仓规模 | 后端代码行数 | 服务数量 | API数量 | 数据表数量 | 标签 |
|--------|------------|---------|---------|-----------|------|
| 小仓 | <10万行 | <5个 | <100个 | <50张 | `small` |
| 中仓 | 10-50万行 | 5-15个 | 100-500个 | 50-200张 | `medium` |
| 大仓 | 50-150万行 | 15-40个 | 500-2000个 | 200-500张 | `large` |
| 超大仓 | >150万行 | >40个 | >2000个 | >500张 | `mega` |

**判定方式**：以4个维度中**最高等级**为准。例如：代码行数50万行（大仓）+ API数量3000个（超大仓）→ 判定为超大仓。

---

## 二、大仓强制规则（`large` 级别）

> 以下规则在仓规模为 `large` 时强制执行。

### 2.1 初始化阶段

| 规则ID | 规则内容 | 违反后果 |
|--------|---------|---------|
| LR-01 | 禁止一次性为所有服务生成 detail.md | 必须使用两阶段初始化：基础建图（index.md）→ 按需深化（detail.md） |
| LR-02 | 初始化阶段最多同时处理5个服务的detail | 超过5个必须分批 |
| LR-03 | 第0层 overview 必须包含summary章节 | summary不超过500 token，作为快速入口 |
| LR-04 | 必须生成hot-services/hot-apis/hot-tables | 基础建图完成后立即生成高频入口层 |

### 2.2 需求/设计/开发阶段

| 规则ID | 规则内容 | 违反后果 |
|--------|---------|---------|
| LR-05 | 必须先读hot层再读overview | 跳过hot层 = 阻断 |
| LR-06 | 单次detail读取上限为2个 | 超过必须分批 |
| LR-07 | 涉及>5个服务时强制分批 | 每批≤3个服务，批间通过workspace文件交接 |
| LR-08 | 单服务detail.md预算上限6K token | 超过必须裁剪为只读相关包路径 |

### 2.3 知识刷新阶段

| 规则ID | 规则内容 | 违反后果 |
|--------|---------|---------|
| LR-09 | 刷新必须增量更新 | 禁止全量重新扫描 |
| LR-10 | hot层必须同步刷新 | 服务/API/表排行变更时立即更新 |

---

## 三、超大仓强制规则（`mega` 级别）

> 以下规则在仓规模为 `mega` 时强制执行，**包含大仓所有规则**并追加以下。

### 3.1 初始化阶段

| 规则ID | 规则内容 | 违反后果 |
|--------|---------|---------|
| MR-01 | 禁止全量深化 | detail.md 只为hot-services中的Top10服务生成 |
| MR-02 | 初始化阶段最多同时处理3个服务 | 超过必须分批 |
| MR-03 | 第0层overview只生成summary版本 | 完整版通过 `/mes-init-enrich` 按需深化 |
| MR-04 | 必须生成legacy-debt.md | 标注存量仓历史债务和禁止修改区 |

### 3.2 需求/设计/开发阶段

| 规则ID | 规则内容 | 违反后果 |
|--------|---------|---------|
| MR-05 | 单次detail读取上限为1个 | 超过必须分批 |
| MR-06 | 单服务detail.md预算上限4K token | 超过必须裁剪 |
| MR-07 | 涉及>3个服务时强制分批 | 每批≤2个服务 |
| MR-08 | 第0层overview只读summary章节 | 禁止读取完整服务列表 |
| MR-09 | 必须读取legacy-debt.md | 开发前了解禁止修改区和脆弱点 |

### 3.3 知识刷新阶段

| 规则ID | 规则内容 | 违反后果 |
|--------|---------|---------|
| MR-10 | 每次刷新最多影响3个服务 | 超过必须分批刷新 |

---

## 四、仓规模标签存储位置

仓规模标签主存储在 `knowledge/state/state.yaml` 中；`knowledge/baseline.md` 为兼容摘要视图：

```yaml
# state.yaml 中的仓规模信息
initialization:
  repository_scale:
    backend_lines: 2500000         # 后端代码行数
    service_count: 45              # 服务数量
    api_count: 5000                # API数量
    table_count: 1000              # 数据表数量
    scale_label: "mega"            # 仓规模标签
    scale_rules: "mes-ai-dev/knowledge/rules/repository-scale-rules.md"  # 规则文件路径
    detected_at: "2026-04-13"      # 检测时间
```

## 四点五、相关预算基线

仓规模分类影响上下文预算收紧策略。涉及以下事项时，参考 `mes-ai-dev/knowledge/rules/context-budget-baseline.md`：

- 不同仓规模下的 detail 进入强度
- 不同仓规模下的阶段预算收紧口径
- 复杂任务下的预算回退优先级

仓规模规则负责定义分类口径；预算基线负责定义各规模下的预算使用边界。

---

## 五、存量仓特殊处理原则

> 存量仓指已有人工开发的大型代码仓，非AI新建项目。以下原则适用于所有存量仓。

| 原则ID | 原则内容 | 理由 |
|--------|---------|------|
| LP-01 | **优先真实边界**：从代码中提取的实际职责/API归属/表归属优先于理想化分类 | 存量仓的包结构和命名可能不完全符合规范 |
| LP-02 | **延后抽象术语**：先提取具体实体名、API路径、表名，再归纳为抽象术语 | 存量仓的业务语言可能分散在代码注释中 |
| LP-03 | **标注置信度**：所有从存量仓推断的知识必须标注置信度 | 存量仓的代码注释可能不全或过时 |
| LP-04 | **记录真实边界偏差**：当实际结构与理想规范不一致时，在repo-profile.md中标注 | 帮助AI理解为何某些模式看起来不规范 |
| LP-05 | **参考实现优先**：从代码中找到最规范、最完整的模块作为参考实现 | 比理论规范更有实际指导意义 |

---

## 六、规则检查机制

所有Agent在执行消费类操作前，必须：

1. **优先读取 `state/state.yaml` 获取仓规模标签**
   - 若 `scale_label` 为空或 `backend_lines/service_count/api_count/table_count` 全为 0：
     - **Fallback：读取 `state/fragments/*.yaml` 状态片段**，查找是否有本次 scope 的仓规模记录
     - 若状态片段中存在有效 `repository_scale`，则使用片段值
     - 若状态片段中也不存在，则标记为 `local-only`（仅局部视角可用）
   - 若 `baseline.md` 存在且有 `scale_label`，兼容回退读取
2. 匹配本文件中对应规模的强制规则
3. 在执行计划中明确标注"已检查仓规模规则：[标签]，适用规则：[规则ID列表]"
4. 违反任何强制规则 = 阻断执行

### 6.1 单仓初始化场景特殊处理

当检测到以下情况时，不应误判为"未完整初始化"：
- `state.yaml.repository_scale.scale_label` 为空
- 但 `state/fragments/*.yaml` 存在本次 scope 的状态片段
- 且片段中 `checkpoint.status` 为 `completed` 或 `partial`

此时应标记为：
- `scale_source: fragment`（来源为状态片段）
- `scale_label: local-only`（仅局部视角）
- 允许继续执行 `/mes-init-enrich` 深化本次 scope

### 6.2 门禁校验Fallback规则

`mes-verify-phase-gate` 在执行仓规模校验时必须：
1. 先检查 `state.yaml.repository_scale.scale_label` 是否为有效值（非空且非默认零值）
2. 若无效，检查 `state/fragments/*.yaml` 是否存在本次 scope 的片段
3. 若片段存在且 `checkpoint.status` 有效，允许通过进入门禁
4. 输出校验报告中明确标注 `scale_source` 和 `scale_label`

---

## 变更记录

| 日期 | 操作 | 说明 |
|------|------|------|
| 2026-04-13 | 新增 | 阶段二十二：超大仓适配规则 |
