# 与其他Skill的协作

## 与其他Skill的协作

### 上游输入
- `mes-analyze-parse-requirement` 输出：`raw-requirement.md`

### 下游输出
- 追加内容到：`mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md`
- 传递给：`mes-analyze-trace-flow`（业务流程追踪）
- 传递给：`mes-analyze-identify-repos`（仓库识别）

### 文件交接约定
本Skill将影响范围分析结果追加到 `raw-requirement.md`，后续Skill通过读取该文件获取影响范围信息。
