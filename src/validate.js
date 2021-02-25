let userAgent = '';
if (typeof navigator !== 'undefined') {
  userAgent = navigator.userAgent.toLowerCase();
}
// 是否是PC端
const isPC = function () {
  const regResult = !/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent);
  return regResult;
};
// 手机号码正则
const isPhone = function (str) {
  const regResult = /^(0|86|17951)?1[3456789]\d{9}$/.test(str);
  return regResult;
};
// 判断是否是iphonex
const isIphoneX = function () {
  const regResult = /iPhone[\s\S]*OS X/.test(userAgent);
  return regResult;
};
// 判断是身份证号是否正确
const isRightIdCard = function (str) {
  const regResult = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
  return regResult;
};
// 判断邮箱是否正确
const isRightEmail = function (str) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
};
// 判断是否全等
const isEquals = function () {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
}
// 判断是否是字符串
const isString = function (str) {
  return Object.prototype.toString.call(str) === '[object String]';
}
// 判断是否是对象
const isObject = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
// 判断是否是Dom
const isHtmlElement = function (node) {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
// 判断是否是函数
const isFunction = function (functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};
// 判断是否是undefined
const isUndefined = function (val) {
  return val === void 0;
};
// 判断是否是defined
const isDefined = function (val) {
  return val !== undefined && val !== null;
};


export default {
  isPC,
  isPhone,
  isIphoneX,
  isRightIdCard,
  isRightEmail,
  isEquals,
  isString,
  isObject,
  isHtmlElement,
  isFunction,
  isUndefined,
  isDefined
};