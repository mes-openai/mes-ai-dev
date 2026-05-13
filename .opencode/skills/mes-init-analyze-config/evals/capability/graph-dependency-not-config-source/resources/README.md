# graph-dependency-not-config-source 资源说明

本用例验证 `mes-init-analyze-config` 对配置依赖事实源的要求。

评测重点：

- 配置依赖必须来自真实配置文件、`resource/restService.properties` 或等价配置事实源。
- GitNexus 依赖边只能作为候选线索。
- 不得由图谱推断补全确认配置。
- 候选依赖不得污染共享 dependency graph 最终文件。
