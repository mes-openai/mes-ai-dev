# Completion Sweep 标准（completion-sweep-standard）

## 一、目的
统一所有阶段、工作单元、最小可交付结果在退出前的收尾扫描要求。

## 二、标准检查项
至少检查以下八项：
1. 改动闭合
2. 引用同步
3. 产物齐全性
4. 证据可追溯性
5. blocker 状态
6. 风险与后补动作
7. 下一步建议
8. 交接可恢复性

## 三、结论枚举
- 已闭合，可退出
- 基本闭合，可带条件退出
- 未闭合，不可退出
- 最小可交付，可继续推进但不可视为完整完成

## 四、不合格情形
- 只写“已完成”
- 未说明 blocker / 风险 / 后补动作
- 未更新 handoff 或 memory
- 结论没有证据路径

## 五、统一引用写法
“阶段收尾与完成扫描必须符合 `knowledge/rules/governance/completion-sweep-standard.md`。”
