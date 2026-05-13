# 骨架整改专项回归检查清单

## 一、初始化事实约束

- [ ] 初始化是否仍会在事实不足时脑补项目私有契约
- [ ] 契约级知识是否区分确认 / 候选 / 未知
- [ ] `api-conventions.md`、`error-code-registry.md` 是否正确标状态与可消费性
- [ ] SDK / 公共依赖事实源是否按 `workspace-source` → `repo-source` → `sources-jar` → `decompiled-jar` → `unknown` 顺序处理
- [ ] 无源契约是否被阻断为全局统一规范

## 二、契约级知识体系

- [ ] `contracts.md` 是否可作为统一入口被消费
- [ ] 契约类知识是否记录来源类型、来源定位、获取方式、版本一致性说明
- [ ] `response-conventions-template.md` 是否足以表达真实响应契约

## 三、多仓分析与设计决策

- [ ] analyze 是否形成仓级责任边界
- [ ] 是否区分候选仓 / 确认仓 / 待补证仓
- [ ] 是否区分技术可达 provider / 架构允许 provider / 最终选定 provider
- [ ] 是否形成 API 复用 / 扩展 / 新增判断
- [ ] design 是否冻结服务链与禁止路径

## 四、开发阶段限边

- [ ] develop 是否禁止重做仓边界与 provider 选择
- [ ] `task-plan.md` 是否未承担 analyze/design 职责
- [ ] 偏离私有契约 / 范式时是否记录理由与影响

## 五、导航与索引层

- [ ] template-index 是否包含新增模板
- [ ] knowledge-consumption index / reference 是否能导航到契约入口
- [ ] command-skill-artifact-map 是否反映新增产物
- [ ] phase-skill-index 是否反映新增职责
- [ ] loading-matrix / authority-matrix / phase-gates/index 是否与正文一致

## 五点五、图谱与 Skill 消费治理

- [ ] 若使用 GitNexus 类能力，是否明确其只作为证据导航或候选线索
- [ ] 若使用 graphify 类能力，是否明确其只作为导读、导航或补充说明
- [ ] 图谱推断是否被禁止直接写成确定事实
- [ ] 图谱导读是否被禁止替代阶段主文档、测试证据、发布证据、事件报告或门禁结论
- [ ] `skill-consumption-standard.md` 是否能导航到 `skill-graph-tdd-consumption-standard.md`
- [ ] Skill 的 `SKILL.md`、`INDEX.md`、命中 `modules/` 与统一标准之间是否不存在断层

## 五点六、TDD / UT 生成治理

- [ ] 单元测试生成规则是否覆盖 Windows / Linux 路径兼容
- [ ] 是否禁止硬编码路径分隔符、盘符、用户目录、工作目录或本机绝对路径
- [ ] Mockito matcher 是否要求一致使用，禁止裸值与 matcher 混用
- [ ] 复杂参数是否优先使用 `ArgumentCaptor` 或 `argThat(...)`
- [ ] 是否要求 stub 前初始化被测对象、mock 依赖、返回对象和嵌套字段
- [ ] 是否禁止万能 mock、删除断言、吞异常等虚假通过方式

## 六、专项场景

- [ ] `scenario-external-contract-source.md` 是否与 phase-init / contracts / init gate 口径一致
- [ ] 外部契约源场景是否有明确阻断条件

## 七、结论

- [ ] 全部通过，可进入下一阶段
- [ ] 有条件通过，需先完成问题闭环
- [ ] 不通过，需回流整改
