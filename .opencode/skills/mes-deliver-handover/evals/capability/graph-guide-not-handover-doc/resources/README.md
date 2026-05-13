# graph-guide-not-handover-doc 资源说明

## 图谱导读

- graphify 生成需求、部署、验收、运维风险和回滚路径之间的交接关系导读。
- 该导读只用于导航、阅读入口和材料索引。

## 正式证据

- `handover-doc.md`。
- `go-nogo.md`。
- `deploy-plan.md`。
- 部署日志。
- 验收报告。
- 回滚指南。
- 签署确认材料。

## 冲突处理

当 graphify 导读与正式交接文档或交付阶段主产物冲突时，以正式文档和阶段门禁证据为准，并修正或移除导读。graphify 不得替代交接完成结论。

## 依赖边界

本 eval 仅模拟 graphify 导读文本，不引入真实 GitNexus / graphify 运行依赖，也不修改任何真实 deploy / release 脚本。
