# gitnexus-log-conflict-minimal-hotfix 资源说明

## 图谱线索

- GitNexus 模拟输出可提示故障入口、调用链、候选最小修复点、影响消费者和冒烟路径。
- GitNexus 对 `quality-inspection`、`report-export`、`archive-job` 或公共事务封装的关联仅作为待复核线索。

## 现场事实

- 现场日志。
- 监控告警。
- 用户症状。
- 最小复现结果。
- 止血后最小冒烟验证。
- 回滚条件复核。

## 冲突处理

当 GitNexus 图谱推断与现场日志、监控、现场症状或最小验证结果冲突时，以现场事实和紧急修复阶段门禁证据为准。图谱不得替代故障事实、修复证据或最小验证结果。

## 范围边界

本 eval 仅模拟 GitNexus 文本线索，不引入真实 GitNexus / graphify 运行依赖，也不得要求修改非止血目标模块、执行无关重构或格式化。
