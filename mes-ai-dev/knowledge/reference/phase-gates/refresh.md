# 知识刷新阶段门禁

## 一、进入门禁

### must-pass
- 知识库已初始化
- `state/state.yaml` 存在且可读取
- 代码仓库状态可用于检测变更

---

## 二、退出门禁

### must-pass
- 变更检测结果已生成
- 受影响的知识文件已更新，或已明确记录未更新原因
- 知识刷新阶段完成产物报告已生成，且列出标准产物、已生成文件、文件作用、未生成文件及原因
- 若 develop / deliver 已产出 `refresh-hints.md` 或等价提示，已消费或已说明不采纳原因
- 若刷新影响全局共享文件或热点层，已明确记录是否需要后续执行 `/mes-init-converge`
- 阶段评审结论为 ✅通过 / ⚠️有条件通过

### should-check
- `summary.md`、受影响 overview / registry / map 文件已同步更新
- manual-review-queue 的增量影响已评估
- 若本次刷新涉及全局口径变化，已补充阅读边界或风险说明
- 已说明开发/交付侧的知识不受影响判断是否成立

### advisory
- 已沉淀后续 refresh / converge / 人工补录建议

---

## 三、说明

本阶段的通用步骤级门禁、评审结构与 mandatory-record 要求，统一以 `common.md` 为准。
