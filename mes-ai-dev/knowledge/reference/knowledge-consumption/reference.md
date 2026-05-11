# reference 参考资产消费分片

## 一、主要资产

| 文件 | 消费场景 |
|---|---|
| `terminology-glossary.md` | 初始化深化、需求分析 |
| `domain-model.md` | 需求分析 |
| `data-dictionary.md` | 设计 |
| `enum-registry.md` | 开发 |
| `phase-gates.md` / `phase-gates/` | 门禁校验 |
| `blocker-handling-guide.md` | blocker 分类与处理 |
| `dod-definition-guide.md` | 判断完整完成 / GSD 完成 |
| `governance-memory.md` | 骨架治理经验回查 |
| `stage-memory-governance.md` | 阶段记忆定义与消费边界 |
| `stage-memory/**` | 当前阶段全局坑点/模式/约束输入 |
| `permission-matrix.md` | 权限控制参考 |
| `api-conventions.md` | API / 响应 / 认证契约索引入口，需先判断状态与是否可消费 |
| `error-code-registry.md` | 错误契约、错误码来源、扩展参数与消费方式 |
| 契约模板族 | `templates/reference/response-conventions-template.md`、`authentication-conventions-template.md`、`mq-conventions-template.md`、`gateway-conventions-template.md` |
| `command-skill-artifact-map.md` | command / skill / artifact 标准映射 |
| `skeleton-constraint-summary.md` | 骨架修改人工快速核对入口 |
| `status-tracker-governance.md` | 状态追踪字段与流转 |
| `exception-handbook.md` | 紧急修复例外流程手册 |

---

## 二、消费规则

1. `terminology-glossary.md`、`domain-model.md` 默认只读索引或受影响分组，禁止无边界整份加载
2. `data-dictionary.md` 必须按 Schema 分片消费
3. `stage-memory/**` 属于阶段前置上下文的一部分，未消费必读记忆不得视为完成预检
4. `command-skill-artifact-map.md` 仅解决命名与映射问题，不替代阶段规则
5. `api-conventions.md`、`error-code-registry.md` 若处于占位态或不可消费状态，不得被 analyze/design/develop 直接当作既定规范使用
6. 当统一响应、错误码、SDK 请求/响应模型或认证/MQ 契约来自业务仓外部定义源时，应优先转入 `contracts.md`，而不是仅停留在参考资产层

---

## 三、默认不加载

- 与当前阶段无关的参考资产
- 大文件全部正文
