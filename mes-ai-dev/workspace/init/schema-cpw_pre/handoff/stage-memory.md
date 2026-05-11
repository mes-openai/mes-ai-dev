# 阶段记忆

## 一、基本信息

- 需求编号：N/A
- 阶段：初始化
- 当前模式：GSD
- 生成时间：2026-04-24 00:00:00
- 最近更新时间：2026-04-24 00:00:00
- 当前状态：handoff-ready

## 二、阶段目标

- 本阶段目标：完成 `cpw_pre` 的定向 Schema 基础建图
- In Scope：`dbscript/cpw_pre.sql`、`schema-cpw_pre/index.md`、状态片段、阶段审查与交接产物
- Out of Scope：全局数据库注册表收敛、服务归属最终确认、运行期性能事实、`tables.md`、`relations.md`

## 三、输入材料

1. 正式输入：`dbscript/cpw_pre.sql`
2. 阶段记忆输入：无
3. 规则 / 知识输入：`mes-ai-dev/knowledge/rules/phases/phase-init.md`、`mes-ai-dev/knowledge/reference/phase-gates/init.md`、`mes-ai-dev/knowledge/reference/knowledge-consumption/state.md`

## 四、已确认约束

- 业务约束：当前只能从 DDL 静态识别物料、工单、报工三类对象
- 技术约束：未发现外键、触发器、存储过程与分区定义
- 目标仓结构约束：本次只处理 `cpw_pre` 单 Schema，不越界扫描其他对象
- 治理与门禁约束：必须生成 Schema 索引、状态片段、阶段完成产物报告与详细审查报告

## 五、关键决策摘要

- 决策主题：采用基础索引模式而非数据库明细抽取
- 选定方案：仅生成 `schema-cpw_pre/index.md`
- 选择原因：用户只发起 `/mes-init-project --schemas=cpw_pre`，且当前可见事实仅为单个 SQL 文件
- 影响范围：后续可做局部分析，但不能直接支撑数据库迁移级设计
- 详细记录路径：`mes-ai-dev/workspace/init/schema-cpw_pre/report/stage-output-report.md`

## 六、blocker 与处理情况

- 硬阻塞数量：0
- 软阻塞数量：2
- 外部依赖阻塞数量：1
- 活跃 blocker：缺少 Schema 归属服务证据；缺少真实数据量/运行热度；缺少跨 Schema 调用链证据

## 七、阶段风险与注意事项

- active 风险：将候选热表误当成确认热表使用
- active pitfall：把状态片段当成全局已收敛事实消费
- 后续阶段必须规避的问题：未收敛前不得输出全仓数据库结论

## 八、本阶段核心结论

- 已完成：识别 3 张核心表；生成局部 Schema 索引；生成状态片段与门禁产物
- 部分完成：关系只识别到业务字段关联，未形成数据库强约束结论
- 未完成：服务归属映射、数据库明细文档、全局注册表收敛
- 核心结论：`cpw_pre` 是围绕物料、工单、报工建立的轻量试生产 Schema，当前可作为局部数据库影响分析输入
- 最小可交付状态（GSD 必填）：局部 Schema 基础索引可消费，未收敛项已留痕

## 九、下一阶段建议

- 下一阶段重点：补齐服务归属映射与表关系明细
- 下一阶段建议顺序：先做相关服务初始化，再按需执行数据库深化
- 下一阶段不要重复犯的错误：不要把局部状态片段升级为全局事实

## 十、下一阶段必读文件

- 本阶段产物：`mes-ai-dev/knowledge/database-index/schema-cpw_pre/index.md`
- 规则 / 参考文件：`mes-ai-dev/knowledge/reference/phase-gates/init.md`
- 证据文件：`dbscript/cpw_pre.sql`、`mes-ai-dev/knowledge/state/fragments/schema-cpw_pre.yaml`

## 十一、全局记忆升级评估

- 是否建议升级为全局阶段记忆：否
- 建议升级条目：无
- 原因：当前仅是单 Schema 局部初始化结果，尚未完成全局收敛

## 十二、证据路径

- `mes-ai-dev/workspace/init/schema-cpw_pre/report/stage-output-report.md`
- `memory/decision-log.md`：未生成，本次无独立台账
- `memory/pitfall-ledger.md`：未生成，风险已记录在本文件
- `memory/blocker-log.md`：未生成，blocker 已记录在本文件
- 其他：`mes-ai-dev/workspace/init/schema-cpw_pre/review/detailed-review-report.md`
