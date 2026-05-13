# 与其他Skill的协作

## 与其他Skill的协作

### 上游输入
- `mes-analyze-parse-requirement` 输出：`raw-requirement.md`
- `mes-analyze-impact-scope` 输出：影响范围（追加在 raw-requirement.md）

### 下游输出
- 输出文件：`mes-ai-dev/workspace/requirements/{REQ-ID}/business-flow-trace.md`
- 传递给：`mes-analyze-identify-repos`（仓库识别）
- 传递给：`mes-design-approach`（设计方案）

### 文件交接约定
本 Skill 生成独立的业务流程追踪报告，后续 Skill 通过读取该文件获取调用链路信息。
