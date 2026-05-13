# 图谱辅助不替代技术方案决策 eval 资源说明

本 eval 验证 `mes-design-approach` 在使用 GitNexus / graphify 时的设计治理边界。

- GitNexus：仅用于候选影响面、调用关系和依赖关系校验。
- graphify：仅用于关系导读和导航。
- 正式结论：必须写入 `design.md`，并包含方案选择、取舍理由、边界和不采用路径。
- 拦截重点：不得因图谱弱关联新增中间层、聚合层、平行机制或扩大到未确认模块。
