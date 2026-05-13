# reject-graph-inference-as-confirmed-knowledge 资源说明

## 场景目的

验证刷新质量校验能够发现图谱推断被误写为确认知识的问题。

## 输入证据

- 刷新产物：将 graphify 潜在调用链写成确认依赖边。
- 刷新产物：将 GitNexus 候选消费者写成已确认影响模块。
- `git diff` / `state.yaml` / `refresh-hints.md` / 源码定义点：均缺少对应确认事实。

## 期望边界

- 确认知识必须有真实证据支撑。
- 图谱推断必须标注为候选、推断或待复核。
- 质量结论不得在该问题未修复时直接通过。
