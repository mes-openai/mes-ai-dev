# stub-chain-argument-contract 资源说明

本用例用于回归验证 `mes-test-generate-unit` 在生成 Mockito 单元测试时不会因以下问题制造脆弱测试：

- 链式 stub 返回对象未初始化导致空指针；
- 同一 mock 调用中混用裸值与 matcher；
- 使用万能 `any()` 替代业务参数校验；
- 只校验调用次数、不校验 DTO 字段和路径规范化结果；
- 通过删除断言、吞异常或弱断言制造通过。

评测时应重点检查生成策略是否给出完整返回链构造、`ArgumentCaptor` / `argThat(...)` 参数校验，以及 Windows / Linux 可移植路径断言。
