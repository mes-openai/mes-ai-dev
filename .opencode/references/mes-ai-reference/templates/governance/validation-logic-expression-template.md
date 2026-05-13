---
title: 校验逻辑表达式设计标准模板
doc_type: template
load_strategy: explicit-only
phase_scope: [design, develop]
trigger:
  - validation-expression
  - validation-code
cost_level: medium
summary_first: false
default_allowed: false
parent_index: templates/template-index.md
related_files:
  - templates/governance/validation-rule-structuring-template.md
  - templates/governance/validation-placement-decision-template.md
---

# 校验逻辑表达式设计标准模板（validation-logic-expression-template）

> 用于将结构化校验规则转换为具体的代码实现逻辑表达式。
> 目标是弥合"结构化规则"与"代码实现"之间的断层，保障实现一致性。

## 一、模板定位

- **文件角色**：方法论模板（不依赖具体业务）
- **适用阶段**：详细设计 / 代码开发
- **使用时机**：当结构化校验规则已形成且归属决策已确定，需要设计具体代码实现
- **输入**：结构化校验规则 + 归属决策（来自前两个模板）
- **输出**：校验逻辑表达式代码片段（可追加到 design-doc 或 task-plan）

---

## 二、表达式分类总览

### 2.1 表达式类型分类

| 类型 | 说明 | 适用场景 | 典型实现 |
|------|------|----------|----------|
| 状态判断表达式 | 判断状态字段是否等于指定值 | 已XX/未XX类规则 | `if (status == XX)` |
| 存在性判断表达式 | 判断对象是否存在/不存在 | 存在XX/不存在XX类规则 | `if (obj != null)` |
| 数量判断表达式 | 判断数量/计数是否满足条件 | 数量大于N/首次/补打类规则 | `if (count > N)` |
| 组合判断表达式 | 多条件组合判断 | 复杂业务规则 | `if (A && B)` |
| 跨服务判断表达式 | 调用其他服务后判断 | 跨库数据校验 | `if (remoteService.check())` |

### 2.2 表达式层级映射

| 层次 | 表达式职责 | 实现方式 |
|------|------------|----------|
| 前端表达式 | 用户即时反馈校验 | Vue页面 `beforeSubmit` 方法 |
| Controller表达式 | API入口参数校验 | Java Controller方法入口 |
| Service表达式 | 业务逻辑强制校验 | Java Service方法入口 |
| 跨服务表达式 | 跨库数据校验 | Java Service调用其他服务 |

---

## 三、表达式设计标准

### 3.1 状态判断表达式标准

**结构**：
```java
// 模板结构
if (entity.statusField == StatusEnum.TARGET_STATUS) {
    // 校验动作
}
```

**设计要素**：

| 要素 | 说明 | 标准要求 |
|------|------|----------|
| 状态字段 | 判断的业务状态字段 | 必须明确字段名和枚举类型 |
| 目标状态 | 判断的目标状态值 | 必须明确枚举值，不可用字符串或数字常量 |
| 比较方式 | 状态比较的实现方式 | 必须使用枚举比较（`==`或`.equals()`），禁止字符串比较 |
| 校验动作 | 条件满足后的动作 | 必须明确阻断方式、错误码、提示信息 |

**示例**：
```java
// 示例：阻止已发货订单履行
if (order.getShippingStatus() == ShippingStatusEnum.SHIPPED) {
    throw new BusinessException(ErrorCode.ORDER_ALREADY_SHIPPED, 
        "订单已发货，不允许履行");
}
```

**禁止行为**：
```java
// ❌ 禁止：字符串常量比较
if ("已发货".equals(order.getShippingStatus())) { ... }

// ❌ 禁止：数字常量比较
if (order.getShippingStatus() == 2) { ... }

// ❌ 禁止：字段名不明确
if (status == SHIPPED) { ... }  // 缺少实体前缀
```

### 3.2 存在性判断表达式标准

**结构**：
```java
// 模板结构
if (entity.relatedObject != null && !entity.relatedObject.isEmpty()) {
    // 校验动作
}
```

**设计要素**：

| 要素 | 说明 | 标准要求 |
|------|------|----------|
| 判断对象 | 判断的关联对象 | 必须明确对象名和来源 |
| 存在判断 | 对象存在的判断方式 | 必须同时判断 `!= null` 和 `isEmpty()` |
| 校验动作 | 条件满足后的动作 | 必须明确阻断方式、错误码、提示信息 |

