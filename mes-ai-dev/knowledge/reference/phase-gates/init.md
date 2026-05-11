# 初始化阶段门禁

## 一、适用范围

适用于：

- `/mes-init-project`
- `/mes-init-enrich`
- `/mes-init-converge`
- 初始化结果的收敛状态消费判断

初始化阶段涉及局部产物、状态片段、共享收口与收敛状态判断，默认应结合 `common.md` 使用。

---

## 二、基础初始化进入/退出门禁

### 2.1 进入条件 must-pass
- 默认示例目录 `jalor/`、`web/`、`dbscript/` 存在，或已通过初始化配置/探测结果确认目标仓真实路径映射
- `AGENTS.md` 存在且可读

### 2.2 `/mes-init-project` / `/mes-init-enrich` 退出条件 must-pass
- 对应 scope 的局部产物已生成
- 若 scope 包含 Schema，则每个 `knowledge/database-index/schema-<schema-name>/index.md` 已生成且路径符合 canonical 规则
- 若 scope 包含 Schema，则 `index.md` 必须包含风险画像或语义等价章节，不得为空壳
- 局部 registry 片段、知识片段或热点候选片段已生成
- 已补齐后续阶段消费所需的最小结构化事实
- 阶段完成产物报告已生成
- `knowledge/state/fragments/*.yaml` 已生成并包含本次 scope 的 `coverage` / `checkpoint` / `pending_shared_files`
- 待收口的 reference/code-map 片段状态已记录
- 本次 scope 对应初始化锁已获取或冲突已留痕
- 所有局部产物、状态片段、知识片段路径均符合 canonical 命名规则
- 未执行 `/mes-init-converge` 前，不要求形成最终共享视图，但必须有待收口状态留痕
- 统一状态源与兼容视图保持一致
- 单仓/定向初始化未越界扫描未指定对象
- 若本次声明包含数据库明细抽取，则 `tables.md` / `relations.md` 也必须生成并通过校验
- 关键契约对象已识别定义点或已明确标记候选/未知
- 若关键契约定义在业务仓之外，已确认来源类型、来源定位与获取方式
- 若来源为 `sources-jar` 或 `decompiled-jar`，已附版本一致性说明或待补证说明
- 阶段评审结论为 ✅通过 / ⚠️有条件通过

### 2.3 should-check
- 小仓全量模式下，`detail.md`、`file-summaries.md`、`business-flows.md`、`ownership.md`、`patterns.md`、`test-assets.md`、`runtime.md` 已生成
- `rules/api-conventions.md` 与 `rules/coding-standards.md` 已完成基础填充
- 核心服务 `repo-profile.md` 已生成
- 大仓/超大仓的 `hot-services.md` / `hot-apis.md` / `hot-tables.md` 已生成
- 若存在多套并存响应/错误/认证契约，已区分适用范围与推荐口径

### 2.4 advisory
- `manual-review-queue.md` 已初始化
- `legacy-debt.md` 已建立初版

---

## 三、初始化 GSD 可继续退出条件

允许以“局部初始化完成 + 待收口状态明确”的形式进入 GSD Continue Exit，但至少必须满足：

1. 当前 scope 的基础建图已完成
2. 局部产物已落盘
3. 待 `/mes-init-converge` 收口状态已明确记录
4. 未误写共享最终文件
5. blocker 与风险已记录

### 硬阻断项
- 当前 scope 的基础识别结果不完整
- 局部状态片段未生成
- 共享文件写入边界被破坏
- canonical 路径规则被破坏

### 可代偿推进项
- detail 类深度内容可延后到 `/mes-init-enrich`
- 热点层可在后续收口/深化阶段补齐
- reference/rules 共享文件可延后到收口阶段统一生成

---

## 四、数据库索引专项步骤级门禁

当数据库索引类步骤输出被下游消费前，必须额外检查：

