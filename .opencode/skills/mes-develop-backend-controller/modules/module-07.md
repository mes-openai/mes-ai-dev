# 执行步骤（2/2）

### 7. 开发异常处理器（如需要）
如果服务缺少全局异常处理器，可创建：`jalor/service-xxx/src/main/java/com/jalor/xxx/exception/GlobalExceptionHandler.java`

执行步骤：
1. 检查目标服务是否已有GlobalExceptionHandler
2. 如不存在，参考现有服务的异常处理器风格创建
3. 必须处理以下异常：
   - BusinessException（业务异常）
   - MethodArgumentNotValidException（参数校验异常）
   - ConstraintViolationException（参数约束异常）
   - BindException（参数绑定异常）
   - Exception（系统异常）
4. 所有异常必须记录日志并返回友好提示

**Step Gate B**：Controller、响应封装或异常处理器存在路径/校验/响应规范缺口 → 打回步骤4-7重做，不得交付下游联调或测试阶段。