**示例**：
```java
// 示例：阻止不存在标签的订单流转
if (order.getLabel() == null || order.getLabel().isEmpty()) {
    throw new BusinessException(ErrorCode.ORDER_LABEL_NOT_EXISTS, 
        "订单标签不存在，不允许流转");
}
```

**禁止行为**：
```java
// ❌ 禁止：仅判断null
if (order.getLabel() == null) { ... }  // 缺少isEmpty判断

// ❌ 禁止：判断对象不明确
if (label == null) { ... }  // 缺少实体前缀
```

### 3.3 数量判断表达式标准

**结构**：
```java
// 模板结构
if (entity.countField > N) {
    // 校验动作
}
```

**设计要素**：

| 要素 | 说明 | 标准要求 |
|------|------|----------|
| 计数字段 | 判断的计数字段 | 必须明确字段名和来源 |
| 比较方式 | 数量比较的实现方式 | 必须明确比较运算符和边界值 |
| 校验动作 | 条件满足后的动作 | 必须明确阻断方式、错误码、提示信息 |

**示例**：
```java
// 示例：补打标签预警（打印次数大于0）
if (order.getLabelPrintCount() > 0) {
    // 预警提示（软阻断）
    return new ValidationResult(true, "该订单为补打标签，请注意核对");
}
```

**禁止行为**：
```java
// ❌ 禁止：硬编码数字常量
if (count > 0) { ... }  // 缺少字段前缀

// ❌ 禁止：边界值不明确
if (order.getLabelPrintCount() > SOME_VALUE) { ... }  // 缺少明确边界
```

### 3.4 组合判断表达式标准

**结构**：
```java
// 模板结构
if (conditionA && conditionB) {
    // 校验动作
}
```

**设计要素**：

| 要素 | 说明 | 标准要求 |
|------|------|----------|
| 组合逻辑 | 多条件的组合方式 | 必须明确 `AND` 或 `OR` 组合 |
| 子条件 | 每个子条件的表达式 | 每个子条件必须符合单项表达式标准 |
| 校验动作 | 条件满足后的动作 | 必须明确阻断方式、错误码、提示信息 |

**示例**：
```java
// 示例：阻止已发货且未打印标签的订单履行
if (order.getShippingStatus() == ShippingStatusEnum.SHIPPED 
    && order.getLabelPrintStatus() != LabelPrintStatusEnum.PRINTED) {
    throw new BusinessException(ErrorCode.ORDER_SHIPPED_NOT_PRINTED, 
        "订单已发货但未打印标签，不允许履行");
}
```

**禁止行为**：
```java
// ❌ 禁止：组合逻辑不明确
if (conditionA || conditionB && conditionC) { ... }  // 缺少括号明确优先级

// ❌ 禁止：子条件不符合标准
if (order.status == SHIPPED && count > 0) { ... }  // 子条件缺少字段前缀
```

### 3.5 跨服务判断表达式标准

**结构**：
```java
// 模板结构
RemoteData remoteData = remoteService.getData(entity.relatedId);
if (remoteData.statusField == StatusEnum.TARGET_STATUS) {
    // 校验动作
}
```

**设计要素**：

| 要素 | 说明 | 标准要求 |
|------|------|----------|
| 调用服务 | 调用的远程服务 | 必须明确服务名和方法名 |
| 调用方式 | 调用的实现方式 | 必须通过架构限定通道，禁止直接跨库 |
| 判断逻辑 | 判断的表达式 | 必须符合状态判断表达式标准 |
| 校验动作 | 条件满足后的动作 | 必须明确阻断方式、错误码、提示信息 |

**示例**：
```java
// 示例：跨库校验前处理订单状态
OrderDTO remoteOrder = preProcessChannelService.getOrder(order.getId());
if (remoteOrder.getStatus() == OrderStatusEnum.SHIPPED) {
    throw new BusinessException(ErrorCode.ORDER_ALREADY_SHIPPED_IN_PREPROCESS, 
        "前处理系统订单已发货，不允许履行");
}
```

**禁止行为**：
```java
// ❌ 禁止：直接跨库查询
String sql = "SELECT status FROM preprocess.t_order WHERE id = ?";
QueryRunner.query(sql, orderId);  // 违反架构限定通道约束

// ❌ 禁止：绕过限定通道
preProcessService.getOrder(order.getId());  // 缺少限定通道服务前缀
```

