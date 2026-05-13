# 阶段工作目录与需求编号命名标准

> 本标准用于统一需求分析、详细设计、开发、测试、交付等阶段的工作目录命名与跨阶段续跑规则，避免同一 session 内继续执行下一阶段时沿用上一阶段目录。

---

## 一、适用范围

以下场景必须读取并遵循本标准：

- 生成或审查阶段正式产物目录。
- 从需求分析继续进入详细设计、开发、测试或交付阶段。
- Command / Skill 示例中出现 `{REQ-ID}`、`REQ-YYYYMMDD-XXX` 或阶段工作目录。
- 需要从用户输入、原始需求、需求规格、设计文档中确定需求编号。

---

## 二、需求编号解析规则

所有阶段产物目录统一使用 `{REQ-ID}`。`{REQ-ID}` 必须按以下优先级解析：

1. 若用户输入、原始需求、需求规格或设计文档中存在 `US[0-9]+`，使用该编号作为 `{REQ-ID}`。
2. 若不存在 `US[0-9]+`，但存在 `ITRQ[0-9]+`，使用该编号作为 `{REQ-ID}`。
3. 若同一文档或同一需求上下文同时存在 `US[0-9]+` 和 `ITRQ[0-9]+`，必须以 `US[0-9]+` 命名目录。
4. 仅当上述编号均不存在时，才允许生成 `REQ-YYYYMMDD-{序号}`。
5. 同一需求在所有阶段必须复用同一个 `{REQ-ID}`，不得在不同阶段重新生成不同编号。

---

## 三、阶段目录映射

解析出 `{REQ-ID}` 后，各阶段输出目录必须按阶段类型重新计算：

| 阶段 | 标准目录 |
|---|---|
| 需求分析 | `mes-ai-dev/workspace/requirements/{REQ-ID}/` |
| 详细设计 | `mes-ai-dev/workspace/designs/{REQ-ID}/` |
| 开发实现 | `mes-ai-dev/workspace/development/{REQ-ID}/` |
| 测试验证 | `mes-ai-dev/workspace/testing/{REQ-ID}/` |
| 发布交付 | `mes-ai-dev/workspace/delivery/{REQ-ID}/` |
| 紧急修复 | `mes-ai-dev/workspace/emergency/EMG-YYYYMMDD-XXX/` |
| 知识刷新 | `mes-ai-dev/workspace/refresh/` |

---

## 四、跨阶段续跑规则

1. 每个阶段开始前必须重新声明：`{REQ-ID}`、输入目录、当前阶段输出目录。
2. 禁止把上一阶段输出目录作为当前阶段输出目录。
3. 详细设计阶段只能读取 `mes-ai-dev/workspace/requirements/{REQ-ID}/` 作为需求输入，设计产物必须写入 `mes-ai-dev/workspace/designs/{REQ-ID}/`。
4. 开发、测试、交付阶段同理：只能读取上游阶段产物作为输入，不得把当前阶段产物写入上游目录。
5. 同一 session 连续执行多个阶段时，必须在阶段切换处执行目录重算，不得依赖最近一次对话中的“当前目录”。

---

## 五、占位符与历史兼容

- `REQ-YYYYMMDD-XXX` 仅作为“无 US/ITRQ 编号时的兜底示例”，不得优先于真实需求编号。
- 新增命令、Skill、模板示例应优先使用 `{REQ-ID}`，并引用本标准说明解析规则。
- 历史文档中的 `requirement-spec.md` / `design-doc.md` 可作为旧别名兼容；新阶段主文档标准名为 `spec.md` / `design.md`。

---

## 六、门禁检查

阶段出口与文档生成自审必须检查：

- [ ] `{REQ-ID}` 是否按 `US` 优先、`ITRQ` 次之、兜底 `REQ-YYYYMMDD-{序号}` 解析。
- [ ] 当前阶段产物是否写入当前阶段标准目录。
- [ ] 是否存在设计产物写入 `mes-ai-dev/workspace/requirements/`、测试产物写入 `mes-ai-dev/workspace/designs/` 等跨阶段串位。
- [ ] 同一需求跨阶段目录名是否一致。
- [ ] 若使用兜底编号，是否记录“未发现 US/ITRQ 编号”的原因。
