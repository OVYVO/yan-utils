###### yan-utils

js 方法库

###### 安装

```javascript
yarn add yan-utils
# or
npm i yan-utils -S
```

###### 引入

```js
import xxx from 'yan-utils';
import { xxx } from 'yan-utils/lib/array.js';
```

##### 用例

###### 翻页类使用方法:

```javascript
// 分页元素ID（必填）
let selector = '#pagelist';
// 分页配置
let pageOption = {
	// 每页显示数据条数（必填）
	limit: 5,
	// 数据总数（一般通过后端获取，必填）
	count: 162,
	// 当前页码（选填，默认为1）
	curr: 1,
	// 是否显示省略号（选填，默认显示）
	ellipsis: true,
	// 当前页前后两边可显示的页码个数（选填，默认为2）
	pageShow: 2,
	// 开启location.hash，并自定义hash值 （默认关闭）
	// 如果开启，在触发分页时，会自动对url追加：#!hash值={curr} 利用这个，可以在页面载入时就定位到指定页
	hash: false,
	// 页面加载后默认执行一次，然后当分页被切换时再次触发
	callback: function (obj) {
		// obj.curr：获取当前页码
		// obj.limit：获取每页显示数据条数
		// obj.isFirst：是否首次加载页面，一般用于初始加载的判断
		// 首次不执行
		if (!obj.isFirst) {
			// do something
		}
	},
};
// 初始化分页器
new Pagination(selector, pageOption);
```