---

## 四、表达式输出模板

### 4.1 单条表达式输出模板

```markdown
### 规则 [规则ID] 表达式设计

| 维度 | 内容 |
|------|------|
| 规则名称 | [业务语义名称] |
| 表达式类型 | [状态判断/存在性判断/数量判断/组合判断/跨服务判断] |
| 所属层次 | [前端/Controller/Service/跨服务] |
| 表达式代码 | ```java\n[代码片段]\n``` |
| 状态字段来源 | [枚举类路径] |
| 错误码 | [错误码] |
| 提示信息 | [用户可见提示] |
| 校验动作 | [阻断方式] |
```

### 4.2 表达式汇总表模板

| 规则ID | 规则名称 | 表达式类型 | 所属层次 | 状态字段来源 | 错误码 | 提示信息 |
|--------|----------|------------|----------|--------------|--------|----------|
| VAL-001 | [名称] | [类型] | [层次] | [枚举类] | [错误码] | [提示] |

---

## 五、使用示例（模板占位）

> 以下示例为占位格式，实际使用时需填充具体项目的真实规则。

### 示例表达式设计

**输入**：规则 VAL-001 结构化结果 + 归属决策

| 维度 | 内容 |
|------|------|
| 规则ID | VAL-001 |
| 规则名称 | 阻止已发货订单履行 |
| 判断对象 | `order.shippingStatus` |
| 判断条件 | `shippingStatus == SHIPPED` |
| 校验动作 | 硬阻断 |
| 必要层次 | Controller + Service |

**表达式设计输出**：

#### Controller层表达式

```java
/**
 * 规则ID：VAL-001
 * 规则名称：阻止已发货订单履行
 * 层次：Controller校验
 */
@PostMapping("/fulfill")
public Result<Void> fulfill(@RequestBody OrderFulfillmentRequest request) {
    // Controller入口校验
    Order order = orderService.getById(request.getOrderId());
    if (order.getShippingStatus() == ShippingStatusEnum.SHIPPED) {
        return Result.error(ErrorCode.ORDER_ALREADY_SHIPPED, 
            "订单已发货，不允许履行");
    }
    // 继续执行业务逻辑
    return orderFulfillmentService.fulfill(request);
}
```

#### Service层表达式

```java
/**
 * 规则ID：VAL-001
 * 规则名称：阻止已发货订单履行
 * 层次：Service校验
 */
public void fulfill(OrderFulfillmentRequest request) {
    // Service业务逻辑校验
    Order order = this.getById(request.getOrderId());
    if (order.getShippingStatus() == ShippingStatusEnum.SHIPPED) {
        throw new BusinessException(ErrorCode.ORDER_ALREADY_SHIPPED, 
            "订单已发货，不允许履行");
    }
    // 继续执行履行逻辑
    // ...
}
```

**表达式汇总**：

| 维度 | 内容 |
|------|------|
| 规则ID | VAL-001 |
| 规则名称 | 阻止已发货订单履行 |
| 表达式类型 | 状态判断表达式 |
| 所属层次 | Controller + Service |
| 表达式代码 | `if (order.getShippingStatus() == ShippingStatusEnum.SHIPPED)` |
| 状态字段来源 | `ShippingStatusEnum.java` |
| 错误码 | `ErrorCode.ORDER_ALREADY_SHIPPED` |
| 提示信息 | "订单已发货，不允许履行" |
| 校验动作 | 硬阻断 + 抛异常 |

---

## 六、特殊情况处理

### 6.1 补打预警表达式设计

**特征识别**：
- 校验动作：软阻断 + 预警
- 需要用户确认后继续执行

**表达式设计**：

#### 前端层表达式

```javascript
/**
 * 规则ID：VAL-002
 * 规则名称：补打标签预警
 * 层次：前端校验
 */
async beforeSubmit() {
    const order = await this.getOrder(this.orderId);
    if (order.labelPrintCount > 0) {
        // 预警提示（软阻断）
        const confirmed = await this.$confirm(
            '该订单为补打标签，请注意核对信息后继续',
            '补打预警',
            { type: 'warning' }
        );
        if (!confirmed) {
            return false;  // 用户取消
        }
    }
    return true;  // 继续提交
}
```

#### Service层表达式（可选记录）

