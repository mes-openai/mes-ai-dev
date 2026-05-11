# 与其他Skill的协作

## 与其他Skill的协作

### 上游输入
- 原始需求描述（用户提供）

### 下游输出
- 输出文件：`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/raw-requirement.md`
- 传递给：`mes-analyze-impact-scope`（影响范围分析）
- 传递给：`mes-analyze-trace-flow`（流程追踪）

### 文件交接约定
本Skill生成 `raw-requirement.md` 后，后续Skill通过读取该文件获取需求编号和解析结果，实现Skill间解耦。
