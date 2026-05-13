# graph-call-requires-service-index-evidence 资源说明

本用例验证 `mes-init-analyze-service` 对 GitNexus 调用关系推断的回证要求。

评测重点：

- 图谱调用链只能作为候选线索。
- 正式服务画像必须回到包结构、分层目录、service index、代码定义点与配置证据。
- 未验证调用不得污染 dependency graph 或后续 analyze/design/develop/test 阶段。
- 单服务分析不得越界读取非当前 scope 服务。
