# Core Rules Index

> 本文件为常驻核心规则导航页。
> Core 规则定义跨阶段、跨场景都适用的最小约束与执行基线。

---

## 一、适用范围

以下情况优先读取 Core 规则：

- 需要判断当前请求属于分析还是实现。
- 需要确认最小安全红线。
- 需要确认执行基线与完成基线。
- 不确定是否应进入下一阶段或下一动作。

---

## 二、推荐加载顺序

1. 意图判定与进入条件
2. 安全红线
3. 执行基线
4. 完成基线
5. 运行时入口与补充核心规则

---

## 三、规则入口

- Agent 核心规则：`mes-ai-dev/knowledge/rules/core/agent-core.md`
- 意图门禁：`mes-ai-dev/knowledge/rules/core/intent-gate.md`
- 安全红线：`mes-ai-dev/knowledge/rules/core/safety-redlines.md`
- 执行基线：`mes-ai-dev/knowledge/rules/core/execution-baseline.md`
- 完成基线：`mes-ai-dev/knowledge/rules/core/completion-baseline.md`
- 运行时入口：`mes-ai-dev/knowledge/rules/core/runtime-entry.md`

---

## 四、使用提醒

- Core 规则优先于阶段性习惯做法。
- 若 Phase/Scenario 文档与 Core 规则冲突，应先检查是否属于显式特例。
- 需要细节时进入具体文档，不用索引页替代正文。
