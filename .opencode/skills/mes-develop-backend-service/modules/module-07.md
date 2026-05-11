# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发后端Service层（接口和实现）
步骤：
  1. 读取DAO层、Model层和API设计
  2. 定位目标服务和Service路径
  3. 分析现有Service风格
  4. 开发Service接口
  5. 开发Service实现类
  6. 实现业务逻辑和数据转换
预期产出：Service接口、Service实现类
风险：业务逻辑错误、跨服务调用异常
```

### 2. 读取设计文档和现有代码
按顺序读取：
1. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/design.md` - OpenSpec 详细设计主文档（业务逻辑部分）
2. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/api-design.md` - API设计
3. `jalor/service-xxx/src/main/java/com/jalor/xxx/mapper/XxxMapper.java` - Mapper接口
4. `jalor/service-xxx/src/main/java/com/jalor/xxx/entity/XxxEntity.java` - Entity类
5. `jalor/service-xxx/src/main/java/com/jalor/xxx/dto/XxxDTO.java` - DTO类
6. `jalor/service-xxx/src/main/java/com/jalor/xxx/vo/XxxVO.java` - VO类

### 2.5 依赖与签名真实性核验
在进入 Service 接口和实现编码前，必须逐项核验并记录证据路径：
- **类型真实性**：DTO、VO、Entity、Mapper、分页对象、异常类、Converter、远程调用客户端是否真实存在。
- **方法真实性**：准备调用的 getter / setter / converter / mapper / helper / 上下文方法是否真实定义于目标类中。
- **返回值真实性**：Service 接口、Mapper 方法、跨服务 provider 的返回类型、泛型和包装层是否与真实定义一致。
- **调用方式真实性**：跨服务调用使用的 client、服务名来源、返回对象解包方式是否与现有实现一致。
- **包路径真实性**：包声明、import 路径必须与真实目录和真实类路径一致。

若任一项只能从模板推断、无法从真实代码或已冻结契约中确认，必须停止实现并回流 design / analyze。

### 3. 定位Service路径
1. 从服务详情索引确定Service包路径：`mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md`
2. 确定Service接口位置：`com.jalor.xxx.service`
3. 确定Service实现位置：`com.jalor.xxx.service.impl`

**Step Gate A**：设计输入、DAO/Model输入、目标服务定位或依赖/签名真实性核验不完整 → 打回步骤2-3重做，不得进入现有风格分析。

### 4. 分析现有Service风格
先读取 `mes-ai-dev/knowledge/code-map/services/service-xxx/file-summaries.md` 定位相关文件，再读取目标服务现有的Service文件（至少3个），分析：
- **Service接口风格**：
  - 命名规范
  - 方法签名定义
  - 返回类型约定
  - 异常声明
- **Service实现风格**：
  - 注解使用（@Service、@Transactional）
  - 依赖注入方式
  - 日志使用规范
  - 异常处理方式
- **业务逻辑模式**：
  - 数据校验方式
  - 事务管理方式
  - 跨服务调用方式
  - 缓存使用方式

### 5. 开发Service接口
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/service/XxxService.java`

参考代码模板：`mes-ai-dev/templates/backend-service-template.java`（第一部分：Service接口）

执行步骤：
1. 读取模板文件（Service接口部分）
2. 读取目标服务现有Service接口（至少2个同类文件）
3. 根据业务需求和现有代码风格填充模板
4. 校验方法签名和返回类型的一致性
5. 若返回包装、分页对象、异常声明来自现有公共能力，必须引用真实类，不得保留模板默认类名
