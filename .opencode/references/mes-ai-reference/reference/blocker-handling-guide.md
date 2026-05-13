---
title: 阻塞治理指南
doc_type: reference
load_strategy: explicit-only
phase_scope: []
trigger:
  - blocker
  - gsd
cost_level: high
summary_first: true
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/blocker-handling-guide-summary.md
  - .opencode/references/mes-ai-reference/reference/exception-handbook.md
---

# 阻塞治理指南

> 对应摘要：`.opencode/references/mes-ai-reference/reference/blocker-handling-guide-summary.md`
> 若尚未形成真实 blocker，或当前只是轻微不确定，优先读取摘要并禁止默认整篇读取正文。
> 本文件定义骨架中的 blocker（阻塞项）识别、分类、处理、升级与留痕规则。
> 其目标是让 AI 在执行中优先消解阻塞，而不是因为非关键问题整体停滞。
> 本文件为 GSD 执行增强模式的重要支撑文件，也可在 Strict 模式中作为统一 blocker 参考手册使用。

---

## 一、目的

阻塞治理的目标不是“记录有问题”，而是回答以下问题：

1. 当前到底卡在什么地方
2. 该问题是否真正阻断推进
3. 是否可以代偿推进
4. 如果代偿推进，需要补什么动作
5. 如果不能推进，最小决策点是什么
6. 需要谁确认或升级

---

## 二、什么是 blocker

blocker 指阻碍当前目标继续推进的条件、缺失、依赖、冲突或未决事项。

blocker 必须绑定到**当前目标**，不能泛泛写成“有一些问题”“需要后续确认”。

### 2.1 正确示例

- 当前目标：完成最小设计包  
  blocker：核心库存冻结接口的幂等规则未确定，无法确认最终 API 错误语义

### 2.2 错误示例

- blocker：接口还没想好
- blocker：后面再说
- blocker：有风险

---

## 三、blocker 分类

### 3.1 硬阻塞（Hard Blocker）

定义：若不解决，当前目标不能继续推进。

典型示例：

- 关键需求边界不明确
- 核心设计方向未确定
- 不可逆数据库变更未评估
- 关键接口责任边界无法判断
- 发布关键条件未满足
- 高风险安全问题未处理

处理原则：

- 必须停止推进
- 必须给出最小决策点
- 必须升级或请求确认

---

### 3.2 软阻塞（Soft Blocker）

定义：会影响完整度或质量，但不阻断当前最小推进目标。

典型示例：

- 次级字段命名待确认
- 说明入口尚未同步
- 次级测试数据待补
- 详细审查报告未扩展到附录
- 某个历史文档仍有少量旧口径

处理原则：

- 可继续推进
- 必须记录代偿动作
- 必须记录后补动作
- 必须说明风险等级

---

### 3.3 外部依赖阻塞（External Dependency Blocker）

定义：当前推进受外部团队、外部服务、外部环境或前置产物影响。

典型示例：

- 上游服务未就绪
- 前后端联调条件未满足
- 测试环境不可用
- 知识库尚未刷新但局部材料足够
- 业务方未回复某项确认

处理原则：

- 先判断是否可以重排路径
- 可通过 Mock、草案、局部实现、并行准备等方式代偿
- 若无法代偿，则升级为硬阻塞

---

## 四、blocker 等级

建议采用以下等级：

### P0
绝对阻断，必须立即停下处理

### P1
高风险限制推进，原则上需尽快解决，少数场景可局部代偿

### P2
中风险可代偿推进，必须留痕并安排后补动作

### P3
低风险可后补，不影响当前继续推进，但必须登记

---

## 五、blocker 处理矩阵

| blocker 类型 | 是否可继续推进 | 是否必须留痕 | 是否必须给后补动作 | 是否必须升级 |
|---|---|---|---|---|
| 硬阻塞 | 否 | 是 | 是 | 是 |
| 软阻塞 | 是 | 是 | 是 | 否 |
| 外部依赖阻塞 | 视情况 | 是 | 是 | 视情况 |

---

## 六、blocker 处理流程

### Step 1：绑定目标
先明确当前目标是什么。

### Step 2：描述 blocker
必须具体化，不得写模糊描述。

### Step 3：分类
分类为：

- 硬阻塞
- 软阻塞
- 外部依赖阻塞

### Step 4：评估可推进性
判断：

- 是否允许继续推进
- 是否允许局部推进
- 是否可以改并行路径
- 是否必须等待确认

### Step 5：记录代偿动作
如果允许继续推进，必须写明：

- 现在怎么继续
- 用什么暂代
- 哪部分先做
- 哪部分暂不做

### Step 6：记录后补动作
必须写明：

- 之后谁来补
- 补什么
- 什么时候补
- 补完后如何闭环

### Step 7：给出升级路径
若不能自行解决，必须说明升级对象。

---

## 七、代偿动作定义

代偿动作指为了不让整体停滞，在 blocker 未彻底解决前采取的临时推进措施。

### 常见代偿动作

1. 使用 Mock 接口
2. 先产最小设计包
3. 先做局部实现
4. 先补规则草案
5. 先生成待确认清单
6. 先留风险结论后补正式报告
7. 先刷新局部知识，不做全局刷新

### 代偿动作约束

- 不得掩盖 blocker 本身
- 不得改变 blocker 的风险等级
- 不得把代偿动作写成“问题已解决”

---

## 八、后补动作定义

后补动作指代偿推进后必须补齐的工作。

### 常见后补动作

1. 补完整设计文档
2. 补测试数据
3. 补审查报告
4. 补知识刷新
5. 补说明入口同步
6. 补字段/接口命名确认
7. 补最终发布验证

### 后补动作最低要求

必须明确：

- 后补项
- 责任人/责任角色
- 触发条件
- 闭环标准

---

## 九、最小决策点规则

当 blocker 为硬阻塞时，输出必须尽量压缩成最小决策点，而不是把整个项目管理责任抛回用户。

### 好的最小决策点示例

- 需要确认库存冻结接口是否允许跨仓幂等，确认后我继续输出最终 API 方案

### 不好的最小决策点示例

- 还有很多东西不确定，你先想一下再来

---

## 十、升级路径

默认升级路径建议如下：

1. 开发执行阻塞 → 架构师/技术负责人
2. 跨团队依赖阻塞 → 项目经理
3. 发布条件阻塞 → 发布负责人/运维负责人
4. 生产事故阻塞 → 紧急修复例外流程
5. 骨架主规则冲突 → 骨架治理负责人

---

## 十一、留痕要求

所有 blocker 至少应记录：

- 当前目标
- blocker 描述
- blocker 类型
- 风险等级
- 是否可继续推进
- 代偿动作
- 后补动作
- 升级对象
- 当前状态（待处理 / 可继续 / 已关闭）

---

## 十二、与其他规则的关系

本文件应与以下文件协同使用：

- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`
- `.opencode/references/mes-ai-reference/reference/dod-definition-guide.md`
- `.opencode/references/mes-ai-reference/reference/phase-gates/gsd-continue-exit.md`
- `.opencode/references/mes-ai-reference/templates/governance/blocker-record-template.md`（后续新增）

补充说明：

- 原 `.opencode/references/mes-ai-reference/rules/gsd-execution-mode.md` 已降级为兼容入口。
- 当前 blocker 与 GSD 组合治理以下沉的 `.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md` 为准。

---

## 十三、执行要求

1. 所有命中 GSD 模式的阶段输出，必须显式说明 blocker 状态
2. 所有 blocker 必须绑定当前目标
3. 所有可继续推进的 blocker 必须带代偿动作与后补动作
4. 所有硬阻塞必须压缩成最小决策点
