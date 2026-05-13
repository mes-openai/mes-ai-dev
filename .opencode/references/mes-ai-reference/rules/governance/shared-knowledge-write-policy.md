# 共享知识写入策略（shared-knowledge-write-policy）

## 一、基本原则
1. 共享知识文件默认禁止并行直接写入
2. 局部结果先落盘，再统一收口
3. 局部成功保留，不因局部失败整体回滚
4. 收口前必须先校验可消费性
5. 最终共享文件是收口产物，不是扫描过程产物

## 二、共享知识文件范围
默认包括：
- `mes-ai-dev/knowledge/state/state.yaml`、`summary.md`、`baseline.md`、`init-coverage.md`
- 全局 dependency / registry 文件
- 全局 reference 共享知识
- 全局 rules 共享知识
- 全局 code-map 汇总文件

## 三、允许直接写入的对象
- scope 级服务/模块/schema 局部知识结果
- `mes-ai-dev/knowledge/fragments/...`
- `mes-ai-dev/knowledge/state/fragments/...`
- workspace 下的报告、evidence、handoff、memory

## 四、主控收口职责
主控负责：
- 读取局部结果
- 执行汇总消费门禁
- 合并去重
- 处理冲突
- 串行更新共享知识文件

## 五、冲突处理
- 命名冲突：先规范到 canonical，再合并
- 内容冲突：标记冲突，回源复核或重派
- 覆盖冲突：视为边界污染，不得直接收口

## 六、部分成功与续传
- 已合格局部结果必须保留
- 只重派失败、缺失、不合格对象
- 不得重复重做已通过局部结果

## 七、统一引用写法
“共享知识文件的写入边界、局部结果落盘、主控收口、并发限制与冲突处理，必须符合 `.opencode/references/mes-ai-reference/rules/governance/shared-knowledge-write-policy.md`。”
