# graphify 导读不替代 design.md eval 资源说明

本 eval 验证 `mes-design-generate-doc` 生成正式设计文档时的图谱治理边界。

- GitNexus：仅用于候选链路、依赖和影响面校验。
- graphify：仅用于导读、导航或附录说明。
- 正式结论：必须进入 `design.md` 正文，覆盖技术方案、接口、数据模型、服务链、Provider、契约边界和验证映射。
- 拦截重点：不得用图谱导读替代 `design.md`，不得扩大到未确认模块或新增不必要架构层。