```java
/**
 * 规则ID：VAL-002
 * 规则名称：补打标签预警
 * 层次：Service校验（可选记录）
 */
public void fulfill(OrderFulfillmentRequest request) {
    Order order = this.getById(request.getOrderId());
    if (order.getLabelPrintCount() > 0) {
        // 记录预警日志（可选）
        log.warn("补打标签订单履行：orderId={}, printCount={}", 
            order.getId(), order.getLabelPrintCount());
    }
    // 继续执行履行逻辑
    // ...
}
```

### 6.2 跨库校验表达式设计

**特征识别**：
- 涉及跨库数据（前处理数据库）
- 必须通过架构限定通道

**表达式设计**：

#### Service层表达式

```java
/**
 * 规则ID：VAL-003
 * 规则名称：阻止前处理已发货订单履行
 * 层次：Service校验 + 跨服务校验
 */
public void fulfill(OrderFulfillmentRequest request) {
    // 通过限定通道调用前处理服务
    OrderDTO remoteOrder = preProcessChannelService.getOrder(request.getOrderId());
    
    // 跨库数据校验
    if (remoteOrder.getStatus() == OrderStatusEnum.SHIPPED) {
        throw new BusinessException(ErrorCode.ORDER_ALREADY_SHIPPED_IN_PREPROCESS, 
            "前处理系统订单已发货，不允许履行");
    }
    
    // 本服务数据校验
    Order localOrder = this.getById(request.getOrderId());
    if (localOrder.getShippingStatus() == ShippingStatusEnum.SHIPPED) {
        throw new BusinessException(ErrorCode.ORDER_ALREADY_SHIPPED, 
            "订单已发货，不允许履行");
    }
    
    // 继续执行履行逻辑
    // ...
}
```

---

## 七、约束规则

### 必须遵守
1. 状态字段必须使用枚举类型，禁止字符串或数字常量
2. 字段名必须明确实体前缀（如 `order.getShippingStatus()`）
3. 跨库校验必须通过架构限定通道服务调用
4. Controller和Service必须同时实现校验表达式（双重校验）
5. 错误码和提示信息必须与结构化规则一致

### 禁止行为
1. ❌ 禁止使用字符串常量比较状态（`"已发货".equals(status)`）
2. ❌ 禁止使用数字常量比较状态（`status == 2`）
3. ❌ 禁止直接跨库查询（违反架构限定通道约束，详见 `cross-db-validation-design-template.md`）
4. ❌ 禁止仅在Controller实现校验而忽略Service（双重校验原则详见 `validation-placement-decision-template.md`）
5. ❌ 禁止自行定义错误码和提示信息（必须与结构化规则一致）

---

## 八、风险提示

- **字符串/数字常量比较**：会导致状态定义不一致，枚举变更后校验失效
- **缺少双重校验**：会导致校验可绕过，业务约束失效
- **直接跨库查询**：会导致违反架构约束，数据一致性无法保障
- **错误码不一致**：会导致前后端错误处理不一致

---

## 九、与其他模板的关系

| 关联模板 | 关系说明 | 使用顺序 |
|----------|----------|----------|
| `validation-rule-structuring-template.md` | 校验规则结构化 | 先结构化规则，再设计表达式 |
| `validation-placement-decision-template.md` | 校验点归属判断 | 先判断归属，再设计各层表达式 |
| `cross-db-validation-design-template.md` | 跨库校验方案设计 | 跨库场景专项设计模板 |

---

## 十、消费建议

1. 详细设计阶段：基于结构化规则和归属决策设计表达式，追加到 `design.md`
2. 开发阶段：基于表达式代码片段实现校验逻辑，禁止自行解读规则
3. 测试阶段：基于表达式设计边界测试（枚举边界值测试、绕过测试）

---

## 十一、证据路径示例

| 编号 | 类型 | 路径/命令 | 说明 |
|------|------|-----------|------|
| E-01 | 枚举类 | `jalor/service-xxx/.../enums/ShippingStatusEnum.java` | 状态枚举定义 |
| E-02 | Controller | `jalor/service-xxx/.../controller/OrderFulfillmentController.java` | Controller校验实现 |
| E-03 | Service | `jalor/service-xxx/.../service/OrderFulfillmentService.java` | Service校验实现 |
| E-04 | 错误码 | `jalor/service-xxx/.../constants/ErrorCode.java` | 错误码定义 |
| E-05 | 限定通道服务 | `jalor/channel-service/...` | 跨库调用限定通道 |