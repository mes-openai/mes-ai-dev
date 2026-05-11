---
title: 多仓协同场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - multi-repo
  - cross-service
cost_level: low
summary_first: false
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/common.md
---

# 多仓协同场景规则（scenario-multi-repo）

## 一、触发条件
命中以下任一情形时视为多仓协同：
- 一个需求涉及两个及以上代码仓
- 前端与后端同时改动
- 两个及以上微服务联动
- 应用代码与数据库脚本协同变更
- 需要多个工作单元并行推进并统一收口

## 二、基本原则
- 先拆责任边界，再拆执行任务
- 契约优先于并行
- 并行不等于无依赖
- 上游未就绪时优先用 Mock 或草案代偿推进
- 共享结论必须由主控收敛

## 二点五、多仓需求三层拆分要求

多仓需求必须按以下三层拆分，不得混做一层：

1. **需求分析阶段：拆仓级责任边界**
   - 判断涉及哪些仓
   - 判断各仓角色与涉及原因
   - 判断事实定义源、实现落点与消费方

2. **详细设计阶段：拆 provider、服务链与实现落点**
   - 冻结最终调用链
   - 冻结 provider 选择
   - 冻结复用/扩展/新增路径

3. **开发阶段：拆执行任务**
   - 按已冻结边界拆 controller/service/dao/front-end/API/SQL 等执行项
   - 不得重新拍板仓边界与主调用链

## 三、最小协同契约
至少明确：
- 接口路径与方法
- 请求/响应字段
- 字段语义与错误口径
- 依赖顺序与兼容边界
- 是否允许 Mock 及替换时机

## 三点五、事实角色识别

多仓协同场景中，除传统业务仓外，还应识别以下事实角色：

- 业务实现仓
- 数据拥有仓
- 契约定义仓
- 能力提供仓
- 能力消费仓
- 公共 SDK / common / shared 事实源

若某公共 SDK、common 包或共享模型包承担协议定义职责，应在分析与设计阶段显式标出，不得因其不是主要业务仓而忽略。

## 三点六、provider 选择要求

当多个服务都能提供某项数据或能力时，必须区分：

- 技术可达 provider
- 架构允许 provider
- 最终选定 provider

并说明：
- 为什么存在多个技术可达 provider
- 为什么最终只允许通过某一 provider
- 是否存在解耦/聚合/治理边界
- 绕过该 provider 的风险是什么

## 四、阻塞治理
- 契约未定阻塞
- 上游未就绪阻塞
- 外部依赖阻塞
- 联调阻塞

每个阻塞至少说明：阻塞点、影响范围、代偿动作、升级路径、下一次检查点。

## 五、并行与串行边界
- 可并行：稳定契约下的上下游实现、Mock 推进、独立局部改动
- 必须串行：共享知识更新、最终契约冻结、联调结论统一收敛、发布顺序与 Go/No-Go 判断

## 六、统一引用写法
“涉及多个仓、多个服务、前后端联动、共享契约、Mock 推进、联调收口与发布顺序时，必须符合 `knowledge/rules/scenarios/scenario-multi-repo.md`。”
