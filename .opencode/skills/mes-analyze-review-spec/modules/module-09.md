# 与其他Skill的协作

## 与其他Skill的协作

### 上游输入
- `mes-analyze-generate-spec` 输出：`spec.md`
- 按需读取：`raw-requirement.md`、`business-flow-trace.md`
- 按需读取：知识库文件

### 下游输出
- 输出文件：`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/spec-review-report.md`
- 若评审通过 → 传递给：`mes-design-approach`（详细设计）
- 若评审不通过 → 返回需求分析阶段修正

### 文件交接约定
本 Skill 生成独立的评审报告，后续阶段根据评审结论决定是否进入设计阶段。若评审不通过，需求分析阶段需根据评审报告修正问题后重新评审。
