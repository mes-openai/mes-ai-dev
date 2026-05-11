# 执行步骤（2/2）

### 7. 开发查询DTO（如需要）
创建文件：`jalor/service-xxx/src/main/java/com/jalor/xxx/dto/XxxQueryDTO.java`

执行步骤：
1. 读取目标服务现有QueryDTO类（如有）
2. 根据查询条件定义字段
3. 必须包含分页参数：offset、pageSize（可选pageNum）
4. 时间范围查询字段命名规范：startTime、endTime

**Step Gate B**：Mapper接口、XML或查询DTO存在 SQL/映射/命名缺口，或出现错误 `namespace`、错误方法映射、错误对象引用、错误表字段映射 → 打回步骤4-7重做，不得交付下游 Service 开发。
