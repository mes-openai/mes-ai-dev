# graph-guided-real-execution-boundary 资源说明

本用例用于回归验证 `mes-test-generate-integration` 对 GitNexus / graphify 的使用边界：

- 图谱只能辅助识别候选链路、依赖关系和回归范围；
- 集成测试通过结论必须来自真实执行、响应断言、数据副作用校验和覆盖率证据；
- 缺少执行证据时必须标记为待执行或证据不足；
- 不得把 graph report、调用链图或关系导读当作测试执行结果。

评测时应重点检查输出是否包含跨服务断言、环境准备、执行命令、结果记录与证据边界说明。
