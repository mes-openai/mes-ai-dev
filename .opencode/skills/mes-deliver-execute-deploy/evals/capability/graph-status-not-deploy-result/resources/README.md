# graph-status-not-deploy-result 资源说明

## 图谱导读

- graphify 显示发布链路关系完整。
- GitNexus 显示消费者依赖未新增。
- 该导读只用于排查导航和影响面复核。

## 正式证据

- 部署日志和命令输出。
- 冒烟验证记录。
- 监控观察结果。
- 回滚执行记录。
- 回滚后验证结果。

## 冲突处理

当图谱状态与部署日志、冒烟验证或回滚结果冲突时，以真实部署执行证据为准。图谱正常不得覆盖部署失败、冒烟失败或回滚结果。

## 依赖边界

本 eval 仅模拟 graphify / GitNexus 导读文本，不引入真实 GitNexus / graphify 运行依赖，也不修改任何真实 deploy / release 脚本。
