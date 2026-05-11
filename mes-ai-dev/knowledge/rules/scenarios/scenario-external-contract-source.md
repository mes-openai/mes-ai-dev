---
title: 外部契约源场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - external-contract-source
  - sdk-contract
  - source-jar
  - decompiled-jar
cost_level: low
summary_first: false
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/knowledge-consumption/contracts.md
  - knowledge/rules/governance/contract-knowledge-standard.md
  - knowledge/reference/phase-gates/init.md
---

# 外部契约源场景规则（scenario-external-contract-source）

## 一、触发条件

命中以下任一情形时，应加载本规则：
- 关键契约对象定义在业务仓之外
- 统一响应、错误码、SDK 请求/响应模型来自 SDK / common / shared / integration
- 需要读取 sources.jar 或受控反编译 jar 才能获取关键契约事实
- 当前任务明确涉及 source artifact、jar 反编译或公共依赖契约核对

## 二、基本原则

- 源码优先于源码附件，源码附件优先于反编译
- 反编译是兜底路径，不是默认路径
- 来源类型必须记录，不得省略
- 版本一致性必须确认或明确标待补证
- 无源不得产出全局统一规范

## 三、事实源获取顺序

关键契约对象的事实源获取顺序固定为：

1. `workspace-source`
2. `repo-source`
3. `sources-jar`
4. `decompiled-jar`
5. `unknown`

禁止跳过前 1～3 步直接进入反编译。

## 四、来源类型与置信度要求

建议口径如下：

- `workspace-source`：高置信度
- `repo-source`：高置信度
- `sources-jar`：中高置信度
- `decompiled-jar`：中/低置信度
- `unknown`：不可消费

若来源为 `decompiled-jar` 或 `unknown`，不得输出无保留的全局确定性结论。

## 五、必须记录的字段

对于每条来自外部契约源的结论，至少记录：
- 来源类型
- 来源定位
- 获取方式
- 版本一致性说明
- 置信度
- 待补证项

## 六、阻断条件

满足以下任一条件时，应阻断进入下游阶段：
- 未确认来源类型却输出全局统一契约
- 仅基于接口表象反推出业务仓外部契约
- 来源版本不明却标高置信度
- 反编译结果被当作源码事实使用
- 来源为 `unknown` 却未标风险与待补证

## 七、统一引用写法

“当关键契约对象定义在业务仓之外，涉及 SDK / common / shared / integration、source artifact 或受控反编译时，必须符合 `knowledge/rules/scenarios/scenario-external-contract-source.md`。”
