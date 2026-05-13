# graph-relation-not-acceptance-evidence 资源说明

## 图谱导读

- graphify 显示需求、测试用例和验收材料存在关系。
- 该导读只用于帮助定位候选材料和追溯缺口。

## 正式证据

- `test-report.md`。
- `acceptance-trace-matrix.md` 或验收报告中的等价追溯章节。
- UAT 执行记录。
- 业务方、项目经理或交付负责人确认材料。

## 冲突处理

当 graphify 关系与测试报告、验收追溯矩阵或人工确认冲突时，以正式测试和验收材料为准。缺失正式证据时不得给出验收通过或 Go 结论。

## 依赖边界

本 eval 仅模拟 graphify 导读文本，不引入真实 GitNexus / graphify 运行依赖，也不修改任何真实 deploy / release 脚本。
