# Skill 图谱与 TDD 消费标准

> 本文件定义所有目录化 Skill 消费 GitNexus 类代码知识图谱、graphify 类知识图谱导读，以及 TDD 单元测试生成规范时的统一边界。
> 本文件作为 `skill-consumption-standard.md` 的专题补充，仅在 Skill 执行、审查或维护时按需加载。

---

## 一、适用范围

以下场景应读取本标准：

- Skill 需要使用代码结构、调用链、依赖链、影响范围、回归路径等图谱化辅助信息。
- Skill 需要输出阶段文档、交接材料、测试报告、事故报告等关系导读。
- Skill 需要生成或审查 Java 单元测试、JUnit、Mockito、mock 或路径相关测试。
- Skill 入口、索引或模块正文需要补充 GitNexus / graphify / TDD 相关规则。

---

## 二、GitNexus 类能力消费边界

GitNexus 类代码知识图谱能力可用于辅助：

- 识别文件、模块、服务、接口、函数、类之间的结构关系。
- 追踪 import / call / dependency / execution flow。
- 判断影响范围、消费者、回归路径和最小改动集合。
- 辅助 code-map、dependency-graph、API registry、刷新检测和服务链设计。

必须遵守：

- GitNexus 结果只能作为证据导航或候选线索。
- 关键结论必须回到项目事实源、知识库文件、代码定义点、测试证据或人工确认中验证。
- 图谱推断应标注为候选、推断或待复核，不得写成确认事实。
- 当图谱结果与代码、日志、测试、发布或阶段主文档冲突时，以事实源和阶段门禁证据为准。

禁止：

- 以 GitNexus 图谱替代阶段主文档、门禁、测试执行或审查报告。
- 因图谱发现非目标问题而扩大当前任务范围。
- 将图谱推断直接写入共享知识为确定结论。

---

## 三、graphify 类能力消费边界

graphify 类知识图谱能力可用于辅助：

- 生成阶段文档、交接材料、事故材料、测试证据之间的关系导读。
- 形成 graph report、wiki 化入口、路径解释或跨文件关系说明。
- 帮助下游快速理解需求项、设计对象、测试对象、证据与风险之间的关系。

必须遵守：

- graphify 输出只作为导读、导航或补充说明。
- 正式结论必须落入阶段主文档、Skill 输出产物或门禁报告。
- 导读中的推断关系必须标注可信度或不确定性。
- 当导读与正式产物不一致时，以正式产物为准，并修正或移除导读。

禁止：

- 用 graphify 导读替代 `spec.md`、`design.md`、`tasks.md`、`test-report.md`、`deploy-plan.md`、`handover-doc.md`、`postmortem.md` 等正式产物。
- 用关系图替代测试执行、发布验证、事件证据或人工确认。

---

## 四、TDD 单元测试生成标准

生成或审查单元测试时，所有相关 Skill 必须满足以下要求。

### 4.1 Windows / Linux 兼容

- 禁止硬编码 `\\`、`/`、盘符、用户目录、工作目录或本机绝对路径。
- 路径拼接优先使用 `Path`、`Paths`、`File.separator` 或项目既有跨平台工具。
- 路径断言前应进行 `normalize()` 或等价规范化。
- 临时文件和临时目录应使用测试框架或 JDK 提供的跨平台机制。
- classpath 资源读取不得依赖 IDE 当前工作目录。

### 4.2 Mockito 最佳实践

- 同一个 mock 调用中的参数匹配策略必须一致，不得混用裸值与 matcher。
- 固定值匹配优先使用 `eq(...)`。
- 复杂对象参数优先使用 `ArgumentCaptor` 或 `argThat(...)`。
- 不得用过宽泛的 `any()` 掩盖真实契约。
- stub 前必须初始化被测对象、mock 依赖、返回对象和嵌套字段。
- 链式调用、嵌套返回、Optional 和集合返回必须完整构造返回路径。
- 严禁通过删除断言、吞异常、万能 mock、放宽 matcher 来制造测试通过。

### 4.3 Java 单元测试固定约束

- 默认测试框架为 JUnit 5 + Mockito + JDK8。
- 新生成测试类默认使用 `@ExtendWith(MockitoExtension.class)`。
- 每个被测 public 方法必须对应一个 `@Nested` 内部类，内部按正常、边界、异常、空值等场景组织测试方法。
- 禁止测试 private 方法，应通过 public 方法间接覆盖。
- 禁止使用 import 通配符或静态通配符导入。
- 默认必须 Mock 外部 API 调用、DAO / Mapper / Repository 数据操作层、国际化工具 `I18nUtils` / `I18nUtil`、唯一生成工具 `GuidUtil` 以及其他不可控外部依赖。
- 对统一响应对象、Result、Response、AjaxResult 或类似结构，必须同时断言状态码/结果标识与核心业务数据；禁止只验证状态码。
- 行覆盖率、分支覆盖率、方法覆盖率均必须达到 100%。
- 覆盖率不足时只能补充测试用例，不得删除已通过用例，不得为了测试通过而修改测试逻辑或业务逻辑。

### 4.4 TDD 闭环

- 测试计划必须先于代码生成。
- 用户补充和确认结论必须被记录。
- 本轮新生成测试用例必须全部通过。
- 本轮生成/修改并纳入验证范围的行覆盖率、分支覆盖率、方法覆盖率必须满足阶段门禁要求。

---

## 五、Skill 层落地要求

当某个 Skill 命中本标准时，应按以下优先级消费：

1. 先读取该 Skill 的 `SKILL.md`，确认入口级边界。
2. 再读取该 Skill 的 `INDEX.md`，确认是否已有图谱 / TDD 提示。
3. 仅进入命中的 `modules/*.md`，优先读取约束、审核、质量、注意事项、异常处理模块。
4. 若 `modules/` 未写明图谱或 TDD 细则，默认继承本标准，不得反向扩大解释。

---

## 六、审查要求

审查 Skill 输出时，至少检查：

- 是否把 GitNexus / graphify 输出误当作确定事实。
- 是否记录图谱结论与正式产物之间的映射关系。
- 是否发生范围膨胀、无关修改或无关重构。
- 单元测试是否跨平台。
- Mockito 参数匹配、stub 初始化和断言是否可靠。
- 是否有真实测试执行、覆盖率或等价验证证据。

---

## 七、相关入口

- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- 阶段门禁入口：`.opencode/references/mes-ai-reference/reference/phase-gates/index.md`
