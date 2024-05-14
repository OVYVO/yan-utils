###### yan-utils

> 🚀🚀🚀yan-utils 升级啦！！！新版本使用 typescript 重构了所有的方法，构建工具使用 rollup，相较 v1.x 版本，删除了一些并不常用的方法，同时也加入了一些新的方法。多种导出模式支持 umd,es,cjs 导入方式，打包体积更小。

###### 安装

```javascript
yarn add yan-utils
# or
npm i yan-utils -S
# or
pnpm add yan-utils
```

###### 引入

```js
//umd
import { qnUpload } from "yan-utils";
//es
import { qnUpload } from "yan-utils/lib/es/qnUpload.js";
//cjs
const { qnUpload } = require("yan-utils/lib/cjs/qnUpload.js");
```

###### 函数列表

> 👽️👽️👽️ 太多了，就不一一列举

###### 注意事项

> 如果您需要再本地 vite 启动的项目调试，注意安装 vite-plugin-commonjs 插件，否则会报：The requested module '/.../yan-utils/lib/index.js' does not provide an export named 'default' 错误
