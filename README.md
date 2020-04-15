# vue-cli-mpa-ts

## 命令

|     script     |       explanation        |
| :------------: | :----------------------: |
| `yarn install` |           安装           |
|  `yarn serve`  | 开发环境编译并开启热更新 |
|  `yarn build`  |    生产编译并压缩打包    |
|  `yarn lint`   |    按lint规则格式文件    |
| `yarn commit`  | 按commitlint规则提交代码 |



ts

## 开发事项
- vscode 安装 prettier 插件 ==> 手动格式化代码
- commit 前自动 lint ==> 自动格式化代码
- 使用 commitlint 提交规范



## 提交规范

type 类型说明如下：

- feat：新增feature
- fix：修复bug
- docs：仅仅修改了文档，比如README, CHANGELOG等
- style：仅仅修改了空格，格式缩进，不改变代码逻辑
- refactor：代码重构，没有加新功能或者修复bug
- perf：优化相关，比如提升性能，体验
- test：测试用例，包括单元测试，集成测试等
- chore：改变构建流程、或者增加依赖库、工具等
- revert：回滚到上一个版本



## 第三方包

- element-ui 采用按需引入
- dayjs 日期格式化
- lodash 工具函数
  - 使用按需引入`import get from 'lodash/get'`



## TODO 
eslint