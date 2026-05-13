# 审核要点

## 审核要点
- [ ] 所有预期产物是否已检查
- [ ] 6个覆盖率维度是否全部校验
- [ ] state.yaml 是否已写入（initialization + sync 摘要）
- [ ] state-detail/coverage.yaml 是否已同步写入
- [ ] state-detail/recent-execution.yaml 是否已同步写入
- [ ] state-detail/convergence.yaml 是否已同步写入
- [ ] state-detail/sync.yaml 是否已同步写入
- [ ] 兼容视图是否按“统一状态源 + detail 明细（若存在）”口径正确渲染
- [ ] 未覆盖区域是否已标注
- [ ] 可信度抽检是否全部完成（depth + confidence + 3项静态校验）
- [ ] 低可信度产物是否有明确的人工复核建议
- [ ] `mes-ai-dev/knowledge/reference/terminology-glossary.md` 是否已真实填充并可供需求分析直接消费
- [ ] 同类 mes-ai-dev/knowledge/reference/rules 关键文件是否已真实填充并可直接消费
- [ ] code-map 全局共享文件是否已完成片段收口并形成正式可消费版本