- `index.md` 存在 Schema 概览、风险画像、关键对象摘要
- `index.md` 不存在纯模板占位、空标题、空段落或仅保留章节框架无正文的情况
- 若声明生成 `tables.md`，则表清单、核心表摘要、索引/主键/高风险字段摘要至少完成一项有效内容
- 若声明生成 `relations.md`，则至少包含主外键关系、逻辑关联，或“未识别关系”的明确说明
- 任一项不满足时，当前步骤打回重做，不得进入 `mes-init-verify-knowledge`、收口或下游消费阶段

---

## 四点五、契约级知识专项门禁

### must-pass：契约级知识校验

若项目存在统一响应、错误码、公共异常、SDK 请求/响应模型、认证契约、MQ 消息契约等对象，则初始化阶段必须完成以下校验：

- 已识别关键契约对象的定义点
- 已区分确认结论、候选结论与明确未知
- 关键字段可追溯到真实类、配置或脚本
- 若存在 SDK / common / shared / integration 等公共契约源，已纳入扫描范围或已明确不存在
- 不存在以模板示例或通用框架常识替代项目私有契约的情况

任一关键契约类结论无法追溯到事实来源时，不得判定初始化通过。

### must-pass：公共契约源已确认

若关键契约对象定义在业务仓之外，则初始化阶段必须完成以下校验：

- 已确认其来源类型
- 已确认其来源定位
- 已确认其获取方式
- 已确认其版本一致性，或已明确标记待补证
- 若来源为 `decompiled-jar`，已显式标注中/低置信度与风险说明

未确认公共契约源时，不得将对应契约写为全局已知事实。

### must-pass：无源契约不得生成全局规范

若以下对象仅存在于 SDK / common / shared / integration / 公共依赖中，但当前未获得源码、源码附件或可接受的反编译结果，则：

- 不得生成统一响应全局规范
- 不得生成统一错误码全局规范
- 不得生成统一认证全局规范
- 不得生成统一 MQ 契约全局规范

此时只能输出：
- 候选结论
- 明确未知
- 待补证说明

若在无事实源情况下仍输出全局统一契约，应判定初始化门禁不通过。

### must-pass：空模板状态校验

对于 `api-conventions.md`、`error-code-registry.md`、契约类 reference 文件、patterns 文件等模板型知识文件，应完成状态校验：

- 已区分“未生成”“占位态/空模板”“已填充可消费态”
- 占位态文档已明确标记为不可消费
- 下游阶段未将占位态文档默认视为已知规范

文件存在但内容为空、仅有模板章节、仅有示例占位文本或缺少事实来源时，应视为占位态，而不是已完成知识。

### should-check：多套契约并存检查

对于统一响应、错误码、认证、MQ 等契约类知识，应检查：

- 是否存在多套并存模型
- 是否区分推荐范式与遗留范式
- 是否记录适用范围、消费者范围与兼容边界
- 是否误将局部模式收口为全局模式

若存在多套并存而未显式区分，初始化结果应视为高风险。

### 反例说明

以下情形应直接判定不通过：

- 实际项目统一响应定义为 `RequestReturnVO<T>`，初始化产物却写成 `{code, message, data, timestamp}` 且无法追溯到真实定义类
- `api-conventions.md` 为空模板，但分析/设计阶段默认其已提供项目级 API 规范
- 公共 SDK 中存在响应/错误契约定义，但初始化未扫描 SDK 即输出全局结论

---

## 五、初始化收敛阶段门禁

### 5.1 进入条件 must-pass
- 已至少执行过一次 `/mes-init-project`
- `state/state.yaml` 已存在，或存在待合并的 `state/fragments/*.yaml`
- 已存在可收敛的局部知识产物（services/modules/database-index 至少一类存在）
- `mes-init-converge.lock` 可获取，或锁冲突已按例外流程明确处理

