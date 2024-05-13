/**
 * 检查一个值是否为指定类型的对象。
 * @param val 待检查的值。
 * @param type 指定的类型字符串。
 * @returns 如果值是指定类型的对象，则返回true，否则返回false。
 */
export const is = (val: unknown, type: string) => {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
};

/**
 * 检查一个值是否定义。
 * @param val 可能未定义的值。
 * @returns 如果值已定义，则返回true，否则返回false。
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

/**
 * 检查一个值是否未定义。
 * @param val 可能未定义的值。
 * @returns 如果值未定义，则返回true，否则返回false。
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

/**
 * 检查一个值是否为对象（不包括null）。
 * @param val 待检查的值。
 * @returns 如果值是对象，则返回true，否则返回false。
 */
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

/**
 * 检查一个值是否为空。
 * 支持检查数组、字符串、Map、Set和对象是否为空。
 * @param val 待检查的值。
 * @returns 如果值为空，则返回true，否则返回false。
 */
export const isEmpty = <T = unknown>(val: T): val is T => {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
};

/**
 * 检查一个值是否为Date对象。
 * @param val 待检查的值。
 * @returns 如果值是Date对象，则返回true，否则返回false。
 */
export const isDate = (val: unknown): val is Date => {
  return is(val, "Date");
};

/**
 * 检查一个值是否为null。
 * @param val 待检查的值。
 * @returns 如果值为null，则返回true，否则返回false。
 */
export const isNull = (val: unknown): val is null => {
  return val === null;
};

/**
 * 检查一个值是否为null或undefined。
 * @param val 待检查的值。
 * @returns 如果值为null或undefined，则返回true，否则返回false。
 */
export const isNullAndUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) && isNull(val);
};

/**
 * 检查一个值是否为null或undefined。
 * @param val 待检查的值。
 * @returns 如果值为null或undefined，则返回true，否则返回false。
 */
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) || isNull(val);
};

/**
 * 检查一个值是否为数字。
 * @param val 待检查的值。
 * @returns 如果值为数字，则返回true，否则返回false。
 */
export const isNumber = (val: unknown): val is number => {
  return is(val, "Number");
};

/**
 * 检查一个值是否为Promise对象。
 * @param val 待检查的值。
 * @returns 如果值为Promise对象，则返回true，否则返回false。
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    is(val, "Promise") &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
};

/**
 * 检查一个值是否为字符串。
 * @param val 待检查的值。
 * @returns 如果值为字符串，则返回true，否则返回false。
 */
export const isString = (val: unknown): val is string => {
  return is(val, "String");
};

/**
 * 检查一个值是否为函数。
 * @param val 待检查的值。
 * @returns 如果值为函数，则返回true，否则返回false。
 */
export const isFunction = (val: unknown): val is Function => {
  return typeof val === "function";
};

/**
 * 检查一个值是否为布尔值。
 * @param val 待检查的值。
 * @returns 如果值为布尔值，则返回true，否则返回false。
 */
export const isBoolean = (val: unknown): val is boolean => {
  return is(val, "Boolean");
};

/**
 * 检查一个值是否为正则表达式。
 * @param val 待检查的值。
 * @returns 如果值为正则表达式，则返回true，否则返回false。
 */
export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, "RegExp");
};

/**
 * 检查一个值是否为数组。
 * @param val 待检查的值。
 * @returns 如果值为数组，则返回true，否则返回false。
 */
export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val);
};

/**
 * 检查一个值是否为Window对象。
 * @param val 待检查的值。
 * @returns 如果值为Window对象，则返回true，否则返回false。
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * 检查一个值是否为HTML或XML元素。
 * @param val 待检查的值。
 * @returns 如果值为元素，则返回true，否则返回false。
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * 检查一个值是否为Map对象。
 * @param val 待检查的值。
 * @returns 如果值为Map对象，则返回true，否则返回false。
 */
export const isMap = (val: unknown): val is Map<any, any> => {
  return is(val, "Map");
};

export default {
  is,
  isDef,
  isUnDef,
  isObject,
  isEmpty,
  isDate,
  isNull,
  isNullAndUnDef,
  isNullOrUnDef,
  isNumber,
  isPromise,
  isString,
  isFunction,
  isBoolean,
  isRegExp,
  isArray,
  isWindow,
  isElement,
  isMap,
};
