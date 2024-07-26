###### yan-utils

> 🚀🚀🚀yan-utils 升级啦！！！新版本使用 typescript 重构了所有的方法，构建工具使用 rollup，相较 v1.x 版本，删除了一些并不常用的方法，同时也加入了一些新的方法。多种导出模式支持 umd,es,cjs 导入方式，打包体积更小。

###### 安装

```javascript
yarn add yan-utils@latest
# or
npm i yan-utils@latest -S
# or
pnpm add yan-utils@latest
```

###### 引入

```js
//umd
import { qnUpload } from "yan-utils";
//es
import { qnUpload } from "yan-utils/lib/es/qnUpload.js";
//cjs
const { qnUpload } = require("yan-utils/lib/cjs/qnUpload.cjs");
```

###### 注意事项

> 👽️👽️👽️ 如果您需要使用**qnUpload**函数,如果您项目中已安装**qiniu-js**依赖，您可以放心使用，如果您项目中未安装该依赖请您自行安装

```javascript
yarn add qiniu-js
# or
npm i qiniu-js
# or
pnpm add qiniu-js
```
