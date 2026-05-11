# 批量异常模式检测结果

## 批量异常模式检测结果

### 检测概要

| 检测项 | 发现数量 | 严重程度 |
|--------|---------|---------|
| 命名不一致 | X处 | 高/中/低 |
| 同义概念多名字 | X处 | 中 |
| Controller/Service/DAO断层 | X处 | 高 |
| 重复DTO/VO | X对 | 中 |
| 多套返回包装 | X套 | 低 |
| 多种异常码风格 | X处 | 中 |
| 前后端契约漂移 | X处 | 高 |

### 详情
[按检测项列出具体不一致条目]
```

### 5. 扫描测试资产
- 检查各服务 src/test/ 目录
- 标记有/无测试覆盖的服务
- 识别可复用的回归入口

### 6. 扫描运行时配置
- 从 application.yml/bootstrap.yml 提取配置差异
- 识别功能开关和外部依赖

**Step Gate B**：实现模式、反模式、测试资产或运行时配置扫描存在缺口 → 打回步骤3-6重做，不得生成交付文件。

### 7. 生成交付文件
- `mes-ai-dev/knowledge/code-map/patterns.md`
- `mes-ai-dev/knowledge/code-map/test-assets.md`
- `mes-ai-dev/knowledge/code-map/runtime.md`

**Step Gate C**：patterns/test-assets/runtime 任一文件缺少核心模式、反模式或配置结论 → 打回步骤7重做，不得交付后续知识库消费阶段。