### 5.2 退出条件 must-pass
- `backend-overview.md` 与 `frontend-overview.md` 已按全局视角重算或确认有效
- `service-dependencies.md`、`api-registry.md`、`database-registry.md`、`frontend-backend-map.md` 已按全局视角重算或确认有效
- `business-flows.md`、`ownership.md`、`patterns.md`、`legacy-debt.md` 已按全局视角收口或确认有效
- `hot-services.md`、`hot-apis.md`、`hot-tables.md` 已由候选片段重算为全局正式文件或明确说明本次可跳过原因
- `reference/terminology-glossary.md`、`reference/domain-model.md`、`reference/data-dictionary.md`、`reference/enum-registry.md`、`reference/error-code-registry.md`、`reference/permission-matrix.md`、`rules/api-conventions.md`、`rules/coding-standards.md` 已按全局视角收口或确认有效
- `state/fragments/*.yaml` 已完成合并或 pending 已清空
- `state.yaml`、`baseline.md`、`init-coverage.md`、`summary.md` 已同步更新
- 阶段评审结论为 ✅通过 / ⚠️有条件通过

### 5.3 should-check
- 已对 coverage 缺口与局部产物缺口给出说明
- 已记录本次收敛覆盖的 repo/module/schema 范围

### 5.4 advisory
- 已记录本次收敛结果与一次全仓初始化可能仍存在的偏差说明

### 5.5 GSD 可继续退出条件
- 当前全局收敛目标明确
- 关键共享知识与状态收敛结果已形成
- 当前未完成项不影响下游正确消费
- blocker、风险与后补动作已明确
- 已完成收尾扫描

### 5.6 硬阻断项
- 关键共享知识未完成收敛
- `state.yaml` 与兼容视图不同步
- 全局结果不足以下游正确消费
- 收敛锁冲突未按例外流程处理

---

## 六、初始化收敛状态消费门禁

### 6.1 收敛状态定义
- `completed`：全局共享知识已完成收敛，可作为全仓事实消费
- `pending`：待收敛，只能按局部或降级口径消费
- `failed`：收敛失败，禁止作为全局事实消费
- `partial / local-only`：仅部分 scope 已完成，只能用于局部结论

### 6.2 must-pass 检查项
- 当前任务是否要求全局统一结论
- 当前 `state.yaml` 中的 convergence 状态是否满足任务消费要求
- 当前依赖资产是否受 refresh / dirty 影响而失去全局可信度
- 当前任务所需范围是否已被已收敛知识覆盖

### 6.3 should-check 检查项
- 若仅局部知识可用，是否足以支撑当前任务结论
- 是否存在关键未覆盖范围、待人工确认规则或关键共享资产缺口
- 是否需要将当前任务降级为局部分析、局部设计或局部验证结论

### 6.4 mandatory-record
- 当前收敛状态判定
- 当前消费口径：全局 / 局部 / 降级
- 当前可消费范围
- 当前禁止消费范围
- 未覆盖范围
- 风险提示
- 所依赖知识基线时间点或版本说明

### 6.5 消费规则

#### 全局消费
必须同时满足：
1. convergence 状态为 `completed`
2. 当前依赖资产未被标记为 dirty 或已重新确认
3. 当前任务所需的关键共享知识存在且可信

#### 局部消费
允许条件：
1. 当前任务范围明确限定为 service / module / schema / scope
2. 当前使用的知识资产仅用于该局部范围
3. 产物中显式标注“局部视角”
4. 不输出全仓统一结论

#### 降级推进
允许条件：
1. 当前任务只涉及局部范围
2. 风险说明已写入产物
3. 产物明确标注“降级推进”
4. 不得将该结论直接作为后续全局设计、全局交付或全局验收依据

#### 必须阻断
满足任一即阻断：
- convergence 状态为 `failed`
- convergence 状态为 `pending` 且当前任务要求全局统一结论
- 全局知识被标记为 dirty 且尚未重新确认
- 关键共享资产缺失或明显不可信
