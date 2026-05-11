# 执行步骤

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何扫描操作前，必须先向用户输出本次执行计划，包含：
- 扫描目标：后端代码目录
- 预期产出：后端服务清单与后续服务级产物输入
- 风险评估：大型目录扫描可能耗时
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 扫描后端根目录
使用Glob工具扫描后端根目录：
```
工具：Glob
路径：jalor/
模式：*/pom.xml
目的：识别所有包含pom.xml的子目录（潜在Java项目）
```

**Step Gate A**：后端根目录扫描不完整或项目识别范围错误 → 打回步骤2重做，不得进入项目识别解析。

### Step 3: 解析项目识别
对每个找到的pom.xml：
```
工具：Read
路径：jalor/<project>/pom.xml
提取信息：
- <artifactId>（项目标识）
- <name>（项目名称）
- <dependencies>中是否包含jalor框架依赖
- <packaging>类型（jar/war/pom）
```

### Step 4: 统计代码文件数量
对每个识别的项目：
```
工具：Glob
路径：jalor/<project>/src/main/java/
模式：**/*.java
目的：统计Java文件数量，评估项目规模
```

### Step 5: 识别资源文件
```
工具：Glob
路径：jalor/<project>/src/main/resources/
模式：**/*
目的：识别配置文件（application.yml、bootstrap.yml等）
```

**Step Gate B**：项目识别、代码规模统计或资源文件识别存在缺口 → 打回步骤3-5重做，不得汇总输出。

### Step 6: 汇总输出
将所有扫描结果汇总为服务清单，供后续服务级产物与最终收拢阶段使用：
```
路径：state/fragments/*.yaml / services/* 目录的后续输入
说明：不在本 Skill 直接写共享 `backend-overview.md`
```

**Step Gate C**：服务清单缺少服务标识、代码规模、配置文件或异常说明 → 打回步骤6重做，不得交付后续初始化步骤。
