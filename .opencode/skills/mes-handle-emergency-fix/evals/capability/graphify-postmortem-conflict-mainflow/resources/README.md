# graphify-postmortem-conflict-mainflow 资源说明

## 图谱导读

- graphify 模拟输出可用于事故关系导读、材料索引和阅读导航。
- graphify 对主因、风险关闭或回流关闭的判断必须标注为推断或待复核。

## 正式事故材料

- 事件报告。
- 修复证据。
- 最小验证结果。
- `postmortem.md`。
- `status-tracker.md`。
- `refresh-hints.md` 或等价知识刷新说明。
- 阶段门禁检查记录。

## 冲突处理

当 graphify 导读与事件报告、postmortem、最小验证结果或回流主链动作冲突时，以正式事故材料和阶段门禁证据为准，并修正或移除导读。

## 回流边界

本 eval 必须验证紧急修复完成后仍需判断并记录 analyze / design / develop / test / refresh 回流动作。graphify 导读不得替代 postmortem，也不得关闭必要的 refresh 或其他主链回流。
