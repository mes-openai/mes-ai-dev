# 执行步骤（2/2）

### 6. 开发Service实现类
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/service/impl/XxxServiceImpl.java`

参考代码模板：`mes-ai-dev/templates/backend-service-template.java`（第二部分：Service实现类）

执行步骤：
1. 读取模板文件（Service实现类部分）
2. 读取目标服务现有Service实现类（至少2个同类文件）
3. 根据业务需求和现有代码风格填充模板
4. 实现关键逻辑：
   - 参数校验（必须使用项目真实校验方式，禁止默认写 `validateCreateParam`）
   - 业务校验（唯一性、关联性）
   - 数据转换（必须使用真实存在的 Converter / Assembler / 手工映射能力）
   - 事务管理（@Transactional）
   - 日志记录（log.info）
   - 异常处理（必须使用项目真实异常体系，禁止默认写 `BusinessException`）
5. 如需跨服务调用，必须先读取 provider 的真实接口定义或现有 client 封装，核对参数与返回值后再实现
6. 实现后必须逐项复核：
   - 所有调用的方法在目标对象中真实存在
   - 所有 import 均可解析
   - 所有返回值接收方式与 provider / mapper / converter 真实签名一致

### 7. 开发分页VO（如需要）
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/vo/PageVO.java`

参考代码模板：`mes-ai-dev/templates/backend-page-vo-template.java`

执行步骤：
1. 读取模板文件
2. 检查目标服务是否已有PageVO类
3. 如不存在，根据模板创建通用分页VO
4. PageVO为泛型类，可直接复用

**Step Gate B**：Service接口、实现类、业务逻辑或分页VO存在方法签名/事务/异常处理缺口，或出现未验证方法调用、错误 import、错误返回值接收、模板默认依赖未替换 → 打回步骤4-7重做，不得交付下游 Controller 开发。
