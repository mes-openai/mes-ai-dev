# 依赖识别规则

## 依赖识别规则

### 服务间依赖识别

1. **配置文件识别**：读取 `restService.properties`
2. **代码识别**：搜索 `RestTemplate`、`FeignClient` 调用
3. **注解识别**：搜索 `@FeignClient` 注解

### 前后端映射识别

1. **API目录识别**：读取 `src/api/*.js` 文件
2. **页面识别**：读取 `src/views/*.vue` 中的 `import` 和 API 调用
3. **组件识别**：读取 `src/components/*.vue` 中的 API 调用

### 数据库依赖识别

1. **配置识别**：读取 `application.yml` 中的数据源配置
2. **实体识别**：搜索 `@Entity`、`@Table` 注解
3. **Mapper识别**：搜索 `@Mapper` 注解和 XML 文件
