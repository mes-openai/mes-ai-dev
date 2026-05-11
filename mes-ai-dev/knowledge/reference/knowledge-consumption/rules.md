# 规则类资产消费分片

## 一、规则层级

| 规则层 | 用途 |
|---|---|
| `rules/core/*.md` | 最小常驻内核 |
| `rules/phases/phase-*.md` | 当前阶段目标边界、步骤与退出条件 |
| `rules/scenarios/scenario-*.md` | 命中特殊条件时按需加载 |
| `rules/governance/*.md` | 审查、收尾、目录、共享写入等共性治理 |

---

## 二、消费规则

1. 执行阶段工作时，优先按 `AGENTS.md` 与 `skeleton-loading-matrix.md` 装载当前阶段所需规则
2. 不得默认把所有阶段与场景规则常驻
3. 治理母规则只在当前工作需要时加载，不得把全部 governance 正文常驻
4. 历史兼容入口默认不作为主事实源

---

## 三、与其他分片的边界

- 当前分片只处理“规则文件如何读”
- 不处理业务知识、阶段记忆或 convergence 状态的具体语义
