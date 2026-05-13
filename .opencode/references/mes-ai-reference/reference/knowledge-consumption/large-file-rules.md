# 大文件消费强制规则

## 一、强制规则

1. 大仓/超大仓场景下，`api-registry.md`、`domain-model.md`、`terminology-glossary.md` 必须优先按索引消费
2. 若读取这些文件时仍尝试全量加载正文，视为违反上下文预算控制规则
3. 只有在明确 scope 已收敛且分片范围很小的情况下，才允许继续读取对应分片正文
4. `mes-guard-context-budget` 与阶段规划应优先限制大文件的全量读取请求

---

## 二、适用对象

- 全局 registry 类文件
- 全局 glossary / domain model / data dictionary
- 跨服务大表或跨仓总表

---

## 三、默认不加载

- 未分片的大型正文文件
