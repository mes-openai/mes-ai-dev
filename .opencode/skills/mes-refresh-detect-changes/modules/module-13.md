# 文件类型识别规则

## 文件类型识别规则

### 后端文件类型

| 文件路径模式 | 类型 | 说明 |
|--------------|------|------|
| **/controller/**/*.java | Controller | API端点 |
| **/service/**/*.java | Service | 业务逻辑 |
| **/dao/**/*.java | DAO | 数据访问 |
| **/entity/**/*.java | Entity | 数据实体 |
| **/dto/**/*.java | DTO | 数据传输对象 |
| **/vo/**/*.java | VO | 视图对象 |
| **/config/**/*.java | Config | 配置类 |
| **/util/**/*.java | Util | 工具类 |
| **/resources/application*.yml | Config | 配置文件 |
| **/resources/restService.properties | Config | 服务发现 |
| **/mapper/**/*.xml | Mapper | MyBatis映射 |

### 前端文件类型

| 文件路径模式 | 类型 | 说明 |
|--------------|------|------|
| **/views/**/*.vue | Page | 页面组件 |
| **/components/**/*.vue | Component | 公共组件 |
| **/api/**/*.js | API | 接口调用 |
| **/router/**/*.js | Router | 路由配置 |
| **/store/**/*.js | Store | 状态管理 |
| **/utils/**/*.js | Util | 工具函数 |
