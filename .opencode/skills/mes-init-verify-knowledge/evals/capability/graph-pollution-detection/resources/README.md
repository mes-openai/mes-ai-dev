# graph-pollution-detection 资源说明

本用例验证 `mes-init-verify-knowledge` 对图谱推断污染事实源的识别能力。

评测重点：

- 检查 API registry、dependency graph、database-index、code-map 等正式产物是否混入未验证图谱推断。
- 未标注来源的确认结论必须被识别为污染风险。
- 图谱推断项需降级为候选/未知，或补充真实事实源。
- converge 前共享最终文件误写与 `pending_shared_files` 缺失必须进入门禁问题。
