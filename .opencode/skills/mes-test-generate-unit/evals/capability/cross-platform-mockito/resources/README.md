# cross-platform-mockito 资源说明

本用例用于回归验证 `mes-test-generate-unit` 是否遵循：

- Windows / Linux 路径兼容；
- Mockito matcher 一致性；
- `ArgumentCaptor` / `argThat(...)` 复杂参数校验；
- stub 返回链完整初始化；
- 禁止万能 mock、弱断言、吞异常式虚假通过。

评测时不要求真实 Java 工程存在，重点检查生成策略和输出说明是否覆盖上述约束。
